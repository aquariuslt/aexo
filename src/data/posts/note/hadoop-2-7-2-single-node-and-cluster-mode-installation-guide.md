```metadata
{
  "title": "Hadoop 2.7.2 单节点与集群安装部署",
  "created": "2016-04-09",
  "category":"Note",
  "tags": ["Hadoop","Linux"]
}
```


## Background
最近需要做一些大数据相关项目,至少需要搭建Hadoop的基本环境.
由于用到的是目前版本号最高的Hadoop 2.7.2.跟文档比较多的2.6 以下的版本相比,在部署集群的时候遇见了很多坑.
所以写一份安装指南,记录一下跌坑的过程,以示警惕.

在环境搭建的过程中,参考了以下两篇文章:
其中Apache的官方Wiki文档写的真难读.
建议直接先看一遍aws的指南再动手.

[https://wiki.apache.org/hadoop/GettingStartedWithHadoop](https://wiki.apache.org/hadoop/GettingStartedWithHadoop)
[https://rstudio-pubs-static.s3.amazonaws.com/](https://rstudio-pubs-static.s3.amazonaws.com/78508_abe89197267240dfb6f4facb361a20ed.html)


## Table Of Content
暂不讨论Hadoop及基于其应用的场景描述,文本只讨论基本的环境搭建步骤和与之涉及的知识点.
按照顺序总结出本文的内容节点.

1. 宏观了解在集群上部署Hadoop的过程
2. 虚拟机基本网络配置与机器配置
3. 下载并解压Hadoop
4. 创建专为运行Hadoop的用户
5. 环境变量的设定
6. 修改Hadoop配置文件
7. 启动Hadoop服务

8. 防跌坑指南

## Environment Setup

### Overview: How Developer deploy Hadoop in cluster mode
通常来说,一个运维工程师是如何部署一个Hadoop集群呢?
集群可以当成1台Master机器和多台Slaves机器.
在全新的Linux机器群中创建Hadoop集群,按我的理解可以分成以下几步.

1. 在Master上下载 Hadoop,并修改对应的Hadoop配置文件.
2. 将修改好配置的Hadoop目录打包,分发到各个Slave中,解压到固定的执行目录.
3. 修改所有机器的hosts文件,将局域网中的所有ip-hostname进行mapping.
4. 在所有机器上安装ssh,Master和Slaves之间将通过ssh进行运行时的通讯控制.
5. 在Master上启动Hadoop服务.统一管理所有Slave节点.

### Network and Information about Virtual Machine
因为只是实验集群的部署,所以没有用到真机.
实际上虚拟机内部的多台机器所组成的集群,其实总的I/O还是会被物理机器限制.



我将使用的是1台Master和两台Slaves
三台机器都是`vmware`上的虚拟机,网络方式都是以NAT桥接
具体的配置如下:
- Master:
ip:192.168.239.142
hostname:elementary-os
cpu:4 core
ram:16G

- Slaves:
ip:192.168.239.144,192.168.239.145
hostname:hd-worker-a,hd-worker-b
cpu:1 core
ram:4G
harddisk:20G

P.S. Master 和 Slaves 都是基于64位的`Ubuntu14.04.3LTS`内核的Linux.
可以视为都是通过直接安装`Ubuntu14.04.3.LTS`.

为了通过`/etc/hosts`文件通过机器名访问对应的ip,
在每一个节点上面都修改对应的`/etc/hosts`文件,将集群中所有节点加到文件里面

```bash
$ sudo vi /etc/hosts
```

在文件底部添加以下几行(实际操作中,请将hostname替换成自己实际机器的hostname与ip)
```
# Hadoop Cluster Setup
## Master
192.168.239.142   elementary-os

## Slaves
192.168.239.144   hd-worker-a
192.168.239.145   hd-worker-b
```



### Download Hadoop
下载地址:[https://mirrors.noc.im/apache/hadoop/common/current/](https://mirrors.noc.im/apache/hadoop/common/current/)

下载之后,会得到一个`Hadoop2.7.2`的解压包.
在下一步章节我们将会将其移动到其他目录.


### Add Hadoop Group and User
在所有节点上都创建一个名为`hduser`的user,并将其加到sudo列表里面.
在接下来的所有bash命令,默认都通过该创建的`hduser`来执行.
```
$ sudo addgroup hadoop
$ sudo adduser --ingroup hadoop hduser
$ sudo adduser hduser sudo
```

### Installing SSH and Copy Public Key to remote machine
什么是SSH
SSH (“Secure SHell”) is a protocol for securely accessing one machine from another.
Hadoop uses SSH for accessing another slaves nodes to start and manage all HDFS and MapReduce daemons.
Hadoop通过ssh之间来通讯和管理节点之间的通讯.
```
$ sudo apt-get install openssh-server
```
TIPS:
通常来说,ssh远程到另一台安装了ssh的机器上,通过`ssh {username}@{hostname}`,之后输入密码便可以进入.
对于一些自动化部署的脚本来说自动输入密码,还需要在脚本里面写下密码.
怎么可能如此的不科学?

所以需要通过ssh key公钥来进行认证,达到无密码传输的过程.
假设我们需要在机器上A通过ssh远程到机器B且不需要密码,步骤如下:
1. 在机器A上生成自己的ssh公钥与密钥
```bash
$ ssh-keygen -t rsa
```
此举将会在user目录下的`~/.ssh`文件夹创建对应的
`id_rsa`和`id_rsa.pub`文件.
其中`id_rsa.pub`就是公钥文件

2. 在机器A上将自己的公钥复制到远程主机上
```bash
$ ssh-copy-id {username}@B
$ {username}@B password:
$ #此时输入用户密码
```
此举会在远程主机B的对应user的home/.ssh 目录下创建`authorized_key`文件.
该公钥已经信任,拥有这个公钥的A主机用户可以直接通过`ssh {username}@B`不输入密码而直接远程到B

OK.在了解到这一步之后,大概知道一台机器的主机需要如何配置ssh了.
因为在Hadoop集群中,Master与每一台Slaves都需要进行ssh通讯,
所以需要在Hadoop中每一台机器都生成自己的ssh公钥,然后与Master互相进行公钥传输动作.

在我自己的集群中,进行了4次`ssh-copy-id`操作:
1. elementary-os -> hd-worker-a
2. hd-worker-a -> elementary-os
3. elementary-os -> hd-worker-b
4. hd-worker-b -> elementary-os


### Basic Environment Setup
在修改Hadoop的配置之前,需要进行配置的是所有节点的环境变量设置与必要的基础程序.

#### JDK
Hadoop运行在Java环境中,所以每个节点都需要安装JDK.
需要保证的是确保每一台节点上安装的JDK版本一致.
P.S 我自己是Master OpenJDK-8 + Slaves OpenJDK-7. 目前还是正常运行的
(顺便吐槽一下 `Ubuntu14.04`默认的apt-get源,相当傻逼.在不添加自己订阅的其他源的情况下
连OpenJDK8的地址都没有,而且如果安装Git之类的工具,为求稳定居然用的是1.7以下的版本.
这也是为什么我日常开发用的是`elementary-os`,虽然也是基于ubuntu14的内核,
但是elementary-os修改了其默认的apt源,ui看起来也更加顺眼)

```bash
$ sudo apt-get install openjdk-7-jdk
```
通过此举,安装的默认的jdk路径是`/usr/lib/jvm/java-7-openjdk-amd64`.
OpenJDK8同理.
OracleJDK也推荐复制到`/usr/lib/jvm`目录下.(守序善良Linux派优雅的约定之一)

记住这里咯.在下面我们会将这个JDK的目录,加到当前用户`hduser`的`.bashrc`中.



### Configure Hadoop
终于到了这一步.
建议首先在Master上机器修改好Hadoop的配置.然后压缩该文件夹,复制到其他Slave节点上的同一目录.


#### Unpack and move hadoop folder
假设下载好的hadoop-2.7.2.tar.gz 在 当前用户的`Downloads`文件夹中.
解压完毕之后,将其移动到`/usr/local`下,并更名为`hadoop`
```
$ mv hadoop-2.7.2 /usr/local/hadoop
```


#### Update Environment File
在配置Hadoop的过程中,下列配置文件将会被修改.

> ~/.bashrc
> /usr/local/hadoop/etc/hadoop/slaves
> /usr/local/hadoop/etc/hadoop/hadoop-env.sh
> /usr/local/hadoop/etc/hadoop/core-site.xml
> /usr/local/hadoop/etc/hadoop/yarn-site.xml
> /usr/local/hadoop/etc/hadoop/mapred-site.xml
> /usr/local/hadoop/etc/hadoop/hdfs-site.xml

##### ~/.bashrc

还记得之前提过的JDK路径吗,将其配置成`JAVA_HOME`
修改当前用户的bash配置文件,将其加到.bashrc的底部

```bash
$ cd ~
$ vi .bashrc
```

```sh
#Hadoop variables
export JAVA_HOME=/usr/lib/jvm/java-7-openjdk-amd64/
export HADOOP_INSTALL=/usr/local/hadoop
export PATH=$PATH:$HADOOP_INSTALL/bin
export PATH=$PATH:$HADOOP_INSTALL/sbin
export HADOOP_MAPRED_HOME=$HADOOP_INSTALL
export HADOOP_COMMON_HOME=$HADOOP_INSTALL
export HADOOP_HDFS_HOME=$HADOOP_INSTALL
export YARN_HOME=$HADOOP_INSTALL
```

##### /usr/local/hadoop/etc/hadoop/hadoop-env.sh
还是跟上面一样,需要将JDK的路径设置成`JAVA_HOME`
```
export JAVA_HOME=/usr/lib/jvm/java-7-openjdk-amd64/
```

##### /usr/local/hadoop/etc/hadoop/core-site.xml
在`<configuartion></configuration>`之间
添加一个fs.default.name,其值为master机器的9000端口.
譬如我的master机器是`elementary-os`,则value是`hdfs://elementary-os:9000`
P.S.接下来的变量`{master-hostname}`请自行替换成自己的master的机器名.
```xml
<configuration>
  <property>
    <name>fs.default.name</name>
    <value>hdfs://{master-hostname}:9000</value>
  </property>
  <property>
    <name>hadoop.tmp.dir</name>
    <value>file:/usr/local/hadoop_store/tmp</value>
  </property>
</configuration>
```

#### /usr/local/hadoop/etc/hadoop/yarn-site.xml
在`<configuartion></configuration>`之间
添加:
```xml
<configuration>
  <property>
    <name>yarn.nodemanager.aux-services</name>
    <value>mapreduce_shuffle</value>
  </property>
  <property>
    <name>yarn.nodemanager.aux-services.mapreduce.shuffle.class</name>
    <value>org.apache.hadoop.mapred.ShuffleHandler</value>
  </property>
  <property>
    <name>yarn.resourcemanager.hostname</name>
    <value>{master-hostname}</value>
  </property>
</configuration>

```


##### /usr/local/hadoop/etc/hadoop/mapred-site.xml
`mapred-site.xml`默认是不存在的.
但是有一份模板文件`mapred-site.xml.template`,我们将其复制并重命名成`mapred-site.xml`
```bash
$ cp /usr/local/hadoop/etc/hadoop/mapred-site.xml.template /usr/local/hadoop/etc/hadoop/mapred-site.xml
```
在`<configuartion></configuration>`之间
添加:
```xml
<configuartion>
  <property>
    <name>mapreduce.framework.name</name>
    <value>yarn</value>
  </property>
  <property>
    <name>mapred.job.tracker</name>
    <value>{master-hostname}:9001</value>
  </property>
  <property>
    <name>mapreduce.jobhistory.address</name>
    <value>{master-hostname}:10020</value>
  </property>
  <property>
    <name>mapreduce.jobhistory.webapp.address</name>
    <value>{master-hostname}:19888</value>
  </property>
</configuartion>
```

##### /usr/local/hadoop/etc/hadoop/hdfs-site.xml
在修改`hdfs-site.xml`这个配置文件之前,我们需要知道更多的一件事.
hdfs的块状文件,储存在一个指定的目录中.
按照官方文档的推荐,和网上一些文件夹的路径的约定,我们将这个
hdfs的文件储存目录叫做`hadoop_store`.绝对路径为`/usr/local/hadoop_store`

于是hadoop的相关文件夹就变成了两个:
> /usr/local/hadoop
> /usr/local/hadoop_store

由于读写权限问题,我们需要将`hadoop_store`的权限改成任意可读可写
```bash
$ sudo mkdir -p /usr/local/hadoop_store
$ sudo chmod -R 777 /usr/local/hadoop_store
```
然后再在配置文件里面加入

```xml
<configuartion>
  <property>
    <name>dfs.namenode.secondary.http-address</name>
    <value>{master-hostname}:50090</value>
  </property>
  <property>
    <name>dfs.replication</name>
    <value>1</value>
  </property>
  <property>
    <name>dfs.namenode.name.dir</name>
    <value>file:/usr/local/hadoop_store/hdfs/namenode</value>
  </property>
  <property>
    <name>dfs.datanode.data.dir</name>
    <value>file:/usr/local/hadoop_store/hdfs/datanode</value>
  </property>
</configuartion>
```
##### slaves
`slaves`文件里面存储的是作为slave的节点的机器名.
以行为单位,一行一个.
默认只有一行localhost.
从一般的集群角度来说,Master不应该担当Worker的角色(老湿布置作业给小学僧,自己是不会一起做作业的)
所以slaves文件一般只写slave节点的名字,即slave节点作为datanode,master节点仅仅作为namenode.

但是由于我是一名好老湿,所以在本机配置中master也充当了worker的角色,所以本机是这样改的:
```
elementary-os
hd-worker-a
hd-worker-b
```

致此,所有的配置文件已经修改完毕.
可以将master上的hadoop文件夹压缩并且分发到各个slave节点上.



#### Last Configure : Format Namenode
最后一步配置,初始格式化 hdfs
```bash
$ cd /usr/local/hadoop/
$ hdfs namenode -format
```


### Start all Hadoop deamons
启动Hadoop服务.
```bash
$ su hduser
$ cd /usr/local/hadoop/
$ sbin/start-dfs.sh
$ sbin/start-yarn.sh
```


如果启动成功,在master节点上通过jps命令查看,应该包含如下hadoop进程
```
hduser@elementary-os:~$ jps
51288 Jps
22914 ResourceManager
22361 NameNode
23229 NodeManager
22719 SecondaryNameNode
```

在 slave节点上通过jps命令查看,应该包含如下hadoop进程
```
hduser@hd-worker-a:~$ jps
6284 NodeManager
6150 DateNode
6409 Jps
```

或者可以通过浏览器访问[https://master:8088](https://master:8088)
或者[https://master:50070](https://master:50070)
查看Hadoop服务状态.

![Nodes of the cluster](https://img.alicdn.com/tfscom/TB1vHd.MpXXXXXDXFXXXXXXXXXX.png)
![Namenode information](https://img.alicdn.com/tfscom/TB16f8YMpXXXXbJXVXXXXXXXXXX.png)

P.S.关于`jps`命令.
jps位于jdk的bin目录下,其作用是显示当前系统的java进程情况,及其id号.
jps相当于linux进程工具ps,但是不支持管道命令grep
jps并不使用应用程序名来查找JVM实例.


## Trouble Shooting
防跌坑指南.
记录了在Hadoop环境搭建过程中所遇到的坑


### Number of Live DataNode:0
通过`start-dfs.sh`启动了hadoop多个节点的datanode,
且通过`jps`命令能够看到正常的datanode和resourcemanager进程,
为什么live datanode数目为0,或者只有master的那个datanode?

可通过以下方法排除:
1. 关闭所有节点的防火墙(ubuntu):
先查看防火墙状态
```bash
$ sudo ufw status
```
如果不是disabled,则禁用
```bash
$ sudo ufw disable
```

2. 在hadoop服务运行的时候,关闭namenode的安全模式
```bash
$ hadoop dfsadmin -safemode leave
```

3. 在关闭hadoop服务的情况下,删除所有的日志文件,存储文件并重新format
确保`hadoop_store`文件夹下的所有文件夹权限都是777
```
$sudo rm -r /usr/local/hadoop/logs
$sudo rm -r /usr/local/hadoop_store/tmp
$sudo rm -r /usr/local/hadoop_store/hdfs
$sidp hdfs namenode -format
```


```metadata
{
  "title":"Angular常规性能优化阶段总结",
  "created":"2016-04-30",
  "category":"Blog",
  "tags":[
    "AngularJS",
    "JavaScript"
  ]
}
```

## Background
最近在为项目进行性能优化的时候,有总结到一些经验.  
现在梳理一遍,方便以后排查问题.  

## References
在进行Angular页面的性能测试以及学习优化手段之前,查阅了挺多资料.  
其中非常推荐一些前端大牛的博客文章,不仅在技术方面深有造诣,而且表达能力非常清晰,能够条理清晰地将经验传授给大家.  

下面是一些推荐阅读的博客,给我提供了很多帮助,加深了对Angular的认识.  
- [xufei blog](https://github.com/xufei/blog/)
...准备贴下一个地址的时候,居然发现这个知乎的地址居然也是xufei大大的回答.
恩.应该提供最有价值帮助的就是他了.


## Solutions

### Plugins:AngularJS Batarang
利用Angular官方开发的Chrome插件`AngularJS Batarang`来监控页面性能.  
[Angular Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)  
![运行截图](https://img.alicdn.com/tfscom/TB1OmxkKXXXXXXIXXXXXXXXXXXX.png)  

通过`Angular Batarang`,我们可以轻易的统计在页面的`watcher`数量,`$scope`中变量的数量.
还有平均一段时间内`angular`执行`$digest`的数量.

对于代码不熟悉的项目前端,查找分析性能瓶颈的时候,可以通过通过该插件进行二分对于,快速定位出瓶颈处.
当然,如果在对angular比较熟悉,在开发的过程中也遵循了常见的性能优化约定,该插件的监控作用就不大.
最后还是只能通过其他手段细化性能瓶颈定位粒度.

经过本人测试,对于大部分使用Angular的页面都支持良好.(可惜不支持CommonJS打包成的我的主站的分析)


### Once Binding
在常见的CRUD系统中,我们经常会遇到很多数据展示的区域,但是这些数据一旦渲染好,一般不需要强刷新.
比如页面标题,菜单选项等不需要实时更新的情况.所以这时候可以通过`Once Binding`,即一次绑定,渲染一次即可,不必监控该表达式.

之前遇到的情况是,我们的页面header会有一个通知栏,展开会通知那些已经显示的列表.  
单条通知样子类似于微博的这种:  
![通知栏(https://img.alicdn.com/tfscom/TB17PpkKXXXXXX8XXXXXXXXXXXX.png)
在没优化之前,通知部分的伪代码如下:
```html
<div class="notification">
  <ul>
    <li ng-repeat="notification in vm.displayNotifications">
      <div href="{{notification.targetUrl}}">
        <p>{{notifications.title}}</p>
        <p>{{notifications.summary}}</p>
        <p>{{notifications.time}}</p>
      </div>
    </li>
  </ul>
</div>
```
经过一轮生产环境数据统计,某部分用户的未读通知范围会在200 - 7W 条.  
哈哈看到就尿了,如果这么算的话,7W条的那个用户页面将会有至少 7W*4 = 28W的watcher在监听他们的变化.  
且不论数据为什么需要全部渲染出来,如果将代码修改成Once Binding,则页面的长期watcher数量将会减少28W个.

特别是对于使用了`ng-repeat`的元素,一定要考虑将

使用一次绑定表达式之后如下
```html
<div class="notification">
  <ul>
    <li ng-repeat="notification in vm.displayNotifications">
      <div href="{{::notification.targetUrl}}">
        <p>{{::notifications.title}}</p>
        <p>{{::notifications.summary}}</p>
        <p>{{::notifications.time}}</p>
      </div>
    </li>
  </ul>
</div>
```

### Use variable instead function expression
之前遇到一个需求,在业务逻辑上需要显示一个模型,这个模型大概是下面这样的:

```json
{
  "businessKeys":[
    {
      "type":"a",
      "value":"aValue"
    },
    {
      "type":"b",
      "value":"bValue"
    },
    {
      "type":"c",
      "value":"cValue"
    },
    {
      "type":"c",
      "value":"cValue"
    }
  ],
  "otherInfo":"otherInfo..."
}
```
在字段里面是有一个不定长的数组,数组里面实际上是一堆key-value形式的键值对.
之所以不定长是因为里面有时候有些key是没有对应的值的.
在UI上显示出来的时候,先前的做法就是绑定一个方法:
```
{{vm.getValueByBusinessKeysType(object,keyName)}}
```
在页面上使用一个方法表达式而不是直接的变量表达式的时候,会导致方法执行多次.
由于这个`getValueByBusinessKeysType`的方法,需要通过数组查找而不是直接一个map
所以就会导致性能问题.

目前的解决方案是:将数据在加载的时候经过扁平化处理,即将key直接以property的形式直接赋予Object.
通过直接绑定property表达式来显示.
这样也有效提高了一些性能

### Chain Filter
Angular的Filter性能一直不够好.
在刚刚接触Angular的时候,阅读文档发现Filter的功能还挺好用的,特别是做一些关键字过滤表格数据,格式处理等方面的工作,  
实在是太方便了,于是我们在为我们的table的header上每个column都添加了一个关键字过滤框,使用angular的filter做分页的工作.  

由于我们的表格需要显示的业务数据比较多,column数大概在15-25左右.
在每一个header的column上添加独立的关键字过滤框,大概就添加了20个.


假设当前页面的总数据 会有有30条.
用户喜欢在几个过滤框上输入一些相关的关键字信息过滤.(filterA,filterB)
```js
function filterA(dataArray,filterCriteria){
  return filteredDataArrayByFilterCriteriaA;
}

function filterB(dataArray,filterCriteria){
  return filteredDataArrayByFilterCriteriaB;
}
```
当每一个过滤框都属于一个单独的filter去绑定的话,如果执行AB filter,将会按照下面的顺序执行

> `dataArray` length:30
> `filteredDataArrayByFilterCriteriaA`  (至少两次filterA,此时length约20)  
> `filteredDataArrayByFilterCriteriaB`  (至少两次filterB,此时length约5)

如果我们在计算关键字过滤的时候使用的是遍历查询,以单次对单个元素对比的操作工作量为1.  
那么在这两重filter的总计算工作量就会变成`30*2+20*2=100`次

回到实际业务,通过在filter中添加log来记录filter循环运算的次数,惊讶的发现实际上filter的运算次数在25个column的情况下,  
普遍一次过滤框的查询,会导致3K左右的运算次数,相当惊人.


目前的解决方案是通过降低工程代码的可读性,将多个filter的功能合并成一个总的filter,在总的filter里面处理一连串的单个filter过滤过程.

之前的代码可能是这样:
```html
<tr ng-repeat="singleData in vm.dataArray | filterA | filterB | filterC ..... | filterZ"></tr>
```
```js
function filterA(dataArray){
  //implement filterA
}

function filterB(dataArray){
  //implement filterB
}

function filterC(dataArray){
  //implement filterC
}
```

合并之后看起来是这样
```html
<tr ng-repeat="singleData in vm.dataArray | combinedFilter" 
```
```js
function combinedFilter(dataArrat){
  //implement filterA
  //implement filterB
  //implement filterC
}
```

### Using ng-model-option delay update
因为使用了angular的filter功能做前端的关键词过滤,实际上所有的查询工作都是同步的.
因为是同步,所以在前端javascript进行相对较密集的查询运算的时候,卡顿就会相当明显.
如果对过滤输入框进行了`ng-model`的绑定,则当输入框的内容进行改变的时候,会立刻出发filter运算.
通常用户输入的时候大部分可能是连续的单词或者子字符串的输入,在一次主观上的输入还没有结束的时候,因为输入框中文字的改变,  
而频繁触发查询,实际上页面性能也会相当不好.
这里有一个小tips就是为一些实时查询性不是很高的输入区域添加ng-model-options,增加angular检查数据update的时间间隔,
相当于可以等用户把想要的搜索关键词输入完毕之后,再执行js代码的查询工作.

## Summary
本次结合了一些实际工作中使用angular遇到的性能问题的解决方案,当然也有遇到一些与原生js,socket.io相关的性能问题.
由于tag不同,不混淆在一起说了.


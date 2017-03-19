```metadata
{
  "title": "Linux \"libxx cannot open shared object file no such file or directory\"解决方案",
  "created": "2016-01-03",
  "category":"Debug",
  "tags":["Linux","Ubuntu"]
}
```



## Description
I was install Ubuntu 15.10 for tasting the new version of Ubuntu.
After setting up MEAN development and run node.js program.

> This is a patch/enhancement about [https://debug.aquariuslt.com/2015/12/14/libclntsh-so-11-1-cannot-open-shared-object-file/](https://debug.aquariuslt.com/2015/12/14/libclntsh-so-11-1-cannot-open-shared-object-file/)


Node.js throw error belows:
> libaio.so cannot open shared object file no such file or directory

I try to find this in oracle instant client directory, but there is no file named this in it.
Then I power on the `Ubuntu 14.04` and type command
```
locate libaio.so
```
It can be found in `/lib/x86_64_linux_gnu`
But not found in `UBuntu 15.10`

## RootCause
That's because `Ubuntu 15.10` use different gnu/g++ version from `Ubuntu 14.04`.


## Solution
You can follow these steps to locate the root cause and solve it.

1. Using command `locate {filename}` to search .so file.
If result is empty, you can try below;

2. Install the *.so file.
Using command
```
sudo apt-get install {filename without .so}
```
or

If you found there is the same filename prefix but with version number,
for example,the error tips `libaio.so` not found, but you found there is  a file named `libaio.so.11.2` in `/lib/x86_64_linux_gnu`
you can make a softlink
using command
```
ln -s libaio.so.11.2 libaio.so
sudo updatedb
```












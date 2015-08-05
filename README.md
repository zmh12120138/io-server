IO SERVER USING NODE.JS
===================

**contents:**
-------------
 1. 使用说明
 2. 系统模型简图
 3. 系统模型详图
 4. 变量命名规则
 5. 模块功能说明
 6. 系统压力测试记录


----------
###**使用说明**
 **一.bat批处理脚本开启服务器使用注意事项：**
 1.需将文件夹重新命名为“io-server”；
 2.需将文件夹放置C盘根目录下。
 3.如果系统未运行过本程序，需先打开“XX系统首次使用时运行.bat”，再打开“start all.bat”;
 
 
 **二.手动开启服务器使用说明：**
 1.打开文件夹里对应系统类型的redis文件夹，找到redis-server.exe并打开；
 2.开启命令客户端：node server-command.js或者pm2 start server-command.js;
 3.开启传输客户端：node servertcp.js或者pm2 start servertcp.js（建议使用后者）。
 4.一定要注意开启的顺序
 
 
 **三.关闭所有服务操作说明：**
 1.关闭传输客户端。如果使用pm2模块开启的服务器，需先在命令窗口执行“pm2 stop XXXXXXXX.js”;如果直接使用node命令开启，直接关闭命令窗口即可；
 2.关闭命令客户端。方法如上。
 3.关闭redis缓存服务；
 4.打开任务管理器，找到所有的Node进程并结束进程。
 5.一定要注意关闭的顺序。

### **系统模型简图**

*redis实现服务器间信息共享*
![enter image description here](http://chuantu.biz/t2/11/1438744468x-1566638895.png)

###**系统模型详图**
![enter image description here](http://chuantu.biz/t2/11/1438743158x-1566638895.png)
----------
###**变量命名规则**
暂未完成


----------
###**模块功能说明**
暂未完成

----------
###**服务器压力测试记录**
测试工具：ServerTestTool
软件截图：![enter image description here](http://chuantu.biz/t2/11/1438745733x-1566638176.png)

**测试记录一(低配电脑)**

系统环境：
 - Cpu: 1.0GHZ Intel(R) Xeon(R) 
 - 内存速度: 800MHZ
 - 系统:windows 7 企业版 32位

测试结果：
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;并发20000个连接以内，与服务器连接的速度很快，20000之后速度明显下降。
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;内存使用情况：服务器接受20000个连接所占用内存为400MB±50MB，平均每个连接占用20k内存。

**测试记录二(高配电脑)**

系统环境：
![enter image description here](http://chuantu.biz/t2/11/1438746090x-1566638176.png)

测试结果：

一万个并发连接：
![enter image description here](http://chuantu.biz/t2/11/1438746212x-1566638176.png)
三万个并发连接：
![enter image description here](http://chuantu.biz/t2/11/1438746249x-1566638176.png)
五万个并发连接：
![enter image description here](http://chuantu.biz/t2/11/1438746285x-1566638176.png)
<table >
   <tr>
      <td>并发数量</td>
      <td>占用内存</td>
      <td>每个连接所占内存</td>
   </tr>
   <tr>
      <td>1万</td>
      <td>73M</td>
      <td>7K</td>
   </tr>
  <tr>
      <td>2万</td>
      <td>98.6M</td>
      <td>5K</td>
   </tr>
   <tr>
      <td>3万</td>
      <td>121.1M</td>
      <td>4.1K</td>
   </tr>
   <tr>
      <td>4万</td>
      <td>148M</td>
      <td>3.8K</td>
   </tr>
   <tr>
      <td>5万</td>
      <td>172.9M</td>
      <td>3.54K</td>
   </tr>
</table>
2万个并发连接之前，服务器接受新连接速度很快；4万-5万个的时候，服务器接受新连接的速度大约每秒20个。

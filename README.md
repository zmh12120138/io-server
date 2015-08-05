IO SERVER USING NODE.JS
===================
###使用说明
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

### 系统模型简图

*redis实现服务器间信息共享*
```sequence
命令服务器->redis缓存: 存储命令信息
传输服务器->redis缓存: 读取命令信息
传输服务器->Mysql数据库:存储数据
```
###系统模型详图
![enter image description here](http://chuantu.biz/t2/11/1438743158x-1566638895.png)
----------
###变量命名规则
暂未完成
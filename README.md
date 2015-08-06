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
###**一、使用说明**
 **1.bat批处理脚本开启服务器使用注意事项：**
 （1）需将文件夹重新命名为“io-server”；
 （2）需将文件夹放置C盘根目录下。
 （3）如果系统未运行过本程序，则在安装Node.js后打开“安装完成node后执行.bat”，再打开“start all.bat”;
 
 
 **二.手动开启服务器使用说明：**
 （1）第一次运行需先安装socket.io和pm2模块：打开命令窗口，切换至文件夹所在路径（cd c:\io-server）,首先安装socket.io(npm install socket.io),然后全局安装pm2(npm install -g pm2)
 （2）打开文件夹里对应系统类型的redis文件夹，找到redis-server.exe并打开；
 （3）开启命令客户端：node server-command.js或者pm2 start server-command.js;
 （4）开启传输客户端：node servertcp.js或者pm2 start servertcp.js（建议使用后者）。
 （5）一定要注意开启的顺序
 
 
 **三.关闭所有服务操作说明：**
 （1）关闭传输客户端。如果使用pm2模块开启的服务器，需先在命令窗口执行“pm2 stop XXXXXXXX.js”;如果直接使用node命令开启，直接关闭命令窗口即可；
 （2）关闭命令客户端。方法如上。
 （3）关闭redis缓存服务；
 （4）打开任务管理器，找到所有的Node进程并结束进程。
 （5）一定要注意关闭的顺序。

### **二、系统模型简图**

*redis实现服务器间信息共享*
![enter image description here](http://chuantu.biz/t2/11/1438744468x-1566638895.png)

###**三、系统模型详图**

![enter image description here](http://chuantu.biz/t2/11/1438743158x-1566638895.png)
----------



###**四、变量命名规则**
<br>
<div>
模块名称：command.js
    <table class="table table-bordered">
          <tr>
              <td>变量名称</td>
              <td>位置</td>
              <td>说明</td>
         </tr>
         <tr>
              <td>http</td>
              <td>1</td>
              <td>引入http模块</td>
        </tr>
    <tr>
              <td>express</td>
              <td>2</td>
              <td>引入express模块</td>
          </tr>
    <tr>
              <td>sio</td>
              <td>3</td>
              <td>引入socket.io模块</td>
    </tr>
    <tr>
              <td>settings</td>
              <td>4</td>
              <td>引入自定义的settings模块</td>
    </tr>
    <tr>
              <td>mysql</td>
              <td>5</td>
              <td>引入Mysql模块</td>
    </tr>
    <tr>
              <td>app</td>
              <td>6</td>
              <td>创建express实例</td>
    </tr>
    <tr>
              <td>path</td>
              <td>7</td>
              <td>引入path模块</td>
    </tr>
     <tr>
              <td>redis</td>
              <td>8</td>
              <td>引入redis模块</td>
    </tr>
     <tr>
              <td>fs</td>
              <td>9</td>
              <td>引入fs模块</td>
    </tr>
     <tr>
              <td>server</td>
              <td>10</td>
              <td>创建服务器</td>
    </tr>
    <tr>
              <td>socket</td>
              <td>16</td>
              <td>socket对象，监听1338命令端口</td>
    </tr>
     <tr>
              <td>client</td>
              <td>17</td>
              <td>与redis服务器连接的客户端</td>
    </tr>
     <tr>
              <td>connection</td>
              <td>18</td>
              <td>创建与mysql数据库的连接</td>
    </tr>
    <tr>
              <td>connection</td>
              <td>20</td>
              <td>内置的事件名称，当两端连接上时触发</td>
    </tr>
     <tr>
              <td>meterReading</td>
              <td>23</td>
              <td>自定义的事件名称，监听来自命令客户端的事件</td>
    </tr>
     <tr>
              <td>command</td>
              <td>25</td>
              <td>Redis缓存中的一个键名</td>
    </tr>
     <tr>
              <td>command</td>
              <td>30</td>
              <td>Mysql数据库中的一个表</td>
    </tr>
    <tr>
              <td>data</td>
              <td>23</td>
              <td>表示由command.html发送来的数据对象，有commandSend,code,meterid三个属性（抄表命令，任务编码，表号）</td>
    </tr>
     <tr>
              <td>metertask</td>
              <td>33</td>
              <td>Mysql数据库中的一个表</td>
    </tr>
    <tr>
              <td>setInfo</td>
              <td>40</td>
              <td>自定义事件，监听command.html的setInof事件</td>
    </tr>
     <tr>
              <td>setting</td>
              <td>43</td>
              <td>Redis缓存中的一个键名</td>
    </tr>
    <tr>
              <td>setting</td>
              <td>48</td>
              <td>Mysql数据库中的一个表</td>
    </tr>
     <tr>
              <td>disconnect</td>
              <td>54</td>
              <td>自定义事件，当断开连接时触发此事件</td>
    </tr>
   </table>
</div>
<br>
<br>
<div>
模块名称：servertcp.js
<br>
   <table class="table table-bordered">
     <tr>
        <td>变量名称</td>
        <td>位置</td>
        <td>说明</td>
     </tr>
      <tr>
        <td>cp</td>
        <td>5</td>
        <td>引入child_process模块</td>
     </tr>
      <tr>
        <td>sendMail</td>
        <td>6</td>
        <td>引入自定义的sendMail模块</td>
     </tr>
     <tr>
        <td>savedata1</td>
        <td>10</td>
        <td>开启的第一个子进程</td>
     </tr>
      <tr>
        <td>savedata2</td>
        <td>11</td>
        <td>开启的第二个子进程</td>
     </tr>
     <tr>
        <td>savedata3</td>
        <td>12</td>
        <td>开启的第三个子进程</td>
     </tr>
      <tr>
        <td>savedata4</td>
        <td>13</td>
        <td>开启的第四个子进程</td>
     </tr>
     <tr>
        <td>connection</td>
        <td>15</td>
        <td>当TCP客户端与服务器连接后触发</td>
     </tr>
      <tr>
        <td>socket</td>
        <td>16</td>
        <td>TCP客户端与服务器连接后产生了socket对象</td>
     </tr>
     <tr>
        <td>data</td>
        <td>21</td>
        <td>内置事件，当客户端向服务器发送数据后触发</td>
     </tr>
      <tr>
        <td>decode</td>
        <td>22</td>
        <td>代表从buffer解码后的数据</td>
     </tr>
     <tr>
        <td>messageSend</td>
        <td>23</td>
        <td>对象，代表传递给子进程的数据</td>
     </tr>
      <tr>
        <td>originaldata</td>
        <td>25</td>
        <td>Redis缓存中的一个键名</td>
     </tr>
     <tr>
        <td>randomNum</td>
        <td>28</td>
        <td>代表一个随机数</td>
     </tr>
      <tr>
        <td>error</td>
        <td>48</td>
        <td>内置事件，当有错误发生时触发</td>
     </tr>
     <tr>
        <td>end</td>
        <td>54</td>
        <td>内置事件，当连接正常断开时触发</td>
     </tr>
      <tr>
        <td>close</td>
        <td>60</td>
        <td>内置事件，当连接彻底关闭是触发</td>
     </tr>
     <tr>
        <td>message</td>
        <td>68</td>
        <td>内置事件，当收到子进程的消息后触发</td>
     </tr>
      <tr>
        <td>timer</td>
        <td>69</td>
        <td>计次器，每发送一次后加一</td>
     </tr>
     <tr>
        <td>process</td>
        <td>70</td>
        <td>代表命令发送的进度</td>
     </tr>
      <tr>
        <td>intervalKey</td>
        <td>71</td>
        <td>代表间隔发送的函数</td>
     </tr>
     <tr>
        <td>Intervalsend（）</td>
        <td>72</td>
        <td>代表要每隔几秒执行的函数</td>
     </tr>
   </table>
</div>
<br>
<br>
<div>
模块名称：savedata.js
  <table class="table table-bordered">
     <tr>
        <td>变量名称</td>
        <td>位置</td>
        <td>说明</td>
     </tr>
     <tr>
        <td>parse</td>
        <td>1</td>
        <td>引入自定义的parse.js模块</td>
     </tr>
      <tr>
        <td>process</td>
        <td>8</td>
        <td>Node中的全局变量，随时可使用</td>
     </tr>
      <tr>
        <td>saveData（）</td>
        <td>12</td>
        <td>把数据从redis中读出，并解析，存入数据库</td>
     </tr>
      <tr>
        <td>llen</td>
        <td>13</td>
        <td>redis中列表类型键值的长度</td>
     </tr>
      <tr>
        <td>response</td>
        <td>16</td>
        <td>操作redis缓存的结果</td>
     </tr>
      
  </table>
</div>
<br>
<br>
<div>
模块名称：child.js
<table class="table table-bordered">
     <tr>
        <td>变量名称</td>
        <td>位置</td>
        <td>说明</td>
     </tr>
     <tr>
        <td>readcommand()</td>
        <td>5</td>
        <td>函数，读取缓存中的命令</td>
     </tr>
     <tr>
        <td>sett</td>
        <td>10</td>
        <td>对象，代表要传递给父进程的数据</td>
     </tr>
     <tr>
        <td>ss</td>
        <td>30</td>
        <td>无实际意义，执行函数</td>
     </tr>
     
  </table>
</div>
<br>
<br>
<div>
模块名称：command.html
<table class="table table-bordered">
     <tr>
        <td>变量名称</td>
        <td>位置</td>
        <td>说明</td>
     </tr>
     <tr>
        <td>fnDate()</td>
        <td>21</td>
        <td>函数，用于获取当前时间</td>
     </tr>
      <tr>
        <td>fnW（）</td>
        <td>34</td>
        <td>函数，辅助获取时间函数</td>
     </tr>
      <tr>
        <td>command</td>
        <td>41</td>
        <td>代表与1338端口连接（命令服务器）</td>
     </tr>
      <tr>
        <td>meterReading()</td>
        <td>42</td>
        <td>函数，发送读表命令</td>
     </tr>
      <tr>
        <td>parse1</td>
        <td>61</td>
        <td>提取表号的前两位</td>
     </tr>
      <tr>
        <td>parse2</td>
        <td>62</td>
        <td>提取表号的第3-4位</td>
     </tr>
      <tr>
        <td>parse3</td>
        <td>63</td>
        <td>提取表号的前第5-6位</td>
     </tr>
      <tr>
        <td>parse4</td>
        <td>64</td>
        <td>提取表号的后两位</td>
     </tr>
      <tr>
        <td>commandSend</td>
        <td>65</td>
        <td>抄表命令</td>
     </tr>
      <tr>
        <td>Data</td>
        <td>66</td>
        <td>一个对象，有commandSend,code ,meterid三个属性</td>
     </tr>
      <tr>
        <td>meterReading</td>
        <td>75</td>
        <td>自定义事件，向服务器发送meterReading事件</td>
     </tr>
      <tr>
        <td>setInfo（）</td>
        <td>81</td>
        <td>抄表设置函数，点击界面的设置按钮时触发</td>
     </tr>
      <tr>
        <td>Time</td>
        <td>82</td>
        <td>抄表间隔时间</td>
     </tr>
      <tr>
        <td>frequency</td>
        <td>83</td>
        <td>抄表次数</td>
     </tr>
      <tr>
        <td>setinfo</td>
        <td>93</td>
        <td>一个对象,有time,frequency两个属性</td>
     </tr>
      <tr>
        <td>setInfo</td>
        <td>96</td>
        <td>自定义事件，向服务器发送setInfo事件</td>
     </tr>
  </table>
</div>
----------

###**五、模块功能说明**
<div>
      <table class="table table-bordered">
<tr>
     <td>模块名称</td>
     <td>功能说明</td>
</tr>
     <td>servertcp.js</td>
     <td>传输服务器，用来与客户端的连接及向客户端发送命令和接收数      据</td>
 </tr>
 <tr>
     <td>server-command.js</td>
     <td>命令服务器，发送抄表命令</td>
 </tr>
<tr>
     <td>client.js</td>
     <td>用Javascript写的TCP客户端，只作测试用</td>
 </tr>
 <tr>
     <td>child.js</td>
     <td>servertcp的子进程，用来监控redis缓存</td>
 </tr>
 <tr>
     <td>savedata.js</td>
     <td>servertcp的子进程，用于数据操作，从redis中读取原始数据经过加工后存入数据库</td>
 </tr>
 <tr>
     <td>sendMail.js</td>
     <td>发送邮件模块</td>
 </tr>
 <tr>
     <td>settings.js</td>
     <td>保存配置信息的模块，包括mysql，redis，nodemailer模块的配置</td>
 </tr>
 <tr>
     <td>testservertcp.js</td>
     <td>用于测试</td>
 </tr>
 <tr>
     <td>command.html</td>
     <td>命令服务器的客户端</td>
 </tr>
 </table>
</div>


###**六、服务器压力测试记录**
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
<table class="table table-bordered table-striped" >
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

Finished By : Minghui Zhao,SHU
------------------------------
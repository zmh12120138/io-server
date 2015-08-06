var net=require('net');
var redis=require('redis'); //引入redis模块
var settings=require('./settings.js');  //引入自定义的setting.js模块
var mysql=require('mysql');  //引入Mysql模块
var cp=require('child_process');  //引入child_process模块
var sendMail=require('./sendMail.js');  //引入自定义的sendMail模块，用来发送邮件
var client=redis.createClient(settings.redis.port);   //建立redis客户端并连接至redis服务器
var connection=mysql.createConnection({host:settings.mysql.host,port:settings.mysql.port,database:settings.mysql.database,user:settings.mysql.user,password:settings.mysql.password});
var server=net.createServer();
var saveData1= cp.fork(__dirname+'/savedata.js'); //再次开启子进程
var saveData2= cp.fork(__dirname+'/savedata.js'); //再次开启子进程
var saveData3= cp.fork(__dirname+'/savedata.js'); //再次开启子进程
var saveData4= cp.fork(__dirname+'/savedata.js'); //再次开启子进程
var child=cp.fork(__dirname+'/child.js');
server.on('connection',function(socket){
    socket.setKeepAlive(true,10000);   //设置保持运行,每隔10秒向客户端发送一个带有ACK标志的空TCP包来触发客户端的空应答
    socket.setNoDelay(true);      //设置无延时
    server.getConnections(function(err,count){
        console.log('当前连接数量:'+count);
    });   //获取当前连接数量
    socket.on('data',function(data){
        var decode=data.toString('hex');
        var messageSend={};
        if(decode.length>25){
            client.lpush('originaldata',decode,function(err,response){
                if(err) throw (err);
                else{
                    var randomNum=Math.floor(Math.random()*4)+1;  //生成0-4之间的随机数,分别对应相应的子进程
                    if(randomNum==1){
                        saveData1.send(messageSend);     //随机数为1的时候，向第一个子进程发送消息
                    }
                    if(randomNum==2){
                        saveData2.send(messageSend);   //随机数为2的时候，向第二个子进程发送消息
                    }
                    if(randomNum==3){
                        saveData3.send(messageSend);   //随机数为3的时候，向第三个子进程发送消息
                    }
                    if(randomNum==4){
                        saveData4.send(messageSend);  //随机数为4的时候，向第四个子进程发送消息
                    }
                }
            });
        }else{
            console.log('数据长度不够,或为心跳包'+decode);
        }

    });
    socket.on('error',function(err){
        console.log('与客户端通信的过程中发生了一个错误,错误编码为s%',err.code);
        sendMail.sendMail('与客户端通信的过程中发生了一个错误,错误编码为'+err.code+new Date().toLocaleString());
        socket.destroy;
    });       //当客户端或者服务器在未断开连接的情况下,关闭了,会触发此error事件

    socket.on('end',function(){
        server.getConnections(function(err,count){
            console.log('当前连接数量:'+count);
        });
    });    //当客户端与服务器正常断开连接后,触发此end事件

    socket.on('close',function(had_error){
        if(had_error){
            console.log('由于一个错误导致socket端口被关闭。');
            sendMail.sendMail('由于一个错误导致socket端口被关闭。'+new Date().toLocaleString());
        }else{
            console.log('socket端口被正常关闭。');
        }
    })  //检测socket端口关闭是否有错误
    child.on('message',function(m){    //监听来自child的message事件,监听到后根据信息来发送命令
        var timer=0;
        var progress;
        var intervalKey=null;
        function intervalsend(){
            timer++;
            progress=(timer/(m.frequency)*100).toFixed(2);
            socket.write(m.commandSend);
            console.log('命令已发送'+timer+'次   进度'+progress+'%');
            if(timer>=m.frequency){
                clearInterval(intervalKey);
                intervalKey=null;
                console.log('本次任务执行完毕！');
                connection.query('UPDATE metertask SET ? WHERE ?',[{executetime:new Date().toUTCString()},{sendtime: m.sendtime}],function(err,result){
                    if(err)  throw (err);
                });
            }
        }
        intervalKey=setInterval(intervalsend,m.time*1000);
    });
});
server.on('error', function(err) {
      console.log('Error occurred:'+ err.message);
      sendMail.sendMail('Error occurred:' + err.message);
     });
server.listen(1337);
server.on('close',function(){  //监听服务器关闭的事件close
    console.log('TCP服务器被关闭');
    sendMail.sendMail('TCP服务器被关闭'+new Date().toLocaleString());
});
process.on('uncaughtException', function(err) {
    server.close();
    sendMail.sendMail('未捕获异常发生,服务器已关闭,异常信息'+err+new Date().toLocaleString());
});
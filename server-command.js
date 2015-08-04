var http=require('http');   //引入http模块
var express=require('express'); //引入express模块
var sio=require('socket.io'); //引入socket.io模块
var settings=require('./settings.js');  //引入settings.js模块---数据库设置
var mysql=require('mysql');  //引入Mysql模块
var app=express();  //创建express实例
var path=require('path');  //引入path模块
var redis=require('redis'); //引入redis模块
var fs = require('fs');  //引入fs模块
var server=http.createServer(app);
app.get('/',function(req,res){
    res.sendfile(__dirname+'/command.html');
});   //设置路由，当客户端请求'/'时，发送文件command.html
app.use(express.static(path.join(__dirname, 'public')));  //设置public文件夹为静态资源文件夹
server.listen(1338);
var socket=sio.listen(server);  //监听1338端口
var client=redis.createClient(settings.redis.port);   //建立redis客户端并连接至redis服务器
var connection=mysql.createConnection({host:settings.mysql.host,port:settings.mysql.port,database:settings.mysql.database,user:settings.mysql.user,password:settings.mysql.password});
//连接至Mysql数据库
socket.on('connection',function(socket){
    //监听connection事件
    console.log('与客户端的命令连接通道已经建立');
    socket.on('meterReading',function(data) {
        //监听meterReading事件
        client.hmset('command', 'code', data.code, 'commandSend', data.commandSend,'sendtime',data.sendtime ,'status', 'true', function (err, response) {
            if (err) throw (err);
            console.log('命令已经存入缓存');
        });   //将抄表命令写入redis缓存中

        connection.query('INSERT INTO command SET ?',{content:data.commandSend,type:data.type,remark:data.remark},function(err,result){
            if(err)  throw (err);
            console.log('已保存至command表');      //保存命令、类型、备注信息到command表中
            connection.query('INSERT INTO metertask SET ?',{sendby:data.sendby,sendtime:data.sendtime},function(err,result){
                if(err)  throw (err);
                console.log('已保存至metertask表');  //保存发送人、发送时间到metertask表中
            });
        });
    });

    socket.on('setInfo',function(data) {
        //监听setInfo事件
        console.log('正在修改配置信息!');
        client.hmset('setting', 'time', data.time, 'frequency', data.frequency, 'status', 'true', function (err, response) {
            if (err) throw (err);
            console.log('配置信息已经存入缓存');
        });       //将配置信息写入redis缓存中

        connection.query('UPDATE setting SET ? WHERE id=1',{time:data.time,frequency:data.frequency},function(err,result){
            if(err)  throw(err);
            else{console.log('配置信息保存成功！')}
        });  //将配置信息保存至数据库的setting表中
    });

    socket.on('disconnect',function(){
        //监听disconnect事件
        console.log('已经断开命令通道连接！');
    });
});
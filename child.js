var redis=require('redis');
var sendMail=require('./sendMail.js')
var settings=require('./settings.js');  //引入自定义的setting.js模块
var client=redis.createClient(settings.redis.port);   //建立redis客户端并连接至redis服务器
function readcommand(){
    client.hgetall('command',function(err,response){
        if(err) throw (err);
        else{
            if(response.status=='true'){
                var sett={};
                sett.commandSend=response.commandSend;
                sett.sendtime=response.sendtime;
                 client.hmset('command','status','false',function(err,response){
                 if(err) throw (err);
                 });
                client.hgetall('setting',function(err,response){
                    sett.time=response.time;
                    sett.frequency=response.frequency;
                    process.send(sett);
                });
            }
            if(!response.status){
                //不做任何操作
            }
        }

    });
}

var ss=setInterval(readcommand,1000);

process.on('exit',function(){
    sendMail.sendMail(new Date().toLocaleString()+'监控缓存的进程已经退出！')
})

var net=require('net');
var client=new net.Socket();
client.setEncoding('utf8');
client.connect(1337,'localhost',function(){
    console.log('已连接');
});
client.on('data',function(data){
    console.log(data);
    client.write('FE FE FE FE FE FE FE FE FE FE FE FE FE 68 25 91 09 20 59 00 11 11 81 2E 1F 90 12 00 00 00 00 05 00 03 00 00 05 00 00 00 00 17 00 00 00 00 35 27 00 00 00 2C 60 14 00 74 14 00 46 54 00 51 49 09 22 04 10 20 00 00 6D 16');
})
client.on('error',function(err){
    console.log('与服务器通信的过程中发生了一个错误,错误编码为%s',err.code);
    client.destroy;
});
client.on('close',function(){
    console.log('connection closed')
});

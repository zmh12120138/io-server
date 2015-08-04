var parse=require('./parse.js');  //引入自定义的parse.js模块
var redis=require('redis'); //引入redis模块
var settings=require('./settings.js');  //引入自定义的setting.js模块
var mysql=require('mysql');  //引入Mysql模块
var connection=mysql.createConnection({host:settings.mysql.host,port:settings.mysql.port,database:settings.mysql.database,user:settings.mysql.user,password:settings.mysql.password});
//连接mysql数据库，设置信息在settings.js模块
var client=redis.createClient(settings.redis.port);   //建立redis客户端并连接至redis服务器
process.on('message',function(m){    //当收到父进程发送的消息后，执行saveData()函数
    saveData(m);
});

function saveData(data) {
    var llen = client.llen('originaldata');    //获取redis中originaldata列表的长度

    if (llen != 0) {
        client.rpop('originaldata',function(err,response){
            if(err) throw(err);
            else{
                console.log('收到数据:'+response);
                connection.query('INSERT INTO originaldata SET ?', {originaldata: response, date: new Date()}, function (err, result) {
                    if (err)  throw (err);
                    else {
                        console.log('数据已经存入数据库!');
                    }
                });  //将原始数据插入数据库的originaldata表中
              /*  var afterparse = parse.parseAll(response); //并调用parse模块中的parseAll方法解析数据
                connection.query('INSERT INTO test1 SET ?', {meterid: afterparse.meterid, cold: afterparse.cold, warm: afterparse.warm, power: afterparse.power, flow: afterparse.flow, flowacc: afterparse.flowacc, temwatersupply: afterparse.temwatersupply, temwaterreturn: afterparse.temwaterreturn, worktime: afterparse.worktime, metertime: afterparse.metertime, status: afterparse.status}, function (err, result) {
                    if (err) throw (err);
                    else console.log('本条记录解析完毕，已存入数据库 ' );
                });  //将解析后的数据存储至数据库的test1表中  */
            }
        });

    }
}
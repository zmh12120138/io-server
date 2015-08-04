var n1,n2;

exports.parseMeterid=function(data){
    var meterid;
    var m1=data.indexOf('00 11 11');
    var m2=m1-1-data.length;
    var  meterid1=data.slice(m2-2,m2);
    var  meterid2=data.slice(m2-5,m2-3);
    var  meterid3=data.slice(m2-8,m2-6);
    var  meterid4=data.slice(m2-11,m2-9);
    meterid=meterid1+meterid2+meterid3+meterid4;
    return meterid;
};

exports.parseCold=function(data){
    var cold,cold1,cold2,cold3,cold4;
    n1=data.indexOf('1F 90 12');
    n2=n1+9;
    cold1=data.slice(n2,n2+2)*0.01;
    cold2=data.slice(n2+3,n2+5)*1;
    cold3=data.slice(n2+6,n2+8)*100;
    cold4=data.slice(n2+9,n2+11)*10000;
    cold=cold1+cold2+cold3+cold4;
    return cold;
};

exports.parseWarm=function (data){
    var warm, w,warm1,warm2,warm3,warm4;
    n1=data.indexOf('1F 90 12');
    n2=n1+9;
    w=n2+15;
    warm1=data.slice(w,w+2)*0.01;
    warm2=data.slice(w+3,w+5)*1;
    warm3=data.slice(w+6,w+8)*100;
    warm4=data.slice(w+9,w+11)*10000;
    warm=warm1+warm2+warm3+warm4;
    return warm;

};

exports.parsePower=function(data){
    n1=data.indexOf('1F 90 12');
    n2=n1+9;
    var power, p,power1,power2,power3,power4;
    p=n2+30;
    power1=data.slice(p,p+2)*0.01;
    power2=data.slice(p+3,p+5)*1;
    power3=data.slice(p+6,p+8)*100;
    power4=data.slice(p+9,p+11)*10000;
    power=power1+power2+power3+power4;
    return power;
};

exports.parseFlow=function(data){
    n1=data.indexOf('1F 90 12');
    n2=n1+9;
    var flow, f,flow1,flow2,flow3,flow4;
    f=n2+45;
    flow1=data.slice(f,f+2)*0.01;
    flow2=data.slice(f+3,f+5)*1;
    flow3=data.slice(f+6,f+8)*100;
    flow4=data.slice(f+9,f+11)*10000;
    flow=flow1+flow2+flow3+flow4;
    return flow;
};
exports.parseFlowacc=function(data){
    n1=data.indexOf('1F 90 12');
    n2=n1+9;
    var flowacc, f,flowacc1,flowacc2,flowacc3,flowacc4;
    f=n2+60;
    flowacc1=data.slice(f,f+2)*0.01;
    flowacc2=data.slice(f+3,f+5)*1;
    flowacc3=data.slice(f+6,f+8)*100;
    flowacc4=data.slice(f+9,f+11)*10000;
    flowacc=flowacc1+flowacc2+flowacc3+flowacc4;
    return flowacc;
};

exports.parseTemwatersupply=function(data){
    n1=data.indexOf('1F 90 12');
    n2=n1+9;
    var temwatersupply, t,temwatersupply1,temwatersupply2,temwatersupply3;
    t=n2+75;
    temwatersupply1=data.slice(t,t+2)*0.01;
    temwatersupply2=data.slice(t+3,t+5)*1;
    temwatersupply3=data.slice(t+6,t+8)*100;
    temwatersupply=temwatersupply1+temwatersupply2+temwatersupply3;
    return temwatersupply;
};

exports.parseTemwaterreturn=function(data){
    n1=data.indexOf('1F 90 12');
    n2=n1+9;
    var temwaterreturn, t,temwaterreturn1,temwaterreturn2,temwaterreturn3;
    t=n2+84;
    temwaterreturn1=data.slice(t,t+2)*0.01;
    temwaterreturn2=data.slice(t+3,t+5)*1;
    temwaterreturn3=data.slice(t+6,t+8)*100;
    temwaterreturn=temwaterreturn1+temwaterreturn2+temwaterreturn3;
    return temwaterreturn;
};

exports.parseWorktime=function(data){
    n1=data.indexOf('1F 90 12');
    n2=n1+9;
    var worktime, w,worktime1,worktime2,worktime3;
    w=n2+93;
    worktime1=data.slice(w,w+2)*1;
    worktime2=data.slice(w+3,w+5)*100;
    worktime3=data.slice(w+6,w+8)*10000;
    worktime=worktime1+worktime2+worktime3;
    return worktime;
};
exports.parseMetertime=function(data){
    n1=data.indexOf('1F 90 12');
    n2=n1+9;
    var date, d,year,month,day,hour,minute,second;
    d=n2+102;
    second=data.slice(d,d+2);
    minute=data.slice(d+3,d+5);
    hour=data.slice(d+6,d+8)*1-8;
    day=data.slice(d+9,d+11);
    month=data.slice(d+12,d+14)*1-1;
    year=data.slice(d+18,d+20)+data.slice(d+15,d+17);
    var date=new Date(Date.UTC(year,month,day,hour,minute,second));
    return date;
};

exports.parseStatus=function(data) {
    n1 = data.indexOf('1F 90 12');
    n2 = n1 + 9;
    var status, s, status1, status2;
    s = n2 + 123;
    status1 = data.slice(s, s + 2);
    status2 = data.slice(s + 3, s + 5);
    if (status1 == '00' && status2 == '00') {
        return "正常";
    }
    if (status1 == '04') {
        return '电池欠压';
    }
    if (status2 == '02') {
        return '进水故障';
    }
    if (status2 == '06') {
        return '进水回水故障';
    }
    if (status2 == '80') {
        return '无水';
    }
    if (status2 == '40') {
        return '水倒流';
    }
};
exports.parseAll=function(data){
    var afterParse={};
    afterParse.meterid=this.parseMeterid(data);
    afterParse.cold=this.parseCold(data);
    afterParse.warm=this.parseWarm(data);
    afterParse.power=this.parsePower(data);
    afterParse.flow=this.parseFlow(data);
    afterParse.flowacc=this.parseFlowacc(data);
    afterParse.temwatersupply=this.parseTemwatersupply(data);
    afterParse.temwaterreturn=this.parseTemwaterreturn(data);
    afterParse.worktime=this.parseWorktime(data);
    afterParse.metertime=this.parseMetertime(data);
    afterParse.status=this.parseStatus(data);
    return afterParse;
}
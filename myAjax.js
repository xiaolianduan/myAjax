// ajax({
//     url:"index.php",
//     type:"get",
//     date:{
//         id:1,
//         name:"zhangsan"
//     },
//     dateType:"text",
//     success:function (date) {
//         box.innerHTML=date;
//     }
// })


function ajax(obj) {
    if(typeof obj!="object"){
        console.error("参数数据类型错误")
    }
    if(obj.url==undefined){
        console.error("没有输入地址")
    }

    var url=obj.url;
    var type=obj.type||"get";
    var dateType=obj.dateType||"text";

    var async=async==="undefined"?true:async;

    var date=obj.date;
    if(typeof date=="object"){
        var str="";
        for (var i in date){
            str+=i+"="+date[i]+"&"
        }
        date=str.slice(0,-1);
    }


    var xmlobj =window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");

    if(type=="get"){
        xmlobj.open(type,url+"?"+date);
        xmlobj.send();
    }else if(type=="post"){
        xmlobj.open(type,url);
        xmlobj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xmlobj.send(date);
    }

    xmlobj.onreadystatechange=function() {
        if (xmlobj.readyState == 4) {
            if (xmlobj.status == 200) {
                var result;
                if (dateType == "text") {
                    result = xmlobj.responseText;
                }else if (dateType == "xml") {
                    result = xmlobj.responseXML;
                }else if (dateType == "json") {
                    var str = xmlobj.responseText;
                    result = eval("("+str+")");     //eval只能操控字符串,所用用括号连接成字符串
                }
                obj.success(result)
            }
        }
    }

}

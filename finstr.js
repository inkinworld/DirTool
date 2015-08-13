var path = require("path");
var fs = require("fs");
var arg = process.argv;

var filePath = arg[2];
var lookingForString = arg[3];
var replaceString = arg[4];

//执行函数
recursive(filePath,repl);

//计数器
(function(){
    var i = 0;
    return function counter(){
        return ++i;
    }
})()

//递归查询
function recursive(fileName,callback){
    if(!fs.existsSync(fileName)) return;

    if(isFile(fileName)){
        callback(fileName)
    }

    if(isDir(fileName)){
        fs.readdirSync(fileName).forEach(function(val,key){
            var temp = path.join(fileName,val)
            find(temp,callback)
        })
    }
}

//检查字符
function check(fileName){
    var data = readFile(fileName);
    var exc = new RegExp(lookingForString);
    if(exc.test(data))
        console.log(fileName); 
}
//替换字符
function repl(fileName){
	var data = readFile(fileName);
	var exc = new RegExp(lookingForString);
    if(exc.test(data))
    data =	data.replace(lookingForString , replaceString);
	writeFile(fileName,data)
}


//是否是文件夹
function isDir(fileName){
    if(fs.existsSync(fileName)) return fs.statSync(fileName).isDirectory();
}

//是否为文件
function isFile(fileName){
    if(fs.existsSync(fileName)) return fs.statSync(fileName).isFile();
}
//读取文件
function readFile(fileName){
    if(fs.existsSync(fileName)) return fs.readFileSync(fileName,"utf-8");
}
//写入文件
function writeFile(fileName,data){
	if(fs.existsSync(fileName)) 
		fs.writeFile(fileName,data)
}

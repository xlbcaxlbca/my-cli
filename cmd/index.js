#! node
const path = require("path");
const fs = require("fs");
const clone = require("git-clone");
const rm = require('rimraf');

var config = {};
//解析命令
process.argv.slice(2).forEach(function(item){
    switch(item){
        case "-j":
            config.jquery = true;
            break;
        case "-v":
            config.vue = true;
            break;
    }
})


var dist = path.resolve(".");
var source = path.resolve(__dirname, "../templates");
//拷贝templates到当前目录
function copy(src, dist){
   fs.readdir(src, function(err, paths){
       if(err){
            console.error("读取文件夹失败=====", err.message.trim());
            return;
        }
        paths.forEach(function(pathItem){
            var childSrc = path.resolve(src, pathItem);
            var childDist = path.resolve(dist, pathItem);
            var readable, writable;
            fs.stat(childSrc, function(err, stats){
                if(err){
                    console.error("fs.stat失败=====", err.message.trim());
                    throw err;
                }

                if(stats.isFile()){
                    exists(childDist, function(){
                        readable = fs.createReadStream(childSrc);
                        writable = fs.createWriteStream(childDist);
                        readable.pipe(writable);
                    })
                }
                else if(stats.isDirectory()){
                    exists(childDist, function(){
                        fs.mkdir(childDist, function(){
                            copy(childSrc, childDist);
                        })
                    })
                }
            })
        })
   })
    
    // var gitPath = "https://github.com/xlbcaxlbca/my-cli.git";
    // clone(gitPath, targetPath, function(err){
    //     if(err){
    //         console.error("拷贝失败=====" + gitPath + ":" + err.message.trim());
    //     }
    //     else{
    //         console.log("拷贝文件成功:", targetPath);
    //         rm.sync(path.resolve(targetPath, ".git"));
    //     }
    // })
}
    
//测试dist下文件是否已经存在
var exists = function(dist, callback){
    fs.exists(dist, function(exists){
        if(exists){
            console.error("文件" + dist + "已经存在!!");
        }
        else{
            callback();
        }
    })
}

copy(source, dist);
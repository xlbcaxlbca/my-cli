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

var testFiles = [path.resolve("./package.json"), path.resolve("./webpack.config.js")]
//拷贝templates到当前目录
function copyTemplate(){
    var sourceSrc = path.join(__dirname, "templates");
    var targetPath = path.resolve(".");
    
    //测试文件是否已经存在
    testFiles.forEach((item) => {
        if(fs.existsSync(item))
        {
            console.error("文件"+item+"已经存在，请检查是否使用该cli生成模板");
            return;
        }
    })

    clone(sourceSrc, targetPath, function(err){
        if(err){
            console.error("拷贝失败=====" + sourceSrc + ":" + err.message.trim());
        }
        else{
            console.log("拷贝文件成功:", targetPath);
        }
    })
}
copyTemplate();
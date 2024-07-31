const path=require('path')
const fs= require('fs')
const filePath=path.join(__dirname,'testfoo','index.handlebars')
fs.exists(filePath,(exists)=>{
    if(exists){
    console.log('file exists')
    }
    else{
        console.log('file does not exist')
    }
})
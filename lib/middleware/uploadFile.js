"use strict"
const multer=require('multer')
const fs =require('fs')

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads/")
    },
    filename:function(req,file,cb){
        cb(null,new Date().getTime()+file.originalname)
    }
})
let upload=multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*5
    }
})

let saveDataURI=(dataURI)=>{
    let regex = /^data:(.+)\/(.+);base64,(.*)$/;
    let matches = dataURI.match(regex);
    let ext = matches[2];
    let data = matches[3];
    let buffer = new Buffer.from(data, 'base64');
    let filename=new Date().getTime()+'.' + ext
    let pathFile=__dirname+'/../uploads/'+filename
    fs.writeFileSync(pathFile, buffer);
    return {
        url:'/uploads/'+filename,
        type:matches[1]
    }
}

let getDataAttach=req=>{
    let dataAttach
    if(req.file){
        dataAttach={
            url:'/uploads/'+req.file.filename,
            type:req.file.mimetype.split('/')[0]
        }
    }else{
        if(req.body.fileDataUri){
            dataAttach=saveDataURI(req.body.fileDataUri)
        }
    }
    return dataAttach
}

module.exports={upload,getDataAttach}
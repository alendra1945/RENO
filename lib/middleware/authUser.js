const jwt=require('jsonwebtoken')
const neode=require("../routes/OGM/connector")

function isUser(req,res,next){
    try {
        token=req.headers.authorization
        decoded=jwt.verify(token,"secretkey")
        req.userData=decoded
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            status:"Unauthorized",
            message:"Auth Failed"
        })
    }
}
function isAdmin(req,res,next){
    isUser(req,res,function(){
        neode.findById('User',req.userData.identity).then(dataUser=>{
            if(dataUser._properties.get('isStaff')){
                next()
            }else{
                res.status(403).json({
                    status:"Forbidden",
                    message:"You Not Admin"
                }) 
            }
        })
    })
}
module.exports={isUser,isAdmin}
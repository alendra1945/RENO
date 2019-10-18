module.exports={
    "labels":["User"],
    "username":{
        type:"string",
        unique: 'true',
        required:true
    },
    "email":{
       type: "string",
       email:true,
    },
    "firstName":"string",
    "lastName":"string",
    "password":{
        type:"string",
        required:"true",
    },
    "isStaff":{
       type:"boolean",
       default:false,
    },
    "isSuperuser":{
        type:"boolean",
        default:false,
     },
    "isActive":{
        type:"boolean",
        default:false,
     },
    "dateJoined":{
        type: 'datetime',
        default: () => new Date,
    },
    "lastLogin":'datetime'
}
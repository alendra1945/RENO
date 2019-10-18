const express = require('express');
const router = express.Router();
const neode = require('../OGM/connector');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const label="User"

/**
 * @swagger
 * /user/signUp:
 *   post:
 *     tags:
 *      - User
 *     summary: Create User
 *     description: 
 *     consumes:
 *      - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *      - in: body
 *        name: body
 *        description:  Properties need to define.
 *        required: true
 *        schema:
 *           type: object
 *           required:
 *             - username
 *             - password
 *           properties:
 *             username:
 *               type: string
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: Success
 *       202:
 *         description: No Action Performed
 *       400:
 *         description: Error
 *       500:
 *         description: Internal Server Error
 */

router.post('/signUp', (req, res, next) => {
    neode.first('User',"username",req.body.username).then(result=>{
        if(!result){
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        status:'error',
                        message: err
                    })
                }else{
                    neode.create('User',{
                        ...req.body,
                        password:hash,
                        isActive: true,
                    })
                    .then(result=>{
                        console.log(result)
                        return res.status(201).json({status: 'Success', message: label + ' Created', id: Number(result._identity)})
                    })
                    .catch(err=>{
                        console.log(err)
                        return res.status(400).json({
                            status:'error',
                            message: err.details[0].message
                        })
                    })
                }
                
            })
        }else{
            return res.status(409).json({
                status:'error',
                message: req.body.username+" Already exist"
            })
        }
    })
    
});


/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *      - User
 *     summary: Create User
 *     description: 
 *     consumes:
 *      - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *      - in: body
 *        name: body
 *        description:  Properties need to define.
 *        required: true
 *        schema:
 *           type: object
 *           required:
 *             - username
 *             - password
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 *       202:
 *         description: No Action Performed
 *       400:
 *         description: Error
 *       500:
 *         description: Internal Server Error
 */

router.post('/login', (req, res, next) => {
    neode.first('User',"username",req.body.username).then(user=>{
        if(user){
            bcrypt.compare(req.body.password,user.get('password'),(err,result)=>{
                if(err){
                    console.log(err)
                }
                if(result){
                  const token = jwt.sign({
                        username:user.get('username'),
                        email:user.get('email'),
                        identity:user._identity
                    },"secretkey",{
                        expiresIn:"1h"
                    })
                    return res.status(200).json({
                        status:'Success',
                        message: "Auth Succesful",
                        token:token
                    })
                }
                res.status(400).json({
                    status:'error',
                    message: "Auth Failed"
                })
                
            })
        }else{
            return res.status(400).json({
                status:'error',
                message: "Auth Failed"
            })
        }
    })
    
});
module.exports=router
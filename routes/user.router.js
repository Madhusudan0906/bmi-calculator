require("dotenv").config();
const express = require("express");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const Auth = require("../middlewares/Authmiddleware");
const cookies = require("cookies");

const userRouter = express.Router();

userRouter.use(cookieParser());

userRouter.get('/',Auth,async(req,res)=>{

    try{
        const userId = req.body.userId;
        console.log(userId);
        const user=await UserModel.findById(userId,{password:0,_id:0,__v:0});
        res.send({"user":user});
    }catch(e){
        res.status(400).send("something went wrong.");
    }

})

userRouter.post('/signup',async(req,res)=>{
    try{
        let user=req.body;
        const userExist = await UserModel.findOne({email:user.email});
        if(userExist!==null){
            res.status(406).send("user already exist.");
        }else{
            user.password = bcrypt.hashSync(user.password,10);
            await UserModel.create(user);
            res.send("user created successfully.");
        }

    }catch(e){
        res.status(400).send("something went wrong.");
    }
})
userRouter.post('/login',async(req,res)=>{
    try{
        let user = req.body;
        const userExist = await UserModel.findOne({email:user.email});
        if(userExist===null){
            res.status(406).send("user already exist.");
        }else{
            
            const same = bcrypt.compareSync(user.password,userExist.password);
            
            if(!same){
                req.status(401).send("wrong credentials.");
            }
            else{
                const token = jwt.sign({userId:userExist._id,name:userExist.name,email:userExist.email},`${process.env.SECRET}`,{expiresIn:'1h'});
                res.send({"token":token});
            }
        }
    }catch(e){
        res.status(400).send("something went wrong.");
    }
})
userRouter.post('/logout',Auth,async(req,res)=>{
    try{
        res.send("user LogOut.");
    }catch(e){
        res.status(400).send("something went wrong.");
    }
})

module.exports = userRouter;
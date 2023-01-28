require("dotenv").config();
const express = require("express");
const BmiModel = require("../models/bmi.model");
const Auth = require("../middlewares/Authmiddleware");

const bmiRouter = express.Router();


bmiRouter.post('/calculate',Auth,async(req,res)=>{
    try{
        const {weight,height}=req.body;
        const bmi = (weight/((height*0.3048)**2)).toFixed(2);
        req.body.bmi=bmi;
        if(bmi<18.5){
            req.body.result="underweight";
        }else if(bmi<25){
            req.body.result="normal weight";
        }else if(bmi<30){
            req.body.result="overweight";
        }else if(bmi<35){
            req.body.result="obesity";
        }else{
            req.body.result="extreme obesity";
        }
        await BmiModel.create(req.body);
        res.send({"bmi":bmi,"result":req.body.result});
    }catch(e){
        res.status(400).send("something went wrong.");
    }
})

bmiRouter.get('/all',Auth,async(req,res)=>{
    try{
        const bmis = await BmiModel.find({userId:req.userId});
        res.send({"bmis":bmis});
    }catch(e){
        res.status(400).send("something went wrong.");
    }
})


module.exports = bmiRouter;
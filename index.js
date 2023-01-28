require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./config/db");
const userRouter = require("./routes/user.router");
const bmiRouter = require("./routes/bmi.router");

const PORT=process.env.PORT||5004;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/user',userRouter);
app.use('/bmi',bmiRouter);

app.get('/',(req,res)=>{
    res.send({
        "message":"hello world!"
    })
})

app.listen(PORT,async()=>{
    try{
        await connect();
        console.log("db connection established");
    }catch(e){
        console.log("db connection failed");
    }
    console.log(`server listening at PORT No. ${PORT}`)
});
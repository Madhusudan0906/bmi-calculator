require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const MONGO_URL=process.env.MONGO_URL;

const connect=()=>{
    return mongoose.connect(`${MONGO_URL}`);
}

module.exports = connect;
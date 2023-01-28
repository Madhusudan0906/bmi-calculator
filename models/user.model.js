const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name:{type:String},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true}
})

const UserModel = mongoose.model('user',userSchema);

module.exports = UserModel;
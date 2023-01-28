const mongoose = require("mongoose");


const bmiSchema = mongoose.Schema({
    bmi:{type:Number},
    result:{type:String},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    date:{type:mongoose.Schema.Types.Date,default:new Date()}
})

const BmiModel = mongoose.model('bmi',bmiSchema);

module.exports = BmiModel;
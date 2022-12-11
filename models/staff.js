const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const staffSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    email :{
        type: String,
        required : true,
        unique: true
    },
    password :{
        type: String,
        required : true
    },
    role :{
        type: String,
        required : true
    },
    createddt:{
        type: Date,
        default:Date.now()
    }
});

staffSchema.plugin(uniqueValidator);
const staffInfo = mongoose.model('staff', staffSchema);
module.exports = staffInfo;
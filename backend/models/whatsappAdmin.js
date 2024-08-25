const { Types } = require("mongoose");
const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");
  
  const whatsappAdminSchema = new Schema({
    name:{
      type:String,

    },
    mobile:{
        type:String,
        unique:true,
        required:true,
    },
    allContacts:[
     {
      type:Schema.Types.ObjectId,
      ref:"whatsappContact"
     }
    ]
  })
//Username and password(hashing,salting) default
whatsappAdminSchema.plugin(passportLocalMongoose);
  module.exports = mongoose.model("whatsappAdmin",whatsappAdminSchema); 
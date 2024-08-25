const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const whatsappMessageSchema = new Schema({
    message:{
        type:String,
       
    },
    sendByMe:{
        type:String,

    },
    time:{
        type:String,
        required:true,
    }       
  })
  module.exports = mongoose.model("whatsappMessage",whatsappMessageSchema)
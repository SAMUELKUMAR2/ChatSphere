const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const MessageSchema = new mongoose.Schema({
    senderId: Schema.Types.ObjectId,

    receiverId: Schema.Types.ObjectId,

    message: String,
    timestamp: { type: Date, default: Date.now },
});

  module.exports = mongoose.model("whatsappMessage",MessageSchema)
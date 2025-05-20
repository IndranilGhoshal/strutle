const { default: mongoose } = require("mongoose");

const eventModel = new mongoose.Schema({
    mstAdminId:String,
    userAgent:String,
    eventName:String,
    deviceType:String,
    isDelete:String,
    createdAt:String
},{
    timestamps:true
});

export const adminEventSchema = mongoose.models.mstadminlogs || mongoose.model("mstadminlogs", eventModel);
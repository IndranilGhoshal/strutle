import { connectionStr } from "@/app/lib/db";
import { adminSchema } from "@/app/model/adminModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { dencryptFunction, encryptFunction } from "../../_apiFunction/EncryptDecryptFunction";


export async function PUT(request) {
    const payload = await request.json();
    let success = false;
    let message;
    let result;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });

    if(payload.accountreset){
        const checkResult = await adminSchema.find({ _id: payload.id })
        if (checkResult.length > 0) {
            if (dencryptFunction(checkResult[0].password) !== payload.password) {
                let r = await adminSchema.findOneAndUpdate({ _id: payload.id }, { password: encryptFunction(payload.password), isfirstlogin:"1", status:"0" })
                if (r) {
                    result = await adminSchema.findOne({ _id: payload.id })
                    success = true
                    message = "The password has been reset successfully"
                }
            } else {
                success = false
                message = "New password can not be same as last old password"
            }
        } else {
            success = false
            message = "User Not Found!"
        }
    }else{
        const checkResult = await adminSchema.find({ _id: payload.id })
        if (checkResult.length > 0) {
            if (dencryptFunction(checkResult[0].password) !== payload.password) {
                result = await adminSchema.findOneAndUpdate({ _id: payload.id }, { password: encryptFunction(payload.password) })
                if (result) {
                    success = true
                    message = "The password has been reset successfully"
                }
            } else {
                success = false
                message = "New password can not be same as last old password"
            }
        } else {
            success = false
            message = "User Not Found!"
        }
    }

    
    return NextResponse.json({ result, success, message });
}
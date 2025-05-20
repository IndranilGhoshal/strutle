import { connectionStr } from "@/app/lib/db";
import { adminSchema } from "@/app/model/adminModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { dencryptFunction, encryptFunction } from "../../_apiFunction/EncryptDecryptFunction";
import { StatusCodes } from "../../_apiFunction/StatusCode";


export async function POST(request) {
    try {
        const payload = await request.json();
        let success = false;
        let message;
        let result;
        let responsestatus;
        await mongoose.connect(connectionStr, { useNewUrlParser: true });
        if (payload.accountreset) {
            const checkResult = await adminSchema.findOne({ _id: payload.id })
            if (checkResult) {
                if (dencryptFunction(checkResult.password) !== payload.password) {
                    let r = await adminSchema.findOneAndUpdate({ _id: payload.id }, { password: encryptFunction(payload.password), isfirstlogin: "1", status: "0" })
                    if (r) {
                        result = await adminSchema.findOne({ _id: payload.id })
                        responsestatus = StatusCodes.SUCCESS
                        success = true
                        message = "The password has been reset successfully"
                    }
                } else {
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false
                    message = "New password can not be same as last old password"
                }
            } else {
                responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                success = false
                message = "User Not Found!"
            }
        }
        else {
            const checkResult = await adminSchema.findOne({ _id: payload.id })
            if (checkResult) {
                if (dencryptFunction(checkResult.password) !== payload.password) {
                    result = await adminSchema.findOneAndUpdate({ _id: payload.id }, { password: encryptFunction(payload.password) })
                    if (result) {
                        responsestatus = StatusCodes.SUCCESS
                        success = true
                        message = "The password has been reset successfully"
                    }
                } else {
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false
                    message = "New password can not be same as last old password"
                }
            } else {
                responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                success = false
                message = "User Not Found!"
            }
        }
        return NextResponse.json({ result, success, message, status: responsestatus, error: 0 });
    } catch (e) {
        return NextResponse.json({ result: null, success: false, status: StatusCodes.INTERNAL_SERVER_ERROR, error: 1 })
    }
}
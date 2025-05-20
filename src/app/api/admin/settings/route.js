import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { MiddlewareRequest } from "../../_apiFunction/Middleware";
import { StatusCodes } from "../../_apiFunction/StatusCode";
import { dencryptFunction, encryptFunction } from "../../_apiFunction/EncryptDecryptFunction";
import { adminSchema } from "@/app/model/adminModel";

export async function POST(request) {
    let middeleware = await MiddlewareRequest()
    if (middeleware) {
        try {
            let payload = await request.json();
            let result;
            let success;
            let message;
            let responsestatus;
            await mongoose.connect(connectionStr, { useNewUrlParser: true });
            if (payload.changepassword) {
                let results = await adminSchema.findOne({ _id: payload.id, status: { $in: ['0'] } })
                if (results) {
                    if (dencryptFunction(results.password) == payload.oldpassword) {
                        let r = await adminSchema.findOneAndUpdate({ _id: payload.id }, { password: encryptFunction(payload.password) })
                        if (r) {
                            result = null
                            responsestatus = StatusCodes.SUCCESS
                            success = true
                            message = "The password has been change successfully"
                        }
                    } else {
                        responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                        success = false
                        message = "Old Password is incorect"
                    }
                } else {
                    success = false;
                    message = "Admin Not Found"
                    responsestatus = StatusCodes.SUCCESS
                }
            }
            return NextResponse.json({ result, success, message, status: responsestatus, error: 0 })
        } catch (e) {
            return NextResponse.json({ result: null, success: false, message: "Internal Server Error", status: StatusCodes.INTERNAL_SERVER_ERROR, error: 1 })
        }
    } else {
        return NextResponse.json({ result: null, success: false, status: StatusCodes.Unauthorized, error: 1 })
    }
}
import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { dencryptFunction, encryptFunction } from "../../_apiFunction/EncryptDecryptFunction";
import { StatusCodes } from "../../_apiFunction/StatusCode";
import { sellersSchema } from "@/app/model/sellerModal";


export async function POST(request) {
    try {
        const payload = await request.json();
        let success = false;
        let message;
        let result;
        let responsestatus;
        await mongoose.connect(connectionStr, { useNewUrlParser: true });
        if (payload.accountreset) {
            const checkResult = await sellersSchema.findOne({ _id: payload.id })
            if (checkResult) {
                if (dencryptFunction(checkResult.password) !== payload.password) {
                    let r = await sellersSchema.findOneAndUpdate({ _id: payload.id }, { password: encryptFunction(payload.password) })
                    if (r) {
                        result = null
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
                message = "Seller Not Found!"
            }
        }
        return NextResponse.json({ result, success, message, status: responsestatus, error: 0 });
    } catch (e) {
        return NextResponse.json({ result: null, success: false, status: StatusCodes.INTERNAL_SERVER_ERROR, error: 1 })
    }
}
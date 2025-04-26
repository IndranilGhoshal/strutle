import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { adminSchema } from "@/app/model/adminModel";
import { dencryptFunction } from "../../_apiFunction/EncryptDecryptFunction";
import { getsignintoken } from "../../_apiFunction/SignWebToken";
import { StatusCodes } from "../../_apiFunction/StatusCode";

export async function POST(request) {
    try {
        let payload = await request.json();
        let result;
        let success;
        let message;
        let responsestatus;
        await mongoose.connect(connectionStr, { useNewUrlParser: true });
        let results = await adminSchema.findOne({ email: payload.email, status: { $in: ['0', '1', '3'] } })
        if (results) {
            if (results.status == "1") {
                success = false;
                message = "User is inavtive"
                responsestatus = StatusCodes.Unauthorized
            } else {
                if (dencryptFunction(results.password) !== payload.password) {
                    success = false;
                    message = "Credentials entered are incorrect"
                    responsestatus = StatusCodes.Unauthorized
                } else {
                    let token = getsignintoken(results._id)
                    let obj = {
                        "_id": results._id,
                        "mstroleid": results.mstroleid,
                        "image": results.image,
                        "firstname": results.firstname,
                        "lastname": results.lastname,
                        "email": results.email,
                        "countryname": results.countryname,
                        "countrycode": results.countrycode,
                        "dialCode": results.dialCode,
                        "phone": results.phone,
                        "isfirstlogin": results.isfirstlogin,
                        "token": token,
                    }
                    result = obj
                    message = "Login Successfully"
                    success = true;
                    responsestatus = StatusCodes.SUCCESS
                }
            }
        } else {
            responsestatus = StatusCodes.Unauthorized
            success = false;
            message = "User not found"
        }
        return NextResponse.json({ result, success, message, status: responsestatus, error: 0 })
    } catch (e) {
        return NextResponse.json({ result: null, success: false, message:"Internal Server Error", status: StatusCodes.INTERNAL_SERVER_ERROR, error: 1 })
    }
}

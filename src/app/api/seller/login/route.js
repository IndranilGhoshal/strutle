import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { dencryptFunction } from "../../_apiFunction/EncryptDecryptFunction";
import { getsignintoken } from "../../_apiFunction/SignWebToken";
import { StatusCodes } from "../../_apiFunction/StatusCode";
import { sellersSchema } from "@/app/model/sellerModal";

export async function POST(request) {
    try{
        let payload = await request.json();
        let result;
        let success;
        let message;
        let responsestatus;
        await mongoose.connect(connectionStr, { useNewUrlParser: true });
        let results = await sellersSchema.findOne({ email: payload.email, status: { $in: ['0',"1"] } })
        if (results) {
            if (results.status == "1") {
                success = false;
                message = "Seller is inavtive"
                responsestatus = StatusCodes.SUCCESS
            } else {
                if (dencryptFunction(results.password) !== payload.password) {
                    success = false;
                    message = "Credentials entered are incorrect"
                    responsestatus = StatusCodes.SUCCESS
                } else {
                    let token = getsignintoken(results._id)
                    let obj = {
                        "_id": results._id,
                        "image": results.image,
                        "name": results.name,
                        "email": results.email,
                        "phone": results.phone,
                        "esignature":results.esignature,
                        "esignaturetype":results.esignaturetype,
                        "islogin":results.islogin,
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
            message = "Seller not found"
        }
        return NextResponse.json({ result, success, message, status: responsestatus, error: 0 })
    }catch(e){
        return NextResponse.json({ result: null, success: false, message:"Internal Server Error", status: StatusCodes.INTERNAL_SERVER_ERROR, error: 1 })
    }
}

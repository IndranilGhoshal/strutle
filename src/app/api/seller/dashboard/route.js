import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { sellersSchema } from "@/app/model/sellerModal";
import { MiddlewareRequest } from "../../_apiFunction/Middleware";
import { StatusCodes } from "../../_apiFunction/StatusCode";

export async function POST(request) {
    let middeleware = await MiddlewareRequest()
    if(middeleware){
        try {
            let payload = await request.json();
            let result;
            let success;
            let message;
            let responsestatus;
            await mongoose.connect(connectionStr, { useNewUrlParser: true });
            if (payload.islogin) {
                let res = await sellersSchema.findOneAndUpdate({ _id: payload.id }, { islogin: "1" })
                if (res) {
                    let results = await sellersSchema.findOne({ _id: payload.id, status: { $in: ['0'] } })
                    let obj = {
                        "_id": results._id,
                        "image": results.image,
                        "name": results.name,
                        "email": results.email,
                        "phone": results.phone,
                        "esignature":results.esignature,
                        "islogin":results.islogin,
                        "token": payload.token,
                    }
                    result = obj
                    responsestatus = StatusCodes.SUCCESS
                    success = true
                    message = ""
                }else{
                    result = null
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false
                    message = "Internal Server Error"
                }
            }
            return NextResponse.json({ result, success, message, status: responsestatus, error: 0 })
        } catch (e) {
            return NextResponse.json({ result: null, success: false, message: "Internal Server Error", status: StatusCodes.INTERNAL_SERVER_ERROR, error: 1 })
        }
    }else{
        return NextResponse.json({ result: null, success: false, status: StatusCodes.Unauthorized, error: 1 })
    }
}
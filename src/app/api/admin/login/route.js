import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { adminSchema } from "@/app/model/adminModel";
import { dencryptFunction} from "../../_apiFunction/EncryptDecryptFunction";

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success;
    let message;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    result = await adminSchema.findOne({email: payload.email,status: { $in: ['0', '1', '3'] }})
    if (result) {
        if(result.status == "1"){
            success = false;
            message="User is inavtive"
        }else{
            if(dencryptFunction(result.password) !== payload.password){
                success = false;
                message="Credentials entered are incorrect"
            }else{
                message="Login Successfully"
                success = true;
            }
        }
    }else{
        success = false;
        message="User not found"
    }
    return NextResponse.json({ result, success, message })
}

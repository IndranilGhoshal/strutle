import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { adminSchema } from "@/app/model/adminModel";
import ForgotPasswordEmailFunction from "../../_apiFunction/ForgotPasswordEmailFunction";
const {authEmail} = process.env

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success = false;
    let message;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    result = await adminSchema.findOne({ email: payload.email})
    if (result) {
        let forgortEmailResp = await ForgotPasswordEmailFunction({ id:result._id, from:authEmail, to: payload.email, name:result.firstname+" "+result.lastname})
        if(forgortEmailResp.success){
            success = true;
            message = "An email with the reset password link has been sent to the email address in your profile."+
            " If you did not receive the email, verify that the email address is "+
            "correct or contact the system administrator."
        }else{
            message = "Email not send!"
        }
    }else{
        message = "Invalid email id"
    }
    return NextResponse.json({ result, success, message })
}

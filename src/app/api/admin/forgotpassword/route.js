import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { adminSchema } from "@/app/model/adminModel";
import ForgotPasswordEmailFunction from "../../_apiFunction/ForgotPasswordEmailFunction";
import { StatusCodes } from "../../_apiFunction/StatusCode";
const { authEmail } = process.env

export async function POST(request) {
    try {
        let payload = await request.json();
        let result;
        let success = false;
        let message;
        let responsestatus;
        await mongoose.connect(connectionStr, { useNewUrlParser: true });
        result = await adminSchema.findOne({ email: payload.email })
        if (result) {
            let forgortEmailResp = await ForgotPasswordEmailFunction({ id: result._id, from: authEmail, to: payload.email, name: result.firstname + " " + result.lastname, link:'/admin/resetPassword/' })
            if (forgortEmailResp.success) {
                success = true;
                responsestatus = StatusCodes.SUCCESS
                message = "An email with the reset password link has been sent to the email address in your profile." +
                    " If you did not receive the email, verify that the email address is " +
                    "correct or contact the system administrator."
            } else {
                success = false;
                responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                message = "Email not send!"
            }
        } else {
            success = false;
            responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
            message = "Invalid email id"
        }
        return NextResponse.json({ result, success, message , status: responsestatus, error: 0})
    } catch (e) {
        return NextResponse.json({ result:null, success:false, status: StatusCodes.INTERNAL_SERVER_ERROR, error: 1 })
    }
}

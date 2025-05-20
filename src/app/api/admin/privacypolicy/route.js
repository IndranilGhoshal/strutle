import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { privacypoliciesSchema} from "@/app/model/adminModel";
import { MiddlewareRequest } from "../../_apiFunction/Middleware";
import { StatusCodes } from "../../_apiFunction/StatusCode";

export async function POST(request) {
    let middeleware = await MiddlewareRequest()
    if (middeleware) {
        try {
            let payload = await request.json();
            let result;
            let success = false;
            let message;
            let listlength;
            let filter;
            let sortObj;
            let responsestatus;
            await mongoose.connect(connectionStr, { useNewUrlParser: true });
            //Add
            if (payload.addprivacypolicy) {
                let check = await privacypoliciesSchema.findOne({ usertype: payload.usertype, status: { $in: ['0'] } })
                if (check) {
                    let r = await privacypoliciesSchema.findOneAndUpdate({ _id: check._id }, { htmlcode: payload.htmlcode })
                    if (r) {
                        responsestatus = StatusCodes.SUCCESS
                        success = true;
                        message = "Privacy Policy Update Successfully"
                    } else {
                        responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                        success = false;
                        message = "Internal server error"
                    }
                } else {
                    let Obj = {
                        usertype: payload.usertype,
                        htmlcode: payload.htmlcode,
                        status: "0",
                    }
                    const res = new privacypoliciesSchema(Obj);
                    let r = await res.save()
                    if (r) {
                        responsestatus = StatusCodes.SUCCESS
                        success = true;
                        message = "Add Privacy Policy Successfully"
                    } else {
                        responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                        success = false;
                        message = "Internal server error"
                    }
                }
            } else if (payload.getprivacypolicy) {
                filter = { usertype: { $regex: new RegExp(payload.usertype, 'i') }, status: { $in: ['0'] } }
                let results = await privacypoliciesSchema.findOne(filter);
                if (results) {
                    responsestatus = StatusCodes.SUCCESS
                    result = results
                    success = true
                    message = "Privacy Policy found"
                } else {
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false
                    message = "Privacy Policy not found"
                }
            }
            return NextResponse.json({ result, success, message, listlength, status: responsestatus, error: 0 })
        } catch (e) {
            return NextResponse.json({ result: null, success: false, status: StatusCodes.INTERNAL_SERVER_ERROR, error: 1 })
        }
    } else {
        return NextResponse.json({ result: null, success: false, status: StatusCodes.Unauthorized, error: 1 })
    }
}

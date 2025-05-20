import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { termsconditionsSchema} from "@/app/model/adminModel";
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
            if (payload.addtermscondition) {
                let check = await termsconditionsSchema.findOne({ usertype: payload.usertype, status: { $in: ['0'] } })
                if (check) {
                    let r = await termsconditionsSchema.findOneAndUpdate({ _id: check._id }, { htmlcode: payload.htmlcode })
                    if (r) {
                        responsestatus = StatusCodes.SUCCESS
                        success = true;
                        message = "Terms and Conditions Update Successfully"
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
                    const res = new termsconditionsSchema(Obj);
                    let r = await res.save()
                    if (r) {
                        responsestatus = StatusCodes.SUCCESS
                        success = true;
                        message = "Add Terms and Conditions Successfully"
                    } else {
                        responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                        success = false;
                        message = "Internal server error"
                    }
                }
            } 
            else if (payload.gettermscondition) {
                filter = { usertype: { $regex: new RegExp(payload.usertype, 'i') }, status: { $in: ['0'] } }
                let results = await termsconditionsSchema.findOne(filter);
                if (results) {
                    responsestatus = StatusCodes.SUCCESS
                    result = results
                    success = true
                    message = "Terms and Conditions found"
                } else {
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false
                    message = "Terms and Conditions not found"
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

import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { adminMenuSchema, adminRoleMenuSchema, adminRoleSchema, adminSchema, faqsSchema, roleSchema } from "@/app/model/adminModel";
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
            //List
            if (payload.faqlist) {

                // ------------Filter Start------------ //
                // search
                if (payload.search) {
                    filter = { role: { $regex: new RegExp(payload.search, 'i') }, status: { $in: ['0', '1'] } }
                }
                //deault
                else {
                    filter = { status: { $in: ['0', '1'] } };
                }
                // ------------Filter End------------ //

                // ------------Sort Start------------ //
                sortObj = {}
                // ------------Sort End------------ //

                // ------------List Length Start------------ //
                let len = await faqsSchema.find(filter)
                listlength = len.length
                // ------------List Length End------------ //

                // ------------List Start------------ //
                let results = await faqsSchema.find(filter).sort(sortObj).limit(payload.limit).skip(payload.skip);

                if (results.length > 0) {
                    responsestatus = StatusCodes.SUCCESS
                    result = results
                    success = true
                    message = "FAQ found"
                } else {
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false
                    message = "FAQ not found"
                }
                // ------------List End------------ //
            }
            //Add
            else if (payload.addfaq) {
                let results = await faqsSchema.findOne({ question: payload.question, status: { $in: ['0', '1'] } })
                if (!results) {
                    let Obj = {
                        question: payload.question,
                        answer: payload.answer,
                        status: payload.status
                    }
                    const res = new faqsSchema(Obj);
                    let r = await res.save()
                    if (r) {
                        responsestatus = StatusCodes.SUCCESS
                        success = true;
                        message = "Add FAQ successfully"
                    } else {
                        responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                        success = false;
                        message = "Internal server error"
                    }
                } else {
                    responsestatus = StatusCodes.FOUND
                    success = false;
                    message = "FAQ Already exist"
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

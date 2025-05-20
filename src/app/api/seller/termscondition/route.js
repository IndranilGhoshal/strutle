import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { termsconditionsSchema } from "@/app/model/sellerModal";

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success = false;
    let message;
    let listlength;
    let obj
    let filter;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });

    if (payload.getprivacypolicy) {
        filter = { usertype: { $regex: new RegExp(payload.usertype, 'i') }, status: { $in: ['0'] } }
        let results = await termsconditionsSchema.findOne(filter);
        if (results) {
            result = results
            success = true
            message = "Terms and Condition found"
        } else {
            success = false
            message = "Terms and Condition not found"
        }
    }
    return NextResponse.json({ result, success, message, listlength })
}
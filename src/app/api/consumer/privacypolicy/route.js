import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { privacypoliciesSchema } from "@/app/model/consumerModal";

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
        let results = await privacypoliciesSchema.findOne(filter);
        if (results) {
            result = results
            success = true
            message = "Privacy Policy found"
        } else {
            success = false
            message = "Privacy Policy not found"
        }
    }
    return NextResponse.json({ result, success, message, listlength })
}
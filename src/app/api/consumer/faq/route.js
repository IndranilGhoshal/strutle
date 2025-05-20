import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { faqsSchema} from "@/app/model/consumerModal";

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success = false;
    let message;
    let listlength;
    let obj
    let filter;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });

    if (payload.getfaq) {
        filter = { status: { $in: ['0'] } }
        let results = await faqsSchema.find(filter);
        if (results) {
            result = results
            success = true
            message = "FAQ found"
        } else {
            success = false
            message = "FAQ not found"
        }
    }
    return NextResponse.json({ result, success, message, listlength })
}
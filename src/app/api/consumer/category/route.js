import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { categorySchema } from "@/app/model/adminModel";

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success = false;
    let message;
    let listlength;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });

    //List
    if (payload.list) {
        // ------------List Start------------ //
        result = await categorySchema.find({ status: { $in: ['0'] } });
        if (result.length > 0) { 
            success = true
            message = "Category found"
        } else {
            success = false
            message = "Category not found"
        }
        // ------------List End------------ //
    }else if(payload.details){
        result = await categorySchema.findOne({ _id: payload.mstcategoryid, status: { $in: ['0'] } });
        if (result) { 
            success = true
            message = "Category found"
        } else {
            success = false
            message = "Category not found"
        }
    }
    return NextResponse.json({ result, success, message, listlength })
}
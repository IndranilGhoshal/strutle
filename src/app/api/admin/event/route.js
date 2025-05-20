import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { adminEventSchema } from "@/app/model/eventModel";
import { StatusCodes } from "../../_apiFunction/StatusCode";

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success = false;
    let responsestatus;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    try{
        const log = new adminEventSchema(payload);
        result = await log.save()
        if (result) {
            responsestatus = StatusCodes.CREATED
            success = true;
        }else{
            responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
        }
        return NextResponse.json({ result, success, status: responsestatus, error: 0 })
    }catch(e){
        return NextResponse.json({ result:null, success:false, status: StatusCodes.INTERNAL_SERVER_ERROR, error: 1 })
    }
}

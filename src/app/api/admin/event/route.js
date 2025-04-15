import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { adminEventSchema } from "@/app/model/eventModel";

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success = false;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    const log = new adminEventSchema(payload);
    result = await log.save()
    if (result) {
        success = true;
    }
    return NextResponse.json({ result, success })
}

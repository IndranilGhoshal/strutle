
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { consumerSchema } from "@/app/model/consumerModal";

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success = false;
    let message;
    let filter;

    await mongoose.connect(connectionStr, { useNewUrlParser: true });

    //Details
    if (payload.details) {
        filter = { _id: payload.id, status: { $in: ['0'] } }
        let results = await consumerSchema.findOne(filter);
        if (results) {
            let data = {
                "_id": results._id,
                "image": results.image,
                "firstname": results.firstname,
                "lastname": results.lastname,
                "dateofbirth": results.dateofbirth,
                "gender": results.gender,
                "email": results.email,
                "phone": results.phone,
                "createdAt": results.createdAt,
                "updatedAt": results.updatedAt
            }
            result = data
            success = true
            message = "Consumer found"
        } else {
            success = false
            message = "Consumer not found"
        }
    }
    //Image Edit
    else if(payload.uploadimage){
        let res = await consumerSchema.findOne({ _id: payload.id })
        if (res) {
            let data = {
                "image": payload.image
            }
            result = await consumerSchema.findOneAndUpdate({ _id: payload.id }, data)
            if (result) {
                success = true
                message = "Consumer image update successfully"
            } else {
                success = false
                message = "Consumer image not update successfully"
            }
        } else {
            success = false;
            message = "Consumer not exist"
        }
    }
    //Edit
    else {
        let res = await consumerSchema.findOne({ _id: payload.id })
        if (res) {
            let data = {
                "firstname": payload.firstname,
                "lastname": payload.lastname,
                "dateofbirth": payload.dateofbirth,
                "gender": payload.gender,
                "email": payload.email,
                "phone": payload.phone,
            }
            result = await consumerSchema.findOneAndUpdate({ _id: payload.id }, data)
            if (result) {
                success = true
                message = "Consumer update successfully"
            } else {
                success = false
                message = "Consumer not update successfully"
            }
        } else {
            success = false;
            message = "Consumer not exist"
        }
    }

    return NextResponse.json({ result, success, message})
}
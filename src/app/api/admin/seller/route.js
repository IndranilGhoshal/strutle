import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { sellerSchema } from "@/app/model/adminModel";
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
            if (payload.list) {

                // ------------Filter Start------------ //
                // search
                if (!payload.status && payload.search) {
                    filter = {
                        $or: [{ firstname: { $regex: new RegExp(payload.search, 'i') } },
                        { lastname: { $regex: new RegExp(payload.search, 'i') } },
                        { email: { $regex: new RegExp(payload.search, 'i') } }],
                        status: { $in: ['0', '1'] }
                    }
                }
                //status
                else if (payload.status && !payload.search) {
                    filter = { status: { $regex: new RegExp(payload.status, 'i') } }
                }
                //status,search
                else if (payload.status && payload.search) {
                    filter = {
                        $or: [{ firstname: { $regex: new RegExp(payload.search, 'i') } },
                        { lastname: { $regex: new RegExp(payload.search, 'i') } },
                        { email: { $regex: new RegExp(payload.search, 'i') } }],
                        status: { $regex: new RegExp(payload.status, 'i') }
                    }
                }
                //deault
                else {
                    filter = { status: { $in: ['0', '1'] } };
                }
                // ------------Filter End------------ //

                // ------------Sort Start------------ //
                //Name = 1, Email = 1, Createdat = 1
                if (payload.namesort == "1" && payload.emailsort == "1" && payload.createdatsort == "1") {
                    sortObj = { firstname: 1, email: 1, createdAt: 1 }
                }
                //Name = 1, Email = 1
                else if (payload.namesort == "1" && payload.emailsort == "1") {
                    sortObj = { firstname: 1, email: 1 }
                }
                //Email = 1, Createdat = 1
                else if (payload.emailsort == "1" && payload.createdatsort == "1") {
                    sortObj = { email: 1, createdAt: 1 }
                }
                //Name = 1, Createdat = 1
                else if (payload.namesort == "1" && payload.createdatsort == "1") {
                    sortObj = { firstname: 1, createdAt: 1 }
                }
                //Name = -1, Email = -1, Createdat = -1
                else if (payload.namesort == "-1" && payload.emailsort == "-1" && payload.createdatsort == "-1") {
                    sortObj = { firstname: -1, email: -1, createdAt: -1 }
                }
                //Name = -1, Email = -1
                else if (payload.namesort == "-1" && payload.emailsort == "-1") {
                    sortObj = { firstname: -1, email: -1 }
                }
                //Email = -1, Createdat = -1
                else if (payload.emailsort == "-1" && payload.createdatsort == "-1") {
                    sortObj = { email: -1, createdAt: -1 }
                }
                //Name = -1, Createdat = -1
                else if (payload.namesort == "-1" && payload.createdatsort == "-1") {
                    sortObj = { firstname: -1, createdAt: -1 }
                }
                //Name = 1 
                else if (payload.namesort == "1") {
                    sortObj = { firstname: 1 }
                }
                // Createdat = 1
                else if (payload.createdatsort == "1") {
                    sortObj = { createdAt: 1 }
                }
                // Email = 1
                else if (payload.emailsort == "1") {
                    sortObj = { email: 1 }
                }
                //Name = -1
                else if (payload.namesort == "-1") {
                    sortObj = { firstname: -1 }
                }
                // Createdat = -1
                else if (payload.emailsort == "-1") {
                    sortObj = { email: -1 }
                }
                // Email = -1
                else if (payload.createdatsort == "-1") {
                    sortObj = { createdAt: -1 }
                }
                // Defalut
                else {
                    sortObj = {}
                }
                // ------------Sort End------------ //

                // ------------List Length Start------------ //
                let len = await sellerSchema.find(filter)
                listlength = len.length
                // ------------List Length End------------ //

                // ------------List Start------------ //
                let result1 = await sellerSchema.find(filter).sort(sortObj).limit(payload.limit).skip(payload.skip);;
                let r = []
                if (result1.length > 0) {
                    responsestatus = StatusCodes.SUCCESS
                    result = result1
                    success = true
                    message = "Seller found"
                } else {
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false
                    message = "Seller not found"
                }
                // ------------List End------------ //
            }
            //Status
            else if (payload.onStatus) {
                result = await sellerSchema.findOneAndUpdate({ _id: payload.id }, { status: payload.status })
                if (result) {
                    if (payload.status == "2") {
                        message = "Seller delete successfully"
                    } else if (payload.status == "1") {
                        message = "Seller inactive successfully"
                    } else {
                        message = "Seller active successfully"
                    }
                    responsestatus = StatusCodes.SUCCESS
                    success = true
                } else {
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false
                    message = "Seller not found"
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
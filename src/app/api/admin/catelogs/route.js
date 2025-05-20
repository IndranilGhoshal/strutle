import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { categorySchema, productimageSchema, productSchema, productTypesSchema, subCategorySchema } from "@/app/model/adminModel";
import { StatusCodes } from "../../_apiFunction/StatusCode";
import { MiddlewareRequest } from "../../_apiFunction/Middleware";

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
            if (payload.cateloglist) {
                if (payload.search) {
                    filter = { productname: { $regex: new RegExp(payload.search, 'i') }, status: { $regex: new RegExp(payload.status, 'i') } }
                } else {
                    filter = { status: { $regex: new RegExp(payload.status, 'i') } }
                }
                sortObj = {}
                let len = await productSchema.find(filter)
                listlength = len.length
                let productresults = await productSchema.find(filter).sort(sortObj).limit(payload.limit).skip(payload.skip);
                if (productresults.length > 0) {
                    let temp = []
                    for (let t of productresults) {
                        let img = await productimageSchema.findOne({ mstproductid: t._id, productmainimage: { $in: ['1'] }, status: { $in: ['0'] } })
                        let obj = {
                            "_id": t._id,
                            "productname": t.productname,
                            "productmrp": t.productmrp,
                            "productquantity": t.productquantity,
                            "status": t.status,
                            "createdAt": t.createdAt,
                            image: img.productimage
                        }
                        temp.push(obj)
                    }
                    result = temp
                    success = true
                    message = "Product found"
                } else {
                    success = false
                    message = "Product not found"
                }
            }
            //Status -> Active, Inactive, Delete
            else if (payload.onStatus) {
                result = await productSchema.findOneAndUpdate({ _id: payload.id }, { status: payload.status })
                if (result) {
                    if (payload.status == "1") {
                        message = result.productname + " Product inactive successfully"
                    } 
                    else if (payload.status == "2") {
                        message = result.productname + " Product delete successfully"
                    }
                    else {
                        message = result.productname + " Product active successfully"
                    }
                    responsestatus = StatusCodes.SUCCESS
                    success = true
                } else {
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false
                    message = "Internal Server Error"
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
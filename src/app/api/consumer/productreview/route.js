import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { consumerSchema, productcolorvariantsvaluesSchema, productimageSchema, productreviewSchema, productSchema } from "@/app/model/consumerModal";

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success = false;
    let message;
    let filter;

    //product details
    if (payload.productdetails) {
        filter = { _id: payload.id, status: { $in: ['0'] } };
        let results = await productSchema.findOne(filter);
        if (results) {
            let image = await productimageSchema.findOne({ mstproductid: payload.id, productmainimage: { $in: ['1'] }, status: { $in: ['0'] } });
            let color = await productcolorvariantsvaluesSchema.findOne({ mstproductid: payload.id, status: { $in: ['0'] } })
            let obj ={
                "_id": results._id,
                "productimage": image.productimage,
                "productname": results.productname,
                "productcolor": color.colorname
            }
            result = obj
            success = true
            message = "Product found"
        } else {
            success = false
            message = "Product not found"
        }
    }
    //product review
    else if (payload.productreviews) {
        filter = { mstproductid: payload.id, status: { $in: ['0'] } };
        let results = await productreviewSchema.find(filter);
        if (results.length > 0) {
            let temp = results
            let o = []
            for (let [i, t] of temp.entries()) {
                let c = await consumerSchema.findOne({ _id: t.mstconsumerid, status: { $in: ['0'] } })
                let obj = {
                    _id: results._id,
                    consumername: c.firstname + " " + c.lastname,
                    consumerimage: c.image,
                    rate: t.rate,
                    description: t.description,
                    createdAt: t.createdAt
                }
                o.push(obj)
            }
            result = o
            success = true
            message = "Product review found"
        } else {
            success = false
            message = "Product review not found"
        }
    }

    return NextResponse.json({ result, success, message })
}
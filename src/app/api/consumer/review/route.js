import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { consumerSchema, favouritesSchema, productcolorvariantsSchema, productcolorvariantsvaluesSchema, productimageSchema, productinformationSchema, productotherattributesSchema, productotherattributevaluesSchema, productreviewSchema, productSchema } from "@/app/model/consumerModal";
import { categorySchema } from "@/app/model/adminModel";

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success = false;
    let message;
    let filter;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });

    //product details
    if (payload.productdetails) {
        filter = { _id: payload.id, status: { $in: ['0'] } };
        let results = await productSchema.findOne(filter);
        if (results) {
            let fav = await favouritesSchema.findOne({ mstconsumerid: payload.mstconsumerid, mstproductid: payload.id, status: { $in: ['0'] } })
            let obj = {
                "_id": results._id,
                "mstsellerid": results.mstsellerid,
                "mstcategoryid": results.mstcategoryid,
                "mstsubcategoryid": results.mstsubcategoryid,
                "mstproducttypeid": results.mstproducttypeid,
                "productname": results.productname,
                "producttitledescription": results.producttitledescription,
                "productmrp": results.productmrp,
                "productquantity": results.productquantity,
                "productdiscount": results.productdiscount,
                favourite: fav ? "1" : "0"
            }
            result = obj
            success = true
            message = "Product found"
        } else {
            success = false
            message = "Product not found"
        }
    }

    return NextResponse.json({ result, success, message })
}
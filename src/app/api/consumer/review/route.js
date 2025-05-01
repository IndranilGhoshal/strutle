import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { consumerSchema, favouritesSchema, orderproductshippingstatusSchema, orderproductsSchema, ordersSchema, productcolorvariantsSchema, productcolorvariantsvaluesSchema, productimageSchema, productinformationSchema, productotherattributesSchema, productotherattributevaluesSchema, productreviewSchema, productSchema, sellerbusinesdetailsSchema } from "@/app/model/consumerModal";
import { categorySchema } from "@/app/model/adminModel";

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success = false;
    let message;
    let filter;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });

    //order product details
    if (payload.orderproductdetails) {
        filter = { _id: payload.mstproductid, status: { $in: ['0'] } };
        let results = await productSchema.findOne(filter);
        if (results) {
            let image = await productimageSchema.findOne({ mstproductid: payload.mstproductid, productmainimage: { $in: ['1'] }, status: { $in: ['0'] } });
            let color = await productcolorvariantsvaluesSchema.findOne({ mstproductid: payload.mstproductid, status: { $in: ['0'] } })
            let shipped = await orderproductshippingstatusSchema.findOne({ mstorderid: payload.mstorderid, mstproductid: payload.mstproductid, status: { $in: ['0'] } })
            let order = await ordersSchema.findOne({ _id: payload.mstorderid, status: { $in: ['0'] } })
            let orderproduct = await orderproductsSchema.findOne({ mstproductid: payload.mstproductid, mstorderid: payload.mstorderid, status: { $in: ['0'] } })
            let orderproductsupplier = await sellerbusinesdetailsSchema.findOne({ mstsellerid: orderproduct.mstsellerid, status: { $in: ['0'] } })
            let obj = {
                "productid": results._id,
                "productname": results.productname,
                "productimage": image.productimage,
                "productcolor": color.colorname,
                "productquantity": orderproduct.orderproductquantity,
                "orderid": order._id,
                "orderdate": order.createdAt,
                "orderdelivereddate": shipped.orderproductdelivereddatetime,
                "seller": orderproductsupplier.businessname,
            }
            result = obj
            success = true
            message = "Product found"
        } else {
            success = false
            message = "Product not found"
        }
    } else if (payload.addreview) {
        let Obj = {
            mstproductid: payload.mstproductid,
            mstconsumerid: payload.mstconsumerid,
            rate: payload.rate,
            description: payload.description,
            status: "0",
        }
        const res = new productreviewSchema(Obj);
        let r = await res.save()
        if(r){
            success = true
            message = "Review submited"
        }else{
            success = false
            message = "Review submited"
        }
    }

    return NextResponse.json({ result, success, message })
}
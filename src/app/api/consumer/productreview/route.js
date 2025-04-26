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

    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    
    //product details
    if (payload.productdetails) {
        filter = { _id: payload.id, status: { $in: ['0'] } };
        let results = await productSchema.findOne(filter);
        if (results) {
            let image = await productimageSchema.findOne({ mstproductid: payload.id, productmainimage: { $in: ['1'] }, status: { $in: ['0'] } });
            let color = await productcolorvariantsvaluesSchema.findOne({ mstproductid: payload.id, status: { $in: ['0'] } })
            let obj = {
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
    //product review rating
    else if (payload.productrating) {
        filter = { _id: payload.id, status: { $in: ['0'] } };
        let results = await productSchema.find(filter);
        if (results.length > 0) {
            let rating = await productreviewSchema.find({ mstproductid: payload.id, status: { $in: ['0'] } })
            let averate = 0;
            let rateingcount = 0;
            let onerateingpersent = 0;
            let tworateingpersent = 0;
            let threerateingpersent = 0;
            let fourrateingpersent = 0;
            let fiverateingpersent = 0;
            let obj;
            if (rating.length > 0) {
                for (let [i, r] of rating.entries()) {
                    averate = averate + Number(r.rate)
                    rateingcount = rateingcount + 1
                    if(r.rate == "1"){
                        onerateingpersent = onerateingpersent + 1
                    }
                    else if(r.rate == "2"){
                        tworateingpersent = tworateingpersent + 1
                    }
                    else if(r.rate == "3"){
                        threerateingpersent = threerateingpersent + 1
                    }
                    else if(r.rate == "4"){
                        fourrateingpersent = fourrateingpersent + 1
                    }
                    else if(r.rate == "5"){
                        fiverateingpersent = fiverateingpersent + 1
                    }
                    if (i == rating.length - 1) {
                        obj = {
                            "_id": results._id,
                            averate: (Number(averate) / Number(rateingcount)).toFixed(1),
                            onerateingpersent: (Number(onerateingpersent) / 100) * Number(rateingcount),
                            tworateingpersent: (Number(tworateingpersent) / 100) * Number(rateingcount) ,
                            threerateingpersent: (Number(threerateingpersent) / 100) * Number(rateingcount) ,
                            fourrateingpersent: (Number(fourrateingpersent) / 100) * Number(rateingcount) ,
                            fiverateingpersent: (Number(fiverateingpersent) / 100) * Number(rateingcount)
                        }
                    }
                }
            } else {
                obj = {
                    "_id": results._id,
                    averate: averate,
                    onerateingpersent: onerateingpersent,
                    tworateingpersent: tworateingpersent,
                    threerateingpersent: threerateingpersent,
                    fourrateingpersent: fourrateingpersent,
                    fiverateingpersent: fiverateingpersent,
                }
            }
            result = obj
            success = true
            message = "Product rating found"
        } else {
            success = false
            message = "Internal server error"
        }
    }


    return NextResponse.json({ result, success, message })
}
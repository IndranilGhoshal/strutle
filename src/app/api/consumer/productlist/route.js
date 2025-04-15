import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { favouritesSchema, productimageSchema, productlistSchema, productreviewSchema } from "@/app/model/consumerModal";

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success = false;
    let message;
    let listlength;
    let filter;
    let sortObj;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });

    //List
    if (payload.list) {
        // Filter //
        filter = { mstcategoryid: payload.mstcategoryid, status: { $in: ['0'] } };
        // Sort //
        sortObj = {}
        // ------------List Length Start------------ //
        let len = await productlistSchema.find(filter);
        listlength = len.length
        // ------------List Length End------------ //
        // ------------List Start------------ //
        let results = await productlistSchema.find(filter).sort(sortObj).limit(payload.limit).skip(payload.skip);
        if (results.length > 0) {
            let res = []
            for (let r of results) {
                let img = await productimageSchema.findOne({ mstproductid: r._id, productmainimage: { $in: ['1'] }, status: { $in: ['0'] } })
                let image = ""
                if (img) {
                    image = img.productimage
                }
                let rating = await productreviewSchema.find({ mstproductid: r.id, status: { $in: ['0'] } })
                let averate = 0;
                let rateingcount = 0;
                let netprice = (Number(r.productdiscount) / 100) * Number(r.productmrp)
                let data = {
                    _id: r._id,
                    image: image,
                    name: r.productname,
                    productmrp: r.productmrp,
                    netmrp: (Number(r.productmrp) - Number(netprice)).toFixed(),
                    discount: r.productdiscount,
                    productquantity: r.productquantity,
                    averate: 0,
                    rateingcount: 0
                }
                if (rating.length > 0) {
                    for (let [i, r] of rating.entries()) {
                        averate = averate + Number(r.rate)
                        rateingcount = rateingcount + 1
                        if (i == rating.length - 1) {
                            data.averate = (Number(averate) / Number(rateingcount)).toFixed(2),
                                data.rateingcount = rateingcount
                        }
                    }
                } else {
                    data.averate = averate,
                        data.rateingcount = rateingcount
                }
                res.push(data)
            }

            let o = {}
            let fr = []
            let fav = await favouritesSchema.find({ mstconsumerid: payload.mstconsumerid, status: { $in: ['0'] } })

            for (let rs of res) {
                o = {
                    _id: rs._id,
                    image: rs.image,
                    name: rs.name,
                    productmrp: rs.productmrp,
                    netmrp: rs.netmrp,
                    discount: rs.discount,
                    productquantity: rs.productquantity,
                    averate: rs.averate,
                    rateingcount: rs.rateingcount,
                    favourite: "0"
                }
                for (let f of fav) {
                    if (f.mstproductid == rs._id) {
                        o.favourite = "1"
                    }
                }
                fr.push(o)
            }
            result = fr
            success = true
            message = "Product found"
        } else {
            success = false
            message = "Product not found"
        }
        // ------------List End------------ //
    }

    return NextResponse.json({ result, success, message, listlength })
}
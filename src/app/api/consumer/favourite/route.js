import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { favouritesSchema, productimageSchema, productreviewSchema, productSchema } from "@/app/model/consumerModal";

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success = false;
    let message;
    let filter;
    let listlength;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });

    //Favourite list
    if (payload.favouritelist) {
        filter = { mstconsumerid: payload.mstconsumerid, status: { $in: ['0'] } };
        let len = await favouritesSchema.find(filter);
        listlength = len.length
        let results = await favouritesSchema.find(filter).limit(payload.limit).skip(payload.skip);
        if (results) {
            let o = []
            for (let t of results) {
                let r = await productSchema.findOne({ _id: t.mstproductid, status: { $in: ['0'] } })
                let img = await productimageSchema.findOne({ mstproductid: t.mstproductid, productmainimage: { $in: ['1'] }, status: { $in: ['0'] } })
                let image = ""
                if (img) {
                    image = img.productimage
                }
                let rating = await productreviewSchema.find({ mstproductid: t.mstproductid, status: { $in: ['0'] } })
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
                    productquantity:r.productquantity,
                    averate: 0,
                    rateingcount:0
                }
                if(rating.length>0){
                    for(let [i,rat] of rating.entries()){
                        averate = averate + Number(rat.rate)
                        rateingcount=rateingcount+1
                        if(i == rating.length-1){
                            data.averate = (Number(averate)/Number(rateingcount)).toFixed(2),
                            data.rateingcount = rateingcount
                        }
                    }
                }else{
                    data.averate = averate,
                    data.rateingcount = rateingcount
                }
                o.push(data)
            }
            result = o
            success = true
            message = "Favourite Item found"
        } else {
            success = false
            message = "Favourite Item not found"
        }
    }
    // Add to Favourite
    else if (payload.addfavourite) {
        let checkproduct = await favouritesSchema.findOne({ mstconsumerid: payload.mstconsumerid, mstproductid: payload.mstproductid, status: { $in: ['0'] } })
        if (!checkproduct) {
            let obj = {
                mstproductid: payload.mstproductid,
                mstconsumerid: payload.mstconsumerid,
                status: payload.status,
            }
            const res = new favouritesSchema(obj);
            let r = await res.save()
            if (r) {
                success = true
                message = "Item favourite added successfully"
            } else {
                success = false
                message = "Internal server error"
            }
        } else {
            let obj = {
                mstproductid: payload.mstproductid,
                mstconsumerid: payload.mstconsumerid,
                status: payload.status,
            }
            const res = await favouritesSchema.findOneAndUpdate({_id: checkproduct._id}, obj);
            if (res) {
                success = true
                message = "Item favourite remove successfully"
            } else {
                success = false
                message = "Internal server error"
            }
        }
    } 


    return NextResponse.json({ result, success, message, listlength })
}
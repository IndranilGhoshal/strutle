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

    //product category
    if (payload.productcategory) {
        filter = { _id: payload.id, status: { $in: ['0'] } };
        let results = await productSchema.findOne(filter);
        if (results) {
            let category = await categorySchema.findOne({ _id: results.mstcategoryid, status: { $in: ['0'] } })
            let obj = {
                _id: results._id,
                mstcategoryid: results.mstcategoryid,
                category: category.name,
                name: results.productname
            }
            result = obj
            success = true
            message = "Product found"
        } else {
            success = false
            message = "Product not found"
        }
    }
    //product image
    else if (payload.productimage) {
        filter = { mstproductid: payload.id, status: { $in: ['0'] } };
        let results = await productimageSchema.find(filter);
        if (results) {
            result = results
            success = true
            message = "Product image found"
        } else {
            success = false
            message = "Product image not found"
        }
    }
    //product details
    else if (payload.productdetails) {
        filter = { _id: payload.id, status: { $in: ['0'] } };
        let results = await productSchema.findOne(filter);
        if (results) {
            let fav = await favouritesSchema.findOne({ mstconsumerid: payload.mstconsumerid, mstproductid: payload.id, status: { $in: ['0'] } })
            let obj ={
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
                favourite: fav ? "1":"0"
            }
            result = obj
            success = true
            message = "Product found"
        } else {
            success = false
            message = "Product not found"
        }
    }
    //product information
    else if (payload.productinformation) {
        filter = { mstproductid: payload.id, status: { $in: ['0'] } };
        let results = await productinformationSchema.find(filter);
        if (results.length > 0) {
            result = results
            success = true
            message = "Product information found"
        } else {
            success = false
            message = "Product information not found"
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
    //product rating
    else if (payload.productrating) {
        filter = { _id: payload.id, status: { $in: ['0'] } };
        let results = await productSchema.find(filter);
        if (results.length > 0) {
            let rating = await productreviewSchema.find({ mstproductid: payload.id, status: { $in: ['0'] } })
            let averate = 0;
            let rateingcount = 0;
            let obj;
            if (rating.length > 0) {
                for (let [i, r] of rating.entries()) {
                    averate = averate + Number(r.rate)
                    rateingcount = rateingcount + 1
                    if (i == rating.length - 1) {
                        obj = {
                            "_id": results._id,
                            averate: (Number(averate) / Number(rateingcount)).toFixed(2),
                            rateingcount: rateingcount
                        }
                    }
                }
            } else {
                obj = {
                    "_id": results._id,
                    averate: averate,
                    rateingcount: rateingcount
                }
            }
            result = obj
            success = true
            message = "Product rating found"
        } else {
            success = false
            message = "Product rating not found"
        }
    }
    //product attribute
    else if (payload.productattributes) {
        filter = { mstproductid: payload.id, status: { $in: ['0'] } };
        let results = await productotherattributesSchema.find(filter);
        if (results.length > 0) {
            let temp = results
            let mainarray = []
            for (let t of temp) {
                let values = await productotherattributevaluesSchema.find({ mstproductotherattributesid: t._id, status: { $in: ['0'] } })
                let obj = {
                    label: t.labelname,
                    value: values
                }
                mainarray.push(obj)
            }
            result = mainarray
            success = true
            message = "Product attribute found"
        } else {
            success = false
            message = "Product attribute not found"
        }
    }
    //product variant
    else if (payload.productvariant) {
        filter = { mstproductid: payload.id, status: { $in: ['0'] } };
        let results = await productcolorvariantsSchema.findOne(filter);
        if (results) {
            let values = await productcolorvariantsvaluesSchema.find({ mstproductcolorvariantid: results._id, status: { $in: ['0'] } })
            let temp;
            if (values.length > 0) {
                let o = []
                for (let v of values) {
                    let img = await productimageSchema.findOne({ mstproductid: v.mstproductid, productmainimage: { $in: ['1'] }, status: { $in: ['0'] } })
                    let image = ""
                    if (img) {
                        image = img.productimage
                    }
                    let obj = {
                        "_id": v._id,
                        "mstproductid": v.mstproductid,
                        "mstproductcolorvariantid": v.mstproductcolorvariantid,
                        "image": image,
                        "colorname": v.colorname,
                        "active": v.mstproductid == payload.id ? "1":"0"
                    }
                    o.push(obj)
                }
                temp = o
            }
            result = temp
            success = true
            message = "Product variant found"
        } else {
            success = false
            message = "Product variant not found"
        }
    }
    return NextResponse.json({ result, success, message })
}
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { categorySchema, productTypesSchema, subCategorySchema } from "@/app/model/adminModel";
import { MiddlewareRequest } from "../../_apiFunction/Middleware";
import { StatusCodes } from "../../_apiFunction/StatusCode";
import { productcolorvariantsSchema, productcolorvariantsvaluesSchema, productimageSchema, productotherattributesSchema, productotherattributevaluesSchema, productSchema } from "@/app/model/sellerModal";

export async function POST(request) {
    let middeleware = await MiddlewareRequest()
    if (middeleware) {
        try {
            let payload = await request.json();
            let result;
            let success = false;
            let message;
            let listlength;
            let obj
            let filter;
            let sortObj;
            await mongoose.connect(connectionStr, { useNewUrlParser: true });

            // Collaps List
            if (payload.list) {
                // ------------List Start------------ //
                if (payload.search) {
                    filter = { name: { $regex: new RegExp(payload.search, 'i') }, status: { $in: ['0'] } }
                } else {
                    filter = { status: { $in: ['0'] } }
                }
                let categoryresults = await categorySchema.find(filter);
                let array = []
                if (categoryresults.length > 0) {
                    for (let category of categoryresults) {
                        obj = {
                            "category": { categoryid: category._id, categoryname: category.name, subcategory: [] }
                        }
                        let subcaretoryarray = []
                        let subcategoryresults = await subCategorySchema.find({ mstcategoryid: category._id, status: { $in: ['0'] } });
                        if (subcategoryresults.length > 0) {
                            for (let subcategory of subcategoryresults) {
                                let o = { subcategoryid: subcategory._id, subcategoryname: subcategory.name, producttype: [] }
                                let producttypearray = []
                                let producttyperesults = await productTypesSchema.find({ mstcategoryid: category._id, mstsubcategoryid: subcategory._id, status: { $in: ['0'] } });
                                if (producttyperesults.length > 0) {
                                    for (let producttype of producttyperesults) {
                                        let p = { producttypeid: producttype._id, producttypename: producttype.name, producttypeimage: producttype.image }
                                        producttypearray.push(p)
                                    }
                                    o.producttype = producttypearray
                                } else {
                                    o.producttype = []
                                }
                                subcaretoryarray.push(o)
                            }
                            obj.category.subcategory = subcaretoryarray
                        } else {
                            obj.category.subcategory = []
                        }
                        array.push(obj)
                    }
                    result = array
                    success = true
                    message = "Category found"
                } else {
                    success = false
                    message = "Category not found"
                }
                // ------------List End------------ //
            }
            // Add 
            else if (payload.addproduct) {
                let productdata = {
                    mstsellerid: payload.mstsellerid,
                    mstcategoryid: payload.mstcategoryid,
                    mstsubcategoryid: payload.mstsubcategoryid,
                    mstproducttypeid: payload.mstproducttypeid,
                    productname: payload.productname,
                    producttitledescription: payload.producttitledescription,
                    productmrp: payload.productmrp,
                    productquantity: payload.productquantity,
                    productdiscount: payload.productdiscount,
                    hsn: payload.hsn,
                    igst: payload.igst,
                    status: "3"
                }

                const productres = new productSchema(productdata);
                let prs = await productres.save()

                if (prs) {

                    let imgarr = payload.imagearray
                    let imgid

                    for (let [i, img] of imgarr.entries()) {

                        let imgdata = {
                            mstproductid: prs._id,
                            productimage: img.images,
                            productmainimage: i == 0 ? "1" : "0",
                            status: "0",
                        }

                        if (i == 0) {
                            imgid = img.images
                        }

                        const ires = new productimageSchema(imgdata);
                        let irs = await ires.save()

                        if (i === imgarr.length - 1) {

                            let vdata = {
                                mstproductid: prs._id,
                                status: "0",
                            }

                            const vres = new productcolorvariantsSchema(vdata);
                            let vrs = await vres.save()

                            let vardata = {
                                mstproductid: prs._id,
                                mstproductcolorvariantid: vrs._id,
                                mstproductimagesid: imgid ? imgid : imgarr[0].images,
                                colorname: payload.color,
                                status: "0",
                            }

                            const varres = new productcolorvariantsvaluesSchema(vardata);
                            let varrs = await varres.save()


                            let adata = {
                                mstproductid: prs._id,
                                labelname: "Size",
                                status: "0",
                            }

                            const ares = new productotherattributesSchema(adata);
                            let arrs = await ares.save()


                            let attdata = {
                                mstproductid: prs._id,
                                mstproductotherattributesid: arrs._id,
                                value: payload.size,
                                status: "0",
                            }

                            const attres = new productotherattributevaluesSchema(attdata);
                            let attrrs = await attres.save()

                            if (attrrs) {
                                success = true;
                                message = "Product Added Successful"
                                result = null
                            }
                            else {
                                success = false;
                                message = "Internal Server Error"
                                result = null
                            }
                        }
                    }
                }
            }
            // List
            else if (payload.cateloglist) {
                if (payload.search) {
                    filter = { productname: { $regex: new RegExp(payload.search, 'i') }, mstsellerid: payload.mstsellerid, status: { $in: ['0','1','3'] } }
                } else {
                    filter = { mstsellerid: payload.mstsellerid, status: { $in: ['0','1','3'] } }
                }
                sortObj={}
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

            return NextResponse.json({ result, success, message, listlength })
        } catch (e) {
            return NextResponse.json({ result: null, success: false, message: "Internal Server Error", status: StatusCodes.INTERNAL_SERVER_ERROR, error: 1 })
        }
    } else {
        return NextResponse.json({ result: null, success: false, status: StatusCodes.Unauthorized, error: 1 })
    }
}
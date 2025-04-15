import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { cartSchema, productcolorvariantsvaluesSchema, productimageSchema, productSchema } from "@/app/model/consumerModal";


export async function POST(request) {
    let payload = await request.json();
    let result;
    let success = false;
    let message;
    let filter;

    await mongoose.connect(connectionStr, { useNewUrlParser: true });

    //Cart list
    if (payload.cartlist) {
        filter = { mstconsumerid: payload.mstconsumerid, saveaslater: { $in: ['0'] }, status: { $in: ['0'] } };
        let results = await cartSchema.find(filter);
        if (results) {
            let temp = results
            let o = []
            for (let t of temp) {
                let product = await productSchema.findOne({ _id: t.mstproductid, status: { $in: ['0'] } })
                let image = await productimageSchema.findOne({ mstproductid: product._id, productmainimage: { $in: ['1'] }, status: { $in: ['0'] } });
                let color = await productcolorvariantsvaluesSchema.findOne({ mstproductid: t.mstproductid, status: { $in: ['0'] } })
                let obj = {
                    _id: t._id,
                    mstproductid:t.mstproductid,
                    productimage: image.productimage,
                    productname: product.productname,
                    producttitledescription: product.producttitledescription,
                    productquantity: t.productquantity,
                    productmrp: t.productmrp,
                    productdiscount: t.productdiscount,
                    productnetprice: t.productnetprice,
                    saveaslater: t.saveaslater,
                    color: color.colorname,
                    createdAt: t.createdAt
                }
                o.push(obj)
            }
            result = o
            success = true
            message = "Cart Item found"
        } else {
            success = false
            message = "Cart Item not found"
        }
    }
    //Cart count
    else if (payload.cartcount) {
        filter = { mstconsumerid: payload.mstconsumerid, saveaslater: { $in: ['0'] }, status: { $in: ['0'] } };
        let results = await cartSchema.find(filter);
        if (results) {
            result = results.length
            success = true
            message = "Cart Item found"
        } else {
            success = false
            message = "Cart Item not found"
        }
    }
    //Cart later list
    if (payload.cartlaterlist) {
        filter = { mstconsumerid: payload.mstconsumerid, saveaslater: { $in: ['1'] }, status: { $in: ['0'] } };
        let results = await cartSchema.find(filter);
        if (results) {
            let temp = results
            let o = []
            for (let t of temp) {
                let product = await productSchema.findOne({ _id: t.mstproductid, status: { $in: ['0'] } })
                let image = await productimageSchema.findOne({ mstproductid: product._id, productmainimage: { $in: ['1'] }, status: { $in: ['0'] } });
                let color = await productcolorvariantsvaluesSchema.findOne({ mstproductid: t.mstproductid, status: { $in: ['0'] } })
                let obj = {
                    _id: t._id,
                    productimage: image.productimage,
                    productname: product.productname,
                    producttitledescription: product.producttitledescription,
                    productquantity: t.productquantity,
                    productmrp: t.productmrp,
                    productdiscount: t.productdiscount,
                    productnetprice: t.productnetprice,
                    saveaslater: t.saveaslater,
                    color: color.colorname,
                    createdAt: t.createdAt
                }
                o.push(obj)
            }
            result = o
            success = true
            message = "Cart Item found"
        } else {
            success = false
            message = "Cart Item not found"
        }
    }
    // Add to cart
    else if (payload.addcart) {
        let checkproduct = await cartSchema.findOne({ mstconsumerid: payload.mstconsumerid, mstproductid: payload.mstproductid, status: { $in: ['0'] } })
        if (!checkproduct) {
            let obj = {
                mstproductid: payload.mstproductid,
                mstconsumerid: payload.mstconsumerid,
                productquantity: payload.productquantity,
                productmrp: payload.productmrp,
                productdiscount: payload.productdiscount,
                productnetprice: payload.productnetprice,
                saveaslater: payload.saveaslater,
                status: payload.status,
            }
            const res = new cartSchema(obj);
            let r = await res.save()
            if (r) {
                success = true
                message = "Item added successfully"
            } else {
                success = false
                message = "Internal server error"
            }
        } else {
            success = false
            message = "Item already added"
        }
    }
    // Add save later to cart and move to cart
    else if (payload.addsavelatercart) {
        let checkproduct = await cartSchema.findOne({ _id: payload.id })
        if (checkproduct) {
            const res = await cartSchema.findOneAndUpdate({ _id: payload.id }, { saveaslater: payload.saveaslater });
            if (res) {
                success = true
                if (payload.saveaslater == "1") {
                    message = "Item added save later successfully"
                } else {
                    message = "Item remove save later successfully"
                }
            } else {
                success = false
                message = "Internal server error"
            }
        } else {
            success = false
            message = "Item Not found"
        }
    }
    //Cart price summary
    else if (payload.pricesummary) {
        filter = { mstconsumerid: payload.mstconsumerid, saveaslater: { $in: ['0'] }, status: { $in: ['0'] } };
        let results = await cartSchema.find(filter);
        if (results) {
            let temp = results
            let subtotal = 0;
            let totaldiscount = 0;
            let couponamount = 0;
            let deliveryamount = 0;
            let totalamount = 0;
            for (let t of temp) {
                let netdiscount = (Number(t.productdiscount) / 100) * Number(t.productmrp)
                subtotal = Number(subtotal) + (Number(t.productquantity) * Number(t.productmrp))
                totaldiscount = Number(totaldiscount) + (Number(t.productquantity) * Number(netdiscount))
                totalamount = Number(subtotal) - Number(totaldiscount)
            }
            let obj = {
                subtotal: subtotal,
                totaldiscount: totaldiscount,
                couponamount: couponamount,
                deliveryamount: deliveryamount,
                totalamount: totalamount
            }
            result = obj
            success = true
            message = "Price found"
        } else {
            success = false
            message = "Price not found"
        }
    }
    // Delete item
    else if (payload.ondelete) {
        let checkproduct = await cartSchema.findOne({ _id: payload.id })
        if (checkproduct) {
            const res = await cartSchema.findOneAndUpdate({ _id: payload.id }, { status: "2" });
            if (res) {
                success = true
                message = "Item remove successfully"
            } else {
                success = false
                message = "Internal server error"
            }
        } else {
            success = false
            message = "Item Not found"
        }
    }
    // Item increse or decrese
    else if (payload.incresedecresecart) {
        let checkproduct = await cartSchema.findOne({ _id: payload.id })
        if (checkproduct) {
            let res
            if (payload.increse) {
                let product = await productSchema.findOne({ _id: checkproduct.mstproductid, status: { $in: ['0'] } })
                if (product.productquantity > checkproduct.productquantity) {
                    res = await cartSchema.findOneAndUpdate({ _id: payload.id }, { productquantity: Number(checkproduct.productquantity) + 1 });
                }
                if (res) {
                    success = true
                    message = "Item quantity increse successfully"
                } else {
                    success = false
                    message = "Sorry, This item has no more quantity avaliable"
                }
            } else if (payload.decrese) {
                res = await cartSchema.findOneAndUpdate({ _id: payload.id }, { productquantity: Number(checkproduct.productquantity) - 1 });
                if (res) {
                    success = true
                    message = "Item quantity decrese successfully"
                } else {
                    success = false
                    message = "Internal server error"
                }
            }
        } else {
            success = false
            message = "Item Not found"
        }
    }
    // order update
    else if (payload.onorder) {
        const res = await cartSchema.findOneAndUpdate({ _id: payload.id }, { status: "1" });
        if (res) {
            success = true
            message = ""
        } else {
            success = false
            message = "Internal server error"
        }
    }



    return NextResponse.json({ result, success, message })
}
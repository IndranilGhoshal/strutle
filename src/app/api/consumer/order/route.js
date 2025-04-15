import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { consumershippingaddressSchema, orderpaymentsSchema, orderproductshippingstatusSchema, orderproductsSchema, ordersSchema, productcolorvariantsvaluesSchema, productimageSchema, productSchema } from "@/app/model/consumerModal";
const Razorpay = require("razorpay");

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success = false;
    let message;
    let filter;
    let listlength;

    await mongoose.connect(connectionStr, { useNewUrlParser: true });

    if (payload.addorder) {
        let orderobj = {
            mstconsumerid: payload.mstconsumerid,
            mstconsumershippingaddressesid: payload.mstconsumershippingaddressesid,
            ordertype: payload.ordertype,
            orderamount: payload.orderamount,
            status: "0",
        }
        const orderres = new ordersSchema(orderobj);
        let ors = await orderres.save()

        if (ors) {

            let producttemp = payload.product

            for (let [i, p] of producttemp.entries()) {
                let product = await productSchema.findOne({ _id: p._id, status: { $in: ['0'] } })
                let orderproductobj = {
                    mstorderid: ors._id,
                    mstproductid: p._id,
                    mstsellerid: product.mstsellerid,
                    orderproductquantity: p.productquantity,
                    orderproductmrp: p.productmrp,
                    orderproductnetamount: p.productnetamount,
                    orderproductdiscount: p.productdiscount,
                    status: "0",
                }
                const orderprodres = new orderproductsSchema(orderproductobj);
                let oprs = await orderprodres.save()


                let ordershippingobj = {
                    mstorderid: ors._id,
                    mstproductid: p._id,
                    orderproductconfirmedstatus: "1",
                    orderproductconfirmeddatetime: new Date(),
                    orderproductshippingstatus: "0",
                    orderproductshippingdatetime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                    orderproductoutofdeliverystatus: "0",
                    orderproductoutofdeliverydatetime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
                    orderproductdeliveredstatus: "0",
                    orderproductdelivereddatetime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
                    status: "0",
                }

                const ordershipres = new orderproductshippingstatusSchema(ordershippingobj);
                let oshiprs = await ordershipres.save()

                if (i === producttemp.length - 1) {
                    let paymentresult
                    let orderpaymentobj = {
                        mstorderid: ors._id,
                        mstconsumerid: payload.mstconsumerid,
                        status: "0",
                    }

                    if (payload.paymentid) {
                        const instance = new Razorpay({
                            key_id: process.env.RAZORPAY_KEY_ID,
                            key_secret: process.env.RAZORPAY_SECRET,
                        });

                        paymentresult = await instance.payments.fetch(payload.paymentid);

                        if (paymentresult) {
                            orderpaymentobj.ordercreationid = payload.ordercreationid
                            orderpaymentobj.razorpaypaymentid = payload.razorpaypaymentid
                            orderpaymentobj.razorpayorderid = payload.razorpayorderid
                            orderpaymentobj.razorpaysignature = payload.razorpaysignature

                            orderpaymentobj.paymenttype = paymentresult.method
                            orderpaymentobj.paymentamount = payload.paymentamount
                            orderpaymentobj.paymentstatus = "Success"
                        }
                    } else {
                        orderpaymentobj.ordercreationid = ""
                        orderpaymentobj.razorpaypaymentid = ""
                        orderpaymentobj.razorpayorderid = ""
                        orderpaymentobj.razorpaysignature = ""

                        orderpaymentobj.paymenttype = "COD"
                        orderpaymentobj.paymentamount = payload.paymentamount
                        orderpaymentobj.paymentstatus = "Pending"
                    }

                    const orderpayres = new orderpaymentsSchema(orderpaymentobj);
                    let opayrs = await orderpayres.save()

                    if (opayrs) {
                        success = true
                        message = "Order added successfully"
                    } else {
                        success = false
                        message = "Internal server error"
                    }
                }
            }
        } else {
            success = false
            message = "Internal server error"
        }
    }
    else if (payload.listorder) {
        let len = await ordersSchema.find(filter);
        listlength = len.length
        // search
        if (payload.search) {
            let product = await productSchema.findOne({ productname: { $regex: new RegExp(payload.search, 'i') }, status: { $in: ['0'] } })
            let orderproduct = await orderproductsSchema.findOne({ mstproductid: product._id, status: { $in: ['0'] } })
            if (!orderproduct) {
                filter = { mstconsumerid: payload.mstconsumerid, status: { $in: ['0'] } }
            } else {
                filter = { _id: orderproduct.mstorderid, mstconsumerid: payload.mstconsumerid, status: { $in: ['0'] } }
            }
        } else {
            filter = { mstconsumerid: payload.mstconsumerid, status: { $in: ['0'] } };
        }

        let results = await ordersSchema.find(filter).limit(payload.limit).skip(payload.skip);
        if (results) {
            let temp = results
            let o = []
            for (let t of temp) {
                let consumer = await consumershippingaddressSchema.findOne({ _id: t.mstconsumershippingaddressesid, status: { $in: ['0'] } })
                let payment = await orderpaymentsSchema.findOne({ mstorderid: t._id, status: { $in: ['0'] } })
                let obj = {
                    _id: t._id,
                    consumer: consumer.name,
                    ordertype: t.ordertype,
                    orderamount: t.orderamount,
                    orderdate: t.createdAt,
                    paymentstatus: payment.paymentstatus,
                    createdAt: t.createdAt
                }
                let oprod = await orderproductsSchema.find({ mstorderid: t._id, status: { $in: ['0'] } })
                let top = [...oprod]
                let p = []
                for(let o of top){
                    let product = await productSchema.findOne({ _id: o.mstproductid, status: { $in: ['0'] } })
                    let image = await productimageSchema.findOne({ mstproductid: product._id, productmainimage: { $in: ['1'] }, status: { $in: ['0'] } });
                    let color = await productcolorvariantsvaluesSchema.findOne({ mstproductid: product._id, status: { $in: ['0'] } })
                    let shiping = await orderproductshippingstatusSchema.findOne({ mstorderid: t._id, status: { $in: ['0'] } })
                    let data = {
                        productimage: image.productimage,
                        productname: product.productname,
                        producttitledescription: product.producttitledescription,
                        color: color.colorname,
                        quantity: o.orderproductquantity,
                        deliveryat: shiping.orderproductdelivereddatetime,
                        paymentstatus: payment.paymentstatus,
                    }
                    p.push(data)
                }
                obj.product = p
                o.push(obj)
            }
            result = o
            success = true
            message = "Order Item found"
        } else {
            success = false
            message = "Order Item not found"
        }
    }
    else if (payload.paymentorder) {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = {
            amount: payload.amount, // amount in smallest currency unit
            currency: payload.currency,
            receipt: payload.receipt,
        };

        const order = await instance.orders.create(options);

        if (!order) {
            success = false
            message = "Some error occured"
        } else {
            result = order
            success = true
            message = "Order create successful"
        }
    }


    return NextResponse.json({ result, success, message, listlength })
}
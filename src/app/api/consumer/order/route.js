import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { cartSchema, consumershippingaddressSchema, orderpaymentsSchema, orderproductshippingstatusSchema, orderproductsSchema, ordersSchema, productcolorvariantsvaluesSchema, productimageSchema, productreviewSchema, productSchema, sellerSchema } from "@/app/model/consumerModal";
import { sellerbusinesdetailsSchema } from "@/app/model/sellerModal";
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
                    orderstatus: "pending",
                    status: "0",
                }
                const orderprodres = new orderproductsSchema(orderproductobj);
                let oprs = await orderprodres.save()

                let ordershippingobj = {
                    mstorderid: ors._id,
                    mstproductid: p._id,
                    orderproductconfirmedstatus: "0",
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
                for (let o of top) {
                    let product = await productSchema.findOne({ _id: o.mstproductid, status: { $in: ['0'] } })
                    let image = await productimageSchema.findOne({ mstproductid: product._id, productmainimage: { $in: ['1'] }, status: { $in: ['0'] } });
                    let color = await productcolorvariantsvaluesSchema.findOne({ mstproductid: product._id, status: { $in: ['0'] } })
                    let shiping = await orderproductshippingstatusSchema.findOne({ mstorderid: t._id, status: { $in: ['0'] } })
                    let review = await productreviewSchema.findOne({mstproductid: product._id, mstconsumerid:t.mstconsumerid, status: { $in: ['0'] }})
                    let data = {
                        _id: product._id,
                        productimage: image.productimage,
                        productname: product.productname,
                        producttitledescription: product.producttitledescription,
                        color: color.colorname,
                        quantity: o.orderproductquantity,
                        deliveryat: shiping.orderproductdelivereddatetime,
                        deliveredstatus: shiping.orderproductdeliveredstatus,
                        paymentstatus: payment.paymentstatus,
                        isreview: review ? "1":"0",
                        rate: review?review.rate:"0"
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
    else if (payload.invioce) {
        filter = { _id: payload.id, mstconsumerid: payload.mstconsumerid, status: { $in: ['0'] } };
        let results = await ordersSchema.findOne(filter)
        if (results) {
            let t = results
            let consumer = await consumershippingaddressSchema.findOne({ _id: t.mstconsumershippingaddressesid, status: { $in: ['0'] } })
            let obj = {
                _id: t._id,
                orderdate: t.createdAt,
            }
            let consumeraddress = {
                consumer: consumer.name,
                phone: consumer.phone,
                pincode: consumer.pincode,
                locality: consumer.locality,
                building: consumer.building,
                district: consumer.district,
                state: consumer.state,
            }
            let oprod = await orderproductsSchema.find({ mstorderid: t._id, mstproductid: payload.productid, status: { $in: ['0'] } })
            let top = [...oprod]
            let p = []
            let totalamount = 0
            for (let o of top) {
                let product = await productSchema.findOne({ _id: o.mstproductid, status: { $in: ['0'] } })
                let discountedprice = ((Number(product.productmrp) - (Number(product.productdiscount) / 100) * Number(product.productmrp))).toFixed()
                let data = {
                    productname: product.productname,
                    productmrp: (Number(o.orderproductquantity) * Number(product.productmrp)).toFixed(),
                    productdiscount: (Number(o.orderproductquantity) * (Number(product.productdiscount) / 100) * Number(product.productmrp)).toFixed(),
                    productnetamount: (Number(o.orderproductquantity) * Number(discountedprice)).toFixed(),
                    quantity: o.orderproductquantity,
                }
                totalamount = Number(totalamount) + (Number(o.orderproductquantity) * Number(discountedprice))
                p.push(data)
            }
            let s = []
            for (let o of top) {
                let supplier = await sellerbusinesdetailsSchema.findOne({mstsellerid: o.mstsellerid, status: { $in: ['0']}})
                let data = {
                    businessname: supplier.businessname,
                    gstinno: supplier.gstinno,
                    enrolmentno: supplier.enrolmentno,
                    city: supplier.city,
                    state: supplier.state,
                    pin: supplier.pin,
                    panno: supplier.panno,
                }
                s.push(data)
            }
            obj.product = p
            obj.seller = s
            obj.totalamount = totalamount
            obj.consumeraddress = consumeraddress
            result = obj
            success = true
            message = "Order Invoice found"
        } else {
            success = false
            message = "Order Invoice not found"
        }
    }
    else if (payload.details) {
        filter = { _id: payload.id, mstconsumerid: payload.mstconsumerid, status: { $in: ['0'] } };
        let results = await ordersSchema.findOne(filter)
        if (results) {
            let t = results
            let consumer = await consumershippingaddressSchema.findOne({ _id: t.mstconsumershippingaddressesid, status: { $in: ['0'] } })
            let payment = await orderpaymentsSchema.findOne({ mstorderid: t._id, status: { $in: ['0'] } })
            let obj = {
                _id: t._id,
                orderdate: t.createdAt,
                paymenttype: payment.paymenttype.toUpperCase(),
                paymentstatus: payment.paymentstatus.toUpperCase()
            }
            let consumeraddress = {
                consumer: consumer.name,
                phone: consumer.phone,
                pincode: consumer.pincode,
                locality: consumer.locality,
                building: consumer.building,
                district: consumer.district,
                state: consumer.state
            }
            let oprod = await orderproductsSchema.find({ mstorderid: t._id, status: { $in: ['0'] } })
            let p = []
            let totalamount = 0
            for (let o of oprod) {
                let product = await productSchema.findOne({ _id: o.mstproductid, status: { $in: ['0'] } })
                let discountedprice = ((Number(product.productmrp) - (Number(product.productdiscount) / 100) * Number(product.productmrp))).toFixed()
                let image = await productimageSchema.findOne({ mstproductid: product._id, productmainimage: { $in: ['1'] }, status: { $in: ['0'] } });
                let color = await productcolorvariantsvaluesSchema.findOne({ mstproductid: product._id, status: { $in: ['0'] } })
                let shiping = await orderproductshippingstatusSchema.findOne({ mstorderid: t._id, mstproductid: product._id, status: { $in: ['0'] } })
                let seller = await sellerbusinesdetailsSchema.findOne({ mstsellerid: o.mstsellerid, status: { $in: ['0'] } })
                let data = {
                    _id: product._id,
                    seller: seller.businessname,
                    productimage: image.productimage,
                    productname: product.productname,
                    color: color.colorname,
                    productmrp: Number(o.orderproductquantity) * Number(product.productmrp),
                    productdiscount: Number(o.orderproductquantity) * (Number(product.productdiscount) / 100) * Number(product.productmrp),
                    productnetamount: Number(o.orderproductquantity) * Number(discountedprice),
                    quantity: o.orderproductquantity,
                    trackingid: shiping._id,
                    orderproductconfirmedstatus: shiping.orderproductconfirmedstatus,
                    orderproductconfirmeddatetime: shiping.orderproductconfirmeddatetime,
                    orderproductshippingstatus: shiping.orderproductshippingstatus,
                    orderproductshippingdatetime: shiping.orderproductshippingdatetime,
                    orderproductoutofdeliverystatus: shiping.orderproductoutofdeliverystatus,
                    orderproductoutofdeliverydatetime: shiping.orderproductoutofdeliverydatetime,
                    orderproductdeliveredstatus: shiping.orderproductdeliveredstatus,
                    orderproductdelivereddatetime: shiping.orderproductdelivereddatetime,
                }
                totalamount = Number(totalamount) + (Number(o.orderproductquantity) * Number(discountedprice))
                p.push(data)
            }
            obj.product = p
            obj.totalamount = totalamount
            obj.consumeraddress = consumeraddress
            result = obj
            success = true
            message = "Order Details found"
        } else {
            success = false
            message = "Order Details not found"
        }
    }
    // Order price summary
    else if (payload.pricesummary) {
        let subtotal = 0;
        let totaldiscount = 0;
        let couponamount = 0;
        let deliveryamount = 0;
        let totalamount = 0;
        let obj
        let orderresult = await orderproductsSchema.find({ mstorderid: payload.mstorderid, status: { $in: ['0'] } })
        if (orderresult.length > 0) {
            for (let o of orderresult) {
                let netdiscount = ((Number(o.orderproductdiscount) / 100) * Number(o.orderproductmrp)).toFixed()
                subtotal = (Number(subtotal) + (Number(o.orderproductquantity) * Number(o.orderproductmrp))).toFixed()
                totaldiscount = (Number(totaldiscount) + (Number(o.orderproductquantity) * Number(netdiscount))).toFixed()
                totalamount = (Number(subtotal) - Number(totaldiscount)).toFixed()
            }
            obj = {
                subtotal: subtotal,
                totaldiscount: totaldiscount,
                couponamount: couponamount,
                deliveryamount: deliveryamount,
                totalamount: totalamount
            }
        } else {
            obj = {
                subtotal: subtotal,
                totaldiscount: totaldiscount,
                couponamount: couponamount,
                deliveryamount: deliveryamount,
                totalamount: totalamount
            }
        }
        result = obj
        success = true
        message = "Price found"
    }


    return NextResponse.json({ result, success, message, listlength })
}
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { adminMenuSchema, adminRoleMenuSchema, adminRoleSchema, adminSchema, roleSchema } from "@/app/model/adminModel";
import { MiddlewareRequest } from "../../_apiFunction/Middleware";
import { StatusCodes } from "../../_apiFunction/StatusCode";
import { orderproductshippingstatusSchema, orderproductsSchema, ordersSchema, productSchema } from "@/app/model/sellerModal";

export async function POST(request) {
    let middeleware = await MiddlewareRequest()
    if (middeleware) {
        try {
            let payload = await request.json();
            let result;
            let success = false;
            let message;
            let listlength;
            let filter;
            let sortObj;
            let responsestatus;
            await mongoose.connect(connectionStr, { useNewUrlParser: true });
            //List
            if (payload.list) {

                // ------------Filter Start------------ //

                filter = { mstsellerid:payload.userid, orderstatus:payload.orderstatus, status: { $in: ['0'] } };

                // ------------Filter End------------ //
    
                sortObj = {}

                // ------------Sort End------------ //

                // ------------List Length Start------------ //
                let len = await orderproductsSchema.find(filter)
                listlength = len.length
                // ------------List Length End------------ //

                // ------------List Start------------ //
                let results = await orderproductsSchema.find(filter).sort(sortObj).limit(payload.limit).skip(payload.skip);

                if (results.length > 0) {
                    let r = results
                    let temp = [];
                    for (let res of r) {
                        let re = await ordersSchema.findOne({ _id: res.mstorderid, status: { $in: ['0'] } })
                        let ress = await productSchema.findOne({ _id: res.mstproductid, status: { $in: ['0'] } });
                        let data = {
                            "_id": res._id,
                            "orderid": res.mstorderid,
                            "consumerid": re.mstconsumerid,
                            "productname": ress.productname,
                            "createdAt": res.createdAt
                        }
                        temp.push(data)
                    }
                    responsestatus = StatusCodes.SUCCESS
                    result = temp
                    success = true
                    message = "Order found"
                } else {
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false
                    message = "Order not found"
                }
                // ------------List End------------ //
            }
            else if(payload.onstatus){
                if(payload.orderstatus == "readytoship"){
                    let results = await orderproductsSchema.findOneAndUpdate({ _id: payload.orderproductid }, { orderstatus: payload.orderstatus })
                    result = await orderproductshippingstatusSchema.findOneAndUpdate({ mstorderid: results.mstorderid, mstproductid: results.mstproductid }, { orderproductconfirmedstatus: "1" })
                }else if(payload.orderstatus == "shipped"){
                    let results = await orderproductsSchema.findOneAndUpdate({ _id: payload.orderproductid }, { orderstatus: payload.orderstatus })
                    result = await orderproductshippingstatusSchema.findOneAndUpdate({ mstorderid: results.mstorderid, mstproductid: results.mstproductid }, { orderproductshippingstatus: "1" })
                }
                if (result) {
                    if (payload.orderstatus == "readytoship") {
                        message = " Order is Ready to ship"
                    } else if (payload.orderstatus == "shipped") {
                        message = " Order is shipped"
                    } 
                    responsestatus = StatusCodes.SUCCESS
                    success = true
                } else {
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false
                    message = "Order not found"
                }
            }
            return NextResponse.json({ result, success, message, listlength, status: responsestatus, error: 0 })
        } catch (e) {
            return NextResponse.json({ result: null, success: false, status: StatusCodes.INTERNAL_SERVER_ERROR, error: 1 })
        }
    } else {
        return NextResponse.json({ result: null, success: false, status: StatusCodes.Unauthorized, error: 1 })
    }
}
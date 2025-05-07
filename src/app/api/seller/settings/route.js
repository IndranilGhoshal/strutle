import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { sellerbankaccountdetailsSchema, sellerbusinesdetailsSchema, sellersSchema } from "@/app/model/sellerModal";
import { MiddlewareRequest } from "../../_apiFunction/Middleware";
import { StatusCodes } from "../../_apiFunction/StatusCode";
import { dencryptFunction, encryptFunction } from "../../_apiFunction/EncryptDecryptFunction";

export async function POST(request) {
    let middeleware = await MiddlewareRequest()
    if (middeleware) {
        try {
            let payload = await request.json();
            let result;
            let success;
            let message;
            let responsestatus;
            await mongoose.connect(connectionStr, { useNewUrlParser: true });
            if (payload.getsellername) {
                let res = await sellersSchema.findOne({ _id: payload.id })
                if (res) {
                    let obj = {
                        "name": res.name,
                    }
                    result = obj
                    responsestatus = StatusCodes.SUCCESS
                    success = true
                    message = ""
                } else {
                    result = null
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false
                    message = "Internal Server Error"
                }
            }
            else if (payload.getbusinessname) {
                let res = await sellerbusinesdetailsSchema.findOne({ mstsellerid: payload.id })
                if (res) {
                    let obj = {
                        "businessname": res.businessname,
                    }
                    result = obj
                    responsestatus = StatusCodes.SUCCESS
                    success = true
                    message = ""
                } else {
                    result = null
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false
                    message = "Internal Server Error"
                }
            }
            else if (payload.getesignature) {
                let res = await sellersSchema.findOne({ _id: payload.id })
                if (res) {
                    let obj = {
                        "esignature": res.esignature,
                        "esignaturetype": res.esignaturetype,
                    }
                    result = obj
                    responsestatus = StatusCodes.SUCCESS
                    success = true
                    message = ""
                } else {
                    result = null
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false
                    message = "Internal Server Error"
                }
            }
            else if (payload.addesignature) {
                let r = await sellersSchema.findOneAndUpdate({ _id: payload.id }, { esignature: payload.esignature, esignaturetype: payload.esignaturetype })
                if (r) {
                    let results = await sellersSchema.findOne({ _id: payload.id, status: { $in: ['0'] } })
                    let obj = {
                        "_id": results._id,
                        "image": results.image,
                        "name": results.name,
                        "email": results.email,
                        "phone": results.phone,
                        "esignature": results.esignature,
                        "esignaturetype": results.esignaturetype,
                        "islogin": results.islogin,
                        "token": payload.token,
                    }
                    result = obj
                    responsestatus = StatusCodes.SUCCESS
                    success = true
                    message = "E-Signature created successfully"
                } else {
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false
                    message = "Internal Server Error"
                }
            }
            else if (payload.changepassword) {
                let results = await sellersSchema.findOne({ _id: payload.id, status: { $in: ['0'] } })
                if (results) {
                    if (dencryptFunction(results.password) == payload.oldpassword) {
                        let r = await sellersSchema.findOneAndUpdate({ _id: payload.id }, { password: encryptFunction(payload.password) })
                        if (r) {
                            result = null
                            responsestatus = StatusCodes.SUCCESS
                            success = true
                            message = "The password has been change successfully"
                        }
                    } else {
                        responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                        success = false
                        message = "Old Password is incorect"
                    }
                } else {
                    success = false;
                    message = "Seller Not Found"
                    responsestatus = StatusCodes.SUCCESS
                }
            }
            else if (payload.getbankdetails) {
                let res = await sellerbankaccountdetailsSchema.findOne({ mstsellerid: payload.id })
                if (res) {
                    let obj = {
                        "bankname": res.bankname,
                        "bankaccountnumber": res.bankaccountnumber,
                        "ifsc": res.ifsc,
                    }
                    result = obj
                    responsestatus = StatusCodes.SUCCESS
                    success = true
                    message = ""
                } else {
                    result = null
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false
                    message = "Internal Server Error"
                }
            }
            else if (payload.gettaxdetails) {
                let res = await sellerbusinesdetailsSchema.findOne({ mstsellerid: payload.id })
                if (res) {
                    let obj = {
                        "gstinno": res.gstinno,
                        "enrolmentno": res.enrolmentno,
                        "panno": res.panno,
                    }
                    result = obj
                    responsestatus = StatusCodes.SUCCESS
                    success = true
                    message = ""
                } else {
                    result = null
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false
                    message = "Internal Server Error"
                }
            }
            else if (payload.getwhatsappdetails) {
                let res = await sellersSchema.findOne({ _id: payload.id })
                if (res) {
                    let obj = {
                        "whatsapp": res.whatsapp
                    }
                    result = obj
                    responsestatus = StatusCodes.SUCCESS
                    success = true
                    message = ""
                } else {
                    result = null
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false
                    message = "Internal Server Error"
                }
            }
            else if (payload.setwhatsappdetails) {
                let r = await sellersSchema.findOneAndUpdate({ _id: payload.id }, { whatsapp: payload.whatsapp })
                if (r) {
                    result = null
                    responsestatus = StatusCodes.SUCCESS
                    success = true
                    message = "Whatsapp notification change successfully"
                } else {
                    result = null
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false
                    message = "Internal Server Error"
                }
            }
            return NextResponse.json({ result, success, message, status: responsestatus, error: 0 })
        } catch (e) {
            return NextResponse.json({ result: null, success: false, message: "Internal Server Error", status: StatusCodes.INTERNAL_SERVER_ERROR, error: 1 })
        }
    } else {
        return NextResponse.json({ result: null, success: false, status: StatusCodes.Unauthorized, error: 1 })
    }
}
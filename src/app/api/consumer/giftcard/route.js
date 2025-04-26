import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { giftcarddetailsSchema, giftcardpaymentsSchema, giftcardrecipientdetailsSchema, giftcardsSchema } from "@/app/model/consumerModal";
import { giftcardamountsSchema, giftcardimagesSchema } from "@/app/model/adminModel";
const Razorpay = require("razorpay");

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success = false;
    let message;
    let listlength;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });

    //List
    if (payload.list) {
        // ------------List Start------------ //
        result = await giftcardsSchema.find({ status: { $in: ['0'] } });
        if (result.length > 0) {
            success = true
            message = "Gift card found"
        } else {
            success = false
            message = "Gift card not found"
        }
        // ------------List End------------ //
    }
    else if (payload.giftcarddetails) {
        let imageres = await giftcardimagesSchema.find({ mstgiftcardsid: payload.mstgiftcardsid, status: { $in: ['0'] } })
        let amountres = await giftcardamountsSchema.find({ mstgiftcardsid: payload.mstgiftcardsid, status: { $in: ['0'] } })
        let obj = {}
        if (imageres.length > 0) {
            obj.imagearray = imageres
        } else {
            obj.imagearray = []
        }
        if (amountres.length > 0) {
            obj.amountarray = amountres
        } else {
            obj.amountarray = []
        }
        result = obj
        success = true;
        message = "Gift Card details fetch"
    }
    else if (payload.buygiftcard) {
        let giftobj = {
            mstconsumerid: payload.mstconsumerid,
            mstgiftcardsid: payload.mstgiftcardsid,
            image: payload.image,
            amount: payload.amount,
            sendername: payload.senderName,
            senderemail: payload.senderEmail,
            status: "0",
        }
        const giftres = new giftcarddetailsSchema(giftobj);
        let grs = await giftres.save()
        if (grs) {
            let giftrecipientobj = {
                mstgiftcardsid: payload.mstgiftcardsid,
                mstgiftcarddetailsid: grs._id,
                recipientname: payload.recipientName,
                recipientemail: payload.recipientEmail,
                amount: payload.amount,
                image: payload.image,
                card: payload.card,
                recipientmessage: payload.recipientMessage,
                status: "0",
            }
            const giftrecipientres = new giftcardrecipientdetailsSchema(giftrecipientobj);
            let gresrs = await giftrecipientres.save()

            let giftpaymentobj = {
                mstconsumerid: payload.mstconsumerid,
                mstgiftcardsid: payload.mstgiftcardsid,
                mstgiftcarddetailsid: grs._id,
                status: "0",
            }
            
            const instance = new Razorpay({
                key_id: process.env.RAZORPAY_KEY_ID,
                key_secret: process.env.RAZORPAY_SECRET,
            });

            let paymentresult = await instance.payments.fetch(payload.paymentid);

            if (paymentresult) {
                giftpaymentobj.ordercreationid = payload.ordercreationid
                giftpaymentobj.razorpaypaymentid = payload.razorpaypaymentid
                giftpaymentobj.razorpayorderid = payload.razorpayorderid
                giftpaymentobj.razorpaysignature = payload.razorpaysignature

                giftpaymentobj.paymenttype = paymentresult.method
                giftpaymentobj.paymentamount = payload.paymentamount
                giftpaymentobj.paymentstatus = "Success"
            }

            const giftpayres = new giftcardpaymentsSchema(giftpaymentobj);
            let gpayrs = await giftpayres.save()

            if (gpayrs) {
                success = true
                message = "Gift card buy successfully"
            } else {
                success = false
                message = "Internal server error"
            }

        } else {
            success = false
            message = "Internal server error"
        }
    }
    else if(payload.sendgift){
        let results = await giftcarddetailsSchema.find({senderemail:payload.senderemail, status: { $in: ['0'] } });
        if (results.length > 0) {
            result = results
            success = true
            message = "Gift card found"
        } else {
            success = false
            message = "Gift card not found"
        }
    }
    else if(payload.receivegift){
        let results = await giftcardrecipientdetailsSchema.find({recipientemail:payload.recipientemail, status: { $in: ['0'] } });
        if (results.length > 0) {
            result = results
            success = true
            message = "Gift card found"
        } else {
            success = false
            message = "Gift card not found"
        }
    }
    else if(payload.receivedetailsgift){
        let results = await giftcardrecipientdetailsSchema.findOne({mstgiftcardsid:payload.mstgiftcardsid, status: { $in: ['0'] } });
        if (results) {
            result = results
            success = true
            message = "Gift card found"
        } else {
            success = false
            message = "Gift card not found"
        }
    }


    return NextResponse.json({ result, success, message, listlength })
}
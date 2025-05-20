import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { otpSchema } from "@/app/model/consumerModal";
import generateOtp from "../../_apiFunction/GenerateOtpFunction";
import { otpsend } from "../../_apiFunction/OtpSendFunction";
import { sellerbankaccountdetailsSchema, sellerbusinepickupdetailsSchema, sellerbusinesdetailsSchema, sellersSchema } from "@/app/model/sellerModal";
import { StatusCodes } from "../../_apiFunction/StatusCode";
import { encryptFunction } from "../../_apiFunction/EncryptDecryptFunction";

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success;
    let message;
    let statuscode;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });

    // Send OTP
    if (payload.sendotp) {
        let number = await sellersSchema.findOne({ phone: payload.phone, status: { $in: ['0'] } })
        if (!number) {
            let FIVE_MINUTES = new Date().getTime() + 300000;
            let otp = generateOtp({ len: "6", nums: true })
            let getotp = await otpsend('OTP for your Signup - ' + otp + '. From Srutle Teams', "+12727700953", "+91" + payload.phone)
            if (getotp) {
                let data = {
                    phone: payload.phone,
                    otp: otp,
                    exptime: FIVE_MINUTES,
                    status: "0"
                }
                const res = new otpSchema(data);
                let r = await res.save()
                if (r) {
                    statuscode = StatusCodes.SUCCESS
                    success = true;
                    message = "OTP send successfully to your phone no."
                } else {
                    statuscode = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false;
                    message = "Internal server error"
                }
            } else {
                statuscode = StatusCodes.INTERNAL_SERVER_ERROR
                success = false;
                message = "OTP send Faild"
            }
        } else {
            statuscode = StatusCodes.FOUND
            success = false;
            message = "Mobile No. already exist"
        }
    }
    // Verify OTP
    else if (payload.verfyotp) {
        let re = await otpSchema.findOne({ otp: payload.otp })
        if (re) {
            let now = new Date().getTime();
            if (re.exptime < now) {
                let up = await otpSchema.findOneAndUpdate({ _id: re._id }, { status: "1" })
                success = false;
                message = "Otp is expirted"
            } else {
                if (re.status == "0") {
                    statuscode = StatusCodes.SUCCESS
                    success = true;
                    message = "Otp verify successful"
                } else {
                    statuscode = StatusCodes.FOUND
                    success = false;
                    message = "Otp is already used"
                }
            }
        } else {
            statuscode = StatusCodes.NO_CONTENT
            success = false;
            message = "Wrong Otp"
        }
    }
    // Resend OTP
    else if (payload.resendotp) {
        let FIVE_MINUTES = new Date().getTime() + 300000;
        let re = await otpSchema.find({ phone: payload.phone })
        if (re.length > 0) {
            for (let [i, r] of re.entries()) {
                let up = await otpSchema.findOneAndUpdate({ _id: r._id }, { status: "1" })
                if (i === re.length - 1) {
                    let otp = generateOtp({ len: "6", nums: true })
                    let getotp = await otpsend('OTP resend your Signup - ' + otp + '. From Srutle Teams', "+12727700953", "+91" + payload.phone)
                    if (getotp) {
                        let data = {
                            phone: payload.phone,
                            otp: otp,
                            exptime: FIVE_MINUTES,
                            status: "0"
                        }
                        const res = new otpSchema(data);
                        let r = await res.save()
                        if (r) {
                            statuscode = StatusCodes.CREATED
                            success = true;
                            message = "OTP resend successfully to your phone no."
                        } else {
                            statuscode = StatusCodes.INTERNAL_SERVER_ERROR
                            success = false;
                            message = "Internal server error"
                        }
                    } else {
                        statuscode = StatusCodes.INTERNAL_SERVER_ERROR
                        success = false;
                        message = "OTP send Faild"
                    }
                }
            }
        } else {
            statuscode = StatusCodes.INTERNAL_SERVER_ERROR
            success = false;
            message = "Internal server error"
        }
    }
    // Seller signup
    else if (payload.signup) {

        let sellerdata = {
            image: payload.image,
            name: payload.name,
            email: payload.email,
            password: encryptFunction(payload.password),
            phone: payload.phone,
            whatsapp: payload.whatsapp,
            esignature: payload.esignature,
            esignaturetype: "",
            islogin: "0",
            status: "0"
        }
        const sellerres = new sellersSchema(sellerdata);
        let sr = await sellerres.save()

        if (sr) {
            let sellerbusinesdetailsdata = {
                mstsellerid: sr._id,
                enrolmentno: payload.enrolmentno,
                gstinno: payload.gstinno,
                businessname: payload.businessname,
                businesstype: payload.businesstype,
                panno: payload.panno,
                addressone: payload.addressone,
                addresstwo: payload.addresstwo,
                city: payload.city,
                pin: payload.pin,
                postoffice: payload.postoffice,
                state: payload.state,
                landmark: payload.landmark,
                status: "0"
            }
            const sellerbusinessres = new sellerbusinesdetailsSchema(sellerbusinesdetailsdata);
            let sbr = await sellerbusinessres.save()

            let sellerpickupdetailsdata = {
                mstsellerid: sr._id,
                addressone: payload.pickupaddressone,
                addresstwo: payload.pickupaddresstwo,
                city: payload.pickupcity,
                pin: payload.pickuppin,
                postoffice: payload.pickuppostoffice,
                state: payload.pickupstate,
                landmark: payload.pickuplandmark,
                status: "0"
            }
            const sellerpickupres = new sellerbusinepickupdetailsSchema(sellerpickupdetailsdata);
            let spr = await sellerpickupres.save()

            let sellerbankdetailsdata = {
                mstsellerid: sr._id,
                bankname: payload.bankname,
                bankaccountnumber: payload.bankaccountnumber,
                ifsc: payload.ifsc,
                status: "0"
            }
            const sellerbankres = new sellerbankaccountdetailsSchema(sellerbankdetailsdata);
            let sbankr = await sellerbankres.save()

            if(sbr && spr && sbankr){
                statuscode = StatusCodes.CREATED
                success = true
                message = "Seller Signup Successfully"
            }else{
                statuscode = StatusCodes.INTERNAL_SERVER_ERROR
                success = false
                message = "Internal server error"
            }
        }else{
            statuscode = StatusCodes.INTERNAL_SERVER_ERROR
            success = false
            message = "Internal server error"
        }
    }


    return NextResponse.json({ result, success, message, statuscode })
}
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { consumerSchema, consumershippingaddressSchema, otpSchema } from "@/app/model/consumerModal";
import generateOtp from "../../_apiFunction/GenerateOtpFunction";
import { otpsend } from "../../_apiFunction/OtpSendFunction";

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success;
    let message;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });

    //send OTP Varify
    if (payload.otpsend) {
        let re = await otpSchema.findOne({ otp: payload.otp })
        if (re) {
            let now = new Date().getTime();
            if (re.exptime < now) {
                let up = await otpSchema.findOneAndUpdate({ _id: re._id }, { status: "1" })
                success = false;
                message = "Otp is expirted"
            } else {
                if (re.status == "0") {
                    let results = await consumerSchema.findOne({ phone: re.phone, status: { $in: ['0'] } })
                    if (results) {
                        let up = await otpSchema.findOneAndUpdate({ _id: re._id }, { status: "1" })
                        if(up){
                            let data = {
                                _id:results._id,
                                image: results.image,
                                firstname: results.firstname,
                                lastname: results.lastname,
                                email: results.email,
                                dateofbirth: results.dateofbirth,
                                gender: results.gender,
                                phone: results.phone,
                                status: results.status
                            }
                            result = data
                            success = true;
                            message = "User Login Successfully"
                        }else{
                            let data = {
                                _id:results._id,
                                image: results.image,
                                firstname: results.firstname,
                                lastname: results.lastname,
                                email: results.email,
                                dateofbirth: results.dateofbirth,
                                gender: results.gender,
                                phone: results.phone,
                                status: results.status
                            }
                            result = data
                            success = true;
                            message = "User Login Successfully"
                        }
                    } else {
                        let data = {
                            image: "",
                            firstname: "",
                            lastname: "",
                            email: "",
                            dateofbirth: "",
                            gender: "",
                            phone: re.phone,
                            status: "0"
                        }
                        const res = new consumerSchema(data);
                        let r = await res.save()
                        if (r) {
                            let up = await otpSchema.findOneAndUpdate({ _id: r._id }, { status: "1" })
                            result = r
                            success = true;
                            message = "User Login Successfully"
                        } else {
                            success = false;
                            message = "Internal server error"
                        }
                    }
                } else {
                    success = false;
                    message = "Otp is already used"
                }
            }
        } else {
            success = false;
            message = "Wrong Otp"
        }
    }

    //OTP Resend
    else if (payload.reotpsend) {
        let FIVE_MINUTES = new Date().getTime() + 300000;
        let re = await otpSchema.find({ phone: payload.phone })
        if (re.length > 0) {
            for (let [i, r] of re.entries()) {
                let up = await otpSchema.findOneAndUpdate({ _id: r._id }, { status: "1" })
                if (i === re.length - 1) {
                    let otp = generateOtp({ len: "6", nums: true })
                    let getotp = await otpsend('OTP resend your Login - ' + otp + '. From Strule Teams', "+12727700953", "+91" + payload.phone)
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
                            success = true;
                            message = "OTP resend successfully to your phone no."
                        } else {
                            success = false;
                            message = "Internal server error"
                        }
                    } else {
                        success = false;
                        message = "OTP send Faild"
                    }
                }
            }
        } else {
            success = false;
            message = "Internal server error"
        }
    }

    //OTP expired
    else if(payload.otpexpired){
        let re = await otpSchema.find({ phone: payload.phone })
        if(re.length>0){
            for (let [i, r] of re.entries()) {
                let up = await otpSchema.findOneAndUpdate({ _id: r._id }, { status: "1" })
                if (i === re.length - 1) {
                    success = true;
                    message = "Internal server error"
                }
            }
        }else{
            success = false;
            message = "Internal server error"
        }
    }

    else {
        let FIVE_MINUTES = new Date().getTime() + 300000;
        let otp = generateOtp({ len: "6", nums: true })
        let getotp = await otpsend('OTP for your Login - ' + otp + '. From Strule Teams', "+12727700953", "+91" + payload.phone)
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
                success = true;
                message = "OTP send successfully to your phone no."
            } else {
                success = false;
                message = "Internal server error"
            }
        } else {
            success = false;
            message = "OTP send Faild"
        }
    }
    return NextResponse.json({ result, success, message })
}

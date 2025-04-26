import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { adminMenuSchema, adminRoleMenuSchema, adminRoleSchema, adminSchema, giftcardamountsSchema, giftcardimagesSchema, giftcardsSchema, roleSchema } from "@/app/model/adminModel";
import { MiddlewareRequest } from "../../_apiFunction/Middleware";
import { StatusCodes } from "../../_apiFunction/StatusCode";

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
                // search
                if (!payload.status && !payload.type && payload.search) {
                    filter = { role: { $regex: new RegExp(payload.search, 'i') }, status: { $in: ['0', '1'] } }
                }
                //status,search,roletype
                else if (payload.status && payload.search && payload.type) {
                    filter = {
                        role: { $regex: new RegExp(payload.search, 'i') },
                        roletype: { $regex: new RegExp(payload.type, 'i') },
                        status: { $regex: new RegExp(payload.status, 'i') }
                    }
                }
                //status,search
                else if (payload.status && payload.search && !payload.type) {
                    filter = { role: { $regex: new RegExp(payload.search, 'i') }, status: { $regex: new RegExp(payload.status, 'i') } }
                }
                //status
                else if (payload.status && !payload.search && !payload.type) {
                    filter = { status: { $regex: new RegExp(payload.status, 'i') } }
                }
                //roletype
                else if (!payload.status && !payload.search && payload.type) {
                    filter = { roletype: { $regex: new RegExp(payload.type, 'i') }, status: { $in: ['0', '1'] } }
                }
                //roletype,search
                else if (!payload.status && payload.search && payload.type) {
                    filter = {
                        role: { $regex: new RegExp(payload.search, 'i') },
                        roletype: { $regex: new RegExp(payload.type, 'i') },
                        status: { $in: ['0', '1'] }
                    }
                }
                //deault
                else {
                    filter = { status: { $in: ['0', '1'] } };
                }
                // ------------Filter End------------ //

                // ------------Sort Start------------ //
                //Role = 1, Createdat = 1
                if (payload.namesort == "1" && payload.createdatsort == "1") {
                    sortObj = { role: 1, createdAt: 1 }
                }
                //Role = -1, Createdat = -1
                else if (payload.namesort == "-1" && payload.createdatsort == "-1") {
                    sortObj = { role: -1, createdAt: -1 }
                }
                //Role = 1
                else if (payload.namesort == "1") {
                    sortObj = { role: 1 }
                }
                // Createdat = 1
                else if (payload.createdatsort == "1") {
                    sortObj = { createdAt: 1 }
                }
                //Role = -1
                else if (payload.namesort == "-1") {
                    sortObj = { role: -1 }
                }
                // Createdat = -1
                else if (payload.createdatsort == "-1") {
                    sortObj = { createdAt: -1 }
                }
                //deault
                else {
                    sortObj = {}
                }
                // ------------Sort End------------ //

                // ------------List Length Start------------ //
                let len = await giftcardsSchema.find(filter)
                listlength = len.length
                // ------------List Length End------------ //

                // ------------List Start------------ //
                let results = await giftcardsSchema.find(filter).sort(sortObj).limit(payload.limit).skip(payload.skip);

                if (results.length > 0) {
                    responsestatus = StatusCodes.SUCCESS
                    result = results
                    success = true
                    message = "Gift card found"
                } else {
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false
                    message = "Gift card not found"
                }
                // ------------List End------------ //
            }
            //Status -> Active, Inactive, Delete
            else if (payload.onStatus) {
                result = await roleSchema.findOneAndUpdate({ _id: payload.id }, { status: payload.status })
                if (result) {
                    if (payload.status == "1") {
                        message = result.role + " Role inactive successfully"
                    } else if (payload.status == "2") {
                        message = result.role + " Role delete successfully"
                    } else {
                        message = result.role + " Role active successfully"
                    }
                    responsestatus = StatusCodes.SUCCESS
                    success = true
                } else {
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false
                    message = "Role not found"
                }

            }
            // Edit
            else if (payload.edit) {
                let roleRes = await roleSchema.findOne({ role: payload.role })
                if (roleRes === null) {
                    result = await roleSchema.findOneAndUpdate({ _id: payload.id }, { role: payload.role, roletype: payload.roletype, status: payload.status })
                    if (result) {
                        responsestatus = StatusCodes.SUCCESS
                        success = true
                        message = "Role update successfully"
                    } else {
                        responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                        success = false
                        message = "Role not update successfully"
                    }
                } else {
                    responsestatus = StatusCodes.FOUND
                    success = false;
                    message = "Role Already exist"
                }
            }
            //Details
            else if (payload.details) {
                filter = { _id: payload.id, status: { $in: ['0', '1'] } }
                result = await roleSchema.findOne(filter);
                if (result) {
                    responsestatus = StatusCodes.SUCCESS
                    success = true
                    message = "Role found"
                } else {
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false
                    message = "Role not found"
                }
            }
            //add configuration
            else if (payload.addconfiguration) {
                let imagetemp = payload.imagearray;
                let amounttemp = payload.amountarray;
                let imageflag = false
                let amountflag = false
                for (let [index, image] of imagetemp.entries()) {
                    const res = new giftcardimagesSchema(image);
                    let imageres = await res.save()
                    if (index === imagetemp.length - 1) {
                        if (imageres) {
                            imageflag = true
                        } else {
                            imageflag = false
                        }
                    }
                }
                for (let [index, amount] of amounttemp.entries()) {
                    const res = new giftcardamountsSchema(amount);
                    let amountres = await res.save()
                    if (index === amounttemp.length - 1) {
                        if (amountres) {
                            amountflag = true
                        } else {
                            amountflag = false
                        }
                    }
                }
                if (imageflag && amountflag) {
                    responsestatus = StatusCodes.SUCCESS
                    success = true;
                    message = "Gift card configuration added successfully"
                } else {
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false;
                    message = "Internal server error"
                }
            } else if (payload.configurationdetails) {
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
                responsestatus = StatusCodes.SUCCESS
                success = true;
                message = "Gift Card details fetch"
            }
            //Add
            else {
                let giftcardRes = await giftcardsSchema.findOne({ title: payload.title, status: { $in: ['0', '1'] } })
                if (!giftcardRes) {
                    const res = new giftcardsSchema(payload);
                    result = await res.save()
                    if (result) {
                        responsestatus = StatusCodes.SUCCESS
                        success = true;
                        message = "Gift Card Added Successfully"
                    } else {
                        responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                        success = false;
                        message = "Internal server error"
                    }
                } else {
                    responsestatus = StatusCodes.FOUND
                    success = false;
                    message = "Gift Card Already Exist"
                }
            }
            return NextResponse.json({ result, success, message, listlength, status: responsestatus, error: 0 })
        } catch (e) {
            return NextResponse.json({ result: null, success: false, status: StatusCodes.INTERNAL_SERVER_ERROR, error: 1 })
        }
    } else {
        return NextResponse.json({ result: null, success: false, message: "Internal Server Error", status: StatusCodes.Unauthorized, error: 1 })
    }
}

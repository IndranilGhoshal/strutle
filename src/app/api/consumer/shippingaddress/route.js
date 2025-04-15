import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { consumershippingaddressSchema } from "@/app/model/consumerModal";


export async function POST(request) {
    let payload = await request.json();
    let result;
    let success = false;
    let message;
    let filter;

    await mongoose.connect(connectionStr, { useNewUrlParser: true });

    //Address list
    if (payload.addresslist) {
        filter = { mstconsumerid: payload.mstconsumerid, status: { $in: ['0'] } };
        let results = await consumershippingaddressSchema.find(filter);
        if (results) {
            result = results
            success = true
            message = "Address found"
        } else {
            success = false
            message = "Address not found"
        }
    }
    //Address details
    if (payload.addressdetails) {
        filter = { _id: payload.id, mstconsumerid: payload.mstconsumerid, status: { $in: ['0'] } };
        let results = await consumershippingaddressSchema.findOne(filter);
        if (results) {
            result = results
            success = true
            message = "Address details found"
        } else {
            success = false
            message = "Address details not found"
        }
    }
    // Add to Address
    else if (payload.add) {
        let obj = {
            "mstconsumerid": payload.mstconsumerid,
            "name": payload.name,
            "phone": payload.phone,
            "pincode":payload.pincode,
            "postoffice": payload.postoffice,
            "locality": payload.locality,
            "building": payload.building,
            "landmark": payload.landmark,
            "district": payload.district,
            "state": payload.state,
            "addresstype": payload.addresstype,
            "status": payload.status,
            "isdefault": payload.isdefault
        }
        const res = new consumershippingaddressSchema(obj);
        let r = await res.save()
        if (r) {
            success = true
            message = "Address added successfully"
        } else {
            success = false
            message = "Internal server error"
        }
    } 
    // Edit to Address
    else if (payload.editaddress) {
        let obj = {
            "name": payload.name,
            "phone": payload.phone,
            "pincode":payload.pincode,
            "postoffice": payload.postoffice,
            "locality": payload.locality,
            "building": payload.building,
            "landmark": payload.landmark,
            "district": payload.district,
            "state": payload.state,
            "addresstype": payload.addresstype,
        }
        let r = await consumershippingaddressSchema.findOneAndUpdate({_id:payload.id},obj)
        if (r) {
            success = true
            message = "Address updated successfully"
        } else {
            success = false
            message = "Internal server error"
        }
    } 
    //Status Address
    else if (payload.ondelete) {
        result = await consumershippingaddressSchema.findOneAndUpdate({  _id:payload.id, mstconsumerid: payload.mstconsumerid }, { status: payload.status })
        if (result) {
            message = "Address delete successfully"
            success = true
        } else {
            success = false
            message = "Address not found"
        }
    }
    //Address default
    else if (payload.ondefault) {
        let res = await consumershippingaddressSchema.find({mstconsumerid: payload.mstconsumerid })
        for(let [i,r] of res.entries()){
            let re = await consumershippingaddressSchema.findOneAndUpdate({ _id: r._id }, { isdefault: "0" })
            if(i == res.length - 1){
                result = await consumershippingaddressSchema.findOneAndUpdate({  _id: payload.id }, { isdefault: payload.isdefault })
                if (result) {
                    message = "Default address updated"
                    success = true
                } else {
                    success = false
                    message = "Address not found"
                }
            }
        }
    }

    return NextResponse.json({ result, success, message })
}
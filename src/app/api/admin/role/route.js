import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { adminMenuSchema, adminRoleMenuSchema, adminRoleSchema, adminSchema, roleSchema } from "@/app/model/adminModel";

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success = false;
    let message;
    let listlength;
    let filter;
    let sortObj;
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
        // dropdown
        else if (payload.dropdown) {
            filter = { status: { $in: ['0'] } }
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
        let len = await roleSchema.find(filter)
        listlength = len.length
        // ------------List Length End------------ //

        // ------------List Start------------ //
        let results = await roleSchema.find(filter).sort(sortObj).limit(payload.limit).skip(payload.skip);

        if (results.length > 0) {
            let r = results
            let temp = [];
            for (let res of r) {
                let ress = await adminSchema.find({ mstroleid: res._id, status: { $in: ['0', '1', '3'] } });
                let data = {
                    "_id": res._id,
                    "role": res.role,
                    "roletype": res.roletype,
                    "nouser": ress.length,
                    "status": res.status,
                    "createdAt": res.createdAt,
                    "updatedAt": res.updatedAt
                }
                temp.push(data)
            }
            result = temp
            success = true
            message = "Role found"
        } else {
            success = false
            message = "Role not found"
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
            success = true
        } else {
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
                success = true
                message = "Role update successfully"
            } else {
                success = false
                message = "Role not update successfully"
            }
        } else {
            success = false;
            message = "Role Already exist"
        }
    }
    //Details
    else if (payload.details) {
        filter = { _id: payload.id, status: { $in: ['0', '1'] } }
        result = await roleSchema.findOne(filter);
        if (result) {
            success = true
            message = "Role found"
        } else {
            success = false
            message = "Role not found"
        }
    }
    //Add
    else {
        let roleRes = await roleSchema.findOne({ role: payload.role,status: { $in: ['0', '1'] }})
        if (roleRes === null) {
            const res = new roleSchema(payload);
            result = await res.save()
            if (result) {
                let menuObj = await adminMenuSchema.findOne({ _id: "67c2bf919e8584f5a0c32c47" })
                let Obj = {
                    mstRolesId: result._id,
                    mstMenusId: menuObj._id,
                    isEdit: "0",
                    isView: "1",
                }
                const res = new adminRoleMenuSchema(Obj);
                let r = await res.save()
                if (r) {
                    success = true;
                    message = "Add Role successfully"
                } else {
                    success = false;
                    message = "Internal server error"
                }
            } else {
                success = false;
                message = "Internal server error"
            }
        } else {
            success = false;
            message = "Role Already exist"
        }
    }
    return NextResponse.json({ result, success, message, listlength })
}

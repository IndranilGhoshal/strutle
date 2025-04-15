import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { categorySchema, productTypesSchema, subCategorySchema } from "@/app/model/adminModel";

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
        if (!payload.status && !payload.category && payload.search) {
            filter = { name: { $regex: new RegExp(payload.search, 'i') }, status: { $in: ['0', '1'] } }
        }
        //status,search,category
        else if (payload.status && payload.search && payload.category) {
            filter = {
                name: { $regex: new RegExp(payload.search, 'i') },
                mstcategoryid: { $regex: new RegExp(payload.category, 'i') },
                status: { $regex: new RegExp(payload.status, 'i') }
            }
        }
        //status,search
        else if (payload.status && payload.search && !payload.category) {
            filter = { name: { $regex: new RegExp(payload.search, 'i') }, status: { $regex: new RegExp(payload.status, 'i') } }
        }
        //status
        else if (payload.status && !payload.search && !payload.category) {
            filter = { status: { $regex: new RegExp(payload.status, 'i') } }
        }
        //category
        else if (!payload.status && !payload.search && payload.category) {
            filter = { mstcategoryid: { $regex: new RegExp(payload.category, 'i') }, status: { $in: ['0', '1'] } }
        }
        //category,search
        else if (!payload.status && payload.search && payload.category) {
            filter = {
                name: { $regex: new RegExp(payload.search, 'i') },
                mstcategoryid: { $regex: new RegExp(payload.category, 'i') },
                status: { $in: ['0', '1'] }
            }
        }
        //category,status
        else if (payload.status && !payload.search && payload.category) {
            filter = {
                mstcategoryid: { $regex: new RegExp(payload.category, 'i') },
                status: { $regex: new RegExp(payload.status, 'i') }
            }
        }
        // dropdown
        else if (payload.dropdown) {
            filter = { mstcategoryid: { $regex: new RegExp(payload.category, 'i') },status: { $in: ['0'] } }
        }
        //deault
        else {
            filter = { status: { $in: ['0', '1'] } };
        }
        // ------------Filter End------------ //

        // ------------Sort Start------------ //
        //Name = 1, Createdat = 1
        if (payload.namesort == "1" && payload.createdatsort == "1") {
            sortObj = { name: 1, createdAt: 1 }
        }
        //Name = -1, Createdat = -1
        else if (payload.namesort == "-1" && payload.createdatsort == "-1") {
            sortObj = { name: -1, createdAt: -1 }
        }
        //Name = 1
        else if (payload.namesort == "1") {
            sortObj = { name: 1 }
        }
        // Createdat = 1
        else if (payload.createdatsort == "1") {
            sortObj = { createdAt: 1 }
        }
        //Name = -1
        else if (payload.namesort == "-1") {
            sortObj = { name: -1 }
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
        let len = await subCategorySchema.find(filter)
        listlength = len.length
        // ------------List Length End------------ //

        // ------------List Start------------ //
        let results = await subCategorySchema.find(filter).sort(sortObj).limit(payload.limit).skip(payload.skip);

        if (results.length > 0) {
            let r = results
            let temp = [];
            for (let res of r) {
                let category = await categorySchema.findOne({ _id: res.mstcategoryid,status: { $in: ['0', '1'] }});
                let noOfProductTypes = await productTypesSchema.find({ mstsubcategoryid: res._id,status: { $in: ['0', '1'] }});;
                let noOfItems = 0;
                let data = {
                    "_id": res._id,
                    "name": res.name,
                    "image": res.image,
                    "category": category.name,
                    "noproducttype": noOfProductTypes.length,
                    "noitem": noOfItems,
                    "status": res.status,
                    "createdAt": res.createdAt
                }
                temp.push(data)
            }
            result = temp
            success = true
            message = "Sub-Category found"
        } else {
            success = false
            message = "Sub-Category not found"
        }
        // ------------List End------------ //
    }
    //Status -> Active, Inactive, Delete
    else if (payload.onStatus) {
        result = await subCategorySchema.findOneAndUpdate({ _id: payload.id }, { status: payload.status })
        if (result) {
            if (payload.status == "1") {
                message = result.name + " Sub-Category inactive successfully"
            } else if (payload.status == "2") {
                message = result.name + " Sub-Category delete successfully"
            } else {
                message = result.name + " Sub-Category active successfully"
            }
            success = true
        } else {
            success = false
            message = "Sub-Category not found"
        }
    }
    // Edit
    else if (payload.edit) {
        let res = await subCategorySchema.findOne({ name: payload.name })
        if (res === null) {
            let data =  { 
                name: payload.name, 
                image: payload.image,
                mstcategoryid: payload.mstcategoryid, 
                status: payload.status 
            }
            result = await subCategorySchema.findOneAndUpdate({ _id: payload.id },data)
            if (result) {
                success = true
                message = "Sub-Category update successfully"
            } else {
                success = false
                message = "Sub-Category not update successfully"
            }
        } else {
            success = false;
            message = "Sub-Category Already exist"
        }
    }
    //Details
    else if (payload.details) {
        filter = { _id: payload.id, status: { $in: ['0', '1'] } }
        result = await subCategorySchema.findOne(filter);
        if (result) {
            success = true
            message = "Sub-Category found"
        } else {
            success = false
            message = "Sub-Category not found"
        }
    }
    //Add
    else {
        let results = await subCategorySchema.findOne({ name: payload.name, status: { $in: ['0', '1'] } })
        if (results === null) {
            const resultsave = new subCategorySchema(payload);
            result = await resultsave.save()
            if (result) {
                success = true;
                message = "Add Sub-Category successfully"
            } else {
                success = false;
                message = "Internal server error"
            }
        } else {
            success = false;
            message = "Sub-Category Already exist"
        }
    }

    return NextResponse.json({ result, success, message, listlength })
}

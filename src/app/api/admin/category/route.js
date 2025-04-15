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
        if (!payload.status && payload.search) {
            filter = { name: { $regex: new RegExp(payload.search, 'i') }, status: { $in: ['0', '1'] } }
        }
        //status,search
        else if (payload.status && payload.search) {
            filter = {
                name: { $regex: new RegExp(payload.search, 'i') }, status: { $regex: new RegExp(payload.status, 'i') }
            }
        }
        //status
        else if (payload.status && !payload.search) {
            filter = { status: { $regex: new RegExp(payload.status, 'i') } }
        }
        // dropdown
        else if (payload.dropdown) {
            filter = { status: { $in: ['0'] } }
        }
        //deault
        else {
            filter = { status: { $in: ['0', '1'] } };
        }
        // // ------------Filter End------------ //

        // // ------------Sort Start------------ //
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
        // // ------------Sort End------------ //

        // ------------List Length Start------------ //
        let len = await categorySchema.find(filter)
        listlength = len.length
        // ------------List Length End------------ //

        // ------------List Start------------ //
        let results = await categorySchema.find(filter).sort(sortObj).limit(payload.limit).skip(payload.skip);

        if (results.length > 0) {
            let r = results
            let temp = [];
            for (let res of r) {
                let noOfSubCategories = await subCategorySchema.find({ mstcategoryid: res._id, status: { $in: ['0', '1'] } });
                let noOfProductTypes = await productTypesSchema.find({ mstcategoryid: res._id, status: { $in: ['0', '1'] } });;
                let noOfItems = 0;
                let data = {
                    "_id": res._id,
                    "name": res.name,
                    "image": res.image,
                    "nosubcategory": noOfSubCategories.length,
                    "noproducttype": noOfProductTypes.length,
                    "noitem": noOfItems,
                    "status": res.status,
                    "createdAt": res.createdAt
                }
                temp.push(data)
            }
            result = temp
            success = true
            message = "Category found"
        } else {
            success = false
            message = "Category not found"
        }
        // ------------List End------------ //
    }
    //Status -> Active, Inactive, Delete
    else if (payload.onStatus) {
        result = await categorySchema.findOneAndUpdate({ _id: payload.id }, { status: payload.status })
        if (result) {
            if (payload.status == "1") {
                message = result.name + " Category inactive successfully"
            } else if (payload.status == "2") {
                message = result.name + " Category delete successfully"
            } else {
                message = result.name + " Category active successfully"
            }
            success = true
        } else {
            success = false
            message = "Category not found"
        }

    }
    // Edit
    else if (payload.edit) {
        let results = await categorySchema.findOne({ _id: payload.id, name: payload.name })
        if (results === null) {
            let data = {
                name: payload.name,
                image: payload.image,
                status: payload.status
            }
            result = await categorySchema.findOneAndUpdate({ _id: payload.id }, data)
            if (result) {
                success = true
                message = "Category update successfully"
            } else {
                success = false
                message = "Internal Server Error"
            }
        } else {
            success = false;
            message = "Category Already exist"
        }
    }
    //Details
    else if (payload.details) {
        filter = { _id: payload.id, status: { $in: ['0', '1'] } }
        result = await categorySchema.findOne(filter);
        if (result) {
            success = true
            message = "Category found"
        } else {
            success = false
            message = "Category not found"
        }
    }
    //Tree
    else if (payload.tree) {
        let category = await categorySchema.find({ status: { $in: ['0', '1'] } });
        let t = []
        let o = {
            "name": "Category",
            "children": []
        }
        if (category) {
            for (let c of category) {
                let subcat = []
                let sub = await subCategorySchema.find({ mstcategoryid: { $regex: new RegExp(c._id, 'i') }, status: { $in: ['0', '1'] } })
                for (let s of sub) {
                    subcat.push({ "name": s.name })
                }
                o.children.push({ "name": c.name, "children": subcat })
            }
            t.push(o)
            console.log("t", t)
            result = t
            success = true
            message = "Category found"
        } else {
            success = false
            message = "Category not found"
        }
    }
    //Add
    else {
        let results = await categorySchema.findOne({ name: payload.name, status: { $in: ['0', '1'] } })
        if (results === null) {
            const resultsave = new categorySchema(payload);
            result = await resultsave.save()
            if (result) {
                success = true;
                message = "Add Category successfully"
            } else {
                success = false;
                message = "Internal server error"
            }
        } else {
            success = false;
            message = "Category Already exist"
        }
    }

    return NextResponse.json({ result, success, message, listlength })
}
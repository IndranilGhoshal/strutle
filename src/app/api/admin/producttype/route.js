import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { categorySchema, productTypesAttributeSchema, productTypesAttributeValueSchema, productTypesSchema, subCategorySchema } from "@/app/model/adminModel";

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success = false;
    let message;
    let listlength;
    let filter;
    let sortObj;
    let category;
    let subcategory;
    let producttype;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });

    // List
    if (payload.list) {

        // ------------Filter Start------------ //
        // search
        if (!payload.status && !payload.category && !payload.subcategory && payload.search) {
            filter = { name: { $regex: new RegExp(payload.search, 'i') }, status: { $in: ['0', '1'] } }
        }
        //status
        else if (payload.status && !payload.search && !payload.category && !payload.subcategory) {
            filter = { status: { $regex: new RegExp(payload.status, 'i') } }
        }
        //category
        else if (!payload.status && !payload.search && payload.category && !payload.subcategory) {
            filter = { mstcategoryid: { $regex: new RegExp(payload.category, 'i') }, status: { $in: ['0', '1'] } }
        }
        //subcategory
        else if (!payload.status && !payload.search && !payload.category && payload.subcategory) {
            filter = { mstsubcategoryid: { $regex: new RegExp(payload.subcategory, 'i') }, status: { $in: ['0', '1'] } }
        }
        //status,search,category,subcategory
        else if (payload.status && payload.search && payload.category && payload.subcategory) {
            filter = {
                name: { $regex: new RegExp(payload.search, 'i') },
                mstcategoryid: { $regex: new RegExp(payload.category, 'i') },
                mstsubcategoryid: { $regex: new RegExp(payload.subcategory, 'i') },
                status: { $regex: new RegExp(payload.status, 'i') }
            }
        }
        //status,search
        else if (payload.status && payload.search && !payload.category && !payload.subcategory) {
            filter = { name: { $regex: new RegExp(payload.search, 'i') }, status: { $regex: new RegExp(payload.status, 'i') } }
        }
        //status,category
        else if (payload.status && !payload.search && payload.category && !payload.subcategory) {
            filter = { mstcategoryid: { $regex: new RegExp(payload.category, 'i') }, status: { $regex: new RegExp(payload.status, 'i') } }
        }
        //status,subcategory
        else if (payload.status && !payload.search && !payload.category && payload.subcategory) {
            filter = { mstsubcategoryid: { $regex: new RegExp(payload.subcategory, 'i') }, status: { $regex: new RegExp(payload.status, 'i') } }
        }
        //search,category
        else if (!payload.status && payload.search && payload.category && !payload.subcategory) {
            filter = {
                name: { $regex: new RegExp(payload.search, 'i') },
                mstcategoryid: { $regex: new RegExp(payload.category, 'i') },
                status: { $in: ['0', '1'] }
            }
        }
        //search,subcategory
        else if (!payload.status && payload.search && !payload.category && payload.subcategory) {
            filter = {
                name: { $regex: new RegExp(payload.search, 'i') },
                mstsubcategoryid: { $regex: new RegExp(payload.subcategory, 'i') },
                status: { $in: ['0', '1'] }
            }
        }
        //category,subcategory
        else if (!payload.status && !payload.search && payload.category && payload.subcategory) {
            filter = {
                mstsubcategoryid: { $regex: new RegExp(payload.subcategory, 'i') },
                mstcategoryid: { $regex: new RegExp(payload.category, 'i') },
                status: { $in: ['0', '1'] }
            }
        }
        //category,subcategory,search
        else if (!payload.status && payload.search && payload.category && payload.subcategory) {
            filter = {
                name: { $regex: new RegExp(payload.search, 'i') },
                mstcategoryid: { $regex: new RegExp(payload.category, 'i') },
                mstsubcategoryid: { $regex: new RegExp(payload.subcategory, 'i') },
                status: { $in: ['0', '1'] }
            }
        }
        //status,category,subcategory
        else if (payload.status && !payload.search && payload.category && payload.subcategory) {
            filter = {
                mstcategoryid: { $regex: new RegExp(payload.category, 'i') },
                mstsubcategoryid: { $regex: new RegExp(payload.subcategory, 'i') },
                status: { $regex: new RegExp(payload.status, 'i') }
            }
        }
        //status,search,category
        else if (payload.status && payload.search && payload.category && !payload.subcategory) {
            filter = {
                mstcategoryid: { $regex: new RegExp(payload.category, 'i') },
                name: { $regex: new RegExp(payload.search, 'i') },
                status: { $regex: new RegExp(payload.status, 'i') }
            }
        }
        //status,search,subcategory
        else if (payload.status && payload.search && !payload.category && payload.subcategory) {
            filter = {
                mstsubcategoryid: { $regex: new RegExp(payload.subcategory, 'i') },
                name: { $regex: new RegExp(payload.search, 'i') },
                status: { $regex: new RegExp(payload.status, 'i') }
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
        let len = await productTypesSchema.find(filter)
        listlength = len.length
        // ------------List Length End------------ //

        // ------------List Start------------ //
        let results = await productTypesSchema.find(filter).sort(sortObj).limit(payload.limit).skip(payload.skip);

        if (results.length > 0) {
            let r = results
            let temp = [];
            for (let res of r) {
                let category = await categorySchema.findOne({ _id: res.mstcategoryid, status: { $in: ['0', '1'] } });
                let subcategory = await subCategorySchema.findOne({ _id: res.mstsubcategoryid, status: { $in: ['0', '1'] } });
                let noOfItems = 0;
                let noOfAttribute = await productTypesAttributeSchema.find({ mstproducttypeid: res._id, status: { $in: ['0', '1'] } })
                let data = {
                    "_id": res._id,
                    "name": res.name,
                    "image": res.image,
                    "category": category.name,
                    "subcategory": subcategory.name,
                    "noitem": noOfItems,
                    "noofattribute":noOfAttribute.length,
                    "status": res.status,
                    "createdAt": res.createdAt
                }
                temp.push(data)
            }
            result = temp
            success = true
            message = "Product type found"
        } else {
            success = false
            message = "Product type not found"
        }
        // ------------List End------------ //
    }
    // Status -> Active, Inactive, Delete
    else if (payload.onStatus) {
        result = await productTypesSchema.findOneAndUpdate({ _id: payload.id }, { status: payload.status })
        if (result) {
            if (payload.status == "1") {
                message = result.name + " Product type inactive successfully"
            } else if (payload.status == "2") {
                message = result.name + " Product type delete successfully"
            } else {
                message = result.name + " Product type active successfully"
            }
            success = true
        } else {
            success = false
            message = "Product type not found"
        }

    }
    // Edit
    else if (payload.edit) {
        let res = await productTypesSchema.findOne({ name: payload.name })
        if (res === null) {
            let data = {
                name: payload.name,
                image: payload.image,
                mstcategoryid: payload.mstcategoryid,
                mstsubcategoryid: payload.mstsubcategoryid,
                status: payload.status
            }
            result = await productTypesSchema.findOneAndUpdate({ _id: payload.id }, data)
            if (result) {
                success = true
                message = "Product type update successfully"
            } else {
                success = false
                message = "Product type not update successfully"
            }
        } else {
            success = false;
            message = "Product type already exist"
        }
    }
    // Details
    else if (payload.details) {
        filter = { _id: payload.id, status: { $in: ['0', '1'] } }
        result = await productTypesSchema.findOne(filter);
        if (result) {
            success = true
            message = "Product type found"
        } else {
            success = false
            message = "Product type not found"
        }
    }
    // Configuration List
    else if (payload.configurationlist) {
        filter = { mstproducttypeid: payload.id, status: { $in: ['0', '1'] } }
        let results = await productTypesAttributeSchema.find(filter);
        if (results.length>0) {
            let res = []
            for(let r of results){
                let resultvalue = await productTypesAttributeValueSchema.find({ mstproducttypeattributeid: r._id, status: { $in: ['0', '1'] } });
                let data = {
                    "_id": r._id,
                    "mstproducttypeid": r.mstproducttypeid,
                    "fieldname": r.fieldname,
                    "ismandatory": r.ismandatory,
                    "isdefault": r.isdefault,
                    "isfilter": r.isfilter,
                    "fieldinputtype": r.fieldinputtype,
                    "maxvalue": r.maxvalue,
                    "maxfile": r.maxfile,
                    "status": r.status,
                    "accordionarray": r.accordionarray,
                    "valueList": resultvalue,
                    "createdAt": r.createdAt,
                    "updatedAt": r.updatedAt,
                    "__v": r.__v
                }
                res.push(data)
            }
            let ptype = await productTypesSchema.findOne({ _id: payload.id, status: { $in: ['0', '1'] } });
            producttype = ptype.name
            let scategory = await subCategorySchema.findOne({ _id: ptype.mstsubcategoryid, status: { $in: ['0', '1'] } });
            subcategory = scategory.name
            let cat = await categorySchema.findOne({ _id: scategory.mstcategoryid, status: { $in: ['0', '1'] } });
            category = cat.name
            result = res
            success = true
            message = "Product Type Configuration found"
        } else {
            success = false
            message = "Product Type Configuration not found"
        }
    }
    // Configuration Add
    else if (payload.configurationadd) {
        let results = await productTypesAttributeSchema.findOne({ fieldname: payload.fieldname, status: { $in: ['0', '1'] } })
        if (results === null) {
            let data = {
                "mstproducttypeid": payload.mstproducttypeid,
                "fieldname": payload.fieldname,
                "isdefault": payload.isdefault,
                "ismandatory": payload.ismandatory,
                "isfilter": payload.isfilter,
                "fieldinputtype": payload.fieldinputtype,
                "maxvalue": payload.maxvalue,
                "maxfile": payload.maxfile,
                "status": payload.status
            }
            const resultsave = new productTypesAttributeSchema(data);
            result = await resultsave.save()
            if (result) {
                let array = payload.valueList
                if (array.length > 0) {
                    for (let [i, a] of array.entries()) {
                        let obj = {
                            "mstproducttypeattributeid": result._id,
                            "name": a.name,
                            "status": "0"
                        }
                        let att = new productTypesAttributeValueSchema(obj)
                        let res = await att.save()
                        if (i === array.length - 1) {
                            if (res) {
                                success = true;
                                message = "Add configuration attribute successfully"
                            } else {
                                success = false;
                                message = "Internal server error"
                            }
                        }
                    }
                } else {
                    success = true;
                    message = "Add configuration attribute successfully"
                }
            } else {
                success = false;
                message = "Internal server error"
            }
        } else {
            success = false;
            message = "Configuration attribute already exist"
        }
    }
    // Configuration Edit
    else if (payload.configurationedit) {
        let res = await productTypesAttributeSchema.findOne({ fieldname: payload.fieldname })
        if (res === null) {
            let data = {
                "fieldname": payload.fieldname,
                "ismandatory": payload.ismandatory,
                "isfilter": payload.isfilter,
                "fieldinputtype": payload.fieldinputtype,
                "maxvalue": payload.maxvalue,
                "maxfile": payload.maxfile,
                "status": payload.status
            }
            let temp = payload.valueList
            let temp1 = await productTypesAttributeValueSchema.find({ mstproducttypeattributeid: payload.id })

            if(temp1.length>0){
                for(let [i1,t1] of temp1.entries()){
                    let t2 = await productTypesAttributeValueSchema.findOneAndUpdate({ _id: t1._id },{ status: '2' })
                    if (i1 === temp1.length - 1) {
                        if (temp.length > 0) {
                            for (let [i, t] of temp.entries()) {
                                let valueresult = await productTypesAttributeValueSchema.findOne({ _id: t._id })
                                if (valueresult) {
                                    if(t._id == valueresult._id){
                                        let r = await productTypesAttributeValueSchema.findOneAndUpdate({ _id: t._id },{ name: t.name, "status": "0" })
                                    }
                                } 
                                else {
                                    let obj = {
                                        "mstproducttypeattributeid": payload.id,
                                        "name": t.name,
                                        "status": "0"
                                    }
                                    let att = new productTypesAttributeValueSchema(obj)
                                    let re = await att.save()
                                }
                            }
                        } 
                    }
                }
            }
            
            if (temp == '0') {
                let a = await productTypesAttributeValueSchema.find({ mstproducttypeid: payload.mstproducttypeid })
                if (a.length > 0) {
                    for (let b of a) {
                        f = await productTypesAttributeValueSchema.findOneAndUpdate({ _id: b._id }, { status: "2" })
                    }
                }
            }
            result = await productTypesAttributeSchema.findOneAndUpdate({ _id: payload.id }, data)
            if (result) {
                success = true
                message = "Configuration attribute update successfully"
            } else {
                success = false
                message = "Configuration attribute not update successfully"
            }
        } else {
            success = false;
            message = "Configuration attribute already exist"
        }
    }
    // Configuration Details
    else if (payload.configurationdetails) {
        filter = { _id: payload.id, status: { $in: ['0', '1'] } }
        let results = await productTypesAttributeSchema.findOne(filter);
        if (results) {
            let resultvalue = await productTypesAttributeValueSchema.find({ mstproducttypeattributeid: results._id, status: { $in: ['0', '1'] } });
            let data = {
                "_id": results._id,
                "mstproducttypeid": results.mstproducttypeid,
                "fieldname": results.fieldname,
                "ismandatory": results.ismandatory,
                "isfilter": results.isfilter,
                "fieldinputtype": results.fieldinputtype,
                "maxvalue": results.maxvalue,
                "maxfile": results.maxfile,
                "status": results.status,
                "accordionarray": results.accordionarray.length>0?results.accordionarray:[],
                "valueList": resultvalue,
                "createdAt": results.createdAt,
                "updatedAt": results.updatedAt,
                "__v": results.__v
            }
            result = data
            success = true
            message = "configuration attribute type found"
        } else {
            success = false
            message = "configuration attribute type not found"
        }
    }
    //Configuration Status -> Active, Inactive, Delete
    else if (payload.onConfigurationStatus) {
        result = await productTypesAttributeSchema.findOneAndUpdate({ _id: payload.id }, { status: payload.status })
        if (result) {
            if (payload.status == "1") {
                message = result.fieldname + " Product type configuration inactive successfully"
            } else if (payload.status == "2") {
                message = result.fieldname + " Product type configuration delete successfully"
            } else {
                message = result.fieldname + " Product type configuration active successfully"
            }
            success = true
        } else {
            success = false
            message = "Product type configuration not found"
        }

    }
    //Add
    else {
        let results = await productTypesSchema.findOne({ name: payload.name, status: { $in: ['0', '1'] } })
        if (results === null) {
            const resultsave = new productTypesSchema(payload);
            result = await resultsave.save()
            if (result) {
                let temp = setvalue(result._id)
                for (let [i, t] of temp.entries()) {
                    let att = new productTypesAttributeSchema(t)
                    let res = await att.save()
                    if (i === temp.length - 1) {
                        if (res) {
                            success = true;
                            message = "Add product type successfully"
                        } else {
                            success = false;
                            message = "Internal server error"
                        }
                    }
                }
            } else {
                success = false;
                message = "Internal server error"
            }
        } else {
            success = false;
            message = "Product type Already exist"
        }
    }

    return NextResponse.json({ result, success, message, listlength, producttype, subcategory, category })
}


const setvalue = (id) => {

    let accordionarray = [
        {
            "accordionname":"Product Details",
            "subfieldname":"Sub-Description",
            "subdescriptiontype":"Text Area",
            "subdescriptionlimit":"500",
            "fieldname":"Description",
            "descriptiontype":"Text Area",
            "descriptionlimit":"5000",
        },
        {
            "accordionname":"Know Your Product",
            "subfieldname":"Sub-Description",
            "subdescriptiontype":"Text Area",
            "subdescriptionlimit":"500",
            "fieldname":"Description",
            "descriptiontype":"Text Area",
            "descriptionlimit":"5000",
        },
        {
            "accordionname":"Vendor Details",
            "subfieldname":"Sub-Description",
            "subdescriptiontype":"Text Area",
            "subdescriptionlimit":"500",
            "fieldname":"Description",
            "descriptiontype":"Text Area",
            "descriptionlimit":"5000",
        },
        {
            "accordionname":"Return & Exchange Policy",
            "subfieldname":"Sub-Description",
            "subdescriptiontype":"Text Area",
            "subdescriptionlimit":"500",
            "fieldname":"Description",
            "descriptiontype":"Text Area",
            "descriptionlimit":"5000",
        },
        {
            "accordionname":"Questions and Answers",
            "subfieldname":"Sub-Description",
            "subdescriptiontype":"Text Area",
            "subdescriptionlimit":"500",
            "fieldname":"Description",
            "descriptiontype":"Text Area",
            "descriptionlimit":"5000",
        },
    ]

    let Arr = [
        {
            mstproducttypeid: id,
            fieldname: "Product Images",
            isdefault: "0",
            ismandatory: "0",
            isfilter: "1",
            fieldinputtype: "File",
            maxvalue: "0",
            maxfile: "6",
            accordionarray:[],
            status: "0"
        },
        {
            mstproducttypeid: id,
            fieldname: "Product Name",
            isdefault: "0",
            ismandatory: "0",
            isfilter: "0",
            fieldinputtype: "Text",
            maxvalue: "100",
            maxfile: "0",
            accordionarray:[],
            status: "0"
        },
        {
            mstproducttypeid: id,
            fieldname: "Product Title Description",
            isdefault: "0",
            ismandatory: "0",
            isfilter: "1",
            fieldinputtype: "Text Area",
            maxvalue: "500",
            maxfile: "0",
            accordionarray:[],
            status: "0"
        },
        {
            mstproducttypeid: id,
            fieldname: "Product MRP",
            isdefault: "0",
            ismandatory: "0",
            isfilter: "1",
            fieldinputtype: "Numeric",
            maxvalue: "100",
            maxfile: "0",
            accordionarray:[],
            status: "0"
        },
        {
            mstproducttypeid: id,
            fieldname: "Product Information",
            isdefault: "0",
            ismandatory: "0",
            isfilter: "1",
            fieldinputtype: "Accordion",
            maxvalue: "0",
            maxfile: "0",
            accordionarray:accordionarray,
            status: "0"
        }
    ]
    return Arr
}
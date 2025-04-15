import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { adminRoleSchema, adminSchema, roleSchema } from "@/app/model/adminModel";
import InviteAdminEmailFunction from "../../_apiFunction/InviteAdminEmailFunction";
import { encryptFunction } from "@/app/lib/common";
import GeneratePassword from "../../_apiFunction/GeneratePassword";
import { adminEventSchema } from "@/app/model/eventModel";
const { authEmail } = process.env

export async function POST(request) {
    let payload = await request.json();
    let result;
    let RoleResult;
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
        if (!payload.status && !payload.role && payload.search) {
            filter = {
                $or: [{ firstname: { $regex: new RegExp(payload.search, 'i') } },
                { lastname: { $regex: new RegExp(payload.search, 'i') } },
                { email: { $regex: new RegExp(payload.search, 'i') } }],
                status: { $in: ['0', '1', '3'] }
            }
        } 
        //status
        else if (payload.status && !payload.search && !payload.role) {
            filter = { status: { $regex: new RegExp(payload.status, 'i') } }
        } 
        //role
        else if (!payload.status && !payload.search && payload.role) {
            filter = { mstroleid: { $regex: new RegExp(payload.role, 'i') }, status: { $in: ['0', '1', '3'] } }
        } 
        //status,search,role
        else if (payload.status && payload.search && payload.role) {
            filter = {
                $or: [{ firstname: { $regex: new RegExp(payload.search, 'i') } },
                { lastname: { $regex: new RegExp(payload.search, 'i') } },
                { email: { $regex: new RegExp(payload.search, 'i') } }],
                mstroleid: { $regex: new RegExp(payload.role, 'i') },
                status: { $regex: new RegExp(payload.status, 'i') }
            }
        } 
        //status,search
        else if (payload.status && payload.search && !payload.role) {
            filter = {
                $or: [{ firstname: { $regex: new RegExp(payload.search, 'i') } },
                { lastname: { $regex: new RegExp(payload.search, 'i') } },
                { email: { $regex: new RegExp(payload.search, 'i') } }],
                status: { $regex: new RegExp(payload.status, 'i') }
            }
        } 
        //role,status
        else if (payload.status && !payload.search && payload.role) {
            filter = {
                mstroleid: { $regex: new RegExp(payload.role, 'i') },
                status: { $regex: new RegExp(payload.status, 'i')}
            }
        }
        //role,search
        else if (!payload.status && payload.search && payload.role) {
            filter = {
                mstroleid: { $regex: new RegExp(payload.role, 'i') },
                $or: [{ firstname: { $regex: new RegExp(payload.search, 'i') } },
                { lastname: { $regex: new RegExp(payload.search, 'i') } },
                { email: { $regex: new RegExp(payload.search, 'i') } }],
                status: { $in: ['0', '1', '3'] }
            }
        } 
        //deault
        else {
            filter = { status: { $in: ['0', '1', '3'] } };
        }
        // ------------Filter End------------ //

        // ------------Sort Start------------ //
        //Name = 1, Email = 1, Createdat = 1
        if (payload.namesort == "1" && payload.emailsort == "1" && payload.createdatsort == "1") {
            sortObj = { firstname: 1, email: 1, createdAt: 1 }
        } 
        //Name = 1, Email = 1
        else if (payload.namesort == "1" && payload.emailsort == "1") {
            sortObj = { firstname: 1, email: 1 }
        } 
        //Email = 1, Createdat = 1
        else if (payload.emailsort == "1" && payload.createdatsort == "1") {
            sortObj = { email: 1, createdAt: 1 }
        } 
        //Name = 1, Createdat = 1
        else if (payload.namesort == "1" && payload.createdatsort == "1") {
            sortObj = { firstname: 1, createdAt: 1 }
        }
        //Name = -1, Email = -1, Createdat = -1
        else if (payload.namesort == "-1" && payload.emailsort == "-1" && payload.createdatsort == "-1") {
            sortObj = { firstname: -1, email: -1, createdAt: -1 }
        } 
        //Name = -1, Email = -1
        else if (payload.namesort == "-1" && payload.emailsort == "-1") {
            sortObj = { firstname: -1, email: -1 }
        } 
        //Email = -1, Createdat = -1
        else if (payload.emailsort == "-1" && payload.createdatsort == "-1") {
            sortObj = { email: -1, createdAt: -1 }
        } 
        //Name = -1, Createdat = -1
        else if (payload.namesort == "-1" && payload.createdatsort == "-1") {
            sortObj = { firstname: -1, createdAt: -1 }
        }
        //Name = 1 
        else if (payload.namesort == "1") {
            sortObj = { firstname: 1 }
        } 
        // Createdat = 1
        else if (payload.createdatsort == "1") {
            sortObj = { createdAt: 1 }
        } 
        // Email = 1
        else if (payload.emailsort == "1") {
            sortObj = { email: 1 }
        }
        //Name = -1
        else if (payload.namesort == "-1") {
            sortObj = { firstname: -1 }
        } 
        // Createdat = -1
        else if (payload.emailsort == "-1") {
            sortObj = { email: -1 }
        }
        // Email = -1
        else if (payload.createdatsort == "-1") {
            sortObj = { createdAt: -1 }
        } 
        // Defalut
        else {
            sortObj = {}
        }
        // ------------Sort End------------ //

        // ------------List Length Start------------ //
        let len = await adminSchema.find(filter)
        listlength = len.length
        // ------------List Length End------------ //

        // ------------List Start------------ //
        let result1 = await adminSchema.find(filter).sort(sortObj).limit(payload.limit).skip(payload.skip);;
        let r = []
        if (result1.length > 0) {
            for (let res of result1) {
                let data = {
                    _id: res._id,
                    mstroleid:res.mstroleid,
                    image:res.image,
                    firstname: res.firstname,
                    lastname: res.lastname,
                    email: res.email,
                    status: res.status,
                    createdAt:res.createdAt
                }
                let roleres = await roleSchema.findOne({ _id: res.mstroleid })
                data.role = roleres.role
                r.push(data)
            }
            result = r
            success = true
            message = "User found"
        } else {
            success = false
            message = "User not found"
        }
        // ------------List End------------ //
    }
    //Status
    else if (payload.onStatus) {
        result = await adminSchema.findOneAndUpdate({ _id: payload.id }, { status: payload.status })
        if (result) {
            if (payload.status == "2") {
                message = "User delete successfully"
            } else if (payload.status == "1") {
                message = "User inactive successfully"
            } else {
                message = "User active successfully"
            }
            success = true
        } else {
            success = false
            message = "User not found"
        }
    } 
    //Edit
    else if (payload.edit) {
        let adminRes = await adminSchema.findOne({ email: payload.email })
        if (adminRes) {
            let data = {
                mstroleid: payload.role,
                image: payload.image,
                firstname: payload.firstName,
                lastname: payload.lastName,
                email: payload.email,
                countryname:payload.countryname,
                countrycode:payload.countrycode,
                dialCode:payload.dialCode,
                phone: payload.phone,
                status: payload.status
            }
            result = await adminSchema.findOneAndUpdate({ _id: payload.id }, data)
            if (result) {
                success = true
                message = "User update successfully"
            } else {
                success = false
                message = "User not update successfully"
            }
        } else {
            success = false;
            message = "User not exist"
        }
    } 
    //Details
    else if (payload.details) {
        filter = { _id: payload.id, status: { $in: ['0', '1', '3'] } }
        let results = await adminSchema.findOne(filter);
        if (results) {
            let data = {
                "_id": results._id,
                "mstroleid": results.mstroleid,
                "image": results.image,
                "firstname": results.firstname,
                "lastname": results.lastname,
                "email": results.email,
                "countryname": results.countryname,
                "countrycode": results.countrycode,
                "dialCode": results.dialCode,
                "phone": results.phone,
                "status": results.status,
                "createdby": results.createdby,
                "createdAt": results.createdAt,
                "updatedAt": results.updatedAt
            }
            let roleres = await roleSchema.findOne({ _id: results.mstroleid })
            if(roleres){
                data.role = roleres.role
            }else{
                data.role = "N/A"
            }
            let adminres = await adminSchema.findOne({ _id: results.createdby })
            if(adminres){
                data.createdbyfirstname = adminres.firstname
                data.createdbylastname = adminres.lastname
            }else{
                data.createdbyfirstname = "N/A"
                data.createdbylastname = "N/A"
            }
            let logres = await adminEventSchema.find({mstAdminId:results._id})
            if(logres.length>0){
                let farray=[]
                for(let l of logres){
                    if(l.eventName == "Login"){
                        farray.push(l)
                    }
                }
                data.firstLogin = farray[0].createdAt
                let larray=[]
                let len = 0
                for(let l of logres){
                    if(l.eventName == "Logout"){
                        larray.push(l)
                        len = len+1
                    }
                }
                data.lastLogin = larray[len-1].createdAt
            }else{
                data.firstLogin = null
                data.lastLogin = null
            }
            result = data
            success = true
            message = "User found"
        } else {
            success = false
            message = "User not found"
        }
    }
    //Add
    else {
        let adminRes = await adminSchema.findOne({ email: payload.email })
        let systempassword = GeneratePassword({ len: "6", upper: true, nums: true, special: false })
        let pass = encryptFunction(systempassword)
        if (adminRes === null) {
            let admindata = {
                mstroleid: payload.role,
                image: payload.image,
                firstname: payload.firstName,
                lastname: payload.lastName,
                email: payload.email,
                countryname:payload.countryname,
                countrycode:payload.countrycode,
                dialCode:payload.dialCode,
                phone: payload.phone,
                status: payload.status,
                password: pass,
                isfirstlogin: payload.isfirstlogin,
                createdby:payload.createdby
            }
            const res = new adminSchema(admindata);
            result = await res.save()
            if (result) {
                let roleAdminData = { mstAdminsId: res._id, mstRolesId: payload.role }
                const roleRes = new adminRoleSchema(roleAdminData);
                RoleResult = await roleRes.save()
                if (RoleResult) {
                    let fromEmaill = authEmail
                    let roleres = await roleSchema.findOne({ _id: payload.role })
                    let inviteMail = await InviteAdminEmailFunction({ from: fromEmaill, to: payload.email, password: systempassword, name: payload.firstName + " " + payload.lastName, role: roleres.role })
                    if (inviteMail) {
                        success = true;
                        message = "The new admin user has been successfully invited"
                    } else {
                        success = false;
                        message = "Mail internal server error"
                    }
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
            message = "Admin Already exist"
        }
    }
    return NextResponse.json({ result, success, message, listlength })
}

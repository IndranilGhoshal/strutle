import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";
import { adminMenuSchema, adminRoleMenuSchema, adminSubMenuSchema } from "@/app/model/adminModel";
import { MiddlewareRequest, MiddlewareResponse } from "../../_apiFunction/Middleware";
import { StatusCodes } from "../../_apiFunction/StatusCode";
import { NextResponse } from "next/server";

export async function POST(request) {
    let middeleware = await MiddlewareRequest()
    if (middeleware) {
        let payload = await request.json();
        let result;
        let success;
        let message;
        let menuArray = [];
        let tempObj = {};
        await mongoose.connect(connectionStr, { useNewUrlParser: true });
        //List
        if (payload.list) {
            result = await adminRoleMenuSchema.find({ mstRolesId: payload.mstRolesId })
            if (result) {
                for (let data of result) {
                    let menuResult = await adminMenuSchema.findOne({ _id: data.mstMenusId })
                    if (data.isView == "1") {
                        let sub = await adminSubMenuSchema.find({ mstmenuid: data.mstMenusId })
                        tempObj = {
                            _id: menuResult._id,
                            menuName: menuResult.menuName,
                            menuIcon: menuResult.menuIcon,
                            menuUrl: menuResult.menuUrl,
                            submenu: sub,
                            isEdit: data.isEdit,
                            isView: data.isView
                        }
                        menuArray.push(tempObj)
                    }
                }
                success = true;
                message = "Menu Found"
            } else {
                success = false;
                message = "Menu not found"
            }
        }
        // Priviliage
        else if (payload.priviliage) {
            let res = await adminRoleMenuSchema.find({ mstRolesId: payload.mstRolesId })
            let menures = await adminMenuSchema.find()
            if (menures) {
                if (res.length == 0) {
                    for (let m of menures) {
                        let obj = {
                            _id: m._id,
                            menuName: m.menuName,
                            menuIcon: m.menuIcon,
                            menuUrl: m.menuUrl,
                            isEdit: "0",
                            isView: "0"
                        }
                        menuArray.push(obj)
                    }
                    success = true;
                    message = "Menu found"
                } else {
                    for (let all of menures) {
                        let obj = {
                            _id: all._id,
                            menuName: all.menuName,
                            menuIcon: all.menuIcon,
                            menuUrl: all.menuUrl,
                            isDelete: all.isDelete,
                            isEdit: "0",
                            isView: "0"
                        }
                        for (let r of res) {
                            if (obj._id == r.mstMenusId) {
                                obj.isEdit = r.isEdit
                                obj.isView = r.isView
                            }
                        }
                        menuArray.push(obj)
                    }
                    success = true;
                    message = "Menu found"
                }
            } else {
                success = false;
                message = "Menu not found"
            }
        }
        // Edit Priviliage
        else if (payload.onEditPriviliage) {
            let res1 = await adminRoleMenuSchema.find({ mstMenusId: payload.menu })
            if (res1.length > 0) {
                tempObj = {
                    mstRolesId: payload.role,
                    mstMenusId: payload.menu,
                    isEdit: payload.isedit,
                    isView: payload.isview,
                }
                let r = await adminRoleMenuSchema.findOneAndUpdate({ mstMenusId: payload.menu }, tempObj)
                if (r) {
                    success = true;
                } else {
                    success = false;
                    message = "Internal server error"
                }
            } else {
                tempObj = {
                    mstRolesId: payload.role,
                    mstMenusId: payload.menu,
                    isEdit: payload.isedit,
                    isView: payload.isview,
                }
                const res = new adminRoleMenuSchema(tempObj);
                let r = await res.save()
                if (r) {
                    success = true;
                } else {
                    success = false;
                    message = "Internal server error"
                }
            }
        }
        return NextResponse.json({result:menuArray, success, status:StatusCodes.SUCCESS, error:0}) 
    } else {
        return NextResponse.json({result:null, success:false, status:StatusCodes.Unauthorized, error:1})
    }
}

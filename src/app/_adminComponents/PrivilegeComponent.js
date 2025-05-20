'use client'
import React, { useEffect, useState } from 'react'
import { hideLoader, removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common'
import AccessList from './_list/AccessList'
import { menuApi } from '../lib/apiService'
import { useRouter } from 'next/navigation'

export default function PrivilegeComponent({ id }) {
    const router = useRouter();
    const [menu, setMenu] = useState([])

    useEffect(() => {
        getMenus()
    }, [])


    const getMenus = async () => {
        let response = await menuApi({ mstRolesId: id, priviliage: true })
        if (response.success) {
            hideLoader()
            setMenu(response.result)
        } else {
            hideLoader()
            setMenu(response.result)
        }
    }

    const OnToggeleEdit = async (index, menuid, isview, isedit) => {
        showLoader()
        let temp = [...menu]
        for (let [i, t] of temp.entries()) {
            if (i == index) {
                if (t.isEdit == "0") {
                    t.isEdit = "1"
                } else {
                    t.isEdit = "0"
                }
            }
        }
        setMenu(temp)

        let data = { role: id, menu: menuid, isview, isedit, onEditPriviliage: true }
        let response = await menuApi(data)
        if (response) {
            getMenus()
        } else {
            getMenus()
        }
    }

    const OnToggeleView = async (index, menuid, isview, isedit) => {
        showLoader()
        let temp = [...menu]
        for (let [i, t] of temp.entries()) {
            if (i == index) {
                if (t.isView == "0") {
                    t.isView = "1"
                } else {
                    t.isView = "0"
                }
            }
        }
        setMenu(temp)

        let data = { role: id, menu: menuid, isview, isedit, onEditPriviliage: true }
        let response = await menuApi(data)
        if (response) {
            getMenus()
        } else {
            getMenus()
        }
    }

    const goto = (path) => {
        router.push("/admin/account" + path)
        removeLocalStorageData("pathName")
        setLocalStorageData('pathName', path)
    }


    return (
        <>
            <div className="main-das-page">

                <div className="heading my-3">
                    <h3>Previlege List</h3>
                </div>
                <div className='my-3'>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a onClick={() => { goto('/accesscontrol') }}>Access Control</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Privilege</li>
                        </ol>
                    </nav>
                </div>
                <div className="row">
                    <div className="col-md-12 col-sm-12">

                        <div className="bg-white shadow_d rounded-3 p-4">

                            <div className="privelege-page acces_rit">
                                <div className="row mb-4 brdr-1">
                                    <div className="col-md-12">
                                        <AccessList menu={menu} OnToggeleEdit={OnToggeleEdit} OnToggeleView={OnToggeleView} />
                                    </div>
                                </div>
                                <div className="privelege-div">
                                    <strong>Role for QA</strong>
                                    <div className="privelege-titel-div">
                                        <ul>
                                            <li className="form-group">
                                                <input type="checkbox" id="check-box1" />
                                                <label htmlFor="check-box1">Login/ Logout Logs</label>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="privelege-titel-div">
                                        <ul>
                                            <li className="form-group">
                                                <input type="checkbox" id="check-box1" />
                                                <label htmlFor="check-box1">Staff & Members</label>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="privelege-list-div">
                                        <ul>
                                            <li className="form-group">
                                                <input type="checkbox" id="check-box2" />
                                                <label htmlFor="check-box2">View Staff Members</label>
                                            </li>
                                            <li className="form-group">
                                                <input type="checkbox" id="check-box3" />
                                                <label htmlFor="check-box3">Add New Member</label>
                                            </li>
                                            <li className="form-group">
                                                <input type="checkbox" id="check-box4" />
                                                <label htmlFor="check-box4">Edit Member</label>
                                            </li>
                                            <li className="form-group">
                                                <input type="checkbox" id="check-box5" />
                                                <label htmlFor="check-box5">Remove Member</label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="privelege-div">
                                    <div className="privelege-titel-div">
                                        <ul>
                                            <li className="form-group">
                                                <input type="checkbox" id="check-box6" />
                                                <label htmlFor="check-box6">Documentation & Legals</label>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="privelege-list-div">
                                        <ul>
                                            <li className="form-group">
                                                <input type="checkbox" id="check-box7" />
                                                <label htmlFor="check-box7">Edit Details</label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="privelege-div">
                                    <div className="privelege-titel-div">
                                        <ul>
                                            <li className="form-group">
                                                <input type="checkbox" id="check-box8" />
                                                <label htmlFor="check-box8">Photos & Media</label>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="privelege-list-div">
                                        <ul>
                                            <li className="form-group">
                                                <input type="checkbox" id="check-box9" />
                                                <label htmlFor="check-box9">View Photos & Media</label>
                                            </li>
                                            <li className="form-group">
                                                <input type="checkbox" id="check-box10" />
                                                <label htmlFor="check-box10">Add New</label>
                                            </li>
                                            <li className="form-group">
                                                <input type="checkbox" id="check-box11" />
                                                <label htmlFor="check-box11">Delete Image</label>
                                            </li>
                                            <li className="form-group">
                                                <input type="checkbox" id="check-box12" />
                                                <label htmlFor="check-box12">Make Default</label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="privelege-div">
                                    <div className="privelege-titel-div">
                                        <ul>
                                            <li className="form-group">
                                                <input type="checkbox" id="check-box13" />
                                                <label htmlFor="check-box13">About Your Business</label>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="privelege-list-div">
                                        <ul>
                                            <li className="form-group">
                                                <input type="checkbox" id="check-box14" />
                                                <label htmlFor="check-box14">View Photos & Media</label>
                                            </li>
                                            <li className="form-group">
                                                <input type="checkbox" id="check-box15" />
                                                <label htmlFor="check-box15">View Details</label>
                                            </li>
                                            <li className="form-group">
                                                <input type="checkbox" id="check-box16" />
                                                <label htmlFor="check-box16">Edit Account Details</label>
                                            </li>
                                            <li className="form-group">
                                                <input type="checkbox" id="check-box17" />
                                                <label htmlFor="check-box17">Edit Contact Information</label>
                                            </li>
                                            <li className="form-group">
                                                <input type="checkbox" id="check-box18" />
                                                <label htmlFor="check-box18">Add Address</label>
                                            </li>
                                            <li className="form-group">
                                                <input type="checkbox" id="check-box19" />
                                                <label htmlFor="check-box19">Edit Address</label>
                                            </li>
                                            <li className="form-group">
                                                <input type="checkbox" id="check-box20" />
                                                <label htmlFor="check-box20">Delete Address</label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

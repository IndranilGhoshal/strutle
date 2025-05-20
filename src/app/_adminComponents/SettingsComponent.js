'use client'
import React, { useEffect, useState } from 'react'
import { getLocalStorageData, hideLoader, removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common'
import { TextField } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation';
import { adminSettingsApi } from '../lib/apiService';
import { toast, ToastContainer } from 'react-toastify';

export default function SettingsComponent() {
    const router = useRouter();
    const searchparams = useSearchParams();
    const search = searchparams.get('tab')

    //Admin Profile
    const [adminname, setadminname] = useState('')
    const [adminemail, setadminemail] = useState('')

    //Change password 
    const [passworderror, setpassworderror] = useState(false)
    const [validpassworderror, setvalidpassworderror] = useState(false)

    const [oldpassword, setoldpassword] = useState('')
    const [oldpasswordtype, setoldpasswordtype] = useState('password')
    const [newpassword, setnewpassword] = useState('')
    const [newpasswordtype, setnewpasswordtype] = useState('password')
    const [confirmpassword, setconfirmpassword] = useState('')
    const [confirmpasswordtype, setconfirmpasswordtype] = useState('password')


    useEffect(() => {
        if (getLocalStorageData('admin')?._id) {
            router.push("/admin/account/settings");
            setTimeout(() => {
                if (search) {
                    if (search == 'admin-details-tab') {
                        getadminname()
                        var element = document.getElementById(search);
                        element.click()
                    } else {
                        var element = document.getElementById(search);
                        element.click()
                    }
                }
                if (!search) {
                    var element = document.getElementById("admin-details-tab");
                    element.click()
                    hideLoader()
                }
            }, 100);
        } else {
            router.push("/admin");
        }
    }, [])
    const goto = (path) => {
        showLoader()
        if (path == '/settings?tab=admin-details-tab') {
            getadminname()
        }
        else {
            hideLoader()
        }
        router.push("/admin/account" + path)
        removeLocalStorageData("pathName")
        setLocalStorageData('pathName', path)
    }


    const getadminname = async () => {
        setadminname(getLocalStorageData('admin')?.firstname + " " + getLocalStorageData('admin')?.lastname)
        setadminemail(getLocalStorageData('admin')?.email)
        hideLoader()
    }


    const changepassword = async () => {
            let err = 0
            setpassworderror(false)
            setvalidpassworderror(false)
            if (!oldpassword || !newpassword || !confirmpassword) {
                setpassworderror(true)
                err++
            }
            if (newpassword !== confirmpassword) {
                setvalidpassworderror(true)
                err++
            }
            if (err == 0) {
                showLoader()
                let response = await adminSettingsApi({ id: getLocalStorageData('admin')?._id, oldpassword: oldpassword, password: newpassword, changepassword: true })
                if (response.success) {
                    setoldpassword('')
                    setnewpassword('')
                    setconfirmpassword('')
                    toast.success(response.message)
                    hideLoader()
                } else {
                    hideLoader()
                    toast.error(response.message)
                }
            }
        }



    return (
        <>
            <h2 className='text-blue'><i className="bi bi-gear"></i> Settings</h2>
            <div>
                <div className="stp-payment-div seller">
                    <div className="myaccnt my-3" style={{ height: '75vh' }}>
                        <div className="myaccnt-left">
                            <nav>
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    {/* Admin Details */}
                                    <button
                                        className="nav-link active"
                                        id="admin-details-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#admin-details"
                                        type="button"
                                        role="tab"
                                        aria-controls="admin-details"
                                        aria-selected="true"
                                        onClick={() => { goto('/settings?tab=admin-details-tab') }}
                                    >
                                        <div className="upi-div mt-2"><strong><i className="bi bi-person-fill-gear"></i> Admin Profile</strong></div>
                                    </button>
                                    {/* Change Password */}
                                    <button
                                        className="nav-link"
                                        id="admin-change-password-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#admin-change-password"
                                        type="button"
                                        role="tab"
                                        aria-controls="admin-change-password"
                                        aria-selected="true"
                                        onClick={() => { goto('/settings?tab=admin-change-password-tab') }}
                                    >
                                        <div className="upi-div mt-2"><strong><i className="bi bi-key"></i> Change Password</strong></div>
                                    </button>
                                </div>
                            </nav>
                        </div>
                        <div className="myaccnt-right">
                            <div className="tab-content" id="nav-tabContent">
                                {/* Admin Details */}
                                <div className="tab-pane fade show active" id="admin-details" role="tabpanel" aria-labelledby="admin-details-tab"
                                    tabIndex="0">
                                    <div className="upi-dv">
                                        <h4 className='text-blue'><i className="bi bi-person-fill-gear"></i> Admin Profile</h4>
                                        <p className='e-Sign-p'>View admin profile details on srutle account</p>
                                        <div className='my-3'>
                                            <TextField
                                                label="Admin Name"
                                                variant="outlined"
                                                style={{ width: "60%" }}
                                                value={adminname}
                                                onChange={(e) => { setadminname(e.target.value) }}
                                                slotProps={{
                                                    input: {
                                                        readOnly: true,
                                                    },
                                                }}
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <TextField
                                                label="Admin Email"
                                                variant="outlined"
                                                style={{ width: "60%" }}
                                                value={adminemail}
                                                onChange={(e) => { setadminemail(e.target.value) }}
                                                slotProps={{
                                                    input: {
                                                        readOnly: true,
                                                    },
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Change Password */}
                                <div className="tab-pane fade" id="admin-change-password" role="tabpanel" aria-labelledby="admin-change-password-tab"
                                    tabIndex="0">
                                    <div className="upi-dv">
                                        <h4 className='text-blue'><i className="bi bi-key"></i> Change Password</h4>
                                        <p className='e-Sign-p'>change admin profile password on srutle account</p>
                                        <div className='my-3'>
                                            <div className='form-group passwrd change-password mb-3'>
                                                <label>Old Password</label>
                                                <input
                                                    className={`${passworderror && !oldpassword ? "error-txt" : ""}`}
                                                    type={oldpasswordtype}
                                                    name="password"
                                                    value={oldpassword}
                                                    onChange={(e) => { setoldpassword(e.target.value) }}
                                                />
                                                {
                                                    oldpasswordtype == "password" ?
                                                        <button className="btn btn-vw" onClick={() => { setoldpasswordtype('text') }}><i className="bi bi-eye-fill"></i></button>
                                                        :
                                                        <button className="btn btn-vw" onClick={() => { setoldpasswordtype('password') }}><i className="bi bi-eye-slash-fill"></i></button>
                                                }
                                                {
                                                    passworderror && !oldpassword && <div className='input-error'>Please enter old password</div>
                                                }
                                            </div>
                                            <div className='form-group passwrd change-password mb-3'>
                                                <label>New Password</label>
                                                <input
                                                    className={`${passworderror && !newpassword ? "error-txt" : ""}${validpassworderror && !passworderror && confirmpassword && newpassword ? "error-txt" : ""}`}
                                                    type={newpasswordtype}
                                                    name="password"
                                                    value={newpassword}
                                                    onChange={(e) => { setnewpassword(e.target.value) }}
                                                />
                                                {
                                                    newpasswordtype == "password" ?
                                                        <button className="btn btn-vw" onClick={() => { setnewpasswordtype('text') }}><i className="bi bi-eye-fill"></i></button>
                                                        :
                                                        <button className="btn btn-vw" onClick={() => { setnewpasswordtype('password') }}><i className="bi bi-eye-slash-fill"></i></button>
                                                }
                                                {
                                                    passworderror && !newpassword && <div className='input-error'>Please enter new password</div>
                                                }
                                            </div>
                                            <div className='form-group passwrd change-password mb-3'>
                                                <label>Confirm Password</label>
                                                <input
                                                    className={`${passworderror && !confirmpassword ? "error-txt" : ""}${validpassworderror && !passworderror && confirmpassword && newpassword ? "error-txt" : ""}`}
                                                    type={confirmpasswordtype}
                                                    name="password"
                                                    value={confirmpassword}
                                                    onChange={(e) => { setconfirmpassword(e.target.value) }}
                                                />
                                                {
                                                    confirmpasswordtype == "password" ?
                                                        <button className="btn btn-vw" onClick={() => { setconfirmpasswordtype('text') }}><i className="bi bi-eye-fill"></i></button>
                                                        :
                                                        <button className="btn btn-vw" onClick={() => { setconfirmpasswordtype('password') }}><i className="bi bi-eye-slash-fill"></i></button>
                                                }
                                                {
                                                    passworderror && !confirmpassword && <div className='input-error'>Please enter confirm password</div>
                                                }
                                                {
                                                    validpassworderror && !passworderror && confirmpassword && newpassword && <div className='input-error'>Password miss match</div>
                                                }
                                            </div>

                                            <div className='sett-sign-box-btn my-4'>
                                                <button className='btn btn-primary' style={{ width: "60%" }} onClick={() => { changepassword() }}>Submit</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}

'use client'
import React, { useEffect, useState } from 'react'
import { getLocalStorageData, hideLoader, removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common'
import { TextField } from '@mui/material'
import { sellerSettingsApi, uploadImageApi } from '../lib/apiService'
import { Modal } from 'react-bootstrap'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { toast, ToastContainer } from 'react-toastify'
import { resizeFile } from '../lib/ImageCroper'

export default function SettingsComponent() {
    const router = useRouter();
    const searchparams = useSearchParams();
    const search = searchparams.get('tab')

    //Seller Profile
    const [sellername, setSellername] = useState('')


    // Seller Signature
    const [businessname, setBusinessname] = useState('')
    const [signatureerror, setsignatureerror] = useState(false)
    const [signature, setsignature] = useState('')
    const [signatureimageerror, setsignatureimageerror] = useState(false)
    const [signatureimage, setsignatureimage] = useState('')
    const [esignature, setesignature] = useState('')
    const [esignaturetype, setesignaturetype] = useState('')

    const [changesignatureshow, setchangesignatureShow] = useState(false);
    const handlechangesignatureClose = () => setchangesignatureShow(false);


    //Change password 
    const [passworderror, setpassworderror] = useState(false)
    const [validpassworderror, setvalidpassworderror] = useState(false)

    const [oldpassword, setoldpassword] = useState('')
    const [oldpasswordtype, setoldpasswordtype] = useState('password')
    const [newpassword, setnewpassword] = useState('')
    const [newpasswordtype, setnewpasswordtype] = useState('password')
    const [confirmpassword, setconfirmpassword] = useState('')
    const [confirmpasswordtype, setconfirmpasswordtype] = useState('password')

    //Bank details
    const [bankname, setbankname] = useState('')
    const [bankaccountnumber, setbankaccountnumber] = useState('')
    const [ifsc, setifsc] = useState('')

    //Tax details
    const [gstinno, setgstinno] = useState('')
    const [enrolmentno, setenrolmentno] = useState('')
    const [panno, setpanno] = useState('')

    //Whatsapp Notification
    const [whatsapp, setwhatsapp] = useState('')

    useEffect(() => {
        if (getLocalStorageData('seller')?._id) {
            router.push("/seller/account/settings");
            setTimeout(() => {
                if (search) {
                    if (search == "seller-signature-tab") {
                        getbusinessname()
                        getesignature()
                        var element = document.getElementById(search);
                        element.click()
                    }
                    else if (search == 'seller-details-tab') {
                        getsellername()
                        var element = document.getElementById(search);
                        element.click()
                    }
                    else if (search == 'bank-details-tab') {
                        getbankdetails()
                        var element = document.getElementById(search);
                        element.click()
                    }
                    else if (search == 'tax-details-tab') {
                        gettaxdetails()
                        var element = document.getElementById(search);
                        element.click()
                    }
                    else if (search == 'whatsapp-notification-tab') {
                        getwhatsappdetails()
                        var element = document.getElementById(search);
                        element.click()
                    }
                    else {
                        var element = document.getElementById(search);
                        element.click()
                        hideLoader()
                    }
                }
                if (!search) {
                    var element = document.getElementById("seller-details-tab");
                    element.click()
                    hideLoader()
                }
            }, 100);
        } else {
            router.push("/seller");
        }
    }, [])

    const goto = (path) => {
        showLoader()
        if (path == '/settings?tab=seller-signature-tab') {
            getbusinessname()
            getesignature()
        }
        else if (path == '/settings?tab=seller-details-tab') {
            getsellername()
        }
        else if (path == '/settings?tab=bank-details-tab') {
            getbankdetails()
        }
        else if (path == '/settings?tab=tax-details-tab') {
            gettaxdetails()
        }
        else if (path == '/settings?tab=whatsapp-notification-tab') {
            getwhatsappdetails()
        }
        else {
            hideLoader()
        }
        router.push("/seller/account" + path)
        removeLocalStorageData("pathName")
        setLocalStorageData('pathName', path)
    }


    const getsellername = async () => {
        let response = await sellerSettingsApi({ id: getLocalStorageData('seller')?._id, getsellername: true })
        if (response.success) {
            let { result } = response
            setSellername(result.name)
            hideLoader()
        } else {
            setSellername('')
            hideLoader()
        }
    }


    const getbusinessname = async () => {
        let response = await sellerSettingsApi({ id: getLocalStorageData('seller')?._id, getbusinessname: true })
        if (response.success) {
            let { result } = response
            setBusinessname(result.businessname)
            if (getLocalStorageData('seller')?.esignature == "") {
                setesignature(result.businessname)
            }
            if (getLocalStorageData('seller')?.esignaturetype == "") {
                setesignaturetype('text')
            }
            hideLoader()
        } else {
            setBusinessname('')
            hideLoader()
        }
    }

    const getesignature = async () => {
        let response = await sellerSettingsApi({ id: getLocalStorageData('seller')?._id, getesignature: true })
        if (response.success) {
            let { result } = response
            if (result.esignature) {
                setesignature(result.esignature)
            }
            if (result.esignaturetype) {
                setesignaturetype(result.esignaturetype)
            }
            hideLoader()
        } else {
            hideLoader()
        }
    }



    const changesignature = () => {
        showLoader()
        if (esignaturetype == "") {
            setsignature(esignature)
            setsignatureimage('')
            setTimeout(() => {
                var element = document.getElementById("nav-create-tab");
                element.click()
            }, 100);
        }
        else if (esignaturetype == "text") {
            setsignature(esignature)
            setsignatureimage('')
            setTimeout(() => {
                var element = document.getElementById("nav-create-tab");
                element.click()
            }, 100);
        }
        else if (esignaturetype == "image") {
            setsignature('')
            setsignatureimage(esignature)
            setTimeout(() => {
                var element = document.getElementById("nav-upload-tab");
                element.click()
            }, 100);
        }
        hideLoader()
        setchangesignatureShow(true)
    }

    const addesignature = () => {
        let err = 0
        setsignatureerror(false)
        if (!signature) {
            setsignatureerror(true)
            err++
        }
        if (err == 0) {
            setesignature(signature);
            setesignaturetype('text')
            handlechangesignatureClose()
        }
    }

    const addesignatureimage = () => {
        let err = 0
        setsignatureimageerror(false)
        if (!signatureimage) {
            setsignatureimageerror(true)
            err++
        }
        if (err == 0) {
            setesignature(signatureimage);
            setesignaturetype('image')
            handlechangesignatureClose()
        }
    }


    const submitesignature = async () => {
        showLoader()
        let data = {
            id: getLocalStorageData('seller')?._id,
            esignature: esignature,
            esignaturetype: esignaturetype,
            token: getLocalStorageData('seller')?.token,
            addesignature: true
        }
        let response = await sellerSettingsApi(data)
        if (response.success) {
            const { result } = response;
            removeLocalStorageData("seller")
            setLocalStorageData("seller", result)
            getbusinessname()
            getesignature()
            toast.success(response.message)
            hideLoader()
        } else {
            hideLoader()
            toast.error(response.message)
        }
    }

    const uploadImg = async (f) => {
        showLoader()
        const image = await resizeFile(f);
        const data = new FormData();
        data.set("file", image);
        let result = await uploadImageApi(data)
        if (result.success) {
            setsignatureimage(result.fileName)
            hideLoader()
        } else {
            hideLoader()
        }
    }

    const showUpload = () => {
        const image = document.getElementById('signatureimagefile');
        image.click();
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
            let response = await sellerSettingsApi({ id: getLocalStorageData('seller')?._id, oldpassword: oldpassword, password: newpassword, changepassword: true })
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

    const getbankdetails = async () => {
        let response = await sellerSettingsApi({ id: getLocalStorageData('seller')?._id, getbankdetails: true })
        if (response.success) {
            let { result } = response
            setbankname(result.bankname)
            setbankaccountnumber(result.bankaccountnumber)
            setifsc(result.ifsc)
            hideLoader()
        } else {
            setbankname('')
            setbankaccountnumber('')
            setifsc('')
            hideLoader()
        }
    }

    const gettaxdetails = async () => {
        let response = await sellerSettingsApi({ id: getLocalStorageData('seller')?._id, gettaxdetails: true })
        if (response.success) {
            let { result } = response
            setgstinno(result.gstinno)
            setenrolmentno(result.enrolmentno)
            setpanno(result.panno)
            hideLoader()
        } else {
            setgstinno('')
            setenrolmentno('')
            setpanno('')
            hideLoader()
        }
    }

    const getwhatsappdetails = async () => {
        let response = await sellerSettingsApi({ id: getLocalStorageData('seller')?._id, getwhatsappdetails: true })
        if (response.success) {
            let { result } = response
            setwhatsapp(result.whatsapp == "0" ? false : true)
            hideLoader()
        } else {
            setwhatsapp('')
            hideLoader()
        }
    }

    const setwhatsappdetails = async (wp) => {
        showLoader()
        let response = await sellerSettingsApi({ id: getLocalStorageData('seller')?._id, whatsapp:wp==true?"1":"0", setwhatsappdetails: true })
        if (response.success) {
            getwhatsappdetails()
        } else {
            hideLoader()
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
                                    {/* Seller Details */}
                                    <button
                                        className="nav-link active"
                                        id="seller-details-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#seller-details"
                                        type="button"
                                        role="tab"
                                        aria-controls="seller-details"
                                        aria-selected="true"
                                        onClick={() => { goto('/settings?tab=seller-details-tab') }}
                                    >
                                        <div className="upi-div mt-2"><strong><i className="bi bi-person-fill-gear"></i> Seller Profile</strong></div>
                                    </button>
                                    {/* Seller Signature */}
                                    <button
                                        className="nav-link"
                                        id="seller-signature-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#seller-signature"
                                        type="button"
                                        role="tab"
                                        aria-controls="seller-signature"
                                        aria-selected="true"
                                        onClick={() => { goto('/settings?tab=seller-signature-tab') }}
                                    >
                                        <div className="upi-div mt-2"><strong><i className="bi bi-person-badge"></i> Seller E-Signature</strong></div>
                                    </button>
                                    {/* Change Password */}
                                    <button
                                        className="nav-link"
                                        id="change-password-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#change-password"
                                        type="button"
                                        role="tab"
                                        aria-controls="change-password"
                                        aria-selected="true"
                                        onClick={() => { goto('/settings?tab=change-password-tab') }}
                                    >
                                        <div className="upi-div mt-2"><strong><i className="bi bi-key"></i> Change Password</strong></div>
                                    </button>
                                    {/* Bank Details */}
                                    <button
                                        className="nav-link"
                                        id="bank-details-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#bank-details"
                                        type="button"
                                        role="tab"
                                        aria-controls="bank-details"
                                        aria-selected="true"
                                        onClick={() => { goto('/settings?tab=bank-details-tab') }}
                                    >
                                        <div className="upi-div mt-2"><strong><i className="bi bi-bank2"></i> Bank Details</strong></div>
                                    </button>
                                    {/* Tax Details */}
                                    <button
                                        className="nav-link"
                                        id="tax-details-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#tax-details"
                                        type="button"
                                        role="tab"
                                        aria-controls="tax-details"
                                        aria-selected="true"
                                        onClick={() => { goto('/settings?tab=tax-details-tab') }}
                                    >
                                        <div className="upi-div mt-2"><strong><i className="bi bi-tag"></i> Tax Details</strong></div>
                                    </button>
                                    {/* Whatsapp Notification */}
                                    <button
                                        className="nav-link"
                                        id="whatsapp-notification-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#whatsapp-notification"
                                        type="button"
                                        role="tab"
                                        aria-controls="whatsapp-notification"
                                        aria-selected="true"
                                        onClick={() => { goto('/settings?tab=whatsapp-notification-tab') }}
                                    >
                                        <div className="upi-div mt-2"><strong><i className="bi bi-whatsapp"></i> Whatsapp Notification</strong></div>
                                    </button>
                                </div>
                            </nav>
                        </div>
                        <div className="myaccnt-right">
                            <div className="tab-content" id="nav-tabContent">
                                {/* Seller Details */}
                                <div className="tab-pane fade show active" id="seller-details" role="tabpanel" aria-labelledby="seller-details-tab"
                                    tabIndex="0">
                                    <div className="upi-dv">
                                        <h4 className='text-blue'><i className="bi bi-person-fill-gear"></i> Seller Profile</h4>
                                        <p className='e-Sign-p'>View seller profile details on srutle account</p>
                                        <div className='my-3'>
                                            <TextField
                                                label="Seller Name"
                                                variant="outlined"
                                                style={{ width: "60%" }}
                                                value={sellername}
                                                onChange={(e) => { setSellername(e.target.value) }}
                                                slotProps={{
                                                    input: {
                                                        readOnly: true,
                                                    },
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Seller Signature */}
                                <div className="tab-pane fade" id="seller-signature" role="tabpanel" aria-labelledby="seller-signature-tab"
                                    tabIndex="0">
                                    <div className="upi-dv">
                                        <h4 className='text-blue'><i className="bi bi-person-badge"></i> Seller E-Signature</h4>
                                        <p className='e-Sign-p'>E-signature is required for raising invoices / credit notes on your behalf to customers</p>
                                        <TextField
                                            id="outlined-basic"
                                            label="Business Name"
                                            variant="outlined"
                                            style={{ width: "60%" }}
                                            value={businessname}
                                            onChange={(e) => { setBusinessname(e.target.value) }}
                                            slotProps={{
                                                input: {
                                                    readOnly: true,
                                                },
                                            }}
                                        />
                                        <div className='sett-sign-box'>
                                            <div className='sett-sign-box-t'>
                                                <p>Generated E-Signature</p>
                                                {
                                                    esignaturetype == "text" && <h5>{esignature}</h5>
                                                }
                                                {
                                                    esignaturetype == "image" && <div><Image src={'/upload/' + esignature} width={300} height={100} alt='sign' /></div>
                                                }
                                            </div>
                                            <div className='sett-sign-box-b'>
                                                <p>Want you change the signature?</p>
                                                <button className='text-blue' onClick={() => { changesignature() }}>Change <i className="bi bi-pencil"></i></button>
                                            </div>
                                        </div>
                                        <div className='sett-sign-box-btn my-4'>
                                            <button className='btn btn-primary' style={{ width: "60%" }} onClick={() => { submitesignature() }}>Submit Signature</button>
                                        </div>
                                    </div>
                                </div>
                                {/* Change Password */}
                                <div className="tab-pane fade" id="change-password" role="tabpanel" aria-labelledby="change-password-tab"
                                    tabIndex="0">
                                    <div className="upi-dv">
                                        <h4 className='text-blue'><i className="bi bi-key"></i> Change Password</h4>
                                        <p className='e-Sign-p'>change seller profile password on srutle account</p>
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
                                {/* Bank Details */}
                                <div className="tab-pane fade" id="bank-details" role="tabpanel" aria-labelledby="bank-details-tab"
                                    tabIndex="0">
                                    <div className="upi-dv">
                                        <h4 className='text-blue'><i className="bi bi-bank2"></i> Bank Details</h4>
                                        <p className='e-Sign-p'>View seller bank details on srutle account</p>
                                        <div className='my-3'>
                                            <TextField
                                                label="Bank Name"
                                                variant="outlined"
                                                style={{ width: "60%" }}
                                                value={bankname}
                                                onChange={(e) => { setbankname(e.target.value) }}
                                                slotProps={{
                                                    input: {
                                                        readOnly: true,
                                                    },
                                                }}
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <TextField
                                                label="Bank Account No."
                                                variant="outlined"
                                                style={{ width: "60%" }}
                                                value={bankaccountnumber}
                                                onChange={(e) => { setbankaccountnumber(e.target.value) }}
                                                slotProps={{
                                                    input: {
                                                        readOnly: true,
                                                    },
                                                }}
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <TextField
                                                label="IFSC Code"
                                                variant="outlined"
                                                style={{ width: "60%" }}
                                                value={ifsc}
                                                onChange={(e) => { setifsc(e.target.value) }}
                                                slotProps={{
                                                    input: {
                                                        readOnly: true,
                                                    },
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Tax Details */}
                                <div className="tab-pane fade" id="tax-details" role="tabpanel" aria-labelledby="tax-details-tab"
                                    tabIndex="0">
                                    <div className="upi-dv">
                                        <h4 className='text-blue'><i className="bi bi-tag"></i> Tax Details</h4>
                                        <p className='e-Sign-p'>View seller tax details on srutle account</p>
                                        {
                                            gstinno &&
                                            <div className='my-3'>
                                                <TextField
                                                    label="GSTIN Number"
                                                    variant="outlined"
                                                    style={{ width: "60%" }}
                                                    value={gstinno}
                                                    onChange={(e) => { setgstinno(e.target.value) }}
                                                    slotProps={{
                                                        input: {
                                                            readOnly: true,
                                                        },
                                                    }}
                                                />
                                            </div>
                                        }

                                        {
                                            enrolmentno &&
                                            <div className='my-3'>
                                                <TextField
                                                    label="Enrolment Number"
                                                    variant="outlined"
                                                    style={{ width: "60%" }}
                                                    value={enrolmentno}
                                                    onChange={(e) => { setenrolmentno(e.target.value) }}
                                                    slotProps={{
                                                        input: {
                                                            readOnly: true,
                                                        },
                                                    }}
                                                />
                                            </div>
                                        }

                                        <div className='mb-3'>
                                            <TextField
                                                label="PAN No."
                                                variant="outlined"
                                                style={{ width: "60%" }}
                                                value={panno}
                                                onChange={(e) => { setpanno(e.target.value) }}
                                                slotProps={{
                                                    input: {
                                                        readOnly: true,
                                                    },
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Whatsapp Notification */}
                                <div className="tab-pane fade" id="whatsapp-notification" role="tabpanel" aria-labelledby="whatsapp-notification-tab"
                                    tabIndex="0">
                                    <div className="upi-dv">
                                        <h4 className='text-blue'><i className="bi bi-whatsapp"></i> Whatsapp Notification</h4>
                                        <p className='e-Sign-p'>View seller whatsapp notification on srutle account</p>
                                        <div className='mt-3'>
                                            <div className="terms whatsapp-notification">
                                                <input
                                                    type="checkbox"
                                                    id="agreeTerms"
                                                    name="agreeTerms"
                                                    checked={whatsapp}
                                                    value=""
                                                    onChange={() => { setwhatsappdetails(!whatsapp) }}
                                                />
                                                <label htmlFor="agreeTerms">Do you want to get <Image src={'/assets/seller-img/whatsapp_icon.png'} width={20} height={8} alt='wht' /> Whatsapp notification for important updates? </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                show={changesignatureshow}
                onHide={handlechangesignatureClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body style={{ padding: '10px' }}>
                    <div className="modal-header">
                        <h5 className="modal-title">Add Signature</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { handlechangesignatureClose() }}></button>
                    </div>
                    <div className="success-ord">
                        <nav className='mt-3'>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                {/* Create */}
                                <button
                                    className="nav-link"
                                    id="nav-create-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#nav-create"
                                    type="button"
                                    role="tab"
                                    aria-controls="nav-create"
                                    aria-selected="true"
                                >
                                    Create
                                </button>
                                {/* Upload */}
                                <button
                                    className="nav-link"
                                    id="nav-upload-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#nav-upload"
                                    type="button"
                                    role="tab"
                                    aria-controls="nav-upload"
                                    aria-selected="false"
                                >
                                    Upload
                                </button>
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            {/* Create */}
                            <div className="tab-pane fade" id="nav-create" role="tabpanel" aria-labelledby="nav-create-tab" tabIndex="0">
                                <div className='my-3'>
                                    <TextField
                                        error={signatureerror && !signature}
                                        id="outlined-basic"
                                        label="Name of Signature"
                                        variant="outlined"
                                        style={{ width: "100%" }}
                                        value={signature}
                                        onChange={(e) => { setsignature(e.target.value) }}
                                    />
                                    {
                                        signatureerror && !signature && <div className='input-error'>Please enter signature</div>
                                    }
                                </div>
                                {
                                    signature &&
                                    <div className='conv-sign-dv my-3'>
                                        <label>Signature</label>
                                        <div className='conv-sign'>
                                            {signature}
                                        </div>
                                    </div>
                                }
                                <div className='conv-sign-btn my-3'>
                                    <button className='btn btn-primary' onClick={() => { addesignature() }}>Add Signature</button>
                                </div>
                            </div>
                            {/* Upload */}
                            <div className="tab-pane fade" id="nav-upload" role="tabpanel" aria-labelledby="nav-upload-tab" tabIndex="0">
                                <div className='my-3'>
                                    <div className="alert alert-warning" role="alert">
                                        <i className="bi bi-info-circle-fill"></i> Upload image in jpeg / png format (Max size 5 MB)
                                    </div>
                                    <div className='conv-sign-dv my-3'>
                                        {
                                            signatureimage &&
                                            <Image src={'/upload/' + signatureimage} width={300} height={100} alt='sign' />
                                        }
                                        <input
                                            style={{ display: 'none' }}
                                            id="signatureimagefile"
                                            type="file"
                                            name="file"
                                            onChange={(e) => { uploadImg(e.target.files?.[0]) }}
                                            accept="image/jpg,image/jpeg,image/png"
                                        />
                                        <div className='conv-sign-upload cp' onClick={() => { showUpload() }}>
                                            <i className="bi bi-upload"></i> Upload
                                        </div>
                                    </div>
                                    {
                                        signatureimageerror && !signatureimage && <div className='input-error'>Please upload signature</div>
                                    }
                                    <div className='conv-sign-btn my-3'>
                                        <button className='btn btn-primary' onClick={() => { addesignatureimage() }}>Add Signature</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <ToastContainer />
        </>
    )
}

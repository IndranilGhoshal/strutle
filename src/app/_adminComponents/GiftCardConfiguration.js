'use client'
import React, { useEffect, useState } from 'react'
import { hideLoader, showLoader } from '../lib/common'
import Image from 'next/image'
import { toast, ToastContainer } from 'react-toastify'
import { resizeFile } from '../lib/ImageCroper'
import { admingiftcardApi, uploadImageApi } from '../lib/apiService'

export default function GiftCardConfiguration({ id }) {
    const [imagearray, setImageArray] = useState([])
    const [amountarray, setAmountArray] = useState([])
    const [amount, setAmount] = useState('')
    const [error, setError] = useState(false)
    const [validerror, setValidError] = useState(false)
    const [finalerror, setFinalError] = useState(false)

    useEffect(() => {
        getdetails()
    }, [])


    const getdetails = async () => {
        showLoader()
        let data = {mstgiftcardsid:id, configurationdetails: true }
        let response = await admingiftcardApi(data)
        if (response.success) {
            let { result } = response;
            setImageArray(result.imagearray)
            setAmountArray(result.amountarray)
            hideLoader()
        } else {
            setImageArray([])
            setAmountArray([])
            hideLoader()
        }
    }


    const onMessage = async (mes, sus) => {
        if (sus) {
            toast.success(mes)
        } else {
            toast.error(mes)
        }
    }

    const uploadImg = async (f) => {
        showLoader()
        const image = await resizeFile(f);
        const data = new FormData();
        data.set("file", image);
        let result = await uploadImageApi(data)
        if (result.success) {
            let obj = {
                "mstgiftcardsid": id,
                "image": result.fileName,
                "status": "0"
            }
            if (imagearray.length > 0) {
                setImageArray([...imagearray, obj])
            } else {
                let o = []
                o.push(obj)
                setImageArray(o)
            }
            onMessage(result.message, true)
            hideLoader()
        } else {
            hideLoader()
            onMessage(result.message, false)
        }
    }

    const showUpload = () => {
        const image = document.getElementById('giftcardimagefile');
        image.click();
    }

    const addamountevent = () => {
        let err = 0;
        setError(false)
        setValidError(false)
        if (!amount) {
            setError(true)
            err++
        }
        if (amountarray.length > 0) {
            let temp = [...amountarray]
            for (let a of temp) {
                if (a.amount == amount) {
                    setValidError(true)
                    err++
                }
            }
        }
        if (err == 0) {
            let obj = {
                "mstgiftcardsid": id,
                "amount": amount,
                "status": "0"
            }
            if (amountarray.length > 0) {
                setAmountArray([...amountarray, obj])
            } else {
                let o = []
                o.push(obj)
                setAmountArray(o)
            }
            setAmount('')
        }
    }

    const deleteArrayValue = (index) => {
        let temp = [...amountarray]
        let m = []
        for (let [i, t] of temp.entries()) {
            if (i !== index) {
                m.push(t)
            }
        }
        setAmountArray(m)
    }

    const deleteimageArrayValue = (index) => {
        let temp = [...imagearray]
        let m = []
        for (let [i, t] of temp.entries()) {
            if (i !== index) {
                m.push(t)
            }
        }
        setImageArray(m)
    }

    const addevent = async () => {
        showLoader()
        let err = 0;
        setFinalError(false)
        if (imagearray.length == 0 || amountarray.length == 0) {
            finalerror(true)
            err++
        }
        if (err == 0) {
            let data = {mstgiftcardsid:id, imagearray, amountarray, addconfiguration: true }
            let response = await admingiftcardApi(data)
            if (response.success) {
                getdetails()
                hideLoader()
                onMessage(response.message, true)
            } else {
                getdetails()
                hideLoader()
                onMessage(response.message, false)
            }
        }
    }


    return (
        <>
            <div className="main-das-page">
                <div className="heading mb-3">
                    <h3>Gift Card Configuration</h3>
                </div>
                <div className='gft-crd-div'>
                    <div>
                        <label>Gift Card Image (Multiple)</label>
                        {
                            imagearray.length > 0 ?
                                <>
                                    <div className='row'>
                                        {
                                            imagearray.map((item, i) => (
                                                <div className='col-sm-3' key={i}>
                                                    <div className="position-relative gft_img">
                                                        <Image
                                                            src={'/upload/' + item.image}
                                                            height={100}
                                                            width={200}
                                                            alt='no'
                                                        />
                                                        <span onClick={() => { deleteimageArrayValue(i) }} className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger cp">
                                                            x
                                                        </span>
                                                    </div>

                                                </div>
                                            ))
                                        }
                                    </div>
                                </>
                                :
                                <></>
                        }
                        <div>
                            <input
                                style={{ display: 'none' }}
                                id="giftcardimagefile"
                                type="file"
                                name="file"
                                className={`form-control`}
                                onChange={(e) => { uploadImg(e.target.files?.[0]) }}
                                accept="image/jpg,image/jpeg,image/png"
                            />
                            <button className='btn btn-primary mt-3' onClick={() => { showUpload() }}>Upload Image</button>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label>Gift Card Amount</label>
                        {
                            amountarray.length > 0 ?
                                <div className='row'>
                                    {
                                        amountarray.map((item, i) => (
                                            <div key={i} className='col-sm-1'>
                                                <div className="git-crd-amt position-relative">
                                                    ₹{item.amount}
                                                    <span onClick={() => { deleteArrayValue(i) }} className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger cp">
                                                        x
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                :
                                <></>
                        }
                        <div className='gft_crd-amt'>
                            <input
                                className={`form-control ${error && !amount ? "error-txt" : ""} ${validerror && !error && amount ? "error-txt" : ""}`}
                                value={amount}
                                onChange={(e) => { setAmount(e.target.value) }}
                            />
                            <button className='btn btn-primary' onClick={() => { addamountevent() }}>Add Amount</button>
                        </div>
                        {
                            error && !amount && <div className='input-error'>Please enter amount</div>
                        }
                        {
                            validerror && !error && amount && <div className='input-error'>Amount already exist</div>
                        }
                    </div>
                    {
                        finalerror && imagearray.length==0 && amountarray.length>0 && <div className='input-error'>Please upload Image</div>
                    }
                    {
                        finalerror && imagearray.length>0 && amountarray.length==0 && <div className='input-error'>Please enter amount</div>
                    }
                    {
                        finalerror && imagearray.length==0 && amountarray.length==0 && <div className='input-error'>Please upload Image and Enter Amount</div>
                    }
                    <div className='mt-3'>
                        <button className='btn btn-primary' onClick={() => { addevent() }}>Save</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

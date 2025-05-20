'use client'
import React, { useEffect, useState } from 'react'
import { getLocalStorageData, getPassData, hideLoader, removeLocalStorageData, setLocalStorageData, setPassData, showLoader } from '../lib/common'
import { toast, ToastContainer } from 'react-toastify'
import { Modal } from 'react-bootstrap'
import Image from 'next/image'
import { sellerDashboardApi } from '../lib/apiService'
import { useRouter } from 'next/navigation'

export default function DashboardComponent() {
    const router = useRouter();

    useEffect(() => {
        hideLoader()
        if (getLocalStorageData('seller')?.islogin == "0") {
            setShow(true)
        }
        if (getPassData()) {
            toast.success(getPassData())
            setPassData('')
        }
    }, [])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const getislogin = async () => {
        showLoader()
        let response = await sellerDashboardApi({ id: getLocalStorageData('seller')?._id, token: getLocalStorageData('seller')?.token, islogin: true })
        if (response.success) {
            const { result } = response;
            removeLocalStorageData("seller")
            setLocalStorageData("seller", result)
            handleClose()
            hideLoader()
        } else {
            hideLoader()
        }
    }

    const goto = (path) => {
        showLoader()
        router.push("/seller/account" + path)
        removeLocalStorageData("pathName")
        setLocalStorageData('pathName', path)
    }


    return (
        <>
            <div className="main-das-page">
                <div className="heading mb-3">
                    <h3>Welcome to Dashboard</h3>
                    {
                        getLocalStorageData('seller')?.esignature == "" &&
                        <div className="alert alert-danger my-3" role="alert">
                            <strong>Your E-Signature is missing!</strong>
                            <p>E-signature is required for raising invoices / credit notes on your behalf to customers</p>
                            <button type="button" className="btn btn-outline-dark" onClick={() => { goto('/settings?tab=seller-signature-tab') }}>Add Signature</button>
                        </div>
                    }
                </div>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body style={{ padding: '10px' }}>
                    <button id="successsignupbtncls" onClick={() => { handleClose() }} style={{ display: "none" }} type="button" className="close-button abslt" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg"></i></button>
                    <div className="success-ord">
                        <div className="success-ord-inr">
                            <span><Image src={"/assets/seller-img/store-signup-back.png"} width={200} height={100} alt='nocart' /></span>
                            <strong style={{ color: "green" }}>Congratulations!</strong>
                            <p>You are now part of 6 lakhs seller community</p>
                            <p>selling all over India.</p>
                            <button className="btn btn-vw-ordr" onClick={() => { getislogin() }} >Start Selling Now</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <ToastContainer />
        </>
    )
}

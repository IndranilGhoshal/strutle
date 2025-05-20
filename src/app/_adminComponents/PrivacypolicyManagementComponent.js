'use client'
import React, { useEffect, useState } from 'react'
import { hideLoader, showLoader } from '../lib/common'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Editor from '../lib/Editor';
import { adminPrivacyPolicyApi } from '../lib/apiService';
import { ToastContainer, toast } from 'react-toastify';

export default function PrivacypolicyManagementComponent() {
    const [editorLoaded, setEditorLoaded] = useState(false);


    const [sellerdata, setSellerData] = useState("");
    const [sellerdataerror, setSellerDataError] = useState(false);


    const [consumerdata, setConsumerData] = useState("");
    const [consumerdataerror, setConsumerDataError] = useState(false);

    useEffect(() => {
        setEditorLoaded(true);
        getsellerdata()
        getconsumerdata()
    }, []);

    const addsellerdata = async () => {
        let err = 0
        setSellerDataError(false)
        if (!sellerdata) {
            setSellerDataError(true)
            err++
        }
        if (err == 0) {
            showLoader()
            let data = {
                usertype: "0",
                htmlcode: sellerdata,
                addprivacypolicy: true
            }
            let response = await adminPrivacyPolicyApi(data)
            if (response.success) {
                onMessage(response.message, true, true)
                hideLoader()
            } else {
                onMessage(response.message, false, true)
                hideLoader()
            }
        }
    }

    const addconsumerdata = async () => {
        let err = 0
        setConsumerDataError(false)
        if (!consumerdata) {
            setConsumerDataError(true)
            err++
        }
        if (err == 0) {
            showLoader()
            let data = {
                usertype: "1",
                htmlcode: consumerdata,
                addprivacypolicy: true
            }
            let response = await adminPrivacyPolicyApi(data)
            if (response.success) {
                onMessage(response.message, true, false)
                hideLoader()
            } else {
                onMessage(response.message, false, false)
                hideLoader()
            }
        }
    }

    const onMessage = async (mes, sus, lst) => {
        if (sus) {
            toast.success(mes)
            if (lst) {
                getsellerdata()
            }else{
                getconsumerdata()
            }
        } else {
            toast.error(mes)
            if (lst) {
                getsellerdata()
            }else{
                getconsumerdata()
            }
        }
    }

    const getconsumerdata = async () => {
        showLoader()
        let data = { usertype: "1", getprivacypolicy: true }
        let response = await adminPrivacyPolicyApi(data)
        if (response.success) {
            let { result } = response
            hideLoader()
            setConsumerData(result.htmlcode)
        } else {
            hideLoader()
            setConsumerData('')
        }
    }

    const getsellerdata = async () => {
        showLoader()
        let data = { usertype: "0", getprivacypolicy: true }
        let response = await adminPrivacyPolicyApi(data)
        if (response.success) {
            let { result } = response
            hideLoader()
            setSellerData(result.htmlcode)
        } else {
            hideLoader()
            setSellerData('')
        }
    }

    return (
        <div className="main-das-page">

            <div className="heading mb-3">
                <h3 className='text-blue'>Privacy Policy Management</h3>
            </div>
            <div>
                <Tabs
                    defaultActiveKey="Seller"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="Seller" title="Seller">
                        <Editor
                            name="description"
                            onChange={(data) => {
                                setSellerData(data);
                            }}
                            editorLoaded={editorLoaded}
                            value={sellerdata}
                        />
                        {
                            sellerdataerror && !sellerdata && <div className='input-error'>Please enter privacy policy</div>
                        }
                        {
                            editorLoaded &&
                            <button onClick={() => { addsellerdata() }} className='btn down_btn my-3'>Save</button>
                        }
                        {/* {JSON.stringify(data)} */}
                    </Tab>
                    <Tab eventKey="Consumer" title="Consumer">
                        <Editor
                            name="description"
                            onChange={(data) => {
                                setConsumerData(data);
                            }}
                            editorLoaded={editorLoaded}
                            value={consumerdata}
                        />
                        {
                            consumerdataerror && !consumerdata && <div className='input-error'>Please enter privacy policy</div>
                        }
                        {
                            editorLoaded &&
                            <button onClick={() => { addconsumerdata() }} className='btn down_btn my-3'>Save</button>
                        }
                    </Tab>
                </Tabs>
            </div>
            <ToastContainer />

        </div>
    )
}

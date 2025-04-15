'use client'
import { ToastContainer, toast } from 'react-toastify';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { getLocalStorageData, getPassData, hideLoader, showLoader } from '../lib/common';
import { adminForgotPasswordApi } from '../lib/apiService';

import Image from 'next/image'

export default function ForgortPasswordComponent() {

    const mailformat = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$";
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false)
    const [validEmailError, setValidEmailError] = useState(false)
    const router = useRouter();

    const [issuccess, setSuccess] = useState(true)
    const [ismessage, setMessage] = useState('')



    useEffect(() => {
        if (getLocalStorageData("admin") === null) {
            router.push("/admin/forgotpassword");
            if(getPassData()){
                toast.error(getPassData())
            }
            hideLoader()
        } else {
            router.push("/admin/account");
        }
    }, [])

    const handleSubmit = async () => {
        let err = 0;
        setError(false)
        setValidEmailError(false)


        if (!email) {
            setError(true)
            err++
        }
        if (!email.match(mailformat)) {
            setValidEmailError(true)
            err++
        }
        if (err == 0) {
            showLoader()
            let data = { email: email }
            let response = await adminForgotPasswordApi(data)
            if (response.success) {
                setSuccess(false)
                toast.success("Email successfully send!")
                setMessage(response.message)
                setEmail('')
                hideLoader()
            } else {
                hideLoader()
                setSuccess(true)
                toast.error(response.message)
            }

        }
    }

    const goto = (path) => {
        showLoader()
        router.push(path);
    }



    return (
        <>

            {
                issuccess ?
                    <>
                        <div className="login-wrapper">
                            <div className="d-flex justify-content-center mb-5">
                                <Image
                                    src="/assets/img/srutle-logo.png"
                                    alt="Picture of the author"
                                    width={200}
                                    height={200}
                                    className="d-block mx-auto"
                                />
                            </div>
                            <div className="container-login p-0">
                                <div className="col-left">
                                    <div className="login-text">
                                        <h2>Welcome to Strutle</h2>
                                        <p>&nbsp;</p>
                                        <a className="btn" onClick={() => { goto("/admin") }}>Login</a>
                                    </div>
                                </div>
                                <div className="col-right">
                                    <div className="login-form">
                                        <h2>Forgot Password</h2>
                                        <p>
                                            <label>Email ID<span>*</span></label>
                                            <input
                                                type="text"
                                                value={email}
                                                onChange={(e) => { setEmail(e.target.value) }}
                                                className={`${error && !email ? "error-txt" : ""} ${validEmailError && !error && email ? "error-txt" : ""}`}

                                            />
                                        </p>
                                        {
                                            error && !email && <div className='input-error'>Please enter email</div>
                                        }
                                        {
                                            validEmailError && !error && email && <div className='input-error'>Please enter valid email</div>
                                        }
                                        <div className="for-sign">
                                            <label></label>
                                            <button onClick={() => { handleSubmit() }} > Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>
                    :
                    <>
                        <div className='send-email'>      
                            <div className='send-email-sceess'>
                                <Image
                                    src={"/assets/img/emailsend.png"}
                                    width={800}
                                    height={500}
                                    alt='email send'
                                />
                            </div>
                            <div className='send-email-sceess'>
                                <Image
                                    src={"/assets/img/tik.jpg"}
                                    width={80}
                                    height={30}
                                    alt='email send'
                                />
                                <div className='send-email-sceess-txt'>
                                    <h3>{ismessage}</h3>
                                </div>
                            </div>
                            <div className='send-email-sceess'>
                                <button className="btn down_btn mx-auto" onClick={()=>{goto("/admin")}}>Back to Login</button>
                            </div>
                        </div>
                    </>
            }



            <ToastContainer />

        </>
    )
}

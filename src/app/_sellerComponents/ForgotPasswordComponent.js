'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { getLocalStorageData, getPassData, hideLoader, removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common'
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { sellerForgotPasswordApi } from '../lib/apiService';

export default function ForgotPasswordComponent() {
    const router = useRouter();
    const mailformat = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$";
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false)
    const [validEmailError, setValidEmailError] = useState(false)

    const [issuccess, setSuccess] = useState(true)
    const [ismessage, setMessage] = useState('')

    useEffect(() => {
        if (!getLocalStorageData("seller")) {
            router.push("/seller/forgotpassword");
            if (getPassData()) {
                toast.error(getPassData())
            }
            hideLoader()
        } else {
            router.push("/seller/account");
        }
    }, [])
    const goto = (path) => {
        showLoader()
        router.push("/seller" + path)
        removeLocalStorageData("pathName")
        setLocalStorageData('pathName', path)
    }
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
            let response = await sellerForgotPasswordApi(data)
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
    return (
        <>
            {
                issuccess ?
                    <>
                        <div className="wrap seller">
                            <div className="forgot-container">
                                <div className="forgot-header">
                                    <span className="d-block"><Image className='log-logo-img' src={"/assets/seller-img/srutle-logo.png"} width={250} height={100} alt='login' /></span>
                                    <h1 className="my-4">Forgot Password</h1>
                                    <p>Enter your email and we'll send you a link to reset your password.</p>
                                </div>

                                <div className="success-message" id="successMessage">
                                    <i className="fas fa-check-circle"></i> Password reset link has been sent to your email!
                                </div>

                                <div id="forgotForm">
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="Enter your registered email"
                                            value={email}
                                            onChange={(e) => { setEmail(e.target.value) }}
                                            className={`${error && !email ? "error-txt" : ""} ${validEmailError && !error && email ? "error-txt" : ""}`}

                                        />
                                        {
                                            error && !email && <div className='input-error'>Please enter email</div>
                                        }
                                        {
                                            validEmailError && !error && email && <div className='input-error'>Please enter valid email</div>
                                        }
                                    </div>

                                    <button type="submit" className="submit-button" onClick={() => { handleSubmit() }}>Send Reset Link</button>
                                </div>
                                <div className="back-to-login">
                                    Remember your password?
                                    <a className='text-blue mx-2' onClick={() => { goto('/') }}>Back to login</a>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className='send-email'>
                            <div className='send-email-sceess my-4'>
                             <Image className='log-logo-img m-auto' src={"/assets/seller-img/srutle-logo.png"} width={350} height={100} alt='login' />
                            </div>
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
                                <button className="btn down_btn mx-auto" onClick={() => { router.push("/seller") }}>Back to Login</button>
                            </div>
                        </div>
                    </>
            }
            <ToastContainer />
        </>
    )
}

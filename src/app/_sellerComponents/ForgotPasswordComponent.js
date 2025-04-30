'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { hideLoader, removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common'
import { useRouter } from 'next/navigation';

export default function ForgotPasswordComponent() {
    const router = useRouter();
    useEffect(() => {
        hideLoader()
    }, [])
    const goto = (path) => {
        showLoader()
        router.push("/seller" + path)
        removeLocalStorageData("pathName")
        setLocalStorageData('pathName', path)
    }
    return (
        <>
            <div className="wrap">
                <div className="forgot-container">
                    <div className="forgot-header">
                        <span className="d-block"><Image className='log-logo-img' src={"/assets/seller-img/srutle-logo.png"} width={250} height={100} alt='login' /></span>
                        <h1 className="my-4">Forgot Password?</h1>
                        <p>Enter your email address and we'll send you a link to reset your password.</p>
                    </div>

                    <div className="success-message" id="successMessage">
                        <i className="fas fa-check-circle"></i> Password reset link has been sent to your email!
                    </div>

                    <div id="forgotForm">
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" placeholder="Enter your registered email" />
                        </div>

                        <button type="submit" className="submit-button">Send Reset Link</button>
                    </div>
                    <div className="back-to-login">
                        Remember your password? 
                        <a className='text-blue' onClick={() => { goto('/') }}> 
                            <i className="bi bi-arrow-left-short"></i> Back to
                            login</a>
                    </div>
                </div>
            </div>
        </>
    )
}

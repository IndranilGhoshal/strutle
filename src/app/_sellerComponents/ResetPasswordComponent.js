'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { getLocalStorageData, hideLoader, removeLocalStorageData, setLocalStorageData, setPassData, showLoader } from '../lib/common';
import Image from 'next/image';
import { sellerResetPasswordApi } from '../lib/apiService';
import { toast, ToastContainer } from 'react-toastify';

export default function ResetPasswordComponent({ id, expTime }) {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [error, setError] = useState(false)
    const [passwordType, setPasswordType] = useState('password');
    const [confirmPasswordType, setConfirmPasswordType] = useState('password');
    useEffect(() => {
        if (!getLocalStorageData("seller") && id) {
            router.push("/seller/resetpassword/" + id);
            hideLoader()
        }else if(!getLocalStorageData("seller") && !id){
            router.push("/seller/forgotpassword");
        }
        else {
            router.push("/seller/account");
        }
        let now = new Date().getTime();
        if (expTime < now) {
            setPassData("The link has already expired.")
            router.push("/seller/forgotpassword");
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
        setValidPassword(false)
        if (!confirmPassword || !password) {
            setError(true)
            err++
        }
        if (confirmPassword !== password) {
            setValidPassword(true)
            err++
        }
        if (err == 0) {
            showLoader()
            let data = { id, password, accountreset: true }
            let response = await sellerResetPasswordApi(data)
            if (response.success) {
                setPassData(response.message)
                router.push("/seller");
            } else {
                hideLoader()
                toast.error(response.message)
            }
        }
    }
    return (
        <>
            <div className="wrap seller">
                <div className="forgot-container">
                    <div className="forgot-header">
                        <span className="d-block"><Image className='log-logo-img' src={"/assets/seller-img/srutle-logo.png"} width={250} height={100} alt='login' /></span>
                        <h1 className="my-4">Reset Password</h1>
                    </div>
                    <div className="success-message" id="successMessage">
                        <i className="fas fa-check-circle"></i> Password reset link has been sent to your email!
                    </div>
                    <div id="forgotForm">
                        <div className="form-group">
                            <label htmlFor="password">New Password</label>
                            <input
                                type={passwordType}
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                placeholder="Enter your password"
                                className={`${error && !password ? "error-txt" : ""}`}
                            />
                            {
                                passwordType === 'password'
                                    ?
                                    <>
                                        <i onClick={() => { setPasswordType("text") }} className="bi bi bi-eye password-toggle"></i>
                                    </>
                                    :
                                    <>
                                        <i onClick={() => { setPasswordType("password") }} className="bi bi bi-eye-slash password-toggle"></i>
                                    </>
                            }
                            {
                                error && !password && <div className='input-error'>Please enter new password</div>
                            }
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Confirm Password</label>
                            <input
                                type={confirmPasswordType}
                                value={confirmPassword}
                                onChange={(e) => { setConfirmPassword(e.target.value) }}
                                placeholder="Enter your confirm password"
                                className={`${error && !confirmPassword ? "error-txt" : ""}`}
                            />
                            {
                                confirmPasswordType === 'password'
                                    ?
                                    <>
                                        <i onClick={() => { setConfirmPasswordType("text") }} className="bi bi bi-eye password-toggle"></i>
                                    </>
                                    :
                                    <>
                                        <i onClick={() => { setConfirmPasswordType("password") }} className="bi bi bi-eye-slash password-toggle"></i>
                                    </>
                            }
                            {
                                error && !confirmPassword && <div className='input-error'>Please enter password</div>
                            }
                            {
                                validPassword && !error && password && confirmPassword && <div className='input-error'>Password mismatch</div>
                            }
                        </div>

                        <button type="submit" className="submit-button" onClick={() => { handleSubmit() }}>Reset Password</button>
                    </div>
                    <div className="back-to-login">
                        Remember your password?
                        <a className='text-blue mx-2' onClick={() => { goto('/') }}>
                            Back to login</a>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

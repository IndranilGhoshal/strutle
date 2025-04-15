'use client'
import { ToastContainer, toast } from 'react-toastify';
import React, { useEffect, useState } from 'react'
import { adminResetPasswordApi } from '../lib/apiService';
import { getLocalStorageData, hideLoader, setPassData, showLoader } from '../lib/common';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ResetPasswordComponent({ id, expTime }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [error, setError] = useState(false)
    const [passwordType, setPasswordType] = useState('password');
    const [confirmPasswordType, setConfirmPasswordType] = useState('password');

    const router = useRouter();

    useEffect(() => {
        if (getLocalStorageData("admin") === null) {
            router.push("/admin/resetPassword/" + id);
            hideLoader()
        } else {
            router.push("/admin/account");
        }
        let now = new Date().getTime();
        if (expTime < now) {
            setPassData("The link has already expired.")
            router.push("/admin/forgotpassword");
        }
    }, [])



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
            let data = { id, password, accountreset:false }
            let response = await adminResetPasswordApi(data)
            if (response.success) {
                setPassData(response.message)
                router.push("/admin");
            } else {
                hideLoader()
                toast.error(response.message)
            }
        }
    }


    return (
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
                        </div>
                    </div>
                    <div className="col-right">
                        <div className="login-form">
                            <h2>Reset Password</h2>
                                <p className="position-relative">
                                    <label>Enter Password<span>*</span></label>
                                    <input
                                        type={passwordType}
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                    />
                                    {
                                        passwordType === 'password'
                                            ?
                                            <>
                                                <button className="btn btn-vw" onClick={() => { setPasswordType("text") }}><i className="bi bi-eye-slash-fill"></i></button>
                                            </>
                                            :
                                            <>
                                                <button className="btn btn-vw" onClick={() => { setPasswordType("password") }}><i className="bi bi-eye-fill"></i></button>
                                            </>
                                    }
                                </p>
                                {
                                    error && !password && <div className='input-error'>Please enter password</div>
                                }
                                <p className="position-relative">
                                    <label>Confirm Password<span>*</span></label>
                                    <input
                                        type={confirmPasswordType}
                                        value={confirmPassword}
                                        onChange={(e) => { setConfirmPassword(e.target.value) }}
                                    />
                                    {
                                        confirmPasswordType === 'password'
                                            ?
                                            <>
                                                <button className="btn btn-vw" onClick={() => { setConfirmPasswordType("text") }}><i className="bi bi-eye-slash-fill"></i></button>
                                            </>
                                            :
                                            <>
                                                <button className="btn btn-vw" onClick={() => { setConfirmPasswordType("password") }}><i className="bi bi-eye-fill"></i></button>
                                            </>
                                    }
                                </p>
                                {
                                    error && !confirmPassword && <div className='input-error'>Please enter confirm password</div>
                                }
                                {
                                    validPassword && !error && password && confirmPassword && <div className='input-error'>Password mismatch</div>
                                }
                                <div className="for-sign">
                                    <label></label>
                                    <button onClick={() => { handleSubmit() }}>Submit</button>
                                </div>

                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

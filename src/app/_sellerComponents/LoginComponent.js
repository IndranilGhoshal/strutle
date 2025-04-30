'use client'
import React, { useEffect, useState } from 'react'
import { getLocalStorageData, getPassData, hideLoader, removeLocalStorageData, setLocalStorageData, setPassData, showLoader } from '../lib/common'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { sellerloginapi } from '../lib/apiService'
import { toast, ToastContainer } from 'react-toastify'

export default function LoginComponent() {
    const router = useRouter();
    const searchparams = useSearchParams();
    const search = searchparams.get('session')
    const [loading, setLoading] = useState(false)
    const mailformat = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$";
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false)
    const [validEmailError, setValidEmailError] = useState(false)

    const [passwordType, setPasswordType] = useState('password');



    useEffect(() => {
        if (getLocalStorageData('admin')?.id) {
            router.push("/seller/account");
        } else {
            if (search == "error") {
                toast.error("Session is expire")
            }
            router.push("/seller");
            if (getPassData()) {
                toast.success(getPassData())
                setPassData('')
            }
            setLoading(true)
            hideLoader()
        }
    }, [])

    const handleLogin = async () => {
        let err = 0;
        setError(false)
        setValidEmailError(false)
        if (!email || !password) {
            setError(true)
            err++
        }
        if (!email.match(mailformat)) {
            setValidEmailError(true)
            err++
        }
        if (err == 0) {
            showLoader()
            let data = { email, password }
            let response = await sellerloginapi(data)
            if (response.success) {
                const { result } = response;
                removeLocalStorageData("pathName")
                setLocalStorageData("seller", result)
                router.push("/seller/account");
                setPassData(response.message)
            } else {
                hideLoader()
                toast.error(response.message)
            }
        }
    }

    return (
        <>
            {
                loading ?
                    <div className="wrap seller">
                        <div className="login-container">
                            <div className="login-header">
                                <span className="d-block cp" onClick={() => { router.push("/"); removeLocalStorageData("pathName"); setLocalStorageData('pathName', "/") }}><Image className='log-logo-img' src={"/assets/seller-img/srutle-logo.png"} width={250} height={100} alt='login' /></span>
                                <h1 className="my-4">Seller Login</h1>
                                <p>Access your dashboard to manage your products and orders</p>
                            </div>
                            <div>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your email"
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

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
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
                                        error && !password && <div className='input-error'>Please enter password</div>
                                    }
                                </div>

                                <button type="submit" className="login-button" onClick={() => { handleLogin() }}>Login</button>

                                <div className="forgot-password cp">
                                    <a className='text-blue' onClick={() => { goto('/forgotpassword') }}>Forgot your password?</a>
                                </div>
                            </div>
                            <div className="register-link">
                                Don't have an account? <a href="seller-signup.html">Register as seller <i className="bi bi-arrow-right-short"></i> </a>
                            </div>
                        </div>
                    </div>
                    :
                    <></>
            }
            <ToastContainer />
        </>
    )
}

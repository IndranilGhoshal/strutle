'use client'
import React, { useEffect, useState } from 'react'
import { adminEvent, adminLoginApi } from '../lib/apiService';
import { getLocalStorageData, getPassData, hideLoader, removeLocalStorageData, setLocalStorageData, setPassData, showLoader } from '../lib/common';
import { useRouter, useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image';


export default function LoginComponent() {
    const searchparams = useSearchParams();
    const mailformat = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$";
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false)
    const [validEmailError, setValidEmailError] = useState(false)
    const router = useRouter();
    const [passwordType, setPasswordType] = useState('password');
    const search = searchparams.get('session')
    const [isRemembered, setIsRemembered] = useState(false);

    useEffect(() => {
        if (getLocalStorageData('admin')?.isfirstlogin == "1") {
            router.push("/admin/account");
        } else if (getLocalStorageData('admin')?.isfirstlogin == "0") {
            router.push("/admin/accountpassword");
        } else {
            if(search == "error"){
                toast.error("Session is expire")
            }
            router.push("/admin");
            if (getPassData()) {
                toast.success(getPassData())
                setPassData('')
            }
            if(getLocalStorageData('isRemembered')){
                setEmail(getLocalStorageData('email'))
                setPassword(getLocalStorageData('password'))
                setIsRemembered(getLocalStorageData('isRemembered'))
            }
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
            let response = await adminLoginApi(data)
            if (response.success) {
                const { result } = response;
                delete result.password;
                setLocalStorageData("admin", result)
                let logResp = await adminEvent("Login")
                if (logResp.success) {
                    router.push("/admin/accountpassword");
                    setPassData(response.message)
                } else {
                    removeLocalStorageData("admin")
                    toast.error(logResp.message)
                }
            } else {
                hideLoader()
                toast.error(response.message)
            }
        }
    }

    const goto = (path) => {
        showLoader()
        router.push(path);
    }

    const setremember = () =>{
        setError(false)
        if(!isRemembered){
            if (!email || !password) {
                setError(true)
                return false
            }
            setIsRemembered(true)
            setLocalStorageData('isRemembered',true)
            setLocalStorageData('email',email)
            setLocalStorageData('password',password)
        }else{
            setIsRemembered(false)
            removeLocalStorageData('isRemembered')
            removeLocalStorageData('email')
            removeLocalStorageData('password')
        }
    }

    return (
        <>
            <div className="login-wrapper">
                <div className="d-flex justify-content-center mb-5">
                    <Image className="d-block mx-auto" src={"/assets/img/srutle-logo.png"} width={250} height={100} alt='login' />
                </div>
                <div className="container-login p-0">
                    <div className="col-left">
                        <div className="login-text">
                            <h2>Welcome to Strutle <br />Admin Login</h2>
                        </div>
                    </div>
                    <div className="col-right">
                        <div className="login-form">
                            <h2>Login</h2>
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

                            <p className="position-relative">
                                <label>Password<span>*</span></label>
                                <input
                                    type={passwordType}
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    className={`${error && !password ? "error-txt" : ""}`}
                                />
                                {
                                    passwordType === 'password'
                                        ?
                                        <>
                                            <button className="btn btn-vw" onClick={() => { setPasswordType("text") }}><i className="bi bi-eye-fill"></i></button>
                                        </>
                                        :
                                        <>
                                            <button className="btn btn-vw" onClick={() => { setPasswordType("password") }}><i className="bi bi-eye-slash-fill"></i></button>
                                        </>
                                }
                            </p>
                            {
                                error && !password && <div className='input-error'>Please enter password</div>
                            }
                            <p className='inp_rem'><input type='checkbox' checked={isRemembered} value={isRemembered} onChange={()=>{setremember()}} /> <a>Reminder Me</a></p>
                            <div className="for-sign">
                                <a onClick={() => { goto("/admin/forgotpassword") }}>Forgot Password?</a>
                                <button onClick={() => { handleLogin() }} > Sign In</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

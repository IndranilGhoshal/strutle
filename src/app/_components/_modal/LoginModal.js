"use client"
import { AppContext } from '@/app/consumer/layout';
import { cartapi, consumerloginapi, consumersignupApi, shippingaddressapi } from '@/app/lib/apiService';
import { getLocalStorageData, hideLoader, removeLocalStorageData, setLocalStorageData, showLoader } from '@/app/lib/common';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useRef, useEffect, useState, useContext } from 'react'
import { Modal } from 'react-bootstrap';
import OtpInput from "react-otp-input";

export default function LoginModal({ onMessage, setUser }) {
    const { setUserImage, setCartCount, setDeliveryAddress, setPincodeAddress, setusername } = useContext(AppContext);
    useEffect(() => {
        clearTimer(getDeadTime());
    }, [])
    const Ref = useRef(null);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const router = useRouter();


    const [otpdiv, setotpdiv] = useState(false)
    const [phone, setPhone] = useState('')
    const [error, setError] = useState(false)

    const [otp, setOtp] = useState('');

    const [timer, setTimer] = useState('00:00');

    const handleChange = (otp) => setOtp(otp);

    const handleClose = () => {
        setError(false)
        setShow(false)
        setotpdiv(false)
        setPhone('')
        setOtp('')
    }

    const getOtpEvent = async () => {
        let err = 0;
        setError(false)
        if (!phone) {
            setError(true)
            err++
        }
        if (err == 0) {
            showLoader()
            let response = await consumerloginapi({ phone })
            if (response.success) {
                hideLoader()
                onMessage(response.message, true)
                setotpdiv(true)
                setTimeout(() => {
                    clearTimer(getDeadTime());
                }, 500);
            } else {
                hideLoader()
                onMessage(response.message, false)
            }
        }
    }

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        return {
            total, minutes, seconds
        };
    }

    const startTimer = (e) => {
        let { total, minutes, seconds }
            = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }

    const clearTimer = (e) => {
        setTimer('05:00');
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 300);
        return deadline;
    }

    const reotpsent = async () => {
        showLoader()
        let response = await consumerloginapi({ phone, reotpsend: true })
        if (response.success) {
            hideLoader()
            onMessage(response.message, true)
            setTimeout(() => {
                clearTimer(getDeadTime());
            }, 500);
        } else {
            hideLoader()
            onMessage(response.message, false)
        }
    }

    const sentOtp = async () => {
        let err = 0
        setError(false)
        if (!otp) {
            setError(true)
            err++
        }
        if (otp && otp.length < 6) {
            setError(true)
            err++
        }
        if (err == 0) {
            showLoader()
            let response = await consumerloginapi({ otp, otpsend: true })
            if (response.success) {
                const { result } = response;
                delete result.password;
                setUserImage(result.image)
                setusername(result.firstname)
                setLocalStorageData("consumer", result)
                setUser(result)
                setotpdiv(true)
                handleClose()
                setTimer('00:00')
                getcartdata()
                getdeliverydata()
                onMessage(response.message, true)
                hideLoader()
            } else {
                hideLoader()
                onMessage(response.message, false)
            }
        }
    }

    const getcartdata = async () => {
        let response = await cartapi({ mstconsumerid: getLocalStorageData('consumer')?._id, cartcount: true })
        if (response.success) {
            setCartCount(response.result)
        } else {
            setCartCount(0)
        }
    }

    const phoneChange = async () => {
        showLoader()
        let response = await consumerloginapi({ phone, otpexpired: true })
        if (response.success) {
            hideLoader()
            setPhone('')
            setotpdiv(false)
            setTimer('00:00')
        } else {
            hideLoader()
            onMessage(response.message, false)
            setotpdiv(true)
        }
    }

    const getdeliverydata = async () => {
        let response = await shippingaddressapi({ mstconsumerid: getLocalStorageData('consumer')?._id, addresslist: true })
        if (response.success) {
            let { result } = response;
            for (let r of result) {
                if (r.isdefault) {
                    setPincodeAddress(r.pincode)
                    setDeliveryAddress(r.district)
                }
            }
        } else {
            setPincodeAddress('')
            setDeliveryAddress('')
        }
    }

    const goto = (path) => {
        router.push("/consumer" + path)
        removeLocalStorageData("pathName")
        setLocalStorageData('pathName', path)
        handleClose()
    }




    return (
        <>
            <a id="loginbutton" className="signin" onClick={handleShow}>Sign in</a>
            <Modal
                show={show}
                backdrop="static"
                keyboard={false}
                onHide={handleClose}
                size='lg'
            >
                <Modal.Body style={{ padding: 0 }}>
                    <div className="login-mod">
                        <div className="login-mod-left">
                            <h3>Get access to your Orders, Wishlist and Recommendations</h3>
                            <Image src={"/assets/img/login-img.png"} alt='lgimg' width={1000} height={100} />
                        </div>
                        {
                            !otpdiv ?
                                <div className="login-mod-right">
                                    <button type="button" className="close-button" data-bs-dismiss="modal" aria-label="Close" onClick={() => { setShow(false); setotpdiv(false) }}><i className="bi bi-x-lg"></i></button>
                                    <h3>Login using mobile</h3>
                                    <p className="log-mesg">Enter the 10-digit mobile number and verify with OTP.</p>
                                    <div className="enter-num">
                                        <select className="form-select">
                                            <option>+91</option>
                                        </select>
                                        <input
                                            className={`form-control `}
                                            type="text"
                                            placeholder="Enter Mobile Number"
                                            value={phone}
                                            onChange={(e) => { setPhone(e.target.value) }}
                                        />

                                    </div>
                                    {
                                        error && !phone && <div className='input-error'>Please enter mobile no.</div>
                                    }
                                    <button className="btn btn-sent" onClick={() => { getOtpEvent() }}>Sent OTP</button>
                                    <p className="trm-cond">By signing in, I agree to <a onClick={()=>{goto('/termsconditions')}}>Terms & Conditions</a>, and
                                        <a onClick={()=>{goto('/privacypolicy')}}> Privacy Policy</a></p>
                                </div>
                                :
                                <div className="login-mod-right">
                                    <button type="button" className="close-button" data-bs-dismiss="modal" aria-label="Close" onClick={() => { setShow(false); setotpdiv(false) }}><i className="bi bi-x-lg"></i></button>
                                    <h3>Verify OTP</h3>
                                    <p className="log-mesg">Enter the six digit OTP sent to +91-{phone} <button className="btn btn-change" onClick={() => { phoneChange() }}>Change</button></p>
                                    <div className="otp-div">
                                        <OtpInput
                                            value={otp}
                                            onChange={handleChange}
                                            numInputs={6}
                                            separator={<span style={{ width: "8px" }}></span>}
                                            isInputNum={true}
                                            shouldAutoFocus={true}
                                            inputType={'number'}
                                            renderInput={(props) => <input {...props} />}
                                            inputStyle={{
                                                border: "1px solid #b6b6b6",
                                                borderRadius: "8px",
                                                width: "50px",
                                                height: "50px",
                                                fontSize: "16px",
                                                color: "#000",
                                                fontWeight: "400",
                                                // caretColor: "blue",
                                                marginRight: "5px"
                                            }}
                                            focusStyle={{
                                                border: "1px solid #CFD3DB",
                                                outline: "none"
                                            }}
                                        />
                                    </div>
                                    {
                                        error && !phone && <div className='input-error'>Please enter otp.</div>
                                    }
                                    {
                                        error && phone && <div className='input-error'>Please enter valid otp.</div>
                                    }
                                    <button className="btn btn-sent" onClick={() => { sentOtp() }}>Verify OTP</button>
                                    <div className="verfy-otp-msg">
                                        <span>{timer}</span>
                                        {
                                            timer == '00:00' ?
                                                <p className="ddnt-rcv-cod">Didn’t received your code? <a onClick={() => { reotpsent() }}>Resend code</a></p>
                                                :
                                                <></>
                                        }
                                    </div>
                                    <p className="trm-cond">By signing in, I agree to <a onClick={()=>{goto('/termsconditions')}}>Terms & Conditions</a>, and
                                        <a onClick={()=>{goto('/privacypolicy')}}> Privacy Policy</a></p>
                                </div>
                        }
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

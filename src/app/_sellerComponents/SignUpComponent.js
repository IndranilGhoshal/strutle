'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { hideLoader, removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common'
import { getGstinInfo, isValidGstinPattern } from 'minute-designs-hsn-code'
import BusinessTypeAutocompleteSearch from './_autocomplete/BusinessTypeAutocompleteSearch'
import { getifscapi, pincodeapi, sellersignupapi } from '../lib/apiService'
import { useRouter } from 'next/navigation'
import OtpInput from 'react-otp-input';
import { toast, ToastContainer } from 'react-toastify'
import { Modal } from 'react-bootstrap'

export default function SignUpComponent() {


    const [isload, setisload] = useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const router = useRouter();
    const Ref = useRef(null);

    const [tab, settab] = useState(true)

    useEffect(() => {
        clearTimer(getDeadTime());
    }, [])


    const goto = (path) => {
        showLoader()
        router.push("/seller" + path)
        removeLocalStorageData("pathName")
        setLocalStorageData('pathName', path)
    }


    //Setp 1
    const inputInvalidChars = ['-', '+', '.', ' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const mailformat = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";
    const passwordformat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{8,}$/

    const [phone, setphone] = useState('')
    const [phoneerror, setphoneerror] = useState(false)
    const [phonevaliderror, setphonevaliderror] = useState(false)

    const [otp, setotp] = useState('')
    const [otperror, setotperror] = useState(false)
    const [otpvaliderror, setotpvaliderror] = useState(false)

    const [otpvarify, setotpverify] = useState(false)
    const [otpsend, setotpsend] = useState(false)

    const [whatsapp, setwhatsapp] = useState(false)
    const [terms, setterms] = useState(false)

    const [timer, setTimer] = useState('00:00');

    const [error, seterror] = useState(false)
    const [validemailerror, setvalidemailerror] = useState(false)
    const [validpassworderror, setvalidpassworderror] = useState(false)
    const [validpasswordiconerror, setvalidpasswordiconerror] = useState(false)

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [passwordtype, setpasswordtype] = useState('password')




    //Step 2

    const [step1, setstep1] = useState('0')
    const [step2, setstep2] = useState('0')
    const [step3, setstep3] = useState('0')
    const [step4, setstep4] = useState('0')
    const [step5, setstep5] = useState('0')

    const [step1disabled, setstep1disabled] = useState(true)
    const [step2disabled, setstep2disabled] = useState(true)
    const [step3disabled, setstep3disabled] = useState(true)
    const [step4disabled, setstep4disabled] = useState(true)
    const [step5disabled, setstep5disabled] = useState(true)

    //Tax Details
    const [taxerror, settaxerror] = useState(false)
    const [taxvaliderror, settaxvaliderror] = useState(false)
    const [taxinvaliderror, settaxinvaliderror] = useState(false)

    const [taxdiv, settaxdiv] = useState(false)
    const [gstindiv, setgstindiv] = useState(false)
    const [enroldiv, setenroldiv] = useState(false)
    const [enrolmentno, setenrolmentno] = useState('')
    const [gstinno, setgstinno] = useState('')


    //Business Details
    const [businessname, setbusinessname] = useState('')
    const [panno, setpanno] = useState('')
    const [businesstype, setbusinesstype] = useState('')
    const [addressone, setaddressone] = useState('')
    const [addresstwo, setaddresstwo] = useState('')
    const [city, setcity] = useState('')
    const [pin, setpin] = useState('')
    const [postoffice, setPostOffice] = useState('')
    const [state, setstate] = useState('')
    const [landmark, setlandmark] = useState('')

    const [businessdetailserror, setBusinessdetailserror] = useState(false)
    const [errorPinCode, setErrorPinCode] = useState(false)
    const [errorValidPinCode, setValidErrorPinCode] = useState(false)
    const [postofficearray, setPostOfficeArray] = useState([])


    // Pickup Address
    const [isaddress, setIsaddress] = useState(true)

    const [pickupaddressone, setPickupaddressone] = useState('')
    const [pickupaddresstwo, setPickupaddresstwo] = useState('')
    const [pickupcity, setPickupcity] = useState('')
    const [pickuppin, setPickuppin] = useState('')
    const [pickuppostoffice, setPickupPostOffice] = useState('')
    const [pickupstate, setPickupstate] = useState('')
    const [pickuplandmark, setPickuplandmark] = useState('')


    //Bank Details
    const [bankdiv, setbankdiv] = useState(false)

    const [bankname, setbankname] = useState('')
    const [bankaccountnumber, setbankaccountnumber] = useState('')
    const [confirmbankaccountnumber, setconfirmbankaccountnumber] = useState('')
    const [ifscCode, setifscCode] = useState('')

    const [bankdetailserror, setbankdetailserror] = useState(false)
    const [bankaccountnoerror, setbankaccountnoerror] = useState(false)
    const [ifscCodeerror, setifscCodeerror] = useState(false)


    // Seller Details
    const [name, setname] = useState('')
    const [sellerdetailserror, setsellerdetailserror] = useState(false)


    useEffect(() => {
        setisload(true)
        hideLoader()
    }, [])


    //Step 1
    const handleChange = (otp) => setotp(otp);

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
        let response = await sellersignupapi({ phone, resendotp: true })
        if (response.success) {
            hideLoader()
            toast.success(response.message)
            setTimeout(() => {
                clearTimer(getDeadTime());
            }, 500);
        } else {
            hideLoader()
            toast.error(response.message)
        }
    }

    const sendotp = async () => {
        let err = 0
        setphoneerror(false)
        setphonevaliderror(false)
        if (!phone) {
            setphoneerror(true)
            err++
        }
        if (err == 0) {
            showLoader()
            let response = await sellersignupapi({ phone: phone, sendotp: true })
            if (response.success) {
                setotpsend(true)
                toast.success(response.message)
                hideLoader()
            } else {
                if (response.statuscode == "302") {
                    setphonevaliderror(true)
                } else {
                    toast.error(response.message)
                }
                hideLoader()
            }
        }
    }

    const verifyotp = async () => {
        let err = 0
        setotperror(false)
        setotpvaliderror(false)
        if (!otp) {
            setotperror(true)
            err++
        }
        if (err == 0) {
            showLoader()
            let response = await sellersignupapi({ phone: phone, otp: otp, verfyotp: true })
            if (response.success) {
                setterms(true)
                setotpverify(true)
                setTimeout(() => {
                    clearTimer(getDeadTime());
                }, 500);
                toast.success(response.message)
                hideLoader()
            } else {
                if (response.statuscode == "204") {
                    setotpvaliderror(true)
                } else {
                    toast.error(response.message)
                }
                hideLoader()
            }
        }
    }

    const gotonexttab = () => {
        let err = 0
        seterror(false)
        setvalidemailerror(false)
        setvalidpassworderror(false)
        if (!email || !password) {
            seterror(true)
            err++
        }
        if (!email.match(mailformat)) {
            setvalidemailerror(true)
            err++
        }
        if (!passwordformat.test(password)) {
            setvalidpassworderror(true)
            err++
        }
        if (err == 0) {
            settab(false)
        }
    }

    const passwordChanged = () => {
        setvalidpasswordiconerror(false)
        var pwd = document.getElementById("txtPassword");
        if (pwd.value) {
            if (passwordformat.test(pwd.value)) {
                setvalidpasswordiconerror(true)
            }
        }
    }

    //Step 2

    //Tax Details
    const getgstinvarify = async () => {
        let err = 0
        settaxerror(false)
        settaxvaliderror(false)
        settaxinvaliderror(false)
        if (!gstinno) {
            settaxerror(true)
            err++
        }
        if (!isValidGstinPattern(gstinno)) {
            settaxvaliderror(true)
            err++
        }
        if (getGstinInfo(gstinno) == "Invalid GSTIN") {
            settaxinvaliderror(true)
            err++
        }
        if (err == 0) {
            setpanno(gstinno.substr(2, 10))
            settaxdiv(true)
        }
    }
    const getenrolvarify = () => {
        settaxdiv(true)
    }
    const stepnext1 = () => {
        setstep2disabled(false)
        setstep1('1')
        setTimeout(() => {
            let elem = document.getElementById('disabled-tab')
            elem.click()
        }, 150);
    }

    //Business Details
    const stepnext2 = () => {
        let err = 0
        setBusinessdetailserror(false)
        setErrorPinCode(false)
        setValidErrorPinCode(false)

        if (!businessname || !businesstype || !addressone || !addresstwo || !city || !pin || !postoffice || !state || !landmark) {
            setBusinessdetailserror(true)
            err++
        }

        if (pin && pin.length < 6) {
            setErrorPinCode(true)
            err++
        }

        if (pin && pin.length == 6 && postofficearray.length < 0) {
            setBusinessdetailserror(true)
            err++
        }

        if (err == 0) {
            setstep2disabled(true)
            setstep3disabled(false)
            setstep2('1')
            setPickupaddressone(addressone)
            setPickupaddresstwo(addresstwo)
            setPickupcity(city)
            setPickuppin(pin)
            setPickupPostOffice(postoffice)
            setPickupstate(state)
            setPickuplandmark(landmark)
            setTimeout(() => {
                let elem = document.getElementById('profile-tab')
                elem.click()
            }, 150);
        }
    }
    const getPinCode = async (val) => {
        setErrorPinCode(false)
        setValidErrorPinCode(false)
        setpin(val)
        if (val.length < 6) {
            setErrorPinCode(true)
            return false
        } else {
            showLoader()
            let pinres = await pincodeapi(val)
            if (pinres.length > 0) {
                hideLoader()
                let arr = pinres[0]
                if (arr.Status == "Success") {
                    setPostOfficeArray(arr.PostOffice)
                }
                if (arr.Status == "Error") {
                    setValidErrorPinCode(true)
                    setPostOfficeArray([])
                }
            } else {
                hideLoader()
                setPostOfficeArray([])
            }
        }
    }
    const getPostOfficeValue = (item) => {
        setstate('')
        setcity('')
        let temp = [...postofficearray]
        for (let t of temp) {
            if (t.Name == item) {
                setstate(t.State)
                setcity(t.District)
            }
        }
    }

    //Pickup Address
    const stepnext3 = () => {

        let err = 0
        setBusinessdetailserror(false)
        setErrorPinCode(false)
        setValidErrorPinCode(false)

        if (!pickupaddressone || !pickupaddresstwo || !pickupcity || !pickuppin || !pickuppostoffice || !pickupstate || !pickuplandmark) {
            setBusinessdetailserror(true)
            err++
        }

        if (pickuppin && pickuppin.length < 6) {
            setErrorPinCode(true)
            err++
        }

        if (pickuppin && pickuppin.length == 6 && postofficearray.length < 0) {
            setBusinessdetailserror(true)
            err++
        }

        if (err == 0) {
            setstep3disabled(true)
            setstep4disabled(false)
            setstep3('1')
            setTimeout(() => {
                let elem = document.getElementById('contact-tab')
                elem.click()
            }, 150);
        }
    }
    const getbusinessdata = (is) => {
        if (is) {
            setPickupaddressone('')
            setPickupaddresstwo('')
            setPickupcity('')
            setPickuppin('')
            setPickupPostOffice('')
            setPickupstate('')
            setPickuplandmark('')
        } else {
            setPickupaddressone(addressone)
            setPickupaddresstwo(addresstwo)
            setPickupcity(city)
            setPickuppin(pin)
            setPickupPostOffice(postoffice)
            setPickupstate(state)
            setPickuplandmark(landmark)
        }
    }
    const getPickupPinCode = async (val) => {
        setErrorPinCode(false)
        setValidErrorPinCode(false)
        setPickuppin(val)
        if (val.length < 6) {
            setErrorPinCode(true)
            return false
        } else {
            showLoader()
            let pinres = await pincodeapi(val)
            if (pinres.length > 0) {
                hideLoader()
                let arr = pinres[0]
                if (arr.Status == "Success") {
                    setPostOfficeArray(arr.PostOffice)
                }
                if (arr.Status == "Error") {
                    setValidErrorPinCode(true)
                    setPostOfficeArray([])
                }
            } else {
                hideLoader()
                setPostOfficeArray([])
            }
        }
    }
    const getPickupPostOfficeValue = (item) => {
        setPickupstate('')
        setPickupcity('')
        let temp = [...postofficearray]
        for (let t of temp) {
            if (t.Name == item) {
                setPickupstate(t.State)
                setPickupcity(t.District)
            }
        }
    }

    //Bank Details
    const verifyifscdetails = async () => {
        let err = 0
        let valid
        setbankdetailserror(false)
        setifscCodeerror(false)
        setbankaccountnoerror(false)

        if (!bankaccountnumber || !confirmbankaccountnumber || !ifscCode) {
            setbankdetailserror(true)
            err++
        }

        if (bankaccountnumber !== confirmbankaccountnumber) {
            setbankaccountnoerror(true)
            err++
        }

        if (ifscCode) {
            valid = await getifscapi(ifscCode)
            if (!valid) {
                setifscCodeerror(true)
                err++
            }
        }

        if (err == 0) {
            setbankname(valid.BANK)
            setbankdiv(true)
        }
    }

    const stepnext4 = () => {
        setstep4disabled(true)
        setstep5disabled(false)
        setstep4('1')
        setTimeout(() => {
            let elem = document.getElementById('seller-tab')
            elem.click()
        }, 150);
    }

    //Seller Details

    const finalstep = async () => {
        let err = 0
        setsellerdetailserror(false)
        if (!name) {
            setsellerdetailserror(true)
            err++
        }
        if (err == 0) {
            showLoader()
            let data = {
                image: "",
                name: name,
                email: email,
                password: password,
                phone: phone,
                whatsapp: whatsapp ? "1" : "0",
                esignature: "",

                enrolmentno: enrolmentno,
                gstinno: gstinno,
                businessname: businessname,
                businesstype: businesstype,
                panno: panno,
                addressone: addressone,
                addresstwo: addresstwo,
                city: city,
                pin: pin,
                postoffice: postoffice,
                state: state,
                landmark: landmark,

                pickupaddressone: pickupaddressone,
                pickupaddresstwo: pickupaddresstwo,
                pickupcity: pickupcity,
                pickuppin: pickuppin,
                pickuppostoffice: pickuppostoffice,
                pickupstate: pickupstate,
                pickuplandmark: pickuplandmark,

                bankname: bankname,
                bankaccountnumber: bankaccountnumber,
                ifsc: ifscCode,

                signup: true
            }
            showLoader()
            let response = await sellersignupapi(data)
            if (response.success) {
                setisload(false)
                setShow(true)
                hideLoader()
            } else {
                toast.error(response.message)
                hideLoader()
            }
        }
    }

    const gotologin = (path) => {
        handleClose()
        setTimeout(() => {
            goto(path)
        }, 150);
    }



    return (
        <>
            {
                isload ?
                    <>

                        {
                            tab ?
                                <>
                                    <div className='sel-regist'>
                                        <div className='sel-regist-left'>

                                            <div className='login-part'><p>Already a Seller?</p> <button onClick={() => { goto('/') }}>Login</button></div>
                                            <div className='all-need'>
                                                <p>All you need to sell on Srutle is:</p>
                                                <div className='txt-dtls'>
                                                    <p><i className="bi bi-check-circle"></i> Tax Details</p>
                                                    <ul>
                                                        <li>Enrolment ID/UIN <span>For Non-GST sellers</span></li>
                                                        <li>GSTIN Regular & Composition GST sellers</li>
                                                    </ul>
                                                </div>
                                                <div className='txt-dtls'>
                                                    <p><i className="bi bi-check-circle"></i> Bank Account</p>
                                                </div>
                                            </div>
                                            <div className='grw-div'>
                                                <p>Grow your business faster by selling on Srutle</p>
                                                <ul>
                                                    <li>
                                                        <div className='gr-dv'>
                                                            <div className='gr-dv-icn'><i className="bi bi-rocket-takeoff"></i></div>
                                                            <div className='gr-dv-txt'>
                                                                <strong>700+</strong>
                                                                <p>Categories to sel</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className='gr-dv'>
                                                            <div className='gr-dv-icn'><i className="bi bi-geo-fill"></i></div>
                                                            <div className='gr-dv-txt'>
                                                                <strong>19000+</strong>
                                                                <p>Pincodes sunported for delivery</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className='gr-dv'>
                                                            <div className='gr-dv-icn'><i className="bi bi-currency-rupee"></i></div>
                                                            <div className='gr-dv-txt'>
                                                                <strong>11 lakh+</strong>
                                                                <p>Suppliers are selling commission-tree</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className='gr-dv'>
                                                            <div className='gr-dv-icn'><i className="bi bi-people"></i></div>
                                                            <div className='gr-dv-txt'>
                                                                <strong>Crore of</strong>
                                                                <p>Customers buy across India</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                                <div className='sigup_back_img'>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='sel-regist-right'>
                                            <div className="signup-procss seller">
                                                <div className="signup-first-div">
                                                    <div className="logos"><Image src={"/assets/img/srutle-logo.png"} width={250} height={100} alt='logo' /></div>
                                                    <div className="signup-pg-hed">
                                                        <h3>Welcome to Strutle</h3>
                                                        <p>Create your account to start selling</p>
                                                    </div>
                                                    <div className="seller">
                                                        <div className="form-group">
                                                            <label htmlFor="mobile">Mobile Number</label>
                                                            <input
                                                                className={`${phoneerror && !phone ? "error-txt" : ""}${phonevaliderror && !phoneerror && phone ? "error-txt" : ""}`}
                                                                type="text"
                                                                placeholder="Enter your mobile number"
                                                                value={phone}
                                                                onChange={(e) => { setphone(e.target.value) }}
                                                                onKeyDown={(e) => {
                                                                    if (inputInvalidChars.includes(e.key)) {
                                                                        e.preventDefault();
                                                                    }
                                                                }}
                                                                maxLength={10}
                                                                readOnly={otpvarify}
                                                            />
                                                            {
                                                                phoneerror && !phone && <div className='input-error'>Please Enter Mobile no.</div>
                                                            }
                                                            {
                                                                phonevaliderror && !phoneerror && phone && <div className='input-error'>Mobile number already exist</div>
                                                            }
                                                        </div>
                                                        {
                                                            otpvarify ?
                                                                <>
                                                                    <div className="form-group">
                                                                        <label htmlFor="email">Email Address</label>
                                                                        <input
                                                                            className={`${error && !email ? "error-txt" : ""}${validemailerror && !error && email ? "error-txt" : ""}`}
                                                                            type="text"
                                                                            placeholder="Enter your email"
                                                                            value={email}
                                                                            onChange={(e) => { setemail(e.target.value) }}
                                                                        />
                                                                        {
                                                                            error && !email && <div className='input-error'>Please enter email</div>
                                                                        }
                                                                        {
                                                                            validemailerror && !error && email && <div className='input-error'>Enter valid email</div>
                                                                        }
                                                                    </div>
                                                                    <div className="form-group passwrd">
                                                                        <label htmlFor="email">Enter Password</label>
                                                                        <input
                                                                            className={`${error && !password ? "error-txt" : ""}${validpassworderror && !error && password ? "error-txt" : ""}`}
                                                                            type={passwordtype}
                                                                            name="password"
                                                                            id="txtPassword"
                                                                            placeholder="Enter your password"
                                                                            value={password}
                                                                            onChange={(e) => { setpassword(e.target.value) }}
                                                                            onKeyUp={() => { passwordChanged() }}
                                                                        />
                                                                        {
                                                                            passwordtype == "password" ?
                                                                                <button className="btn btn-vw" onClick={() => { setpasswordtype('text') }}><i className="bi bi-eye-fill"></i></button>
                                                                                :
                                                                                <button className="btn btn-vw" onClick={() => { setpasswordtype('password') }}><i className="bi bi-eye-slash-fill"></i></button>
                                                                        }
                                                                        {
                                                                            error && !password && <div className='input-error'>Please enter password</div>
                                                                        }
                                                                        {
                                                                            validpassworderror && !error && password && <div className='input-error'>Enter valid password</div>
                                                                        }
                                                                    </div>
                                                                    <ul className="pass-comp">
                                                                        <li>{validpasswordiconerror && <i className="bi bi-check2"></i>} Minimum 8 character (letters & Numbers)</li>
                                                                        <li>{validpasswordiconerror && <i className="bi bi-check2"></i>} Minimum 1 specila character (@ # $ % ! ^ & *)</li>
                                                                        <li>{validpasswordiconerror && <i className="bi bi-check2"></i>} Minimum 1 capital letter (A to Z)</li>
                                                                        <li>{validpasswordiconerror && <i className="bi bi-check2"></i>} Minimum 1 number (0-9)</li>
                                                                    </ul>
                                                                </>
                                                                :
                                                                <>
                                                                    {
                                                                        otpsend ?
                                                                            <>
                                                                                <div className="form-group">
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
                                                                                            border: "1px solid #000",
                                                                                            borderRadius: "8px",
                                                                                            width: "50px",
                                                                                            height: "50px",
                                                                                            fontSize: "16px",
                                                                                            color: "#000",
                                                                                            fontWeight: "400",
                                                                                            // caretColor: "blue",s
                                                                                            marginRight: "5px",
                                                                                            margin: "auto"
                                                                                        }}
                                                                                        focusStyle={{
                                                                                            border: "1px solid #CFD3DB",
                                                                                            outline: "none"
                                                                                        }}
                                                                                    />
                                                                                    {
                                                                                        otperror && !otp && <div className='input-error'>Please Enter OTP</div>
                                                                                    }
                                                                                    {
                                                                                        otpvaliderror && !otperror && otp && <div className='input-error'>Wrong Otp</div>
                                                                                    }
                                                                                </div>

                                                                                <button type="submit" className="login-button" onClick={() => { verifyotp() }}>Verify OTP</button>
                                                                                <div className="signup_verfy-otp-msg">
                                                                                    <span>{timer}</span>
                                                                                    {
                                                                                        timer == '00:00' ?
                                                                                            <p className="ddnt-rcv-cod">Didn’t received your code? <a onClick={() => { reotpsent() }} className='text-blue'>Resend code</a></p>
                                                                                            :
                                                                                            <></>
                                                                                    }
                                                                                </div>
                                                                            </>
                                                                            :
                                                                            <button type="submit" className="login-button" onClick={() => { sendotp() }}>Send OTP</button>
                                                                    }
                                                                </>
                                                        }
                                                        <div className='sign-up_subbtn'>
                                                            <div className="terms">
                                                                <input
                                                                    type="checkbox"
                                                                    id="agreeTerms"
                                                                    name="agreeTerms"
                                                                    checked={whatsapp}
                                                                    value=""
                                                                    onChange={() => { setwhatsapp(!whatsapp) }}
                                                                />
                                                                <label htmlFor="agreeTerms">Do you want to get <Image src={'/assets/seller-img/whatsapp_icon.png'} width={20} height={8} alt='wht' /> Whatsapp notification for important updates? </label>
                                                            </div>
                                                            <div className="terms">
                                                                <input
                                                                    type="checkbox"
                                                                    id="agreeTerms"
                                                                    name="agreeTerms"
                                                                    checked={terms}
                                                                    value=""
                                                                    onChange={() => { setterms(!terms) }}
                                                                />
                                                                <label htmlFor="agreeTerms">I agree <a className='text-blue'>Terms and conditions</a>  and <a className='text-blue'>privacy policy</a></label>
                                                            </div>
                                                            <button disabled={!otpvarify || !terms} type="submit" className="login-button" onClick={() => { gotonexttab() }}>Create Seller Account</button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="signup-procss seller">
                                        <div className="signup-procss-left">
                                            <div className="logos"><Image src={"/assets/seller-img/srutle-logo.png"} width={250} height={100} alt='logo' /></div>
                                            {/* Nav */}
                                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                {/* Tax Details */}
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane"
                                                        type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true" disabled={step1disabled}>
                                                        {
                                                            step1 == "0" ?
                                                                <i className="bi bi-currency-rupee"></i>
                                                                :
                                                                <i className="bi bi-check-circle-fill"></i>
                                                        }
                                                        Tax Details</button>
                                                </li>
                                                {/* Business Details */}
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="disabled-tab" data-bs-toggle="tab" data-bs-target="#disabled-tab-pane"
                                                        type="button" role="tab" aria-controls="disabled-tab-pane" aria-selected="false" disabled={step2disabled}>
                                                        {
                                                            step2 == "0" ?
                                                                <i className="bi bi-person-badge-fill"></i>
                                                                :
                                                                <i className="bi bi-check-circle-fill"></i>
                                                        }
                                                        Business Details</button>
                                                </li>
                                                {/* Pickup Address */}
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane"
                                                        type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false" disabled={step3disabled}>
                                                        {
                                                            step3 == "0" ?
                                                                <i className="bi bi-geo-alt"></i>
                                                                :
                                                                <i className="bi bi-check-circle-fill"></i>
                                                        }
                                                        Pickup Address</button>
                                                </li>
                                                {/* Bank Details */}
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane"
                                                        type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false" disabled={step4disabled}>
                                                        {
                                                            step4 == "0" ?
                                                                <i className="bi bi-bank2"></i>
                                                                :
                                                                <i className="bi bi-check-circle-fill"></i>
                                                        }
                                                        Bank Details</button>
                                                </li>
                                                {/* Seller Details */}
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="seller-tab" data-bs-toggle="tab" data-bs-target="#seller-tab-pane"
                                                        type="button" role="tab" aria-controls="seller-tab-pane" aria-selected="false" disabled={step5disabled}>
                                                        {
                                                            step5 == "0" ?
                                                                <i className="bi bi-bank2"></i>
                                                                :
                                                                <i className="bi bi-person-video2"></i>
                                                        }
                                                        Seller Details</button>
                                                </li>
                                            </ul>
                                            {/* Tab */}
                                            <div className="tab-content" id="myTabContent">
                                                {/* Tax Details */}
                                                <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab"
                                                    tabIndex="0">
                                                    {
                                                        taxdiv ?
                                                            <div id="enterdtls" className="enterdtls">
                                                                {
                                                                    gstinno &&
                                                                    <>
                                                                        <div className="form-group">
                                                                            <label htmlFor="firstName">GSTIN Number</label>
                                                                            <div className="enter-dtls-inr">
                                                                                {gstinno}
                                                                            </div>
                                                                            <span className="msg-check"><i className="bi bi-check-circle-fill"></i> Valid GSTIN Number</span>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label htmlFor="firstName">PAN Number</label>
                                                                            <div className="enter-dtls-inr">
                                                                                {panno}
                                                                            </div>
                                                                            <span className="msg-check"><i className="bi bi-check-circle-fill"></i> Valid PAN Number</span>
                                                                        </div>
                                                                    </>
                                                                }
                                                                {
                                                                    enrolmentno &&
                                                                    <div className="form-group">
                                                                        <label htmlFor="firstName">Enrolment Number</label>
                                                                        <div className="enter-dtls-inr">
                                                                            {enrolmentno}
                                                                        </div>
                                                                        <span className="msg-check"><i className="bi bi-check-circle-fill"></i></span>
                                                                    </div>
                                                                }
                                                            </div>
                                                            :
                                                            <div id="entergst" className="signup-steps">
                                                                <h3>Do you have GST number?</h3>
                                                                <div className="radio-div-out">
                                                                    <div className="radio-div-inn">
                                                                        <input type="radio" name="tab" value="igotnone" onChange={() => { setgstindiv(true); setenroldiv(false) }} />
                                                                        <div className="radio-div">
                                                                            <strong>Yes</strong>
                                                                            <p>Enter your GSTIN and sell anywhere easy</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="radio-div-inn">
                                                                        <input type="radio" name="tab" value="igottwo" onChange={() => { setgstindiv(false); setenroldiv(true) }} />
                                                                        <div className="radio-div">
                                                                            <strong>No</strong>
                                                                            <p>Worry not, you can sell without GST</p>
                                                                            <a href="">Get EID in mins <i className="bi bi-lightning"></i></a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {
                                                                    gstindiv &&
                                                                    <div className="enter-dtls">
                                                                        <div className="form-row">
                                                                            <div className="form-group">
                                                                                <label htmlFor="firstName">Enter GSTIN Number</label>
                                                                                <div className="enter-dtls-inr">
                                                                                    <input
                                                                                        className={`${taxerror && !gstinno ? "error-txt" : ""} ${taxvaliderror && !taxerror && gstinno ? "error-txt" : ""} ${taxinvaliderror && !taxvaliderror && !taxerror && gstinno ? "error-txt" : ""}`}
                                                                                        type="text"
                                                                                        value={gstinno}
                                                                                        onChange={(e) => { setgstinno(e.target.value) }}
                                                                                    />
                                                                                    <button
                                                                                        type="submit"
                                                                                        className="signup-button w-50"
                                                                                        onClick={() => { getgstinvarify() }}
                                                                                    >Verify</button></div>
                                                                                {
                                                                                    taxerror && !gstinno && <div className='input-error'>Please enter GSTIN</div>
                                                                                }
                                                                                {
                                                                                    taxvaliderror && !taxerror && gstinno && <div className='input-error'>Please enter valid GSTIN Pattern</div>
                                                                                }
                                                                                {
                                                                                    taxinvaliderror && !taxvaliderror && !taxerror && gstinno && <div className='input-error'>Invalid GSTIN</div>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                }
                                                                {
                                                                    enroldiv &&
                                                                    <div className="enter-dtls">
                                                                        <h4>Get EID in minutes & sell in your registered state</h4>
                                                                        <div className="st-one">
                                                                            <div className="stp-num">1</div>
                                                                            <div className="st-inre">
                                                                                <strong>Apply for Enrollment ID</strong>
                                                                                <p>from the GST website</p>
                                                                                <a href="https://reg.gst.gov.in/registration/generateuid" target="_blank">Get it Now <i className="bi bi-chevron-right"></i></a>
                                                                                <button className="btn btn-vdeo"><i className="bi bi-youtube"></i> Watch this video to leran
                                                                                    more</button>
                                                                            </div>
                                                                        </div>
                                                                        <div className="st-too">
                                                                            <div className="stp-num">2</div>
                                                                            <div className="st-inre">

                                                                                <strong>Enter Enrollment ID here to complete account setup</strong>
                                                                                <p>once your ID is created, copy and paste it here to complete your setup</p>
                                                                                <div className="form-group">
                                                                                    <div className="enter-dtls-inr">
                                                                                        <input
                                                                                            type="text"
                                                                                            id="firstName"
                                                                                            name="firstName"
                                                                                            placeholder="Enter Enrollment ID/ UIN"
                                                                                            value={enrolmentno}
                                                                                            onChange={(e) => { setenrolmentno(e.target.value) }}
                                                                                        />
                                                                                        <button
                                                                                            type="submit"
                                                                                            className="signup-button w-50"
                                                                                            onClick={() => { getenrolvarify() }}
                                                                                        >Verify</button></div>
                                                                                    <div className="error-message" id="firstNameError">Enter Enrollment ID/ UIN
                                                                                    </div>


                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </div>
                                                    }
                                                    {
                                                        taxdiv && <button disabled={!taxdiv} type="submit" className="signup-button cont-next" onClick={() => { stepnext1() }} >Next</button>
                                                    }

                                                </div>
                                                {/* Business Details */}
                                                <div className="tab-pane fade" id="disabled-tab-pane" role="tabpanel" aria-labelledby="disabled-tab"
                                                    tabIndex="0">
                                                    <div className="pckup-address">
                                                        <div className="info-msg"> <i style={{ marginRight: "5px" }} className="bi bi-exclamation-circle"></i>
                                                            Your store name will be visible to all buyers on Strutle
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="enter-dtls-inr">
                                                                <input
                                                                    type="text"
                                                                    className={`${businessdetailserror && !businessname ? "error-txt" : ""}`}
                                                                    placeholder="Enter Business Name"
                                                                    value={businessname}
                                                                    onChange={(e) => { setbusinessname(e.target.value) }}
                                                                />
                                                            </div>
                                                            {
                                                                businessdetailserror && !businessname && <div className='input-error'>Please enter business name</div>
                                                            }
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="enter-dtls-inr">
                                                                <BusinessTypeAutocompleteSearch businessdetailserror={businessdetailserror} businesstype={businesstype} setbusinesstype={setbusinesstype} />
                                                            </div>
                                                            {
                                                                businessdetailserror && !businesstype && <div className='input-error'>Please select business type</div>
                                                            }
                                                        </div>
                                                        <div className="pckup-address">
                                                            <div className="form-row">
                                                                <div className="form-group">
                                                                    <div className="enter-dtls-inr">
                                                                        <input
                                                                            className={`${businessdetailserror && !pin ? "error-txt" : ""}${!businessdetailserror && pin && errorPinCode ? "error-txt" : ""}${!businessdetailserror && pin && !errorPinCode && errorValidPinCode ? "error-txt" : ""}`}
                                                                            name="firstName"
                                                                            placeholder="Enter Pin Code"
                                                                            value={pin}
                                                                            onChange={(e) => { getPinCode(e.target.value) }}
                                                                        />

                                                                    </div>
                                                                    {
                                                                        businessdetailserror && !pin && <div className='input-error'>Please enter pincode</div>
                                                                    }
                                                                    {
                                                                        !businessdetailserror && pin && errorPinCode && <div className='input-error'>Please enter valid pincode</div>
                                                                    }
                                                                    {
                                                                        !businessdetailserror && pin && !errorPinCode && errorValidPinCode && <div className='input-error'>No records found!</div>
                                                                    }
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="enter-dtls-inr">
                                                                        <select
                                                                            className={`${businessdetailserror && !postoffice ? "error-txt" : ""}`}
                                                                            value={postoffice}
                                                                            onChange={(e) => { setPostOffice(e.target.value); getPostOfficeValue(e.target.value) }}
                                                                        >
                                                                            <option value="">Select</option>
                                                                            {
                                                                                postofficearray && postofficearray.map((item, i) => (
                                                                                    <option key={i} value={item.Name}>{item.Name}</option>
                                                                                ))
                                                                            }
                                                                        </select>
                                                                    </div>
                                                                    {
                                                                        businessdetailserror && !postoffice && <div className='input-error'>Please select post office</div>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="enter-dtls-inr">
                                                                    <input
                                                                        className={`${businessdetailserror && !addressone ? "error-txt" : ""}`}
                                                                        type="text"
                                                                        placeholder="Room / Floor / Building Number"
                                                                        value={addressone}
                                                                        onChange={(e) => { setaddressone(e.target.value) }}
                                                                    />
                                                                </div>
                                                                {
                                                                    businessdetailserror && !addressone && <div className='input-error'>Please enter room / floor / building number</div>
                                                                }
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="enter-dtls-inr">
                                                                    <input
                                                                        className={`${businessdetailserror && !addresstwo ? "error-txt" : ""}`}
                                                                        type="text"
                                                                        placeholder="Street / Area"
                                                                        value={addresstwo}
                                                                        onChange={(e) => { setaddresstwo(e.target.value) }}
                                                                    />
                                                                </div>
                                                                {
                                                                    businessdetailserror && !addresstwo && <div className='input-error'>Please enter street / area</div>
                                                                }
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="enter-dtls-inr">
                                                                    <input
                                                                        className={`${businessdetailserror && !landmark ? "error-txt" : ""}`}
                                                                        type="text"
                                                                        placeholder="Landmark"
                                                                        value={landmark}
                                                                        onChange={(e) => { setlandmark(e.target.value) }}
                                                                    />
                                                                </div>
                                                                {
                                                                    businessdetailserror && !landmark && <div className='input-error'>Please enter landmark</div>
                                                                }
                                                            </div>
                                                            <div className="form-row">
                                                                <div className="form-group">
                                                                    <div className="enter-dtls-inr">
                                                                        <input
                                                                            className={`${businessdetailserror && !city ? "error-txt" : ""}`}
                                                                            type="text"
                                                                            placeholder="City"
                                                                            value={city}
                                                                            onChange={(e) => { setcity(e.target.value) }}
                                                                            readOnly
                                                                        />
                                                                    </div>
                                                                    {
                                                                        businessdetailserror && !city && <div className='input-error'>Please enter city</div>
                                                                    }
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="enter-dtls-inr">
                                                                        <input
                                                                            className={`${businessdetailserror && !state ? "error-txt" : ""}`}
                                                                            type="text"
                                                                            placeholder="State"
                                                                            value={state}
                                                                            onChange={(e) => { setstate(e.target.value) }}
                                                                            readOnly
                                                                        />
                                                                    </div>
                                                                    {
                                                                        businessdetailserror && !state && <div className='input-error'>Please enter state</div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <button type="submit" className="signup-button cont-next" onClick={() => { stepnext2() }}>Next</button>
                                                </div>
                                                {/* Pickup Address */}
                                                <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab"
                                                    tabIndex="0">

                                                    <div className="pckup-address">
                                                        <div className="info-msg"> <i className="bi bi-exclamation-circle"></i>
                                                            &nbsp; Product will be picked up from this location for delivery
                                                        </div>
                                                        <div className="terms">
                                                            <input
                                                                type="checkbox"
                                                                id="agreeTerms"
                                                                name="agreeTerms"
                                                                value=""
                                                                checked={isaddress}
                                                                onChange={() => { setIsaddress(!isaddress); getbusinessdata(isaddress) }}
                                                            />
                                                            <label htmlFor="agreeTerms">Use business address</label>
                                                        </div>
                                                        <div className="form-row">
                                                            <div className="form-group">
                                                                <div className="enter-dtls-inr">
                                                                    <input
                                                                        className={`${businessdetailserror && !pickuppin ? "error-txt" : ""}${!businessdetailserror && pin && errorPinCode ? "error-txt" : ""}${!businessdetailserror && pin && !errorPinCode && errorValidPinCode ? "error-txt" : ""}`}
                                                                        name="firstName"
                                                                        placeholder="Enter Pin Code"
                                                                        value={pickuppin}
                                                                        onChange={(e) => { getPickupPinCode(e.target.value) }}
                                                                    />

                                                                </div>
                                                                {
                                                                    businessdetailserror && !pickuppin && <div className='input-error'>Please enter pincode</div>
                                                                }
                                                                {
                                                                    !businessdetailserror && pin && errorPinCode && <div className='input-error'>Please enter valid pincode</div>
                                                                }
                                                                {
                                                                    !businessdetailserror && pin && !errorPinCode && errorValidPinCode && <div className='input-error'>No records found!</div>
                                                                }
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="enter-dtls-inr">
                                                                    <select
                                                                        className={`${businessdetailserror && !pickuppostoffice ? "error-txt" : ""}`}
                                                                        value={pickuppostoffice}
                                                                        onChange={(e) => { setPickupPostOffice(e.target.value); getPickupPostOfficeValue(e.target.value) }}
                                                                    >
                                                                        <option value="">Select</option>
                                                                        {
                                                                            postofficearray && postofficearray.map((item, i) => (
                                                                                <option key={i} value={item.Name}>{item.Name}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                </div>
                                                                {
                                                                    businessdetailserror && !pickuppostoffice && <div className='input-error'>Please select post office</div>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="enter-dtls-inr">
                                                                <input
                                                                    className={`${businessdetailserror && !pickupaddressone ? "error-txt" : ""}`}
                                                                    type="text"
                                                                    placeholder="Room / Floor / Building Number"
                                                                    value={pickupaddressone}
                                                                    onChange={(e) => { setPickupaddressone(e.target.value) }}
                                                                />
                                                            </div>
                                                            {
                                                                businessdetailserror && !pickupaddressone && <div className='input-error'>Please enter room / floor / building number</div>
                                                            }
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="enter-dtls-inr">
                                                                <input
                                                                    className={`${businessdetailserror && !pickupaddresstwo ? "error-txt" : ""}`}
                                                                    type="text"
                                                                    placeholder="Street / Area"
                                                                    value={pickupaddresstwo}
                                                                    onChange={(e) => { setPickupaddresstwo(e.target.value) }}
                                                                />
                                                            </div>
                                                            {
                                                                businessdetailserror && !pickupaddresstwo && <div className='input-error'>Please enter street / area</div>
                                                            }
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="enter-dtls-inr">
                                                                <input
                                                                    className={`${businessdetailserror && !pickuplandmark ? "error-txt" : ""}`}
                                                                    type="text"
                                                                    placeholder="Landmark"
                                                                    value={pickuplandmark}
                                                                    onChange={(e) => { setPickuplandmark(e.target.value) }}
                                                                />
                                                            </div>
                                                            {
                                                                businessdetailserror && !pickuplandmark && <div className='input-error'>Please enter landmark</div>
                                                            }
                                                        </div>

                                                        <div className="form-row">
                                                            <div className="form-group">
                                                                <div className="enter-dtls-inr">
                                                                    <input
                                                                        className={`${businessdetailserror && !pickupcity ? "error-txt" : ""}`}
                                                                        type="text"
                                                                        placeholder="City"
                                                                        value={pickupcity}
                                                                        onChange={(e) => { setPickupcity(e.target.value) }}
                                                                        readOnly
                                                                    />
                                                                </div>
                                                                {
                                                                    businessdetailserror && !pickupcity && <div className='input-error'>Please enter city</div>
                                                                }
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="enter-dtls-inr">
                                                                    <input
                                                                        className={`${businessdetailserror && !pickupstate ? "error-txt" : ""}`}
                                                                        type="text"
                                                                        placeholder="State"
                                                                        value={pickupstate}
                                                                        onChange={(e) => { setPickupstate(e.target.value) }}
                                                                        readOnly
                                                                    />
                                                                </div>
                                                                {
                                                                    businessdetailserror && !pickupstate && <div className='input-error'>Please enter state</div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button type="submit" className="signup-button cont-next" onClick={() => { stepnext3() }}>Next</button>
                                                </div>
                                                {/* Bank Details */}
                                                <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab"
                                                    tabIndex="0">
                                                    <div className="pckup-address">

                                                        {
                                                            bankdiv ?
                                                                <>
                                                                    {
                                                                        ifscCode &&
                                                                        <>
                                                                            <div className="form-group mt-3">
                                                                                <label htmlFor="firstName">Bank Name</label>
                                                                                <div className="enter-dtls-inr">
                                                                                    {bankname}
                                                                                </div>
                                                                                <span className="msg-check"><i className="bi bi-check-circle-fill"></i> Valid</span>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="firstName">IFSC Code</label>
                                                                                <div className="enter-dtls-inr">
                                                                                    {ifscCode}
                                                                                </div>
                                                                                <span className="msg-check"><i className="bi bi-check-circle-fill"></i> Valid</span>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="firstName">Account No.</label>
                                                                                <div className="enter-dtls-inr">
                                                                                    {bankaccountnumber}
                                                                                </div>
                                                                                <span className="msg-check"><i className="bi bi-check-circle-fill"></i> Valid</span>
                                                                            </div>
                                                                        </>
                                                                    }
                                                                </>
                                                                :
                                                                <>
                                                                    <div className="info-msg"> <i className="bi bi-exclamation-circle"></i>
                                                                        Bank account shhould be in the name of registered business name or trade name as per GSTIN
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <div className="enter-dtls-inr">
                                                                            <input
                                                                                className={`${bankdetailserror && !bankaccountnumber ? "error-txt" : ""}`}
                                                                                type="text"
                                                                                placeholder="Account Number"
                                                                                value={bankaccountnumber}
                                                                                onChange={(e) => { setbankaccountnumber(e.target.value) }}
                                                                            />
                                                                        </div>
                                                                        {
                                                                            bankdetailserror && !bankaccountnumber && <div className='input-error'>Please enter account no.</div>
                                                                        }
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <div className="enter-dtls-inr">
                                                                            <input
                                                                                className={`${bankdetailserror && !confirmbankaccountnumber ? "error-txt" : ""}${bankaccountnoerror && !businessdetailserror && pickuppostoffice ? "error-txt" : ""}`}
                                                                                type="text"
                                                                                placeholder="Confirm Account Number"
                                                                                value={confirmbankaccountnumber}
                                                                                onChange={(e) => { setconfirmbankaccountnumber(e.target.value) }}
                                                                            />
                                                                        </div>
                                                                        {
                                                                            bankdetailserror && !confirmbankaccountnumber && <div className='input-error'>Please enter confirm account no.</div>
                                                                        }
                                                                        {
                                                                            bankaccountnoerror && !businessdetailserror && pickuppostoffice && <div className='input-error'>Account no. miss match</div>
                                                                        }
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <div className="enter-dtls-inr">
                                                                            <input
                                                                                className={`${bankdetailserror && !ifscCode ? "error-txt" : ""}${ifscCodeerror && !bankdetailserror && ifscCode ? "error-txt" : ""}`}
                                                                                type="text"
                                                                                placeholder="IFSC Code"
                                                                                value={ifscCode}
                                                                                onChange={(e) => { setifscCode(e.target.value) }}
                                                                            />
                                                                        </div>
                                                                        {
                                                                            bankdetailserror && !ifscCode && <div className='input-error'>Please enter ifsc code</div>
                                                                        }
                                                                        {
                                                                            ifscCodeerror && !bankdetailserror && ifscCode && <div className='input-error'>IFSC Not Found</div>
                                                                        }
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <div className="enter-dtls-inr">
                                                                            <button className="signup-button w-100" onClick={() => { verifyifscdetails() }}>Verify</button>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                        }
                                                    </div>
                                                    {
                                                        bankdiv &&
                                                        <button type="submit" className="signup-button cont-next" onClick={() => { stepnext4() }}>Next</button>
                                                    }
                                                </div>
                                                {/* Seller Details */}
                                                <div className="tab-pane fade" id="seller-tab-pane" role="tabpanel" aria-labelledby="seller-tab"
                                                    tabIndex="0">
                                                    <div className="pckup-address mt-3">
                                                        <div className="form-group">
                                                            <div className="enter-dtls-inr">
                                                                <input
                                                                    className={`${sellerdetailserror && !name ? "error-txt" : ""}`}
                                                                    type="text"
                                                                    placeholder="Seller Name"
                                                                    value={name}
                                                                    onChange={(e) => { setname(e.target.value) }}
                                                                />
                                                            </div>
                                                            {
                                                                sellerdetailserror && !name && <div className='input-error'>Please enter saller name.</div>
                                                            }
                                                        </div>
                                                        <button type="submit" className="signup-button cont-next" onClick={() => { finalstep() }}>Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* FAQ - Tips */}
                                        <div className="signup-procss-right">
                                            {/* Tax Details */}
                                            {
                                                step1 == "0" && !step1disabled &&
                                                <>
                                                    <h3>Tax Tips</h3>
                                                    <div className="accordion" id="accordionExample">
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header">
                                                                <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                                                    data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                    Question #1
                                                                </button>
                                                            </h2>
                                                            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <strong>This is the first item's accordion body.</strong> It is shown by default, until the
                                                                    collapse plugin adds the appropriate classes that we use to style each element. These
                                                                    classes control the overall appearance, as well as the showing and hiding via CSS
                                                                    transitions. You can modify any of this with custom CSS or overriding our default variables.
                                                                    It's also worth noting that just about any HTML can go within the, though the transition does limit overflow.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header">
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                                    data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                    Question #2
                                                                </button>
                                                            </h2>
                                                            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <strong>This is the second item's accordion body.</strong> It is hidden by default, until
                                                                    the collapse plugin adds the appropriate classes that we use to style each element. These
                                                                    classes control the overall appearance, as well as the showing and hiding via CSS
                                                                    transitions. You can modify any of this with custom CSS or overriding our default variables.
                                                                    It's also worth noting that just about any HTML can go within the, though the transition does limit overflow.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header">
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                                    data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                    Question #3
                                                                </button>
                                                            </h2>
                                                            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    This is the third item's accordion body. It is hidden by default, until the
                                                                    collapse plugin adds the appropriate classes that we use to style each element. These
                                                                    classes control the overall appearance, as well as the showing and hiding via CSS
                                                                    transitions. You can modify any of this with custom CSS or overriding our default variables.
                                                                    It's also worth noting that just about any HTML can go within the, though the transition does limit overflow.
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                            {/* Business Details */}
                                            {
                                                step2 == "0" && !step2disabled &&
                                                <>
                                                    <h3>Business Tips</h3>
                                                    <div className="accordion" id="accordionExample">
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header">
                                                                <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                                                    data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                    Question #1
                                                                </button>
                                                            </h2>
                                                            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <strong>This is the first item's accordion body.</strong> It is shown by default, until the
                                                                    collapse plugin adds the appropriate classes that we use to style each element. These
                                                                    classes control the overall appearance, as well as the showing and hiding via CSS
                                                                    transitions. You can modify any of this with custom CSS or overriding our default variables.
                                                                    It's also worth noting that just about any HTML can go within the, though the transition does limit overflow.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header">
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                                    data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                    Question #2
                                                                </button>
                                                            </h2>
                                                            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <strong>This is the second item's accordion body.</strong> It is hidden by default, until
                                                                    the collapse plugin adds the appropriate classes that we use to style each element. These
                                                                    classes control the overall appearance, as well as the showing and hiding via CSS
                                                                    transitions. You can modify any of this with custom CSS or overriding our default variables.
                                                                    It's also worth noting that just about any HTML can go within the, though the transition does limit overflow.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header">
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                                    data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                    Question #3
                                                                </button>
                                                            </h2>
                                                            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    This is the third item's accordion body. It is hidden by default, until the
                                                                    collapse plugin adds the appropriate classes that we use to style each element. These
                                                                    classes control the overall appearance, as well as the showing and hiding via CSS
                                                                    transitions. You can modify any of this with custom CSS or overriding our default variables.
                                                                    It's also worth noting that just about any HTML can go within the, though the transition does limit overflow.
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            }

                                            {/* Pickup Address */}
                                            {
                                                step3 == "0" && !step3disabled &&
                                                <>
                                                    <h3>Pickup Address Tips</h3>
                                                    <div className="accordion" id="accordionExample">
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header">
                                                                <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                                                    data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                    Question #1
                                                                </button>
                                                            </h2>
                                                            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <strong>This is the first item's accordion body.</strong> It is shown by default, until the
                                                                    collapse plugin adds the appropriate classes that we use to style each element. These
                                                                    classes control the overall appearance, as well as the showing and hiding via CSS
                                                                    transitions. You can modify any of this with custom CSS or overriding our default variables.
                                                                    It's also worth noting that just about any HTML can go within the, though the transition does limit overflow.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header">
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                                    data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                    Question #2
                                                                </button>
                                                            </h2>
                                                            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <strong>This is the second item's accordion body.</strong> It is hidden by default, until
                                                                    the collapse plugin adds the appropriate classes that we use to style each element. These
                                                                    classes control the overall appearance, as well as the showing and hiding via CSS
                                                                    transitions. You can modify any of this with custom CSS or overriding our default variables.
                                                                    It's also worth noting that just about any HTML can go within the, though the transition does limit overflow.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header">
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                                    data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                    Question #3
                                                                </button>
                                                            </h2>
                                                            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    This is the third item's accordion body. It is hidden by default, until the
                                                                    collapse plugin adds the appropriate classes that we use to style each element. These
                                                                    classes control the overall appearance, as well as the showing and hiding via CSS
                                                                    transitions. You can modify any of this with custom CSS or overriding our default variables.
                                                                    It's also worth noting that just about any HTML can go within the, though the transition does limit overflow.
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            }

                                            {/* Bank Details */}
                                            {
                                                step4 == "0" && !step4disabled &&
                                                <>
                                                    <h3>Bank Tips</h3>
                                                    <div className="accordion" id="accordionExample">
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header">
                                                                <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                                                    data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                    Question #1
                                                                </button>
                                                            </h2>
                                                            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <strong>This is the first item's accordion body.</strong> It is shown by default, until the
                                                                    collapse plugin adds the appropriate classes that we use to style each element. These
                                                                    classes control the overall appearance, as well as the showing and hiding via CSS
                                                                    transitions. You can modify any of this with custom CSS or overriding our default variables.
                                                                    It's also worth noting that just about any HTML can go within the, though the transition does limit overflow.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header">
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                                    data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                    Question #2
                                                                </button>
                                                            </h2>
                                                            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <strong>This is the second item's accordion body.</strong> It is hidden by default, until
                                                                    the collapse plugin adds the appropriate classes that we use to style each element. These
                                                                    classes control the overall appearance, as well as the showing and hiding via CSS
                                                                    transitions. You can modify any of this with custom CSS or overriding our default variables.
                                                                    It's also worth noting that just about any HTML can go within the, though the transition does limit overflow.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header">
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                                    data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                    Question #3
                                                                </button>
                                                            </h2>
                                                            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    This is the third item's accordion body. It is hidden by default, until the
                                                                    collapse plugin adds the appropriate classes that we use to style each element. These
                                                                    classes control the overall appearance, as well as the showing and hiding via CSS
                                                                    transitions. You can modify any of this with custom CSS or overriding our default variables.
                                                                    It's also worth noting that just about any HTML can go within the, though the transition does limit overflow.
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            }

                                            {/* Seller Details */}
                                            {
                                                step5 == "0" && !step5disabled &&
                                                <>
                                                    <h3>Seller Tips</h3>
                                                    <div className="accordion" id="accordionExample">
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header">
                                                                <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                                                    data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                    Question #1
                                                                </button>
                                                            </h2>
                                                            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <strong>This is the first item's accordion body.</strong> It is shown by default, until the
                                                                    collapse plugin adds the appropriate classes that we use to style each element. These
                                                                    classes control the overall appearance, as well as the showing and hiding via CSS
                                                                    transitions. You can modify any of this with custom CSS or overriding our default variables.
                                                                    It's also worth noting that just about any HTML can go within the, though the transition does limit overflow.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header">
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                                    data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                    Question #2
                                                                </button>
                                                            </h2>
                                                            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <strong>This is the second item's accordion body.</strong> It is hidden by default, until
                                                                    the collapse plugin adds the appropriate classes that we use to style each element. These
                                                                    classes control the overall appearance, as well as the showing and hiding via CSS
                                                                    transitions. You can modify any of this with custom CSS or overriding our default variables.
                                                                    It's also worth noting that just about any HTML can go within the, though the transition does limit overflow.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header">
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                                    data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                    Question #3
                                                                </button>
                                                            </h2>
                                                            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    This is the third item's accordion body. It is hidden by default, until the
                                                                    collapse plugin adds the appropriate classes that we use to style each element. These
                                                                    classes control the overall appearance, as well as the showing and hiding via CSS
                                                                    transitions. You can modify any of this with custom CSS or overriding our default variables.
                                                                    It's also worth noting that just about any HTML can go within the, though the transition does limit overflow.
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </>
                        }
                    </>
                    :
                    <></>
            }
            <ToastContainer />
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
                            <span><Image src={"/assets/img/verified-icn.png"} width={100} height={100} alt='nocart' /></span>
                            <strong>Seller Signup successfully</strong>
                            <p>You can start selling on Srutle</p>
                            <button className="btn btn-vw-ordr" onClick={() => { gotologin('/') }} >Login</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

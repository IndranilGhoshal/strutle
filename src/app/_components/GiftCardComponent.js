'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { getLocalStorageData, hideLoader, removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common'
import { giftcardApi } from '../lib/apiService'
import RazorpaypaymentinterfaceGiftCard from './_paymentinterfaces/RazorpaypaymentinterfaceGiftCard'
import { useRouter } from 'next/navigation'

export default function GiftCardComponent() {
    const router = useRouter();
    const [step, setStep] = useState('0')
    const [list, setList] = useState([])
    const [load, setLoad] = useState(false)
    const [imagearray, setImageArray] = useState([])
    const [amountarray, setAmountArray] = useState([])

    const [giftid, setGiftId] = useState('')
    const [card, setCard] = useState('')
    const [image, setImage] = useState('')
    const [amount, setAmount] = useState('')
    const [customamount, setCustomAmount] = useState('')
    const [senderName, setSenderName] = useState('')
    const [senderEmail, setSenderEmail] = useState('')

    const [recipientName, setRecipientName] = useState('')
    const [recipientEmail, setRecipientEmail] = useState('')
    const [recipientMessage, setRecipientMessage] = useState('')

    const [error, setError] = useState(false)

    const [totalamount, settotalamount] = useState('')
    const [paymentdescription, setpaymentdescription] = useState('Purchase Gift card')




    useEffect(() => {
        setStep("1")
        giftcarddata()
    }, [])

    const goto = (path) => {
        showLoader()
        router.push("/consumer" + path)
        removeLocalStorageData("pathName")
        setLocalStorageData('pathName', path)
    }

    const giftcarddata = async () => {
        showLoader()
        let response = await giftcardApi({ list: true })
        if (response.success) {
            let { result } = response
            setList(result)
            setLoad(true)
            hideLoader()
        } else {
            setList([])
            setLoad(true)
            hideLoader()
        }
    }

    const gotosteptwo = (id) => {
        setGiftId(id)
        getdetails(id)
    }

    const getdetails = async (i) => {
        showLoader()
        let data = { mstgiftcardsid: i, giftcarddetails: true }
        let response = await giftcardApi(data)
        if (response.success) {
            let { result } = response;
            let imagearray = result.imagearray
            let io = []
            for (let [i, img] of imagearray.entries()) {
                let obj = {}
                if (i == 0) {
                    obj = {
                        _id: img._id,
                        image: img.image,
                        active: true
                    }
                    setImage(img.image)
                } else {
                    obj = {
                        _id: img._id,
                        image: img.image,
                        active: false
                    }
                }
                io.push(obj)
            }
            setImageArray(io)
            let amountarray = result.amountarray
            let ao = []
            for (let [i, amt] of amountarray.entries()) {
                let obj = {}
                if (i == 0) {
                    obj = {
                        _id: amt._id,
                        amount: amt.amount,
                        active: true
                    }
                    setAmount(amt.amount)
                } else {
                    obj = {
                        _id: amt._id,
                        amount: amt.amount,
                        active: false
                    }
                }
                ao.push(obj)
            }
            setAmountArray(ao)
            setStep("2")
            hideLoader()
        } else {
            setImageArray([])
            setAmountArray([])
            setStep("2")
            hideLoader()
        }
    }

    const getImageChange = (val) => {
        let imagearr = [...imagearray]
        let io = []
        for (let [i, img] of imagearr.entries()) {
            let obj = {}
            if (i == val) {
                obj = {
                    _id: img._id,
                    image: img.image,
                    active: true
                }
                setImage(img.image)
            } else {
                obj = {
                    _id: img._id,
                    image: img.image,
                    active: false
                }
            }
            io.push(obj)
        }
        setImageArray(io)
    }

    const getAmountChange = (val) => {
        let amountarr = [...amountarray]
        let ao = []
        for (let [i, amt] of amountarr.entries()) {
            let obj = {}
            if (i == val) {
                obj = {
                    _id: amt._id,
                    amount: amt.amount,
                    active: true
                }
                setAmount(amt.amount)
            } else {
                obj = {
                    _id: amt._id,
                    amount: amt.amount,
                    active: false
                }
            }
            ao.push(obj)
        }
        setAmountArray(ao)
    }


    const buynowevent = () => {
        let err = 0
        setError(false)
        if (!senderName || !senderEmail || !recipientName || !recipientEmail || !recipientMessage) {
            setError(true)
            err++
        }
        if (err == 0) {
            showLoader()
            if (customamount) {
                settotalamount(customamount)
            } else {
                settotalamount(amount)
            }
            setStep("3")
            hideLoader()
        }
    }

    const makepayment = async (paydata) => {
        showLoader()
        let obj
        obj = {
            mstconsumerid: getLocalStorageData('consumer')?._id,
            mstgiftcardsid: giftid,
            amount: totalamount,
            image: image,
            senderName: senderName,
            senderEmail: senderEmail,
            recipientName: recipientName,
            recipientEmail: recipientEmail,
            recipientMessage: recipientMessage,
            card:card,
            buygiftcard: true,
        }

        if (paydata) {
            obj.paymentid = paydata.razorpaypaymentid
            obj.ordercreationid = paydata.ordercreationid
            obj.razorpaypaymentid = paydata.razorpaypaymentid
            obj.razorpayorderid = paydata.razorpayorderid
            obj.razorpaysignature = paydata.razorpaysignature
        }

        let response = await giftcardApi(obj)
        if (response.success) {
            hideLoader()
            var element = document.getElementById("successgiftbtn");
            element.click();
        } else {
            onMessage(response.message, false)
            hideLoader()
        }
    }

    const gotogift = (path) => {
        const image = document.getElementById('successgiftbtncls');
        image.click();
        setTimeout(() => {
            goto(path)
        }, 150);
    }

    return (
        <>
            {
                load ?
                    <>
                        {
                            step == "1" ?
                                <>
                                    <div className="gift-banner">
                                        <Image src={"/assets/img/gift-banner.png"} width={1200} height={100} alt="Gift Card Banner" />
                                    </div>
                                    <div className="gift-card-page">
                                        <div className="container">
                                            <div className="gift-card">
                                                <h3>Occasion Based Gift Cards</h3>
                                                <p>Lorem Ipsum is simply dummy text of Lorem Ipsum has been the text ever since the 1500s.Lorem
                                                    Ipsum is simply dummy text of Lorem Ipsum has been the text ever since the 1500s.Lorem
                                                    Ipsum is simply dummy text of Lorem Ipsum has been the text ever since the 1500s..</p>
                                            </div>
                                        </div>
                                        <div className="gift-card-box padding">
                                            <ul>
                                                {
                                                    list.length > 0 ?
                                                        <>
                                                            {
                                                                list.map((item, i) => (
                                                                    <li key={i}>
                                                                        <div className="gift-card-box-div">
                                                                            <Image
                                                                                src={"/upload/" + item.image}
                                                                                width={40}
                                                                                height={40}
                                                                                alt="Gift Card"
                                                                            />
                                                                            <div className="gift-card-box-txts">
                                                                                <strong>{item.title}</strong>
                                                                                <p>{item.description}</p>
                                                                                <button className="btn btn-gift" onClick={() => { gotosteptwo(item._id), setCard(item.title) }}>Buy Now</button>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                ))
                                                            }
                                                        </>
                                                        :
                                                        <></>
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </>
                                :
                                <></>
                        }
                        {
                            step == "2" ?
                                <>
                                    <div className="gift-card-single padding">
                                        <div className="gift-card-single-left">
                                            <div className="select-card">
                                                <p>Select your gift card</p>
                                                <ul>
                                                    {
                                                        imagearray.length > 0 && imagearray.map((item, i) => (
                                                            <li key={i} className={`${item.active ? "gft_actv" : ""}`}>
                                                                <div onClick={() => { getImageChange(i) }}>
                                                                    <Image
                                                                        src={"/upload/" + item.image}
                                                                        width={100}
                                                                        height={100}
                                                                        alt='no'
                                                                    />
                                                                </div>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                            <div className="select-amount">
                                                <p>Select your Amount</p>
                                                <ul>
                                                    {
                                                        amountarray.length > 0 && amountarray.map((item, i) => (
                                                            <li key={i} className={`${!customamount && item.active ? "gft_actv" : ""}`}>
                                                                <div onClick={() => { getAmountChange(i) }}>₹{item.amount}</div>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                            <div className="customr-details">
                                                <div className="row">
                                                    <div className="col-md-12 mb-3">
                                                        <label>Custom Amount</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Add Amount"
                                                            value={customamount}
                                                            onChange={(e) => { setCustomAmount(e.target.value) }}
                                                        />
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label>Sender Name</label>
                                                        <input
                                                            type="text"
                                                            className={`form-control ${error && !senderName ? "error-txt" : ""}`}
                                                            placeholder="Enter Sender Name"
                                                            value={senderName}
                                                            onChange={(e) => { setSenderName(e.target.value) }}
                                                        />
                                                        {
                                                            error && !senderName && <div className='input-error'>Please enter sender name</div>
                                                        }
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label>Sender Email Address</label>
                                                        <input
                                                            type="text"
                                                            className={`form-control ${error && !senderEmail ? "error-txt" : ""}`}
                                                            placeholder="Enter Sender Email Address"
                                                            value={senderEmail}
                                                            onChange={(e) => { setSenderEmail(e.target.value) }}
                                                        />
                                                        {
                                                            error && !senderEmail && <div className='input-error'>Please enter sender email</div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="receipent-details">
                                                <p>Recipient Details</p>
                                                <div className="receipent-details-list">
                                                    <div className="accordion" id="accordionExample">
                                                        <ul>
                                                            <li>
                                                                <div className="accordion-item">
                                                                    <h2 className="accordion-header">
                                                                        <button className="accordion-button " type="button"
                                                                            data-bs-toggle="collapse" data-bs-target="#collapseSix"
                                                                            aria-expanded="false" aria-controls="collapseSix">
                                                                            Recipient Name
                                                                        </button>
                                                                    </h2>
                                                                    <div id="collapseSix" className="accordion-collapse collapse show"
                                                                        data-bs-parent="#accordionExample">
                                                                        <div className="accordion-body">
                                                                            <div className="row">
                                                                                <div className="col-md-6">
                                                                                    <input
                                                                                        type="text"
                                                                                        className={`form-control ${error && !recipientName ? "error-txt" : ""}`}
                                                                                        placeholder="Add Name"
                                                                                        value={recipientName}
                                                                                        onChange={(e) => { setRecipientName(e.target.value) }}
                                                                                    />
                                                                                    {
                                                                                        error && !recipientName && <div className='input-error'>Please enter recipient name</div>
                                                                                    }
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    <input
                                                                                        type="text"
                                                                                        className={`form-control ${error && !recipientEmail ? "error-txt" : ""}`}
                                                                                        placeholder="Add Email Address"
                                                                                        value={recipientEmail}
                                                                                        onChange={(e) => { setRecipientEmail(e.target.value) }}
                                                                                    />
                                                                                    {
                                                                                        error && !recipientEmail && <div className='input-error'>Please enter recipient email</div>
                                                                                    }
                                                                                </div>
                                                                                <div className="col-md-12 mt-3">
                                                                                    <textarea
                                                                                        className={`form-control ${error && !recipientMessage ? "error-txt" : ""}`}
                                                                                        placeholder="Write message"
                                                                                        value={recipientMessage}
                                                                                        onChange={(e) => { setRecipientMessage(e.target.value) }}
                                                                                    ></textarea>
                                                                                    {
                                                                                        error && !recipientMessage && <div className='input-error'>Please enter recipient message</div>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <span className="add-acrod"><i className="bi bi-plus"></i></span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <button className="btn btn-gift" onClick={() => { buynowevent() }}>Buy Now</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="gift-card-single-right">
                                            <div className="gift-card-single-div">
                                                <h4>{card} Card</h4>
                                                <Image
                                                    src={"/upload/" + image}
                                                    width={300}
                                                    height={100}
                                                    alt="Gift Card Image"
                                                />
                                                <div className="card-single-right-amt">
                                                    <span>Gift Amount</span>
                                                    <strong>₹{customamount ? customamount : amount}</strong>
                                                </div>
                                                <div className="card-single-flex">
                                                    {
                                                        recipientName &&
                                                        <div className="card-single-left">
                                                            <span>Recipient Name</span>
                                                            <strong>{recipientName}</strong>
                                                        </div>
                                                    }
                                                    {
                                                        recipientEmail &&
                                                        <div className="card-single-right">
                                                            <span>Recipient Email</span>
                                                            <a>{recipientEmail}</a>
                                                        </div>
                                                    }
                                                </div>
                                                {
                                                    recipientMessage &&
                                                    <div className="card-single-rcpt">
                                                        <span>Recipient Message </span>
                                                        <p>{recipientMessage}</p>
                                                    </div>
                                                }

                                                <p className="card-expr">Gift Card Validity:
                                                    <strong>6 months</strong> (from the date of purchase)
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                </>
                        }
                        {
                            step == "3" ?
                                <div className='gift-payment'>
                                    <h4>Gift Card Payment</h4>
                                    <div className="stp-payment-div">
                                        <div className="myaccnt my-3">
                                            <div className="myaccnt-left">

                                                <nav>
                                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">

                                                        {/* Multiple Payment Service */}
                                                        <button
                                                            className="nav-link active"
                                                            id="multi-payment-tab"
                                                            data-bs-toggle="tab"
                                                            data-bs-target="#multi-payment"
                                                            type="button"
                                                            role="tab"
                                                            aria-controls="multi-payment"
                                                            aria-selected="true"
                                                        >
                                                            <Image src={"/assets/img/multiple-payment.png"} width={100} height={100} alt='pi' />
                                                            <div className="upi-div"><strong>Multiple Payment Service</strong> <p>All Cards, UPI, EMI, Wallets & More</p></div>
                                                        </button>
                                                    </div>

                                                </nav>

                                            </div>
                                            <div className="myaccnt-right">
                                                <div className="tab-content" id="nav-tabContent">
                                                    <div className="tab-pane fade show active" id="multi-payment" role="tabpanel" aria-labelledby="multi-payment-tab"
                                                        tabIndex="0">
                                                        <div className="upi-dv">
                                                            <div className='py-txt mb-3'><Image src={"/assets/img/razorpay-icon.png"} width={30} height={30} alt='pi' /><h4>Razor Pay</h4></div>
                                                            <p>For safe, contactless and hassle free delivery, pay using card/wallet/netbanking</p>
                                                            <RazorpaypaymentinterfaceGiftCard totalamount={totalamount} paymentdescription={paymentdescription} makepayment={makepayment} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <></>
                        }
                    </>
                    :
                    <></>
            }

            <a id="successgiftbtn" data-bs-toggle="modal" data-bs-target="#successgift" style={{ display: "none" }} >Success</a>

            <div className="modal fade" id="successgift" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button id="successgiftbtncls" style={{ display: "none" }} type="button" className="close-button abslt" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg"></i></button>
                            <div className="success-ord">
                                <div className="success-ord-inr">
                                    <span><Image src={"/assets/img/verified-icn.png"} width={100} height={100} alt='nocart' /></span>
                                    <strong>Your gift card <br />
                                        purchase successfully</strong>
                                    <button className="btn btn-vw-ordr" onClick={() => { gotogift('/myaccount?tab=my-giftcrd-tab') }} >View Gift Card</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

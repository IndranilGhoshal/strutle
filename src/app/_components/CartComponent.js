'use client'
import React, { useContext, useEffect, useState } from 'react'
import { getLocalStorageData, hideLoader, removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { cartapi, orderapi, productapi, shippingaddressapi } from '../lib/apiService'
import AddAddressModal from './_modal/AddAddressModal'
import { toast, ToastContainer } from 'react-toastify'
import { AppContext } from '../consumer/layout'
import moment from 'moment'
import ManageAddressComponent from './ManageAddressComponent'
import Razorpaypaymentinterface from './_paymentinterfaces/Razorpaypaymentinterface'
import { Modal } from 'react-bootstrap'

export default function CartComponent() {
    const { setCartCount } = useContext(AppContext);
    const router = useRouter()
    const searchparams = useSearchParams();
    const [isLoad, setIsLoad] = useState(false)
    const [isSearchLoad, setISearchLoad] = useState(false)
    const [isAddressLoad, setIsAddressLoad] = useState(false)
    const [list, setList] = useState([])
    const [savelaterlist, setSavelaterList] = useState([])
    const [step, setStep] = useState('0')

    const [addressarray, setAddressArray] = useState([])

    const [subtotal, setSubTotal] = useState(0)
    const [totaldiscount, setTotaldiscount] = useState(0)
    const [couponamount, setCouponamount] = useState(0)
    const [deliveryamount, setDeliveryamount] = useState(0)
    const [totalamount, setTotalamount] = useState(0)

    const [ordertype, setOrdertype] = useState("General")
    const [paymenttype, setPaymenttype] = useState('COD')
    const [paymentstatus, setPaymentstatus] = useState('Pending')


    const [paymentdescription, setPaymentdescription] = useState('Product Purchase')

    const search = searchparams.get('type')


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(() => {
        if (getLocalStorageData('consumer')?._id) {
            if (search == "cart") {
                getcartdata()
                getpricedata()
                getsavelatercartdata()
                setStep('1')
                router.push("/consumer/cart?type=" + search);
            } else {
                setStep('2')
                getAddressData()
                getbuynowpricedata()
                setIsLoad(true)
                router.push("/consumer/cart?type=" + search);
            }
        } else {
            router.push("/consumer");
        }
    }, [])

    const goto = (path) => {
        showLoader()
        router.push("/consumer" + path)
        removeLocalStorageData("pathName")
        setLocalStorageData('pathName', path)
    }

    const getcartdata = async () => {
        showLoader()
        let response = await cartapi({ mstconsumerid: getLocalStorageData('consumer')?._id, cartlist: true })
        if (response.success) {
            setList(response.result)
            if (response.result.length == 0) {
                var element = document.getElementById("consumerid");
                element.classList.add("emtcrt");
            }
            setIsLoad(true)
            hideLoader()
        } else {
            setList([])
            setIsLoad(true)
            hideLoader()
        }
    }

    const getsavelatercartdata = async () => {
        showLoader()
        let response = await cartapi({ mstconsumerid: getLocalStorageData('consumer')?._id, cartlaterlist: true })
        if (response.success) {
            setSavelaterList(response.result)
            setIsLoad(true)
            hideLoader()
        } else {
            setSavelaterList([])
            setIsLoad(true)
            hideLoader()
        }
    }

    const getpricedata = async () => {
        showLoader()
        let response = await cartapi({ mstconsumerid: getLocalStorageData('consumer')?._id, pricesummary: true })
        if (response.success) {
            let { result } = response
            setSubTotal(result.subtotal)
            setTotaldiscount(result.totaldiscount)
            setCouponamount(result.couponamount)
            setDeliveryamount(result.deliveryamount)
            setTotalamount(result.totalamount)
            hideLoader()
        } else {
            setSubTotal(0)
            setTotaldiscount(0)
            setCouponamount(0)
            setDeliveryamount(0)
            setTotalamount(0)
            hideLoader()
        }
    }

    const onMessage = async (mes, sus) => {
        if (sus) {
            toast.success(mes)
            getAddressData()
        } else {
            toast.error(mes)
            getAddressData()
        }
    }

    const getAddressData = async () => {
        showLoader()
        let response = await shippingaddressapi({ mstconsumerid: getLocalStorageData('consumer')?._id, addresslist: true })
        if (response.success) {
            setAddressArray(response.result)
            setIsAddressLoad(true)
            hideLoader()
        } else {
            setAddressArray([])
            setIsAddressLoad(true)
            hideLoader()
        }
    }

    const addressdefaultChange = async (aid) => {
        showLoader()
        let response = await shippingaddressapi({ id: aid, mstconsumerid: getLocalStorageData('consumer')?._id, isdefault: "1", ondefault: true })
        if (response.success) {
            onMessage(response.message, true)
            getAddressData()
            hideLoader()
        } else {
            onMessage(response.message, false)
            getAddressData()
            hideLoader()
        }
    }

    const addressDelete = async (aid) => {
        showLoader()
        let response = await shippingaddressapi({ id: aid, mstconsumerid: getLocalStorageData('consumer')?._id, status: "1", ondelete: true })
        if (response.success) {
            onMessage(response.message, true)
            getAddressData()
            hideLoader()
        } else {
            onMessage(response.message, false)
            getAddressData()
            hideLoader()
        }
    }

    const addsavelater = async (item) => {
        showLoader()
        let response = await cartapi({ id: item._id, saveaslater: item.saveaslater == "0" ? "1" : "0", addsavelatercart: true })
        if (response.success) {
            setTimeout(() => {
                onMessage(response.message, true)
            }, 150);
            getcartdata()
            getsavelatercartdata()
            getcartcountdata()
            getpricedata()
            hideLoader()
        } else {
            onMessage(response.message, false)
            getcartdata()
            getsavelatercartdata()
            getcartcountdata()
            getpricedata()
            hideLoader()
        }
    }

    const deleteItem = async (item) => {
        showLoader()
        let response = await cartapi({ id: item._id, ondelete: true })
        if (response.success) {
            setTimeout(() => {
                onMessage(response.message, true)
            }, 150);
            getcartdata()
            getsavelatercartdata()
            getpricedata()
            getcartcountdata()
            hideLoader()
        } else {
            onMessage(response.message, false)
            getcartdata()
            getsavelatercartdata()
            getpricedata()
            getcartcountdata()
            hideLoader()
        }
    }

    const getcartcountdata = async () => {
        let response = await cartapi({ mstconsumerid: getLocalStorageData('consumer')?._id, cartcount: true })
        if (response.success) {
            setCartCount(response.result)
        } else {
            setCartCount(0)
        }
    }

    const incresedecreseItem = async (item, val) => {
        showLoader()
        let data = { id: item._id, incresedecresecart: true }
        if (val) {
            data.increse = true
        } else {
            data.decrese = true
        }
        let response = await cartapi(data)
        if (response.success) {
            setTimeout(() => {
                onMessage(response.message, true)
            }, 150);
            getcartdata()
            getsavelatercartdata()
            getpricedata()
            getcartcountdata()
        } else {
            onMessage(response.message, false)
            getcartdata()
            getsavelatercartdata()
            getpricedata()
            getcartcountdata()
        }
    }

    const setStepEvent = (val) => {
        if (val == "2") {
            getAddressData()
        }
        setStep(val)
    }

    const makeorder = async (paydata) => {
        showLoader()
        let obj
        let producttemp
        let addresstemp = [...addressarray]
        let aid
        for (let a of addresstemp) {
            if (a.isdefault == "1") {
                aid = a._id
            }
        }
        if (search == "cart") {
            producttemp = [...list]
            let parray = []
            for (let p of producttemp) {
                let data = {
                    _id: p.mstproductid,
                    productquantity: p.productquantity,
                    productmrp: Number(p.productmrp),
                    productnetamount: Number(p.productquantity) * Number(p.productnetprice),
                    productdiscount: p.productdiscount
                }
                parray.push(data)
            }

            obj = {
                mstconsumerid: getLocalStorageData('consumer')?._id,
                mstconsumershippingaddressesid: aid,
                ordertype: ordertype,
                orderamount: totalamount,
                product: parray,
                paymentamount: totalamount,
                addorder: true,
            }

            if (paydata) {
                obj.paymentid = paydata.razorpaypaymentid
                obj.ordercreationid = paydata.ordercreationid
                obj.razorpaypaymentid = paydata.razorpaypaymentid
                obj.razorpayorderid = paydata.razorpayorderid
                obj.razorpaysignature = paydata.razorpaysignature
            }
        } else {
            let parray = []
            let product = await productapi({ id: search, mstconsumerid: getLocalStorageData('consumer')?._id, productdetails: true })
            if (product.success) {
                const { result } = product;
                let data = {
                    _id: result._id,
                    productquantity: 1,
                    productmrp: 1 * Number(result.productmrp),
                    productnetamount: Number(result.productdiscount) !== 0 ? 1 * ((Number(result.productdiscount) / 100) * Number(result.productmrp)) : Number(result.productmrp),
                    productdiscount: Number(result.productdiscount)
                }
                parray.push(data)
            }
            obj = {
                mstconsumerid: getLocalStorageData('consumer')?._id,
                mstconsumershippingaddressesid: aid,
                ordertype: ordertype,
                orderamount: totalamount,
                product: parray,
                paymentamount: totalamount,
                addorder: true,
            }

            if (paydata) {
                obj.paymentid = paydata.razorpaypaymentid
                obj.ordercreationid = paydata.ordercreationid
                obj.razorpaypaymentid = paydata.razorpaypaymentid
                obj.razorpayorderid = paydata.razorpayorderid
                obj.razorpaysignature = paydata.razorpaysignature
            }
        }

        let response = await orderapi(obj)
        if (response.success) {
            if (search == "cart") {
                let ptemp = producttemp
                for (let [i, p] of ptemp.entries()) {
                    let res = await cartapi({ id: p._id, onorder: true })
                    if (i === ptemp.length - 1) {
                        setIsLoad(false)
                        setIsAddressLoad(false)
                        getcartdata()
                        getpricedata()
                        getsavelatercartdata()
                        setStep("1")
                        getcartcountdata()
                        hideLoader()
                        setShow(true)
                    }
                }
            } else {
                setISearchLoad(false)
                getbuynowpricedata()
                setShow(true)
                hideLoader()
            }
        } else {
            onMessage(response.message, false)
            hideLoader()
        }
    }

    const gotoorder = (path) => {
        handleClose()
        setTimeout(() => {
            goto(path)
        }, 150);
    }

    const getbuynowpricedata = async () => {
        showLoader()
        let response = await cartapi({ id: search, buynowpricesummary: true })
        if (response.success) {
            let { result } = response
            setSubTotal(result.subtotal)
            setTotaldiscount(result.totaldiscount)
            setCouponamount(result.couponamount)
            setDeliveryamount(result.deliveryamount)
            setTotalamount(result.totalamount)
            hideLoader()
        } else {
            setSubTotal(0)
            setTotaldiscount(0)
            setCouponamount(0)
            setDeliveryamount(0)
            setTotalamount(0)
            hideLoader()
        }
    }

    return (
        <>
            {
                isLoad ?
                    <>
                        <div className="cart-page padding">
                            {
                                isSearchLoad ?
                                    <></>
                                    :
                                    <>

                                        {
                                            search !== "cart" ?
                                                <>
                                                    <div className="card-pg-out">
                                                        <div className="cart-step">
                                                            {/* Step 1 */}
                                                            <div className={`cart-step-ind ${step == "1" ? "active" : ""}`}>
                                                                <span className="cart-step-icn"><Image src={"/assets/img/crd-icn1.png"} width={40} height={40} alt='noimg' /></span>
                                                                <div className="cart-step-txt">
                                                                    <p>Step 1</p>
                                                                    <strong>Cart</strong>
                                                                </div>
                                                            </div>
                                                            {/* Step 2 */}
                                                            <div className={`cart-step-ind ${step == "2" ? "active" : ""}`}>
                                                                <span className="cart-step-icn"><Image src={"/assets/img/crd-icn2.png"} width={40} height={40} alt='noimg' /></span>
                                                                <div className="cart-step-txt">
                                                                    <p>Step 2</p>
                                                                    <strong>Shipping</strong>
                                                                </div>
                                                            </div>
                                                            {/* Step 3 */}
                                                            <div className={`cart-step-ind ${step == "3" ? "active" : ""}`}>
                                                                <span className="cart-step-icn"><Image src={"/assets/img/crd-icn3.png"} width={40} height={40} alt='noimg' /></span>
                                                                <div className="cart-step-txt">
                                                                    <p>Step 3</p>
                                                                    <strong>Payment</strong>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="cart-lists">

                                                            <div className="step-process-div">
                                                                {
                                                                    step == "1" && list.length > 0 ? <p>My Cart <span>({list.length} items)</span></p> : <></>
                                                                }
                                                                {
                                                                    step == "3" && list.length > 0 ? <h5>Select Payment Mode</h5> : <></>
                                                                }
                                                                {
                                                                    step == "1" && list.length == 0 && savelaterlist.length > 0 ? <p>Save For Later<span>({savelaterlist.length} items)</span></p> : <></>
                                                                }
                                                                <div className="cart-lists-div-inr">
                                                                    <div className="cart-lists-left">
                                                                        {/* Step 2 */}
                                                                        {
                                                                            step == "2" ?
                                                                                <div className="stp-addrs-div">
                                                                                    <div className="tab-headng">
                                                                                        <h4>Shipping Address</h4><AddAddressModal onMessage={onMessage} addressarray={addressarray} getAddressData={getAddressData} />
                                                                                    </div>
                                                                                    <ManageAddressComponent
                                                                                        isAddressLoad={isAddressLoad}
                                                                                        addressarray={addressarray}
                                                                                        addressdefaultChange={addressdefaultChange}
                                                                                        addressDelete={addressDelete}
                                                                                        onMessage={onMessage}
                                                                                        getAddressData={getAddressData}
                                                                                    />

                                                                                </div>
                                                                                :
                                                                                <></>
                                                                        }

                                                                        {/* Step 3 */}
                                                                        {
                                                                            step == "3" ?
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

                                                                                                    {/* Cash on Delivery */}
                                                                                                    <button
                                                                                                        className="nav-link"
                                                                                                        id="cash-tab"
                                                                                                        data-bs-toggle="tab"
                                                                                                        data-bs-target="#cash"
                                                                                                        type="button"
                                                                                                        role="tab"
                                                                                                        aria-controls="cash"
                                                                                                        aria-selected="false"
                                                                                                    >
                                                                                                        <Image src={"/assets/img/cod.png"} width={100} height={100} alt='pi' />
                                                                                                        <div className="upi-div"><strong>Cash on Delivery</strong> <p>Pay at your doorstep</p></div>
                                                                                                    </button>

                                                                                                    {/* EMI */}
                                                                                                    <button
                                                                                                        className="nav-link"
                                                                                                        id="emi-tab"
                                                                                                        data-bs-toggle="tab"
                                                                                                        data-bs-target="#emi"
                                                                                                        type="button"
                                                                                                        role="tab"
                                                                                                        aria-controls="emi"
                                                                                                        aria-selected="false"
                                                                                                    >
                                                                                                        <Image src={"/assets/img/emi-icon.png"} width={100} height={100} alt='pi' />
                                                                                                        <div className="upi-div"><strong>EMI</strong> <p>Buy now pay later</p></div>
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
                                                                                                        <Razorpaypaymentinterface totalamount={totalamount} paymentdescription={paymentdescription} addressarray={addressarray} makeorder={makeorder} />
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="tab-pane fade" id="cash" role="tabpanel" aria-labelledby="cash-tab" tabIndex="0">
                                                                                                    <div className="cod-div">
                                                                                                        <h4>Cash on Delivery (COD)</h4>
                                                                                                        <div className="off-pay"><p><strong>₹50</strong> will be charged addition for Cash on Delivery <a href="">What's this?</a></p></div>
                                                                                                        <p>For safe, contactless and hassle free delivery, pay using card/wallet/netbanking</p>
                                                                                                        <button className="btn btn-plcordr" onClick={() => { makeorder({}) }}>Place Order</button>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="tab-pane fade" id="emi" role="tabpanel" aria-labelledby="emi-tab" tabIndex="0">
                                                                                                    <div className="cod-div">
                                                                                                        <h4>EMI</h4>
                                                                                                        <p>&nbsp;</p>
                                                                                                        <button className="btn btn-plcordr">Place Order</button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                :
                                                                                <>
                                                                                </>
                                                                        }
                                                                    </div>

                                                                    {/* Side Nav */}
                                                                    <div className="cart-lists-right">
                                                                        <div className="pric-sum">
                                                                            <h4>Price Summary</h4>
                                                                            <ul>
                                                                                <li><span>Total MRP</span><strong>₹{subtotal}</strong></li>
                                                                                <li><span>Discount</span><strong className="text-green">-₹{totaldiscount}</strong></li>
                                                                                <li><span>Coupon Saving</span><strong className="text-green">-₹{couponamount}</strong></li>
                                                                                <li><span>Delivery Fee</span><strong><del>₹{deliveryamount}</del></strong></li>
                                                                            </ul>
                                                                            <div className="pricsum-pric">
                                                                                <p><span>Order Total</span><strong>₹{totalamount}</strong></p>
                                                                            </div>
                                                                            {
                                                                                step == "1" ? <button className="btn btn-toship" onClick={() => { setStepEvent("2") }} disabled={list.length == 0} >Proceed to Shipping <i className="bi bi-arrow-right-short"></i></button> : <></>
                                                                            }
                                                                            {
                                                                                step == "2" ? <button className="btn btn-toship" onClick={() => { setStepEvent("3") }} disabled={addressarray.length == 0}>Go to Checkout <i className="bi bi-arrow-right-short"></i></button> : <></>
                                                                            }
                                                                            {
                                                                                step == "1" || step == "2" ? <button className="btn btn-contship" onClick={() => { goto("/") }}>Continue Shopping</button> : <></>
                                                                            }
                                                                        </div>
                                                                        {
                                                                            step == "1" || step == "2" ?
                                                                                <div className="have-coup">
                                                                                    <h4>Have a Coupon?</h4>
                                                                                    <div className="apply-cop">
                                                                                        <i className="bi bi-tag-fill"></i>
                                                                                        <input className="form-control" type="text" placeholder="Add coupon code" />
                                                                                        <button className="btn btn-apply">Apply</button>
                                                                                    </div>
                                                                                    <div className="select-coupn">

                                                                                        <div className="select-coupn-div">
                                                                                            <div className="select-radio"><input type="radio" /></div>
                                                                                            <div className="select-coupn-txt"><strong>NEW400</strong>
                                                                                                <p>Get Flat 400 off on cart value of 2590 & above. Download the app to get Flat 500 off.</p>
                                                                                                <p>Savings : ₹400.00</p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="select-coupn-div">
                                                                                            <div className="select-radio"><input type="radio" /></div>
                                                                                            <div className="select-coupn-txt"><strong>NEW400</strong>
                                                                                                <p>Get Flat 400 off on cart value of 2590 & above. Download the app to get Flat 500 off.</p>
                                                                                                <p>Savings : ₹400.00</p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="select-coupn-div">
                                                                                            <div className="select-radio"><input type="radio" /></div>
                                                                                            <div className="select-coupn-txt"><strong>NEW400</strong>
                                                                                                <p>Get Flat 400 off on cart value of 2590 & above. Download the app to get Flat 500 off.</p>
                                                                                                <p>Savings : ₹400.00</p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="select-coupn-div">
                                                                                            <div className="select-radio"><input type="radio" /></div>
                                                                                            <div className="select-coupn-txt"><strong>NEW400</strong>
                                                                                                <p>Get Flat 400 off on cart value of 2590 & above. Download the app to get Flat 500 off.</p>
                                                                                                <p>Savings : ₹400.00</p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                :
                                                                                <></>
                                                                        }
                                                                        {/* <div className="usemony">
                                                    <h4>Use Srutle Money</h4>
                                                    <p>Lorem Ipsum is simply dummy text of the printing and industry. </p>
                                                    <div className="totl-use">
                                                        <p>Total Balance : <span>₹4000.00</span></p>
                                                        <button className="btn btn-use">Use</button>
                                                    </div>
                                                </div> */}
                                                                        {
                                                                            step == "3" && addressarray.length > 0 ?
                                                                                <>
                                                                                    {
                                                                                        addressarray && addressarray.map((item, i) => (
                                                                                            <div key={i}>
                                                                                                {
                                                                                                    item.isdefault == "1" ?
                                                                                                        <div className="avl-offr-inr-div">
                                                                                                            <div className="my-addres">
                                                                                                                <h4>Shipping Address</h4>
                                                                                                                <div>
                                                                                                                    <div className="shipng-ad"><strong>{item.name}</strong><span className="ad-hm">{item.addresstype}</span></div>
                                                                                                                    <p className="m-0">{item.building}, {item.locality}</p>
                                                                                                                    <p className="m-0">{item.district}, {item.state}</p>
                                                                                                                    <p className="m-0">Pin Code: {item.pincode}</p>
                                                                                                                    <p>Contact - Mobile : {item.phone}</p>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        :
                                                                                                        <></>
                                                                                                }
                                                                                            </div>
                                                                                        ))
                                                                                    }
                                                                                </>
                                                                                :
                                                                                <>

                                                                                </>
                                                                        }

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    {
                                                        list.length > 0 || savelaterlist.length > 0 ?
                                                            <>
                                                                <div className="card-pg-out">
                                                                    <div className="cart-step">
                                                                        {/* Step 1 */}
                                                                        <div className={`cart-step-ind ${step == "1" ? "active" : ""}`}>
                                                                            <span className="cart-step-icn"><Image src={"/assets/img/crd-icn1.png"} width={40} height={40} alt='noimg' /></span>
                                                                            <div className="cart-step-txt">
                                                                                <p>Step 1</p>
                                                                                <strong>Cart</strong>
                                                                            </div>
                                                                        </div>
                                                                        {/* Step 2 */}
                                                                        <div className={`cart-step-ind ${step == "2" ? "active" : ""}`}>
                                                                            <span className="cart-step-icn"><Image src={"/assets/img/crd-icn2.png"} width={40} height={40} alt='noimg' /></span>
                                                                            <div className="cart-step-txt">
                                                                                <p>Step 2</p>
                                                                                <strong>Shipping</strong>
                                                                            </div>
                                                                        </div>
                                                                        {/* Step 3 */}
                                                                        <div className={`cart-step-ind ${step == "3" ? "active" : ""}`}>
                                                                            <span className="cart-step-icn"><Image src={"/assets/img/crd-icn3.png"} width={40} height={40} alt='noimg' /></span>
                                                                            <div className="cart-step-txt">
                                                                                <p>Step 3</p>
                                                                                <strong>Payment</strong>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="cart-lists">

                                                                        <div className="step-process-div">
                                                                            {
                                                                                step == "1" && list.length > 0 ? <p>My Cart <span>({list.length} items)</span></p> : <></>
                                                                            }
                                                                            {
                                                                                step == "3" && list.length > 0 ? <h5>Select Payment Mode</h5> : <></>
                                                                            }
                                                                            {
                                                                                step == "1" && list.length == 0 && savelaterlist.length > 0 ? <p>Save For Later<span>({savelaterlist.length} items)</span></p> : <></>
                                                                            }
                                                                            <div className="cart-lists-div-inr">
                                                                                <div className="cart-lists-left">
                                                                                    {/* Step 1 */}
                                                                                    {
                                                                                        step == "1" ?
                                                                                            <>
                                                                                                {/* cart */}
                                                                                                {
                                                                                                    list.length > 0 ?
                                                                                                        <>
                                                                                                            <div className="stp-cart-div">
                                                                                                                <ul>
                                                                                                                    {
                                                                                                                        list.map((item, i) => (
                                                                                                                            <li key={i}>
                                                                                                                                <div className="card-img"><Image src={"/upload/" + item.productimage} width={100} height={100} alt='noimg' /></div>
                                                                                                                                <div className="card-pro-dtl">
                                                                                                                                    <div className="prod-nme-top">
                                                                                                                                        <div className="prod-nme">
                                                                                                                                            <h4 className='name-txt-wp'>{item.productname}</h4>
                                                                                                                                            <p className='des-txt-wp'>{item.producttitledescription}</p>
                                                                                                                                            <div className="colr-siz">
                                                                                                                                                <p><span>Color :</span> {item.color}</p>
                                                                                                                                                <p>&nbsp;</p>
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                        <div className="prod-pric">
                                                                                                                                            <h4>₹{Number(item.productquantity) * Number(item.productnetprice)} {item.productdiscount > 0 ? <span>{item.productdiscount}% Off</span> : <></>}</h4>
                                                                                                                                            <p>MRP <var className='mx-1'>
                                                                                                                                                {
                                                                                                                                                    item.productdiscount > 0 ? <del>₹{Number(item.productquantity) * Number(item.productmrp)}</del> : <>₹{Number(item.productquantity) * Number(item.productmrp)}</>
                                                                                                                                                }
                                                                                                                                            </var>
                                                                                                                                                Inclusive of all taxes</p>
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                    <div className="prod-qnt-locn">
                                                                                                                                        <div className="prod-qnt">
                                                                                                                                            <div className="quantity">
                                                                                                                                                <button className="minus" aria-label="Decrease" onClick={() => { incresedecreseItem(item, false) }} disabled={item.productquantity == 1}>-</button>
                                                                                                                                                <input type="number" className="input-box" value={item.productquantity} readOnly={true} onChange={() => { }} />
                                                                                                                                                <button className="plus" aria-label="Increase" onClick={() => { incresedecreseItem(item, true) }} disabled={item.productquantity == 10}>+</button>
                                                                                                                                            </div>
                                                                                                                                            <button className="btn btn-dlt" onClick={() => { deleteItem(item) }}><i className="bi bi-trash"></i></button>
                                                                                                                                            <button className="btn btn-save-ltr" onClick={() => { addsavelater(item) }}>Save For Later</button>
                                                                                                                                        </div>
                                                                                                                                        <div className="prod-lcn">
                                                                                                                                            <p>Delivery to <strong>Kolkata</strong></p>
                                                                                                                                            <p>Delivery by <strong>4 Nov, Monday</strong></p>
                                                                                                                                        </div>

                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </li>
                                                                                                                        ))
                                                                                                                    }

                                                                                                                </ul>
                                                                                                            </div>
                                                                                                        </>
                                                                                                        :
                                                                                                        <></>
                                                                                                }

                                                                                                {/* save later */}
                                                                                                {
                                                                                                    savelaterlist.length > 0 ?
                                                                                                        <>
                                                                                                            <div className="stp-cart-div">
                                                                                                                {
                                                                                                                    list.length > 0 ? <p>Save For Later<span>({savelaterlist.length} items)</span></p> : <></>
                                                                                                                }
                                                                                                                <ul>
                                                                                                                    {
                                                                                                                        savelaterlist.map((item, i) => (
                                                                                                                            <li key={i}>
                                                                                                                                <div className="card-img"><Image src={"/upload/" + item.productimage} width={100} height={100} alt='noimg' /></div>
                                                                                                                                <div className="card-pro-dtl">
                                                                                                                                    <div className="prod-nme-top">
                                                                                                                                        <div className="prod-nme">
                                                                                                                                            <h4 className='name-txt-wp'>{item.productname}</h4>
                                                                                                                                            <p className='des-txt-wp'>{item.producttitledescription}</p>
                                                                                                                                            <div className="colr-siz">
                                                                                                                                                <p><span>Color :</span> {item.color}</p>
                                                                                                                                                <p>&nbsp;</p>
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                        <div className="prod-pric">
                                                                                                                                            <h4>₹{Number(item.productquantity) * Number(item.productnetprice)} {item.productdiscount > 0 ? <span>{item.productdiscount}% Off</span> : <></>}</h4>
                                                                                                                                            <p>MRP <var className='mx-1'>
                                                                                                                                                {
                                                                                                                                                    item.productdiscount > 0 ? <del>₹{Number(item.productquantity) * Number(item.productmrp)}</del> : <>₹{Number(item.productquantity) * Number(item.productmrp)}</>
                                                                                                                                                }
                                                                                                                                            </var>
                                                                                                                                                Inclusive of all taxes</p>
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                    <div className="prod-qnt-locn">
                                                                                                                                        <div className="prod-qnt">
                                                                                                                                            <div className="quantity">
                                                                                                                                                <button className="minus" aria-label="Decrease" onClick={() => { incresedecreseItem(item, false) }} disabled={item.productquantity == 1}>-</button>
                                                                                                                                                <input type="number" className="input-box" value={item.productquantity} readOnly={true} onChange={() => { }} />
                                                                                                                                                <button className="plus" aria-label="Increase" onClick={() => { incresedecreseItem(item, true) }} disabled={item.productquantity == 10}>+</button>
                                                                                                                                            </div>
                                                                                                                                            <button className="btn btn-dlt" onClick={() => { deleteItem(item) }} ><i className="bi bi-trash"></i></button>
                                                                                                                                            <button className="btn btn-save-ltr" onClick={() => { addsavelater(item) }}>Move to Cart</button>
                                                                                                                                        </div>
                                                                                                                                        <div className="prod-lcn">
                                                                                                                                            <p>Delivery to <strong>Kolkata</strong></p>
                                                                                                                                            <p>Delivery by <strong>4 Nov, Monday</strong></p>
                                                                                                                                        </div>

                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </li>
                                                                                                                        ))
                                                                                                                    }
                                                                                                                </ul>
                                                                                                            </div>
                                                                                                        </>
                                                                                                        :
                                                                                                        <></>
                                                                                                }
                                                                                            </>
                                                                                            :
                                                                                            <></>
                                                                                    }
                                                                                    {/* Step 2 */}
                                                                                    {
                                                                                        step == "2" ?
                                                                                            <div className="stp-addrs-div">
                                                                                                <div className="tab-headng">
                                                                                                    <h4>Shipping Address</h4><AddAddressModal onMessage={onMessage} addressarray={addressarray} getAddressData={getAddressData} />
                                                                                                </div>
                                                                                                <ManageAddressComponent
                                                                                                    isAddressLoad={isAddressLoad}
                                                                                                    addressarray={addressarray}
                                                                                                    addressdefaultChange={addressdefaultChange}
                                                                                                    addressDelete={addressDelete}
                                                                                                    onMessage={onMessage}
                                                                                                    getAddressData={getAddressData}
                                                                                                />

                                                                                            </div>
                                                                                            :
                                                                                            <></>
                                                                                    }

                                                                                    {/* Step 3 */}
                                                                                    {
                                                                                        step == "3" ?
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

                                                                                                                {/* Cash on Delivery */}
                                                                                                                <button
                                                                                                                    className="nav-link"
                                                                                                                    id="cash-tab"
                                                                                                                    data-bs-toggle="tab"
                                                                                                                    data-bs-target="#cash"
                                                                                                                    type="button"
                                                                                                                    role="tab"
                                                                                                                    aria-controls="cash"
                                                                                                                    aria-selected="false"
                                                                                                                >
                                                                                                                    <Image src={"/assets/img/cod.png"} width={100} height={100} alt='pi' />
                                                                                                                    <div className="upi-div"><strong>Cash on Delivery</strong> <p>Pay at your doorstep</p></div>
                                                                                                                </button>

                                                                                                                {/* EMI */}
                                                                                                                <button
                                                                                                                    className="nav-link"
                                                                                                                    id="emi-tab"
                                                                                                                    data-bs-toggle="tab"
                                                                                                                    data-bs-target="#emi"
                                                                                                                    type="button"
                                                                                                                    role="tab"
                                                                                                                    aria-controls="emi"
                                                                                                                    aria-selected="false"
                                                                                                                >
                                                                                                                    <Image src={"/assets/img/emi-icon.png"} width={100} height={100} alt='pi' />
                                                                                                                    <div className="upi-div"><strong>EMI</strong> <p>Buy now pay later</p></div>
                                                                                                                </button>
                                                                                                            </div>

                                                                                                        </nav>

                                                                                                    </div>
                                                                                                    <div className="myaccnt-right">
                                                                                                        <div className="tab-content" id="nav-tabContent">
                                                                                                            <div className="tab-pane fade show active" id="multi-payment" role="tabpanel" aria-labelledby="multi-payment-tab"
                                                                                                                tabIndex="0">
                                                                                                                <div className="upi-dv">
                                                                                                                    <p>For safe, contactless and hassle free delivery, pay using card/wallet/netbanking</p>
                                                                                                                    <Razorpaypaymentinterface totalamount={totalamount} paymentdescription={paymentdescription} addressarray={addressarray} makeorder={makeorder} />
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="tab-pane fade" id="cash" role="tabpanel" aria-labelledby="cash-tab" tabIndex="0">
                                                                                                                <div className="cod-div">
                                                                                                                    <h4>Cash on Delivery (COD)</h4>
                                                                                                                    <div className="off-pay"><p><strong>₹50</strong> will be charged addition for Cash on Delivery <a href="">What's this?</a></p></div>
                                                                                                                    <p>For safe, contactless and hassle free delivery, pay using card/wallet/netbanking</p>
                                                                                                                    <button className="btn btn-plcordr" onClick={() => { makeorder({}) }}>Place Order</button>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="tab-pane fade" id="emi" role="tabpanel" aria-labelledby="emi-tab" tabIndex="0">
                                                                                                                <div className="cod-div">
                                                                                                                    <h4>EMI</h4>
                                                                                                                    <p>&nbsp;</p>
                                                                                                                    <button className="btn btn-plcordr">Place Order</button>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            :
                                                                                            <>
                                                                                            </>
                                                                                    }
                                                                                </div>

                                                                                {/* Side Nav */}
                                                                                <div className="cart-lists-right">
                                                                                    <div className="pric-sum">
                                                                                        <h4>Price Summary</h4>
                                                                                        <ul>
                                                                                            <li><span>Total MRP</span><strong>₹{subtotal}</strong></li>
                                                                                            <li><span>Discount</span><strong className="text-green">-₹{totaldiscount}</strong></li>
                                                                                            <li><span>Coupon Saving</span><strong className="text-green">-₹{couponamount}</strong></li>
                                                                                            <li><span>Delivery Fee</span><strong><del>₹{deliveryamount}</del></strong></li>
                                                                                        </ul>
                                                                                        <div className="pricsum-pric">
                                                                                            <p><span>Order Total</span><strong>₹{totalamount}</strong></p>
                                                                                        </div>
                                                                                        {
                                                                                            step == "1" ? <button className="btn btn-toship" onClick={() => { setStepEvent("2") }} disabled={list.length == 0} >Proceed to Shipping <i className="bi bi-arrow-right-short"></i></button> : <></>
                                                                                        }
                                                                                        {
                                                                                            step == "2" ? <button className="btn btn-toship" onClick={() => { setStepEvent("3") }} disabled={addressarray.length == 0}>Go to Checkout <i className="bi bi-arrow-right-short"></i></button> : <></>
                                                                                        }
                                                                                        {
                                                                                            step == "1" || step == "2" ? <button className="btn btn-contship" onClick={() => { goto("/") }}>Continue Shopping</button> : <></>
                                                                                        }
                                                                                    </div>
                                                                                    {
                                                                                        step == "1" || step == "2" ?
                                                                                            <div className="have-coup">
                                                                                                <h4>Have a Coupon?</h4>
                                                                                                <div className="apply-cop">
                                                                                                    <i className="bi bi-tag-fill"></i>
                                                                                                    <input className="form-control" type="text" placeholder="Add coupon code" />
                                                                                                    <button className="btn btn-apply">Apply</button>
                                                                                                </div>
                                                                                                <div className="select-coupn">

                                                                                                    <div className="select-coupn-div">
                                                                                                        <div className="select-radio"><input type="radio" /></div>
                                                                                                        <div className="select-coupn-txt"><strong>NEW400</strong>
                                                                                                            <p>Get Flat 400 off on cart value of 2590 & above. Download the app to get Flat 500 off.</p>
                                                                                                            <p>Savings : ₹400.00</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="select-coupn-div">
                                                                                                        <div className="select-radio"><input type="radio" /></div>
                                                                                                        <div className="select-coupn-txt"><strong>NEW400</strong>
                                                                                                            <p>Get Flat 400 off on cart value of 2590 & above. Download the app to get Flat 500 off.</p>
                                                                                                            <p>Savings : ₹400.00</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="select-coupn-div">
                                                                                                        <div className="select-radio"><input type="radio" /></div>
                                                                                                        <div className="select-coupn-txt"><strong>NEW400</strong>
                                                                                                            <p>Get Flat 400 off on cart value of 2590 & above. Download the app to get Flat 500 off.</p>
                                                                                                            <p>Savings : ₹400.00</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="select-coupn-div">
                                                                                                        <div className="select-radio"><input type="radio" /></div>
                                                                                                        <div className="select-coupn-txt"><strong>NEW400</strong>
                                                                                                            <p>Get Flat 400 off on cart value of 2590 & above. Download the app to get Flat 500 off.</p>
                                                                                                            <p>Savings : ₹400.00</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            :
                                                                                            <></>
                                                                                    }
                                                                                    {/* <div className="usemony">
                                                    <h4>Use Srutle Money</h4>
                                                    <p>Lorem Ipsum is simply dummy text of the printing and industry. </p>
                                                    <div className="totl-use">
                                                        <p>Total Balance : <span>₹4000.00</span></p>
                                                        <button className="btn btn-use">Use</button>
                                                    </div>
                                                </div> */}
                                                                                    {
                                                                                        step == "3" && addressarray.length > 0 ?
                                                                                            <>
                                                                                                {
                                                                                                    addressarray && addressarray.map((item, i) => (
                                                                                                        <div key={i}>
                                                                                                            {
                                                                                                                item.isdefault == "1" ?
                                                                                                                    <div className="avl-offr-inr-div">
                                                                                                                        <div className="my-addres">
                                                                                                                            <h4>Shipping Address</h4>
                                                                                                                            <div>
                                                                                                                                <div className="shipng-ad"><strong>{item.name}</strong><span className="ad-hm">{item.addresstype}</span></div>
                                                                                                                                <p className="m-0">{item.building}, {item.locality}</p>
                                                                                                                                <p className="m-0">{item.district}, {item.state}</p>
                                                                                                                                <p className="m-0">Pin Code: {item.pincode}</p>
                                                                                                                                <p>Contact - Mobile : {item.phone}</p>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    :
                                                                                                                    <></>
                                                                                                            }
                                                                                                        </div>
                                                                                                    ))
                                                                                                }
                                                                                            </>
                                                                                            :
                                                                                            <>

                                                                                            </>
                                                                                    }

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                            :
                                                            <div className="cart-empty">
                                                                <span><Image src={"/assets/img/abandoned-cart.png"} width={300} height={100} alt='nocart' /></span>
                                                                <strong>No Items In The Cart</strong>
                                                                <p>Lorem Ipsum is simply dummy text of Lorem Ipsum has been the text ever since the 1500s...</p>
                                                                <button className="btn btn-gohm" onClick={() => { goto('/') }}>Go to Home Page</button>
                                                            </div>
                                                    }
                                                </>
                                        }
                                    </>
                            }
                        </div>
                        <ToastContainer />
                    </>
                    :
                    <></>
            }

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body style={{ padding: '10px' }}>
                    <button id="successorderbtncls" onClick={()=>{handleClose()}} style={{ display: "none" }} type="button" className="close-button abslt" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg"></i></button>
                    <div className="success-ord">
                        <div className="success-ord-inr">
                            <span><Image src={"/assets/img/verified-icn.png"} width={100} height={100} alt='nocart' /></span>
                            <strong>Your order has been<br />
                                placed successfully</strong>
                            <p>You can track order from <b>My Order</b> section</p>
                            <button className="btn btn-vw-ordr" onClick={() => { gotoorder('/myaccount?tab=my-order-tab') }} >View Order</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

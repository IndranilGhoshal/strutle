'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { getLocalStorageData, hideLoader, removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common'
import { orderapi } from '../lib/apiService'
import InvoiceModal from './_modal/InvoiceModal'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import OrderDetailsSkeleton from './_skeleton/OrderDetailsSkeleton'

export default function OrderDetailsComponent({ id }) {
    const router = useRouter();
    const [isLoad, setIsLoad] = useState(false)
    const [productlist, setProductlist] = useState([])
    const [product, setProduct] = useState([])
    const [seller, setSeller] = useState([])
    const [totalamount, settotalamount] = useState('')
    const [ordernumber, setordernumber] = useState('')
    const [orderdate, setorderdate] = useState('')
    const [paymenttype, setpaymenttype] = useState('')
    const [paymentstatus, setpaymentstatus] = useState('')



    const [consumeraddress, setconsumeraddress] = useState({})
    const [subtotal, setSubTotal] = useState(0)
    const [totaldiscount, setTotaldiscount] = useState(0)
    const [couponamount, setCouponamount] = useState(0)
    const [deliveryamount, setDeliveryamount] = useState(0)
    const [totalorderamount, setTotalOrderamount] = useState(0)


    useEffect(() => {
        getorderdetails()
    }, [])

    const getorderdetails = async () => {
        showLoader()
        let data = { id: id, mstconsumerid: getLocalStorageData('consumer')._id, details: true }
        let response = await orderapi(data)
        if (response.success) {
            let { result } = response
            setProductlist(result.product)
            settotalamount(result.totalamount)
            setconsumeraddress(result.consumeraddress)
            setorderdate(result.orderdate)
            setordernumber(result._id)
            setpaymenttype(result.paymenttype)
            setpaymentstatus(result.paymentstatus)
            getprice(id)
            hideLoader()
        } else {
            setProductlist([])
            settotalamount(0)
            setconsumeraddress({})
            setorderdate('')
            setordernumber('')
            setpaymenttype('')
            hideLoader()
        }
    }

    const getInvoice = async (id, pid) => {
        showLoader()
        let data = { id: id, productid:pid, mstconsumerid: getLocalStorageData('consumer')._id, invioce: true }
        let response = await orderapi(data)
        if (response.success) {
            let { result } = response
            setProduct(result.product)
            settotalamount(result.totalamount)
            setconsumeraddress(result.consumeraddress)
            setorderdate(result.orderdate)
            setordernumber(result._id)
            setSeller(result.seller)
            hideLoader()
        } else {
            setProductlist([])
            setSeller([])
            settotalamount('0')
            setconsumeraddress({})
            setorderdate('')
            setordernumber('')
            hideLoader()
        }
    }

    const getprice = async (order) => {
        showLoader()
        let data = { mstorderid: order, pricesummary: true }
        let response = await orderapi(data)
        if (response.success) {
            let { result } = response
            setSubTotal(result.subtotal)
            setTotaldiscount(result.totaldiscount)
            setCouponamount(result.couponamount)
            setDeliveryamount(result.deliveryamount)
            setTotalOrderamount(result.totalamount)
            setIsLoad(true)
            hideLoader()
        } else {
            setSubTotal(0)
            setTotaldiscount(0)
            setCouponamount(0)
            setDeliveryamount(0)
            setTotalOrderamount(0)
            setIsLoad(true)
            hideLoader()
        }
    }

    const goto = (path) => {
        showLoader()
        router.push("/consumer" + path)
        removeLocalStorageData("pathName")
        setLocalStorageData('pathName', path)
    }

    return (
        <>
            {
                isLoad ?
                    <>
                        <div className="bred-cm">
                            <ul>
                                <li className="bred-cm-curr cp" onClick={() => { goto('/') }}>Home</li>
                                <li><i className="bi bi-chevron-right"></i></li>
                                <li className="bred-cm-curr cp" onClick={() => { goto('/myaccount?tab=my-order-tab') }}>Order</li>
                                <li><i className="bi bi-chevron-right"></i></li>
                                <li className="bred-cm-it not-cp">Order Details</li>
                            </ul>
                        </div>
                        <div className="order-details padding">
                            <div className="order-details-hed">
                                <strong>Order Details</strong>
                                {/* <button className="btn btn-cncle" data-bs-toggle="modal" data-bs-target="#cancelorder">Cancel Order</button> */}
                            </div>
                            <div className="order-details-top">
                                <div className="details-top-lft">
                                    <div className="details-top-1">
                                        <div className="details-top-box">
                                            <h4>Order Summary</h4>
                                            <ul>
                                                <li><span>Subtotal</span><strong>₹{subtotal}</strong></li>
                                                <li><span>Discount</span><strong className="text-green">₹{totaldiscount}</strong></li>
                                                <li><span>Coupon Saving</span><strong className="text-green">₹{couponamount}</strong></li>
                                                <li><span>Delivery Fee</span><strong className="txt-u">₹{deliveryamount}</strong></li>
                                            </ul>
                                            <div className="pricsum-pric">
                                                <p><span>Order Total</span><strong>₹{totalorderamount}</strong></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="details-top-2">
                                        <ul>
                                            <li>Order ID: <strong>{ordernumber}</strong></li>
                                            <li>Order Date: <strong>{moment(orderdate).format('LL')}</strong></li>
                                            <li>Payment Methods: <strong>{paymenttype}</strong></li>
                                            <li>Payment Status: <strong>{paymentstatus}</strong></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="details-top-rit ">
                                    <div className="details-top-rit-lists">
                                        <h4><u>Shipping Address</u></h4>
                                        <h4>{consumeraddress.consumer}</h4>
                                        <ul>
                                            <li>{consumeraddress.locality + ", " + consumeraddress.building}</li>
                                            <li>{consumeraddress.district + ", " + consumeraddress.state}</li>
                                            <li>Pin Code: {consumeraddress.pincode}</li>
                                            <li>Mobile : {consumeraddress.phone}</li>
                                        </ul>
                                    </div>
                                    <div className="details-top-rit-lists">
                                        <h4><u>Billing Address</u></h4>
                                        <h4>{consumeraddress.consumer}</h4>
                                        <ul>
                                            <li>{consumeraddress.locality + ", " + consumeraddress.building}</li>
                                            <li>{consumeraddress.district + ", " + consumeraddress.state}</li>
                                            <li>Pin Code: {consumeraddress.pincode}</li>
                                            <li>Mobile : {consumeraddress.phone}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="order-details-btn-sec">

                                <div>
                                    {
                                        productlist.map((obj, i) => (
                                            <div key={i} className="order-details-btn">
                                                <div className="details-btn-lft">
                                                    <div className="details-btn-lft-img"><Image src={'/upload/' + obj.productimage} width={100} height={100} alt='no' style={{ display: "flex", margin: "auto" }} /></div>
                                                    <div className="details-btn-lft-txt">
                                                        <p className="txt-long">{obj.productname}</p>
                                                        <ul>
                                                            <li>Color: <strong>{obj.color}</strong></li>
                                                            <li>Quantity: <strong>{obj.quantity}</strong></li>
                                                        </ul>
                                                        <p className="txt-selr"><strong>Seller:</strong> {obj.seller}</p>
                                                        <p className="txt-pric">₹{obj.productnetamount}</p>
                                                        {
                                                            obj.orderproductdeliveredstatus == "1" ?
                                                                <p className="txt-dlvry"><strong>Deliverd {moment(obj.deliveryat).format('LL')}</strong></p> : <p className="txt-dlvry"><strong>Delivery at {moment(obj.deliveryat).format('LL')}</strong></p>
                                                        }
                                                        {
                                                            obj.orderproductdeliveredstatus == "1" ?
                                                                <button className="btn btn-rtn-exc mb-2" onClick={() => { goto('/return') }}>Return & Exchange</button> : <></>
                                                        }
                                                        {
                                                            obj.orderproductdeliveredstatus == "1" ?
                                                                <InvoiceModal
                                                                    id={id}
                                                                    productid={obj._id}
                                                                    product={product}
                                                                    seller={seller}
                                                                    getInvoice={getInvoice}
                                                                    totalamount={totalamount}
                                                                    consumeraddress={consumeraddress}
                                                                    ordernumber={ordernumber}
                                                                    orderdate={orderdate}
                                                                />
                                                                : <></>
                                                        }

                                                    </div>
                                                </div>
                                                <div className="details-btn-rit">
                                                    <div className="ordr-trk">
                                                        <ul>
                                                            <li className={`no-ord-bg ${obj.orderproductconfirmedstatus == "1" ? "active" : ""}`}><strong>Order Confirmation</strong> <span>{moment(obj.orderproductconfirmeddatetime).format('LL')}</span></li>
                                                            <li className={`no-act-bg ${obj.orderproductshippingstatus == "1" ? "active act-bg" : ""}`}><strong>Shipped</strong> <span>{moment(obj.orderproductshippingdatetime).format('LL')}</span></li>
                                                            <li className={`no-out-bg ${obj.orderproductoutofdeliverystatus == "1" ? "active act-bg" : ""}`}><strong>Out for Delivery</strong> <span>{moment(obj.orderproductoutofdeliverydatetime).format('LL')}</span></li>
                                                            <li className={`no-del-bg ${obj.orderproductdeliveredstatus == "1" ? "active act-bg" : ""}`}><strong>Delivered</strong> <span>{moment(obj.orderproductdelivereddatetime).format('LL')}</span></li>
                                                        </ul>
                                                    </div>
                                                    <div className="ordr-trk-txt">
                                                        <p>Tracking ID : <span>{obj.trackingid}</span></p>
                                                    </div>
                                                    <div className="ordr-trk-hlp"><a href="">Help & Support</a></div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <><OrderDetailsSkeleton /></>
            }
        </>
    )
}

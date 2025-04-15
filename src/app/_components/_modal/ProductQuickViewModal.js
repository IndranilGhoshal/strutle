'use client'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import InnerImageZoom from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/styles.min.css'
import { cartapi, productapi } from '@/app/lib/apiService'
import { getLocalStorageData, hideLoader, opneLoginModal, showLoader } from '@/app/lib/common'
import { Rating } from 'react-simple-star-rating'
import { toast, ToastContainer } from 'react-toastify'
import { AppContext } from '@/app/consumer/layout'

export default function ProductQuickViewModal({ id, resetid }) {
    const { setCartCount } = useContext(AppContext);
    const [isLoad, setIsLoad] = useState(false)
    const [images, setImages] = useState('')
    const [subimages, setSubImages] = useState([])
    const [imagesArray, setImagesArray] = useState([])

    const [producttitledescription, setProducttitledescription] = useState('')
    const [productmrp, setProductmrp] = useState('0')
    const [productdiscount, setProductdiscount] = useState('0')
    const [productnetprice, setProductnetprice] = useState('0')
    const [productname, setProductName] = useState('')

    const [averate, setAverate] = useState('0')
    const [rateingcount, setRateingcount] = useState('0')

    const [attributeArray, setAttributeArray] = useState([])
    const [variantArray, setVariantArray] = useState([])

    const getproductimagedata = async (id) => {
        showLoader()
        let data = { id: id, productimage: true }
        let response = await productapi(data)
        if (response.success) {
            const { result } = response;
            setImagesArray(result)
            let temp = result
            let o = []
            for (let [i, t] of temp.entries()) {
                if (t.productmainimage == '1') {
                    setImages(t.productimage);
                } else {
                    o.push(t)
                }
            }
            setSubImages(o)
            setIsLoad(true)
            hideLoader()
        } else {
            setImagesArray([])
            setImages('');
            setSubImages([])
            setIsLoad(true)
            hideLoader()
        }
    }

    const onCloseModal = () => {
        setImagesArray([])
        setImages('');
        setSubImages([])
        resetid()
    }

    const imageChange = (id) => {
        let temp = [...imagesArray]
        let o = []
        for (let [i, t] of temp.entries()) {
            if (id == t._id) {
                setImages(t.productimage);
            } else {
                o.push(t)
            }
        }
        setSubImages(o)
    }

    const getproductdetailsdata = async (id) => {
        showLoader()
        let data = { id: id, productdetails: true }
        let response = await productapi(data)
        if (response.success) {
            const { result } = response;
            setProductName(result.productname)
            setProducttitledescription(result.producttitledescription)
            setProductmrp(result.productmrp)
            setProductdiscount(result.productdiscount)
            let netprice = (result.productdiscount / 100) * result.productmrp
            setProductnetprice(result.productmrp - netprice)
            setIsLoad(true)
            hideLoader()
        } else {
            setProducttitledescription('')
            setProductmrp('')
            setProductdiscount('')
            setProductnetprice(0)
            setIsLoad(true)
            hideLoader()
        }
    }

    const getproductratingdata = async (id) => {
        showLoader()
        let data = { id: id, productrating: true }
        let response = await productapi(data)
        if (response.success) {
            const { result } = response;
            setAverate(result.averate)
            setRateingcount(result.rateingcount)
            hideLoader()
        } else {
            setAverate(0)
            setRateingcount(0)
            hideLoader()
        }
    }

    const getproductvariantdata = async (id) => {
        let data = { id: id, productvariant: true }
        let response = await productapi(data)
        if (response.success) {
            setVariantArray(response.result)
        } else {
            setVariantArray([])
        }
    }

    const getproductattributedata = async (id) => {
        let data = { id: id, productattributes: true }
        let response = await productapi(data)
        if (response.success) {
            setAttributeArray(response.result)
        } else {
            setAttributeArray([])
        }
    }

    if (id && !images) {
        getproductimagedata(id)
        getproductdetailsdata(id)
        getproductratingdata(id)
        getproductattributedata(id)
        getproductvariantdata(id)
    }

    const productChange = (i) => {
        getproductimagedata(i)
        getproductdetailsdata(i)
        getproductratingdata(i)
        getproductattributedata(i)
        getproductvariantdata(i)
    }

    const addtocartevent = async () => {
        if (!getLocalStorageData('consumer')?._id) {
            opneLoginModal()
        } else {
            showLoader()
            let data = {
                mstproductid: id,
                mstconsumerid: getLocalStorageData('consumer')?._id,
                productquantity: 1,
                productmrp: productmrp,
                productdiscount: productdiscount,
                productnetprice: productnetprice,
                saveaslater: 0,
                status: 0,
                addcart: true
            }
            let response = await cartapi(data)
            if (response.success) {
                setTimeout(() => {
                    toast.success(response.message)
                }, 100);
                getcartdata()
                hideLoader()
            } else {
                toast.error(response.message)
                hideLoader()
            }
        }
    }

    const getcartdata = async () => {
        let response = await cartapi({ mstconsumerid: getLocalStorageData('consumer')?._id, cartcount: true })
        if (response.success) {
            setCartCount(response.result)
            hideLoader()
        } else {
            setCartCount(0)
            hideLoader()
        }
    }

    return (
        <>
            <button style={{ display: "none" }} id="quickviewbutton" data-bs-toggle="modal" data-bs-target="#quickvw"><i className="bi bi-eye"></i></button>

            <div className="modal fade" id="quickvw" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                {
                    isLoad ?
                        <>
                            
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <button type="button" className="close-button abslt" data-bs-dismiss="modal" aria-label="Close" onClick={() => { onCloseModal() }}><i className="bi bi-x-lg"></i></button>
                                        <div className="product-detail">
                                            <div className="product-detail-left">
                                                <div className="zoom-div product-carousel">
                                                    <div className="swiper-container-con gallery-top-div">
                                                        <div className="thum-div-wr">
                                                            {
                                                                subimages && subimages.map((item, i) => (
                                                                    <div className="thum-div" key={i}>
                                                                        <a onClick={() => { imageChange(item._id) }}>
                                                                            <Image
                                                                                src={"/upload/" + item.productimage}
                                                                                alt="pi"
                                                                                width={100}
                                                                                height={100}
                                                                            />
                                                                        </a>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="lg-thum-thumbs">
                                                        <div className="swiper-wrapper">
                                                            <div className="swiper-slide">
                                                                <InnerImageZoom
                                                                    src={"/upload/" + images}
                                                                    alt="pi"
                                                                    width={500}
                                                                    height={100}
                                                                    hideHint={true}
                                                                />
                                                            </div>
                                                            <div className="thum-btn">
                                                                <button className="btn btn-add-card" onClick={()=>{addtocartevent()}}>Add to Cart</button>
                                                                <button className="btn btn-buy">Buy Now</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-detail-right">
                                                <div className="product-detail-t">
                                                    <div className="product-detail-news">
                                                        <span className="spn-nw">New!</span>
                                                        <span className="spn-ver"><i className="bi bi-check-circle"></i> Srutel Verified</span>
                                                    </div>
                                                    <h3>{productname}</h3>
                                                    <p>{producttitledescription}</p>
                                                </div>
                                                <div className="product-detail-ret">
                                                    <Rating initialValue={averate} readonly={true} size={25} />
                                                    <strong>({rateingcount} Reviews)</strong>
                                                </div>
                                                <div className="prod-pric-sec">
                                                    <div className="prod-pric">
                                                        <strong>₹{productnetprice}</strong>
                                                        {
                                                            productdiscount > 0 ? <span className='mx-2'>{productdiscount}% Off</span> : <></>
                                                        }
                                                    </div>
                                                    <div className="ofr-prc">
                                                        <p>MRP
                                                            {
                                                                productdiscount > 0 ? <span>{" ₹" + productmrp + " "}</span> : <>{" ₹" + productmrp + " "}</>
                                                            }
                                                            Inclusive of all taxes</p>
                                                    </div>
                                                    <div className="prc-txt">
                                                        <p><strong>₹2,105</strong> /month (24 months) with EMI on your Axis Bank Credit Card</p>
                                                        <div className="user-actions emi-dr dropdown">
                                                            <button className="btn btn-lang dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                                                aria-expanded="false">
                                                                All EMI Plans
                                                            </button>
                                                            <ul className="dropdown-menu">
                                                                <li><a className="dropdown-item" href="">EMI 1</a></li>
                                                                <li><a className="dropdown-item" href="">EMI 2</a></li>
                                                                <li><a className="dropdown-item" href="">EMI 3</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col-secn">
                                                        {
                                                            variantArray.length > 0 ?
                                                                <>
                                                                    <div className="col-img">
                                                                        <strong>Color</strong>
                                                                        <ul>
                                                                            {
                                                                                variantArray.map((item, i) => (
                                                                                    <li data-toggle="tooltip" data-placement="top" title={item.colorname} style={{ cursor: "pointer" }} key={i} className={`${item.active == "1" ? "active" : ""}`} onClick={() => { productChange(item.mstproductid); }}>
                                                                                        <Image
                                                                                            src={"/upload/" + item.image}
                                                                                            alt="pi"
                                                                                            width={100}
                                                                                            height={100}
                                                                                        />
                                                                                    </li>
                                                                                ))
                                                                            }
                                                                        </ul>
                                                                    </div>
                                                                </>
                                                                :
                                                                <>

                                                                </>
                                                        }
                                                        {
                                                            attributeArray.length > 0 ?
                                                                <div className="col-blo">
                                                                    {
                                                                        attributeArray.map((item, i) => (
                                                                            <div key={i} className="col-blo-lef">
                                                                                <strong>{item.label}</strong>
                                                                                <ul>
                                                                                    {
                                                                                        item.value.map((obj, index) => (
                                                                                            <li style={{ cursor: "pointer" }} key={index} className={`${obj.active == "1" ? "active" : ""}`} onClick={() => { productChange(obj.mstproductid); }}>{obj.value}</li>
                                                                                        ))
                                                                                    }
                                                                                </ul>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                                :
                                                                <>

                                                                </>
                                                        }
                                                    </div>
                                                    <div className="delivry-sec">
                                                        <div className="delivry-sec-lf">
                                                            <div className="sel-locn">
                                                                <strong>Select Delivery Location</strong>
                                                                <p>Enter the pincode of your area to check product availability and delivery options</p>
                                                            </div>
                                                            <div className="check-locn">
                                                                <div className="check-locn-top">
                                                                    <div className="check-locn-inp"><input type="text" className="form-control" placeholder="743144" /><button
                                                                        className="btn  btn-chk">check</button></div>
                                                                    <div className="adrs-select">
                                                                        <p>Delivery to <strong>Kolkata</strong></p>
                                                                        <p>Delivery by <strong>4 Nov, Monday</strong></p>
                                                                    </div>
                                                                </div>
                                                                <div className="adrs-select-div">
                                                                    <div className="adrs-select-inr">
                                                                        <div className="adrs-select-radio"><input type="radio" /></div>
                                                                        <div className="adrs-select-txt">
                                                                            <strong>Free Delivery</strong>
                                                                            <p>Delivery by <strong>4 Nov, Monday</strong></p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="adrs-select-inr">
                                                                        <div className="adrs-select-radio"><input type="radio" /></div>
                                                                        <div className="adrs-select-txt">
                                                                            <strong>Free Delivery</strong>
                                                                            <p>Delivery by <span>Tomorrow I ₹40</span></p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="delivry-sec-rt">
                                                            <ul>
                                                                <li style={{ display: "flex", fontSize: '12px' }}><Image src={"/assets/img/del-icn1.png"} width={20} height={20} alt="pi" className='mx-2' /> shipping worldwide</li>
                                                                <li style={{ display: "flex", fontSize: '12px' }}><Image src={"/assets/img/del-icn2.png"} width={20} height={20} alt="pi" className='mx-2' /> 100% Secured Payment</li>
                                                                <li style={{ display: "flex", fontSize: '12px' }}><Image src={"/assets/img/del-icn3.png"} width={20} height={20} alt="pi" className='mx-2' /> Made by the Professionals</li>
                                                                <li style={{ display: "flex", fontSize: '12px' }}><Image src={"/assets/img/del-icn4.png"} width={20} height={20} alt="pi" className='mx-2' /> COD Available</li>

                                                            </ul>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            
                        </>
                        :
                        <>

                        </>
                }
            </div>
            </div>
            <ToastContainer />
        </>
    )
}

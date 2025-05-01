'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { getLocalStorageData, hideLoader, removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common'
import { useRouter, useSearchParams } from 'next/navigation';
import { reviewapi } from '../lib/apiService';
import moment from 'moment';
import { Modal } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating'

export default function ReviewComponent({ id }) {
    const router = useRouter();
    const searchparams = useSearchParams();
    const search = searchparams.get('order')
    const [isload, setIsLoad] = useState(false)

    const [productname, setproductname] = useState('')
    const [productimage, setproductimage] = useState('')
    const [productcolor, setproductcolor] = useState('')
    const [productquantity, setproductquantity] = useState('')
    const [orderid, setorderid] = useState('')
    const [orderdate, setorderdate] = useState('')
    const [seller, setseller] = useState('')
    const [orderdelivereddate, setorderdelivereddate] = useState('')

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [rating, setRating] = useState(0)
    const [description, setdescription] = useState('')
    const [error, setError] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        showLoader()
        let data = { orderproductdetails: true, mstproductid: id, mstorderid: search }
        let response = await reviewapi(data)
        if (response.success) {
            let { result } = response
            setproductname(result.productname)
            setproductimage(result.productimage)
            setproductcolor(result.productcolor)
            setproductquantity(result.productquantity)
            setorderid(result.orderid)
            setorderdate(result.orderdate)
            setorderdelivereddate(result.orderdelivereddate)
            setseller(result.seller)
            setIsLoad(true)
            hideLoader()
        } else {
            setproductname('')
            setproductimage('')
            setproductcolor('')
            setproductquantity('')
            setorderid('')
            setorderdate('')
            setorderdelivereddate('')
            setseller('')
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

    const handleRating = (rate) => {
        setRating(rate)
    }

    const addevent = async () => {
        let err = 0;
        setError(false)
        if (!description) {
            setError(true)
            err++
        }
        if (err == 0) {
            showLoader()
            let data = {
                addreview: true,
                rate: rating,
                description: description,
                mstconsumerid: getLocalStorageData('consumer')._id,
                mstproductid: id
            }
            let response = await reviewapi(data)
            if (response.success) {
                hideLoader()
                setRating(0)
                setdescription('')
                setIsLoad(false)
                setShow(true)
            } else {
                hideLoader()
            }
        }
    }


    return (
        <>
            {
                isload ?
                    <>
                        <div className="bred-cm">
                            <ul>
                                <li className="bred-cm-curr cp" onClick={() => { goto('/') }}>Home</li>
                                <li><i className="bi bi-chevron-right"></i></li>
                                <li className="bred-cm-curr cp" onClick={() => { goto('/myaccount?tab=my-order-tab') }}>Order</li>
                                <li><i className="bi bi-chevron-right"></i></li>
                                <li className="bred-cm-it not-cp">Product Review</li>
                            </ul>
                        </div>
                        <div className="product-review padding retrn-pge">
                            <div className="product-review-left">
                                <div className="product-review-left-inr">
                                    <div className="product-review-left-top">
                                        <span><Image src={"/upload/" + productimage} width={300} height={100} alt='no' /></span>
                                        <p>{productname}</p>
                                        <ul>
                                            <li>Color: <strong>{productcolor}</strong></li>
                                            <li>Quantity: <strong>{productquantity}</strong></li>
                                        </ul>
                                    </div>
                                    <div className="product-review-left-top">
                                        <div className="selr-review-left">
                                            <span>Seller</span>
                                            <strong>{seller}</strong>
                                            <a>View Seller Profile</a>
                                        </div>
                                        <div className="details-top-2 w-100">
                                            <ul>
                                                <li>Order ID: <strong className='txt-wp-sm'>{orderid}</strong></li>
                                                <li>Order Date: <strong>{moment(orderdate).format('LL')}</strong></li>
                                                <li>Delivery Status: <strong>Delivered</strong></li>
                                                <li>Delivery Date: <strong>{moment(orderdelivereddate).format('LL')}</strong></li>
                                            </ul>
                                        </div>

                                        <div className="pblc-nam">
                                            <strong>Public Name:</strong>
                                            <p><i className="bi bi-person-circle"></i> {getLocalStorageData('consumer')?._id ? getLocalStorageData('consumer')?.firstname + " " + getLocalStorageData('consumer')?.lastname : <></>}</p>
                                            {/* <a href="#">✎ Edit Name</a> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-review-right">
                                <div className="review-tab">
                                    <nav>
                                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                            <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Product Review</button>
                                        </div>
                                    </nav>
                                    <div className="tab-content mt-4" id="nav-tabContent">
                                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
                                            <div>
                                                <div className="group-4">
                                                    <div className="group-5">
                                                        <h3 className="text-wrapper-11">Overall Rating</h3>
                                                        <p className="text-wrapper-22">
                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                                                            been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                                                            galley of type and scrambled it to make a type specimen book.
                                                        </p>
                                                        <div className="stars">
                                                            <span>
                                                                <Rating
                                                                    onClick={handleRating}
                                                                    size={25}
                                                                />
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="group-6">
                                                        <div className="overlap-group-4">
                                                            <div className="group-9">
                                                                <h3 className="text-wrapper-11">Add a written review</h3>
                                                                <p className="text-wrapper-12">What is most important to know?</p>
                                                            </div>
                                                            <textarea
                                                                className="form-control"
                                                                placeholder="What did you like or dislike? What did you use this product for?"
                                                                value={description}
                                                                onChange={(e) => { setdescription(e.target.value) }}
                                                            ></textarea>
                                                            {
                                                                error && !description && <div className='input-error'>Please enter description</div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="btn-div">
                                                    <button className="btn btn-proceed" onClick={() => { addevent() }} >Submit</button>
                                                    <span>We will notify you via email as soon as your review is processed.</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">Seller Review</div>
                                        <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex="0">Delivery Review</div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                    <button id="successorderbtncls" style={{ display: "none" }} type="button" className="close-button abslt" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg"></i></button>
                    <div className="success-ord">
                        <div className="success-ord-inr">
                            <span><Image src={"/assets/img/verified-icn.png"} width={100} height={100} alt='nocart' /></span>
                            <strong>Your Review has been<br />
                                submit successfully.</strong>
                            <p>Thank You to give your valuable review.</p>
                            <button className="btn btn-vw-ordr" onClick={() => { goto('/myaccount?tab=my-order-tab') }} >View Order</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

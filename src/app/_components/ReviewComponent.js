'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { hideLoader } from '../lib/common'

export default function ReviewComponent() {
    useEffect(()=>{
        hideLoader()
    },[])
    return (
        <>
            <div className="product-review padding retrn-pge">
                <div className="product-review-left">
                    <div className="product-review-left-inr">
                        <div className="product-review-left-top">
                            <span><Image src={"/assets/img/image-23.png"} width={100} height={100} alt='no' /></span>
                            <p>Lorem Ipsum is simply dummy text of the printing and dolor sit doler sit lorem ipsum </p>
                            <ul>
                                <li>Color: <strong>White</strong></li>
                                <li>Size: <strong>Xll</strong></li>
                            </ul>
                        </div>
                        <div className="product-review-left-top">
                            <div className="selr-review-left">
                                <span>Seller</span>
                                <strong>Seller Private Limited</strong>
                                <a href="">View Seller Profile</a>
                            </div>
                            <div className="details-top-2">
                                <ul>
                                    <li>Order ID: <strong>#1234567889</strong></li>
                                    <li>Order Date: <strong>14 October 2024</strong></li>
                                    <li>Delivery Status: <strong>Delivered</strong></li>
                                    <li>Delivery Date: <strong>18 October 2024</strong></li>
                                </ul>
                            </div>

                            <div className="pblc-nam">
                                <strong>Public Name:</strong>
                                <p><i className="bi bi-person-circle"></i> Christian Teigland</p>
                                <a href="#">✎ Edit Name</a>
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
                                                <span><i className="bi bi-star"></i></span><span><i className="bi bi-star"></i></span><span><i
                                                    className="bi bi-star"></i></span><span><i className="bi bi-star"></i></span><span><i
                                                        className="bi bi-star"></i></span>
                                            </div>
                                        </div>

                                        <div className="group-6">
                                            <div className="overlap-group-4">
                                                <div className="group-9">
                                                    <h3 className="text-wrapper-11">Add a written review</h3>
                                                    <p className="text-wrapper-12">What is most important to know?</p>
                                                </div>
                                                <textarea className="form-control"
                                                    placeholder="What did you like or dislike? What did you use this product for?"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="btn-div">
                                        <button className="btn btn-proceed">Submit</button>
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
    )
}

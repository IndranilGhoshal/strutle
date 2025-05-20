'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { hideLoader } from '../lib/common'

export default function ReturnComponent() {
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

                    </div>
                </div>
                <div className="product-review-right">
                    <div className="group-4">
                        <div className="group-5">
                            <h3 className="text-wrapper-11">Return &amp; Exchange</h3>
                            <p className="text-wrapper-12">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                                been the
                                industry&#39;s standard dummy text ever since the 1500s, scrambled it to make a type
                                specimen book.
                            </p>
                        </div>

                        <div className="group-6">
                            <div className="overlap-3">

                                <select id="purpose" className="form-select">
                                    <option value="">Select purpose</option>
                                    <option value="return">Return</option>
                                    <option value="exchange">Exchange</option>
                                </select>

                            </div>
                            <div className="overlap-group-4">
                                <textarea className="form-control" placeholder="Add comment"></textarea>
                            </div>
                        </div>
                        <div className="group-10">
                            <div className="group-9">
                                <h3 className="text-wrapper-11">Add a photo or video</h3>
                                <p className="text-wrapper-12">Lorem Ipsum doler sit lorem ipsum doler sit lorem</p>
                            </div>
                            <label htmlFor="file-upload" className="vector-wrapper">
                                <Image src={"/assets/img/plus.png"}  width={100} height={100} alt='no' / >
                                    <input type="file" id="file-upload" accept="image/*,video/*" style={{display: "none"}} />
                            </label>
                        </div>
                        <hr className="line" />
                    </div>
                    <div className="group-7">
                        <div className="group-8">
                            <div className="group-9">
                                <h3 className="text-wrapper-11">Lorem Ipsum Doler Sit</h3>
                                <p className="text-wrapper-16">Lorem Ipsum doler sit lorem ipsum doler sit lorem</p>
                            </div>
                            <div className="overlap-group-5">
                                <select id="return-reason" className="form-select">
                                    <option value="">Return</option>
                                    <option value="defective">Defective product</option>
                                    <option value="wrong-item">Wrong item received</option>
                                    <option value="not-as-described">Not as described</option>
                                </select>
                            </div>
                        </div>

                    </div>
                    <hr className="line-2" />

                    <div className="group-11">
                        <h3 className="text-wrapper-11">Select Refund Method</h3>
                        <div className="refund-options">
                            <label className="refund-option">
                                <div className="refund-option-div"><input type="radio" name="refund-method" value="wallet"
                                     />
                                    <span className="icon-circle">
                                        <span className="check-wrapper"><span className="check"></span></span>
                                    </span>
                                </div>
                                <div className="group-12">
                                    <h4 className="text-wrapper-19">Srutle Wallet</h4>
                                    <p className="text-wrapper-18">
                                        Lorem Ipsum doler sit lorem ipsum doler sit loremLorem Ipsum doler sit lorem ipsum
                                        doler sit lorem
                                    </p>
                                </div>
                            </label>
                            <label className="refund-option">
                                <div className="refund-option-div"><input type="radio" name="refund-method" value="original" />
                                    <span className="icon-circle-2"></span>
                                </div>
                                <div className="group-13">
                                    <h4 className="text-wrapper-19">Refund to your original payment method</h4>
                                    <p className="text-wrapper-18">
                                        Lorem Ipsum doler sit lorem ipsum doler sit loremLorem Ipsum doler sit lorem ipsum
                                        doler sit lorem
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>
                    <hr className="line-3" />
                    <div className="group-14">
                        <h3 className="text-wrapper-11">Pickup &amp; Exchange Address</h3>
                        <div className="avl-offr-inr-div">
                            <div className="my-addres">
                                <div>
                                    <div className="shipng-ad"><strong>Christian Tiegland</strong></div>
                                    <p className="m-0">2118 Thornridge Cir. Syracuse,
                                        Connecticut 35624
                                        Pin Code: 743144</p>
                                    <p>Contact - Mobile : (209) 555-0104</p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="btn-div">
                        <button className="btn btn-proceed">Proceed</button>
                        <button className="btn btn-cncle">Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}

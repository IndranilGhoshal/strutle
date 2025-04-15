import Image from 'next/image'
import React from 'react'

export default function OrderDetailsComponent() {
    return (
        <>
            <div className="order-details padding">
                <div className="order-details-hed">
                    <strong>Order Details</strong>
                    <button className="btn btn-cncle" data-bs-toggle="modal" data-bs-target="#cancelorder">Cancel Order</button>
                </div>
                <div className="order-details-top">
                    <div className="details-top-lft">
                        <div className="details-top-1">
                            <div className="details-top-box">
                                <h4>Order Summary</h4>
                                <ul>
                                    <li><span>Subtotal</span><strong>₹4,089</strong></li>
                                    <li><span>Discount (-20%)</span><strong className="text-green">₹4,089</strong></li>
                                    <li><span>Coupon Saving</span><strong className="text-green">₹4,089</strong></li>
                                    <li><span>Delivery Fee</span><strong className="txt-u">₹49</strong></li>
                                </ul>
                                <div className="pricsum-pric">
                                    <p><span>Order Total</span><strong>₹20,520</strong></p>
                                </div>
                            </div>
                        </div>
                        <div className="details-top-2">
                            <ul>
                                <li>Order ID: <strong>#1234567889</strong></li>
                                <li>Order Date: <strong>14 October 2024</strong></li>
                                <li>Payment Methods: <strong>BHIM UPI</strong></li>
                                <li>Invoice <span>Download Invoice <i className="bi bi-chevron-down"></i></span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="details-top-rit ">
                        <div className="details-top-rit-lists">
                            <h4>Shipping Address</h4>
                            <h4>Christian Tiegland</h4>
                            <ul>
                                <li>2118 Thornridge Cir. Syracuse, New York</li>
                                <li>Connecticut 35624</li>
                                <li>Pin Code: 743144</li>
                                <li>Mobile : (209) 555-0104</li>
                            </ul>
                        </div>
                        <div className="details-top-rit-lists">
                            <h4>Billing Address</h4>
                            <h4>Christian Tiegland</h4>
                            <ul>
                                <li>2118 Thornridge Cir. Syracuse, New York</li>
                                <li>Connecticut 35624</li>
                                <li>Pin Code: 743144</li>
                                <li>Mobile : (209) 555-0104</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="order-details-btn-sec">

                    <div>
                        <div className="order-details-btn">
                            <div className="details-btn-lft">
                                <div className="details-btn-lft-img"><Image src={"/assets/img/resel.png"} width={100} height={100} alt='no' /></div>
                                <div className="details-btn-lft-txt">
                                    <p className="txt-long">Lorem Ipsum is simply dummy text of the printing and dolor sit doler sit lorem ipsum
                                        Lorem Ipsum is simply
                                        dummy text of the printing and dolor sit doler sit lorem ipsum </p>
                                    <ul>
                                        <li>Color: <strong>White</strong></li>
                                        <li>Size: <strong>Xll</strong></li>
                                    </ul>
                                    <p className="txt-selr"><strong>Seller:</strong> Robson Private Limited</p>
                                    <p className="txt-pric">₹360.00</p>
                                    <p className="txt-dlvry"><strong>Delivery today by 9:30pm</strong></p>
                                    <button className="btn btn-rtn-exc">Return & Exchange</button>
                                </div>
                            </div>
                            <div className="details-btn-rit">
                                <div className="ordr-trk">
                                    <ul>
                                        <li><strong>Order Confirmation</strong> <span>Mon, 25th Oct</span></li>
                                        <li><strong>Shipped</strong> <span>Mon, 25th Oct</span></li>
                                        <li><strong>Out for Delivery</strong> <span>Mon, 25th Oct</span></li>
                                        <li><strong>Delivered</strong> <span>Wed, 25th Dec</span></li>
                                    </ul>
                                </div>
                                <div className="ordr-trk-txt">
                                    <p>Tracking ID : <span>#123456789021455</span></p>
                                </div>
                                <div className="ordr-trk-hlp"><a href="">Help & Support</a></div>
                            </div>
                        </div>
                        <div className="order-details-btn">
                            <div className="details-btn-lft">
                                <div className="details-btn-lft-img"><Image src={"/assets/img/resel.png"} width={100} height={100} alt='no' /></div>
                                <div className="details-btn-lft-txt">
                                    <p className="txt-long">Lorem Ipsum is simply dummy text of the printing and dolor sit doler sit lorem ipsum
                                        Lorem Ipsum is simply
                                        dummy text of the printing and dolor sit doler sit lorem ipsum </p>
                                    <ul>
                                        <li>Color: <strong>White</strong></li>
                                        <li>Size: <strong>Xll</strong></li>
                                    </ul>
                                    <p className="txt-selr"><strong>Seller:</strong> Robson Private Limited</p>
                                    <p className="txt-pric">₹360.00</p>
                                    <p className="txt-dlvry"><strong>Delivery today by 9:30pm</strong></p>
                                    <button className="btn btn-rtn-exc">Return & Exchange</button>
                                </div>
                            </div>
                            <div className="details-btn-rit">
                                <div className="ordr-trk">
                                    <ul>
                                        <li className="active"><strong>Order Confirmation</strong> <span>Mon, 25th Oct</span></li>
                                        <li className="active"><strong>Shipped</strong> <span>Mon, 25th Oct</span></li>
                                        <li className="active"><strong>Out for Delivery</strong> <span>Mon, 25th Oct</span></li>
                                        <li className="active"><strong>Delivered</strong> <span>Wed, 25th Dec</span></li>
                                    </ul>
                                </div>
                                <div className="ordr-trk-txt">
                                    <p>Tracking ID : <span>#123456789021455</span></p>
                                </div>
                                <div className="ordr-trk-hlp"><a href="">Rate & Review Product</a> &nbsp; | &nbsp; <a href="">Help &
                                    Support</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

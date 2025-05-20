'use client'
import React, { useEffect } from 'react'
import { hideLoader } from '../lib/common'

export default function ContactUsComponent() {
    useEffect(() => {
        hideLoader()
    }, [])
    return (
        <>
            <div className="abt-pge contact-page padding">
                <div className="page-title">
                    <div className="breadcrumbs">

                        <h1 className="heading fw-normal text-uppercase">
                            contact us
                        </h1>
                    </div>
                    <div className="box-text">
                        <p className="text-main-4">
                            Lorem ipsum dolor sit am et, consectetur adipiscing elit. Etiam consequat ut ex vel finibus.
                            Nunc eget molestie purus. Fusce imperdiet pulvinar est, eget fermentum nisi. </p>

                    </div>
                </div>
                <div className="wg-map d-flex">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d14733.473640739421!2d88.39291830264976!3d22.60271382152142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgoogle%20map!5e0!3m2!1sen!2sin!4v1747588232031!5m2!1sen!2sin"
                        width="100%" height="450" style={{ border: "0" }} allowFullScreen="" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className="row mt-5">
                    <div className="col-xxl-5 col-lg-5">
                        <div className="left-col mb-lg-0">
                            <h3 className="title fw-normal">
                                Our Store Location</h3>
                            <ul className="store-info-list p-0">
                                <li>
                                    <p className="caption"><strong className="d-block">Address:</strong>
                                        <a href="" className="link text-main-4" target="_blank">Lorem ipsum dolor sit am et,
                                            consectetur adipiscing elit.</a>
                                    </p>
                                </li>
                                <li>
                                    <p className="caption"><strong className="d-block">Email:</strong>
                                        <a href="mailto:store@vemus.com" className="link text-main-4">
                                            Store@test.com
                                        </a>
                                    </p>
                                </li>
                                <li>
                                    <p className="caption"><strong className="d-block">Phone:</strong>
                                        <a href="tel:6434528540" className="link text-main-4">
                                            +91 0123 546 540
                                        </a>
                                    </p>
                                </li>
                                <li>
                                    <div className="caption"><strong className="d-block">Opening Hour:</strong>
                                        <div className="text-main-4">
                                            Mon - Fri: 8am to 4.30pm GST <br />
                                            Sat: 9am to 3pm GST <br />
                                            Sun: Close
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <ul className="tf-social-icon">
                                <li>
                                    <a href="https://www.facebook.com/" target="_blank" className="social-facebook">
                                        <span className="icon"><i className="icon-facebook"></i></span>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/" target="_blank" className="social-instagram">
                                        <span className="icon"><i className="icon-instagram"></i></span>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://x.com/" target="_blank" className="social-x">
                                        <span className="icon"><i className="icon-x"></i></span>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.snapchat.com/" target="_blank" className="social-snapchat">
                                        <span className="icon"><i className="icon-snapchat"></i></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-2"></div>
                    <div className="col-xl-5 col-lg-5">
                        <div className="right-col">
                            <h3 className="title fw-normal">Get In Touch</h3>
                            <p className="sub-title text-main-4">
                                Our one-to-one support is a big part of strutle company. Contact us by phone or email to get
                                help from our qualified
                                team.
                            </p>
                            <form className="form-contact style-border">
                                <div className="form-content">
                                    <div className="cols tf-grid-layout sm-col-2">
                                        <fieldset className="mb-3">
                                            <input className="form-control" ype="text" placeholder="Name *" required="" />
                                        </fieldset>
                                        <fieldset className="mb-3">
                                            <input className="form-control" type="email" placeholder="Email *" required="" />
                                        </fieldset>
                                    </div>
                                    <textarea className="form-control" placeholder="Message" style={{ height: "229px" }}></textarea>
                                </div>
                                <button type="submit" className="tf-btn btn-fill animate-btn w-100 mt-3">
                                    SEND
                                </button>
                            </form>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

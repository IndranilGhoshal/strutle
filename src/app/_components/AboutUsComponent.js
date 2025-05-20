'use client'
import React, { useEffect } from 'react'
import { hideLoader } from '../lib/common'
import Image from 'next/image'

export default function AboutUsComponent() {
    useEffect(() => {
        hideLoader()
    }, [])
    return (
        <>
            <div className="abt-pge padding">
                <h1>ABOUT US</h1>

                <div className="image-section">
                    <Image src={"/assets/img/about-us.webp"} width={1500} height={100} alt='no' />
                </div>
                <div className="abt-txts">
                    <p>Lorem ipsum dolor sit am et, consectetur adipiscing elit. Etiam consequat ut ex vel finibus. Nunc eget
                        molestie
                        purus. Fusce imperdiet pulvinar est, eget fermentum nisi. Vestibulum ante ipsum primis in faucibus orci luctus
                        et ultrices posuere cubilia curae Lorem ipsum dolor sit am et, consectetur adipiscing elit. Etiam consequat ut
                        ex vel finibus. Nunc eget molestie purus. Fusce imperdiet pulvinar est, eget fermentum nisi. Vestibulum ante
                        ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae</p>
                    <p>Lorem ipsum dolor sit am et, consectetur adipiscing elit. Etiam consequat ut ex vel finibus. Nunc eget
                        molestie
                        purus. Fusce imperdiet pulvinar est, eget fermentum nisi. Vestibulum ante ipsum primis in faucibus orci luctus
                        et ultrices posuere cubilia curae</p>
                    <p>Lorem ipsum dolor sit am et, consectetur adipiscing elit. Etiam consequat ut ex vel finibus. Nunc eget
                        molestie
                        purus. Fusce imperdiet pulvinar est, eget fermentum nisi. Vestibulum ante ipsum primis in faucibus orci luctus
                        et ultrices posuere cubilia curae Lorem ipsum dolor sit am et, consectetur adipiscing elit. Etiam consequat ut
                        ex vel finibus. Nunc eget molestie purus. Fusce imperdiet pulvinar est, eget fermentum nisi. Vestibulum ante
                        ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae</p>
                </div>

                <div className="testimonial" style={{background: '#f2f2f2', padding: '20px', borderRadius: '10px'}}>
                    <Image src={"/assets/img/quote_380x.avif"} width={100} height={100} alt="Customer" />
                        <blockquote>
                            <p>Lorem ipsum dolor sit am et, consectetur adipiscing elit. Etiam consequat ut ex vel finibus. Nunc eget
                                molestie purus. Fusce imperdiet pulvinar est, eget fermentum nisi. Vestibulum ante ipsum primis in faucibus orci luctus
                                et ultrices posuere cubilia curae Lorem ipsum dolor sit am et, consectetur adipiscing elit. Etiam consequat ut ex vel finibus. Nunc eget
                                molestie purus. Fusce imperdiet pulvinar est, eget fermentum nisi. Vestibulum ante ipsum primis in faucibus orci luctus
                                et ultrices posuere cubilia curae</p>
                            <p><em><strong>- Karen Huang, <br />CEO
                                VoodreThemes</strong></em></p>
                        </blockquote>
                </div>

                <div className="why-choose">
                    <div className="why-choose-img">

                        <Image src={"/assets/img/shopping-cart.webp"}  width={100} height={100} alt="Why choose us image" />
                    </div>
                    <div className="why-choose-txt">
                        <h2 className="mb-4">Why choose us?</h2>
                        <p>Lorem ipsum dolor sit am et, consectetur adipiscing elit. Etiam consequat ut ex vel finibus. Nunc eget
                            molestie purus. Fusce imperdiet pulvinar est, eget fermentum nisi. Vestibulum ante ipsum primis in faucibus
                            orci luctus et ultrices posuere cubilia curae Lorem ipsum dolor sit am et, consectetur adipiscing elit.
                            Etiam consequat ut ex vel finibus. Nunc eget molestie purus. Fusce imperdiet pulvinar est, eget fermentum
                            nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae</p>
                        <p>Lorem ipsum dolor sit am et, consectetur adipiscing elit. Etiam consequat ut ex vel finibus. Nunc eget
                            molestie purus. Fusce imperdiet pulvinar est, eget fermentum nisi. Vestibulum ante ipsum primis in faucibus
                            orci luctus et ultrices posuere cubilia curae</p>
                        <p>Lorem ipsum dolor sit am et, consectetur adipiscing elit. Etiam consequat ut ex vel finibus. Nunc eget
                            molestie purus. Fusce imperdiet pulvinar est, eget fermentum nisi. Vestibulum ante ipsum primis in faucibus
                            orci luctus et ultrices posuere cubilia curae Lorem ipsum dolor sit am et, consectetur adipiscing elit.
                            Etiam consequat ut ex vel finibus. Nunc eget molestie purus. Fusce imperdiet pulvinar est, eget fermentum
                            nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae</p>

                    </div>

                </div>
                <div style={{borderTop: '1px solid #d9d9d9', opacity: '100%', marginTop: '150px'}}></div>
                <div className="trusted-shop">
                    <div className="why-choose-img">
                        <Image src={"/assets/img/swipe-for-shopping.gif"} width={100} height={100} alt="Trusted shopping image" />
                    </div>

                    <div className="why-choose-txt">

                        <h2 className="mb-4">Trusted online shopping</h2>
                        <p>Lorem ipsum dolor sit am et, consectetur adipiscing elit. Etiam consequat ut ex vel finibus. Nunc eget
                            molestie purus. Fusce imperdiet pulvinar est, eget fermentum nisi. Vestibulum ante ipsum primis in faucibus
                            orci luctus et ultrices posuere cubilia curae Lorem ipsum dolor sit am et, consectetur adipiscing elit.
                            Etiam consequat ut ex vel finibus. Nunc eget molestie purus. Fusce imperdiet pulvinar est, eget fermentum
                            nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae</p>
                        <p>Lorem ipsum dolor sit am et, consectetur adipiscing elit. Etiam consequat ut ex vel finibus. Nunc eget
                            molestie purus. Fusce imperdiet pulvinar est, eget fermentum nisi. Vestibulum ante ipsum primis in faucibus
                            orci luctus et ultrices posuere cubilia curae</p>
                        <p>Lorem ipsum dolor sit am et, consectetur adipiscing elit. Etiam consequat ut ex vel finibus. Nunc eget
                            molestie purus. Fusce imperdiet pulvinar est, eget fermentum nisi. Vestibulum ante ipsum primis in faucibus
                            orci luctus et ultrices posuere cubilia curae Lorem ipsum dolor sit am et, consectetur adipiscing elit.
                            Etiam consequat ut ex vel finibus. Nunc eget molestie purus. Fusce imperdiet pulvinar est, eget fermentum
                            nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae</p>

                    </div>
                </div>
            </div>
        </>
    )
}

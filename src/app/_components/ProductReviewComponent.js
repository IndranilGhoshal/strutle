'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { getLocalStorageData, hideLoader, showLoader } from '../lib/common'
import { productreviewapi } from '../lib/apiService'
import { Rating } from 'react-simple-star-rating'
import moment from 'moment'

export default function ProductReviewComponent({ id }) {
    const [productname, setProductName] = useState('')
    const [productimage, setProductimage] = useState('')
    const [productcolor, setProductcolor] = useState('')
    const [reviewArray, setReviewArray] = useState([])

    useEffect(() => {
        getproductdetailsdata(id)
        getproductreviewdata(id)
    }, [])
    const getproductdetailsdata = async (id) => {
        showLoader()
        let data = { id: id, mstconsumerid: getLocalStorageData('consumer')?._id, productdetails: true }
        let response = await productreviewapi(data)
        if (response.success) {
            const { result } = response;
            setProductName(result.productname)
            setProductimage(result.productimage)
            setProductcolor(result.productcolor)
            hideLoader()
        } else {
            setProductName('')
            setProductimage('')
            setProductcolor('')
            hideLoader()
        }
    }
    const getproductreviewdata = async (id) => {
        showLoader()
        let data = { id: id, productreviews: true }
        let response = await productreviewapi(data)
        if (response.success) {
            const { result } = response;
            setReviewArray(result)
            hideLoader()
        } else {
            setReviewArray([])
            hideLoader()
        }
    }
    return (
        <>
            <div className="product-review padding">
                <div className="product-review-left">
                    <div className="product-review-left-inr">
                        <div className="product-review-left-top">
                            <span><Image src={"/upload/" + productimage} width={500} height={100} alt='no' /></span>
                            <p>{productname}</p>
                            <ul>
                                <li>Color: <strong>{productcolor}</strong></li>
                            </ul>
                        </div>
                        <div className="product-review-left-btm">
                            <h5>Customer reviews</h5>
                            <ul>
                                <li>
                                    <div className="cust-ratng">5 <i className="bi bi-star-fill"></i></div>
                                    <div className="progress-div">
                                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="75"
                                            aria-valuemin="0" aria-valuemax="100">
                                            <div className="progress-bar w-75" style={{ backgroundColor: '#068743' }}></div>
                                        </div>
                                    </div>
                                    <strong>(72%)</strong>
                                </li>
                                <li>
                                    <div className="cust-ratng">4 <i className="bi bi-star-fill"></i></div>
                                    <div className="progress-div">
                                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="65"
                                            aria-valuemin="0" aria-valuemax="100">
                                            <div className="progress-bar w-65" style={{ backgroundColor: '#068743' }}></div>
                                        </div>
                                    </div>
                                    <strong>(72%)</strong>
                                </li>
                                <li>
                                    <div className="cust-ratng">3 <i className="bi bi-star-fill"></i></div>
                                    <div className="progress-div">
                                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="55"
                                            aria-valuemin="0" aria-valuemax="100">
                                            <div className="progress-bar w-55" style={{ backgroundColor: '#068743' }}></div>
                                        </div>
                                    </div>
                                    <strong>(72%)</strong>
                                </li>
                                <li>
                                    <div className="cust-ratng">2 <i className="bi bi-star-fill"></i></div>
                                    <div className="progress-div">
                                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="45"
                                            aria-valuemin="0" aria-valuemax="100">
                                            <div className="progress-bar w-45" style={{ backgroundColor: '#FFAD33' }}></div>
                                        </div>
                                    </div>
                                    <strong>(72%)</strong>
                                </li>
                                <li>
                                    <div className="cust-ratng">1 <i className="bi bi-star-fill"></i></div>
                                    <div className="progress-div">
                                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="35"
                                            aria-valuemin="0" aria-valuemax="100">
                                            <div className="progress-bar w-35" style={{ backgroundColor: '#DF1200' }}></div>
                                        </div>
                                    </div>
                                    <strong>(72%)</strong>
                                </li>
                            </ul>
                            <div className="over-all-rat">
                                <strong>Overall Rating</strong>
                                <div>
                                    <span>4.5</span>
                                    <i className="bi bi-star-fill"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-review-right">
                    <div className="most-filtr">
                        <select className="form-select">
                            <option>Most Helpful</option>
                        </select>
                    </div>
                    <div className="product-review-right-inr">
                        {
                            reviewArray.map((item, i) => (
                                <div key={i} className="product-review-indv">
                                    <div className="product-review-right-img">
                                        <Image
                                            src={"/upload/" + item.consumerimage}
                                            alt="pi"
                                            width={100}
                                            height={100}
                                        />
                                    </div>
                                    <div className="product-review-right-txt">
                                        <Rating initialValue={item.rate} readonly={true} size={25} />
                                        <p>{item.description}</p>
                                        <div className="product-review-aut">
                                        <strong>{item.consumername}</strong>
                                        <p>{moment(item.createdAt).format('LL')}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { getLocalStorageData, hideLoader, removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common'
import { productapi, productreviewapi } from '../lib/apiService'
import { Rating } from 'react-simple-star-rating'
import moment from 'moment'
import { useRouter } from 'next/navigation'

export default function ProductReviewComponent({ id }) {
    const router = useRouter()
    const [productname, setProductName] = useState('')
    const [productimage, setProductimage] = useState('')
    const [productcolor, setProductcolor] = useState('')
    const [reviewArray, setReviewArray] = useState([])

    const [averate, setAverate] = useState('0')
    const [onerateingpersent, setOnerateingpersent] = useState('0')
    const [tworateingpersent, setTworateingpersent] = useState('0')
    const [threerateingpersent, setThreerateingpersent] = useState('0')
    const [fourrateingpersent, setFourrateingpersent] = useState('0')
    const [fiverateingpersent, setFiverateingpersent] = useState('0')
    const [categoryname, setCategoryName] = useState('')
    const [categoryid, setCategoryId] = useState('')
    const [subcategoryname, setSubCategoryName] = useState('')
    const [subcategoryid, setSubCategoryId] = useState('')
    const [producttypename, setProductTypeName] = useState('')
    const [producttypeid, setProducttypeId] = useState('')
    const [productid, setProductId] = useState('')


    useEffect(() => {
        getproductcategorydata(id)
        getproductdetailsdata(id)
        getproductreviewdata(id)
        getproductratingdata(id)
    }, [])
    const getproductcategorydata = async (id) => {
        showLoader()
        let data = { mstproductid: id, bredcmdetails: true }
        let response = await productapi(data)
        if (response.success) {
            const { result } = response;
            setProductName(result.productname);
            setProductId(result.product);
            setCategoryName(result.categoryname);
            setCategoryId(result.category);
            setSubCategoryName(result.subcategoryname);
            setSubCategoryId(result.subcategory);
            setProductTypeName(result.producttypename);
            setProducttypeId(result.producttype);
            hideLoader()
        } else {
            setProductName('');
            setProductId('');
            setCategoryName('');
            setCategoryId('')
            setSubCategoryName('');
            setSubCategoryId('');
            setProductTypeName('');
            setProducttypeId('');
            hideLoader()
        }
    }
    const goto = (path) => {
        showLoader()
        router.push("/consumer" + path)
        removeLocalStorageData("pathName")
        setLocalStorageData('pathName', path)
    }
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
    const getproductratingdata = async (id) => {
        showLoader()
        let data = { id: id, productrating: true }
        let response = await productreviewapi(data)
        if (response.success) {
            const { result } = response;
            setAverate(result.averate)
            setOnerateingpersent(result.onerateingpersent)
            setTworateingpersent(result.tworateingpersent)
            setThreerateingpersent(result.threerateingpersent)
            setFourrateingpersent(result.fourrateingpersent)
            setFiverateingpersent(result.fiverateingpersent)
            hideLoader()
        } else {
            setAverate(0)
            setOnerateingpersent(0)
            setTworateingpersent(0)
            setThreerateingpersent(0)
            setFourrateingpersent(0)
            setFiverateingpersent(0)
            hideLoader()
        }
    }
    return (
        <>
            <div className="bred-cm">
                <ul>
                    <li className="bred-cm-curr cp" onClick={() => { goto('/') }}>Home</li>
                    <li><i className="bi bi-chevron-right"></i></li>
                    <li className="bred-cm-curr cp" onClick={() => { goto('/productlist/' + categoryid + "?type=category"); }}>{categoryname}</li>
                    <li><i className="bi bi-chevron-right"></i></li>
                    <li className="bred-cm-curr cp" onClick={() => { goto('/productlist/' + subcategoryid + "?type=subcategory"); }}>{subcategoryname}</li>
                    <li><i className="bi bi-chevron-right"></i></li>
                    <li className="bred-cm-curr cp" onClick={() => { goto('/productlist/' + producttypeid + "?type=producttype"); }}>{producttypename}</li>
                    <li><i className="bi bi-chevron-right"></i></li>
                    <li className="bred-cm-it not-cp"><p className='prdcrd-txt-wp'>{productname}</p></li>
                </ul>
            </div>
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
                                        <div
                                            className="progress"
                                            role="progressbar"
                                            aria-label="Basic example"
                                            aria-valuenow="75"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            <div className={`progress-bar ${fiverateingpersent ? "w-" + fiverateingpersent : ""}`} style={{ backgroundColor: '#068743' }}></div>
                                        </div>
                                    </div>
                                    <strong>({fiverateingpersent}%)</strong>
                                </li>
                                <li>
                                    <div className="cust-ratng">4 <i className="bi bi-star-fill"></i></div>
                                    <div className="progress-div">
                                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="65"
                                            aria-valuemin="0" aria-valuemax="100">
                                            <div className={`progress-bar ${fourrateingpersent ? "w-" + fourrateingpersent : ""}`} style={{ backgroundColor: '#068743' }}></div>
                                        </div>
                                    </div>
                                    <strong>({fourrateingpersent}%)</strong>
                                </li>
                                <li>
                                    <div className="cust-ratng">3 <i className="bi bi-star-fill"></i></div>
                                    <div className="progress-div">
                                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="55"
                                            aria-valuemin="0" aria-valuemax="100">
                                            <div className={`progress-bar ${threerateingpersent ? "w-" + threerateingpersent : ""}`} style={{ backgroundColor: '#068743' }}></div>
                                        </div>
                                    </div>
                                    <strong>({threerateingpersent}%)</strong>
                                </li>
                                <li>
                                    <div className="cust-ratng">2 <i className="bi bi-star-fill"></i></div>
                                    <div className="progress-div">
                                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="45"
                                            aria-valuemin="0" aria-valuemax="100">
                                            <div className={`progress-bar ${tworateingpersent ? "w-" + tworateingpersent : ""}`} style={{ backgroundColor: '#FFAD33' }}></div>
                                        </div>
                                    </div>
                                    <strong>({tworateingpersent}%)</strong>
                                </li>
                                <li>
                                    <div className="cust-ratng">1 <i className="bi bi-star-fill"></i></div>
                                    <div className="progress-div">
                                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="35"
                                            aria-valuemin="0" aria-valuemax="100">
                                            <div className={`progress-bar ${onerateingpersent ? "w-" + onerateingpersent : ""}`} style={{ backgroundColor: '#DF1200' }}></div>
                                        </div>
                                    </div>
                                    <strong>({onerateingpersent}%)</strong>
                                </li>
                            </ul>
                            <div className="over-all-rat">
                                <strong>Overall Rating</strong>
                                <div>
                                    <span>{averate}</span>
                                    <i className="bi bi-star-fill mx-2"></i>
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

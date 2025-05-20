'use client'
import React, { useContext, useEffect, useState } from 'react'
import { getLocalStorageData, hideLoader, opneLoginModal, removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common'
import Image from 'next/image'
import { cartapi, consumercategoryapi, favouriteapi, productapi } from '../lib/apiService'
import { useRouter } from 'next/navigation'
import InnerImageZoom from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/styles.min.css'
import { Rating } from 'react-simple-star-rating'
import moment from 'moment'
import ProductCarousel from './ProductCarousel'
import { toast, ToastContainer } from 'react-toastify'
import { AppContext } from '../consumer/layout'
import ProductSkeleton from './_skeleton/ProductSkeleton'

export default function ProductComponent({ id }) {
    const { setCartCount } = useContext(AppContext);
    const router = useRouter()
    const [isLoad, setIsLoad] = useState(false)
    const [productname, setProductName] = useState('')
    const [productid, setProductId] = useState('')
    const [favourite, setFavourite] = useState('')
    const [productquantity, setProductquantity] = useState('')
    const [categoryname, setCategoryName] = useState('')
    const [categoryid, setCategoryId] = useState('')
    const [subcategoryname, setSubCategoryName] = useState('')
    const [subcategoryid, setSubCategoryId] = useState('')
    const [producttypename, setProductTypeName] = useState('')
    const [producttypeid, setProducttypeId] = useState('')
    const [images, setImages] = useState('')
    const [subimages, setSubImages] = useState([])
    const [imagesArray, setImagesArray] = useState([])


    const [producttitledescription, setProducttitledescription] = useState('')
    const [productmrp, setProductmrp] = useState('0')
    const [productdiscount, setProductdiscount] = useState('0')
    const [productnetprice, setProductnetprice] = useState('0')

    const [informationArray, setInformationArray] = useState([])
    const [reviewArray, setReviewArray] = useState([])
    const [attributeArray, setAttributeArray] = useState([])
    const [variantArray, setVariantArray] = useState([])


    const [averate, setAverate] = useState('0')
    const [rateingcount, setRateingcount] = useState('0')

    const [productLastViewArray, setProductLastViewArray] = useState([
        {
            discount: "50",
            image: "/assets/img/image9.png",
            name: "S-Series Comfort Chair S-Series Comfort Chair",
            rate: "4",
            review: "10",
            price: "2000"
        },
        {
            discount: "50",
            image: "/assets/img/image9.png",
            name: "S-Series Comfort Chair S-Series Comfort Chair",
            rate: "3",
            review: "30",
            price: "2000"
        },
        {
            discount: "50",
            image: "/assets/img/image9.png",
            name: "S-Series Comfort Chair S-Series Comfort Chair",
            rate: "2",
            review: "20",
            price: "2000"
        },
        {
            discount: "50",
            image: "/assets/img/image9.png",
            name: "S-Series Comfort Chair S-Series Comfort Chair",
            rate: "4",
            review: "30",
            price: "2000"
        },
        {
            discount: "50",
            image: "/assets/img/image9.png",
            name: "S-Series Comfort Chair S-Series Comfort Chair",
            rate: "5",
            review: "10",
            price: "2000"
        },
        {
            discount: "50",
            image: "/assets/img/image9.png",
            name: "S-Series Comfort Chair S-Series Comfort Chair",
            rate: "4",
            review: "10",
            price: "2000"
        }
    ])

    useEffect(() => {
        getproductcategorydata(id)
        getproductimagedata(id)
        getproductdetailsdata(id)
        getproductinformationdata(id)
        getproductreviewdata(id)
        getproductratingdata(id)
        getproductattributedata(id)
        getproductvariantdata(id)
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
            setIsLoad(true)
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


    const getproductimagedata = async (id) => {
        showLoader()
        let data = { id: id, productimage: true }
        let response = await productapi(data)
        if (response.success) {
            const { result } = response;
            setImagesArray(result)
            let temp = result
            let o = []
            if (temp.length > 1) {
                for (let [i, t] of temp.entries()) {
                    if (t.productmainimage == '1') {
                        setImages(t.productimage);
                    } else {
                        o.push(t)
                    }
                }
            } else {
                for (let [i, t] of temp.entries()) {
                    setImages(t.productimage);
                    o.push(t)
                }
            }
            setSubImages(o)
            hideLoader()
        } else {
            hideLoader()
            setImagesArray([])
            setImages('');
            setSubImages([])
        }
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
        let data = { id: id, mstconsumerid: getLocalStorageData('consumer')?._id, productdetails: true }
        let response = await productapi(data)
        if (response.success) {
            const { result } = response;
            setProducttitledescription(result.producttitledescription)
            setProductmrp(result.productmrp)
            setProductdiscount(result.productdiscount)
            setProductquantity(result.productquantity)
            let netprice = (Number(result.productdiscount) / 100) * Number(result.productmrp)
            setProductnetprice((Number(result.productmrp) - Number(netprice)).toFixed())
            setFavourite(result.favourite)
            hideLoader()
        } else {
            setProducttitledescription('')
            setProductmrp('')
            setProductdiscount('')
            setProductquantity('0')
            setProductnetprice(0)
            hideLoader()
        }
    }

    const getproductinformationdata = async (id) => {
        showLoader()
        let data = { id: id, productinformation: true }
        let response = await productapi(data)
        if (response.success) {
            const { result } = response;
            setInformationArray(result)
            hideLoader()
        } else {
            setInformationArray([])
            hideLoader()
        }
    }

    const getproductreviewdata = async (id) => {
        showLoader()
        let data = { id: id, productreviews: true }
        let response = await productapi(data)
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

    const getproductattributedata = async (id) => {
        let data = { id: id, productattributes: true }
        let response = await productapi(data)
        if (response.success) {
            setAttributeArray(response.result)
        } else {
            setAttributeArray([])
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


    const addTofavoruite = async () => {
        if (!getLocalStorageData('consumer')?._id) {
            opneLoginModal()
        } else {
            showLoader()
            let data = { mstconsumerid: getLocalStorageData('consumer')._id, mstproductid: id, status: favourite == "1" ? "1" : "0", addfavourite: true }
            let response = await favouriteapi(data)
            if (response.success) {
                getproductdetailsdata(id)
                onMessage(response.message, true)
            } else {
                getproductdetailsdata(id)
                onMessage(response.message, false)
            }
        }
    }

    const onMessage = (mes, sus) => {
        if (sus) {
            toast.success(mes)
        } else {
            toast.error(mes)
        }
    }

    const checkuser = (path) => {
        if (!getLocalStorageData('consumer')?._id) {
            opneLoginModal()
        } else {
            goto(path)
        }
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
                                <li className="bred-cm-curr cp" onClick={() => { goto('/productlist/' + categoryid+"?type=category"); }}>{categoryname}</li>
                                <li><i className="bi bi-chevron-right"></i></li>
                                <li className="bred-cm-curr cp" onClick={() => { goto('/productlist/' + subcategoryid+"?type=subcategory"); }}>{subcategoryname}</li>
                                <li><i className="bi bi-chevron-right"></i></li>
                                <li className="bred-cm-curr cp" onClick={() => { goto('/productlist/' + producttypeid+"?type=producttype"); }}>{producttypename}</li>
                                <li><i className="bi bi-chevron-right"></i></li>
                                <li className="bred-cm-it not-cp"><p className='prdcrd-txt-wp'>{productname}</p></li>
                            </ul>
                        </div>
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
                                    <div className="lg-thum-thumbs myfavr">
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide">
                                                <button className="btn ntn-favr" onClick={() => { addTofavoruite() }}><i className={`bi ${favourite == "1" ? "bi-heart-fill" : "bi-heart"}`}></i></button>
                                                <button className="btn ntn-view"><i className="bi bi-share-fill"></i></button>
                                                <InnerImageZoom
                                                    src={"/upload/" + images}
                                                    alt="pi"
                                                    width={500}
                                                    height={100}
                                                    hideHint={true}
                                                />
                                            </div>
                                            <div className="thum-btn">
                                                {
                                                    productquantity !== "0" ?
                                                        <>
                                                            <button className="btn btn-add-card" onClick={() => { addtocartevent() }}>Add to Cart</button>
                                                            <button className="btn btn-buy" onClick={() => { checkuser('/cart?type=' + productid) }}>Buy Now</button>
                                                        </>
                                                        :
                                                        <button className="btn btn-buy w-100">Notify Me</button>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-detail-right">
                                <div className="product-detail-t">
                                    <div className="product-detail-news">
                                        <span className="spn-nw">New!</span>
                                        <span className="spn-ver"><i className="bi bi-check-circle"></i> Srutle Verified</span>
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
                                            productquantity > 0 ?
                                                <>
                                                </>
                                                :
                                                <div className='stckot'>
                                                    <h3>Currently Unavailable</h3>
                                                    <p>This item is currently out of stock</p>
                                                </div>
                                        }
                                        {
                                            variantArray.length > 0 ?
                                                <>
                                                    <div className="col-img">
                                                        <strong>Color</strong>
                                                        <ul>
                                                            {
                                                                variantArray.map((item, i) => (
                                                                    <li data-toggle="tooltip" data-placement="top" title={item.colorname} style={{ cursor: "pointer" }} key={i} className={`${item.active == "1" ? "active" : ""}`} onClick={() => { goto('/product/' + item.mstproductid); }}>
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
                                                                            <li style={{ cursor: "pointer" }} key={index} className={`${obj.active == "1" ? "active" : ""}`} onClick={() => { goto('/product/' + obj.mstproductid); }}>{obj.value}</li>
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
                                        <div className="delivry-sec-rt"></div>
                                    </div>
                                    <div className="avl-offr">
                                        <div className="ofr-hed">
                                            <h4>Available offers</h4>
                                            <a href="" className="view-all">View All</a>
                                        </div>
                                        <div className="avl-offr-inr">
                                            <div className="avl-offr-inr-div">
                                                <div className="avl-offr-inr-top">
                                                    <span>
                                                        <Image
                                                            src={"/assets/img/offer-icon.png"}
                                                            alt="pi"
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </span>
                                                    <div className="avl-offr-inr-txt">
                                                        <h5>NEW400</h5>
                                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting...<button>See Details</button>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="avl-offr-inr-blo">
                                                    <p>Validity : 29th Nov 2024</p>
                                                    <strong>Copy Code</strong>
                                                </div>
                                            </div>
                                            <div className="avl-offr-inr-div">
                                                <div className="avl-offr-inr-top">
                                                    <span>
                                                        <Image
                                                            src={"/assets/img/offer-icon.png"}
                                                            alt="pi"
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </span>
                                                    <div className="avl-offr-inr-txt">
                                                        <h5>NEW400</h5>
                                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting...<button>See Details</button></p>
                                                    </div>
                                                </div>
                                                <div className="avl-offr-inr-blo">
                                                    <p>Validity : 29th Nov 2024</p>
                                                    <strong>Copy Code</strong>
                                                </div>
                                            </div>
                                            <div className="avl-offr-inr-div">
                                                <div className="avl-offr-inr-top">
                                                    <span>
                                                        <Image
                                                            src={"/assets/img/offer-icon.png"}
                                                            alt="pi"
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </span>
                                                    <div className="avl-offr-inr-txt">
                                                        <h5>NEW400</h5>
                                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting...<button>See Details</button></p>
                                                    </div>
                                                </div>
                                                <div className="avl-offr-inr-blo">
                                                    <p>Validity : 29th Nov 2024</p>
                                                    <strong>Copy Code</strong>
                                                </div>
                                            </div>
                                            <div className="avl-offr-inr-div">
                                                <div className="avl-offr-inr-top">
                                                    <span>
                                                        <Image
                                                            src={"/assets/img/offer-icon.png"}
                                                            alt="pi"
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </span>
                                                    <div className="avl-offr-inr-txt">
                                                        <h5>NEW400</h5>
                                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting...<button>See Details</button></p>
                                                    </div>
                                                </div>
                                                <div className="avl-offr-inr-blo">
                                                    <p>Validity : 29th Nov 2024</p>
                                                    <strong>Copy Code</strong>
                                                </div>
                                            </div>
                                            <div className="avl-offr-inr-div">
                                                <div className="avl-offr-inr-top">
                                                    <span>
                                                        <Image
                                                            src={"/assets/img/offer-icon.png"}
                                                            alt="pi"
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </span>
                                                    <div className="avl-offr-inr-txt">
                                                        <h5>NEW400</h5>
                                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting...<button>See Details</button></p>
                                                    </div>
                                                </div>
                                                <div className="avl-offr-inr-blo">
                                                    <p>Validity : 29th Nov 2024</p>
                                                    <strong>Copy Code</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="prod-info">
                                        {
                                            informationArray.length > 0 ?
                                                <>
                                                    <div className="prod-info-inner">
                                                        <div className="headng">
                                                            <h4>Product Information</h4>
                                                        </div>
                                                        <div className="accordion" id="accordionExample">
                                                            {
                                                                informationArray.map((item, i) => (
                                                                    <div className="accordion-item" key={i}>
                                                                        <h2 className="accordion-header">
                                                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                                                data-bs-target={"#collapseOne" + i} aria-expanded="true" aria-controls={"collapseOne" + i}>
                                                                                {item.name}
                                                                            </button>
                                                                        </h2>
                                                                        <div id={"collapseOne" + i} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                                            <div className="accordion-body">
                                                                                {item.description}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                <>

                                                </>
                                        }

                                    </div>
                                    {
                                        reviewArray.length > 0 ?
                                            <div className="customr-revw">
                                                <h4>Customer Reviews</h4>
                                                <div className="customr-revw-inr">
                                                    {
                                                        reviewArray.map((item, i) => (
                                                            <div key={i} className="customr-revw-inr-dv">
                                                                <div className="customr-revw-img">
                                                                    <Image
                                                                        src={"/upload/" + item.consumerimage}
                                                                        alt="pi"
                                                                        width={100}
                                                                        height={100}
                                                                    />
                                                                </div>
                                                                <div className="customr-revw-txt">
                                                                    <div className="rattng">
                                                                        <Rating initialValue={item.rate} readonly={true} size={25} />
                                                                    </div>
                                                                    <p>{item.description}</p>
                                                                    <div className="revw-autr">
                                                                        <strong>{item.consumername}</strong>
                                                                        <p>{moment(item.createdAt).format('LL')}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                <a className="vw-all-revw" onClick={() => { goto('/productreview/' + id) }}>View All Review</a>
                                            </div>

                                            :
                                            <></>
                                    }
                                </div>
                            </div>

                        </div>
                        <div className="fbt padding">
                            <h3>Frequently Bought Together</h3>
                            <div className="fbt-l">
                                <div className="fbt-lists">
                                    <div className="category-item">
                                        <div className="category-item-img">
                                            <div className="chkbx"><input type="checkbox" /></div>
                                            <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
                                            <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
                                            <Image
                                                src={"/assets/img/image9.png"}
                                                alt="pi"
                                                width={100}
                                                height={100}
                                            />
                                        </div>
                                        <div className="prod-dtls">
                                            <p>S-Series Comfort Chair S-Series Comfort Chair </p>
                                            <div className="ratings">
                                                <ul>
                                                    <li><i className="bi bi-star-fill active"></i></li>
                                                    <li><i className="bi bi-star-fill active"></i></li>
                                                    <li><i className="bi bi-star-fill"></i></li>
                                                    <li><i className="bi bi-star-fill"></i></li>
                                                    <li><i className="bi bi-star-fill"></i></li>
                                                </ul>
                                                <strong>(99)</strong>
                                            </div>
                                            <strong>₹3,750</strong>
                                        </div>
                                    </div>
                                    <div className="combo-ic">+</div>
                                    <div className="category-item">
                                        <div className="category-item-img">
                                            <div className="chkbx"><input type="checkbox" /></div>
                                            <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
                                            <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
                                            <Image
                                                src={"/assets/img/image3.png"}
                                                alt="pi"
                                                width={100}
                                                height={100}
                                            />
                                        </div>
                                        <div className="prod-dtls">
                                            <p>S-Series Comfort Chair S-Series Comfort Chair </p>
                                            <div className="ratings">
                                                <ul>
                                                    <li><i className="bi bi-star-fill active"></i></li>
                                                    <li><i className="bi bi-star-fill active"></i></li>
                                                    <li><i className="bi bi-star-fill"></i></li>
                                                    <li><i className="bi bi-star-fill"></i></li>
                                                    <li><i className="bi bi-star-fill"></i></li>
                                                </ul>
                                                <strong>(99)</strong>
                                            </div>
                                            <strong>₹3,750</strong>
                                        </div>
                                    </div>
                                    <div className="combo-ic">+</div>
                                    <div className="category-item">
                                        <div className="category-item-img">
                                            <div className="chkbx"><input type="checkbox" /></div>
                                            <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
                                            <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
                                            <Image
                                                src={"/assets/img/image5.png"}
                                                alt="pi"
                                                width={100}
                                                height={100}
                                            />
                                        </div>
                                        <div className="prod-dtls">
                                            <p>S-Series Comfort Chair S-Series Comfort Chair </p>
                                            <div className="ratings">
                                                <ul>
                                                    <li><i className="bi bi-star-fill active"></i></li>
                                                    <li><i className="bi bi-star-fill active"></i></li>
                                                    <li><i className="bi bi-star-fill"></i></li>
                                                    <li><i className="bi bi-star-fill"></i></li>
                                                    <li><i className="bi bi-star-fill"></i></li>
                                                </ul>
                                                <strong>(99)</strong>
                                            </div>
                                            <strong>₹3,750</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className="fbt-lists-box">
                                    <div className="fbt-lists-box-inr">
                                        <h4>Price Summary</h4>
                                        <ul>
                                            <li><span>Main item</span><strong>₹4,089</strong></li>
                                            <li><span>1 Add-on</span><strong>₹4,089</strong></li>
                                            <li><span>2 Add-on</span><strong>₹4,089</strong></li>
                                            <li><span>3 Add-on</span><strong>₹4,089</strong></li>
                                        </ul>
                                        <div className="pricsum-pric">
                                            <p><span>Order Total</span><strong>₹20,520</strong></p>
                                        </div>
                                    </div>
                                    <button className="btn btn-addcrd">Add 3 items to Cart</button>
                                </div>
                            </div>
                        </div>
                        <div className="lastview padding">
                            <div className="section-header">
                                <div className="section-title">Last Viewed</div>
                                <a href="#" className="view-all">View All</a>
                            </div>
                            <ul className="nav nav-tabs new-tab-div" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="tab1-tab" data-bs-toggle="tab" data-bs-target="#tab1-tab-pane" type="button"
                                        role="tab" aria-controls="tab1-tab-pane" aria-selected="true">Item 1</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="tab2-tab" data-bs-toggle="tab" data-bs-target="#tab2-tab-pane" type="button"
                                        role="tab" aria-controls="tab2-tab-pane" aria-selected="false">Item 2</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#tab3-tab-pane" type="button"
                                        role="tab" aria-controls="tab3-tab-pane" aria-selected="false">Item 3</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="tab4-tab" data-bs-toggle="tab" data-bs-target="#tab4-tab-pane" type="button"
                                        role="tab" aria-controls="tab4-tab-pane" aria-selected="false">Item 4</button>
                                </li>
                            </ul>
                            <div className="tab-content mt-4" id="myTabContent">
                                <div className="tab-pane fade show active" id="tab1-tab-pane" role="tabpanel" aria-labelledby="tab1-tab" tabIndex="0">
                                    <ProductCarousel products={productLastViewArray} />
                                </div>
                                <div className="tab-pane fade" id="tab2-tab-pane" role="tabpanel" aria-labelledby="tab2-tab" tabIndex="0">
                                    <div className="similar-product-caro similar-product-caro2 owl-carousel owl-theme">

                                    </div>
                                </div>
                                <div className="tab-pane fade" id="tab3-tab-pane" role="tabpanel" aria-labelledby="tab3-tab" tabIndex="0">
                                    <div className="similar-product-caro similar-product-caro3 owl-carousel owl-theme">

                                    </div>
                                </div>
                                <div className="tab-pane fade" id="tab4-tab-pane" role="tabpanel" aria-labelledby="tab4-tab" tabIndex="0">
                                    <div className="similar-product-caro similar-product-caro4 owl-carousel owl-theme">

                                    </div>
                                </div>
                            </div>

                        </div>
                        <ToastContainer />
                    </>
                    :
                    <>
                        <ProductSkeleton />
                    </>
            }

        </>
    )
}

'use client'
import React, { useEffect, useState } from 'react'
import { getLocalStorageData, hideLoader, opneLoginModal, opneQuickViewProductModal, removeLocalStorageData, setLocalStorageData, setPassData, setSessionStorageData, showLoader } from '../lib/common'
import Image from 'next/image'
import { consumercategoryapi, favouriteapi, productlistapi } from '../lib/apiService'
import { useRouter } from 'next/navigation'
import UsePagination from './UsePagination'
import { Rating } from 'react-simple-star-rating'
import ProductQuickViewModal from './_modal/ProductQuickViewModal'
import { toast, ToastContainer } from 'react-toastify'

export default function ProductListComponent({ id }) {
    const [isLoad, setIsLoad] = useState(false)
    const router = useRouter()
    const [productid, setProductId] = useState('')
    const [list, setList] = useState([])
    const [categoryfilterlist, setCategoryfilterlist] = useState([])
    const [sizefilterlist, setSizefilterlist] = useState([])
    const [colorfilterlist, setColorfilterlist] = useState([])
    const [pricefilterlist, setPricefilterlist] = useState([])
    const [discountfilterlist, setDiscountfilterlist] = useState([])
    const [ratingfilterlist, setRatingfilterlist] = useState([])
    const [categoryname, setCategoryName] = useState('')
    const [categoryid, setCategoryId] = useState('')
    const [count, setCount] = useState(0)

    const [limit, setlimit] = useState('15')
    const [page, setPage] = useState(0)
    const [offset, setoffset] = useState('0')

    const [categoryfiltteridarray, setcategoryfiltteridArray] = useState([])
    const [sizefiltter, setsizefiltter] = useState('')
    const [colorfiltter, setcolorfiltter] = useState('')
    const [pricefiltter, setpricefiltter] = useState('')
    const [discountfiltter, setdiscountfiltter] = useState('')
    const [ratingfiltter, setratingfiltter] = useState('')

    const [sortdropdown, setSortdropdown] = useState('Relevance')


    useEffect(() => {
        getdata(id, limit, offset, categoryfiltteridarray, sizefiltter, colorfiltter, pricefiltter, discountfiltter, ratingfiltter, sortdropdown)
        getcategorydata(id)
    }, [limit, offset, categoryfiltteridarray, sizefiltter, colorfiltter, pricefiltter, discountfiltter, ratingfiltter, sortdropdown])

    useEffect(() => {
        getfilterdata(id)
    }, [])

    const getdata = async (id, l, s, c, size, color, price, discount, rating, sd) => {
        showLoader()
        let data = {
            mstcategoryid: id,
            mstconsumerid: getLocalStorageData('consumer')?._id,
            limit: l,
            skip: s,
            categoryfiltteridarray: c,
            colorfiltter: color,
            sizefiltter: size,
            pricefiltter: price,
            discountfiltter: discount,
            ratingfiltter: rating,
            sortdropdown: sd,
            list: true
        }
        console.log("data", data);

        let response = await productlistapi(data)
        if (response.success) {
            const { result, listlength } = response;
            setList(result)
            setCount(listlength)
            let totalPage = Math.ceil(listlength / limit);
            setPage(totalPage);
            setIsLoad(true)
            hideLoader()
        } else {
            setList([])
            setCount(0)
            setIsLoad(true)
            hideLoader()
        }
    }

    const getcategorydata = async (id) => {
        showLoader()
        let data = { mstcategoryid: id, details: true }
        let response = await consumercategoryapi(data)
        if (response.success) {
            const { result } = response;
            setCategoryName(result.name);
            setCategoryId(result._id)
            hideLoader()
        } else {
            hideLoader()
            setCategoryName('');
            setCategoryId('')
        }
    }

    const goto = (path) => {
        showLoader()
        router.push("/consumer" + path)
        removeLocalStorageData("pathName")
        setLocalStorageData('pathName', path)
    }

    const handleChangePage = (e, val) => {
        let offeset = (val - 1) * limit;
        setoffset(offeset);
    };

    const removeCategoryClass = () => {
        var element = document.getElementById("categoryactive" + categoryid);
        element.classList.remove("active");
    }

    const resetid = () => {
        setProductId('')
    }

    const addTofavoruite = async (item) => {
        if (!getLocalStorageData('consumer')?._id) {
            opneLoginModal()
        } else {
            showLoader()
            let data = { mstconsumerid: getLocalStorageData('consumer')._id, mstproductid: item._id, status: item.favourite == "1" ? "1" : "0", addfavourite: true }
            let response = await favouriteapi(data)
            if (response.success) {
                getdata(id, limit, offset, categoryfiltteridarray, sizefiltter, colorfiltter, pricefiltter, discountfiltter, ratingfiltter, sortdropdown)
                onMessage(response.message, true)
            } else {
                getdata(id, limit, offset, categoryfiltteridarray, sizefiltter, colorfiltter, pricefiltter, discountfiltter, ratingfiltter, sortdropdown)
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

    const getfilterdata = async (id) => {
        showLoader()
        let data = { mstcategoryid: id, filtterlist: true }
        let response = await productlistapi(data)
        if (response.success) {
            const { result } = response;
            setCategoryfilterlist(result.category)
            setSizefilterlist(result.size)
            setColorfilterlist(result.color)
            setPricefilterlist(result.price)
            setDiscountfilterlist(result.discount)
            setRatingfilterlist(result.rating)
        } else {
            setCategoryfilterlist([])
            setSizefilterlist([])
            setColorfilterlist([])
            setPricefilterlist([])
            setDiscountfilterlist([])
            setRatingfilterlist([])
            hideLoader()
        }
    }

    const getfiltercategory = (number) => {
        setcategoryfiltteridArray(nums => nums.includes(number) ? nums.filter(n => n !== number) : [number, ...nums])
    }

    return (
        <>
            {
                isLoad ?
                    <>
                        <div className="lists-head">
                            <h4>Found results for <strong>{categoryname}</strong> <span>(Showing {count} items)</span></h4>
                            <div className="filtr-srch">
                                <select
                                    className="form-select"
                                    value={sortdropdown}
                                    onChange={(e) => { setSortdropdown(e.target.value) }}
                                >
                                    <option value="Relevance">Relevance</option>
                                    <option value="High to Low">Price (High to Low)</option>
                                    <option value="Low to High">Price (Low to High)</option>
                                    <option value="Discount">Discount</option>
                                    <option value="Rating">Rating</option>
                                </select>
                            </div>
                        </div>
                        <div className="bred-cm">
                            <ul>
                                <li className="bred-cm-it" onClick={() => { goto('/'); removeCategoryClass() }}>Home</li>
                                <li><i className="bi bi-chevron-right"></i></li>
                                <li className="bred-cm-curr">{categoryname}</li>
                            </ul>
                        </div>
                        <div className="product-lists padding">
                            <div className="product-lists-left">
                                <div className="prod-info">
                                    <div className="prod-info-inner">
                                        <div className="headng">
                                            <div className='filter-clear'>
                                                <h4>Filters</h4>
                                                <button>Clear All</button>
                                            </div></div>
                                        <div className="accordion" id="accordionExample">
                                            {
                                                categoryfilterlist.length > 0 ?
                                                    <>
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header">
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                                    data-bs-target="#collapsecategory" aria-expanded="false" aria-controls="collapsecategory">
                                                                    Category
                                                                </button>
                                                            </h2>
                                                            <div id="collapsecategory" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <ul>
                                                                        {
                                                                            categoryfilterlist.map((item, i) => (
                                                                                <li key={i}>
                                                                                    <div className="form-group">
                                                                                        <input
                                                                                            type="checkbox"
                                                                                            id={"checkbox" + item.name}
                                                                                            value=""
                                                                                            onChange={(e) => { getfiltercategory(item._id) }}
                                                                                        />
                                                                                        <label htmlFor={"checkbox" + item.name}>{item.name} </label>
                                                                                    </div>
                                                                                </li>
                                                                            ))
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                    :
                                                    <></>
                                            }

                                            {
                                                sizefilterlist.length > 0 ?
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header">
                                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                                data-bs-target="#collapsesize" aria-expanded="false" aria-controls="collapsesize">
                                                                Size
                                                            </button>
                                                        </h2>
                                                        <div id="collapsesize" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                <ul>
                                                                    {
                                                                        sizefilterlist.map((item, i) => (
                                                                            <li key={i}>
                                                                                <div className="form-group">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        id={"checkbox" + item}
                                                                                        value=""
                                                                                        onChange={(e) => { !sizefiltter ? setsizefiltter(item) : setsizefiltter('') }}
                                                                                    />
                                                                                    <label htmlFor={"checkbox" + item}>{item} </label>
                                                                                </div>
                                                                            </li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <></>
                                            }


                                            {
                                                colorfilterlist.length > 0 ?
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header">
                                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                                data-bs-target="#collapsecolor" aria-expanded="false" aria-controls="collapsecolor">
                                                                Color
                                                            </button>
                                                        </h2>
                                                        <div id="collapsecolor" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                <ul>
                                                                    {
                                                                        colorfilterlist.map((item, i) => (
                                                                            <li key={i}>
                                                                                <div className="form-group">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        id={"checkbox" + item}
                                                                                        value=""
                                                                                        onChange={(e) => { !colorfiltter ? setcolorfiltter(item) : setcolorfiltter('') }}
                                                                                    />
                                                                                    <label htmlFor={"checkbox" + item}>{item} </label>
                                                                                </div>
                                                                            </li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <></>
                                            }
                                            {
                                                pricefilterlist.length > 0 ?
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header">
                                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                                data-bs-target="#collapseprice" aria-expanded="false" aria-controls="collapseprice">
                                                                Price
                                                            </button>
                                                        </h2>
                                                        <div id="collapseprice" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                <ul>
                                                                    {
                                                                        pricefilterlist.map((item, i) => (
                                                                            <li key={i}>
                                                                                <div className="form-group">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        id={"checkbox" + item.value}
                                                                                        value=""
                                                                                        onChange={(e) => { !pricefiltter ? setpricefiltter(item.value) : setpricefiltter('') }}
                                                                                    />
                                                                                    <label htmlFor={"checkbox" + item.value}>{item.value} </label>
                                                                                </div>
                                                                            </li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <></>
                                            }
                                            {
                                                discountfilterlist.length > 0 ?
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header">
                                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                                data-bs-target="#collapsediscount" aria-expanded="false" aria-controls="collapsediscount">
                                                                Discount
                                                            </button>
                                                        </h2>
                                                        <div id="collapsediscount" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                <ul>
                                                                    {
                                                                        discountfilterlist.map((item, i) => (
                                                                            <li key={i}>
                                                                                <div className="form-group">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        id={"checkbox" + item.value}
                                                                                        value=""
                                                                                        onChange={(e) => { !discountfiltter ? setdiscountfiltter(item.value) : setdiscountfiltter('') }}
                                                                                    />
                                                                                    <label htmlFor={"checkbox" + item.value}>{item.value} </label>
                                                                                </div>
                                                                            </li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <></>
                                            }
                                            {
                                                ratingfilterlist.length > 0 ?
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header">
                                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                                data-bs-target="#collapserating" aria-expanded="false" aria-controls="collapserating">
                                                                Rating
                                                            </button>
                                                        </h2>
                                                        <div id="collapserating" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                <ul>
                                                                    {
                                                                        ratingfilterlist.map((item, i) => (
                                                                            <li key={i}>
                                                                                <div className="form-group">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        id={"checkbox" + item.value}
                                                                                        value=""
                                                                                        onChange={(e) => { !ratingfiltter ? setratingfiltter(item.value) : setratingfiltter('') }}
                                                                                    />
                                                                                    <label htmlFor={"checkbox" + item.value}>{item.value} </label>
                                                                                </div>
                                                                            </li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <></>
                                            }


                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="product-lists-right">
                                <div className="product-grid-unit myfavr">

                                    {/* Product list */}
                                    {
                                        list.length > 0 ?
                                            <>
                                                {list.map((item, i) => (
                                                    <div key={i} className="fade-in category-item">
                                                        <div className="fade-in category-item-img">
                                                            {
                                                                item.discount > 0 ? <span className="spn-offr">{item.discount}% Off</span> : <></>
                                                            }
                                                            <button className="btn ntn-favr" onClick={() => { addTofavoruite(item) }}><i className={`bi ${item.favourite == "1" ? "bi-heart-fill" : "bi-heart"}`}></i></button>
                                                            <button className="btn ntn-view" onClick={() => { opneQuickViewProductModal(); setProductId(item._id) }}><i className="bi bi-eye"></i></button>
                                                            <Image
                                                                src={"/upload/" + item.image}
                                                                alt="Fashion"
                                                                width={300}
                                                                height={100}
                                                                onClick={() => { goto('/product/' + item._id) }}
                                                            />
                                                        </div>
                                                        <div className="fade-in prod-dtls">
                                                            <p className='prod-txt-wp' onClick={() => { goto('/product/' + item._id) }}>{item.name}</p>
                                                            <div className="ratings">
                                                                <Rating initialValue={item.averate} readonly={true} size={20} />
                                                                <strong style={{ marginTop: "3px" }}>({item.rateingcount})</strong>
                                                            </div>
                                                            {
                                                                item.productquantity > 0 ?
                                                                    <>
                                                                        <strong>₹{item.netmrp}</strong>
                                                                        {
                                                                            item.discount > 0 ? <span className='prdls-mrp'>MRP <del>₹{item.productmrp}</del></span> : <></>
                                                                        }
                                                                    </>
                                                                    :
                                                                    <strong className='unbprdo'>Currently Unavailable</strong>
                                                            }

                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                            :
                                            <div style={{ margin: 'auto' }}>
                                                <Image
                                                    src="/assets/img/no-data.png"
                                                    width={600}
                                                    height={100}
                                                    alt='asd'
                                                />
                                            </div>
                                    }
                                </div>
                                <div className="pagin">
                                    <UsePagination handleChangePage={handleChangePage} page={page} />
                                </div>
                            </div>
                        </div>
                        <ProductQuickViewModal id={productid} resetid={resetid} />
                        <ToastContainer />
                    </>
                    :
                    <>
                    </>
            }
        </>
    )
}

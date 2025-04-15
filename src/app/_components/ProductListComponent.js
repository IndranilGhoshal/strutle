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
    const [categoryname, setCategoryName] = useState('')
    const [categoryid, setCategoryId] = useState('')
    const [count, setCount] = useState(0)

    const [limit, setlimit] = useState('15')
    const [page, setPage] = useState(0)
    const [offset, setoffset] = useState('0')

    useEffect(() => {
        getdata(id, limit, offset)
        getcategorydata(id)
    }, [limit, offset])

    const getdata = async (id, l, s) => {
        showLoader()
        let data = { mstcategoryid: id, mstconsumerid: getLocalStorageData('consumer')?._id, limit: l, skip: s, list: true }
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
                getdata(id, limit, offset)
                onMessage(response.message, true)
            } else {
                getdata(id, limit, offset)
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

    return (
        <>
            {
                isLoad ?
                    <>
                        <div className="lists-head">
                            <h4>Found results for <strong>{categoryname}</strong> <span>(Showing {count} items)</span></h4>
                            <div className="filtr-srch">
                                <select className="form-select">
                                    <option>Sort by Featured</option>
                                    <option>Sort by Popular</option>
                                    <option>Sort by Featured</option>
                                    <option>Sort by Featured</option>
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
                                            <h4>Filters</h4>
                                        </div>
                                        <div className="accordion" id="accordionExample">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header">
                                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                        data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                        Size
                                                    </button>
                                                </h2>
                                                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <ul>
                                                            <li>
                                                                <div className="form-group">
                                                                    <label htmlFor="checkbox1">Lorem Ipsum (123) </label><input type="checkbox" id="checkbox1" />
                                                                </div>

                                                            </li>
                                                            <li>
                                                                <div className="form-group">
                                                                    <label htmlFor="checkbox2">Lorem Ipsum (1230)</label><input type="checkbox" id="checkbox2" />
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="form-group">
                                                                    <label htmlFor="checkbox3">Lorem Ipsum (13) </label><input type="checkbox" id="checkbox3" />
                                                                </div>

                                                            </li>
                                                            <li>
                                                                <div className="form-group">
                                                                    <label htmlFor="checkbox4">Lorem Ipsum</label><input type="checkbox" id="checkbox4" />
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="form-group">
                                                                    <label htmlFor="checkbox5">Lorem Ipsum </label><input type="checkbox" id="checkbox5" />
                                                                </div>

                                                            </li>
                                                            <li>
                                                                <div className="form-group">
                                                                    <label htmlFor="checkbox6">Lorem Ipsum </label><input type="checkbox" id="checkbox6" />
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion-item">
                                                <h2 className="accordion-header">
                                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                        data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                        Brand
                                                    </button>
                                                </h2>
                                                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        Enter the pincode of your area to check product availability and delivery options
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion-item">
                                                <h2 className="accordion-header">
                                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                        data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                        Price
                                                    </button>
                                                </h2>
                                                <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">Enter the pincode of your area to check product availability and
                                                        delivery options
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion-item">
                                                <h2 className="accordion-header">
                                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                        data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                                        Discount
                                                    </button>
                                                </h2>
                                                <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">Enter the pincode of your area to check product availability and
                                                        delivery options
                                                    </div>
                                                </div>
                                            </div>


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

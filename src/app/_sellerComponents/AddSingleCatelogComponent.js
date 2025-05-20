'use client'
import React, { useEffect, useState } from 'react'
import { getLocalStorageData, hideLoader, removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common'
import Image from 'next/image'
import { catelogcategoryapi, uploadImageApi } from '../lib/apiService'
import { resizeFile } from '../lib/ImageCroper'
import { ToastContainer } from 'react-toastify'
import { Modal } from 'react-bootstrap'
import { useRouter } from 'next/navigation'

export default function AddSingleCatelogComponent() {
    const router = useRouter();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [list, setlist] = useState([])
    const [search, setsearch] = useState('')

    const [imagearray, setimagearray] = useState([])
    const [addproductdetailstab, setaddproductdetailstab] = useState(true)
    const [addcategorytab, setaddcategorytab] = useState(false)
    const [mstcategoryid, setmstcategoryid] = useState('')
    const [mstsubcategoryid, setmstsubcategoryid] = useState('')
    const [mstproducttypeid, setmstproducttypeid] = useState('')

    const [productname, setproductname] = useState('')
    const [producttitledescription, setproducttitledescription] = useState('')
    const [productmrp, setproductmrp] = useState('')
    const [productquantity, setproductquantity] = useState('')
    const [productdiscount, setproductdiscount] = useState('')
    const [hsn, sethsn] = useState('')
    const [igst, setigst] = useState('')
    const [size, setsize] = useState('')
    const [color, setcolor] = useState('')
    const [error, setError] = useState(false)



    useEffect(() => {
        getCategory(search)
    }, [search])

    const getCategory = async (s) => {
        let data = { search: s, list: true }
        let response = await catelogcategoryapi(data)
        if (response.success) {
            let res = response.result
            setlist(res)
            hideLoader()
        } else {
            setlist([])
            hideLoader()
        }
    }

    const uploadImg = async (f) => {
        showLoader()
        const image = await resizeFile(f);
        const data = new FormData();
        data.set("file", image);
        let result = await uploadImageApi(data)
        if (result.success) {
            let t = []
            let obj = {
                images: result.fileName
            }
            t.push(obj)
            setimagearray(t)
            hideLoader()
        } else {
            hideLoader()
        }
    }

    const showUpload = () => {
        const image = document.getElementById('productimagefile');
        image.click();
    }

    const removeimage = (index) => {
        let temp = [...imagearray]
        let m = []
        for (let [i, t] of temp.entries()) {
            if (i !== index) {
                m.push(t)
            }
        }
        setimagearray(m)
    }

    const gotonexttab = () => {
        showLoader()
        setaddcategorytab(true)
        setaddproductdetailstab(false)
        let modalelem = document.getElementById('uploadprodimgclsbtn')
        modalelem.click()
        setTimeout(() => {
            let elem = document.getElementById('add-product-tab')
            elem.click()
            hideLoader()
        }, 100);
    }

    const uploadsameImg = async (f) => {
        showLoader()
        const image = await resizeFile(f);
        const data = new FormData();
        data.set("file", image);
        let result = await uploadImageApi(data)
        if (result.success) {
            let data = { images: result.fileName }
            let t = [...imagearray]
            t.push(data)
            setimagearray(t)
            hideLoader()
        } else {
            hideLoader()
        }
    }

    const showsameUpload = () => {
        const image = document.getElementById('productsameimagefile');
        image.click();
    }

    const addEvent = async () => {
        let err = 0;
        setError(false)
        if (!productname ||
            !producttitledescription ||
            !productmrp ||
            !productquantity ||
            !productdiscount ||
            !hsn ||
            !igst ||
            !size ||
            !color
        ) {
            setError(true)
            err++
        }
        if (err == 0) {
            showLoader()
            let data = {
                mstsellerid: getLocalStorageData('seller')._id,
                mstcategoryid,
                mstsubcategoryid,
                mstproducttypeid,
                productname,
                producttitledescription,
                productmrp,
                productquantity,
                productdiscount,
                hsn,
                igst,
                size,
                color,
                imagearray,
                addproduct: true
            }
            let response = await catelogcategoryapi(data)
            if (response.success) {
                setShow(true)
                hideLoader()
            } else {
                hideLoader()
            }
        }
    }

    const goto = (path) => {
        handleClose()
        setTimeout(() => {
            showLoader()
            router.push("/seller/account" + path)
            removeLocalStorageData("pathName")
            setLocalStorageData('pathName', path)
        }, 150);
    }




    return (
        <>

            <div className="catalog-page">
                <div className="catalog-top">
                    <div className="catalog-ttle">
                        <strong>Add Catalog</strong>
                    </div>
                </div>
                <div className="catalog-tab">
                    <button className="btn btn-need-hlp">Need Help?</button>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        {/* Select Category */}
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link active"
                                id="add-category-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#add-category-pane"
                                type="button"
                                role="tab"
                                aria-controls="add-category-pane"
                                aria-selected="true"
                                disabled={addcategorytab}
                            >
                                Select Category
                            </button>
                        </li>
                        {/* Add Product Details */}
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link"
                                id="add-product-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#add-product-pane"
                                type="button"
                                role="tab"
                                aria-controls="add-product-pane"
                                aria-selected="false"
                                disabled={addproductdetailstab}
                            >
                                Add Product Details
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        {/* Select Category */}
                        <div className="tab-pane fade show active" id="add-category-pane" role="tabpanel" aria-labelledby="add-category-tab"
                            tabIndex="0">
                            <div className="catalog-src">
                                <label>Search Category</label>
                                <input
                                    className="form-control"
                                    placeholder="Search"
                                    type="text"
                                    value={search}
                                    onChange={(e) => { setsearch(e.target.value) }}
                                />
                                <button className="btn btn-srces"><i className="bi bi-search"></i></button>
                            </div>
                            <div className="catalog-page-side">
                                <ul id="menu">
                                    {
                                        list.length > 0 && list.map((item, i) => (
                                            <div key={i}>
                                                <li ><a>{item.category.categoryname}</a>
                                                    <ul>
                                                        {
                                                            item.category.subcategory.length > 0 ?
                                                                item.category.subcategory.map((obj, index) => (
                                                                    <div key={index}>
                                                                        <li ><a>{obj.subcategoryname}</a>
                                                                            {
                                                                                obj.producttype.length > 0 ?
                                                                                    <>
                                                                                        <ul>
                                                                                            {
                                                                                                obj.producttype.map((data, ind) => (
                                                                                                    <li key={ind}><a>{data.producttypename}</a>
                                                                                                        <ul className="prod-ul">
                                                                                                            <li>
                                                                                                                <div className="add-prod-img">
                                                                                                                    {
                                                                                                                        data.producttypeimage ?
                                                                                                                            <Image width={500} height={100} alt='no' src={"/upload/" + data.producttypeimage} />
                                                                                                                            :
                                                                                                                            <Image width={500} height={100} alt='no' src="/assets/img/product-type-icon.png" />
                                                                                                                    }
                                                                                                                    <p>Please Provide only front image for each product</p>
                                                                                                                    <button
                                                                                                                        data-bs-toggle="modal"
                                                                                                                        data-bs-target="#uploadprodimg"
                                                                                                                        onClick={() => { setmstcategoryid(item.category.categoryid); setmstsubcategoryid(obj.subcategoryid); setmstproducttypeid(data.producttypeid) }}
                                                                                                                    >
                                                                                                                        <i className="bi bi-upload"></i> Add Product Images
                                                                                                                    </button>
                                                                                                                    <div className="info-msg"> <i
                                                                                                                        className="bi bi-exclamation-circle"></i>
                                                                                                                        Product will be picked up from this location for
                                                                                                                        delivery
                                                                                                                    </div>
                                                                                                                    <div className="gnrl-gdlin">
                                                                                                                        <p><strong>General Guidlines</strong></p>
                                                                                                                        <ol>
                                                                                                                            <li>You can add minimum 1 and maxium 9
                                                                                                                                products to create a catalog</li>
                                                                                                                            <li>You can add minimum 1 and maxium 9
                                                                                                                                products to create a catalog</li>
                                                                                                                        </ol>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </li>
                                                                                                        </ul>
                                                                                                    </li>
                                                                                                ))
                                                                                            }
                                                                                        </ul>
                                                                                    </>
                                                                                    :
                                                                                    <></>
                                                                            }
                                                                        </li>
                                                                    </div>
                                                                ))
                                                                :
                                                                <></>
                                                        }
                                                    </ul>
                                                </li>
                                            </div>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        {/* Add Product Details */}
                        <div className="tab-pane fade" id="add-product-pane" role="tabpanel" aria-labelledby="add-product-tab"
                            tabIndex="0">
                            <div className="addprod-catl">
                                <div className="img-upld-sc">
                                    {
                                        imagearray.length > 0 ?
                                            <>
                                                {
                                                    imagearray.length > 0 && imagearray.map((item, i) => (
                                                        <div key={i}>
                                                            {
                                                                i == 0 &&
                                                                <div className="uploded-imgs">
                                                                    <Image width={100} height={100} alt='no' src={"/upload/" + item.images} />
                                                                </div>
                                                            }
                                                        </div>
                                                    ))
                                                }
                                            </>
                                            :
                                            <></>
                                    }
                                </div>
                            </div>
                            <div className="addprod-dtls">
                                <div className="addprod-dtls-left">
                                    <div className="addprod-dtls-enter">
                                        <h4>Products Details</h4>
                                        <div className="row">
                                            <div className="col-md-12 mb-3">
                                                <label>Product Name <span className="star-spn">*</span></label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${error && !productname ? "error-txt" : ""}`}
                                                    value={productname}
                                                    onChange={(e) => { setproductname(e.target.value) }}
                                                />
                                                {
                                                    error && !productname && <div className='input-error'>Please enter product name</div>
                                                }
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>Product Description <span className="star-spn">*</span></label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${error && !producttitledescription ? "error-txt" : ""}`}
                                                    value={producttitledescription}
                                                    onChange={(e) => { setproducttitledescription(e.target.value) }}
                                                />
                                                {
                                                    error && !producttitledescription && <div className='input-error'>Please enter product description</div>
                                                }
                                            </div>
                                        </div>
                                        <h4>Products Size & Color and Inventory</h4>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label>Size <span className="star-spn">*</span></label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${error && !size ? "error-txt" : ""}`}
                                                    value={size}
                                                    onChange={(e) => { setsize(e.target.value) }}
                                                />
                                                {
                                                    error && !size && <div className='input-error'>Please enter size</div>
                                                }
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label>Color <span className="star-spn">*</span></label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${error && !color ? "error-txt" : ""}`}
                                                    value={color}
                                                    onChange={(e) => { setcolor(e.target.value) }}
                                                />
                                                {
                                                    error && !color && <div className='input-error'>Please enter color</div>
                                                }
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label>Net Quantity <span className="star-spn">*</span></label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${error && !productquantity ? "error-txt" : ""}`}
                                                    value={productquantity}
                                                    onChange={(e) => { setproductquantity(e.target.value) }}
                                                />
                                                {
                                                    error && !productquantity && <div className='input-error'>Please enter product quantity</div>
                                                }
                                            </div>
                                        </div>
                                        <h4>Products Price</h4>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label>MRP <span className="star-spn">*</span></label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${error && !productmrp ? "error-txt" : ""}`}
                                                    value={productmrp}
                                                    onChange={(e) => { setproductmrp(e.target.value) }}
                                                />
                                                {
                                                    error && !productmrp && <div className='input-error'>Please enter product mrp</div>
                                                }
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label>Discount <span className="star-spn">*</span></label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${error && !productdiscount ? "error-txt" : ""}`}
                                                    value={productdiscount}
                                                    onChange={(e) => { setproductdiscount(e.target.value) }}
                                                />
                                                {
                                                    error && !productdiscount && <div className='input-error'>Please enter product discount</div>
                                                }
                                            </div>
                                        </div>
                                        <h4>Tax</h4>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label>HSN No. <span className="star-spn">*</span></label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${error && !hsn ? "error-txt" : ""}`}
                                                    value={hsn}
                                                    onChange={(e) => { sethsn(e.target.value) }}
                                                />
                                                {
                                                    error && !hsn && <div className='input-error'>Please enter hsn</div>
                                                }
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label>GST Tax <span className="star-spn">*</span></label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${error && !igst ? "error-txt" : ""}`}
                                                    value={igst}
                                                    onChange={(e) => { setigst(e.target.value) }}
                                                />
                                                {
                                                    error && !igst && <div className='input-error'>Please enter gst</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="addprod-dtls-righ">
                                    <div className="info-msg"> <i className="bi bi-exclamation-circle"></i>
                                        Product will be picked up from this location for delivery
                                    </div>
                                    <div className="gnrl-gdlin">
                                        <p><strong>Image Guidlines</strong></p>
                                        <ol>
                                            <li>You can add minimum 1 and maxium 9
                                                products to create a catalog</li>
                                            <li>You can add minimum 1 and maxium 9
                                                products to create a catalog</li>
                                            <li>You can add minimum 1 and maxium 9
                                                products to create a catalog</li>
                                        </ol>
                                    </div>
                                    <div className="upld-img-scn">
                                        <strong className="mb-3 d-block">Upload Image</strong>
                                        <div className="img-upld-sc">
                                            {
                                                imagearray.length > 0 &&
                                                imagearray.map((item, i) => (
                                                    <div key={i} className="uploded-imgs">
                                                        <Image width={100} height={100} alt='no' src={"/upload/" + item.images} />
                                                        {
                                                            i !== 0 && <i onClick={() => { removeimage(i) }} className="bi bi-x-circle"></i>
                                                        }
                                                    </div>
                                                ))
                                            }
                                            <div className="upl-file cp" onClick={() => { showsameUpload() }}>
                                                <input
                                                    style={{ display: 'none' }}
                                                    id="productsameimagefile"
                                                    type="file"
                                                    name="file"
                                                    onChange={(e) => { uploadsameImg(e.target.files?.[0]) }}
                                                    accept="image/jpg,image/jpeg,image/png"
                                                />
                                                <i className="bi bi-plus-circle-dotted"></i>
                                                <strong>Add</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="cancl-btndv">
                                <button className="btn btn-clz">Cancel</button>
                                <button className="btn btn-can-ord" data-bs-toggle="modal"
                                    data-bs-target="#uploadprodimgsubmit" onClick={() => { addEvent() }}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Image Upload Modal */}
            <div className="modal fade" id="uploadprodimg" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Products in a catalog</h5>
                            <button
                                id="uploadprodimgclsbtn"
                                type="button"
                                className="close-button p-0 border-0 bg-white"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="uplod-mod-top">
                                <p className='e-Sign-p'>Please add only front image of your product. If you want to add multiple images for particular product, you can add it in next step</p>
                            </div>
                            <div className="uplod-mod-div">
                                <div className="uplod-lft">
                                    <div className="info-msg"> <i className="bi bi-exclamation-circle mx-2"></i>
                                        You can add minimum 1 image
                                    </div>
                                    <div className="img-upld-sc">
                                        {
                                            imagearray.length > 0 ?
                                                <>
                                                    {
                                                        imagearray.map((item, i) => (
                                                            <div className="uploded-imgs" key={i}>
                                                                <Image width={500} height={100} alt='no' src={"/upload/" + item.images} />
                                                                <i onClick={() => { removeimage(i) }} className="bi bi-x-circle"></i>
                                                            </div>
                                                        ))
                                                    }
                                                </>
                                                :
                                                <>
                                                    <input
                                                        style={{ display: 'none' }}
                                                        id="productimagefile"
                                                        type="file"
                                                        name="file"
                                                        onChange={(e) => { uploadImg(e.target.files?.[0]) }}
                                                        accept="image/jpg,image/jpeg,image/png"
                                                    />
                                                    <div className="upl-file cp" onClick={() => { showUpload() }}>
                                                        <i className="bi bi-plus-circle-dotted"></i>
                                                        <strong>Add</strong>
                                                    </div>
                                                </>
                                        }
                                    </div>
                                </div>
                                <div className="uplod-list">
                                    <div className="info-msg text-danger"> <i className="bi bi-ban mx-2"></i>
                                        Image types which are not allowed
                                    </div>
                                    <div className="uplod-list-div">
                                        <ul>
                                            <li>
                                                <Image width={500} height={100} alt='no' src="/assets/img/image-23.png" />
                                                <div className="list-div-in">
                                                    <strong>Watermark Image</strong>
                                                    <p><i className="bi bi-ban"></i> Not Allowed</p>
                                                </div>
                                            </li>
                                            <li>
                                                <Image width={500} height={100} alt='no' src="/assets/img/image-23.png" />
                                                <div className="list-div-in">
                                                    <strong>Watermark Image</strong>
                                                    <p><i className="bi bi-ban"></i> Not Allowed</p>
                                                </div>
                                            </li>
                                            <li>
                                                <Image width={500} height={100} alt='no' src="/assets/img/image-23.png" />
                                                <div className="list-div-in">
                                                    <strong>Watermark Image</strong>
                                                    <p><i className="bi bi-ban"></i> Not Allowed</p>
                                                </div>
                                            </li>
                                            <li>
                                                <Image width={500} height={100} alt='no' src="/assets/img/image-23.png" />
                                                <div className="list-div-in">
                                                    <strong>Watermark Image</strong>
                                                    <p><i className="bi bi-ban"></i> Not Allowed</p>
                                                </div>
                                            </li>
                                            <li>
                                                <Image width={500} height={100} alt='no' src="/assets/img/image-23.png" />
                                                <div className="list-div-in">
                                                    <strong>Watermark Image</strong>
                                                    <p><i className="bi bi-ban"></i> Not Allowed</p>
                                                </div>
                                            </li>
                                            <li>
                                                <Image width={500} height={100} alt='no' src="/assets/img/image-23.png" />
                                                <div className="list-div-in">
                                                    <strong>Watermark Image</strong>
                                                    <p><i className="bi bi-ban"></i> Not Allowed</p>
                                                </div>
                                            </li>
                                            <li>
                                                <Image width={500} height={100} alt='no' src="/assets/img/image-23.png" />
                                                <div className="list-div-in">
                                                    <strong>Watermark Image</strong>
                                                    <p><i className="bi bi-ban"></i> Not Allowed</p>
                                                </div>
                                            </li>
                                            <li>
                                                <Image width={500} height={100} alt='no' src="/assets/img/image-23.png" />
                                                <div className="list-div-in">
                                                    <strong>Watermark Image</strong>
                                                    <p><i className="bi bi-ban"></i> Not Allowed</p>
                                                </div>
                                            </li>

                                            <li>
                                                <Image width={500} height={100} alt='no' src="/assets/img/image-23.png" />
                                                <div className="list-div-in">
                                                    <strong>Watermark Image</strong>
                                                    <p><i className="bi bi-ban"></i> Not Allowed</p>
                                                </div>
                                            </li>
                                            <li>
                                                <Image width={500} height={100} alt='no' src="/assets/img/image-23.png" />
                                                <div className="list-div-in">
                                                    <strong>Watermark Image</strong>
                                                    <p><i className="bi bi-ban"></i> Not Allowed</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="cancl-btndv">
                                <button className="btn btn-can-ord" disabled={imagearray.length == 0} onClick={() => { gotonexttab() }}>Continue</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <ToastContainer />
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body style={{ padding: '10px' }}>
                    <button id="successsignupbtncls" onClick={() => { handleClose() }} style={{ display: "none" }} type="button" className="close-button abslt" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg"></i></button>
                    <div className="success-ord">
                        <div className="success-ord-inr">
                            <span><Image src={"/assets/img/verified-icn.png"} width={100} height={100} alt='nocart' /></span>
                            <strong>Product added successfully</strong>
                            <button className="btn btn-vw-ordr" onClick={() => { goto('/catelogs') }} >Login</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

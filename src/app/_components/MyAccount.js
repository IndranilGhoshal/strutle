'use client'
import React, { useContext, useEffect, useState } from 'react'
import { getLocalStorageData, hideLoader, removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation';
import PersonalInformationComponent from './PersonalInformationComponent';
import { toast, ToastContainer } from 'react-toastify';
import { consumeruserapi, favouriteapi, orderapi, shippingaddressapi, uploadImageApi } from '../lib/apiService';
import { resizeFile } from '../lib/ImageCroper';
import { AppContext } from '../consumer/layout';
import FavouriteComponent from './FavouriteComponent';
import ProductListSkeleton from './_skeleton/ProductListSkeleton';
import OrderComponent from './OrderComponent';
import ManageAddressComponent from './ManageAddressComponent';
import AddAddressModal from './_modal/AddAddressModal';
import OrderListSkeleton from './_skeleton/OrderListSkeleton';
import GiftListComponent from './GiftListComponent';

export default function MyAccount() {
    const { setUserImage } = useContext(AppContext);
    const router = useRouter();
    const searchparams = useSearchParams();
    const [user, setUser] = useState({})
    const [favouriteList, setFavouriteList] = useState([])
    const [limitfavouriteList, setlimitfavouriteList] = useState('15')
    const [pagefavouriteList, setPagefavouriteList] = useState(0)
    const [offsetfavouriteList, setoffsetfavouriteList] = useState('0')

    const [productid, setProductId] = useState('')
    const [isLoad, setIsLoad] = useState(false)
    const [isLoadFavourite, setIsLoadFavourite] = useState(false)
    const [isLoadOrder, setIsLoadOrder] = useState(false)

    const [orderList, setOrderList] = useState([])
    const [limitorderList, setlimitorderList] = useState('5')
    const [pageorderList, setPageorderList] = useState(0)
    const [offsetorderList, setoffsetorderList] = useState('0')
    const [orderSearch, setorderSearch] = useState('')

    const [addressarray, setAddressArray] = useState([])

    const [isAddressLoad, setIsAddressLoad] = useState(false)

    const resetid = () => {
        setProductId('')
    }
    const search = searchparams.get('tab')

    useEffect(() => {
        if (getLocalStorageData('consumer')?._id) {
            router.push("/consumer/myaccount");
            let u = getLocalStorageData('consumer')
            if (u) {
                setUser(u)
            }
            setIsLoad(true)
            setTimeout(() => {
                if (search) {
                    var element = document.getElementById(search);
                    element.click()
                }
                if (!search) {
                    var element = document.getElementById("personal-info-tab");
                    element.click()
                }
            }, 100);
        } else {
            router.push("/consumer");
        }
    }, [])

    useEffect(() => {
        getFavouriteData(limitfavouriteList, offsetfavouriteList)
    }, [limitfavouriteList, offsetfavouriteList])

    useEffect(() => {
        getOrderData(limitorderList, offsetorderList, orderSearch)
    }, [limitorderList, offsetorderList, orderSearch])

    useEffect(() => {
        getAddressData()
    }, [])

    const onMessage = (mes, sus) => {
        if (sus) {
            toast.success(mes)
        } else {
            toast.error(mes)
        }
    }

    const showUpload = () => {
        const image = document.getElementById('consumer_image');
        image.click();
    }

    const uploadImg = async (f) => {
        showLoader()
        const image = await resizeFile(f);
        const data = new FormData();
        data.set("file", image);
        let results = await uploadImageApi(data)
        setUserImage(results.fileName)
        if (results.success) {
            let response = await consumeruserapi({ id: getLocalStorageData('consumer')?._id, image: results.fileName, uploadimage: true })
            if (response.success) {
                hideLoader()
                let r = await consumeruserapi({ id: getLocalStorageData('consumer')?._id, details: true })
                let res = r.result
                setUser(res)
                removeLocalStorageData("consumer")
                delete res.password;
                setLocalStorageData("consumer", res)
                onMessage(response.message, true)
            } else {
                hideLoader()
                onMessage(response.message, false)
            }
        } else {
            hideLoader()
            setImage('')
            onMessage(results.message, false)
        }
    }

    const getFavouriteData = async (l, s) => {
        showLoader()
        let data = { mstconsumerid: getLocalStorageData('consumer')?._id, limit: l, skip: s, favouritelist: true }
        let response = await favouriteapi(data)
        if (response.success) {
            const { result, listlength } = response;
            setFavouriteList(result)
            let totalPage = Math.ceil(listlength / limitfavouriteList);
            setPagefavouriteList(totalPage);
            setIsLoadFavourite(true)
            hideLoader()
        } else {
            setPagefavouriteList([])
            setIsLoadFavourite(true)
            hideLoader()
        }
    }

    const handleChangeFavouriteDataPage = (e, val) => {
        let offeset = (val - 1) * limitfavouriteList;
        setoffsetfavouriteList(offeset);
    };

    const goto = (path) => {
        showLoader()
        router.push("/consumer" + path)
        removeLocalStorageData("pathName")
        setLocalStorageData('pathName', path)
        hideLoader()
    }

    const addTofavoruite = async (item) => {
        showLoader()
        let data = { mstconsumerid: getLocalStorageData('consumer')?._id, mstproductid: item._id, status: "1", addfavourite: true }
        let response = await favouriteapi(data)
        if (response.success) {
            getFavouriteData(limitfavouriteList, offsetfavouriteList)
            onMessage(response.message, true)
        } else {
            getFavouriteData(limitfavouriteList, offsetfavouriteList)
            onMessage(response.message, false)
        }
    }

    const getOrderData = async (l, s, o) => {
        showLoader()
        let data = { mstconsumerid: getLocalStorageData('consumer')?._id, limit: l, skip: s, search: o, listorder: true }
        let response = await orderapi(data)
        if (response.success) {
            const { result, listlength } = response;
            setOrderList(result)
            let totalPage = Math.ceil(listlength / limitorderList);
            setPageorderList(totalPage);
            setIsLoadOrder(true)
            hideLoader()
        } else {
            setOrderList([])
            setIsLoadOrder(true)
            hideLoader()
        }
    }

    const handleChangeOrderDataPage = (e, val) => {
        let offeset = (val - 1) * limitorderList;
        setoffsetorderList(offeset);
    };

    const getAddressData = async () => {
        showLoader()
        let response = await shippingaddressapi({ mstconsumerid: getLocalStorageData('consumer')?._id, addresslist: true })
        if (response.success) {
            setAddressArray(response.result)
            setIsAddressLoad(true)
            hideLoader()
        } else {
            setAddressArray([])
            setIsAddressLoad(true)
            hideLoader()
        }
    }

    const addressdefaultChange = async (aid) => {
        showLoader()
        let response = await shippingaddressapi({ id: aid, mstconsumerid: getLocalStorageData('consumer')?._id, isdefault: "1", ondefault: true })
        if (response.success) {
            onMessage(response.message, true)
            getAddressData()
            hideLoader()
        } else {
            onMessage(response.message, false)
            getAddressData()
            hideLoader()
        }
    }

    const addressDelete = async (aid) => {
        showLoader()
        let response = await shippingaddressapi({ id: aid, mstconsumerid: getLocalStorageData('consumer')?._id, status: "1", ondelete: true })
        if (response.success) {
            onMessage(response.message, true)
            getAddressData()
            hideLoader()
        } else {
            onMessage(response.message, false)
            getAddressData()
            hideLoader()
        }
    }

    return (
        <>
            {
                isLoad ?
                    <>
                        <div className="myaccnt padding">
                            <div className="myaccnt-left">
                                <div className="user-dtl">
                                    <div className="user-dtl-l">
                                        <div className="avt-im">
                                            {
                                                user.image ?
                                                    <Image
                                                        src={'/upload/' + user.image}
                                                        width={100}
                                                        height={100}
                                                        alt='logo'
                                                    />
                                                    :
                                                    <Image
                                                        src={'/assets/img/avtr.png'}
                                                        width={100}
                                                        height={100}
                                                        alt='logo'
                                                    />
                                            }
                                        </div>
                                        <span>
                                            <Image
                                                src={'/assets/img/cam-icn.png'}
                                                width={25}
                                                height={25}
                                                alt='logo'
                                                onClick={() => { showUpload() }}
                                            />
                                            <input
                                                style={{ display: 'none' }}
                                                id="consumer_image"
                                                type="file"
                                                name="file"
                                                accept="image/jpg,image/jpeg,image/png"
                                                className={`form-control`}
                                                onChange={(e) => { uploadImg(e.target.files?.[0]) }}
                                            />
                                        </span>
                                    </div>
                                    <div className="user-dtl-r">
                                        <span>Hello 👋 </span>
                                        <strong>
                                            {
                                                user.firstname ? user.firstname + " " : <></>
                                            }
                                            {
                                                user.lastname ? user.lastname : <></>
                                            }
                                        </strong>
                                    </div>
                                </div>
                                {/* Nav */}
                                <nav>
                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                        {/* Personal Information */}
                                        <button
                                            onClick={() => { goto('/myaccount?tab=personal-info-tab') }}
                                            className="nav-link active"
                                            id="personal-info-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#personal-info"
                                            type="button"
                                            role="tab"
                                            aria-controls="personal-info"
                                            aria-selected="true"
                                        >
                                            <Image
                                                src={'/assets/img/tab-icn1.png'}
                                                width={25}
                                                height={25}
                                                alt='logo'
                                            />
                                            Personal Information
                                        </button>
                                        {/* My Orders */}
                                        <button
                                            onClick={() => { goto('/myaccount?tab=my-order-tab') }}
                                            className="nav-link"
                                            id="my-order-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#my-order"
                                            type="button"
                                            role="tab"
                                            aria-controls="my-order"
                                            aria-selected="false"
                                        >
                                            <Image
                                                src={'/assets/img/tab-icn2.png'}
                                                width={25}
                                                height={25}
                                                alt='logo'
                                            />
                                            My Orders
                                        </button>
                                        {/* Manage Addresses */}
                                        <button
                                            onClick={() => { goto('/myaccount?tab=manage-addrs-tab') }}
                                            className="nav-link"
                                            id="manage-addrs-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#manage-addrs"
                                            type="button"
                                            role="tab"
                                            aria-controls="manage-addrs"
                                            aria-selected="false"
                                        >
                                            <Image
                                                src={'/assets/img/tab-icn3.png'}
                                                width={25}
                                                height={25}
                                                alt='logo'
                                            />
                                            Manage Addresses
                                        </button>
                                        {/* Saved Cards  */}
                                        <button
                                            onClick={() => { goto('/myaccount?tab=save-cards-tab') }}
                                            className="nav-link"
                                            id="save-cards-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#save-cards"
                                            type="button"
                                            role="tab"
                                            aria-controls="save-cards"
                                            aria-selected="false"
                                        >
                                            <Image
                                                src={'/assets/img/tab-icn4.png'}
                                                width={25}
                                                height={25}
                                                alt='logo'
                                            />
                                            Saved Cards
                                        </button>
                                        {/* Srutle Money */}
                                        <button
                                            onClick={() => { goto('/myaccount?tab=sru-mony-tab') }}
                                            className="nav-link"
                                            id="sru-mony-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#sru-mony"
                                            type="button"
                                            role="tab"
                                            aria-controls="sru-mony"
                                            aria-selected="true"
                                        >
                                            <Image
                                                src={'/assets/img/tab-icn5.png'}
                                                width={25}
                                                height={25}
                                                alt='logo'
                                            />
                                            Srutle Money
                                        </button>
                                        {/* Gift Card */}
                                        <button
                                            onClick={() => { goto('/myaccount?tab=my-giftcrd-tab') }}
                                            className="nav-link"
                                            id="my-giftcrd-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#my-giftcrd"
                                            type="button"
                                            role="tab"
                                            aria-controls="my-giftcrd"
                                            aria-selected="false"
                                        >
                                            <Image
                                                src={'/assets/img/tab-icn6.png'}
                                                width={25}
                                                height={25}
                                                alt='logo'
                                            />
                                            Gift Card
                                        </button>
                                        {/* Coupons */}
                                        <button
                                            onClick={() => { goto('/myaccount?tab=my-copun-tab') }}
                                            className="nav-link"
                                            id="my-copun-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#my-copun"
                                            type="button"
                                            role="tab"
                                            aria-controls="my-copun"
                                            aria-selected="false"
                                        >
                                            <Image
                                                src={'/assets/img/tab-icn7.png'}
                                                width={25}
                                                height={25}
                                                alt='logo'
                                            />
                                            Coupons
                                        </button>
                                        {/* My Favourites */}
                                        <button
                                            onClick={() => { goto('/myaccount?tab=my-favrot-tab') }}
                                            className="nav-link"
                                            id="my-favrot-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#my-favrot"
                                            type="button"
                                            role="tab"
                                            aria-controls="my-favrot"
                                            aria-selected="false"
                                        >
                                            <Image
                                                src={'/assets/img/tab-icn8.png'}
                                                width={25}
                                                height={25}
                                                alt='logo'
                                            />
                                            My Favourites
                                        </button>
                                        {/* My Resale Items */}
                                        <button
                                            onClick={() => { goto('/myaccount?tab=my-resal-tab') }}
                                            className="nav-link"
                                            id="my-resal-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#my-resal"
                                            type="button"
                                            role="tab"
                                            aria-controls="my-resal"
                                            aria-selected="true">
                                            <Image
                                                src={'/assets/img/tab-icn9.png'}
                                                width={25}
                                                height={25}
                                                alt='logo'
                                            />
                                            My Resale Items
                                        </button>
                                        {/* Referral */}
                                        <button
                                            onClick={() => { goto('/myaccount?tab=my-refer-tab') }}
                                            className="nav-link"
                                            id="my-refer-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#my-refer"
                                            type="button"
                                            role="tab"
                                            aria-controls="my-refer"
                                            aria-selected="false"
                                        >
                                            <Image
                                                src={'/assets/img/tab-icn10.png'}
                                                width={25}
                                                height={25}
                                                alt='logo'
                                            />
                                            Referral
                                        </button>
                                        {/* Preferences */}
                                        <button
                                            onClick={() => { goto('/myaccount?tab=my-prefer-tab') }}
                                            className="nav-link"
                                            id="my-prefer-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#my-prefer"
                                            type="button"
                                            role="tab"
                                            aria-controls="my-prefer"
                                            aria-selected="false">
                                            <Image
                                                src={'/assets/img/tab-icn11.png'}
                                                width={25}
                                                height={25}
                                                alt='logo'
                                            />
                                            Preferences
                                        </button>
                                        {/* Logout */}
                                        <button
                                            className="nav-link"
                                            id="my-logut-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#my-logut"
                                            type="button"
                                            role="tab"
                                            aria-controls="my-logut"
                                            aria-selected="false">
                                            <Image
                                                src={'/assets/img/tab-icn12.png'}
                                                width={25}
                                                height={25}
                                                alt='logo'
                                            />
                                            Logout
                                        </button>
                                    </div>
                                </nav>

                            </div>

                            <div className="myaccnt-right">
                                {/* Tab */}
                                <div className="tab-content" id="nav-tabContent">
                                    {/* Personal Information */}
                                    <div className="tab-pane fade show active" id="personal-info" role="tabpanel" aria-labelledby="personal-info-tab"
                                        tabIndex="0">
                                        <PersonalInformationComponent onMessage={onMessage} setUser={setUser} />
                                    </div>
                                    {/* My Orders */}
                                    <div className="tab-pane fade" id="my-order" role="tabpanel" aria-labelledby="my-order-tab" tabIndex="0">
                                        {
                                            isLoadOrder ?
                                                <OrderComponent
                                                    handleChangeOrderDataPage={handleChangeOrderDataPage}
                                                    orderList={orderList}
                                                    pageorderList={pageorderList}
                                                    goto={goto}
                                                    setorderSearch={setorderSearch}
                                                    orderSearch={orderSearch}
                                                />
                                                :
                                                <><OrderListSkeleton /></>
                                        }
                                    </div>
                                    {/* Manage Addresses */}
                                    <div className="tab-pane fade" id="manage-addrs" role="tabpanel" aria-labelledby="manage-addrs-tab" tabIndex="0">
                                        <div className="tab-headng">
                                            <h4>Manage Address</h4><AddAddressModal onMessage={onMessage} addressarray={addressarray} getAddressData={getAddressData} />
                                        </div>
                                        <ManageAddressComponent
                                            isAddressLoad={isAddressLoad}
                                            addressarray={addressarray}
                                            addressdefaultChange={addressdefaultChange}
                                            addressDelete={addressDelete}
                                            onMessage={onMessage}
                                            getAddressData={getAddressData}
                                        />

                                    </div>
                                    {/* Saved Cards  */}
                                    <div className="tab-pane fade" id="save-cards" role="tabpanel" aria-labelledby="save-cards-tab" tabIndex="0">
                                        <div className="tab-headng">
                                            <h4>Save Cards</h4><a href="">Add New Card</a>
                                        </div>
                                        <div className="avl-offr-inr my-copun my-addrs">
                                            <div className="avl-offr-inr-div active">
                                                <div className="my-addres">
                                                    <span className="bnklogo">
                                                        <Image
                                                            src={'/assets/img/ban-img1.png'}
                                                            width={100}
                                                            height={100}
                                                            alt='logo'
                                                        />
                                                    </span>
                                                    <div>
                                                        <strong>Axis Bank Debit Card</strong>
                                                        <p className="m-0">Christian Tiegland<br />
                                                            123456XXXX2365<br />
                                                            EXP : 06/28</p>
                                                        <p>Contact - Mobile : (209) 555-0104</p>
                                                        <div className="add-edits">
                                                            <button className="btn btn-edts"><i className="bi bi-pencil-fill"></i></button>
                                                            <button className="btn btn-dlt"><i className="bi bi-trash"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="avl-offr-inr-div">
                                                <div className="my-addres">
                                                    <span className="bnklogo">
                                                        <Image
                                                            src={'/assets/img/ban-img2.png'}
                                                            width={100}
                                                            height={100}
                                                            alt='logo'
                                                        />
                                                    </span>
                                                    <div>
                                                        <strong>Axis Bank Debit Card</strong>
                                                        <p className="m-0">Christian Tiegland<br />
                                                            123456XXXX2365<br />
                                                            EXP : 06/28</p>
                                                        <p>Contact - Mobile : (209) 555-0104</p>
                                                        <div className="add-edits">
                                                            <button className="btn btn-edts"><i className="bi bi-pencil-fill"></i></button>
                                                            <button className="btn btn-dlt"><i className="bi bi-trash"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="avl-offr-inr-div">
                                                <div className="my-addres">
                                                    <span className="bnklogo">
                                                        <Image
                                                            src={'/assets/img/ban-img2.png'}
                                                            width={100}
                                                            height={100}
                                                            alt='logo'
                                                        />
                                                    </span>
                                                    <div>
                                                        <strong>Axis Bank Debit Card</strong>
                                                        <p className="m-0">Christian Tiegland<br />
                                                            123456XXXX2365<br />
                                                            EXP : 06/28</p>
                                                        <p>Contact - Mobile : (209) 555-0104</p>
                                                        <div className="add-edits">
                                                            <button className="btn btn-edts"><i className="bi bi-pencil-fill"></i></button>
                                                            <button className="btn btn-dlt"><i className="bi bi-trash"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="avl-offr-inr-div">
                                                <div className="my-addres">
                                                    <span className="bnklogo">
                                                        <Image
                                                            src={'/assets/img/ban-img2.png'}
                                                            width={100}
                                                            height={100}
                                                            alt='logo'
                                                        />
                                                    </span>
                                                    <div>
                                                        <strong>Axis Bank Debit Card</strong>
                                                        <p className="m-0">Christian Tiegland<br />
                                                            123456XXXX2365<br />
                                                            EXP : 06/28</p>
                                                        <p>Contact - Mobile : (209) 555-0104</p>
                                                        <div className="add-edits">
                                                            <button className="btn btn-edts"><i className="bi bi-pencil-fill"></i></button>
                                                            <button className="btn btn-dlt"><i className="bi bi-trash"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                    {/* Srutle Money */}
                                    <div className="tab-pane fade" id="sru-mony" role="tabpanel" aria-labelledby="sru-mony-tab" tabIndex="0">
                                        <div className="ttl-srv-mny">
                                            <div className="ttl-srv-txt">
                                                <h4>Total Srutle Money</h4>
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                                                    scrambled it to makebook.</p>
                                                <strong>Balance History</strong>
                                            </div>
                                            <div className="ttl-srv-prc">
                                                <strong>₹4,000</strong>
                                            </div>
                                        </div>
                                        <div className="redm-crd">
                                            <div className="ttl-srv-txt">
                                                <h4>Redeem Gift Card</h4>
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                                                    scrambled it to make a type specimen book.</p>
                                            </div>

                                        </div>
                                        <div className="prod-info">
                                            <div className="prod-info-inner">
                                                <div className="headng">
                                                    <h4>FAQ</h4>
                                                </div>
                                                <div className="accordion" id="accordionExample">
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header">
                                                            <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                                                data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                Question 1
                                                            </button>
                                                        </h2>
                                                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">Lorem Ipsum is simply dummy text of the printing and typesetting
                                                                industry.
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header">
                                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                Question 2
                                                            </button>
                                                        </h2>
                                                        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header">
                                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                                data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                Question 3
                                                            </button>
                                                        </h2>
                                                        <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header">
                                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                                data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                                Question 4
                                                            </button>
                                                        </h2>
                                                        <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">Enter the pincode of your area to check product availability and
                                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header">
                                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                                data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                                                Question 5
                                                            </button>
                                                        </h2>
                                                        <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">Enter the pincode of your area to check product availability and
                                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    {/* Gift Card */}
                                    <div className="tab-pane fade" id="my-giftcrd" role="tabpanel" aria-labelledby="my-giftcrd-tab" tabIndex="0">
                                        <GiftListComponent />
                                    </div>
                                    {/* Coupons */}
                                    <div className="tab-pane fade" id="my-copun" role="tabpanel" aria-labelledby="my-copun-tab" tabIndex="0">
                                        <h4 className="mb-3">Coupons</h4>
                                        <div className="avl-offr-inr my-copun">
                                            <div className="avl-offr-inr-div">
                                                <div className="avl-offr-inr-top">
                                                    <span>
                                                        <Image
                                                            src={'/assets/img/offer-icon.png'}
                                                            width={100}
                                                            height={100}
                                                            alt='logo'
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
                                        </div>
                                    </div>
                                    {/* My Favourites */}
                                    <div className="tab-pane fade" id="my-favrot" role="tabpanel" aria-labelledby="my-favrot-tab" tabIndex="0">
                                        {
                                            isLoadFavourite ?
                                                <FavouriteComponent
                                                    handleChangeFavouriteDataPage={handleChangeFavouriteDataPage}
                                                    favouriteList={favouriteList}
                                                    pagefavouriteList={pagefavouriteList}
                                                    goto={goto}
                                                    resetid={resetid}
                                                    productid={productid}
                                                    setProductId={setProductId}
                                                    addTofavoruite={addTofavoruite}
                                                />
                                                :
                                                <><ProductListSkeleton listname={"My Favourites"} /></>
                                        }
                                    </div>
                                    {/* My Resale Items */}
                                    <div className="tab-pane fade" id="my-resal" role="tabpanel" aria-labelledby="my-resal-tab" tabIndex="0">
                                        <div className="my-giftcrd-top my-resel">
                                            <div className="giftcrd-top">
                                                <ul className="nav nav-tabs new-tab-div" id="myTab" role="tablist">
                                                    <li className="nav-item" role="presentation">
                                                        <button className="nav-link active" id="activeadd-tab" data-bs-toggle="tab"
                                                            data-bs-target="#activeadd-tab-pane" type="button" role="tab" aria-controls="activeadd-tab-pane"
                                                            aria-selected="true">Active Ad</button>
                                                    </li>
                                                    <li className="nav-item" role="presentation">
                                                        <button className="nav-link" id="inactiveadd-tab" data-bs-toggle="tab"
                                                            data-bs-target="#inactiveadd-tab-pane" type="button" role="tab"
                                                            aria-controls="inactiveadd-tab-pane" aria-selected="false">Inactive Ad</button>
                                                    </li>
                                                    <li className="nav-item" role="presentation">
                                                        <button className="nav-link" id="expiradd-tab" data-bs-toggle="tab" data-bs-target="#expiradd-tab-pane"
                                                            type="button" role="tab" aria-controls="expiradd-tab-pane" aria-selected="false">Expired
                                                            Ad</button>
                                                    </li>
                                                    <li className="nav-item" role="presentation">
                                                        <button className="nav-link" id="soldadd-tab" data-bs-toggle="tab" data-bs-target="#soldadd-tab-pane"
                                                            type="button" role="tab" aria-controls="soldadd-tab-pane" aria-selected="false">Sold Ad</button>
                                                    </li>
                                                </ul>
                                                <div className="buy-gift"><button className="buy-gift-card">Post New Advertisement</button></div>
                                            </div>
                                            <div className="tab-content mt-4" id="myTabContent">
                                                <div className="tab-pane fade show active" id="activeadd-tab-pane" role="tabpanel"
                                                    aria-labelledby="activeadd-tab" tabIndex="0">
                                                    <div className="resel-sec">
                                                        <h5>Active Advertisements <span>(1)</span></h5>
                                                        <div className="resel-ind-div">
                                                            <div className="resel-ind-div-inr">
                                                                <div className="resel-sec-l">
                                                                    <Image
                                                                        src={'/assets/img/resel.png'}
                                                                        width={100}
                                                                        height={100}
                                                                        alt='logo'
                                                                    />
                                                                </div>
                                                                <div className="resel-sec-r">
                                                                    <div className="resel-sec-tredot dropdown"><button className="btn btn-tredot dropdown-toggle"
                                                                        type="button" data-bs-toggle="dropdown" aria-expanded="false"><i
                                                                            className="bi bi-three-dots-vertical"></i></button>
                                                                        <ul className="dropdown-menu">
                                                                            <li><a className="dropdown-item" href="#">option 1</a></li>
                                                                            <li><a className="dropdown-item" href="#">option 2</a></li>
                                                                            <li><a className="dropdown-item" href="#">option 3</a></li>
                                                                        </ul>
                                                                    </div>
                                                                    <h4>Lorem Ipsum is simply </h4>
                                                                    <p>Lorem Ipsum is simply dummy text of Lorem Ipsum has been the text ever since the
                                                                        1500s.Lorem Ipsum is simply dummy text of Lorem Ipsum has been the text ever since the
                                                                        1500s.Lorem Ipsum is simply dummy text of Lorem Ipsum has been the text ever since the
                                                                        1500s...Lorem Ipsum is simply dummy text of Lorem Ipsum has been the text ever since the
                                                                        1500s.Lorem Ipsum is simply ...</p>
                                                                    <div className="resel-ind-div-blo">
                                                                        <div className="resel-ind-div-stat">
                                                                            <div className="stars-prcs">
                                                                                <p>Ad Status: <strong className="stats-actv">Active</strong></p>
                                                                                <p>Price: <strong className="prc-str">60,000</strong></p>
                                                                            </div>
                                                                            <div className="stars-posts">
                                                                                <p>Posted On: <strong className="prc-str">4th Nov 2024, 11:20PM</strong></p>
                                                                                <p>Advertisement Expiry Date: <strong className="prc-str">4th Oct 2024, 11:19PM</strong></p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="resel-ind-div-btns">
                                                                            <button className="btn btn-fetrs">Featured this Ad</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tab-pane fade" id="inactiveadd-tab-pane" role="tabpanel" aria-labelledby="inactiveadd-tab"
                                                    tabIndex="0">
                                                    <div className="resel-sec">
                                                        <h5>Inactive Advertisements <span>(1)</span></h5>
                                                        <div className="resel-ind-div">
                                                            <div className="resel-ind-div-inr">
                                                                <div className="resel-sec-l">
                                                                    <Image
                                                                        src={'/assets/img/resel.png'}
                                                                        width={100}
                                                                        height={100}
                                                                        alt='logo'
                                                                    />
                                                                </div>
                                                                <div className="resel-sec-r">
                                                                    <div className="resel-sec-tredot dropdown"><button className="btn btn-tredot dropdown-toggle"
                                                                        type="button" data-bs-toggle="dropdown" aria-expanded="false"><i
                                                                            className="bi bi-three-dots-vertical"></i></button>
                                                                        <ul className="dropdown-menu">
                                                                            <li><a className="dropdown-item" href="#">option 1</a></li>
                                                                            <li><a className="dropdown-item" href="#">option 2</a></li>
                                                                            <li><a className="dropdown-item" href="#">option 3</a></li>
                                                                        </ul>
                                                                    </div>
                                                                    <h4>Lorem Ipsum is simply </h4>
                                                                    <p>Lorem Ipsum is simply dummy text of Lorem Ipsum has been the text ever since the
                                                                        1500s.Lorem Ipsum is simply dummy text of Lorem Ipsum has been the text ever since the
                                                                        1500s.Lorem Ipsum is simply dummy text of Lorem Ipsum has been the text ever since the
                                                                        1500s...Lorem Ipsum is simply dummy text of Lorem Ipsum has been the text ever since the
                                                                        1500s.Lorem Ipsum is simply ...</p>
                                                                    <div className="resel-ind-div-blo">
                                                                        <div className="resel-ind-div-stat">
                                                                            <div className="stars-prcs">
                                                                                <p>Ad Status: <strong className="stats-actv">Active</strong></p>
                                                                                <p>Price: <strong className="prc-str">60,000</strong></p>
                                                                            </div>
                                                                            <div className="stars-posts">
                                                                                <p>Posted On: <strong className="prc-str">4th Nov 2024, 11:20PM</strong></p>
                                                                                <p>Advertisement Expiry Date: <strong className="prc-str">4th Oct 2024, 11:19PM</strong></p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="resel-ind-div-btns">
                                                                            <button className="btn btn-fetrs">Featured this Ad</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tab-pane fade" id="expiradd-tab-pane" role="tabpanel" aria-labelledby="expiradd-tab"
                                                    tabIndex="0">
                                                    <div className="resel-sec">
                                                        <h5>Expired Advertisements <span>(1)</span></h5>
                                                        <div className="resel-ind-div">
                                                            <div className="resel-ind-div-inr">
                                                                <div className="resel-sec-l">
                                                                    <Image
                                                                        src={'/assets/img/resel.png'}
                                                                        width={100}
                                                                        height={100}
                                                                        alt='logo'
                                                                    />
                                                                </div>
                                                                <div className="resel-sec-r">
                                                                    <div className="resel-sec-tredot dropdown"><button className="btn btn-tredot dropdown-toggle"
                                                                        type="button" data-bs-toggle="dropdown" aria-expanded="false"><i
                                                                            className="bi bi-three-dots-vertical"></i></button>
                                                                        <ul className="dropdown-menu">
                                                                            <li><a className="dropdown-item" href="#">option 1</a></li>
                                                                            <li><a className="dropdown-item" href="#">option 2</a></li>
                                                                            <li><a className="dropdown-item" href="#">option 3</a></li>
                                                                        </ul>
                                                                    </div>
                                                                    <h4>Lorem Ipsum is simply </h4>
                                                                    <p>Lorem Ipsum is simply dummy text of Lorem Ipsum has been the text ever since the
                                                                        1500s.Lorem Ipsum is simply dummy text of Lorem Ipsum has been the text ever since the
                                                                        1500s.Lorem Ipsum is simply dummy text of Lorem Ipsum has been the text ever since the
                                                                        1500s...Lorem Ipsum is simply dummy text of Lorem Ipsum has been the text ever since the
                                                                        1500s.Lorem Ipsum is simply ...</p>
                                                                    <div className="resel-ind-div-blo">
                                                                        <div className="resel-ind-div-stat">
                                                                            <div className="stars-prcs">
                                                                                <p>Ad Status: <strong className="stats-actv">Active</strong></p>
                                                                                <p>Price: <strong className="prc-str">60,000</strong></p>
                                                                            </div>
                                                                            <div className="stars-posts">
                                                                                <p>Posted On: <strong className="prc-str">4th Nov 2024, 11:20PM</strong></p>
                                                                                <p>Advertisement Expiry Date: <strong className="prc-str">4th Oct 2024, 11:19PM</strong></p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="resel-ind-div-btns">
                                                                            <button className="btn btn-fetrs">Featured this Ad</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tab-pane fade" id="soldadd-tab-pane" role="tabpanel" aria-labelledby="soldadd-tab"
                                                    tabIndex="0">
                                                    <div className="resel-sec">
                                                        <h5>Sold Advertisements <span>(1)</span></h5>
                                                        <div className="resel-ind-div">
                                                            <div className="resel-ind-div-inr">
                                                                <div className="resel-sec-l">
                                                                    <Image
                                                                        src={'/assets/img/resel.png'}
                                                                        width={100}
                                                                        height={100}
                                                                        alt='logo'
                                                                    />
                                                                </div>
                                                                <div className="resel-sec-r">
                                                                    <div className="resel-sec-tredot dropdown"><button className="btn btn-tredot dropdown-toggle"
                                                                        type="button" data-bs-toggle="dropdown" aria-expanded="false"><i
                                                                            className="bi bi-three-dots-vertical"></i></button>
                                                                        <ul className="dropdown-menu">
                                                                            <li><a className="dropdown-item" href="#">option 1</a></li>
                                                                            <li><a className="dropdown-item" href="#">option 2</a></li>
                                                                            <li><a className="dropdown-item" href="#">option 3</a></li>
                                                                        </ul>
                                                                    </div>
                                                                    <h4>Lorem Ipsum is simply </h4>
                                                                    <p>Lorem Ipsum is simply dummy text of Lorem Ipsum has been the text ever since the
                                                                        1500s.Lorem Ipsum is simply dummy text of Lorem Ipsum has been the text ever since the
                                                                        1500s.Lorem Ipsum is simply dummy text of Lorem Ipsum has been the text ever since the
                                                                        1500s...Lorem Ipsum is simply dummy text of Lorem Ipsum has been the text ever since the
                                                                        1500s.Lorem Ipsum is simply ...</p>
                                                                    <div className="resel-ind-div-blo">
                                                                        <div className="resel-ind-div-stat">
                                                                            <div className="stars-prcs">
                                                                                <p>Ad Status: <strong className="stats-actv">Active</strong></p>
                                                                                <p>Price: <strong className="prc-str">60,000</strong></p>
                                                                            </div>
                                                                            <div className="stars-posts">
                                                                                <p>Posted On: <strong className="prc-str">4th Nov 2024, 11:20PM</strong></p>
                                                                                <p>Advertisement Expiry Date: <strong className="prc-str">4th Oct 2024, 11:19PM</strong></p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="resel-ind-div-btns">
                                                                            <button className="btn btn-fetrs">Featured this Ad</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Referral */}
                                    <div className="tab-pane fade" id="my-refer" role="tabpanel" aria-labelledby="my-refer-tab" tabIndex="0">
                                        <h4 className="mb-3">Invite Your Friends</h4>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                                            scrambled it to make a type specimen book.</p>
                                        <div className="ref-img">
                                            <Image
                                                src={'/assets/img/refer-img.png'}
                                                width={100}
                                                height={100}
                                                alt='logo'
                                            />
                                        </div>
                                        <div className="refr-code">
                                            <span>Your Referral Code:</span>
                                            <strong>SRUTEL235</strong>
                                            <div className="ref-shr">
                                                <a href="">
                                                    <Image
                                                        src={'/assets/img/copy.png'}
                                                        width={100}
                                                        height={100}
                                                        alt='logo'
                                                    />
                                                </a>
                                                <a href="">
                                                    <Image
                                                        src={'/assets/img/shr.png'}
                                                        width={100}
                                                        height={100}
                                                        alt='logo'
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Preferences */}
                                    <div className="tab-pane fade" id="my-prefer" role="tabpanel" aria-labelledby="my-prefer-tab" tabIndex="0">
                                        <h4 className="my-3">Preference</h4>
                                        <p>Invite your contacts on social media and share the below referral code to get an extra discount or
                                            cashback. </p>
                                        <div className="prefrenc">
                                            <ul>
                                                <li>
                                                    <div className="prf-l">
                                                        <strong>Appearance</strong>
                                                        <p>Lorem Ipsum is simply dummy text of the printing and</p>
                                                    </div>
                                                    <div className="prf-r">
                                                        <select className="form-select">
                                                            <option>Light</option>
                                                            <option>Dark</option>
                                                        </select>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="prf-l">
                                                        <strong>Language</strong>
                                                        <p>Select your Language</p>
                                                    </div>
                                                    <div className="prf-r">
                                                        <select className="form-select">
                                                            <option>English</option>
                                                            <option>Hindi</option>
                                                        </select>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="prf-l">
                                                        <strong>Two-factor Authentitation</strong>
                                                        <p>Lorem Ipsum is simply dummy text of the printing and</p>
                                                    </div>
                                                    <div className="prf-r">
                                                        <div className="appr_dive">
                                                            <label className="switch">
                                                                <input type="checkbox" />
                                                                <small></small>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* Logout */}
                                    <div className="tab-pane fade" id="my-logut" role="tabpanel" aria-labelledby="my-logut-tab" tabIndex="0">
                                        <h4>Logout</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ToastContainer />
                    </>
                    :
                    <>
                    </>
            }

        </>
    )
}

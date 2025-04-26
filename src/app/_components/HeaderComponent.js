'use client'
import React, { useContext, useEffect, useState } from 'react'
import LoginModal from './_modal/LoginModal'
import Image from 'next/image'
import { toast, ToastContainer } from 'react-toastify'
import { getLocalStorageData, hideLoader, opneLoginModal, removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common'
import Dropdown from 'react-bootstrap/Dropdown';
import { useRouter } from 'next/navigation'
import { consumercategoryapi } from '../lib/apiService'
import { AppContext } from '../consumer/layout'
import AutocompleteSearch from './AutocompleteSearch'

export default function HeaderComponent() {
    const { userImage } = useContext(AppContext);
    const { cartCount } = useContext(AppContext);
    const [user, setUser] = useState({})
    const [categorylist, setCategoryList] = useState([])

    useEffect(() => {
        let u = getLocalStorageData('consumer')
        if (u) {
            setUser(u)
        }
        getCategoryData()
    }, [])

    const router = useRouter()
    const onMessage = (mes, sus) => {
        if (sus) {
            toast.success(mes)
        } else {
            toast.error(mes)
        }
    }
    const goto = (path) => {
        showLoader()
        if (path == "/myaccount?tab=my-favrot-tab" || "/myaccount?tab=my-order-tab" || "/myaccount?tab=personal-info-tab") {
            router.push('/')
        }
        setTimeout(() => {
            router.push("/consumer" + path)
        }, 100);
        removeLocalStorageData("pathName")
        setLocalStorageData('pathName', path)
        if (path == "/" ||
            "/myaccount?tab=my-favrot-tab" ||
            "/myaccount?tab=my-order-tab" ||
            "/myaccount?tab=personal-info-tab" ||
            '/cart') {
            getCategoryData()
        }
    }

    const onLogout = async () => {
        showLoader()
        setUser({});
        removeLocalStorageData("consumer")
        removeLocalStorageData("pathName")
        router.push("/consumer")
        cartCount(0)
        toast.success("User logout successfully!")
        hideLoader()
    }

    const getCategoryData = async () => {
        showLoader()
        let data = { list: true }
        let response = await consumercategoryapi(data)
        if (response.success) {
            const { result } = response;
            let temp = result
            let array = []
            let pathname = getLocalStorageData('pathName')
            if (pathname) {
                const patharray = pathname.split("/");
                let aid = patharray[2]
                if (aid) {
                    for (let a of temp) {
                        let obj = {
                            _id: a._id,
                            name: a.name,
                            active: false
                        }
                        if (obj._id == aid) {
                            obj.active = true
                        }
                        array.push(obj)
                    }
                }
                else {
                    for (let t of temp) {
                        let obj = {
                            _id: t._id,
                            name: t.name,
                            active: false
                        }
                        array.push(obj)
                    }
                }
            } else {
                for (let t of temp) {
                    let obj = {
                        _id: t._id,
                        name: t.name,
                        active: false
                    }
                    array.push(obj)
                }
            }
            hideLoader()
            setCategoryList(array)
        } else {
            hideLoader()
            setCategoryList([])
        }
    }

    const onClassChange = (index) => {
        let tempo = [...categorylist]
        let temp = []
        for (let [ind, f] of tempo.entries()) {
            let obj = {
                _id: f._id,
                name: f.name,
                active: false
            }
            temp.push(obj)
            if (ind === tempo.length - 1) {
                let o = []
                for (let [i, t] of temp.entries()) {
                    let obj = {
                        _id: t._id,
                        name: t.name,
                        active: false
                    }
                    if (i == index) {
                        obj.active = true
                        var element = document.getElementById("categoryactive" + t._id);
                        element.classList.add("active");
                    }
                    o.push(obj)
                }
                setCategoryList(o)
            }
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
            <div className="header">
                <div className="header-top">
                    <div className="logo topicon" onClick={() => { goto('/') }}>
                        <Image
                            src={'/assets/img/srutle-logo.png'}
                            width={300}
                            height={100}
                            priority
                            alt='logo'
                        />
                    </div>
                    <div className="deliv-addrs">
                        <i className="bi bi-geo-alt"></i>
                        <div className="deliv-addrs-txts"><strong>Delivery to</strong>
                            <p>Enter your location</p>
                        </div>
                    </div>
                    <div className="search-bar ">
                        <AutocompleteSearch />
                        <button className="btn btn-search"><i className="bi bi-search"></i></button>
                    </div>
                    <div className="user-actions dropdown">
                        <a onClick={() => { checkuser('/myaccount?tab=my-order-tab') }}><i className="bi bi-box-fill"></i> <strong>Orders</strong></a>
                        <a onClick={() => { checkuser('/myaccount?tab=my-favrot-tab') }}><i className="bi bi-heart-fill"></i> <strong>Favorites</strong></a>
                        <a className="position-relative" onClick={() => { checkuser('/cart?type=cart') }}>
                            <i className="bi bi-cart-fill"></i> <strong>Cart </strong>
                            {
                                cartCount > 0
                                    ?
                                    <span className="position-absolute top-1 start-110-cart translate-middle-cart badge rounded-pill bg-danger">
                                        {cartCount}
                                    </span>
                                    :
                                    <></>
                            }
                        </a>
                        {
                            user?._id ?
                                <></>
                                :
                                <a className="selersignin">Seller Login</a>
                        }

                        {
                            user?._id ?
                                <>
                                    <Dropdown className='doplg mx-3'>
                                        <Dropdown.Toggle id="dropdown-loginpgofile">
                                            {
                                                userImage ?
                                                    <Image
                                                        className='hrd_img'
                                                        src={'/upload/' + userImage}
                                                        width={42}
                                                        height={42}
                                                        alt='logo'
                                                    />
                                                    :
                                                    <Image
                                                        src={'/assets/img/avtr.png'}
                                                        width={40}
                                                        height={40}
                                                        alt='logo'
                                                    />
                                            }
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => { goto('/myaccount?tab=personal-info-tab') }} ><i className="bi bi-person-circle"></i> My Account</Dropdown.Item>
                                            <Dropdown.Item onClick={() => { onLogout() }}><i className="bi bi-box-arrow-right"></i> Logout</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </>
                                :
                                <LoginModal onMessage={onMessage} setUser={setUser} />
                        }
                    </div>
                </div>
                <div className="head-menu">
                    <div className="navigation" id="cssmenu">
                        <ul>

                            {
                                categorylist && categorylist.map((item, i) => (
                                    <li key={i}><a id={"categoryactive" + item._id} onClick={() => { goto('/productlist/' + item._id), onClassChange(i) }} className={`${item.active ? "active" : ""}`} >{item.name}</a></li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

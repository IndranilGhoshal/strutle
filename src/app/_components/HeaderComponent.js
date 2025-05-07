'use client'
import React, { useContext, useEffect, useState } from 'react'
import LoginModal from './_modal/LoginModal'
import Image from 'next/image'
import { toast, ToastContainer } from 'react-toastify'
import { getLocalStorageData, hideLoader, opneLoginModal, removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common'
import Dropdown from 'react-bootstrap/Dropdown';
import { useRouter } from 'next/navigation'
import { consumercategoryapi, menuapi } from '../lib/apiService'
import { AppContext } from '../consumer/layout'
import AutocompleteSearch from './AutocompleteSearch'
import DeliveyAddressModal from './_modal/DeliveyAddressModal'

export default function HeaderComponent() {
    const { userImage, cartCount, setDeliveryAddress, setPincodeAddress, setusername, setCartCount } = useContext(AppContext);
    const [user, setUser] = useState({})
    const [menulist, setMenuList] = useState([])

    useEffect(() => {
        let u = getLocalStorageData('consumer')
        if (u) {
            setUser(u)
        }
        getMenuData()
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
        if (path == "/myaccount?tab=my-favrot-tab" || 
            "/myaccount?tab=my-order-tab" || 
            "/myaccount?tab=personal-info-tab" || 
            "/myaccount?tab=manage-addrs-tab"
        ) {
            router.push('/')
        }
        setTimeout(() => {
            if(path == "/seller"){
                router.push(path)
            }else{
                router.push("/consumer" + path)
            }
        }, 100);
        removeLocalStorageData("pathName")
        setLocalStorageData('pathName', path)
        if (path == "/" ||
            "/myaccount?tab=my-favrot-tab" ||
            "/myaccount?tab=my-order-tab" ||
            "/myaccount?tab=personal-info-tab" ||
            "/myaccount?tab=manage-addrs-tab" ||
            '/cart') {
            getMenuData()
        }
    }

    const onLogout = async () => {
        showLoader()
        setUser({});
        removeLocalStorageData("consumer")
        removeLocalStorageData("pathName")
        router.push("/consumer")
        setCartCount('0')
        setDeliveryAddress('')
        setPincodeAddress('')
        setusername('')
        toast.success("User logout successfully!")
        hideLoader()
    }

    const getMenuData = async () => {
        showLoader()
        let data = { list: true }
        let response = await menuapi(data)
        if (response.success) {
            const { result } = response;
            setMenuList(result)
        } else {
            hideLoader()
            setMenuList([])
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
                    <DeliveyAddressModal setDeliveryAddress={setDeliveryAddress} setPincodeAddress={setPincodeAddress} goto={goto} />
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
                                <a className="selersignin" onClick={() => { goto('/seller') }}>Seller Login</a>
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
                    <nav className="navbar">

                        <div className="burger" id="burger">
                            <span className="burger-line"></span>
                            <span className="burger-line"></span>
                            <span className="burger-line"></span>
                        </div>

                        <div className="navbar-block" id="menu">
                            <ul className="menu">
                                {
                                    menulist.length > 0 ?
                                        <>
                                            {
                                                menulist.map((item, i) => (
                                                    <li key={i} className="menu-item dropdown">
                                                        <a className="menu-link">
                                                            {item.category.categoryname}
                                                        </a>

                                                        {
                                                            item.category.subcategory.length > 0 ?
                                                                <>
                                                                    <div className="dropdown-content">
                                                                        <div className="dropdown-column">
                                                                            {
                                                                                item.category.subcategory.map((obj, index) => (
                                                                                    <div className="dropdown-group" key={index}>
                                                                                        <div className="dropdown-title">
                                                                                            <span className="text-base font-medium">{obj.subcategoryname}</span>
                                                                                        </div>
                                                                                        <ul className="dropdown-items">
                                                                                            {
                                                                                                obj.producttype.length > 0 ?
                                                                                                    <>
                                                                                                        {
                                                                                                            obj.producttype.map((data, ind) => (
                                                                                                                <li key={ind}><a className="dropdown-link" onClick={() => { goto('/productlist/' + data.producttype + "?type=producttype") }}>{data.producttypename}</a></li>
                                                                                                            ))
                                                                                                        }
                                                                                                    </>
                                                                                                    :
                                                                                                    <></>
                                                                                            }
                                                                                        </ul>
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


                                                    </li>
                                                ))
                                            }
                                        </> : <></>
                                }
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

'use client'
import SellerAccountHeader from '@/app/_sellerComponents/SellerAccountHeader';
import { getLocalStorageData, removeLocalStorageData, setLocalStorageData, showLoader } from '@/app/lib/common';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Layout({ children }) {
    const router = useRouter();
    const path = usePathname()
    const [menu, setMenu] = useState([
        { menuName: "Dashboard", menuIcon: "bi-speedometer2", menuUrl: "/dashboard", submenu: [] },
        { menuName: "Catelogs", menuIcon: "bi-box-seam", menuUrl: "/catelogs", submenu: [] },
        { menuName: "Order", menuIcon: "bi-cart-check", menuUrl: "/order", submenu: [] },
        { menuName: "Shipping", menuIcon: "bi-truck", menuUrl: "/shipping", submenu: [] },
        { menuName: "Return", menuIcon: "bi-arrow-return-left", menuUrl: "/return", submenu: [] },
        { menuName: "Payout", menuIcon: "bi-wallet2", menuUrl: "/payout", submenu: [] },
        { menuName: "Transaction", menuIcon: "bi-arrow-left-right", menuUrl: "/transaction", submenu: [] },
    ])
    useEffect(() => {
        // let elem = document.getElementById('body')
        // elem.classList.add("seller");
        // elem.classList.remove("body-slide");
        // elem.classList.remove("body-pd");
        let getPath = getLocalStorageData('pathName')
        if (getPath) {
            router.push("/seller/account" + getPath)
        }
        if (!getPath) {
            setLocalStorageData('pathName', menu[0].menuUrl)
            let getPath = getLocalStorageData('pathName')
            router.push("/seller/account" + getPath)
        }
    }, [])

    const goto = (path) => {
        showLoader()
        router.push("/seller/account" + path)
        removeLocalStorageData("pathName")
        setLocalStorageData('pathName', path)
    }
    return (
        <>
            <div className={`wrapper dashboardSection`}>
                <nav id="sidebar-new" className="sidebar-new">
                    <div className="sidebar-content" id="sidebar-sticky">

                        <div className="sidebar-brand text-start">
                            <Image
                                src="/assets/seller-img/srutle-logo.png"
                                alt="bell"
                                width={100}
                                height={100}
                                className="d-inline-block align-middle"
                            />
                        </div>

                        {
                            menu && menu.map((item, i) => (

                                <div key={i} className="accordion accordion-flush" id="accordionFlushExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="flush-headingOne">
                                            {
                                                item.submenu.length > 0 ?
                                                    <>
                                                        <button
                                                            className={`accordion-button ${!item.collapse ? "collapsed" : ""}`}
                                                            type="button"
                                                            data-bs-toggle="collapse"
                                                            data-bs-target={"#flush-collapseOne" + i}
                                                            aria-expanded="false"
                                                            aria-controls={"flush-collapseOne" + i}
                                                            onClick={() => { getCollapse(i) }}
                                                        >
                                                            <i className={`bi ${item.menuIcon}`}></i>
                                                            <span className='text-blue mx-2'>{item.menuName}</span>
                                                        </button>
                                                    </>
                                                    :
                                                    <>
                                                        <button
                                                            className={`accordion-button non ${path == "/seller/account" + item.menuUrl ? "actived" : ""}`}
                                                            type="button"
                                                            data-bs-toggle="collapse"
                                                            data-bs-target={"#flush-collapseOne" + i}
                                                            aria-expanded="false"
                                                            aria-controls={"flush-collapseOne" + i}
                                                            onClick={() => { goto(item.menuUrl) }}
                                                        >
                                                            <i className={`bi ${item.menuIcon}`}></i>
                                                            <span className='text-blue mx-2'>{item.menuName}</span>
                                                        </button>
                                                    </>
                                            }

                                        </h2>
                                        {
                                            item.submenu.length > 0 ? <div
                                                id={"flush-collapseOne" + i}
                                                className={`accordion-collapse collapse ${item.collapse ? "show" : ""}`}
                                                aria-labelledby="flush-headingOne"
                                                data-bs-parent="#accordionFlushExample"

                                            >
                                                <div className="accordion-body">
                                                    {
                                                        item.submenu.map((obj, index) => (
                                                            <div
                                                                className={`submenu-btn ${path == "/seller/account" + obj.submenurl ? "actived" : ""}`}
                                                                key={index}
                                                                onClick={() => { goto(obj.submenurl) }}
                                                            >
                                                                <i className={`bi ${obj.menuIcon}`}></i>
                                                                {obj.submenuname}
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                                : null
                                        }
                                    </div>
                                </div>
                            ))
                        }

                    </div>

                </nav>
                <div className="main">
                    <SellerAccountHeader />
                    <main className="content">
                        {children}
                    </main>
                </div>
            </div >

        </>
    )
}

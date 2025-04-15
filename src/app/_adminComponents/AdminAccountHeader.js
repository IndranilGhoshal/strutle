'use client'
import React, { useEffect, useState } from 'react'
import { getLocalStorageData, getNameFirstLetter, removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common'
import { useRouter } from 'next/navigation';
import LogoutModal from './_modal/LogoutModal';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';

export default function AdminAccountHeader({removeCollapse}) {
    const router = useRouter();

    useEffect(() => {
        if (getLocalStorageData('admin')) {
            router.push("/admin/account");
        } else {
            router.push("/admin");
        }
    }, [])

    const goto = (path) => {
        showLoader()
        removeCollapse()
        router.push("/admin/account" + path)
        removeLocalStorageData("pathName")
        setLocalStorageData('pathName', path)
      }

    return (
        <>
            <div className="top-new-nav">
                <strong>&nbsp;</strong>
                <div className="new-navright">
                    <ul className="navbar-nav navbar-align nav-bar-ul">
                        <li className="nav-item dropdown">
                            <div className="nav-icon dropdown-toggle no-dropdown-arrow" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <span className="position-relative">
                                    <Image
                                        src="/assets/img/new-msg-icn.png"
                                        alt="bell"
                                        width={0}
                                        height={0}
                                        className="d-block mx-auto"
                                        style={{ width: "auto", height: "auto" }}
                                    />
                                </span>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <div className="nav-icon dropdown-toggle no-dropdown-arrow" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <span className="position-relative">
                                    <Image
                                        src="/assets/img/new-bell-icon.png"
                                        alt="bell"
                                        width={0}
                                        height={0}
                                        className="d-block mx-auto"
                                        style={{ width: "auto", height: "auto" }}
                                    />
                                </span>
                            </div>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0"
                                aria-labelledby="alertsDropdown">
                                <div className="dropdown-menu-header">
                                    4 New Notifications
                                </div>
                                <div className="list-group">
                                    <a href="#" className="list-group-item">
                                        <div className="row g-0 align-items-center">
                                            <div className="col-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                    className="feather feather-alert-circle text-danger">
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                                </svg>
                                            </div>
                                            <div className="col-10">
                                                <div className="text-dark">Update completed</div>
                                                <div className="text-muted small mt-1">Restart server 12 to complete the
                                                    update.</div>
                                                <div className="text-muted small mt-1">2h ago</div>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="#" className="list-group-item">
                                        <div className="row g-0 align-items-center">
                                            <div className="col-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                    className="feather feather-bell text-warning">
                                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                                </svg>
                                            </div>
                                            <div className="col-10">
                                                <div className="text-dark">Lorem ipsum</div>
                                                <div className="text-muted small mt-1">Aliquam ex eros, imperdiet vulputate
                                                    hendrerit et.</div>
                                                <div className="text-muted small mt-1">6h ago</div>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="#" className="list-group-item">
                                        <div className="row g-0 align-items-center">
                                            <div className="col-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                    className="feather feather-home text-primary">
                                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                                </svg>
                                            </div>
                                            <div className="col-10">
                                                <div className="text-dark">Login from 192.186.1.1</div>
                                                <div className="text-muted small mt-1">8h ago</div>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="#" className="list-group-item">
                                        <div className="row g-0 align-items-center">
                                            <div className="col-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                    className="feather feather-user-plus text-success">
                                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                    <circle cx="8.5" cy="7" r="4"></circle>
                                                    <line x1="20" y1="8" x2="20" y2="14"></line>
                                                    <line x1="23" y1="11" x2="17" y2="11"></line>
                                                </svg>
                                            </div>
                                            <div className="col-10">
                                                <div className="text-dark">New connection</div>
                                                <div className="text-muted small mt-1">Anna accepted your request.</div>
                                                <div className="text-muted small mt-1">12h ago</div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className="dropdown-menu-footer">
                                    <a href="#" className="text-muted">Show all notifications</a>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a 
                            className={`nav-link dropdown-toggle p-0 d-flex align-items-center gap-2`}
                            data-bs-toggle="dropdown" 
                            aria-expanded="false"
                            >
                                    <strong className="admin-txt">
                                        Admin
                                        {/* {getLocalStorageData('admin').firstname + " " + getLocalStorageData('admin').lastname} */}
                                    </strong>
                                    <span className="profil-avatar">
                                        A
                                    {/* {
                                        getLocalStorageData('admin').image ?
                                            <Image
                                                src={"/upload/" + getLocalStorageData('admin').image}
                                                width={100}
                                                height={100}
                                                alt='asd'
                                            />
                                            :
                                            getNameFirstLetter(getLocalStorageData('admin').firstname)
                                    } */}
                                </span>
                            </a>
                            <div 
                            className={`dropdown-menu dropdown-menu-end`} 
                            data-popper-placement="bottom-end"
                            >
                                <a className="dropdown-item" ><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    className="feather feather-user align-middle me-1">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg> Profile</a>
                                <a className="dropdown-item"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    className="feather feather-pie-chart align-middle me-1">
                                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                                    <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                                </svg> Analytics</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item">Settings &amp; Privacy</a>
                                <a className="dropdown-item" onClick={()=>{goto('/activitylog')}}>Login / Logout Logs</a>
                                <a className="dropdown-item">Help</a>
                                <LogoutModal />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

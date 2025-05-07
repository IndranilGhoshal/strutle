import Image from 'next/image'
import React from 'react'
import LogoutModal from './_modal/LogoutModal'
import { removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common'
import { useRouter } from 'next/navigation';

export default function SellerAccountHeader() {
    const router = useRouter();
    const goto = (path) => {
        showLoader()
        router.push("/seller/account" + path)
        removeLocalStorageData("pathName")
        setLocalStorageData('pathName', path)
    }
    return (
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
                                Seller
                            </strong>
                            <span className="profil-avatar">
                                S
                            </span>
                        </a>
                        <div
                            className={`dropdown-menu dropdown-menu-end`}
                            data-popper-placement="bottom-end"
                        >
                            <a className="dropdown-item" onClick={()=>{goto('/settings?tab=seller-details-tab')}} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-gear me-1 my-2" viewBox="0 0 16 16">
                                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
                                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
                                </svg>
                                Settings</a>
                            <a className="dropdown-item"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="feather feather-pie-chart align-middle me-1">
                                <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                                <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                            </svg> Analytics</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item">Help</a>
                            <LogoutModal />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

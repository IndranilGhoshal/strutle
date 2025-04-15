'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { adminAddAdminApi } from '../lib/apiService';
import { hideLoader, removeLocalStorageData, setLocalStorageData } from '../lib/common';
import moment from 'moment';
import Image from 'next/image';

export default function UserComponent({ id }) {
    const router = useRouter();
    const [image, setImage] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [countryname, setCountryname] = useState('');
    const [countrycode, setCountrycode] = useState('');
    const [dialCode, setDialCode] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('');
    const [createdbyfirstname, setCreatedbyfirstname] = useState('');
    const [createdbylastname, setCreatedbylastname] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [firstLogin, setFirstLogin] = useState('');
    const [lastLogout, setLastLogout] = useState('');




    useEffect(() => {
        getUser(id)
    }, [])

    const goto = (path) => {
        router.push("/admin/account" + path)
        removeLocalStorageData("pathName")
        setLocalStorageData('pathName', path)
    }

    const getUser = async (id) => {
        let response = await adminAddAdminApi({ id: id, details: true })
        if (response.success) {
            hideLoader()
            let res = response.result
            setImage(res.image)
            setFirstName(res.firstname)
            setLastName(res.lastname)
            setEmail(res.email)
            setPhone(res.phone)
            setCountryname(res.countryname)
            setCountrycode(res.countrycode)
            setDialCode(res.dialCode)
            setRole(res.role)
            setStatus(res.status)
            setCreatedbyfirstname(res.createdbyfirstname)
            setCreatedbylastname(res.createdbylastname)
            setCreatedAt(res.createdAt)
            setFirstLogin(res.firstLogin)
            setLastLogout(res.lastLogin)
        } else {
            hideLoader()
            hideLoader()
            setImage('')
            setFirstName('')
            setLastName('')
            setEmail('')
            setPhone('')
            setCountryname('')
            setCountrycode('')
            setDialCode('')
            setRole('')
            setStatus('0')
            setCreatedbyfirstname('')
            setCreatedbylastname('')
            setCreatedAt('')
            setFirstLogin('')
            setLastLogout('')
        }
    }
    return (
        <>
            <div className="main-das-page">
                <div className="heading my-3">
                    <h3>User Details</h3>
                </div>
                <div className='my-3'>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a onClick={() => { goto('/usermanagement') }}>User Management</a></li>
                            <li className="breadcrumb-item active" aria-current="page">User Details</li>
                        </ol>
                    </nav>
                </div>
                <div className="row">
                    <div className="col-md-6 col-sm-12 w-100">
                        <div className="bg-white shadow_d rounded-3 my-3">

                            <div className="role-details">
                                <div className="img-dv">
                                    <span className="avtr">
                                        {
                                            image ?
                                                <>
                                                    <Image
                                                        src={"/upload/" + image}
                                                        width={100}
                                                        height={100}
                                                        alt='asd'
                                                    />
                                                </>
                                                :
                                                <i className="bi bi-person"></i>
                                        }
                                    </span>
                                </div>
                                <ul className='px-0'>
                                    <li><strong>Role Name</strong> <span className="seprt">:</span> <span>{role}</span></li>
                                    <li><strong>Name</strong> <span className="seprt">:</span> <span>{firstName + " " + lastName}</span></li>
                                    <li><strong>Country Name</strong> <span className="seprt">:</span> <span>{countryname}</span></li>
                                    <li><strong>Phone Number</strong> <span className="seprt">:</span> <span>{"+" + dialCode + " " + phone}</span></li>
                                    <li><strong>Email Id</strong> <span className="seprt">:</span> <span>{email}</span></li>
                                    <li><strong>Status</strong> <span className="seprt">:</span> <span>{status == "0" && "Active"}{status == "1" && "Inactive"}{status == "3" && "Invited"}</span></li>
                                    <li><strong>Created By</strong> <span className="seprt">:</span> <span>{createdbyfirstname + " " + createdbylastname}</span></li>
                                    <li><strong>Created On</strong> <span className="seprt">:</span> <span>{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span></li>
                                    {
                                        firstLogin && <li><strong>First Login On</strong> <span className="seprt">:</span> <span>{moment(firstLogin).format('MMMM Do YYYY, h:mm:ss a')}</span></li>
                                    }
                                    {
                                        lastLogout && <li><strong>Last Logout On</strong> <span className="seprt">:</span> <span>{moment(lastLogout).format('MMMM Do YYYY, h:mm:ss a')}</span></li>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

'use client'
import { adminAddAdminApi, adminAddRoleApi, uploadImageApi } from '@/app/lib/apiService';
import { getLocalStorageData, hideLoader, showLoader } from '@/app/lib/common';
import { resizeFile } from '@/app/lib/ImageCroper';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";


export default function UserModal({ onMessage }) {
    
    const mailformat = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$";
    const [validEmailError, setValidEmailError] = useState(false)

    const [roles, setRoles] = useState([])

    const [image, setImage] = useState('');

    const [role, setRole] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [countryname, setCountryname] = useState('');
    const [countrycode, setCountrycode] = useState('');
    const [dialCode, setDialCode] = useState('');
    const [email, setEmail] = useState('');

    const [error, setError] = useState(false)

    const [split, setSplit] = useState('')
    const [status, setStatus] = useState('3')

    useEffect(() => {
        getRoles()
    }, [])

    const getRoles = async () => {
        let data = { list: true, dropdown:true }
        let response = await adminAddRoleApi(data)
        if (response.success) {
            let res = response.result
            for (let r of res) {
                r.isEdit = false
            }
            setRoles(res)
        } else {
            setRoles([])
        }
    }


    const handleClose = () => {
        setRole('')
        setImage('')
        setFirstName('')
        setLastName('')
        setPhone('')
        setCountryname('')
        setCountrycode('')
        setDialCode('')
        setSplit('')
        setEmail('')
        setStatus('0')
        setError(false)
    };




    const inviteAdminEvent = async () => {
        
        let err = 0;
        setError(false)
        setValidEmailError(false)


        if (!role || !firstName || !lastName || !split || !email) {
            setError(true)
            err++
        }

        if (!email.match(mailformat)) {
            setValidEmailError(true)
            err++
        }

        if (err == 0) {
            showLoader()
            let data = { 
                role, 
                image,
                firstName, 
                lastName, 
                email, 
                countryname, 
                countrycode, 
                dialCode, 
                phone: split, 
                status, 
                isfirstlogin: "0",
                createdby:getLocalStorageData('admin')._id, 
                add: true 
            }
            let response = await adminAddAdminApi(data)
            if (response.success) {
                hideLoader()
                getModalClose()
                onMessage(response.message, false, true)
            } else {
                hideLoader()
                onMessage(response.message, false, false)
            }
        }
    }


    const setNumber = (num, country, e, formattedValue) => {
        setCountryname(country.name)
        setCountrycode(country.countryCode)
        setDialCode(country.dialCode)
        setSplit(num.substring(country.dialCode.length))
    }

    const getModalClose = () => {
        const elem = document.getElementById('clsBtn12');
        elem.click()
    }

    const uploadImg = async (f) => {
        showLoader()
        const image = await resizeFile(f);
        const data = new FormData();
        data.set("file", image);
        let result = await uploadImageApi(data)
        if (result.success) {
            hideLoader()
            setImage(result.fileName)
            onMessage(result.message, true, true)
        } else {
            hideLoader()
            setImage('')
            onMessage(result.message, true, false)
        }
    }


    return (
        <>
            <button className="btn down_btn" data-bs-toggle="modal" data-bs-target="#adduser"><i className="bi bi-plus"></i> Invite Admin</button>


            <div className="modal fade" id="adduser" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            
                            <h5>Invite Admin</h5>
                            <button
                                id="clsBtn12"
                                onClick={() => { handleClose() }}
                                type="button"
                                className="close-button"
                                data-bs-dismiss="modal"
                                aria-label="Close">
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>
                        <div className="modal-body">

                            <div className="frm">
                                <div className="role_select">
                                    <span className='photo-clr'>
                                        {
                                            image ?
                                                <>
                                                    <Image
                                                        src={"/upload/"+image}
                                                        width={100}
                                                        height={100}
                                                        alt='aaddsd'
                                                    />
                                                </>
                                                :
                                                <>
                                                    <i className="bi bi-person"></i>
                                                </>
                                        }

                                    </span>
                                </div>
                                <div className="role_select ">
                                    <label className="mb-2">Upload Photo</label>
                                    <input
                                        type="file"
                                        name="file"
                                        className={`form-control`}
                                        onChange={(e) => { uploadImg(e.target.files?.[0]) }}
                                    />
                                </div>
                                <div className="role_select mt-1">
                                    <label className="mb-2">Role  </label>
                                    <div className="contct_no">
                                        <select
                                            className={`form-select ${error && !role ? "error-txt" : ""}`}
                                            value={role}
                                            onChange={(e) => { setRole(e.target.value) }}
                                        >
                                            <option>Select</option>
                                            {
                                                roles && roles.map((item, i) => (
                                                    <option key={i} value={item._id}>{item.role}</option>
                                                ))
                                            }
                                        </select>
                                        {
                                            error && !role && <div className='input-error'>Please select role</div>
                                        }
                                    </div>
                                </div>
                                <div className="role_select mt-1">
                                    <label className="mb-2">First Name  </label>
                                    <input
                                        type="text"
                                        className={`form-control ${error && !firstName ? "error-txt" : ""}`}
                                        value={firstName}
                                        onChange={(e) => { setFirstName(e.target.value) }}
                                        maxLength={25}
                                    />
                                    {
                                        error && !firstName && <div className='input-error'>Please enter first name</div>
                                    }
                                </div>
                                <div className="role_select mt-1">
                                    <label className="mb-2">Last Name  </label>
                                    <input
                                        type="text"
                                        className={`form-control ${error && !lastName ? "error-txt" : ""}`}
                                        value={lastName}
                                        onChange={(e) => { setLastName(e.target.value) }}
                                        maxLength={25}
                                    />
                                    {
                                        error && !lastName && <div className='input-error'>Please enter last name</div>
                                    }
                                </div>
                                <div className="role_select mt-1">
                                    <label className="mb-2">Email ID  </label>
                                    <input
                                        type="text"
                                        className={`form-control ${error && !email ? "error-txt" : ""} ${error && email && !validEmailError ? "error-txt" : ""}`}
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                    />
                                    {
                                        error && !email && <div className='input-error'>Please enter email</div>
                                    }
                                    {
                                        validEmailError && !error && email && <div className='input-error'>Please enter valid email</div>
                                    }
                                </div>
                                <div className="role_select mt-1">
                                    <label className="mb-2">Contact No.  </label>
                                    <PhoneInput
                                        className={`form-control con ${error && !split ? "error-txt" : ""}`}
                                        country={"in"}
                                        value={phone}
                                        placeholder=""
                                        enableSearch={true}
                                        searchNotFound={'Sorry. No entries to show'}
                                        disableSearchIcon={true}
                                        onChange={(phone, country, e, formattedValue) =>
                                            setNumber(phone, country, e, formattedValue)
                                        }
                                        isValid={(value, country) => {
                                            if (value.match(/12345/)) {
                                                return 'Invalid value: ' + value + ', ' + country.name;
                                            } else if (value.match(/1234/)) {
                                                return false;
                                            } else {
                                                return true;
                                            }
                                        }}
                                    />
                                    {
                                        error && !split && <div className='input-error'>Please enter contact no</div>
                                    }
                                </div>
                                <div className="add_btn">
                                    <button type="button" className="btn btn-primary" onClick={inviteAdminEvent}>Invite</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

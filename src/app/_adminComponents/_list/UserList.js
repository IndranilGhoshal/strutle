'use client'
import moment from 'moment'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react'
import UsePagination from '../UsePagination';
import Image from 'next/image';
import { getLocalStorageData, getNameFirstLetter, hideLoader, showLoader } from '@/app/lib/common';
import { adminAddAdminApi, adminAddRoleApi, uploadImageApi } from '@/app/lib/apiService';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { resizeFile } from '@/app/lib/ImageCroper';
import UserListSkeleton from '../_skeleton/UserListSkeleton';



export default function UserList({
    user,
    rolesArr,
    onStatus,
    limit,
    setlimit,
    handleChangePage,
    page,
    search,
    setSearch,
    status,
    setStatus,
    role,
    setRole,
    onMessage,
    goto,
    namesortFun,
    emailsortFun,
    createdatsortFun,
}) {
    const mailformat = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$";
    const [validEmailError, setValidEmailError] = useState(false)

    const [rolesList, setRoles] = useState([])

    const [image, setImage] = useState('');

    const [id, setId] = useState('')

    const [roleValue, setRoleValue] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [countryname, setCountryname] = useState('');
    const [countrycode, setCountrycode] = useState('');
    const [dialCode, setDialCode] = useState('');
    const [email, setEmail] = useState('');

    const [error, setError] = useState(false)

    const [split, setSplit] = useState('')
    const [statusValue, setStatusValue] = useState('3')

    useEffect(() => {
        getRoles()
    }, [])

    const getRoles = async () => {
        let data = { list: true, dropdown: true }
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

    const [show, setShow] = useState(false);
    const handleDeleteClose = () => {
        setShow(false)
        setId("")
    };
    const handleShow = () => setShow(true);

    const handleClose = () => {
        setId('')
        setImage('')
        setFirstName('')
        setLastName('')
        setEmail('')
        setPhone('')
        setSplit('')
        setCountryname('')
        setCountrycode('')
        setDialCode('')
        setRoleValue('')
        setStatusValue('0')
        setError(false)
    };

    const onEdit = async (id) => {
        showLoader()
        let response = await adminAddAdminApi({ id: id, details: true })
        if (response.success) {
            hideLoader()
            let res = response.result
            setId(res._id)
            setImage(res.image)
            setFirstName(res.firstname)
            setLastName(res.lastname)
            setEmail(res.email)
            setPhone(res.dialCode + res.phone)
            setSplit(res.phone)
            setCountryname(res.countryname)
            setCountrycode(res.countrycode)
            setDialCode(res.dialCode)
            setRoleValue(res.mstroleid)
            setStatusValue(res.status)
        } else {
            hideLoader()
            setId('')
            setImage('')
            setFirstName('')
            setLastName('')
            setEmail('')
            setPhone('')
            setSplit('')
            setCountryname('')
            setCountrycode('')
            setDialCode('')
            setRoleValue('')
            setStatusValue('0')
        }
    }

    const setNumber = (num, country, e, formattedValue) => {
        setCountryname(country.name)
        setCountrycode(country.countryCode)
        setDialCode(country.dialCode)
        setSplit(num.substring(country.dialCode.length))
    }

    const getModalClose = () => {
        const elem = document.getElementById('edituserBtn');
        elem.click()
    }

    const uploadImg = async (f) => {
        showLoader()
        const image = await resizeFile(f);
        const data = new FormData();
        data.set("file", image);
        let result = await uploadImageApi(data)
        if (result) {
            hideLoader()
            setImage(result.fileName)
            onMessage(result.message, true, true)
        } else {
            hideLoader()
            setImage('')
            onMessage(result.message, true, false)
        }
    }

    const onUserEdit = async () => {
        showLoader()
        let err = 0;
        setError(false)
        setValidEmailError(false)


        if (!roleValue || !firstName || !lastName || !split || !email) {
            setError(true)
            err++
        }

        if (!email.match(mailformat)) {
            setValidEmailError(true)
            err++
        }

        if (err == 0) {
            let data = {
                id: id,
                role: roleValue,
                image,
                firstName,
                lastName,
                email,
                countryname,
                countrycode,
                dialCode,
                phone: split,
                status: statusValue,
                edit: true
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




    return (
        <>
            <div className="mastr_hw">
                <div className="assects_src_dv position-relative">
                    <label>Search</label>
                    <input
                        type="text"
                        className="form-control"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value) }}
                        placeholder='Search by user name, email'
                    /><button className="btn no-bg"><i className="bi bi-search"></i></button>
                </div>
                <div className="assects_src_dvadd">

                    <button className="btn btn-dwn p-0 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Filter User List <i className="bi bi-sliders"></i></button>
                    <div className="dropdown-menu dropdown-menu-end">
                        <div className="filter-lists">
                            <label>Filter by User Status</label>
                            <select
                                className="form-select"
                                value={status}
                                onChange={(e) => { setStatus(e.target.value) }}
                            >
                                <option value="">Select Status</option>
                                <option value="0">Active</option>
                                <option value="1">Inactive</option>
                                <option value="3">Invite</option>
                            </select>
                        </div>
                        <div className="filter-lists">
                            <label>Filter by Role</label>
                            <select
                                className="form-select"
                                value={role}
                                onChange={(e) => { setRole(e.target.value) }}
                            >
                                <option value="">Select Role</option>
                                {
                                    rolesArr && rolesArr.map((item, i) => (
                                        <option key={i} value={item._id}>{item.role}</option>
                                    ))
                                }
                            </select>
                        </div>

                    </div>

                </div>
            </div>
            <div className="bg-white shadow_d rounded-3">

                <div className="mast_hw_tab">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr role="row">
                                    <th align="left">Sl. No.</th>
                                    <th align="left">Name <i style={{ cursor: "pointer" }} className="bi bi-arrow-down-up" onClick={() => { namesortFun() }}></i></th>
                                    <th align="left">Role</th>
                                    <th align="left">Email Id <i style={{ cursor: "pointer" }} className="bi bi-arrow-down-up" onClick={() => { emailsortFun() }}></i></th>
                                    <th align="left">Created at <i style={{ cursor: "pointer" }} className="bi bi-arrow-down-up" onClick={() => { createdatsortFun() }}></i></th>
                                    <th align="left">Status</th>
                                    <th align="left">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    user !== undefined ?
                                        <>
                                            {
                                                user.length > 0 ? user.map((item, i) => (
                                                    <tr role="row" key={i}>
                                                        <td style={{ textAlign: "left" }} align="left">{i + 1}</td>
                                                        <td align="left" className='lst-td'>
                                                            <span className='photo-clr lst'>
                                                                {
                                                                    item.image ?
                                                                        <>
                                                                            <Image
                                                                                src={"/upload/" + item.image}
                                                                                width={100}
                                                                                height={100}
                                                                                alt='asd'
                                                                            />
                                                                        </>
                                                                        :
                                                                        <>
                                                                            {
                                                                                getNameFirstLetter(item.firstname)
                                                                            }
                                                                        </>
                                                                }
                                                            </span>
                                                            {item.firstname + " " + item.lastname}
                                                        </td>
                                                        <td align="left">{item.role}</td>
                                                        <td align="left">{item.email}</td>
                                                        <td align="left">{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                                        <td align="left">
                                                            <span className={`${item.status == "0" ? "text-success" : ""}${item.status == "1" ? "text-danger" : ""}${item.status == "3" ? "text-blue" : ""}`}>
                                                                {item.status == "0" && "Active"}
                                                                {item.status == "1" && "Inactive"}
                                                                {item.status == "3" && "Invite"}

                                                            </span>
                                                            <button
                                                                className="btn btn-dwn p-0 dropdown-toggle"
                                                                data-bs-toggle="dropdown"
                                                                aria-expanded="false"
                                                            >
                                                                <i className="bi bi-chevron-down"></i></button>
                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                {item.status == "1" ? <a className="dropdown-item text-success" onClick={() => { onStatus("0", item._id) }}>Active</a> : <></>}
                                                                {item.status == "0" ? <a className="dropdown-item text-danger" onClick={() => { onStatus("1", item._id) }}>Inactive</a> : <></>}
                                                                {item.status == "1" ? <a className="dropdown-item text-secondary" onClick={() => { setId(item._id), handleShow() }}>Delete</a> : <></>}
                                                                {item.status == "3" ? <a className="dropdown-item text-secondary" onClick={() => { setId(item._id), handleShow() }}>Delete</a> : <></>}
                                                            </div>
                                                        </td>
                                                        <td align="left">
                                                            <button className="btn btn-dwn p-0 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></button>
                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                <div className="filter-lists">
                                                                    <div className='edtbtn'>
                                                                        <button onClick={() => { goto("/user/" + item._id) }}><i className="bi bi-person-workspace mx-2"></i> View User</button>
                                                                    </div>
                                                                    <div className='edtbtn'>
                                                                        <button
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#edituser"
                                                                            onClick={() => { onEdit(item._id) }}
                                                                        >
                                                                            <i className="bi bi-pencil-square mx-2"></i> Edit User
                                                                        </button>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                                    :
                                                    <tr className='no-data' >
                                                        <td colSpan={7} >
                                                            <Image
                                                                src="/assets/img/no-data.png"
                                                                width={500}
                                                                height={100}
                                                                alt='asd'
                                                            />
                                                        </td>
                                                    </tr>
                                            }
                                        </>
                                        :
                                        <>
                                            {user == undefined && <UserListSkeleton />}
                                        </>
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="paginati">
                        <div className="paginati_l">


                            <div className="dataTables_length d-flex align-items-center" id="datatables-reponsive_length">
                                <label>View </label>
                                <select
                                    name="datatables-reponsive_length"
                                    aria-controls="datatables-reponsive"
                                    className="form-select form-select-sm"
                                    value={limit}
                                    onChange={(e) => { setlimit(e.target.value) }}
                                >
                                    {
                                        limit && ["10", "15", "30", "50", "100"].map((item, i) => (
                                            <option key={i} value={item}>{item}</option>
                                        ))
                                    }
                                </select>
                                <span>{user && user.length} user{user && user.length > 1 ? "s" : ""} <strong>per page</strong></span>

                            </div>

                        </div>
                        <div className="paginati_r">
                            <UsePagination handleChangePage={handleChangePage} page={page} />
                        </div>
                    </div>
                </div>

            </div>

            <div className="modal fade" id="edituser" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header border-0">

                            <h5>Edit Admin</h5>
                            <button
                                id="edituserBtn"
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
                                                        src={"/upload/" + image}
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
                                            value={roleValue}
                                            onChange={(e) => { setRoleValue(e.target.value) }}
                                        >
                                            <option>Select</option>
                                            {
                                                rolesList && rolesList.map((item, i) => (
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
                                        disabled
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
                                        country={'in'}
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
                                    <button type="button" className="btn btn-primary" onClick={() => { onUserEdit() }}>Edit</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Modal
                show={show}
                backdrop="static"
                keyboard={false}
                onHide={handleDeleteClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure delete this user?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { handleDeleteClose() }}>
                        No
                    </Button>
                    <Button variant="primary" onClick={() => { onStatus("2", id), handleDeleteClose() }}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}

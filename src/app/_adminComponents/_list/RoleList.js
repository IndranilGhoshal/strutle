'use client'
var $ = require("jquery");
import moment from 'moment'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UsePagination from '../UsePagination';
import { adminAddRoleApi } from '@/app/lib/apiService';
import Image from 'next/image';
import { showLoader } from '@/app/lib/common';

export default function RoleList({ 
    role, 
    onEdit, 
    cancelEvent, 
    onStatus, 
    limit, 
    setlimit, 
    handleChangePage, 
    page, 
    search, 
    setSearch, 
    status, 
    setStatus, 
    type, 
    setType, 
    onMessage, 
    namesortFun, 
    createdatsortFun,
    goto 
    }) {
    const [id, setId] = useState('');
    const [roleName, setRoleName] = useState('');
    const [roletype, setRoleType] = useState('');
    const [statusVal, setStatusVal] = useState('0');
    const [error, setError] = useState(false)

    const [show, setShow] = useState(false);
    const handleDeleteClose = () => {
            setShow(false)
            setId("")
        };
    const handleShow = () => setShow(true);

    const handleClose = () => {
        setId("")
        setRoleName("")
        setRoleType('')
        setStatusVal('0')
        setError(false)
    };

    const editRoleEvent = async () => {
        let err = 0;
        setError(false)
        if (!role || !roletype) {
            setError(true)
            err++
        }
        if (err == 0) {
            let data = { id, role: roleName.trim(), roletype, status: statusVal, edit: true }
            let response = await adminAddRoleApi(data)
            console.log("response", response);
            if (response.success) {
                handleClose()
                $("#clsBtn1").click()
                onMessage(response.message, true)
            } else {
                onMessage(response.message, false)
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
                        placeholder='Search by role name'
                    /><button className="btn no-bg"><i className="bi bi-search"></i></button>
                </div>
                <div className="assects_src_dvadd">
                    <button className="btn btn-dwn p-0 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Filter Role List <i className="bi bi-sliders"></i></button>
                    <div className="dropdown-menu dropdown-menu-end">
                        <div className="filter-lists">
                            <label>Filter by Role Status</label>
                            <select
                                className="form-select"
                                value={status}
                                onChange={(e) => { setStatus(e.target.value) }}
                            >
                                <option value="">Select Status</option>
                                <option value="0">Active</option>
                                <option value="1">Inactive</option>
                            </select>
                        </div>
                        <div className="filter-lists">
                            <label>Filter by Role Type</label>
                            <select
                                className="form-select"
                                value={type}
                                onChange={(e) => { setType(e.target.value) }}
                            >
                                <option value="">Select Role Type</option>
                                <option value="1">Admin</option>
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
                                    <th align="left">Role Name <i style={{cursor:"pointer"}} className="bi bi-arrow-down-up" onClick={()=>{namesortFun()}}></i></th>
                                    <th align="left">No. User</th>
                                    <th align="left">Role Type</th>
                                    <th align="left">Created at <i style={{cursor:"pointer"}} className="bi bi-arrow-down-up" onClick={()=>{createdatsortFun()}}></i></th>
                                    <th align="left">Status</th>
                                    <th align="left">&nbsp;</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    role.length > 0 ? role.map((item, i) => (
                                        <tr role="row" key={i}>
                                            <td style={{ textAlign: "left" }} align="left">{i + 1}</td>
                                            <td align="left">{item.role}</td>
                                            <td align="left">{item.nouser}</td>
                                            <td align="left">{item.roletype == "1" ? "Admin" : ""}</td>
                                            <td align="left">{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                            <td align="left">
                                                <span className={`${item.status == "0" ? "text-success" : "text-danger"}`}>{item.status == "0" ? "Active" : "Inactive"} </span>
                                                <button
                                                    className="btn btn-dwn p-0 dropdown-toggle"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    <i className="bi bi-chevron-down"></i></button>
                                                <div className="dropdown-menu dropdown-menu-end">
                                                    {item.status == "0" ? <></> : <a className="dropdown-item text-success" onClick={() => { onStatus("0", item._id) }}>Active</a>}
                                                    {item.status == "1" ? <></> : <a className="dropdown-item text-danger" onClick={() => { onStatus("1", item._id) }}>Inactive</a>}
                                
                                                    {item.status == "0" ? <></> : <a className="dropdown-item text-secondary" onClick={() => { setId(item._id),handleShow()}}>Delete</a>}
                                                    
                                                </div>
                                            </td>
                                            <td align="left">
                                                <button className="btn btn-dwn p-0 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></button>
                                                <div className="dropdown-menu dropdown-menu-end">
                                                    <div className="filter-lists">
                                                        <div className='edtbtn'>
                                                            <button onClick={()=>{goto("/privilege/"+item._id), showLoader()}}><i className="bi bi-universal-access mx-2"></i>Set Privileges</button>
                                                        </div>
                                                        <div className='edtbtn'>
                                                            <button
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#addrole1"
                                                                onClick={() => { 
                                                                    setId(item._id), 
                                                                    setRoleName(item.role), 
                                                                    setRoleType(item.roletype == "1" ? "1" : ""), 
                                                                    setStatusVal(item.status) 
                                                                }}
                                                            >
                                                                <i className="bi bi-pencil-square mx-2"></i> Edit Role
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                    ))
                                        :
                                        <tr className='no-data' >
                                            <td colSpan={6} >
                                                <Image
                                                    src="/assets/img/no-data.png"
                                                    width={500}
                                                    height={100}
                                                    alt='asd'
                                                />
                                            </td>
                                        </tr>
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
                                <span>{role.length} role{role.length > 1 ? "s" : ""} <strong>per page</strong></span>

                            </div>

                        </div>
                        <div className="paginati_r">
                            <UsePagination handleChangePage={handleChangePage} page={page} />
                        </div>
                    </div>
                </div>

            </div>

            <div className="modal fade" id="addrole1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h5>Edit Role</h5>
                            <button
                                id="clsBtn1"
                                type="button"
                                className="close-button"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={handleClose}
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>
                        <div className="modal-body">

                            <div className="frm">
                                <div className="role_select">
                                    <label className="mb-2">Role Name  </label>
                                    <input
                                        type="text"
                                        className={`form-control ${error && !roleName ? "error-txt" : ""}`}
                                        placeholder="Enter role name"
                                        value={roleName}
                                        onChange={(e) => { setRoleName(e.target.value) }}
                                    />
                                    {
                                        error && !roleName && <div className='input-error'>Please enter role name</div>
                                    }
                                </div>
                                <div className="role_select mt-3">
                                    <label className="mb-2">Role Type  </label>
                                    <div className="contct_no">
                                        <select
                                            className={`form-control ${error && !roletype ? "error-txt" : ""}`}
                                            value={roletype}
                                            onChange={(e) => { setRoleType(e.target.value) }}
                                        >
                                            <option value="">Please select role type</option>
                                            <option value="1">Admin</option>
                                        </select>
                                    </div>
                                    {
                                        error && !roletype && <div className='input-error'>Please select role type</div>
                                    }
                                </div>

                                <div className="role_select mt-3">
                                    <label className="mb-2">Status</label>
                                    <div className="contct_no">
                                        <select
                                            className={`form-control ${error && !statusVal ? "error-txt" : ""}`}
                                            value={statusVal}
                                            onChange={(e) => { setStatusVal(e.target.value) }}
                                        >
                                            <option value="0">Active</option>
                                            <option value="1">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="add_btn">
                                    <button type="button" className="btn btn-primary" onClick={() => { editRoleEvent() }}>Edit</button>
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
                <Modal.Body>Are you sure delete this role?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{handleDeleteClose()}}>
                        No
                    </Button>
                    <Button variant="primary" onClick={()=>{onStatus("2", id),handleDeleteClose()}}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

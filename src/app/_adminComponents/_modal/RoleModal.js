'use client'
import { adminAddRoleApi } from '@/app/lib/apiService';
import { hideLoader, showLoader } from '@/app/lib/common';
import React, { useState } from 'react'

export default function RoleModal({ add, edit, dataset, onMessage }) {

    const [role, setRole] = useState('');
    const [roletype, setRoleType] = useState('');
    const [status, setStatus] = useState('0');
    const [error, setError] = useState(false)


    const handleClose = () => {
        setRole('')
        setRoleType('')
        setStatus('0')
        setError(false)
    };


    const getModalClose = () => {
        const elem = document.getElementById('clsBtn');
        elem.click()
    }

    const addRoleEvent = async () => {
        let err = 0;
        setError(false)
        if (!role || !roletype) {
            setError(true)
            err++
        }
        if (err == 0) {
            showLoader()
            let data = { role, roletype, status, add: true }
            let response = await adminAddRoleApi(data)
            if (response.success) {
                hideLoader()
                handleClose()
                getModalClose()
                onMessage(response.message, true)
            } else {
                hideLoader()
                onMessage(response.message,  false)
            }
        }
    }
    return (
        <>
            <button className="btn down_btn" data-bs-toggle="modal" data-bs-target="#addrole"><i className="bi bi-plus"></i> Add New</button>


            <div className="modal fade" id="addrole" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h5>{"Add Role"}</h5>
                            <button
                                id="clsBtn"
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
                                    <label className="mb-2">Role Name</label>
                                    <input
                                        type="text"
                                        className={`form-control ${error && !role ? "error-txt" : ""}`}
                                        placeholder="Enter role name"
                                        value={role}
                                        onChange={(e) => { setRole(e.target.value) }}
                                    />
                                    {
                                        error && !role && <div className='input-error'>Please enter role name</div>
                                    }
                                </div>

                                <div className="role_select mt-3">
                                    <label className="mb-2">Role Type</label>
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
                                            className={`form-control ${error && !status ? "error-txt" : ""}`}
                                            value={status}
                                            onChange={(e) => { setStatus(e.target.value) }}
                                        >
                                            <option value="0">Active</option>
                                            <option value="1">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="add_btn">
                                    <button type="button" className="btn btn-primary" onClick={addRoleEvent}>Add</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </>
    )
}

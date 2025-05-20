'use client'
var $ = require("jquery");
import moment from 'moment'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UsePagination from '../UsePagination';
import { adminAddRoleApi, admingiftcardApi, uploadImageApi } from '@/app/lib/apiService';
import Image from 'next/image';
import { showLoader } from '@/app/lib/common';
import { resizeFile } from '@/app/lib/ImageCroper';
import GiftCardListSkeleton from '../_skeleton/GiftCardListSkeleton';

export default function GiftCardList({
    list,
    onEdit,
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
    goto,
    getDatas
}) {
    const [id, setId] = useState('');
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [statusVal, setStatusVal] = useState('0');
    const [error, setError] = useState(false)

    const [show, setShow] = useState(false);
    const handleDeleteClose = () => {
        setShow(false)
        setId("")
    };
    const handleShow = () => setShow(true);

    const handleClose = () => {
        setId('')
        setImage('')
        setTitle('')
        setDescription('')
        setStatusVal('0')
        setError(false)
    };

    const editEvent = async () => {
        let err = 0;
        setError(false)
        if (!image || !title || !description) {
            setError(true)
            err++
        }
        if (err == 0) {
            let data = { id, image, title: title.trim(), description, status: statusVal, edit: true }
            let response = await admingiftcardApi(data)
            if (response.success) {
                handleClose()
                getModalClose()
                getDatas()
                onMessage(response.message, true)
            } else {
                onMessage(response.message, false)
            }
        }
    }

    const getModalClose = () => {
        const elem = document.getElementById('editgiftcardclsBtn');
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
            <div className="mastr_hw">
                <div className="assects_src_dv position-relative">
                    <label>Search</label>
                    <input
                        type="text"
                        className="form-control"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value) }}
                        placeholder='Search by gift card name'
                    /><button className="btn no-bg"><i className="bi bi-search"></i></button>
                </div>
                <div className="assects_src_dvadd">
                    <button className="btn btn-dwn p-0 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Filter List <i className="bi bi-sliders"></i></button>
                    <div className="dropdown-menu dropdown-menu-end">
                        <div className="filter-lists">
                            <label>Filter by Status</label>
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
                                    <th align="left">Gift card Title <i style={{ cursor: "pointer" }} className="bi bi-arrow-down-up" onClick={() => { namesortFun() }}></i></th>
                                    <th align="left">No. Users Use</th>
                                    <th align="left">Description</th>
                                    <th align="left">Created at <i style={{ cursor: "pointer" }} className="bi bi-arrow-down-up" onClick={() => { createdatsortFun() }}></i></th>
                                    <th align="left">Status</th>
                                    <th align="left">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    list !== undefined ?
                                        <>
                                            {
                                                list.length > 0 ? list.map((item, i) => (
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
                                                                                getNameFirstLetter(item.title)
                                                                            }
                                                                        </>
                                                                }
                                                            </span>
                                                            {item.title}
                                                        </td>
                                                        <td align="left">0</td>
                                                        <td align="left"><p className='txt-wp'>{item.description}</p></td>
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
                                                                {item.status == "0" ? <></> : <a className="dropdown-item text-secondary" onClick={() => { setId(item._id), handleShow() }}>Delete</a>}
                                                            </div>
                                                        </td>
                                                        <td align="left">
                                                            <button className="btn btn-dwn p-0 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></button>
                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                <div className="filter-lists">
                                                                    <div className='edtbtn'>
                                                                        <button onClick={() => { goto("/giftcardconfiguration/" + item._id), showLoader() }}><i className="bi bi-gear-wide-connected mx-2"></i>Set Configuration</button>
                                                                    </div>
                                                                    <div className='edtbtn'>
                                                                        <button
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#editgiftcard"
                                                                            onClick={() => {
                                                                                setId(item._id),
                                                                                    setTitle(item.title),
                                                                                    setDescription(item.description),
                                                                                    setImage(item.image),
                                                                                    setStatusVal(item.status)
                                                                            }}
                                                                        >
                                                                            <i className="bi bi-pencil-square mx-2"></i> Edit Gift Card
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
                                                                src={"/assets/img/no-data.png"}
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
                                            {list == undefined && <GiftCardListSkeleton />}
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
                                <span>{list && list.length} Gift card{list && list.length > 1 ? "s" : ""} <strong>per page</strong></span>

                            </div>

                        </div>
                        <div className="paginati_r">
                            <UsePagination handleChangePage={handleChangePage} page={page} />
                        </div>
                    </div>
                </div>

            </div>

            <div className="modal fade" id="editgiftcard" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h5>Edit Gift Card</h5>
                            <button
                                id="giftcardclsBtn"
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
                                                    <i className="bi bi-gift"></i>
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
                                <div className="role_select">
                                    <label className="mb-2">Gift Card Title</label>
                                    <input
                                        type="text"
                                        className={`form-control ${error && !title ? "error-txt" : ""}`}
                                        placeholder="Enter Gift Card Title"
                                        value={title}
                                        onChange={(e) => { setTitle(e.target.value) }}
                                    />
                                    {
                                        error && !title && <div className='input-error'>Please enter gift card title</div>
                                    }
                                </div>

                                <div className="role_select">
                                    <label className="mb-2">Gift Card Description</label>
                                    <input
                                        type="text"
                                        className={`form-control ${error && !description ? "error-txt" : ""}`}
                                        placeholder="Enter Gift Card Title"
                                        value={description}
                                        onChange={(e) => { setDescription(e.target.value) }}
                                    />
                                    {
                                        error && !description && <div className='input-error'>Please enter gift card description</div>
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
                                    <button type="button" className="btn btn-primary" onClick={editEvent}>Edit</button>
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
                <Modal.Body>Are you sure delete this gifte card?</Modal.Body>
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

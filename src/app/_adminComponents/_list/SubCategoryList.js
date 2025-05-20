'use client'
import React, { useEffect, useState } from 'react'
import UsePagination from '../UsePagination'
import Image from 'next/image'
import moment from 'moment'
import { Button, Modal } from 'react-bootstrap'
import { categoryApi, subcategoryApi, uploadImageApi } from '@/app/lib/apiService'
import { hideLoader, showLoader } from '@/app/lib/common'
import { resizeFile } from '@/app/lib/ImageCroper'
import SubCategoryListSkeleton from '../_skeleton/SubCategoryListSkeleton'

export default function SubCategoryList(
    {
        list,
        onStatus,
        limit,
        setlimit,
        handleChangePage,
        page,
        search,
        setSearch,
        status,
        setStatus,
        namesortFun,
        createdatsortFun,
        onMessage,
        categoryFilterList,
        mstcategoryid,
        setMstcategoryid
    }
) {
    const [id, setId] = useState('')
    const [show, setShow] = useState(false);
    const handleDeleteClose = () => {
        setShow(false)
        setId("")
    };
    const handleShow = () => setShow(true);


    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [mstcategoryeditid, setMstcategoryEditid] = useState('');
    const [statusvalue, setStatusValue] = useState('0');
    const [error, setError] = useState(false)

    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        getCategory()
    }, [])

    const getCategory = async () => {
        let data = { list: true, dropdown: true }
        let response = await categoryApi(data)
        if (response.success) {
            let res = response.result
            setCategoryList(res)
        } else {
            setCategoryList([])
        }
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

    const handleClose = () => {
        setName('')
        setImage('')
        setMstcategoryEditid('')
        setStatusValue('0')
        setError(false)
    };


    const getModalClose = () => {
        const elem = document.getElementById('subcategoryEditModalClose');
        elem.click()
    }

    const editEvent = async () => {
        let err = 0;
        setError(false)
        if (!name || !mstcategoryeditid) {
            setError(true)
            err++
        }
        if (err == 0) {
            let data = { id, name, image, mstcategoryid: mstcategoryeditid, status: statusvalue, edit: true }
            let response = await subcategoryApi(data)
            if (response.success) {
                handleClose()
                getModalClose()
                onMessage(response.message, false, true)
            } else {
                onMessage(response.message, false, false)
            }
        }
    }

    const onEdit = async (id) => {
        showLoader()
        let response = await subcategoryApi({ id: id, details: true })
        if (response.success) {
            hideLoader()
            let res = response.result
            setId(res._id)
            setImage(res.image)
            setName(res.name)
            setMstcategoryEditid(res.mstcategoryid)
            setStatusValue(res.status)
        } else {
            setId('')
            setImage('')
            setName('')
            setMstcategoryEditid('')
            setStatusValue('0')
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
                        placeholder='Search by sub-category'
                    />
                    <button className="btn no-bg"><i className="bi bi-search"></i></button>
                </div>
                <div className="assects_src_dvadd">

                    <button className="btn btn-dwn p-0 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Filter Sub-Category List <i className="bi bi-sliders"></i></button>
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
                        <div className="filter-lists">
                            <label>Filter by Category Type</label>
                            <select
                                className="form-select"
                                value={mstcategoryid}
                                onChange={(e) => { setMstcategoryid(e.target.value) }}
                            >
                                <option value="">Select Category Type</option>
                                {
                                    categoryFilterList && categoryFilterList.map((item, i) => (
                                        <option key={i} value={item._id}>{item.name}</option>
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
                                    <th align="left">S.No</th>
                                    <th align="left">Name <i style={{ cursor: "pointer" }} className="bi bi-arrow-down-up" onClick={() => { namesortFun() }}></i></th>
                                    <th align="left"><div className='txt-wp-sm'>Category Name</div></th>
                                    <th align="left"><div className='txt-wp-sm'>No. of Product Types</div></th>
                                    <th align="left"><div className='txt-wp-sm'>No of Items</div></th>
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
                                                        <td style={{ textAlign: 'left' }} align="left">{i + 1}</td>
                                                        <td align="left" className='lst-td'>
                                                            <span className='photo-clr lst'>
                                                                {
                                                                    item.image ?
                                                                        <Image
                                                                            src={"/upload/" + item.image}
                                                                            width={100}
                                                                            height={100}
                                                                            alt='asd'
                                                                        />
                                                                        :
                                                                        <Image
                                                                            src={"/assets/img/sub-category-icon.png"}
                                                                            width={60}
                                                                            height={60}
                                                                            alt='category'
                                                                        />
                                                                }
                                                            </span>
                                                            {item.name}
                                                        </td>
                                                        <td align="left">{item.category}</td>
                                                        <td align="left">{item.noproducttype}</td>
                                                        <td align="left">{item.noitem}</td>
                                                        <td align="left">{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                                        <td align="left">
                                                            <span className={`${item.status == "0" ? "text-success" : ""}${item.status == "1" ? "text-danger" : ""}`}>
                                                                {item.status == "0" && "Active"}
                                                                {item.status == "1" && "Inactive"}

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
                                                            </div>
                                                        </td>
                                                        <td align="left">
                                                            <button className="btn btn-dwn p-0 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></button>
                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                <div className="filter-lists">
                                                                    <div className='edtbtn'>
                                                                        <button
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#editsubcategory"
                                                                            onClick={() => { onEdit(item._id) }}
                                                                        >
                                                                            <i className="bi bi-pencil-square mx-2"></i> Edit Sub-Category
                                                                        </button>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                ))
                                                    :
                                                    <tr className='no-data' >
                                                        <td colSpan={8} >
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
                                            {list == undefined && <SubCategoryListSkeleton />}
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
                                <span>{list && list.length} Sub{list && list.length > 1 ? "-Categories" : "-Category"} <strong>per page</strong></span>

                            </div>

                        </div>
                        <div className="paginati_r">
                            <UsePagination handleChangePage={handleChangePage} page={page} />
                        </div>
                    </div>
                </div>

            </div>

            <div className="modal fade" id="editsubcategory" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h5>Edit Sub-Category</h5>
                            <button
                                id="subcategoryEditModalClose"
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
                                                <Image
                                                    src={"/upload/" + image}
                                                    width={100}
                                                    height={100}
                                                    alt='aaddsd'
                                                />
                                                :
                                                <Image
                                                    src={"/assets/img/sub-category-icon.png"}
                                                    width={60}
                                                    height={60}
                                                    alt='category'
                                                />
                                        }
                                    </span>
                                </div>
                                <div className="role_select mt-3">
                                    <label className="mb-2">Upload Photo</label>
                                    <input
                                        type="file"
                                        name="file"
                                        className={`form-control`}
                                        onChange={(e) => { uploadImg(e.target.files?.[0]) }}
                                    />
                                </div>
                                <div className="role_select mt-3">
                                    <label className="mb-2">Sub-category name</label>
                                    <input
                                        type="text"
                                        className={`form-control ${error && !name ? "error-txt" : ""}`}
                                        value={name}
                                        onChange={(e) => { setName(e.target.value) }}
                                        maxLength={25}
                                    />
                                    {
                                        error && !name && <div className='input-error'>Please enter sub category name</div>
                                    }
                                </div>
                                <div className="role_select mt-3">
                                    <label className="mb-2">Category</label>
                                    <select
                                        className={`form-select ${error && !mstcategoryeditid ? "error-txt" : ""}`}
                                        value={mstcategoryeditid}
                                        onChange={(e) => { setMstcategoryEditid(e.target.value) }}
                                    >
                                        <option>Select</option>
                                        {
                                            categoryList && categoryList.map((item, i) => (
                                                <option key={i} value={item._id}>{item.name}</option>
                                            ))
                                        }
                                    </select>
                                    {
                                        error && !mstcategoryeditid && <div className='input-error'>Please select category</div>
                                    }
                                </div>
                                <div className="role_select mt-3">
                                    <label className="mb-2">Status</label>
                                    <div className="contct_no">
                                        <select
                                            className={`form-select ${error && !statusvalue ? "error-txt" : ""}`}
                                            value={statusvalue}
                                            onChange={(e) => { setStatusValue(e.target.value) }}
                                        >
                                            <option value="0">Active</option>
                                            <option value="1">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="add_btn">
                                    <button type="button" className="btn btn-primary" onClick={() => { editEvent() }}>Update</button>
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
                <Modal.Body>Are you sure delete this sub category?</Modal.Body>
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

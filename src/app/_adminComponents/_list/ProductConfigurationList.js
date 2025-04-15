'use client'
import { producttypeApi } from '@/app/lib/apiService'
import { hideLoader, showLoader } from '@/app/lib/common'
import moment from 'moment'
import Image from 'next/image'
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function ProductConfigurationList({ list, onStatus, onMessage, getCopyArray }) {
    const [id, setId] = useState('')
    const [show, setShow] = useState(false);
    const handleDeleteClose = () => {
        setShow(false)
        setId("")
    };
    const handleShow = () => setShow(true);

    const [typeArray, setTypeArray] = useState([
        { name: "Text", value: "Text" },
        { name: "Single Select, Auto-complete", value: "Single Select, Auto-complete" },
        { name: "Multi Select, Auto-complete", value: "Multi Select, Auto-complete" },
        { name: "Numeric", value: "Numeric" },
        { name: "Checkbox", value: "Checkbox" },
        { name: "File", value: "File" },
        { name: "Date", value: "Date" },
        { name: "Radio", value: "Radio" },
        { name: "Text Area", value: "Text Area" },
        { name: "Accordion", value: "Accordion" },
    ])

    const [valueDiv, setValueDiv] = useState(false)
    const [valueFileDiv, setValueFileDiv] = useState(false)
    const [maxValueDiv, setMaxValueDiv] = useState(false)

    const [valueList, setValueList] = useState([])
    const [value, setValue] = useState('')
    const [valueError, setValueError] = useState(false)
    const [valueid, setValueId] = useState('')

    const[mstproducttypeid, setmstproducttypeid]=useState('')
    const [fieldname, setFieldName] = useState('')
    const [ismandatory, setIsMandatory] = useState('')
    const [isfilter, setIsFilter] = useState('')
    const [fieldinputtype, setFileInputType] = useState('')
    const [maxvalue, setMaxValue] = useState('')
    const [maxfile, setMaxFile] = useState('')
    const [status, setStatus] = useState('0')
    const [error, setError] = useState(false)

    


    const getType = (val) => {
        setValueDiv(false)
        setMaxValueDiv(false)
        setValueFileDiv(false)
        setValue('')
        setValueError(false)
        setMaxValue('')
        setMaxFile('')
        if (val == 'Single Select, Auto-complete') {
            setValueDiv(true)
        } else if (val == 'Multi Select, Auto-complete') {
            setValueDiv(true)
        } else if (val == 'Radio') {
            setValueDiv(true)
        } else if (val == 'Checkbox') {
            setValueDiv(true)
        } else if (val == 'Text') {
            setMaxValueDiv(true)
        } else if (val == 'Numeric') {
            setMaxValueDiv(true)
        } else if (val == 'File') {
            setValueFileDiv(true)
        } else if (val == 'Text Area') {
            setMaxValueDiv(true)
        } else {
            setValueDiv(false)
            setMaxValueDiv(false)
            setValueFileDiv(false)
        }
    }

    const setArrayValue = async () => {
        let err = 0;
        setValueError(false)
        if (!value) {
            setValueError(true)
            err++
        }
        if (err == 0) {
            let data = { name: value }
            let temp = [...valueList]
            let e = 0
            for (let [i, t] of temp.entries()) {
                if (value == t.name) {
                    setValueError(true)
                    e++
                }
            }
            if(e==0){
                temp.push(data)
                setValueList(temp)
                setValue('')
            }
        }
    }

    const deleteArrayValue = (index) => {
        let temp = [...valueList]
        let m = []
        for (let [i, t] of temp.entries()) {
            if (i !== index) {
                m.push(t)
            }
        }
        setValueList(m)
        cancelArrayvalue()
    }

    const editArrayValue = (index, name) => {
        setValue(name)
        setValueId(index + 1)
    }

    const setEditArrayValue = async () => {
        let err = 0;
        setValueError(false)
        if (!value) {
            setValueError(true)
            err++
        }
        let val = [...valueList]
        for (let v of val) {
            if (v.name == value) {
                setValueError(true)
                err++
            }
        }
        if (err == 0) {
            let temp = [...valueList]
            for (let [i, t] of temp.entries()) {
                if (i + 1 == valueid) {
                    t.name = value
                }
            }
            setValueList(temp)
            setValue('')
            setValueId('')
        }
    }

    const cancelArrayvalue = () => {
        setValue('')
        setValueId('')
        setValueError(false)
    }

    const handleClose = () => {
        setmstproducttypeid('')
        setFieldName('')
        setIsMandatory('')
        setIsFilter('')
        setFileInputType('')
        setMaxValue('')
        setMaxFile('')
        setValueDiv(false)
        setValueFileDiv(false)
        setMaxValueDiv(false)
        setValueList([])
        setValue('')
        setValueId('')
        setValueError(false)
        setStatus('0')
        setError(false)
    };


    const getModalClose = () => {
        const elem = document.getElementById('producttypeconfigationeditModalClose');
        elem.click()
    }

    const editEvent = async () => {
        console.log("maxvalue",maxvalue);
        let err = 0;
        setError(false)
        setValueError(false)
        setValue('')
        if (!fieldname || !ismandatory || !isfilter || !fieldinputtype) {
            setError(true)
            err++
        }
        if (maxValueDiv) {
            if (!maxvalue) {
                setError(true)
                err++
            }
        }
        if (valueFileDiv) {
            if (!maxfile) {
                setError(true)
                err++
            }
        }
        if (valueDiv) {
            if (valueList.length == 0) {
                setError(true)
                err++
            }
        }
        let f = false;
        let g = false;
        let j = false;
        if (fieldinputtype == 'Single Select, Auto-complete') {
            f = true
        } else if (fieldinputtype == 'Multi Select, Auto-complete') {
            f = true
        } else if (fieldinputtype == 'Radio') {
            f = true
        } else if (fieldinputtype == 'Checkbox') {
            f = true
        } else if (fieldinputtype == 'Text') {
            g = true
        } else if (fieldinputtype == 'Numeric') {
            g = true
        } else if (fieldinputtype == 'File') {
            j = true
        } else if (fieldinputtype == 'Text Area') {
            g = true
        } 

        if (err == 0) {
            let data = {
                id:id,
                mstproducttypeid,
                fieldname,
                ismandatory,
                isfilter,
                fieldinputtype,
                maxvalue: g ? !maxvalue ? "0" : maxvalue : "0",
                maxfile: j ?  !maxfile ? "0" : maxfile: "0",
                valueList: f ? valueList.length == "0" ? [] : valueList : [],
                status,
                configurationedit: true
            }
            showLoader()
            let response = await producttypeApi(data)
            if (response.success) {
                hideLoader()
                handleClose()
                getModalClose()
                onMessage(response.message, true)
            } else {
                hideLoader()
                onMessage(response.message, false)
            }
        }
    }

    const onEdit = async (id) => {
        showLoader()
        let response = await producttypeApi({ id: id, configurationdetails: true })
        if (response.success) {
            hideLoader()
            let res = response.result
            setId(res._id)
            setmstproducttypeid(res.mstproducttypeid)
            setFieldName(res.fieldname)
            setIsMandatory(res.ismandatory)
            setIsFilter(res.isfilter)
            setFileInputType(res.fieldinputtype)
            setMaxValue(res.maxvalue)
            setMaxFile(res.maxfile)
            if (res.fieldinputtype == 'Single Select, Auto-complete') {
                setValueDiv(true)
            } else if (res.fieldinputtype == 'Multi Select, Auto-complete') {
                setValueDiv(true)
            } else if (res.fieldinputtype == 'Radio') {
                setValueDiv(true)
            } else if (res.fieldinputtype == 'Checkbox') {
                setValueDiv(true)
            } else if (res.fieldinputtype == 'Text') {
                setMaxValueDiv(true)
            } else if (res.fieldinputtype == 'Numeric') {
                setMaxValueDiv(true)
            } else if (res.fieldinputtype == 'File') {
                setValueFileDiv(true)
            } else if (res.fieldinputtype == 'Text Area') {
                setMaxValueDiv(true)
            } else {
                setValueDiv(false)
                setMaxValueDiv(false)
                setValueFileDiv(false)
            }
            if(res.valueList.length>0){
                setValueList(res.valueList)
            }else{
                setValueList([])
            }
            setStatus(res.status)
        } else {
            setId('')
            setFieldName('')
            setIsMandatory('')
            setIsFilter('')
            setFileInputType('')
            setMaxValue('')
            setMaxFile()
            setValueList('0')
            setStatus(res.status)
        }
    }

    return (
        <>
            <div className="bg-white shadow_d rounded-3">
                <div className="mast_hw_tab">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr role="row">
                                    <th align="left">Sl. No.</th>
                                    <th align="left">&nbsp;</th>
                                    <th align="left">Field Name</th>
                                    <th align="left">Is Default</th>
                                    <th align="left">Is Mandatory</th>
                                    <th align="left">Is Filter</th>
                                    <th align="left">Field Input type</th>
                                    <th align="left">Max Length</th>
                                    <th align="left">Created At</th>
                                    <th align="left">Status</th>
                                    <th align="left">&nbsp;</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    list.length > 0 ? list && list.map((item, i) => (
                                        <tr role="row" key={i}>
                                            <td style={{ textAlign: "left" }} align="left">{i + 1}</td>
                                            <td style={{ textAlign: "left" }} align="left"><input type='checkbox' checked={item.check==true} onChange={()=>{getCopyArray(i)}} /></td>
                                            <td align="left">{item.fieldname}</td>
                                            <td align="left">{item.isdefault == 1 ? "No" : "Yes"}</td>
                                            <td align="left">{item.ismandatory == 1 ? "No" : "Yes"}</td>
                                            <td align="left">{item.isfilter == 1 ? "No" : "Yes"}</td>
                                            <td align="left">{item.fieldinputtype}</td>
                                            <td align="left">{item.maxvalue}</td>
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
                                                                data-bs-target="#addproductconfigurationedit"
                                                                onClick={() => { onEdit(item._id) }}
                                                            >
                                                                <i className="bi bi-pencil-square mx-2"></i> Edit Attribute
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                        :
                                        <tr className='no-data' >
                                            <td colSpan={10} >
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
                </div>
            </div>

            <div className="modal fade" id="addproductconfigurationedit" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h5>Edit Configuration Attribute</h5>
                            <button
                                id="producttypeconfigationeditModalClose"
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
                                    <label className="mb-2">Field Name</label>
                                    <input
                                        type="text"
                                        className={`form-control ${error && !fieldname ? "error-txt" : ""}`}
                                        value={fieldname}
                                        onChange={(e) => { setFieldName(e.target.value) }}
                                        maxLength={100}
                                    />
                                    {
                                        error && !fieldname && <div className='input-error'>Please enter field name</div>
                                    }
                                </div>

                                <div className="role_select mt-3">
                                    <label className="mb-2">Is Mandatory?</label>
                                    <div>
                                        <input
                                            type="radio"
                                            id="yes"
                                            name="mandatory"
                                            checked={ismandatory=='0'}
                                            value={0}
                                            onChange={(e) => { setIsMandatory(e.target.value) }}
                                        />
                                        <label htmlFor="tes" className='mx-2'>Yes</label>
                                        <input
                                            type="radio"
                                            id="no"
                                            name="mandatory"
                                            checked={ismandatory=='1'}
                                            value={1}
                                            onChange={(e) => { setIsMandatory(e.target.value) }}
                                        />
                                        <label htmlFor="no" className='mx-2'>No</label>
                                    </div>
                                    {
                                        error && !ismandatory && <div className='input-error'>Please select is mandatory</div>
                                    }
                                </div>

                                <div className="role_select mt-3">
                                    <label className="mb-2">Is Filter?</label>
                                    <div>
                                        <input
                                            type="radio"
                                            id="yes"
                                            name="filter"
                                            checked={isfilter=='0'}
                                            value={0}
                                            onChange={(e) => { setIsFilter(e.target.value) }}
                                        />
                                        <label htmlFor="tes" className='mx-2'>Yes</label>
                                        <input
                                            type="radio"
                                            id="no"
                                            name="filter"
                                            checked={isfilter=='1'}
                                            value={1}
                                            onChange={(e) => { setIsFilter(e.target.value) }}
                                        />
                                        <label htmlFor="no" className='mx-2'>No</label>
                                    </div>
                                    {
                                        error && !isfilter && <div className='input-error'>Please select is filter</div>
                                    }
                                </div>
                                <div className="role_select mt-3">
                                    <label className="mb-2">Field Input Type  </label>
                                    <div className="contct_no">
                                        <select
                                            className={`form-select ${error && !fieldinputtype ? "error-txt" : ""}`}
                                            value={fieldinputtype}
                                            onChange={(e) => { getType(e.target.value); setFileInputType(e.target.value) }}
                                        >
                                            <option value="">Select</option>
                                            {
                                                typeArray.map((item, i) => (
                                                    <option key={i} value={item.value}>{item.name}</option>
                                                ))
                                            }
                                        </select>
                                        {
                                            error && !fieldinputtype && <div className='input-error'>Please select field input type</div>
                                        }
                                    </div>
                                </div>
                                {
                                    valueDiv ?
                                        <div className="role_select mt-3">
                                            <div className='row'>
                                                <div className='col-sm-6'>
                                                    <label className="mb-2">Value Name</label>
                                                    <input
                                                        type="text"
                                                        value={value}
                                                        onChange={(e) => { setValue(e.target.value) }}
                                                        className={`form-control ${valueError && !value ? "error-txt" : ""}${valueError && value ? "error-txt" : ""}`}
                                                    />
                                                    {
                                                        valueError && !value && <div className='input-error'>Please enter value</div>
                                                    }
                                                    {
                                                        valueError && value && <div className='input-error'>Value already exist</div>
                                                    }
                                                    <div className='mt-3'>
                                                        {!valueid && <button type="button" className="btn btn-primary w-100" onClick={() => { setArrayValue() }}>Add Value</button>}
                                                        {valueid && <button type="button" className="btn btn-primary w-45" onClick={() => { setEditArrayValue() }}>Edit Value</button>}
                                                        &nbsp;
                                                        {valueid && <button type="button" className="btn btn-danger w-50" onClick={() => { cancelArrayvalue() }}>Cancel</button>}
                                                    </div>
                                                </div>
                                                <div className='col-sm-6'>
                                                    <div>
                                                        <label className="mb-2"><u>Value List</u></label>
                                                        <div className='vlist-bx'>
                                                            {
                                                                valueList.length > 0 ? valueList.map((item, i) => (
                                                                    <div key={i} className='vlist'>
                                                                        <p>{i + 1 + ". " + item.name}</p>
                                                                        <span>
                                                                            <i onClick={() => { editArrayValue(i, item.name) }} style={{ color: 'blue', cursor: "pointer" }} className="bi bi-pencil-square"></i>
                                                                            <i onClick={() => { deleteArrayValue(i) }} style={{ color: 'red', cursor: "pointer" }} className="bi bi-trash3 mx-2"></i>
                                                                        </span>
                                                                    </div>
                                                                ))
                                                                    :
                                                                    <p>No data added.</p>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                valueDiv && !valueError && !value && error && valueList.length == 0 && <div className='input-error'>Please added value</div>
                                            }
                                        </div>
                                        :
                                        <></>
                                }
                                {
                                    maxValueDiv ?
                                        <div className="role_select mt-3">
                                            <label className="mb-2">Max Length</label>
                                            <input
                                                type="text"
                                                className={`form-control ${maxValueDiv && error && !maxvalue ? "error-txt" : ""}`}
                                                value={maxvalue}
                                                onChange={(e) => { setMaxValue(e.target.value) }}
                                            />
                                            {
                                                maxValueDiv && error && !maxvalue && <div className='input-error'>Please enter max length</div>
                                            }
                                        </div>
                                        :
                                        <></>
                                }
                                {
                                    valueFileDiv ?
                                        <div className="role_select mt-3">
                                            <label className="mb-2">Max File Limit</label>
                                            <input
                                                type="number"
                                                className={`form-control ${error && !maxfile ? "error-txt" : ""}`}
                                                value={maxfile}
                                                onChange={(e) => { setMaxFile(e.target.value) }}
                                            />
                                            {
                                                valueFileDiv && error && !maxfile && <div className='input-error'>Please enter max file limit</div>
                                            }
                                        </div>
                                        :
                                        <></>
                                }

                                <div className="role_select mt-3">
                                    <label className="mb-2">Status</label>
                                    <div className="contct_no">
                                        <select
                                            className="form-select"
                                            value={status}
                                            onChange={(e) => { setStatus(e.target.value) }}
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
                <Modal.Body>Are you sure delete this configuration attribute?</Modal.Body>
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

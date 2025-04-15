'use client'
import { producttypeApi } from '@/app/lib/apiService'
import { hideLoader, showLoader } from '@/app/lib/common'
import React, { useState } from 'react'

export default function ProductConfigrationModal({onMessage,id}) {

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
    ])

    const [valueDiv, setValueDiv] = useState(false)
    const [valueFileDiv, setValueFileDiv] = useState(false)
    const [maxValueDiv, setMaxValueDiv] = useState(false)

    const [valueList, setValueList] = useState([])
    const [value, setValue] = useState('')
    const [valueError, setValueError] = useState(false)
    const [valueid, setValueId] = useState('')


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
        setValueList([])
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
            let t = [...valueList]
            t.push(data)
            setValueList(t)
            setValue('')
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
        const elem = document.getElementById('producttypeconfigationModalClose');
        elem.click()
    }

    const addEvent = async () => {
        let err = 0;
        setError(false)
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
        if (err == 0) {
            let data = {
                mstproducttypeid:id,
                fieldname,
                ismandatory,
                isfilter,
                fieldinputtype,
                maxvalue: !maxvalue ? "0" : maxvalue,
                maxfile: !maxfile ? "0" : maxfile,
                valueList: valueList.length == "0" ? [] : valueList,
                status,
                configurationadd: true
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


    return (
        <>
            <button className="btn down_btn" data-bs-toggle="modal" data-bs-target="#addproductconfiguration"><i className="bi bi-plus"></i> Add New</button>
            
            <div className="modal fade" id="addproductconfiguration" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h5>Add Configuration Attribute</h5>
                            <button
                                id="producttypeconfigationModalClose"
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
                                            value={0}
                                            onChange={(e) => { setIsMandatory(e.target.value) }}
                                        />
                                        <label htmlFor="tes" className='mx-2'>Yes</label>
                                        <input
                                            type="radio"
                                            id="no"
                                            name="mandatory"
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
                                            value={0}
                                            onChange={(e) => { setIsFilter(e.target.value) }}
                                        />
                                        <label htmlFor="tes" className='mx-2'>Yes</label>
                                        <input
                                            type="radio"
                                            id="no"
                                            name="filter"
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
                                                type="number"
                                                className={`form-control ${error && !maxvalue ? "error-txt" : ""}`}
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
                                    <button type="button" className="btn btn-primary" onClick={() => { addEvent() }}>Add</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

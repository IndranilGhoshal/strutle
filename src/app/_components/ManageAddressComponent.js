'use client'
import React, { useState } from 'react'
import { pincodeapi, shippingaddressapi } from '../lib/apiService'
import Image from 'next/image'
import { getLocalStorageData, hideLoader, showLoader } from '../lib/common'
import AddressListSkeleton from './_skeleton/AddressListSkeleton'

export default function ManageAddressComponent({ isAddressLoad, addressarray, addressdefaultChange, addressDelete, onMessage, getAddressData }) {

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [pincode, setPincode] = useState('')
    const [postoffice, setPostOffice] = useState('')
    const [locality, setLocality] = useState('')
    const [building, setBuilding] = useState('')
    const [landmark, setLandmark] = useState('')
    const [district, setDistrict] = useState('')
    const [state, setState] = useState('')
    const [addresstype, setAddresstype] = useState('')
    const [error, setError] = useState(false)


    const [errorPinCode, setErrorPinCode] = useState(false)
    const [errorValidPinCode, setValidErrorPinCode] = useState(false)
    const [postofficearray, setPostOfficeArray] = useState([])

    const getPinCode = async (val) => {
        setErrorPinCode(false)
        setValidErrorPinCode(false)
        setPincode(val)
        if (val.length < 6) {
            setErrorPinCode(true)
            return false
        } else {
            showLoader()
            let pinres = await pincodeapi(val)
            if (pinres.length > 0) {
                hideLoader()
                let arr = pinres[0]
                if (arr.Status == "Success") {
                    setPostOfficeArray(arr.PostOffice)
                }
                if (arr.Status == "Error") {
                    setValidErrorPinCode(true)
                    setPostOfficeArray([])
                }
            } else {
                hideLoader()
                setPostOfficeArray([])
            }
        }
    }

    const getPostOfficeValue = (item) => {
        setState('')
        setDistrict('')
        let temp = [...postofficearray]
        for (let t of temp) {
            if (t.Name == item) {
                setState(t.State)
                setDistrict(t.District)
            }
        }
    }


    const editevent = async () => {
        let err = 0;
        setError(false)
        setErrorPinCode(false)
        setValidErrorPinCode(false)

        if (!name || !phone || !pincode || !postoffice || !locality || !building || !landmark || !district || !state || !addresstype) {
            setError(true)
            err++
        }

        if (pincode && pincode.length < 6) {
            setErrorPinCode(true)
            err++
        }

        if (pincode && pincode.length == 6 && postofficearray.length < 0) {
            setError(true)
            err++
        }

        if (err == 0) {
            showLoader()
            let data = {
                id,
                name,
                phone,
                postoffice,
                locality,
                building,
                landmark,
                district,
                pincode,
                state,
                addresstype,
                editaddress: true
            }
            let response = await shippingaddressapi(data)
            if (response.success) {
                hideLoader()
                cancelevent()
                getModalClose()
                getAddressData()
                onMessage(response.message, true)
            } else {
                hideLoader()
                getAddressData()
                onMessage(response.message, false)
            }
        }
    }

    const getModalClose = () => {
        const elem = document.getElementById('editaddressclsBtn');
        elem.click()
    }

    const cancelevent = async () => {
        setId('')
        setName('')
        setPhone('')
        setPincode('')
        setPostOffice('')
        setLocality('')
        setBuilding('')
        setLandmark('')
        setDistrict('')
        setState('')
        setAddresstype('')
        setError(false)
        setErrorPinCode(false)
        setValidErrorPinCode(false)
        setPostOfficeArray([])
    }

    const getAddressdetailsData = async (item) => {
        showLoader()
        let response = await shippingaddressapi({ id: item._id, mstconsumerid: getLocalStorageData('consumer')?._id, addressdetails: true })
        if (response.success) {
            let { result } = response
            setId(result._id)
            setName(result.name)
            setPhone(result.phone)
            setPincode(result.pincode)
            let pinres = await pincodeapi(result.pincode)
            let arr = pinres[0]
            if (arr.Status == "Success") {
                setPostOfficeArray(arr.PostOffice)
            }
            if (arr.Status == "Error") {
                setValidErrorPinCode(true)
                setPostOfficeArray([])
            }
            setPostOffice(result.postoffice)
            setLocality(result.locality)
            setBuilding(result.building)
            setLandmark(result.landmark)
            let temp = arr.PostOffice
            for (let t of temp) {
                if (t.Name == result.postoffice) {
                    setState(t.State)
                    setDistrict(t.District)
                }
            }
            setAddresstype(result.addresstype)
            hideLoader()
        } else {
            setId('')
            setName('')
            setPhone('')
            setPincode('')
            setPostOffice('')
            setLocality('')
            setBuilding('')
            setLandmark('')
            setDistrict('')
            setState('')
            setAddresstype('')
            hideLoader()
        }
    }


    return (
        <>
            {
                isAddressLoad ?
                    <>
                        {
                            addressarray.length > 0 ?
                                <div className="avl-offr-inr my-copun my-addrs">
                                    {
                                        addressarray && addressarray.map((item, i) => (
                                            <div key={i} className={`avl-offr-inr-div mt-3 ${item.isdefault == "1" ? "active" : ""}`}>
                                                <div className="my-addres">
                                                    <span className={`dflt-adrs ${item.isdefault == "0" ? "hide" : ""}`}>Default</span>
                                                    <div className="sel-addres"><input className="add-check" type="radio" checked={item.isdefault == "1"} onChange={() => { addressdefaultChange(item._id) }} /></div>
                                                    <span className="ad-hm">{item.addresstype}</span>
                                                    <div>
                                                        <strong>{item.name}</strong>
                                                        <p className="m-0">{item.building}, {item.locality}</p>
                                                        <p className="m-0">{item.district}, {item.state}</p>
                                                        <p className="m-0">Pin Code: {item.pincode}</p>
                                                        <p>Contact - Mobile : {item.phone}</p>
                                                        <div className="add-edits">
                                                            <button className="btn btn-edts" data-bs-toggle="modal" data-bs-target="#editaddress" onClick={() => { getAddressdetailsData(item) }}><i className="bi bi-pencil-fill"></i></button>
                                                            <button className="btn btn-dlt" disabled={item.isdefault == "1"} onClick={() => { addressDelete(item._id) }}><i className="bi bi-trash"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                :
                                <div className='addrf-no'>
                                    <Image
                                        src="/assets/img/no-data.png"
                                        width={600}
                                        height={100}
                                        alt='asd'
                                    />
                                </div>
                        }
                    </>
                    :
                    <><AddressListSkeleton /></>
            }
            <div className="modal fade" id="editaddress" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="modal-head">
                                <h3 className="add-addr">EDIT NEW ADDRESS</h3>
                                <button id="editaddressclsBtn" type="button" className="close-button abslt" data-bs-dismiss="modal" aria-label="Close" onClick={() => { cancelevent() }}><i className="bi bi-x-lg"></i></button></div>
                            <div className="addrs-add">
                                <p className="crnt-locn" style={{ display: "flex" }}><Image src={"/assets/img/locn-icne.png"} width={20} height={5} alt='loc' /> <span className='mx-2'> Enter your current location </span></p>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label>Name</label>
                                        <input
                                            className={`form-control ${error && !name ? "error-txt" : ""}`}
                                            type="text"
                                            value={name}
                                            onChange={(e) => { setName(e.target.value) }}
                                        />
                                        {
                                            error && !name && <div className='input-error'>Please enter name</div>
                                        }
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Mobile No.</label>
                                        <input
                                            className={`form-control ${error && !phone ? "error-txt" : ""}`}
                                            type="number"
                                            value={phone}
                                            onChange={(e) => { setPhone(e.target.value) }}
                                        />
                                        {
                                            error && !phone && <div className='input-error'>Please enter mobile no.</div>
                                        }
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Pin Code</label>
                                        <input
                                            className={`form-control ${error && !pincode ? "error-txt" : ""}`}
                                            type="number"
                                            value={pincode}
                                            onChange={(e) => { getPinCode(e.target.value) }}
                                            max={'6'}
                                        />
                                        {
                                            error && !pincode && <div className='input-error'>Please enter pincode</div>
                                        }
                                        {
                                            !error && pincode && errorPinCode && <div className='input-error'>Please enter valid pincode</div>
                                        }
                                        {
                                            !error && pincode && !errorPinCode && errorValidPinCode && <div className='input-error'>No records found!</div>
                                        }
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Post Office</label>
                                        <select
                                            className={`form-select ${error && !postoffice ? "error-txt" : ""}`}
                                            value={postoffice}
                                            onChange={(e) => { setPostOffice(e.target.value); getPostOfficeValue(e.target.value) }}
                                        >
                                            <option value="">Select</option>
                                            {
                                                postofficearray && postofficearray.map((item, i) => (
                                                    <option key={i} value={item.Name}>{item.Name}</option>
                                                ))
                                            }
                                        </select>
                                        {
                                            error && !postoffice && <div className='input-error'>Please select post office</div>
                                        }
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label>Locality / Area / Street</label>
                                        <input
                                            className={`form-control ${error && !locality ? "error-txt" : ""}`}
                                            type="text"
                                            value={locality}
                                            onChange={(e) => { setLocality(e.target.value) }}
                                        />
                                        {
                                            error && !locality && <div className='input-error'>Please enter locality</div>
                                        }
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Flat Number / Building Name</label>
                                        <input
                                            className={`form-control ${error && !building ? "error-txt" : ""}`}
                                            type="text"
                                            value={building}
                                            onChange={(e) => { setBuilding(e.target.value) }}
                                        />
                                        {
                                            error && !building && <div className='input-error'>Please enter building name</div>
                                        }
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Near Landmark</label>
                                        <input
                                            className={`form-control ${error && !landmark ? "error-txt" : ""}`}
                                            type="text"
                                            value={landmark}
                                            onChange={(e) => { setLandmark(e.target.value) }}
                                        />
                                        {
                                            error && !landmark && <div className='input-error'>Please enter land mark</div>
                                        }
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>District</label>
                                        <input
                                            className={`form-control ${error && !district ? "error-txt" : ""}`}
                                            type="text"
                                            value={district}
                                            onChange={(e) => { setDistrict(e.target.value) }}
                                            readOnly={true}
                                        />
                                        {
                                            error && !district && <div className='input-error'>Please enter district name</div>
                                        }
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>State</label>
                                        <input
                                            className={`form-control ${error && !state ? "error-txt" : ""}`}
                                            type="text"
                                            value={state}
                                            onChange={(e) => { setState(e.target.value) }}
                                            readOnly={true}
                                        />
                                        {
                                            error && !state && <div className='input-error'>Please enter state name</div>
                                        }
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Address Type</label>
                                        <div className="addr-typ">
                                            <div className="addr-typ-in"><input type="radio" name="exampleRadios" id="radio1" value='Home' checked={addresstype == 'Home'} onChange={(e) => { setAddresstype(e.target.value) }} /><label htmlFor="radio1">Home </label></div>
                                            <div className="addr-typ-in"><input type="radio" name="exampleRadios" id="radio2" value='Work' checked={addresstype == 'Work'} onChange={(e) => { setAddresstype(e.target.value) }} /><label htmlFor="radio2">Work </label></div>
                                            <div className="addr-typ-in"><input type="radio" name="exampleRadios" id="radio3" value='Other' checked={addresstype == 'Other'} onChange={(e) => { setAddresstype(e.target.value) }} /><label htmlFor="radio3">Other </label></div>
                                        </div>
                                        {
                                            error && !addresstype && <div className='input-error'>Please select address type </div>
                                        }
                                    </div>
                                    <div className="col-md-6 mb-3"></div>

                                    <div className="col-md-6">
                                        <button className="btn btn-cancel" onClick={() => { cancelevent() }}>Cancel</button>
                                    </div>
                                    <div className="col-md-6">

                                        <button className="btn btn-sav" onClick={() => { editevent() }}>Edit</button>
                                    </div>


                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

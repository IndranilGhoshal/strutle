import { pincodeapi, shippingaddressapi } from '@/app/lib/apiService'
import { getLocalStorageData, hideLoader, showLoader } from '@/app/lib/common'
import Image from 'next/image'
import React, { useState } from 'react'

export default function AddAddressModal({addressarray, onMessage}) {

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


    const addevent = async () =>{
        let err = 0;
        setError(false)
        setErrorPinCode(false)
        setValidErrorPinCode(false)

        if (!name || !phone || !pincode || !postoffice || !locality || !building || !landmark || !district|| !state|| !addresstype) {
            setError(true)
            err++
        }

        if(pincode && pincode.length < 6){
            setErrorPinCode(true)
            err++
        }

        if(pincode && pincode.length == 6 && postofficearray.length<0){
            setError(true)
            err++
        }

        if (err == 0) {
            showLoader()
            let data = { 
                mstconsumerid:getLocalStorageData('consumer')?._id,
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
                status:"0", 
                isdefault:addressarray.length>0?"0":"1",
                add: true 
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
                onMessage(response.message,  false)
            }
        }
    }

    const getModalClose = () => {
        const elem = document.getElementById('addaddressclsBtn');
        elem.click()
    }

    const cancelevent = async () =>{
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


    return (
        <>
            <a className='text-blue' data-bs-toggle="modal" data-bs-target="#addaddress">Add New Address</a>
            <div className="modal fade" id="addaddress" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="modal-head">
                                <h3 className="add-addr">ADD NEW ADDRESS</h3>
                                <button id="addaddressclsBtn" type="button" className="close-button abslt" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{cancelevent()}}><i className="bi bi-x-lg"></i></button></div>
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
                                            <div className="addr-typ-in"><input type="radio" name="exampleRadios" id="radio1" value='Home' onChange={(e) => { setAddresstype(e.target.value) }} /><label htmlFor="radio1">Home </label></div>
                                            <div className="addr-typ-in"><input type="radio" name="exampleRadios" id="radio2" value='Work' onChange={(e) => { setAddresstype(e.target.value) }} /><label htmlFor="radio2">Work </label></div>
                                            <div className="addr-typ-in"><input type="radio" name="exampleRadios" id="radio3" value='Other' onChange={(e) => { setAddresstype(e.target.value) }} /><label htmlFor="radio3">Other </label></div>
                                        </div>
                                        {
                                            error && !addresstype && <div className='input-error'>Please select address type </div>
                                        }
                                    </div>
                                    <div className="col-md-6 mb-3"></div>

                                    <div className="col-md-6">
                                        <button className="btn btn-cancel" onClick={()=>{cancelevent()}}>Cancel</button>
                                    </div>
                                    <div className="col-md-6">

                                        <button className="btn btn-sav" onClick={()=>{addevent()}}>Save</button>
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

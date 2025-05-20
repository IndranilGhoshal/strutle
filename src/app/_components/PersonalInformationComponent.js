'use client'
import React, { useEffect, useState } from 'react'
import { getLocalStorageData, hideLoader, removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common'
import { consumeruserapi } from '../lib/apiService'

export default function PersonalInformationComponent({ onMessage, setUser }) {

    useEffect(() => {
        getData()
    }, [])
    const [isLoad, setIsLoad] = useState(false)
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [dateofbirth, setDateOfBirth] = useState('')
    const [gender, setGender] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState(false)
    const mailformat = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$";
    const [validEmailError, setValidEmailError] = useState(false)


    const getData = async () => {
        let response = await consumeruserapi({ id: getLocalStorageData('consumer')?._id, details: true })
        if (response.success) {
            let res = response.result
            setFirstName(res.firstname)
            setLastName(res.lastname)
            setDateOfBirth(res.dateofbirth)
            setGender(res.gender)
            setEmail(res.email)
            setPhone(res.phone)
            setIsLoad(true)
            hideLoader()
        } else {
            setFirstName('')
            setLastName('')
            setDateOfBirth('')
            setGender('')
            setEmail('')
            setPhone('')
            setIsLoad(true)
            hideLoader()
        }
    }



    const addEvent = async () => {
        let err = 0;
        setError(false)
        setValidEmailError(false)


        if (!firstname || !lastname || !dateofbirth || !email || !phone || !gender) {
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
                id: getLocalStorageData('consumer')._id,
                firstname,
                lastname,
                email,
                phone,
                gender,
                dateofbirth,
                edit: true
            }
            let response = await consumeruserapi(data)
            if (response.success) {
                hideLoader()
                const { result } = response;
                setUser(result)
                removeLocalStorageData("consumer")
                delete result.password;
                setLocalStorageData("consumer", result)
                getData()
                onMessage(response.message, true)
            } else {
                hideLoader()
                onMessage(response.message, false)
            }
        }
    }

    return (
        <>
            {
                isLoad ?
                    <>
                        <div className="perso-info-div">
                            <h4>Personal Information</h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                                scrambled it to make a type specimen book.</p>
                            <div className="info-form">
                                <div className="info-form-in">
                                    <div className="info-form-in-top">
                                        <div className="form-group">
                                            <input
                                                className={`form-control ${error && !firstname ? "error-txt" : ""}`}
                                                type="text"
                                                placeholder="First Name"
                                                value={firstname}
                                                onChange={(e) => { setFirstName(e.target.value) }}
                                            />
                                            {
                                                error && !firstname && <div className='input-error'>Please enter first name</div>
                                            }
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className={`form-control ${error && !lastname ? "error-txt" : ""}`}
                                                type="text"
                                                placeholder="Last Name"
                                                value={lastname}
                                                onChange={(e) => { setLastName(e.target.value) }}
                                            />
                                            {
                                                error && !lastname && <div className='input-error'>Please enter last name</div>
                                            }
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className={`form-control ${error && !dateofbirth ? "error-txt" : ""}`}
                                                type="date"
                                                placeholder="DD/MM/YYYY"
                                                value={dateofbirth}
                                                onChange={(e) => { setDateOfBirth(e.target.value) }}
                                            />
                                            {
                                                error && !dateofbirth && <div className='input-error'>Please select date of birth</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="age-group">
                                        <p>Your Gender</p>
                                        <div className="age-group-inr">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="exampleRadios"
                                                    id="exampleRadios1"
                                                    value="0"
                                                    checked={gender == "0"}
                                                    onChange={(e) => { setGender(e.target.value) }}
                                                />
                                                <label className="form-check-label" htmlFor="exampleRadios1">
                                                    Male
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="exampleRadios"
                                                    id="exampleRadios2"
                                                    value="1"
                                                    checked={gender == "1"}
                                                    onChange={(e) => { setGender(e.target.value) }}
                                                />
                                                <label className="form-check-label" htmlFor="exampleRadios2">
                                                    Female
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="exampleRadios"
                                                    id="exampleRadios3"
                                                    value="2"
                                                    checked={gender == "2"}
                                                    onChange={(e) => { setGender(e.target.value) }}
                                                />
                                                <label className="form-check-label" htmlFor="exampleRadios3">
                                                    Others
                                                </label>
                                            </div>
                                        </div>
                                        {
                                            error && !gender && <div className='input-error'>Please select gender</div>
                                        }
                                    </div>
                                    <div className="info-form-in-top info-form-in-email">
                                        <div className="form-group">
                                            <input
                                                className={`form-control ${error && !email ? "error-txt" : ""}${validEmailError && !error && email ? "error-txt" : ""}`}
                                                type="text"
                                                placeholder="Email Address"
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
                                        <div className="form-group">
                                            <input
                                                className={`form-control ${error && !phone ? "error-txt" : ""}`}
                                                type="text"
                                                placeholder="Mobile Number"
                                                value={phone}
                                                onChange={(e) => { setPhone(e.target.value) }}
                                            />
                                            {
                                                error && !phone && <div className='input-error'>Please enter phone no.</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="form-btn">
                                        <button className="btn btn-save" onClick={() => { addEvent() }}>Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <>
                    </>
            }

        </>
    )
}

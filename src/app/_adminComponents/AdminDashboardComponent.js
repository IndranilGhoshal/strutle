'use client'
import React, { useEffect } from 'react'
import { getPassData, hideLoader, setPassData } from '../lib/common'
import { toast, ToastContainer } from 'react-toastify'

export default function AdminDashboardComponent() {
    useEffect(()=>{
        hideLoader()
        if(getPassData()){
            console.log("getPassData()",getPassData());
            toast.success(getPassData())
            setPassData('')
          }
    },[])
    return (
        <>
            <div className="main-das-page">

                <div className="heading mb-3">
                    <h3>Welcome to Dashboard</h3>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

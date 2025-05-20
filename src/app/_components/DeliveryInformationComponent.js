'use client'
import React, { useEffect } from 'react'
import { hideLoader } from '../lib/common'

export default function DeliveryInformationComponent() {
    useEffect(() => {
        hideLoader()
    }, [])
    return (
        <>
            <div className='abt-div-mn'>
                <h3>Delivery Information</h3>
                <p></p>
            </div>
        </>
    )
}

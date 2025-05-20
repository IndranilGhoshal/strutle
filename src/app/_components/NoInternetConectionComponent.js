'use client'
import React, { useEffect } from 'react'
import { hideLoader } from '../lib/common'
import Image from 'next/image'

export default function NoInternetConectionComponent() {
    useEffect(() => {
        hideLoader()
    }, [])
    return (
        <>
            <div className='no-connection'>
                <Image
                    className='no-connection-img mb-3'
                    src={'/assets/img/srutle-logo.png'}
                    width={300}
                    height={100}
                    priority
                    alt='logo'
                />
                <Image className='no-connection-img' src={'/assets/img/noconnection.gif'} width={400} height={250} alt='no connection' />
                <h3>No Internet Connection!</h3>
                <h6>Please Check Your Connection</h6>
            </div>
        </>
    )
}

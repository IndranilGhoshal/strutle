'use client'
import { useEffect } from "react"
import { hideLoader } from "./lib/common"
import Image from "next/image"

export default function NotFound() {
    useEffect(() => {
        hideLoader()
    }, [])
    return (
        <div>
            <div className='no-connection'>
                <Image
                    className='no-connection-img mb-3'
                    src={'/assets/img/srutle-logo.png'}
                    width={300}
                    height={100}
                    priority
                    alt='logo'
                />
                <Image className='no-connection-img' src={'/assets/img/page-not-found.gif'} width={600} height={250} alt='no page found' />
            </div>
        </div>
    )
}

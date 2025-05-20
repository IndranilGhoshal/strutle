'use client'
import React, { useEffect, useState } from 'react'
import { hideLoader, removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common'
import { sellerPrivacyPolicyApi } from '../lib/apiService'
import Image from 'next/image';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import PrivacyPolicySkeleton from './_skeleton/PrivacyPolicySkeleton';

export default function PrivacyPolicyComponent() {
    const router = useRouter();
    const [sellerdata, setSellerData] = useState("");
    const [lastupdate, setlastupdate] = useState("");
    useEffect(() => {
        getsellerdata()
    }, [])

    const getsellerdata = async () => {
        showLoader()
        let data = { usertype: "0", getprivacypolicy: true }
        let response = await sellerPrivacyPolicyApi(data)
        if (response.success) {
            let { result } = response
            hideLoader()
            setSellerData(result.htmlcode)
            setlastupdate(result.updatedAt)
        } else {
            hideLoader()
            setSellerData('')
            setlastupdate('')
        }
    }

    const goto = (path) => {
        showLoader()
        router.push("/seller" + path)
        removeLocalStorageData("pathName")
        setLocalStorageData('pathName', path)
    }

    return (
        <>
            <div className='abt-div-mn'>
                <div className='p-3 cp' onClick={() => {goto('/signup') }}><i className="bi bi-arrow-left-circle"></i> Back</div>
                <div className='abt-div-mn-img'>
                    <Image
                        src={'/assets/img/srutle-logo.png'}
                        width={250}
                        height={100}
                        alt='logo'
                    />
                </div>
                <h3 className='abt-div-mn-h'>Privacy Policy</h3>
                <div className='abt-div-mn-bdy'>
                    {
                        lastupdate && <h5 className='abt-div-mn-h5 my-3'>Last Update {moment(lastupdate).format('ll')}</h5>
                    }
                    {
                        sellerdata ? <div dangerouslySetInnerHTML={{ __html: sellerdata }}></div>
                            :
                            <PrivacyPolicySkeleton />
                    }

                </div>
            </div>
        </>
    )
}

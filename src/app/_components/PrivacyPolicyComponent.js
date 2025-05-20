'use client'
import React, { useEffect, useState } from 'react'
import { hideLoader, showLoader } from '../lib/common'
import { consumerPrivacyPolicyApi } from '../lib/apiService';
import moment from 'moment';
import Image from 'next/image';
import PrivacyPolicySkeleton from './_skeleton/PrivacyPolicySkeleton';

export default function PrivacyPolicyComponent() {
    const [consumerdata, setConsumerData] = useState("");
    const [lastupdate, setlastupdate] = useState("");
    useEffect(() => {
        getconsumerdata()
    }, [])
    const getconsumerdata = async () => {
        showLoader()
        let data = { usertype: "1", getprivacypolicy: true }
        let response = await consumerPrivacyPolicyApi(data)
        if (response.success) {
            let { result } = response
            hideLoader()
            setConsumerData(result.htmlcode)
            setlastupdate(result.updatedAt)
        } else {
            hideLoader()
            setConsumerData('')
            setlastupdate('')
        }
    }
    return (
        <>
            <div className='abt-div-mn'>
                <div className='abt-div-mn-img'>
                    <Image
                        src={'/assets/img/srutle-logo.png'}
                        width={250}
                        height={100}
                        priority
                        alt='logo'
                    />
                </div>
                <h3 className='abt-div-mn-h'>Privacy Policy</h3>
                <div className='abt-div-mn-bdy'>
                    {
                        lastupdate && <h5 className='abt-div-mn-h5 my-3'>Last Update {moment(lastupdate).format('ll')}</h5>
                    }
                    {
                        consumerdata ? <div dangerouslySetInnerHTML={{ __html: consumerdata }}></div> 
                        :
                        <PrivacyPolicySkeleton />
                    }
                    
                </div>
            </div>
        </>
    )
}

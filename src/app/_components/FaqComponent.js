'use client'
import React, { useEffect, useState } from 'react'
import { hideLoader, showLoader } from '../lib/common'
import Image from 'next/image'
import { consumerFaqApi } from '../lib/apiService'
import FaqSkeleton from './_skeleton/FaqSkeleton'

export default function FaqComponent() {
    const [list, setList] = useState(undefined)
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        showLoader()
        let data = { getfaq: true }
        let response = await consumerFaqApi(data)
        if (response.success) {
            hideLoader()
            setList(response.result)
        } else {
            hideLoader()
            setList([])
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
                <h3 className='abt-div-mn-h'>Frequently Asked Questions (FAQ)</h3>
                <div className='abt-div-mn-bdy'>
                    <div className="mt-3">
                        <div className='row mt-2'>
                            {
                                list !== undefined ?
                                    <>
                                        {
                                            list.length > 0 ? list.map((item, i) => (
                                                <div key={i} className='col-sm-12'>
                                                    <div className="accordion" id="accordionExample">
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header">
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapseOne" + i} aria-expanded="true" aria-controls={"collapseOne" + i}>
                                                                    {i + 1 + ". " + item.question}
                                                                </button>
                                                            </h2>
                                                            <div id={"collapseOne" + i} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body faq_accd">
                                                                    <div dangerouslySetInnerHTML={{ __html: item.answer }}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
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
                                    <>
                                        {list == undefined && <FaqSkeleton />}
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

'use client'
import React, { useEffect, useState } from 'react'
import { hideLoader, showLoader } from '../lib/common'
import FAQModal from './_modal/FAQModal'
import { toast, ToastContainer } from 'react-toastify'
import { adminFaqApi } from '../lib/apiService'
import FaqList from './_list/FaqList'

export default function FaqManagementComponent() {

    const [list, setList] = useState(undefined)


    const [limit, setlimit] = useState('10')
    const [offset, setoffset] = useState('0')
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState('')

    const [listlength, setListlength] = useState('0')


    useEffect(() => {
        getData(search, limit, offset)
    }, [search, limit, offset])

    const getData = async (r, l, s) => {
        showLoader()
        let data = { search: r, limit: l, skip: s, faqlist: true }
        let response = await adminFaqApi(data)
        if (response.success) {
            hideLoader()
            setListlength(response.listlength)
            let totalPage = Math.ceil(response.listlength / limit);
            setPage(totalPage);
            setList(response.result)
        } else {
            hideLoader()
            setList([])
            setPage(0)
        }
    }
    const onMessage = async (mes, sus) => {
        if (sus) {
            toast.success(mes)
            getData(search, limit, offset)
        } else {
            toast.error(mes)
            getData(search, limit, offset)
        }
    }
    const handleChangePage = (e, val) => {
        let offeset = (val - 1) * limit;
        setoffset(offeset);
    };
    return (
        <>
        <div className="main-das-page">

            <div className="heading my-3">
                <h3 className='text-blue'>FAQ Management</h3>
                <FAQModal onMessage={onMessage} />
            </div>
            <div className='mt-2'>
                <h5 className='no-of-count'>No. of Count : {listlength}</h5>
            </div>
            <div className="row mt-3">
                <div className="col-md-12 col-sm-12">
                    {
                        <FaqList
                            list={list}
                            limit={limit}
                            setlimit={setlimit}
                            handleChangePage={handleChangePage}
                            page={page}
                            search={search}
                            setSearch={setSearch}
                        />
                    }
                </div>
            </div>
            
        </div>
        <ToastContainer />
        </>
        
    )
}

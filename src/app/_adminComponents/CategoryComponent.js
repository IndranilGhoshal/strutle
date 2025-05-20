'use client'
import React, { useEffect, useState } from 'react'
import { hideLoader, showLoader } from '../lib/common'
import CategoryList from './_list/CategoryList'
import CategoryModal from './_modal/CategoryModal'
import { toast, ToastContainer } from 'react-toastify'
import { categoryApi } from '../lib/apiService'

export default function CategoryComponent() {
    const [list, setList] = useState(undefined)
    const [limit, setlimit] = useState('10')
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState('')
    const [offset, setoffset] = useState('0')

    const [status, setStatus] = useState('')


    const [namesort, setNameSort] = useState('')
    const [createdatsort, setCreatedatSort] = useState('')
    const [listlength, setListlength] = useState('0')


    useEffect(() => {
        getData(search, limit, offset, status, namesort, createdatsort)
    }, [search, limit, offset, status, namesort, createdatsort])

    const onMessage = (mes, upload, sus) => {
        if (sus) {
            toast.success(mes)
            if (!upload) {
                getData(search, limit, offset, status, namesort, createdatsort)
            }
        } else {
            toast.error(mes)
            if (!upload) {
                getData(search, limit, offset, status, namesort, createdatsort)
            }
        }
    }

    const getData = async (r, l, s, sta, n, c) => {
        showLoader()
        let data = { search: r, limit: l, skip: s, status: sta, namesort: n, createdatsort: c, list: true }
        let response = await categoryApi(data)
        if (response.success) {
            hideLoader()
            setListlength(response.listlength)
            let totalPage = Math.ceil(response.listlength / limit);
            setPage(totalPage);
            setList(response.result)
        } else {
            hideLoader()
            setPage(0);
            setList([])
        }
    }

    const onStatus = async (val, id) => {
        let response = await categoryApi({ status: val, id: id, onStatus: true })
        if (response.success) {
            onMessage(response.message, false, true)
        } else {
            onMessage(response.message, false, false)
        }
    }

    const handleChangePage = (e, val) => {
        let offeset = (val - 1) * limit;
        setoffset(offeset);
    };

    const namesortFun = () => {
        if (namesort == "1") {
            setNameSort("-1")
        } else if (namesort == "-1") {
            setNameSort("")
        } else {
            setNameSort("1")
        }
    }

    const createdatsortFun = () => {
        if (createdatsort == "1") {
            setCreatedatSort("-1")
        } else if (createdatsort == "-1") {
            setCreatedatSort("")
        } else {
            setCreatedatSort("1")
        }
    }




    return (
        <>
            <div className="main-das-page">

                <div className="heading my-3">
                    <h3 className='text-blue'>Categories</h3>
                    <CategoryModal onMessage={onMessage} />
                </div>
                <div className='mt-2'>
                    <h5 className='no-of-count'>No. of Count : {listlength}</h5>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12 col-sm-12">
                        {
                            <CategoryList
                                list={list}
                                onStatus={onStatus}
                                limit={limit}
                                setlimit={setlimit}
                                handleChangePage={handleChangePage}
                                page={page}
                                search={search}
                                setSearch={setSearch}
                                status={status}
                                setStatus={setStatus}
                                namesortFun={namesortFun}
                                createdatsortFun={createdatsortFun}
                                onMessage={onMessage}
                            />
                        }
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

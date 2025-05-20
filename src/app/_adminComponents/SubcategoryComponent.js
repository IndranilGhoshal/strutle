'use client'
import React, { useEffect, useState } from 'react'
import { hideLoader, showLoader } from '../lib/common'
import SubCategoryList from './_list/SubCategoryList'
import SubCategoryModal from './_modal/SubCategoryModal'
import { toast, ToastContainer } from 'react-toastify'
import { categoryApi, subcategoryApi } from '../lib/apiService'

export default function SubcategoryComponent() {
    const [list, setList] = useState(undefined)
    const [limit, setlimit] = useState('10')
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState('')
    const [offset, setoffset] = useState('0')

    const [namesort, setNameSort] = useState('')
    const [createdatsort, setCreatedatSort] = useState('')

    const [status, setStatus] = useState('')

    const [categoryFilterList, setCategoryFilterList] = useState([])

    const [mstcategoryid, setMstcategoryid] = useState('');

    const [listlength, setListlength] = useState('0')

    useEffect(() => {
        getData(search, limit, offset, status, namesort, createdatsort, mstcategoryid)
    }, [search, limit, offset, status, namesort, createdatsort, mstcategoryid])

    const onMessage = (mes, upload, sus) => {
        if (sus) {
            toast.success(mes)
            if (!upload) {
                getData(search, limit, offset, status, namesort, createdatsort, mstcategoryid)
            }
        } else {
            toast.error(mes)
            if (!upload) {
                getData(search, limit, offset, status, namesort, createdatsort, mstcategoryid)
            }
        }
    }

    useEffect(() => {
        getCategory()
    }, [])

    const getCategory = async () => {
        let data = { list: true, dropdown: true }
        let response = await categoryApi(data)
        if (response.success) {
            let res = response.result
            setCategoryFilterList(res)
        } else {
            setCategoryFilterList([])
        }
    }

    const getData = async (r, l, s, sta, n, c, cat) => {
        showLoader()
        let data = { search: r, limit: l, skip: s, status: sta, namesort: n, createdatsort: c, category: cat, list: true }
        let response = await subcategoryApi(data)
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
        let response = await subcategoryApi({ status: val, id: id, onStatus: true })
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
                    <h3 className='text-blue'>Sub-Categories</h3>
                    <SubCategoryModal onMessage={onMessage} />
                </div>
                <div className='mt-2'>
                    <h5 className='no-of-count'>No. of Count : {listlength}</h5>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12 col-sm-12">
                        {
                            <SubCategoryList
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
                                categoryFilterList={categoryFilterList}
                                mstcategoryid={mstcategoryid}
                                setMstcategoryid={setMstcategoryid}
                            />
                        }
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

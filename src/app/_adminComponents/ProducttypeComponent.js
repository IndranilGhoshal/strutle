'use client'
import React, { useEffect, useState } from 'react'
import { hideLoader, showLoader } from '../lib/common'
import ProductTypeList from './_list/ProductTypeList'
import ProductTypeModal from './_modal/ProductTypeModal'
import { toast, ToastContainer } from 'react-toastify'
import { categoryApi, producttypeApi, subcategoryApi } from '../lib/apiService'

export default function ProducttypeComponent() {
    const [list, setList] = useState(undefined)
    const [limit, setlimit] = useState('10')
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState('')
    const [offset, setoffset] = useState('0')

    const [namesort, setNameSort] = useState('')
    const [createdatsort, setCreatedatSort] = useState('')

    const [status, setStatus] = useState('')

    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])

    const [category, setCategory] = useState('');
    const [subcategory, setSubCategory] = useState('');

    const [listlength, setListlength] = useState('0')


    useEffect(() => {
        getData(search, limit, offset, status, namesort, createdatsort, category, subcategory)
    }, [search, limit, offset, status, namesort, createdatsort, category, subcategory])

    useEffect(() => {
        getCategory()
    }, [])

    const onMessage = (mes, upload, sus) => {
        if (sus) {
            toast.success(mes)
            if (!upload) {
                getData(search, limit, offset, status, namesort, createdatsort, category, subcategory)
            }
        } else {
            toast.error(mes)
            if (!upload) {
                getData(search, limit, offset, status, namesort, createdatsort, category, subcategory)
            }
        }
    }

    const getData = async (r, l, s, sta, n, c, cat, subcat) => {
        showLoader()
        let data = { search: r, limit: l, skip: s, status: sta, namesort: n, createdatsort: c, category: cat, subcategory: subcat, list: true }
        let response = await producttypeApi(data)
        if (response.success) {
            setListlength(response.listlength)
            hideLoader()
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
        let response = await producttypeApi({ status: val, id: id, onStatus: true })
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

    const getCategory = async () => {
        let data = { list: true, dropdown: true }
        let response = await categoryApi(data)
        if (response.success) {
            let res = response.result
            setCategoryList(res)
        } else {
            setCategoryList([])
        }
    }

    const getSubCategory = async (cid) => {
        showLoader()
        if (cid) {
            let data = { list: true, category: cid, dropdown: true }
            let response = await subcategoryApi(data)
            if (response.success) {
                hideLoader()
                let res = response.result
                setSubCategoryList(res)
            } else {
                hideLoader()
                setSubCategoryList([])
            }
        } else {
            hideLoader()
            setSubCategoryList([])
        }
    }

    return (
        <>
            <div className="main-das-page">
                <div className="heading my-3">
                    <h3 className='text-blue'>Product Types</h3>
                    <ProductTypeModal onMessage={onMessage} />
                </div>
                <div className='mt-2'>
                    <h5 className='no-of-count'>No. of Count : {listlength}</h5>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12 col-sm-12">
                        {
                            <ProductTypeList
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

                                categoryList={categoryList}
                                subCategoryList={subCategoryList}

                                category={category}
                                setCategory={setCategory}
                                subcategory={subcategory}
                                setSubCategory={setSubCategory}

                                getSubCategory={getSubCategory}

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

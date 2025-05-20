'use client'
import React, { useEffect, useState } from 'react'
import { hideLoader, showLoader } from '../lib/common'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ProductList from './_list/ProductList';
import { adminCatelogApi } from '../lib/apiService';
import { toast, ToastContainer } from 'react-toastify';

export default function ProductManagementComponent() {
    const [list, setlist] = useState(undefined)


    const [limit, setlimit] = useState('10')
    const [offset, setoffset] = useState('0')
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState('')

    const [listlength, setListlength] = useState('0')

    const [status, setStatus] = useState('3')

    useEffect(() => {
        getData(search, limit, offset, status)
    }, [search, limit, offset, status])

    const getData = async (r, l, s, sta) => {
        showLoader()
        let data = { search: r, limit: l, skip: s, status: sta, cateloglist: true }
        let response = await adminCatelogApi(data)
        if (response.success) {
            hideLoader()
            setListlength(response.listlength)
            let totalPage = Math.ceil(response.listlength / limit);
            setPage(totalPage);
            setlist(response.result)
        } else {
            hideLoader()
            setlist([])
            setPage(0)
        }
    }

    const handleChangePage = (e, val) => {
        let offeset = (val - 1) * limit;
        setoffset(offeset);
    };

    const handleSelect = (key) => {
        if (key == 0) {
            setStatus("0")
        } else if (key == 1) {
            setStatus("1")
        } else if (key == 3) {
            setStatus("3")
        }
    }

    const onStatus = async (val, id) => {
        let response = await adminCatelogApi({ status: val, id: id, onStatus: true })
        if (response.success) {
            onMessage(response.message, true)
        } else {
            onMessage(response.message, false)
        }
    }

    const onMessage = async (mes, sus) => {
        if (sus) {
          toast.success(mes)
          getData(search, limit, offset, status)
        } else {
          toast.error(mes)
          getData(search, limit, offset, status)
        }
      }

    return (
        <div className="main-das-page">
            <div className="heading mb-3">
                <h3 className='text-blue'>Product Management</h3>
            </div>
            <div className='my-3'>
                <Tabs
                    defaultActiveKey={3} onSelect={(e) => { handleSelect(e) }}
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey={3} title="Pending">
                        <ProductList
                            list={list}
                            limit={limit}
                            setlimit={setlimit}
                            handleChangePage={handleChangePage}
                            page={page}
                            search={search}
                            setSearch={setSearch}
                            onStatus={onStatus}
                        />
                    </Tab>
                    <Tab eventKey={0} title="Active">
                        <ProductList
                            list={list}
                            limit={limit}
                            setlimit={setlimit}
                            handleChangePage={handleChangePage}
                            page={page}
                            search={search}
                            setSearch={setSearch}
                            onStatus={onStatus}
                        />
                    </Tab>
                    <Tab eventKey={1} title="Inactive">
                        <ProductList
                            list={list}
                            limit={limit}
                            setlimit={setlimit}
                            handleChangePage={handleChangePage}
                            page={page}
                            search={search}
                            setSearch={setSearch}
                            onStatus={onStatus}
                        />
                    </Tab>
                </Tabs>
            </div>
            <ToastContainer />
        </div>
    )
}

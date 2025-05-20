'use client'
import React, { useEffect, useState } from 'react'
import { getLocalStorageData, hideLoader, removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common'
import { useRouter } from 'next/navigation';
import { catelogcategoryapi } from '../lib/apiService';
import CatelogList from './_list/CatelogList';

export default function CatelogsComponent() {
  const router = useRouter();
  const [list, setlist] = useState(undefined)
  const [search, setSearch] = useState('')
  const [limit, setlimit] = useState('10')
  const [offset, setoffset] = useState('0')
  const [page, setPage] = useState(0)
  const [listlength, setListlength] = useState(0)

  useEffect(() => {
    getdata(limit, offset, search)
  }, [limit, offset, search])

  const goto = (path) => {
    showLoader()
    router.push("/seller/account" + path)
    removeLocalStorageData("pathName")
    setLocalStorageData('pathName', path)
  }

  const getdata = async (l, o, s) => {
    let data = { limit: l, skip: o, search: s,mstsellerid: getLocalStorageData('seller')._id, cateloglist: true }
    let response = await catelogcategoryapi(data)
    if (response.success) {
      let res = response.result
      setListlength(response.listlength)
      let totalPage = Math.ceil(response.listlength / limit);
      setPage(totalPage);
      setlist(res)
      hideLoader()
    } else {
      setlist([])
      hideLoader()
    }
  }

  const handleChangePage = (e, val) => {
    let offeset = (val - 1) * limit;
    setoffset(offeset);
  };


  return (
    <div className="main-das-page">
      <div className="heading my-3">
        <h3 className='text-blue'><i className='bi bi-box-seam'></i> Catelogs</h3>
        <div>
          <button className="btn down_btn">Product Bulk Import</button>
          <button className="btn down_btn mx-2" onClick={() => { goto('/addsinglecatelog') }}>Add Single Product</button>
        </div>
      </div>
      <div className='mt-2'>
        <h5 className='no-of-count'>No. of Count : {listlength}</h5>
      </div>
      <div className="row mt-3">
        <div className="col-md-12 col-sm-12">
          {
            <CatelogList
              list={list}
              limit={limit}
              setlimit={setlimit}
              handleChangePage={handleChangePage}
              page={page}
              search={search}
              setSearch={setSearch}
              goto={goto}
            />
          }
        </div>
      </div>
    </div>
  )
}

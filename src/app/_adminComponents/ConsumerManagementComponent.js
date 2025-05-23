'use client'
import React, { useEffect, useState } from 'react'
import { hideLoader, showLoader } from '../lib/common'
import ConsumerList from './_list/ConsumerList'
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { consumerApi } from '../lib/apiService';

export default function ConsumerManagementComponent() {
  const router = useRouter();


  const [list, setList] = useState(undefined)

  const [limit, setlimit] = useState('10')
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [offset, setoffset] = useState('0')

  const [status, setStatus] = useState('')

  const [namesort, setNameSort] = useState('')
  const [emailsort, setEmailSort] = useState('')
  const [createdatsort, setCreatedatSort] = useState('')

  const [listlength, setListlength] = useState('0')

  useEffect(() => {
    getData(search, limit, offset, status, namesort, emailsort, createdatsort)
  }, [limit, offset, search, status, namesort, emailsort, createdatsort])

  const onMessage = (mes, sus) => {
    if (sus) {
      toast.success(mes)
      getData(search, limit, offset, status, namesort, emailsort, createdatsort)
    } else {
      toast.error(mes)
      getData(search, limit, offset, status, namesort, emailsort, createdatsort)
    }
  }

  const getData = async (r, l, s, sta, n, e, c) => {
    showLoader()
    let data = { search: r, limit: l, skip: s, status: sta, namesort: n, emailsort: e, createdatsort: c, list: true }
    let response = await consumerApi(data)
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
    let response = await consumerApi({ status: val, id: id, onStatus: true })
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

  const goto = (path) => {
    showLoader()
    router.push("/admin/account" + path)
    removeLocalStorageData("pathName")
    setLocalStorageData('pathName', path)
  }

  const namesortFun = () => {
    if (namesort == "1") {
      setNameSort("-1")
    } else if (namesort == "-1") {
      setNameSort("")
    } else {
      setNameSort("1")
    }
  }

  const emailsortFun = () => {
    if (emailsort == "1") {
      setEmailSort("-1")
    } else if (emailsort == "-1") {
      setEmailSort("")
    } else {
      setEmailSort("1")
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
          <h3 className='text-blue'>Consemer Management</h3>
        </div>
        <div className='mt-2'>
          <h5 className='no-of-count'>No. of Count : {listlength}</h5>
        </div>
        <div className="row mt-3">
          <div className="col-md-12 col-sm-12">
            {
              <ConsumerList
                list={list}
                onStatus={onStatus}
                limit={limit}
                setlimit={setlimit}
                handleChangePage={handleChangePage}
                page={page}
                search={search}
                setSearch={setSearch}
                status={status}
                onMessage={onMessage}
                goto={goto}
                namesortFun={namesortFun}
                emailsortFun={emailsortFun}
                createdatsortFun={createdatsortFun}
                setStatus={setStatus}
              />
            }
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

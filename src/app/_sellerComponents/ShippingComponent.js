'use client'
import React, { useEffect, useState } from 'react'
import { getLocalStorageData, hideLoader, showLoader } from '../lib/common'
import { useRouter } from 'next/navigation';
import { sellershippingapi } from '../lib/apiService';
import { toast, ToastContainer } from 'react-toastify';
import ShippingList from './_list/ShippingList';

export default function ShippingComponent() {
  const router = useRouter();
  const [list, setList] = useState([])
  const [limit, setlimit] = useState('10')
  const [offset, setoffset] = useState('0')
  const [page, setPage] = useState(0)
  const [listlength, setListlength] = useState('0')
  const [search, setSearch] = useState('')
  const [btntab, setbtntab] = useState('shipped')

  useEffect(() => {
    if (!getLocalStorageData("seller")) {
      router.push("/seller");
    } else {
      router.push("/seller/account/shipping");
    }
  }, [])

  useEffect(() => {
    getData(limit, offset, search, btntab)
  }, [limit, offset, search, btntab])


  const getData = async (l, s, r, os) => {
    showLoader()
    let data = { search: r, limit: l, skip: s, orderstatus: os, list: true }
    let response = await sellershippingapi(data)
    if (response.success) {
      hideLoader()
      setListlength(response.listlength)
      let totalPage = Math.ceil(response.listlength / limit);
      setPage(totalPage);
      setList(response.result)
    } else {
      hideLoader()
      setListlength('0')
      setList([])
      setPage('0')
    }
  }

  const handleChangePage = (e, val) => {
    let offeset = (val - 1) * limit;
    setoffset(offeset);
  };

  const onStatus = async (id, val) => {
    let response = await sellershippingapi({ orderproductid: id, orderstatus: val, onstatus: true })
    if (response.success) {
      onMessage(response.message, true)
    } else {
      onMessage(response.message, false)
    }
  }

  const onMessage = async (mes, sus) => {
    if (sus) {
      toast.success(mes)
      getData(limit, offset, search, btntab)
    } else {
      toast.error(mes)
      getData(limit, offset, search, btntab)
    }
  }


  return (
    <>
      <div className="main-das-page">

        <div className="heading mb-3">
          <h3>Welcome to Shipping</h3>
        </div>

        <div className='mt-3'>
          <button className={`btn down_btn ${btntab == "shipped" ? "atc-btn" : ""}`} onClick={() => { setbtntab("shipped") }}>Shipped</button>
          <button className={`btn down_btn mx-2 ${btntab == "readytopickup" ? "atc-btn" : ""}`} onClick={() => { setbtntab("readytopickup") }}>Ready To Pickup</button>
          <button className={`btn down_btn ${btntab == "pickup" ? "atc-btn" : ""}`} onClick={() => { setbtntab("pickup") }}>Pick Up</button>
        </div>

        <div className="row mt-3">
          <div className="col-md-12 col-sm-12">
            {
              list && <ShippingList
                list={list}
                limit={limit}
                setlimit={setlimit}
                page={page}
                handleChangePage={handleChangePage}
                setSearch={setSearch}
                search={search}
                listlength={listlength}
                onStatus={onStatus}
                btntab={btntab}
              />
            }
          </div>
        </div>

      </div>
      <ToastContainer />
    </>
  )
}

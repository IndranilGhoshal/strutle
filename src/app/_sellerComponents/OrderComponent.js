'use client'
import React, { useEffect, useState } from 'react'
import { getLocalStorageData, hideLoader, showLoader } from '../lib/common'
import OrderList from './_list/OrderList'
import { useRouter } from 'next/navigation';
import { orderapi, sellerorderapi } from '../lib/apiService';
import { toast, ToastContainer } from 'react-toastify';

export default function OrderComponent() {
  const router = useRouter();

  const [list, setList] = useState([])

  const [limit, setlimit] = useState('10')
  const [offset, setoffset] = useState('0')
  const [page, setPage] = useState(0)

  const [listlength, setListlength] = useState('0')

  const [search, setSearch] = useState('')

  const [btntab, setbtntab] = useState('pending')

  const [productlist, setProductlist] = useState([])
  const [totalamount, settotalamount] = useState('')
  const [ordernumber, setordernumber] = useState('')
  const [orderdate, setorderdate] = useState('')
  const [consumeraddress, setconsumeraddress] = useState({})

  useEffect(() => {
    if (!getLocalStorageData("seller")) {
      router.push("/seller");
    } else {
      router.push("/seller/account/order");
    }
  }, [])

  useEffect(() => {
    getData(limit, offset, search, btntab)
  }, [limit, offset, search, btntab])

  const getData = async (l, s, r, os) => {
    showLoader()
    let data = { search: r, limit: l, skip: s, orderstatus: os, list: true }
    let response = await sellerorderapi(data)
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

  const handleChangePage = (e, val) => {
    let offeset = (val - 1) * limit;
    setoffset(offeset);
  };

  const onStatus = async (id, val) => {
    let response = await sellerorderapi({ orderproductid: id, orderstatus: val, onstatus: true })
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

  const getInvoice = async (id, cid) => {
    showLoader()
    let data = { id: id, mstconsumerid: cid, invioce: true }
    let response = await orderapi(data)
    if (response.success) {
      let { result } = response
      setProductlist(result.product)
      settotalamount(result.totalamount)
      setconsumeraddress(result.consumeraddress)
      setorderdate(result.orderdate)
      setordernumber(result._id)
      hideLoader()
    } else {
      setProductlist([])
      settotalamount(0)
      setconsumeraddress({})
      setorderdate('')
      setordernumber('')
      hideLoader()
    }
  }

  return (
    <div className="main-das-page">

      <div className="heading mb-3">
        <h3>Welcome to Order</h3>
      </div>

      <div className='mt-3'>
        <button className={`btn down_btn ${btntab == "pending" ? "atc-btn" : ""}`} onClick={() => { setbtntab("pending") }}>Pending</button>
        <button className={`btn down_btn mx-2 ${btntab == "readytoship" ? "atc-btn" : ""}`} onClick={() => { setbtntab("readytoship") }}>Ready To Ship</button>
        <button className={`btn down_btn ${btntab == "shipped" ? "atc-btn" : ""}`} onClick={() => { setbtntab("shipped") }}>Shipped</button>
      </div>

      <div className="row mt-3">
        <div className="col-md-12 col-sm-12">
          {
            list && <OrderList
              list={list}
              limit={limit}
              setlimit={setlimit}
              offset={offset}
              page={page}
              handleChangePage={handleChangePage}
              setSearch={setSearch}
              search={search}
              listlength={listlength}
              onStatus={onStatus}
              btntab={btntab}

              getInvoice={getInvoice}
              productlist={productlist}
              totalamount={totalamount}
              ordernumber={ordernumber}
              orderdate={orderdate}
              consumeraddress={consumeraddress}
            />
          }
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}

'use client'
import React, { useEffect, useState } from 'react'
import { hideLoader, removeLocalStorageData, setLocalStorageData } from '../lib/common'
import ProductConfigurationList from './_list/ProductConfigurationList'
import ProductConfigrationModal from './_modal/ProductConfigrationModal'
import { producttypeApi } from '../lib/apiService'
import { toast, ToastContainer } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function ProductConfigarationComponent({ id }) {
  const router = useRouter();
  const [list, setList] = useState([])

  const [category, setCategory] = useState('')
  const [subcategory, setSubCategory] = useState('')
  const [producttype, setProductType] = useState('')



  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    let data = { id: id, configurationlist: true }
    let response = await producttypeApi(data)
    if (response.success) {
      hideLoader()
      setCategory(response.category)
      setSubCategory(response.subcategory)
      setProductType(response.producttype)
      let temp = response.result
      let o = []
      for (let t of temp) {
        let obj = {
          "check":false,
          "_id": t._id,
          "mstproducttypeid": t.mstproducttypeid,
          "fieldname": t.fieldname,
          "ismandatory": t.ismandatory,
          "isfilter": t.isfilter,
          "fieldinputtype": t.fieldinputtype,
          "maxvalue": t.maxvalue,
          "maxfile": t.maxfile,
          "status": t.status,
          "valueList": t.valueList,
          "createdAt": t.createdAt,
          "updatedAt": t.updatedAt,
          "__v": t.__v
        }
        o.push(obj)
      }
      setList(o)
    } else {
      hideLoader()
      setList([])
    }
  }

  const onStatus = async (val, id) => {
    let response = await producttypeApi({ status: val, id: id, onConfigurationStatus: true })
    if (response.success) {
      onMessage(response.message, true)
    } else {
      onMessage(response.message, false)
    }
  }

  const onMessage = (mes, sus) => {
    if (sus) {
      toast.success(mes)
      getData()
    } else {
      toast.error(mes)
      getData()
    }
  }

  const goto = (path) => {
    router.push("/admin/account" + path)
    removeLocalStorageData("pathName")
    setLocalStorageData('pathName', path)
  }


  const [copy, setCopy] = useState(false)

  const getCopyArray = (index) => {
    setCopy(false)
    let temp = [...list]
    let o = []
    for(let [i,t] of temp.entries()){
      if(i==index){
        if(t.check){
          t.check = false
        }else{
          t.check = true
        }
      }
      o.push(t)
    }
    setList(o)
    for(let b of o){
      if(b.check){
        setCopy(true)
      }
    }
  }

  const gettCopy = () =>{
    let temp = [...list]
    let o = []
    for(let [i,t] of temp.entries()){
      if(t.check){
        o.push(t)
      }
    }

    console.log("o",o);

  }



  return (
    <>
      <div className="main-das-page">
        <div className="heading my-3">
          <h3>Product Type Configuration </h3>
          <div>
            {copy && <button className="btn down_btn" onClick={()=>{gettCopy()}}><i className="bi bi-copy"></i>  Copy</button>}
            <button className="btn down_btn mx-2"><i className="bi bi-clipboard"></i> Paste</button>
            <ProductConfigrationModal onMessage={onMessage} id={id} />
          </div>
        </div>
        <div className='my-4'>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a onClick={() => { goto('/producttype') }}>Product Type</a></li>
              <li className="breadcrumb-item active" aria-current="page">Product Type Configuration</li>
            </ol>
          </nav>
        </div>
        <div className='my-3'>
          <h5>{category && "Category :- "+category+","} {subcategory && "Sub-Category :- "+subcategory+","} {producttype && "Product Type :- "+producttype} </h5>
        </div>
        <ProductConfigurationList list={list} onStatus={onStatus} onMessage={onMessage} getCopyArray={getCopyArray} />
      </div>
      <ToastContainer />
    </>
  )
}

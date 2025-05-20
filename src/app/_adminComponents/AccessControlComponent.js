'use client'
import React, { useEffect, useState } from 'react'
import RoleModal from './_modal/RoleModal'
import { getLocalStorageData, hideLoader, removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import RoleList from './_list/RoleList';
import { adminAddRoleApi, adminMenuApi, menuApi } from '../lib/apiService';
import Image from 'next/image';

export default function AccessControlComponent() {
  const router = useRouter();

  const [role, setRole] = useState(undefined)
  

  const [limit, setlimit] = useState('10')
  const [offset, setoffset] = useState('0')
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')

  const [status, setStatus] = useState('')
  const [type, setType] = useState('')

  const [namesort, setNameSort] = useState('')
  const [createdatsort, setCreatedatSort] = useState('')

  const [listlength, setListlength] = useState('0')


  useEffect(() => {
    if (getLocalStorageData("admin") === null) {
      router.push("/admin");
    } else {
      router.push("/admin/account/accesscontrol");
    }
  }, [])


  useEffect(() => {
    getRoles(search, limit, offset, type, status, namesort, createdatsort)
  }, [limit, offset, search, type, status, namesort, createdatsort])



  const onMessage = async (mes, sus) => {
    if (sus) {
      toast.success(mes)
      getRoles(search, limit, offset, type, status, namesort, createdatsort)
    } else {
      toast.error(mes)
      getRoles(search, limit, offset, type, status, namesort, createdatsort)
    }
  }

  const getRoles = async (r, l, s, t, sta, n, c) => {
    showLoader()
    let data = { search: r, limit: l, skip: s, type: t, status: sta, namesort:n, createdatsort:c, list: true }
    let response = await adminAddRoleApi(data)
    if (response.success) {
      hideLoader()
      setListlength(response.listlength)
      let totalPage = Math.ceil(response.listlength / limit);
      setPage(totalPage);
      setRole(response.result)
    } else {
      hideLoader()
      setRole([])
      setPage(0)
    }
  }

  const onEdit = async (data) => {
    let temp = [...role]
    for (let r of temp) {
      if (r._id == data._id) {
        r.isEdit = true
      } else {
        r.isEdit = false
      }
    }
    setRole(temp)
    let response = await adminMenuApi({ mstRolesId: data._id, onEdit: true })
    if (response.success) {
      setMenu(response.result)
    } else {
      setMenu(response.result)
    }
  }

  const onStatus = async (val, id) => {
    let response = await adminAddRoleApi({ status: val, id: id, onStatus: true })
    if (response.success) {
      onMessage(response.message, true)
    } else {
      onMessage(response.message, false)
    }
  }

  const handleChangePage = (e, val) => {
    let offeset = (val - 1) * limit;
    setoffset(offeset);
  };

  const namesortFun = () =>{
    if(namesort=="1"){
      setNameSort("-1")
    }else if(namesort=="-1"){
      setNameSort("")
    }else{
      setNameSort("1")
    }
  }

  const createdatsortFun = () =>{
    if(createdatsort=="1"){
      setCreatedatSort("-1")
    }else if(createdatsort=="-1"){
      setCreatedatSort("")
    }else{
      setCreatedatSort("1")
    }
  }

  const goto = (path) =>{
    router.push("/admin/account"+path)
    removeLocalStorageData("pathName")
    setLocalStorageData('pathName',path)
  }

  return (
    <>
      <div className="main-das-page">
        <div className="heading my-3">
          <h3 className='text-blue'>Access Control</h3>
          <RoleModal add={true} edit={false} onMessage={onMessage} />
        </div>
        <div className='mt-2'>
          <h5 className='no-of-count'>No. of Count : {listlength}</h5>
        </div>
        <div className="row mt-3">
          <div className="col-md-12 col-sm-12">
            {
              <RoleList
                role={role}
                onEdit={onEdit}
                onStatus={onStatus}
                limit={limit}
                setlimit={setlimit}
                handleChangePage={handleChangePage}
                page={page}
                search={search}
                setSearch={setSearch}
                status={status}
                type={type}
                setStatus={setStatus}
                setType={setType}
                onMessage={onMessage}
                namesortFun={namesortFun}
                createdatsortFun={createdatsortFun}
                goto={goto}
              />
            }
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

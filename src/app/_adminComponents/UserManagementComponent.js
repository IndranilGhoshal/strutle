'use client'
import React, { useEffect, useState } from 'react'
import UserModal from './_modal/UserModal'
import { ToastContainer, toast } from 'react-toastify';
import UserList from './_list/UserList';
import { adminAddAdminApi, adminAddRoleApi } from '../lib/apiService';
import { hideLoader, removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common';
import { useRouter } from 'next/navigation';

export default function UserManagementComponent() {

  const router = useRouter();


  const [user, setUser] = useState(undefined)

  const [limit, setlimit] = useState('10')
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [offset, setoffset] = useState('0')

  const [status, setStatus] = useState('')
  const [role, setRole] = useState('')
  const [roles, setRoles] = useState([])

  const [namesort, setNameSort] = useState('')
  const [emailsort, setEmailSort] = useState('')
  const [createdatsort, setCreatedatSort] = useState('')

  const [listlength, setListlength] = useState('0')

  useEffect(() => {
    getUser(search, limit, offset, role, status, namesort, emailsort, createdatsort)
  }, [limit, offset, search, role, status, namesort, emailsort, createdatsort])


  useEffect(() => {
    getRoles()
  }, [])

  const getRoles = async () => {
    let data = { list: true, dropdown:true}
    let response = await adminAddRoleApi(data)
    if (response.success) {
      let res = response.result
      setRoles(res)
    } else {
      setRoles([])
    }
  }



  const onMessage = (mes, upload, sus) => {
    if (sus) {
      toast.success(mes)
      if(!upload){
        getUser(search, limit, offset, role, status, namesort, emailsort, createdatsort)
      }
    } else {
      toast.error(mes)
      if(!upload){
        getUser(search, limit, offset, role, status, namesort, emailsort, createdatsort)
      }
    }
  }

  const getUser = async (r, l, s, t, sta, n, e, c) => {
    showLoader()
    let data = { search: r, limit: l, skip: s, role: t, status: sta, namesort:n, emailsort:e, createdatsort:c, list: true }
    let response = await adminAddAdminApi(data)
    if (response.success) {
      hideLoader()
      setListlength(response.listlength)
      let totalPage = Math.ceil(response.listlength / limit);
      setPage(totalPage);
      setUser(response.result)
    } else {
      hideLoader()
      setPage(0);
      setUser([])
    }
  }

  const onStatus = async (val, id) => {
    let response = await adminAddAdminApi({ status: val, id: id, onStatus: true })
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

  const goto = (path) =>{
    showLoader()
    router.push("/admin/account"+path)
    removeLocalStorageData("pathName")
    setLocalStorageData('pathName',path)
  }

  const namesortFun = () =>{
    if(namesort=="1"){
      setNameSort("-1")
    }else if(namesort=="-1"){
      setNameSort("")
    }else{
      setNameSort("1")
    }
  }

  const emailsortFun = () =>{
    if(emailsort=="1"){
      setEmailSort("-1")
    }else if(emailsort=="-1"){
      setEmailSort("")
    }else{
      setEmailSort("1")
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

  


  return (
    <>
      <div className="main-das-page">
        <div className="heading my-3">
          <h3 className='text-blue'>User Management</h3>
          <UserModal onMessage={onMessage} />
        </div>
        <div className='mt-2'>
          <h5 className='no-of-count'>No. of Count : {listlength}</h5>
        </div>
        <div className="row mt-3">
          <div className="col-md-12 col-sm-12">
            {
              <UserList
                user={user}
                onStatus={onStatus}
                limit={limit}
                setlimit={setlimit}
                handleChangePage={handleChangePage}
                page={page}
                search={search}
                setSearch={setSearch}
                status={status}
                role={role}
                setStatus={setStatus}
                rolesArr={roles}
                setRole={setRole}
                onMessage={onMessage}
                goto={goto}
                namesortFun={namesortFun}
                emailsortFun={emailsortFun}
                createdatsortFun={createdatsortFun}
              />
            }
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

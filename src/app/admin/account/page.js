'use client'
import { getLocalStorageData } from '@/app/lib/common'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'


export default function page() {
    const router = useRouter();
    useEffect(()=>{
    if(!getLocalStorageData('admin')?._id){
      router.push("/admin");
    }else{
      let getPath = getLocalStorageData('pathName')
      if(getPath){
        router.push("/admin/account"+getPath)
      }
    }
    },[])
  return (
    <>
    <div>Loading</div>
    </>
  )
}

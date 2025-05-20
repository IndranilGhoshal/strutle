'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getLocalStorageData, showLoader } from "./lib/common";

export default function Home() {
  const router = useRouter()
  
  useEffect(() => {
    showLoader()
    if (getLocalStorageData('admin')?._id) {
      let pathName = getLocalStorageData('pathName')
      if (pathName) {
        router.push('/admin/account' + pathName)
      } else {
        router.push('/admin/account')
      }
    } else if (getLocalStorageData('seller')?._id) {
      let pathName = getLocalStorageData('pathName')
      if (pathName) {
        router.push('/seller/account' + pathName)
      } else {
        router.push('/seller/account')
      }
    } else {
      router.push('/consumer')
    }
  }, [])
  return (
    <>
      
    </>
  )
}

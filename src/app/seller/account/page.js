'use client'
import { getLocalStorageData } from '@/app/lib/common';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function page() {
  const router = useRouter();
  useEffect(() => {
    if (!getLocalStorageData('seller')?._id) {
      router.push("/seller");
    } else {
      let getPath = getLocalStorageData('pathName')
      if (getPath) {
        router.push("/seller/account" + getPath)
      }
    }
  }, [])
  return (
    <>
      <div>Loading</div>
    </>
  )
}

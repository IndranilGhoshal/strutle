'use client'
import React, { createContext, useEffect, useState } from 'react'
import HeaderComponent from '../_components/HeaderComponent'
import FooterComponent from '../_components/FooterComponent'
import { getLocalStorageData } from '../lib/common';
import { useRouter } from 'next/navigation';
import { cartapi } from '../lib/apiService';

// Create a new context and export
export const AppContext = createContext();

export default function layout({ children }) {
  const [userImage, setUserImage] = useState(undefined);
  const [cartCount, setCartCount] = useState(0);

  const router = useRouter()
  useEffect(() => {
    let getPath = getLocalStorageData('pathName')
    if (getPath) {
      router.push("/consumer" + getPath)
    }
    let user = getLocalStorageData('consumer')
    if (user && user?.image) {
      getcartdata()
      setUserImage(user.image)
    }
  }, [])

  const getcartdata = async () => {
    let response = await cartapi({ mstconsumerid: getLocalStorageData('consumer')?._id, cartcount: true })
    if (response.success) {
      setCartCount(response.result)
    } else {
      setCartCount(0)
    }
  }


  return (
    <>
      <AppContext.Provider value={{ userImage, setUserImage, cartCount, setCartCount }}>
        <HeaderComponent />
        <div id="consumerid" className="main">
          {children}
        </div>
        <FooterComponent />
      </AppContext.Provider>
    </>
  )
}

'use client'
import React, { createContext, useEffect, useState } from 'react'
import HeaderComponent from '../_components/HeaderComponent'
import FooterComponent from '../_components/FooterComponent'
import { getConnection, getLocalStorageData, internetconnectionflag } from '../lib/common';
import { useRouter } from 'next/navigation';
import { cartapi, shippingaddressapi } from '../lib/apiService';
import NoInternetConectionComponent from '../_components/NoInternetConectionComponent';
import useNetworkStatus from '../lib/useNetworkStatus';

// Create a new context and export
export const AppContext = createContext();

export default function layout({ children }) {
  const [userImage, setUserImage] = useState(undefined);
  const [cartCount, setCartCount] = useState(0);
  const [deliveryaddress, setDeliveryAddress] = useState('');
  const [pincodeaddress, setPincodeAddress] = useState('');
  const [username, setusername] = useState('');

  const { isOnline } = useNetworkStatus();

  const router = useRouter()
  useEffect(() => {
    let getPath = getLocalStorageData('pathName')
    if (getPath) {
      if(getPath == '/seller'){
        router.push(getPath)
      }else{
        router.push("/consumer" + getPath)
      }
    }
    let user = getLocalStorageData('consumer')
    if (user && user?.image) {
      getcartdata()
      getdeliverydata()
      setUserImage(user.image)
      setusername(user.firstname)
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

  const getdeliverydata = async () => {
    let response = await shippingaddressapi({ mstconsumerid: getLocalStorageData('consumer')?._id, addresslist: true })
    if (response.success) {
      let { result } = response;
      for (let r of result) {
        if (r.isdefault == "1") {
          setPincodeAddress(r.pincode)
          setDeliveryAddress(r.district)
        }
      }
    } else {
      setPincodeAddress('')
      setDeliveryAddress('')
    }
  }


  return (
    <>
      {
        isOnline ?
          <AppContext.Provider 
          value={{ 
            userImage, 
            setUserImage, 
            cartCount, 
            setCartCount, 
            deliveryaddress, 
            setDeliveryAddress, 
            pincodeaddress, 
            setPincodeAddress, 
            username,
            setusername
            }}>
            <HeaderComponent />
            <div id="consumerid" className="main">
              {children}
            </div>
            <FooterComponent />
          </AppContext.Provider>
          :
          <NoInternetConectionComponent />
      }
    </>
  )
}

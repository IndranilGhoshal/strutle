

'use client'
import React, { createContext, useEffect, useState } from 'react'
import useNetworkStatus from '../lib/useNetworkStatus';
import NoInternetConectionComponent from '../_components/NoInternetConectionComponent';

export const AppSellerContext = createContext();

export default function layout({ children }) {
    const { isOnline } = useNetworkStatus();
    return (
        <>
        {
                isOnline ?
                  <AppSellerContext.Provider 
                  value={{}}>
                        {
                        children
                        }
                  </AppSellerContext.Provider>
                  :
                  <NoInternetConectionComponent />
              }
        </>
    )
}
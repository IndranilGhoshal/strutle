

'use client'
import React, { createContext, useEffect, useState } from 'react'
import useNetworkStatus from '../lib/useNetworkStatus';
import NoInternetConectionComponent from '../_components/NoInternetConectionComponent';

export const AppAdminContext = createContext();

export default function layout({ children }) {
    const { isOnline } = useNetworkStatus();
    return (
        <>
        {
                isOnline ?
                  <AppAdminContext.Provider 
                  value={{}}>
                        {
                        children
                        }
                  </AppAdminContext.Provider>
                  :
                  <NoInternetConectionComponent />
              }
        </>
    )
}
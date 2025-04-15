'use client'
import React, { useEffect } from 'react'
import { hideLoader } from '../lib/common'

export default function ActivityLogsComponent() {
  useEffect(()=>{
    hideLoader()
  },[])
  return (
    <div>ActivityLogsComponent</div>
  )
}

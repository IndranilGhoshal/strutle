import { Skeleton } from '@mui/material'
import React from 'react'

export default function MenuSkeleton() {
  return (
    <>
    <ul className='px-2'>
        <li><Skeleton width="100%" height={60} /></li>
        <li><Skeleton width="100%" height={60} /></li>
        <li><Skeleton width="100%" height={60} /></li>
        <li><Skeleton width="100%" height={60} /></li>
        <li><Skeleton width="100%" height={60} /></li>
        <li><Skeleton width="100%" height={60} /></li>
        <li><Skeleton width="100%" height={60} /></li>
        <li><Skeleton width="100%" height={60} /></li>
        <li><Skeleton width="100%" height={60} /></li>
        <li><Skeleton width="100%" height={60} /></li>
        <li><Skeleton width="100%" height={60} /></li>
    </ul>
    </>
  )
}

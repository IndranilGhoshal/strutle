import { Skeleton } from '@mui/material'
import React from 'react'

export default function TermsconditionsSkeleton() {
  return (
    <div>
        <Skeleton width="15%" height={50} />
        <Skeleton variant="rectangular" width="100%" height={500} />
    </div>
  )
}

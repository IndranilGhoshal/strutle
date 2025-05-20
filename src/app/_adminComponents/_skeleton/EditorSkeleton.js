import { Skeleton } from '@mui/material'
import React from 'react'

export default function EditorSkeleton() {
  return (
    <div>
        <Skeleton variant="rectangular" width="100%" height={200} />
        <Skeleton width="10%" height={50} />
    </div>
  )
}

import { Skeleton } from '@mui/material'
import React from 'react'

export default function AddressListSkeleton() {
    return (
        <>
            <div className="avl-offr-inr my-copun my-addrs">
                <div className={`avl-offr-inr-div p-0`}>
                    <Skeleton variant="rectangular" width="100%" height={220} />
                </div>
                <div className={`avl-offr-inr-div p-0`}>
                    <Skeleton variant="rectangular" width="100%" height={220} />
                </div>
                <div className={`avl-offr-inr-div p-0`}>
                    <Skeleton variant="rectangular" width="100%" height={220} />
                </div>
            </div>
        </>
    )
}

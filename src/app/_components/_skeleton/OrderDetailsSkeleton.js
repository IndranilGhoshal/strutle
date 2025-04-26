import { Skeleton } from '@mui/material'
import React from 'react'

export default function OrderDetailsSkeleton() {
    return (
        <>
            <div className="bred-cm">
                <Skeleton width="25%" height={40} />
            </div>
            <div className="order-details padding">
                <div className="order-details-hed">
                    <Skeleton width="10%" height={40} />
                </div>
                <div className='ord-sk-d'>
                    <div className="details-top-lft p-0" style={{ border: "0" }}>
                        <Skeleton variant="rectangular" width="100%" height={200} />
                    </div>
                    <div className="details-top-rit p-0" style={{ border: "0" }}>
                        <Skeleton variant="rectangular" width="100%" height={200} />
                    </div>
                </div>
                <div className="order-details-btn-sec mt-2">
                    <div>
                        <Skeleton variant="rectangular" width="100%" height={220} />
                    </div>
                    <div className='mt-3'>
                        <Skeleton variant="rectangular" width="100%" height={220} />
                    </div>
                </div>
            </div>
        </>
    )
}

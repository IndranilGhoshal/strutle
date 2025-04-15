import { Skeleton } from '@mui/material'
import React from 'react'

export default function OrderListSkeleton() {
    return (
        <>
            <div className="ord-div">
                <div className="ordr-src">
                    <div className="ordr-src-lft">
                        <Skeleton width="100%" height={60} />
                    </div>
                    <div className="ordr-src-lft">
                        <Skeleton width="100%" height={60} />
                    </div>
                </div>
                <div className="order-lists mt-3">
                    <div className="ord-lst-indv">
                        <Skeleton variant="rectangular" width="100%" height={250} />
                    </div>
                    <div className="ord-lst-indv">
                        <Skeleton variant="rectangular" width="100%" height={250} />
                    </div>
                </div>
            </div>
        </>
    )
}

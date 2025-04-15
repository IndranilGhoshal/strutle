import React from 'react'
import Skeleton from '@mui/material/Skeleton';
export default function ProductSkeleton() {
    return (
        <>
            <div className="bred-cm">
                <div><Skeleton width="30%" height={40} /></div>
            </div>
            <div className="product-detail mb-3">
                <div className="product-detail-left">
                    <Skeleton variant="rectangular" width="100%" height={420} />
                </div>
                <div className="product-detail-right">
                    <Skeleton variant="rectangular" width="100%" height={840} />
                </div>
            </div>
        </>
    )
}

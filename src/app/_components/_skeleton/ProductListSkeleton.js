'use client'
import React from 'react'
import Skeleton from '@mui/material/Skeleton';
export default function ProductListSkeleton({listname}) {
    return (
        <>
            <h4 className="mb-3">{listname}</h4>
            <div className="product-grid-skl">
                <div className="product-grid-skl-prd">
                    <div>
                        <Skeleton variant="rectangular" width={210} height={180} />
                    </div>
                    <div>
                        <Skeleton width="30%" />
                    </div>
                    <div>
                        <Skeleton width="50%" />
                    </div>
                    <div>
                        <Skeleton width="100%" />
                    </div>
                </div>
                <div className="product-grid-skl-prd">
                    <div>
                        <Skeleton variant="rectangular" width={210} height={180} />
                    </div>
                    <div>
                        <Skeleton width="30%" />
                    </div>
                    <div>
                        <Skeleton width="50%" />
                    </div>
                    <div>
                        <Skeleton width="100%" />
                    </div>
                </div>
                <div className="product-grid-skl-prd">
                    <div>
                        <Skeleton variant="rectangular" width={210} height={180} />
                    </div>
                    <div>
                        <Skeleton width="30%" />
                    </div>
                    <div>
                        <Skeleton width="50%" />
                    </div>
                    <div>
                        <Skeleton width="100%" />
                    </div>
                </div>
                <div className="product-grid-skl-prd">
                    <div>
                        <Skeleton variant="rectangular" width={210} height={180} />
                    </div>
                    <div>
                        <Skeleton width="30%" />
                    </div>
                    <div>
                        <Skeleton width="50%" />
                    </div>
                    <div>
                        <Skeleton width="100%" />
                    </div>
                </div>
                <div className="product-grid-skl-prd">
                    <div>
                        <Skeleton variant="rectangular" width={210} height={180} />
                    </div>
                    <div>
                        <Skeleton width="30%" />
                    </div>
                    <div>
                        <Skeleton width="50%" />
                    </div>
                    <div>
                        <Skeleton width="100%" />
                    </div>
                </div>
            </div>

        </>
    )
}

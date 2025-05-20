import React from 'react'
import Skeleton from '@mui/material/Skeleton';
export default function ProductSkeleton() {
    return (
        <>
            <div className="bred-cm">
                <div><Skeleton width="50%" height={50} /></div>
            </div>
            <div className="product-detail mb-3">
                <div className="product-detail-left">
                    <div className='row'>
                        <div className='col-sm-3'>
                            <div className='row'>
                                <div className='col-sm-12'>
                                    <Skeleton variant="rectangular" width="100%" height={100} />
                                </div>
                                <div className='col-sm-12 mt-3'>
                                    <Skeleton variant="rectangular" width="100%" height={100} />
                                </div>
                                <div className='col-sm-12 mt-3'>
                                    <Skeleton variant="rectangular" width="100%" height={100} />
                                </div>
                                <div className='col-sm-12 mt-3'>
                                    <Skeleton variant="rectangular" width="100%" height={100} />
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-3'>
                            <Skeleton variant="rectangular" width="360%" height={450} />
                        </div>
                    </div>
                </div>
                <div className="product-detail-right">
                    <div className='row'>
                        <div className='col-sm-12'>
                            <Skeleton variant="rectangular" width="100%" height={80} />
                        </div>
                        <div className='col-sm-12 mt-3'>
                            <Skeleton variant="rectangular" width="100%" height={100} />
                        </div>
                        <div className='col-sm-12 mt-3'>
                            <Skeleton variant="rectangular" width="100%" height={840} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

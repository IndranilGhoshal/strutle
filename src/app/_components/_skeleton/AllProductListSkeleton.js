import React from 'react'
import Skeleton from '@mui/material/Skeleton';
export default function AllProductListSkeleton() {
    return (
        <>
            <div className="row mt-4 mx-3 d-flex justify-content-between">
                <div className='col-sm-3'><Skeleton width="140%" height={50} /></div>
                <div className='col-sm-3'>
                    <Skeleton width="100%" height={50} />
                </div>
            </div>
            <div className="row mt-3 mx-3 d-flex">
                <div className='col-sm-3'><Skeleton width="100%" height={50} /></div>
            </div>

            <div className="row my-3 mx-3 d-flex">
                <div className='col-sm-3'><Skeleton variant="rectangular" width="100%" height={620} /></div>
                <div className='col-sm-9'>
                    <div className="row d-flex">
                        <div className='col-sm-3'>
                            <Skeleton variant="rectangular" width="100%" height={250} />
                        </div>
                        <div className='col-sm-3'>
                            <Skeleton variant="rectangular" width="100%" height={250} />
                        </div>
                        <div className='col-sm-3'>
                            <Skeleton variant="rectangular" width="100%" height={250} />
                        </div>
                        <div className='col-sm-3'>
                            <Skeleton variant="rectangular" width="100%" height={250} />
                        </div>
                        <div className='col-sm-3 mt-3'>
                            <Skeleton variant="rectangular" width="100%" height={250} />
                        </div>
                        <div className='col-sm-3 mt-3'>
                            <Skeleton variant="rectangular" width="100%" height={250} />
                        </div>
                        <div className='col-sm-3 mt-3'>
                            <Skeleton variant="rectangular" width="100%" height={250} />
                        </div>
                        <div className='col-sm-3 mt-3'>
                            <Skeleton variant="rectangular" width="100%" height={250} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

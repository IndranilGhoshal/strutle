'use client'
import React, { useState } from 'react'
import UsePagination from './UsePagination'
import Image from 'next/image';
import { Rating } from 'react-simple-star-rating';
import { opneQuickViewProductModal } from '../lib/common';
import ProductQuickViewModal from './_modal/ProductQuickViewModal';

export default function FavouriteComponent({ handleChangeFavouriteDataPage, favouriteList, pagefavouriteList, goto, resetid, productid, setProductId, addTofavoruite }) {
    
    return (
        <>
            <h4 className="mb-3">My Favourites</h4>
            <div className="product-grid myfavr">
                {/* Product list */}
                {
                    favouriteList.length > 0 ?
                        <>
                            {favouriteList.map((item, i) => (
                                <div key={i} className="fade-in category-item">
                                    <div className="fade-in category-item-img">
                                        {
                                            item.discount > 0 ? <span className="spn-offr">{item.discount}% Off</span> : <></>
                                        }
                                        <button className="btn ntn-favr" onClick={() => { addTofavoruite(item) }}><i className="bi bi-heart-fill"></i></button>
                                        <button className="btn ntn-view" onClick={() => { opneQuickViewProductModal(); setProductId(item._id) }}><i className="bi bi-eye"></i></button>
                                        <Image
                                            src={"/upload/" + item.image}
                                            alt="Fashion"
                                            width={300}
                                            height={100}
                                            onClick={() => { goto('/product/' + item._id) }}
                                        />
                                    </div>
                                    <div className="fade-in prod-dtls">
                                        <p className='prod-txt-wp' onClick={() => { goto('/product/' + item._id) }}>{item.name}</p>
                                        <div className="ratings">
                                            <Rating initialValue={item.averate} readonly={true} size={20} />
                                            <strong style={{ marginTop: "3px" }}>({item.rateingcount})</strong>
                                        </div>
                                        {
                                            item.productquantity > 0 ?
                                                <>
                                                    <strong>₹{item.netmrp}</strong>
                                                    {
                                                        item.discount > 0 ? <span className='prdls-mrp'>MRP <del>₹{item.productmrp}</del></span> : <></>
                                                    }
                                                </>
                                                :
                                                <strong className='unbprdo'>Currently Unavailable</strong>
                                        }

                                    </div>
                                </div>
                            ))}
                        </>
                        :
                        <div style={{ margin: 'auto' }}>
                            <Image
                                src="/assets/img/no-data.png"
                                width={600}
                                height={100}
                                alt='asd'
                            />
                        </div>
                }
            </div>
            <div className="pagin">
                <UsePagination handleChangePage={handleChangeFavouriteDataPage} page={pagefavouriteList} />
            </div>
            <ProductQuickViewModal id={productid} resetid={resetid} />
        </>
    )
}

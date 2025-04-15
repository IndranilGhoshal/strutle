import moment from 'moment'
import Image from 'next/image'
import React from 'react'
import UsePagination from './UsePagination'
import InvoiceModal from './_modal/InvoiceModal'

export default function OrderComponent({ handleChangeOrderDataPage, orderList, pageorderList, goto, orderSearch, setorderSearch }) {
    return (
        <>
            <div className="ord-div">
                <div className="ordr-src">
                    <div className="ordr-src-lft">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Orders..."
                            value={orderSearch}
                            onChange={(e) => { setorderSearch(e.target.value) }}
                        />
                        <button className="btn btn-src-icn"><i className="bi bi-search"></i></button>
                    </div>
                    <div className="ordr-src-rit">
                        <select className="form-select">
                            <option>Last 6 months</option>
                            <option>Last 12 months</option>
                            <option>Last 18 months</option>
                        </select>
                    </div>
                </div>
                <div className="order-lists">
                    {
                        orderList.length > 0 ?
                            <>
                                {
                                    orderList.map((item, i) => (
                                        <div key={i} className="ord-lst-indv">
                                            <div className="ord-lst">
                                                <div className="ord-lst-top">
                                                    <ul>
                                                        <li><strong>Order ID</strong>
                                                            <span>{item._id}</span>
                                                        </li>
                                                        <li><strong>Ship To</strong>
                                                            <span>{item.consumer}</span>
                                                        </li>
                                                        <li><strong>Order Type</strong>
                                                            <span>{item.ordertype}</span>
                                                        </li>
                                                        <li><strong>Payment Status</strong>
                                                            <span>{item.paymentstatus}</span>
                                                        </li>
                                                        <li><strong>Order Date</strong>
                                                            <span>{moment(item.orderdate).format('LL')}</span>
                                                        </li>
                                                        <li><strong>Invoice</strong>
                                                            <InvoiceModal />
                                                        </li>
                                                    </ul>
                                                    <div className="totl-pay">
                                                        <span>Paid Amount</span>
                                                        <strong>₹{item.orderamount}</strong>
                                                    </div>
                                                </div>
                                                {
                                                    item.product.map((obj, ind) => (
                                                        <div key={ind}>
                                                            <div className="ord-lst-mid">
                                                                <div className="ord-lst-pro">
                                                                    <span className="ord-lst-pic">
                                                                        <Image
                                                                            src={'/upload/' + obj.productimage}
                                                                            width={100}
                                                                            height={100}
                                                                            alt='logo'
                                                                        />
                                                                    </span>
                                                                    <div className="ord-lst-txt">
                                                                        <h4 className='name-txt-wp'>{obj.productname}</h4>
                                                                        <p className='des-txt-wp'>{obj.producttitledescription}</p>
                                                                        <div className="colr-siz">
                                                                            <p><span>Color :</span> {obj.color}</p>
                                                                            <p><span>Quantity :</span> {obj.quantity}</p>
                                                                        </div>
                                                                        <strong className="dlvred">Delivered on {moment(obj.deliveryat).format('LL')}</strong>
                                                                    </div>
                                                                </div>
                                                                {
                                                                    ind == "0" ?
                                                                        <div className="ord-lst-btn"><button className="btn btn-viw-ordr" onClick={()=>{goto('/orderdetails')}}>View Order</button></div> :
                                                                        <></>
                                                                }

                                                            </div>
                                                            <div className="ord-lst-bot">
                                                                <ul>
                                                                    <li><a href="">Rate & Review Product</a></li>
                                                                    <li><a href="">Help & Support</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    ))
                                                }

                                            </div>
                                        </div>
                                    ))
                                }
                            </>
                            :
                            <div className='addrf-no'>
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
                    <UsePagination handleChangePage={handleChangeOrderDataPage} page={pageorderList} />
                </div>
            </div>

        </>
    )
}

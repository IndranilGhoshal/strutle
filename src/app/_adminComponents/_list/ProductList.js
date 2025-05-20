import React from 'react'
import UsePagination from '../UsePagination'
import ProductListSkeleton from '../_skeleton/ProductListSkeleton'
import { getNameFirstLetter } from '@/app/lib/common'
import moment from 'moment'
import Image from 'next/image'

export default function ProductList({ list, limit, setlimit, handleChangePage, page, search, setSearch, onStatus }) {
    return (
        <>
            <div className="mastr_hw">
                <div className="assects_src_dv position-relative">
                    <label>Search</label>
                    <input
                        type="text"
                        className="form-control"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value) }}
                        placeholder='Search by product name'
                    /><button className="btn no-bg"><i className="bi bi-search"></i></button>
                </div>
            </div>
            <div className="bg-white shadow_d rounded-3">
                <div className="mast_hw_tab">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr role="row">
                                    <th align="left">Sl. No.</th>
                                    <th align="left">Name</th>
                                    <th align="left">MRP</th>
                                    <th align="left">Quantity</th>
                                    <th align="left">Created at</th>
                                    <th align="left">Status</th>
                                    <th align="left">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    list !== undefined ?
                                        <>
                                            {
                                                list.length > 0 ? list.map((item, i) => (
                                                    <tr role="row" key={i}>
                                                        <td style={{ textAlign: "left" }} align="left">{i + 1}</td>
                                                        <td align="left" className='lst-td'>
                                                            <span className='photo-clr lst'>
                                                                {
                                                                    item.image ?
                                                                        <>
                                                                            <Image
                                                                                src={"/upload/" + item.image}
                                                                                width={100}
                                                                                height={100}
                                                                                alt='asd'
                                                                            />
                                                                        </>
                                                                        :
                                                                        <>
                                                                            {
                                                                                getNameFirstLetter(item.productname)
                                                                            }
                                                                        </>
                                                                }
                                                            </span>
                                                            {item.productname}
                                                        </td>
                                                        <td align="left">{item.productmrp}</td>
                                                        <td align="left">{item.productquantity}</td>
                                                        <td align="left">{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                                        <td align="left">
                                                            <span className={`${item.status == "0" && "text-success"} ${item.status == "1" && "text-danger"} ${item.status == "3" && "text-warning"}`}>
                                                                {item.status == "0" && "Active"}
                                                                {item.status == "1" && "Inactive"}
                                                                {item.status == "3" && "Pending"}
                                                            </span>
                                                            <button
                                                                className={`btn btn-dwn p-0 dropdown-toggle ${item.status == "3" && "border-0"}`}
                                                                data-bs-toggle="dropdown"
                                                                aria-expanded="false"
                                                            >
                                                                <i className="bi bi-chevron-down"></i></button>

                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                {item.status == "0" && <a className="dropdown-item text-danger" onClick={() => { onStatus("1", item._id) }}>Inactive</a>}
                                                                {item.status == "1" && <a className="dropdown-item text-success" onClick={() => { onStatus("0", item._id) }}>Active</a>}
                                                                {item.status == "3" && <a className="dropdown-item text-success" onClick={() => { onStatus("0", item._id) }}>Active</a>}
                                                            </div>
                                                        </td>
                                                        <td align="left">
                                                            <button className="btn btn-dwn p-0 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></button>
                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                <div className="filter-lists">
                                                                    <div className='edtbtn'>
                                                                        <button>
                                                                            <i className="bi bi-box-seam mx-2"></i> View Product
                                                                        </button>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                ))
                                                    :
                                                    <tr className='no-data' >
                                                        <td colSpan={7} >
                                                            <Image
                                                                src="/assets/img/no-data.png"
                                                                width={500}
                                                                height={100}
                                                                alt='asd'
                                                            />
                                                        </td>
                                                    </tr>
                                            }
                                        </>
                                        :
                                        <>
                                            {list == undefined && <ProductListSkeleton />}
                                        </>
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="paginati">
                        <div className="paginati_l">


                            <div className="dataTables_length d-flex align-items-center" id="datatables-reponsive_length">
                                <label>View </label>
                                <select
                                    name="datatables-reponsive_length"
                                    aria-controls="datatables-reponsive"
                                    className="form-select form-select-sm"
                                    value={limit}
                                    onChange={(e) => { setlimit(e.target.value) }}
                                >
                                    {
                                        limit && ["10", "15", "30", "50", "100"].map((item, i) => (
                                            <option key={i} value={item}>{item}</option>
                                        ))
                                    }
                                </select>
                                <span>{list && list.length} product{list && list.length > 1 ? "s" : ""} <strong>per page</strong></span>

                            </div>

                        </div>
                        <div className="paginati_r">
                            <UsePagination handleChangePage={handleChangePage} page={page} />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

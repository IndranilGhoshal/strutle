import React from 'react'
import UsePagination from '../UsePagination'
import Image from 'next/image'
import moment from 'moment'

export default function ShippingList({
    list,
    limit,
    setlimit,
    page,
    handleChangePage,
    search,
    setSearch,
    listlength,
    onStatus,
    btntab,
}) {
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
                        placeholder='Search by order'
                    /><button className="btn no-bg"><i className="bi bi-search"></i></button>
                </div>
                <div className="assects_src_dvadd">
                    <button className="btn btn-dwn p-0 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Filter List <i className="bi bi-sliders"></i></button>
                    <div className="dropdown-menu dropdown-menu-end">
                        <div className="filter-lists">
                            <label>Filter by Status</label>
                            <select
                                className="form-select"
                            >
                                <option value="">Select Status</option>
                                <option value="0">Active</option>
                                <option value="1">Inactive</option>
                            </select>
                        </div>

                    </div>

                </div>
            </div>
            <div><h6 className='mx-2'>No. of Count :- {listlength}</h6></div>
            <div className="bg-white shadow_d rounded-3">

                <div className="mast_hw_tab">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr role="row">
                                    <th align="left">Sl. No.</th>
                                    <th align="left">Order Id </th>
                                    <th align="left">Product Name</th>
                                    <th align="left">Created at</th>
                                    <th align="left">&nbsp;</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    list.length > 0 ? list.map((item, i) => (
                                        <tr role="row" key={i}>
                                            <td style={{ textAlign: "left" }} align="left">{i + 1}</td>
                                            <td align="left">{item.orderid}</td>
                                            <td align="left"><p className='txt-wp'>{item.productname}</p></td>
                                            <td align="left">{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>

                                            <td align="left">
                                                <button className="btn btn-dwn p-0 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></button>
                                                <div className="dropdown-menu dropdown-menu-end">
                                                    <div className="filter-lists">
                                                        <div className='edtbtn'>
                                                            {
                                                                btntab == "shipped" &&
                                                                <button onClick={() => { onStatus(item._id, "readytopickup") }}><i className="bi bi-truck"></i>&nbsp;&nbsp;Ready To Pick Up</button>
                                                            }
                                                            {
                                                                btntab == "readytopickup" &&
                                                                <button onClick={() => { onStatus(item._id, "pickup") }}><i className="bi bi-truck"></i>&nbsp;&nbsp;Pick Up</button>
                                                            }
                                                            {
                                                                btntab == "pickup" &&
                                                                <><button><i className="bi bi-truck"></i>&nbsp;&nbsp;Shipping Details</button></>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                    ))
                                        :
                                        <tr className='no-data' >
                                            <td colSpan={6} >
                                                <Image
                                                    src={"/assets/img/no-data.png"}
                                                    width={500}
                                                    height={100}
                                                    alt='asd'
                                                />
                                            </td>
                                        </tr>
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
                                <span>{list.length} shipping{list.length > 1 ? "s" : ""} <strong>per page</strong></span>

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

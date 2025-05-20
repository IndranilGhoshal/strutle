import React from 'react'
import UsePagination from '../UsePagination'
import Image from 'next/image'
import FaqSkeleton from '../_skeleton/FaqSkeleton'

export default function FaqList({ list, limit, setlimit, handleChangePage, page, search, setSearch }) {
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
                        placeholder='Search by faq questions'
                    /><button className="btn no-bg"><i className="bi bi-search"></i></button>
                </div>
            </div>
            <div className="bg-white shadow_d rounded-3">

                <div className="mast_hw_tab">
                    <div className="mt-3">
                        <div className='row mt-2'>
                            {
                                list !== undefined ?
                                    <>
                                        {
                                            list.length > 0 ? list.map((item, i) => (
                                                <div key={i} className='col-sm-12'>
                                                    <div className="accordion" id="accordionExample">
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header">
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapseOne"+i} aria-expanded="true" aria-controls={"collapseOne"+i}>
                                                                    {i+1+". "+item.question}
                                                                </button>
                                                            </h2>
                                                            <div id={"collapseOne"+i} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body faq_accd">
                                                                   <div dangerouslySetInnerHTML={{ __html: item.answer }}></div> 
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
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
                                    </>
                                    :
                                    <>
                                        {list == undefined && <FaqSkeleton />}
                                    </>
                            }
                        </div>
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
                                <span>{list && list.length} faq{list && list.length > 1 ? "s" : ""} <strong>per page</strong></span>

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

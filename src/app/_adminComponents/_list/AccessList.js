import React from 'react'

export default function AccessList({ menu, OnToggeleEdit, OnToggeleView }) {
    return (
        <>

            <div className="bg-white shadow_d rounded-3 me-3 ms-0 acces_rit">
                <div className="acces_tabl">
                    <div className="acces_tabl_top d-flex justify-content-between align-items-center">
                        <div className="acc_hed">Modules</div>
                        <div className="acc_hed">Can view</div>
                        <div className="acc_hed">Can Edit</div>
                    </div>
                    <div className="acces_tabl_blo mCustomScrollbar smootScrol">
                        {
                            menu && menu.map((item, i) => (
                                <div key={i} className="acc_list_out">
                                    <div className="acc_list">{item.menuName}</div>
                                    <div className="acc_list"><div className="appr_dive">
                                        <label className="switch">
                                            <input type="checkbox" checked={item.isView == 1} onChange={()=>{OnToggeleView(i, item._id, item.isView == 0?1:0, item.isEdit)}}  />
                                            <small></small>
                                        </label>
                                    </div></div>
                                    <div className="acc_list"><div className="appr_dive">
                                        <label className="switch">
                                            <input type="checkbox" checked={item.isEdit == 1} onChange={()=>{OnToggeleEdit(i, item._id, item.isView, item.isEdit == 0?1:0)}}/>
                                            <small></small>
                                        </label>
                                    </div></div>
                                </div>
                            ))
                        }

                    </div>
                </div>

            </div>
        </>
    )
}

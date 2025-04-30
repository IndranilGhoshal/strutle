'use client'
import { AppContext } from '@/app/consumer/layout';
import { shippingaddressapi } from '@/app/lib/apiService';
import { getLocalStorageData, hideLoader, opneLoginModal, showLoader } from '@/app/lib/common';
import React, { useContext, useState } from 'react'
import Modal from 'react-bootstrap/Modal';

export default function DeliveyAddressModal({ setDeliveryAddress, setPincodeAddress, goto }) {
    const { deliveryaddress, pincodeaddress } = useContext(AppContext);
    const [show, setShow] = useState(false);
    const [list, setList] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        hideLoader()
        setShow(true)
    };
    const checkuser = () => {
        if (!getLocalStorageData('consumer')?._id) {
            opneLoginModal()
        } else {
            getdeliverydata()
        }
    }
    const getdeliverydata = async () => {
        showLoader()
        let response = await shippingaddressapi({ mstconsumerid: getLocalStorageData('consumer')?._id, addresslist: true })
        if (response.success) {
            let { result } = response;
            setList(result)
            handleShow()
        } else {
            setList([])
            hideLoader()
        }
    }
    const addressdefaultChange = async (aid) => {
        showLoader()
        let response = await shippingaddressapi({ id: aid, mstconsumerid: getLocalStorageData('consumer')?._id, isdefault: "1", ondefault: true })
        if (response.success) {
            let res = await shippingaddressapi({ mstconsumerid: getLocalStorageData('consumer')?._id, addresslist: true })
            if (res.result.length > 0) {
                for (let r of res.result) {
                    if (r.isdefault == "1") {
                        setPincodeAddress(r.pincode)
                        setDeliveryAddress(r.district)
                    }
                }
            }
            handleClose()
            hideLoader()
        } else {
            hideLoader()
        }
    }
    return (
        <>
            <div className="deliv-addrs cp" onClick={() => { checkuser() }}>
                <i className="bi bi-geo-alt"></i>
                <div className="deliv-addrs-txts">
                    <strong>Delivery to {getLocalStorageData('consumer') ? getLocalStorageData('consumer')?.firstname : <></>}</strong>
                    {
                        deliveryaddress ? <p>{deliveryaddress} {pincodeaddress}</p> : <p>Enter your location</p>
                    }
                </div>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body style={{ padding: '10px' }}>
                    <div className="modal-head">
                        <h3 className="add-addr">Choose your location</h3>
                        <button id="addaddressclsBtn" type="button" className="close-button abslt" data-bs-dismiss="modal" aria-label="Close" onClick={() => { handleClose() }}><i className="bi bi-x-lg"></i></button>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12 txt-ha1">
                                Select a delivery location to see product availability and delivery options
                            </div>
                        </div>
                        <div className="row mt-3">
                            {
                                list.length > 0 && list.map((item, i) => (
                                    <div key={i} className={`col-sm-12 add-ld-lt cp ${item.isdefault == "1" ? "active" : ""}`} onClick={() => { addressdefaultChange(item._id) }}>
                                        <div className='txt'>{item.name} <span className='txt-ty'>{item.addresstype}</span></div>
                                        <div className='txt-ad'>{item.locality}, {item.building}</div>
                                        <div className='txt-ad'>{item.district}, {item.state} - {item.pincode}</div>
                                        <div className='txt-def'>{item.isdefault == "1" && "Default Address"}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="col-sm-12 txt-ha1-lk cp" onClick={() => {goto('/myaccount?tab=manage-addrs-tab'); handleClose()}}>
                            Add an address or pick-up point
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

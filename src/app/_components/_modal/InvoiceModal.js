
import moment from 'moment'
import Image from 'next/image'
import React, { useState } from 'react'

export default function InvoiceModal({ productid, product, seller, getInvoice, id, totalamount, consumeraddress, orderdate, ordernumber }) {

    return (
        <>
            <button className="btn btn-rtn-exc mx-2 mb-2" onClick={() => { getInvoice(id, productid) }} data-bs-toggle="modal" data-bs-target="#downloadinvoice">Download Invoice</button>

            <div className="modal fade" id="downloadinvoice" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button id="successorderbtncls" type="button" className="close-button abslt" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg"></i></button>
                            <div className="invoice">
                                <div className="invoice-top">
                                    <Image src={"/assets/img/srutle-logo.png"} width={300} height={100} alt="Logo" />
                                    <div className="invoice-top-right">
                                        <p><strong>Invoice Date:</strong>{moment(orderdate).format('LL')}<br />
                                            <strong>Order Number:</strong> {ordernumber}
                                        </p>
                                    </div>
                                </div>
                                <div className="invoice-details">
                                    {
                                        seller.map((item, i) => (
                                            <div key={i} className="box">
                                                <h4>Sold By</h4>
                                                <strong>{item.businessname}</strong>
                                                <p>
                                                {item.city}, {item.state} - {item.pin}<br />
                                                    PAN No: {item.panno}<br />
                                                    GST Reg No: {item.gstinno}</p>
                                            </div>
                                        ))
                                    }
                                    <div className="box box-rit">
                                        <div className="box-innr">
                                            <h4>Billed Address</h4>
                                            <strong>{consumeraddress.consumer}</strong>
                                            <p>{consumeraddress.locality + ", " + consumeraddress.building}</p>
                                            <p>{consumeraddress.district + ", " + consumeraddress.state + "-" + consumeraddress.pincode}</p>
                                            <p>{consumeraddress.phone}</p>
                                        </div>

                                        <div className="box-innr">
                                            <h4>Shipping Address</h4>
                                            <strong>{consumeraddress.consumer}</strong>
                                            <p>{consumeraddress.locality + ", " + consumeraddress.building}</p>
                                            <p>{consumeraddress.district + ", " + consumeraddress.state + "-" + consumeraddress.pincode}</p>
                                            <p>{consumeraddress.phone}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="invoice-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Sl.No</th>
                                                <th>Description</th>
                                                <th>Unit Price</th>
                                                <th>Quantity</th>
                                                <th>Discount Amount</th>
                                                <th>Net Amount</th>
                                                <th>Tax Rate</th>
                                                <th>Tax Type</th>
                                                <th>Total Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                product.length > 0 && product.map((item, i) => (
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{item.productname}</td>
                                                        <td>₹{item.productmrp}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>₹{item.productdiscount}</td>
                                                        <td>₹{item.productnetamount}</td>
                                                        <td>18%</td>
                                                        <td>CGST</td>
                                                        <td>{item.productnetamount}</td>
                                                    </tr>
                                                ))
                                            }
                                            <tr>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td><strong>Total:</strong></td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td><strong>₹{totalamount}</strong></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p>&nbsp;</p>
                                <p>&nbsp;</p>
                                <p>&nbsp;</p>
                                <div className="invoice-footer-text">
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                        industry's standard dummy text ever since the <br />1500s, when an unknown printer took a galley of type and
                                        scrambled it to make a type specimen book.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

import moment from 'moment'
import Image from 'next/image'
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';

export default function DownloadInvoiceModal({ productlist, productid, seller, getInvoice, id, totalamount, consumeraddress, orderdate, ordernumber, consumerid }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  return (
    <>
      <button onClick={() => { getInvoice(id, consumerid, productid); setShow(true) }}><i className="bi bi-receipt"></i>&nbsp;&nbsp;Download Invoice</button>
      {
        totalamount &&
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size='xl'
        >
          <Modal.Body style={{ padding: '10px' }}>
            <button id="successorderbtncls" type="button" className="close-button abslt" data-bs-dismiss="modal" aria-label="Close" onClick={() => { handleClose() }}><i className="bi bi-x-lg"></i></button>
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


                      productlist.length > 0 && productlist.map((item, i) => (
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
          </Modal.Body>
        </Modal>
      }
    </>
  )
}

import Image from 'next/image'
import React from 'react'

export default function InvoiceModal() {
    return (
        <>
            <a data-bs-toggle="modal" data-bs-target="#downloadinvoice">Download Invoice</a>
            <div className="modal fade" id="downloadinvoice" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button id="successorderbtncls" type="button" className="close-button abslt" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg"></i></button>
                            <div className="invoice">
                                <div className="invoice-top">
                                    <Image src={"/assets/img/srutle-logo.png"} width={300} height={100} alt="Logo" />
                                    <div className="invoice-top-right">
                                        <p><strong>Invoice Date:</strong> 6 March, 2023<br />
                                            <strong>Order Number:</strong> 405-9573479-2788335
                                        </p>
                                    </div>
                                </div>
                                <div className="invoice-details">
                                    <div className="box">
                                        <h4>Sold By</h4>
                                        <strong>Vivid Vision International</strong>
                                        <p>
                                            9029 Arcane, Jupiter 2<br />
                                            (+254) 243-124-392<br />
                                            PAN No: AAJFV2364D<br />
                                            GST Reg No: 07AAJFV2364D1Z7</p>
                                    </div>

                                    <div className="box box-rit">
                                        <div className="box-innr">
                                            <h4>Billed Address</h4>
                                            <strong>Din Djarin</strong>
                                            <p>
                                                dindjarin@gmail.com<br />
                                                9029 Salt Lake, Mandalor<br />
                                                (+254) 724-453-233</p>
                                        </div>

                                        <div className="box-innr">
                                            <h4>Shipping Address</h4>
                                            <strong>Starfleet Alliance</strong>
                                            <p>
                                                starfleet.com<br />
                                                9029 Arcane, Jupiter 2<br />
                                                (+254) 243-124-392</p>
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
                                                <th>Net Amount</th>
                                                <th>Tax Rate</th>
                                                <th>Tax Type</th>
                                                <th>Tax Amount</th>
                                                <th>Total Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>VIVID Vision Unisex Adult Lightweight Eyewear Specs Case Cover | Protect Eye Glasses | Polypropylene |
                                                    Spectacles | AP-442 |</td>
                                                <td>₹190.68</td>
                                                <td>5</td>
                                                <td>₹190.68</td>
                                                <td>18%</td>
                                                <td>CGST</td>
                                                <td>CGST</td>
                                                <td>₹225.00</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>VIVID Vision Unisex Adult Lightweight Eyewear Specs Case Cover | Protect Eye Glasses | Polypropylene |
                                                    Spectacles | AP-442 |</td>
                                                <td>₹190.68</td>
                                                <td>5</td>
                                                <td>₹190.68</td>
                                                <td>18%</td>
                                                <td>CGST</td>
                                                <td>CGST</td>
                                                <td>₹225.00</td>
                                            </tr>
                                            <tr>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td><strong>Total:</strong></td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td><strong>₹225.00</strong></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p>&nbsp;</p>
                                <p>&nbsp;</p>
                                <p>&nbsp;</p>
                                <div className="invoice-footer-text">
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                        industry's standard dummy text ever since the <br/>1500s, when an unknown printer took a galley of type and
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

'use client'
import React, { useEffect, useState } from 'react'
import { getLocalStorageData, removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { giftcardApi } from '../lib/apiService';
import moment from 'moment';

export default function GiftListComponent() {
    const router = useRouter();
    const [receivedarray, setReceivedArray] = useState([])
    const [sendarray, setSendArray] = useState([])

    const [card, setCard] = useState('')
    const [image, setImage] = useState('')
    const [amount, setAmount] = useState('')
    const [recipientName, setRecipientName] = useState('')
    const [recipientEmail, setRecipientEmail] = useState('')
    const [recipientMessage, setRecipientMessage] = useState('')
    const [ceratedAt, setCeratedAt] = useState('')

    const goto = (path) => {
        showLoader()
        router.push("/consumer" + path)
        removeLocalStorageData("pathName")
        setLocalStorageData('pathName', path)
    }

    useEffect(() => {
        getsenddata()
        getreceivedata()
    }, [])

    const getsenddata = async () => {
        let response = await giftcardApi({ sendgift: true, senderemail: getLocalStorageData('consumer')?.email })
        if (response.success) {
            let { result } = response
            setSendArray(result)
        } else {
            setSendArray([])
        }
    }
    const getreceivedata = async () => {
        let response = await giftcardApi({ receivegift: true, recipientemail: getLocalStorageData('consumer')?.email })
        if (response.success) {
            let { result } = response
            setReceivedArray(result)
        } else {
            setReceivedArray([])
        }
    }

    const getreceivedetailsdata = async (id) => {
        let response = await giftcardApi({ receivedetailsgift: true, mstgiftcardsid: id })
        if (response.success) {
            let { result } = response
            setCard(result.card)
            setImage(result.image)
            setAmount(result.amount)
            setRecipientName(result.recipientname)
            setRecipientEmail(result.recipientemail)
            setRecipientMessage(result.recipientmessage)
            setCeratedAt(result.createdAt)
        } else {
            setCard('')
            setImage('')
            setAmount('')
            setRecipientName('')
            setRecipientEmail('')
            setRecipientMessage('')
            setCeratedAt('')
        }
    }

    return (
        <>
            <div className="my-giftcrd-top">
                <div className="giftcrd-top">
                    <ul className="nav nav-tabs new-tab-div" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="tab1-tab" data-bs-toggle="tab" data-bs-target="#tab1-tab-pane"
                                type="button" role="tab" aria-controls="tab1-tab-pane" aria-selected="true">Send Gift
                                Cards</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="tab2-tab" data-bs-toggle="tab" data-bs-target="#tab2-tab-pane"
                                type="button" role="tab" aria-controls="tab2-tab-pane" aria-selected="false">Received Gift
                                Cards</button>
                        </li>
                    </ul>
                    <div className="buy-gift"><button className="buy-gift-card" onClick={() => { goto('/giftcard') }}>Buy Gift Card</button></div>
                </div>
                <div className="tab-content mt-4" id="myTabContent">
                    <div className="tab-pane fade show active" id="tab1-tab-pane" role="tabpanel" aria-labelledby="tab1-tab"
                        tabIndex="0">
                        <div className="gift-lists">
                            {
                                sendarray.length > 0 ?
                                    <>
                                        <ul>
                                            {
                                                sendarray.map((item, i) => (
                                                    <li key={i}>
                                                        <a data-bs-toggle="modal" data-bs-target="#giftcardshowmodal" onClick={()=>{getreceivedetailsdata(item.mstgiftcardsid)}}>
                                                            <Image
                                                                src={'/upload/' + item.image}
                                                                width={100}
                                                                height={100}
                                                                alt='logo'
                                                            />
                                                        </a>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </>
                                    :
                                    <>
                                        <div className='addrf-no'>
                                            <Image
                                                src="/assets/img/no-data.png"
                                                width={600}
                                                height={100}
                                                alt='asd'
                                            />
                                        </div>
                                    </>

                            }
                        </div>
                    </div>
                    <div className="tab-pane fade" id="tab2-tab-pane" role="tabpanel" aria-labelledby="tab2-tab" tabIndex="0">
                        <div className="gift-lists">
                            {
                                receivedarray.length > 0 ?
                                    <>
                                        <ul>
                                            {
                                                receivedarray.map((item, i) => (
                                                    <li key={i}>
                                                        <a data-bs-toggle="modal" data-bs-target="#giftcardshowmodal" onClick={()=>{getreceivedetailsdata(item.mstgiftcardsid)}}>
                                                            <Image
                                                                src={'/upload/' + item.image}
                                                                width={100}
                                                                height={100}
                                                                alt='logo'
                                                            />
                                                        </a>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </>
                                    :
                                    <>
                                        <div className='addrf-no'>
                                            <Image
                                                src="/assets/img/no-data.png"
                                                width={600}
                                                height={100}
                                                alt='asd'
                                            />
                                        </div>
                                    </>

                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-giftcrd">
                <div className="my-giftcrd-l"></div>
                <div className="my-giftcrd-r"></div>
            </div>

            <div className="modal fade" id="giftcardshowmodal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <span>&nbsp;</span>
                            <button type="button" className="close-button p-0 border-0 bg-white" data-bs-dismiss="modal"
                                aria-label="Close"><i className="bi bi-x-lg"></i></button>
                        </div>
                        <div className="modal-body">
                            <div className="gift-card-mod">
                                <div className="gift-card-single-div">
                                    <h4>{card} Card</h4>
                                    <Image src={"/upload/"+image} width={250} height={100} alt="Gift Card Image" />
                                    <div className="card-single-right-amt">
                                        <span>Gift Amount</span>
                                        <strong>₹{amount}</strong>
                                    </div>
                                    <div className="card-single-flex">
                                        <div className="card-single-left">
                                            <span>Recipient Name</span>
                                            <strong>{recipientName}</strong>
                                        </div>
                                        <div className="card-single-right">
                                            <span>Recipient Email</span>
                                            <a>{recipientEmail}</a>
                                        </div>
                                    </div>
                                    <div className="card-single-rcpt">
                                        <span>Recipient Message </span>
                                        <p style={{textAlign:"center"}}>{recipientMessage}</p>
                                    </div>
                                    <p className="card-expr">Gift Card Validity:
                                        <strong className='mx-2'>{moment(ceratedAt).add(6, 'months').format('YYYY-MM-DD')}</strong>
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

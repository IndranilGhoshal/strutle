'use client'
import GeneratePassword from '@/app/api/_apiFunction/GeneratePassword'
import { orderapi } from '@/app/lib/apiService'
import { getLocalStorageData } from '@/app/lib/common'
import { urlpath } from '@/app/lib/config'
import React from 'react'
export default function Razorpaypaymentinterface({ totalamount, paymentdescription, addressarray, makeorder }) {

    const keyid = "rzp_test_pvVdQM3MSMrc2y"
    const companyname = "Srutle.com"

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // creating a new order
        let receipt = GeneratePassword({ len: "6", upper: true, nums: true, special: true })
        let obj = {paymentorder:true, amount:totalamount+"00", currency:"INR", receipt:"srutle_receipt_"+receipt}
        const response = await orderapi(obj);

        if (!response) {
            alert("Server error. Are you online?");
            return;
        }

        // Getting the order details back
        const { amount, id: order_id, currency } = response.result;

        let addresstemp = [...addressarray]
        let adistrict;
        let astate;
        let apincode;

        for (let a of addresstemp) {
            if (a.isdefault == "1") {
                adistrict = a.district
                astate = a.state
                apincode = a.pincode
            }
        }


        const options = {
            key: keyid,
            "amount": amount.toString(),
            "currency": currency,
            "name": companyname,
            "description": paymentdescription,
            "image": urlpath+"/assets/img/srutle-logo.png",
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    ordercreationid: order_id,
                    razorpaypaymentid: response.razorpay_payment_id,
                    razorpayorderid: response.razorpay_order_id,
                    razorpaysignature: response.razorpay_signature,
                };

                makeorder(data);
            },
            "prefill": {
                "name": getLocalStorageData('consumer')?.firstname+" "+getLocalStorageData('consumer')?.lastname, 
                "email": getLocalStorageData('consumer')?.email,
                "contact": getLocalStorageData('consumer')?.phone 
            },
            "notes": {
                "address": adistrict+", "+astate+" - "+apincode
            },
            "theme": {
                "color": "#3399cc"
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <>
            <div>
                <button onClick={() => { displayRazorpay() }} className="btn btn-plcordr">Pay Now ₹{totalamount} & Place Order</button>
            </div>

        </>
    )
}

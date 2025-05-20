import { useRouter } from "next/navigation";
import { dencryptFunction, encryptFunction, getLocalStorageData, removeLocalStorageData, setPassData, showLoader } from "./common";
import { BASE_URL, PAYLOAD_DECRYCT, PAYLOAD_ENCRYCT } from "./config";
import { DeviceDetails } from "./device";
import axios from 'axios';
import { getPost } from "./postApi";

const baseURL = BASE_URL;
const encrypt = PAYLOAD_ENCRYCT;
const decrypt = PAYLOAD_DECRYCT;

axios.interceptors.request.use(function (config) {
    if (getLocalStorageData('admin')?._id) {
        config.headers.Authorization = getLocalStorageData('admin').token
        if (getLocalStorageData("admin")?._id && config.method === 'post') {
            config.data.userid = getLocalStorageData("admin")._id
        }
    }
    if (getLocalStorageData('seller')?._id) {
        config.headers.Authorization = getLocalStorageData('seller').token
        if (getLocalStorageData("seller")?._id && config.method === 'post') {
            config.data.userid = getLocalStorageData("seller")._id
        }
    }
    if (getLocalStorageData('consumer')?._id) {
        config.headers.Authorization = getLocalStorageData('consumer').token
        if (getLocalStorageData("admin")?._id && config.method === 'post') {
            config.data.userid = getLocalStorageData("consumer")._id
        }
    }
    if (encrypt && config.method === 'post') {
        var ciphertext = encryptFunction(config.data);
        let payloadData = {
            "payload": ciphertext
        }
        config.data = payloadData;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(async (response) => {
    if (decrypt) {
        var res = dencryptFunction(response.data)
        response.data = res
    }
    if (getLocalStorageData('admin')?._id && response.data.status == "401") {
        removeLocalStorageData("admin")
        removeLocalStorageData("pathName")
        removeLocalStorageData("adminrole")
        removeLocalStorageData('col-key');
        window.location.href = baseURL + "/admin?session=error";
    }
    if (getLocalStorageData('seller')?._id && response.data.status == "401") {
        removeLocalStorageData("seller")
        removeLocalStorageData("pathName")
        window.location.href = baseURL + "/seller?session=error";
    }
    return response
})

export const axiosInstance = axios.create({
    baseURL: baseURL,
})


export const adminLoginApi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/admin/login", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const adminEvent = async (evn) => {
    try {
        const data = {
            mstAdminId: getLocalStorageData("admin")._id,
            userAgent: DeviceDetails().user_agent,
            eventName: evn,
            deviceType: DeviceDetails().device_type,
            isDelete: "0",
        }
        let result
        await axios.post(baseURL + "/api/admin/event", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}


export const adminForgotPasswordApi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/admin/forgotpassword", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const adminResetPasswordApi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/admin/resetpassword", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const adminMenuApi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/admin/menu", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const adminAddRoleApi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/admin/role", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const admingiftcardApi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/admin/giftcard", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const menuApi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/admin/menu", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}


export const adminAddAdminApi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/admin/useradmin", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}


export const uploadImageApi = async (data) => {
    try {
        let response = await fetch(baseURL + "/api/uploadfile", {
            method: "POST",
            body: data
        });
        return response = await response.json();
    } catch (e) {
        return null
    }
}

export const categoryApi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/admin/category", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const subcategoryApi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/admin/subcategory", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const producttypeApi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/admin/producttype", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const sellerApi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/admin/seller", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const consumerApi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/admin/consumer", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const partnerApi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/admin/partner", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const consumerloginapi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/consumer/login", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const consumercategoryapi = async (data) => {
    return getPost(baseURL + '/api/consumer/category', data)
}

export const consumeruserapi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/consumer/user", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const productlistapi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/consumer/productlist", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const productapi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/consumer/product", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const menuapi = async (data) => {
    return getPost(baseURL + '/api/consumer/menu', data)
}

export const cartapi = async (data) => {
    return getPost(baseURL + '/api/consumer/cart', data)
}

export const pincodeapi = async (pincode) => {
    try {
        let response = await fetch("https://api.postalpincode.in/pincode/" + pincode)
        return response = await response.json();
    } catch (e) {
        return null
    }
}

export const shippingaddressapi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/consumer/shippingaddress", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const favouriteapi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/consumer/favourite", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const orderapi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/consumer/order", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const productreviewapi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/consumer/productreview", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const reviewapi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/consumer/review", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const giftcardApi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/consumer/giftcard", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const sellerloginapi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/seller/login", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const sellerorderapi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/seller/order", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const sellershippingapi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/seller/shipping", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const getgstapi = async (gstno) => {
    // let result
    // await axios.get("https://razorpay.com/api/gstin/"+gstno,{
    // 	mode: 'no-cors',
    // }).then(res => { result = res.data })
    // return result
    // fetch("https://razorpay.com/api/gstin/" + gstno,
    //     {
    //         referrer: "https://razorpay.com/api/gstin/" + gstno,
    //         credentials: 'include',
    //         mode: 'no-cors',
    //         referrerPolicy: "no-referrer-when-downgrade",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*",
    //             "X-Aequseted-With": "XMLHttpRequest",
    //         }
    //     }).catch(err =>
    //         console.log(err)
    //     )
    //     .then(function (response) {
    //         console.log(response);
    //     }).then(function (result) {
    //         console.log(result)
    //     });

}
export const getifscapi = async (data) => {
    try {
        let result
        await axios.get("https://ifsc.razorpay.com/" + data)
            .then(res => {
                result = res.data
            })
            .catch(error => {
                result = null
            })
        return result
    } catch (e) {
        return null
    }
}


export const sellersignupapi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/seller/signup", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const sellerForgotPasswordApi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/seller/forgotpassword", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const sellerResetPasswordApi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/seller/resetpassword", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const sellerDashboardApi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/seller/dashboard", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const sellerSettingsApi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/seller/settings", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const adminSettingsApi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/admin/settings", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const catelogcategoryapi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/seller/catelogs", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const adminPrivacyPolicyApi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/admin/privacypolicy", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const consumerPrivacyPolicyApi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/consumer/privacypolicy", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const sellerPrivacyPolicyApi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/seller/privacypolicy", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const adminTermsandConditionsApi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/admin/termscondition", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const consumerTermsandConditionsApi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/consumer/termscondition", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const sellerTermsandConditionsApi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/seller/termscondition", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const adminCatelogApi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/admin/catelogs", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const adminFaqApi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/admin/faq", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}

export const consumerFaqApi = async (data) => {
    try {
        let result
        await axios.post(baseURL + "/api/consumer/faq", data).then(res => { result = res.data })
        return result
    } catch (e) {
        return null
    }
}
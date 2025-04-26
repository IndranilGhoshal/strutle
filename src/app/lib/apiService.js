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
        window.location.href = baseURL+"/admin?session=error";
    }
    return response
})

export const axiosInstance = axios.create({
    baseURL: baseURL,
})


export const adminLoginApi = async (data) => {
    let result
    await axios.post(baseURL + "/api/admin/login", data).then(res => { result = res.data })
    return result
}

export const adminEvent = async (evn) => {
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
}


export const adminForgotPasswordApi = async (data) => {
    let result
    await axios.post(baseURL + "/api/admin/forgotpassword", data).then(res => { result = res.data })
    return result
}

export const adminResetPasswordApi = async (data) => {
    let result
    await axios.post(baseURL + "/api/admin/resetpassword", data).then(res => { result = res.data })
    return result
}

export const adminMenuApi = async (data) => {
    let result
    await axios.post(baseURL + "/api/admin/menu", data).then(res => { result = res.data })
    return result
}

export const adminAddRoleApi = async (data) => {
    let result
    await axios.post(baseURL + "/api/admin/role", data).then(res => { result = res.data })
    return result
}

export const admingiftcardApi = async (data) => {
    let result
    await axios.post(baseURL + "/api/admin/giftcard", data).then(res => { result = res.data })
    return result
}

export const menuApi = async (data) => {
    let result
    await axios.post(baseURL + "/api/admin/menu", data).then(res => { result = res.data })
    return result
}


export const adminAddAdminApi = async (data) => {
    let result
    await axios.post(baseURL + "/api/admin/useradmin", data).then(res => { result = res.data })
    return result
}


export const uploadImageApi = async (data) => {
    let response = await fetch(baseURL + "/api/uploadfile", {
        method: "POST",
        body: data
    });
    return response = await response.json();
}

export const categoryApi = async (data) => {
    let result
    await axios.post(baseURL + "/api/admin/category", data).then(res => { result = res.data })
    return result
}

export const subcategoryApi = async (data) => {
    let result
    await axios.post(baseURL + "/api/admin/subcategory", data).then(res => { result = res.data })
    return result
}

export const producttypeApi = async (data) => {
    let result
    await axios.post(baseURL + "/api/admin/producttype", data).then(res => { result = res.data })
    return result
}

export const sellerApi = async (data) => {
    let result
    await axios.post(baseURL + "/api/admin/seller", data).then(res => { result = res.data })
    return result
}

export const consumerApi = async (data) => {
    let result
    await axios.post(baseURL + "/api/admin/consumer", data).then(res => { result = res.data })
    return result
}

export const partnerApi = async (data) => {
    let result
    await axios.post(baseURL + "/api/admin/partner", data).then(res => { result = res.data })
    return result
}

export const consumerloginapi = async (data) => {
    let result
    await axios.post(baseURL + "/api/consumer/login", data).then(res => { result = res.data })
    return result
}

export const consumercategoryapi = async (data) => {
    return getPost(baseURL + '/api/consumer/category',data)
}

export const consumeruserapi = async (data) => {
    let result
    await axios.post(baseURL + "/api/consumer/user", data).then(res => { result = res.data })
    return result
}

export const productlistapi = async (data) => {
    let result
    await axios.post(baseURL + "/api/consumer/productlist", data).then(res => { result = res.data })
    return result
}

export const productapi = async (data) => {
    let result
    await axios.post(baseURL + "/api/consumer/product", data).then(res => { result = res.data })
    return result
}

export const cartapi = async (data) => {
    return getPost(baseURL + '/api/consumer/cart',data)
}

export const pincodeapi = async (pincode) => {
    let response = await fetch("https://api.postalpincode.in/pincode/" + pincode)
    return response = await response.json();
}

export const shippingaddressapi = async (data) => {
    let result
    await axios.post(baseURL + "/api/consumer/shippingaddress", data).then(res => { result = res.data })
    return result
}

export const favouriteapi = async (data) => {
    let result
    await axios.post(baseURL + "/api/consumer/favourite", data).then(res => { result = res.data })
    return result
}

export const orderapi = async (data) => {
    let result
    await axios.post(baseURL + "/api/consumer/order", data).then(res => { result = res.data })
    return result
}

export const productreviewapi = async (data) => {
    let result
    await axios.post(baseURL + "/api/consumer/productreview", data).then(res => { result = res.data })
    return result
}

export const giftcardApi = async (data) => {
    let result
    await axios.post(baseURL + "/api/consumer/giftcard", data).then(res => { result = res.data })
    return result
}
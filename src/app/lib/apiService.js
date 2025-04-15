import { getLocalStorageData } from "./common";
import { urlpath } from "./config";
import { DeviceDetails } from "./device";

export const adminLoginApi = async (data) => {
    let response = await fetch(urlpath + "/api/admin/login", {
        method: "POST",
        body: JSON.stringify(data)
    });
    return response = await response.json();
}

export const adminEvent = async (evn) => {
    const data = {
        mstAdminId: getLocalStorageData("admin")._id,
        userAgent: DeviceDetails().user_agent,
        eventName: evn,
        deviceType: DeviceDetails().device_type,
        isDelete: "0",
    }
    let response = await fetch(urlpath + "/api/admin/event", {
        method: "POST",
        body: JSON.stringify(data)
    });
    return response = await response.json();
}


export const adminForgotPasswordApi = async (data) => {
    let response = await fetch(urlpath + "/api/admin/forgotpassword", {
        method: "POST",
        body: JSON.stringify(data)
    });
    return response = await response.json();
}

export const adminResetPasswordApi = async (data) => {
    let response = await fetch(urlpath + "/api/admin/resetpassword", {
        method: "PUT",
        body: JSON.stringify(data)
    });
    return response = await response.json();
}

export const adminMenuApi = async (data) => {
    let response = await fetch(urlpath + "/api/admin/menu", {
        method: "POST",
        body: JSON.stringify(data)
    });
    return response = await response.json();
}

export const adminAddRoleApi = async (data) => {
    let response = await fetch(urlpath + "/api/admin/role", {
        method: "POST",
        body: JSON.stringify(data)
    });
    return response = await response.json();
}

export const menuApi = async (data) => {
    let response = await fetch(urlpath + "/api/admin/menu", {
        method: "POST",
        body: JSON.stringify(data)
    });
    return response = await response.json();
}


export const adminAddAdminApi = async (data) => {
    let response = await fetch(urlpath + "/api/admin/useradmin", {
        method: "POST",
        body: JSON.stringify(data)
    });
    return response = await response.json();
}


export const uploadImageApi = async (data) => {
    let response = await fetch(urlpath + "/api/uploadfile", {
        method: "POST",
        body: data
    });
    return response = await response.json();
}

export const categoryApi = async (data) => {
    let response = await fetch(urlpath + "/api/admin/category", {
        method: "POST",
        body: JSON.stringify(data)
    });
    return response = await response.json();
}

export const subcategoryApi = async (data) => {
    let response = await fetch(urlpath + "/api/admin/subcategory", {
        method: "POST",
        body: JSON.stringify(data)
    });
    return response = await response.json();
}

export const producttypeApi = async (data) => {
    let response = await fetch(urlpath + "/api/admin/producttype", {
        method: "POST",
        body: JSON.stringify(data)
    });
    return response = await response.json();
}

export const sellerApi = async (data) => {
    let response = await fetch(urlpath + "/api/admin/seller", {
        method: "POST",
        body: JSON.stringify(data)
    });
    return response = await response.json();
}

export const consumerApi = async (data) => {
    let response = await fetch(urlpath + "/api/admin/consumer", {
        method: "POST",
        body: JSON.stringify(data)
    });
    return response = await response.json();
}

export const partnerApi = async (data) => {
    let response = await fetch(urlpath + "/api/admin/partner", {
        method: "POST",
        body: JSON.stringify(data)
    });
    return response = await response.json();
}

export const consumerloginapi = async (data) => {
    let response = await fetch(urlpath + "/api/consumer/login", {
        method: "POST",
        body: JSON.stringify(data)
    });
    return response = await response.json();
}

export const consumercategoryapi = async (data) => {
    let response = await fetch(urlpath + "/api/consumer/category", {
        method: "POST",
        body: JSON.stringify(data)
    });
    return response = await response.json();
}

export const consumeruserapi = async (data) => {
    let response = await fetch(urlpath + "/api/consumer/user", {
        method: "POST",
        body: JSON.stringify(data)
    });
    return response = await response.json();
}

export const productlistapi = async (data) => {
    let response = await fetch(urlpath + "/api/consumer/productlist", {
        method: "POST",
        body: JSON.stringify(data)
    });
    return response = await response.json();
}

export const productapi = async (data) => {
    let response = await fetch(urlpath + "/api/consumer/product", {
        method: "POST",
        body: JSON.stringify(data)
    });
    return response = await response.json();
}

export const cartapi = async (data) => {
    let response = await fetch(urlpath + "/api/consumer/cart", {
        method: "POST",
        body: JSON.stringify(data)
    });
    return response = await response.json();
}

export const pincodeapi = async (pincode) => {
    let response = await fetch("https://api.postalpincode.in/pincode/" + pincode)
    return response = await response.json();
}

export const shippingaddressapi = async (data) => {
    let response = await fetch(urlpath + "/api/consumer/shippingaddress", {
        method: "POST",
        body: JSON.stringify(data)
    });
    return response = await response.json();
}

export const favouriteapi = async (data) => {
    let response = await fetch(urlpath + "/api/consumer/favourite", {
        method: "POST",
        body: JSON.stringify(data)
    });
    return response = await response.json();
}

export const orderapi = async (data) => {
    let response = await fetch(urlpath + "/api/consumer/order", {
        method: "POST",
        body: JSON.stringify(data)
    });
    return response = await response.json();
}

export const productreviewapi = async (data) => {
    let response = await fetch(urlpath + "/api/consumer/productreview", {
        method: "POST",
        body: JSON.stringify(data)
    });
    return response = await response.json();
}

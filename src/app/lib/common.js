
var CryptoJS = require("crypto-js");
const { cryptokey } = process.env

let passdata;

export const setPassData = (d) => {
    try {
        passdata = d;
    } catch (e) {
        return null
    }
}

export const getPassData = () => {
    try {
        return passdata;
    } catch (e) {
        return null
    }
}

// Encrypt
export const encryptFunction = (value) => {
    try {
        return CryptoJS.AES.encrypt(value, cryptokey).toString();
    } catch (e) {
        return null
    }
}

// Decrypt
export const dencryptFunction = (value) => {
    try {
        var bytes = CryptoJS.AES.decrypt(value, cryptokey);
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch (e) {
        return null
    }
}

export const setLocalStorageData = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        return null
    }
}

export const getLocalStorageData = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key))
    } catch (e) {
        return null
    }
}

export const removeLocalStorageData = (key) => {
    try {
        localStorage.removeItem(key)
    } catch (e) {
        return null
    }
}

export const setSessionStorageData = (key, data) => {
    try {
        sessionStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        return null
    }
}

export const getSessionStorageData = (key) => {
    try {
        return JSON.parse(sessionStorage.getItem(key))
    } catch (e) {
        return null
    }
}

export const removeSessionStorageData = (key) => {
    try {
        sessionStorage.removeItem(key)
    } catch (e) {
        return null
    }
}

export function getNameFirstLetter(name) {
    try {
        return name.slice(0, 1)
    } catch (e) {
        return null
    }
}

export function showLoader() {
    document.querySelector('.loader-new').style.display = 'block';
}

export function hideLoader() {
    document.querySelector('.loader-new').style.display = 'none';
}

export function opneLoginModal() {
    var element = document.getElementById("loginbutton");
    element.click()
}

export function opneQuickViewProductModal() {
    var element = document.getElementById("quickviewbutton");
    element.click()
}

export function opneWorkinProgresModal() {
    var element = document.getElementById("workinprogressbtn");
    element.click()
}

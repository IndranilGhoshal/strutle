
var CryptoJS = require("crypto-js");
const { cryptokey } = process.env

let passdata;

export const setPassData = (d) =>{
    passdata = d;
}

export const getPassData = () =>{
    return passdata;
}

// Encrypt
export const encryptFunction = (value) => {
    return CryptoJS.AES.encrypt(value, cryptokey).toString();
}

// Decrypt
export const dencryptFunction = (value) => {
    var bytes = CryptoJS.AES.decrypt(value, cryptokey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

export const setLocalStorageData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}

export const getLocalStorageData = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const removeLocalStorageData = (key) => {
    localStorage.removeItem(key)
}

export const setSessionStorageData = (key, data) => {
    sessionStorage.setItem(key, JSON.stringify(data));
}

export const getSessionStorageData = (key) => {
    return JSON.parse(sessionStorage.getItem(key))
}

export const removeSessionStorageData = (key) => {
    sessionStorage.removeItem(key)
}

export function getNameFirstLetter(name) {
    return name.slice(0, 1)
}

export function showLoader() {
    document.querySelector('.loader').style.display = 'block';
}

export function hideLoader() {
    document.querySelector('.loader').style.display = 'none';
}

export function opneLoginModal () {
    var element = document.getElementById("loginbutton");
    element.click()
}

export function opneQuickViewProductModal () {
    var element = document.getElementById("quickviewbutton");
    element.click()
}


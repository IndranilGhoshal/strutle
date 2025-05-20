
var CryptoJS = require("crypto-js");
const { cryptokey } = process.env

export const encryptFunction = (value) => {
    // Encrypt
    return CryptoJS.AES.encrypt(value, cryptokey).toString();
}

export const dencryptFunction = (value) => {
    // Decrypt
    var bytes = CryptoJS.AES.decrypt(value, cryptokey);
    return bytes.toString(CryptoJS.enc.Utf8);
}
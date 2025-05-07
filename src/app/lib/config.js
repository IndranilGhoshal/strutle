let local = true;
export const BASE_URL = local ? "http://localhost:3000":"http://192.168.0.102:3000";
export const IMAGE_URL = local ? "http://localhost:3000/assets/img/":"http://192.168.0.102:3000/assets/img/";
export const PAYLOAD_ENCRYCT = local ? false : true;
export const PAYLOAD_DECRYCT = local ? false : true;
export const GST_KEY = "0a262d161234a69ff5c4314c9bbf7367"

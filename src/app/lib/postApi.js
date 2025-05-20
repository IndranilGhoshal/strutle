import axios from 'axios';
export const getPost = async (url,data) =>{
    try {
    let result
    await axios.post(url,data).then(res => { result = res.data }).catch((e) => {
        console.log("e",e.status);
    });
    return result
    } catch (e) {
        return null
    }
}
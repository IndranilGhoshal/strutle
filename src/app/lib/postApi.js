import axios from 'axios';
export const getPost = async (url,data) =>{
    let result
    await axios.post(url,data).then(res => { result = res.data }).catch((e) => {
        console.log("e",e.status);
        //this console logs Error: Network Error
        // at createError (monkeytype.js:formatted:35086:25)
        // at XMLHttpRequest.handleError (monkeytype.js:formatted:34457:28)
    });
    return result
}
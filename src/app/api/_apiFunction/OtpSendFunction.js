
const {accountSid,authToken} = process.env
const client = require('twilio')(accountSid, authToken);

export const otpsend = async (bodyvalue,formvalue,tovalue) =>{
    console.log("bodyvalue",bodyvalue);
    console.log("formvalue",formvalue);
    console.log("tovalue",tovalue);
    try{
        client.messages.create({
            body: bodyvalue,
            from: formvalue,
            to: tovalue
        })
        .then(message => console.log(message.sid))
        return true
    }catch(e){
        return false
    }
    
}


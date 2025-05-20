
const {TOKEN_KEY} = process.env
import jwt from 'jsonwebtoken'

export const getsignintoken = (data) =>{
    return jwt.sign({ id: data, iat: Math.floor(Date.now() / 1000) - (60 * 60) , exp: Math.floor(Date.now() / 1000) + (60 * 60)}, TOKEN_KEY);
}
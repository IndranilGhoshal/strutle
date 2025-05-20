import { headers } from 'next/headers'
import { getVerifyWebToken } from './VerifyWebToken';

export const MiddlewareRequest = async () => {
    const headersList = await headers()
    const authorization = headersList.get('authorization')
    let verify = getVerifyWebToken(authorization)
    if(verify){
        return true
    }else{
        return false
    }
}

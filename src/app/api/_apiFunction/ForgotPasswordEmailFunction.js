
import { Resend } from 'resend';
const {RESEND_API_KEY} = process.env
import EmailForgotPasswordTemplate from '../_emailTemplate/EmailForgotPasswordTemplate';
import { urlpath } from '@/app/lib/config';

const resend = new Resend(RESEND_API_KEY);

const ForgotPasswordEmailFunction = async(props) => {
  let TEN_MINUTES = new Date().getTime() + 600000;
    try {
        const { data, error } = await resend.emails.send({
          from: props.from,
          to: [props.to],
          subject: 'Forgot password link',
          react: EmailForgotPasswordTemplate({ Link: urlpath+'/admin/resetPassword/'+props.id+"?t="+TEN_MINUTES, authEmail:props.from, name:props.name }),
        });
    
        if (error) {
          return ({ error ,status: 500 ,success:false });
        }
    
        return ({data,success:true});
      } catch (error) {
        return ({ error ,status: 500 ,success:false });
      }
}

export default ForgotPasswordEmailFunction
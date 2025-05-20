
import { Resend } from 'resend';
const {RESEND_API_KEY} = process.env
import { BASE_URL } from '@/app/lib/config';
import InviteAdminTemplate from '../_emailTemplate/InviteAdminTemplate';

const resend = new Resend(RESEND_API_KEY);

const InviteAdminEmailFunction = async(props) => {
    try {
        const { data, error } = await resend.emails.send({
          from: props.from,
          to: [props.to],
          subject: 'Welcome to Srutle Admin Panel',
          react: InviteAdminTemplate({ link: BASE_URL+'/admin', email: props.to, password:props.password, name:props.name, role:props.role }),
        });
    
        if (error) {
          return ({ error ,status: 500 ,success:false });
        }
    
        return ({data,success:true});
      } catch (error) {
        return ({ error ,status: 500 ,success:false });
      }
}

export default InviteAdminEmailFunction
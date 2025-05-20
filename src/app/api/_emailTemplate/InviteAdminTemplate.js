import React from 'react'
const { authEmail } = process.env
export default function InviteAdminTemplate({link, email, password, name, role}) {
  return (
    <>
        <h3>Dear {name},</h3>
        <h3>We are happy to inform you that your account has been created by the admin in the Srutle admin application.</h3>
        <h3>Role Name: {role}</h3>
        <h3>Email ID: {email}</h3>
        <h3>Password: {password}</h3>
        <h3>Click Here {link} to login.</h3>
        <h3>If you have any query please contact Srutle Support Team @ {authEmail}.</h3>
        <h3>Best Regards,</h3>
        <h3>Team Srutle</h3>
    </>
  )
}

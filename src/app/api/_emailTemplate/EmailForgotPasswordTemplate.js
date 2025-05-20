import React from 'react'

export default function EmailForgotPasswordTemplate(props) {
  return (
    <>
      <div>
        <h3>Dear {props.name},</h3>
        <h3>Click Here {props.Link} to reset your password.</h3>
        <h3>If you have any query please contact Srutle Support Team @ {props.authEmail}.</h3>
        <h3>Best Regards,</h3>
        <h3>Team Srutle</h3>
      </div>
    </>
  )
}

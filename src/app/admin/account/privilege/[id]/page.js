import PrivilegeComponent from '@/app/_adminComponents/PrivilegeComponent'
import React from 'react'

export default function page({ params }) {
  const { id } = React.use(params)
  return (
    <PrivilegeComponent id={id} />
  )
}

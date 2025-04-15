import UserComponent from '@/app/_adminComponents/UserComponent'
import React from 'react'

export default function page({params}) {
  const { id } = React.use(params)
  return (
    <UserComponent id={id}  />
  )
}

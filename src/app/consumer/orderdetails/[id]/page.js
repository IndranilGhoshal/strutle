import OrderDetailsComponent from '@/app/_components/OrderDetailsComponent'
import React from 'react'

export default function page({params}) {
  const { id } = React.use(params)
  return (
    <OrderDetailsComponent id={id} />
  )
}

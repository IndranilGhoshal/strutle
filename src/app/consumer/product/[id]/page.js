import ProductComponent from '@/app/_components/ProductComponent'
import React from 'react'

export default function page({params}) {
  const { id } = React.use(params)
  return (
    <ProductComponent id={id} />
  )
}

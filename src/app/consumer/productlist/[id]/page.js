import ProductListComponent from '@/app/_components/ProductListComponent'
import React from 'react'

export default function page({params}) {
  const { id } = React.use(params)
  return (
  <ProductListComponent id={id} />
  )
}

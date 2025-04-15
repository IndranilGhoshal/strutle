import ProductReviewComponent from '@/app/_components/ProductReviewComponent'
import React from 'react'

export default function page({params}) {
  const { id } = React.use(params)
  return (
    <ProductReviewComponent id={id} />
  )
}

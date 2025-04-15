import ProductConfigarationComponent from '@/app/_adminComponents/ProductConfigarationComponent'
import React from 'react'

export default function page({ params }) {
    const { id } = React.use(params)
  return (
    <><ProductConfigarationComponent id={id}/></>
  )
}

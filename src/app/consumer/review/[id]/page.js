import ReviewComponent from '@/app/_components/ReviewComponent'
import React from 'react'

export default function page({params}) {
  const { id } = React.use(params)
  return (
    <ReviewComponent id={id} />
  )
}

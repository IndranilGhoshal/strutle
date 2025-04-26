import GiftCardConfiguration from '@/app/_adminComponents/GiftCardConfiguration'
import React from 'react'

export default function page({params}) {
  const { id } = React.use(params)
  return (
    <GiftCardConfiguration id={id} />
  )
}

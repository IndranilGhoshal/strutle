"use client"
import ResetPasswordComponent from '@/app/_sellerComponents/ResetPasswordComponent'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function page({ params }) {
  const { id } = React.use(params)
  const searchParams = useSearchParams()
  const expTime = searchParams.get('t')
  return (
    <ResetPasswordComponent id={id} expTime={expTime} />
  )
}

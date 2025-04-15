"use client"
import ResetPasswordComponent from '@/app/_adminComponents/ResetPasswordComponent'
import React from 'react'
import { useSearchParams } from 'next/navigation'

export default function page({ params }) {
  const { id } = React.use(params)
  const searchParams = useSearchParams()
  const expTime = searchParams.get('t')
  return (
    <>
    <ResetPasswordComponent id={id} expTime={expTime} />
    </>
  )
}

'use client'
import React, { useEffect } from 'react'
import { hideLoader } from '../lib/common'

export default function TransactionComponent() {
    useEffect(() => {
        hideLoader()
    }, [])
    return (
        <div className="main-das-page">

            <div className="heading mb-3">
                <h3>Welcome to Transactions</h3>
            </div>
        </div>
    )
}

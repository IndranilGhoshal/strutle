'use client'
import React, { useEffect } from 'react'
import { hideLoader } from '../lib/common'

export default function PrivacypolicyManagementComponent() {
    useEffect(() => {
        hideLoader()
    }, [])
    return (
        <div className="main-das-page">

            <div className="heading mb-3">
                <h3>Welcome to Privacy Policy Management</h3>
            </div>
        </div>
    )
}

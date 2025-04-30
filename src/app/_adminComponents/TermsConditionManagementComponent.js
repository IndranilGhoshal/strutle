'use client'
import React, { useEffect } from 'react'
import { hideLoader } from '../lib/common'

export default function TermsConditionManagementComponent() {
    useEffect(() => {
        hideLoader()
    }, [])
    return (
        <div className="main-das-page">

            <div className="heading mb-3">
                <h3>Welcome to Terms & Condition Management</h3>
            </div>
        </div>
    )
}

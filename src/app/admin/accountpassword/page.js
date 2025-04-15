'use client'
import ResetPasswordModal from '@/app/_adminComponents/_modal/ResetPasswordModal'
import { getLocalStorageData } from '@/app/lib/common';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function page() {
    const router = useRouter();

    useEffect(() => {
        if (getLocalStorageData('admin')?.isfirstlogin == "1") {
            router.push("/admin/account")
        } else if (getLocalStorageData('admin')?.isfirstlogin == "0") {
            router.push("/admin/accountpassword");
        } else {
            router.push("/admin");
        }
    }, [])

    return (
        <>
            {
                getLocalStorageData('admin')?.isfirstlogin == "0" && <ResetPasswordModal id={getLocalStorageData('admin')?._id} />
            }
        </>

    )
}

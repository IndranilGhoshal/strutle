'use client'
import React, { useEffect, useState } from 'react'
import TreeView from './_chart/TreeView'

export default function ProductCategoryTree() {

    return (
        <>
            <div className="main-das-page">

                <div className="heading mb-3">
                    <h3>Product Category Tree</h3>
                    <TreeView />
                </div>
            </div>

        </>
    )
}

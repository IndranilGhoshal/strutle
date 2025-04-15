'use client'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Image from 'next/image';
import { consumercategoryapi } from '../lib/apiService';
import { hideLoader, removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common';
import { useRouter } from 'next/navigation';
import HomeCategorySkeleton from './_skeleton/HomeCategorySkeleton';

if (typeof window !== 'undefined') {
    window.$ = window.jQuery = require('jquery');
}

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
    ssr: false,
});

export default function CategoryCarousel() {
    const router = useRouter()
    const options = {
        loop: true,
        margin: 10,
        items: 8,
        autoplay: true,
        dots: false
    };

    const [categorylist, setCategoryList] = useState([])
    const [isLoad, setIsLoad] = useState(false)

    useEffect(() => {
        getCategoryData()
    }, [])

    const getCategoryData = async () => {
        showLoader()
        let data = { list: true }
        let response = await consumercategoryapi(data)
        if (response.success) {
            const { result } = response;
            let temp = result
            let array = []
            for (let t of temp) {
                let obj = {
                    image: t.image,
                    _id: t._id,
                    name: t.name,
                    active: false
                }
                array.push(obj)
            }
            setCategoryList(array)
            setIsLoad(true)
            hideLoader()
        } else {
            setIsLoad(false)
            setCategoryList([])
            hideLoader()
        }
    }

    const goto = (path) => {
        showLoader()
        router.push("/consumer" + path)
        removeLocalStorageData("pathName")
        setLocalStorageData('pathName', path)
    }

    return (
        <>
            {
                isLoad ?
                    <>
                        {
                            categorylist.length > 0 &&
                            <OwlCarousel className="banner-caro owl-carousel owl-theme" {...options}>
                                {
                                    categorylist.map((obj, i) => (
                                        <div className="items" key={i}>
                                            <div className="fade-in category-item" onClick={() => { goto('/productlist/' + obj._id) }}>
                                                <Image src={"/upload/" + obj.image} alt="Fashion" width={500} height={100} />
                                                <p className='txt-wp'>{obj.name}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </OwlCarousel>
                        }
                    </>
                    :
                    <>
                        <HomeCategorySkeleton />
                    </>
            }
        </>
    )
}

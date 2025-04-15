'use client'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Image from 'next/image';
import HomeBannerSkeleton from './_skeleton/HomeBannerSkeleton';

if (typeof window !== 'undefined') {
  window.$ = window.jQuery = require('jquery');
}

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

export default function BannerCarousel() {
  const options = {
    loop: true,
    margin: 10,
    items: 1,
    autoplay: true,
  };
  const [isLoad, setIsLoad] = useState(false)
  const [imageArray, setImageArray] = useState([
    {
      image: "/assets/img/new-banner1.png"
    },
    {
      image: "/assets/img/new-banner1.png"
    },
    {
      image: "/assets/img/new-banner1.png"
    },
    {
      image: "/assets/img/new-banner1.png"
    },
  ])

  useEffect(()=>{
    setTimeout(() => {
      setIsLoad(true)
    }, 1000);
  },[])

  return (
    <>
      {
        isLoad ?
          <OwlCarousel className=" banner-caro owl-carousel owl-theme" {...options}>
            {
              imageArray.map((item, i) => (
                <div key={i} className="items"><Image src={item.image} alt="banner" width={1500} height={100} /></div>
              ))
            }
          </OwlCarousel>
          :
          <><HomeBannerSkeleton /></>
      }
    </>
  )
}

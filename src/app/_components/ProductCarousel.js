import React from 'react'
import dynamic from 'next/dynamic';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Image from 'next/image';
import { Rating } from 'react-simple-star-rating'


if (typeof window !== 'undefined') {
  window.$ = window.jQuery = require('jquery');
}

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

export default function ProductCarousel({ products }) {
  const options = {
    loop: true,
    margin: 10,
    items: 6,
    autoplay: false,
  };
  return (
    <>
      {
        products.length > 0 ?
          <>
            <OwlCarousel className="similar-product-caro similar-product-caro1 owl-carousel owl-theme" {...options}>
              {
                products.map((item, i) => (
                  <div key={i} className="items">
                    <div className="category-item">
                      <div className="category-item-img">
                        <span className="spn-offr">{item.discount}% Off</span>
                        <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
                        <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
                        <Image
                          src={item.image}
                          alt="pi"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="prod-dtls">
                        <p>{item.name} </p>
                        <div className="ratings">
                          <Rating initialValue={item.rate} readonly={true} size={20} />
                          <strong>({item.review})</strong>
                        </div>
                        <strong>₹{item.price}</strong>
                      </div>
                    </div>
                  </div>
                ))
              }
            </OwlCarousel>
          </>
          :
          <>

          </>
      }

    </>
  )
}

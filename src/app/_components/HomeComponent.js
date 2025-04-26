'use client'
import React, { useEffect, useState } from 'react'
import BannerCarousel from './BannerCarousel'
import { hideLoader} from '../lib/common'
import CategoryCarousel from './CategoryCarousel'
import { getHsnFunction } from '../lib/hsnService'



export default function HomeComponent() {
  return (
    <>
      <div className="category-grid padding ctg">
        <CategoryCarousel />
      </div>
      <div className="banner">
        <BannerCarousel />
      </div>
      <div className="lastview padding">
        <div className="section-header">
          <div className="fade-in section-title">Last Viewed</div>
          <a href="#" className="view-all fade-in">View All</a>
        </div>
        <div className="product-grid">
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr">50% Off</span>
              <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
              <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
              <img src="assets/img/image9.png" alt="Fashion" />
            </div>
            <div className="fade-in prod-dtls">
              <p>S-Series Comfort Chair S-Series Comfort Chair </p>
              <div className="ratings">
                <ul>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                </ul>
                <strong>(99)</strong>
              </div>
              <strong>₹3,750</strong>
            </div>
          </div>
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr">50% Off</span>
              <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
              <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
              <img src="assets/img/image10.png" alt="Furniture" />
            </div>

            <div className="fade-in prod-dtls">
              <p>S-Series Comfort Chair S-Series Comfort Chair </p>
              <div className="ratings">
                <ul>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                </ul>
                <strong>(99)</strong>
              </div>
              <strong>₹3,750</strong>
            </div>
          </div>
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr">50% Off</span>
              <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
              <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
              <img src="assets/img/image11.png" alt="Electronics" />
            </div>

            <div className="fade-in prod-dtls">
              <p>S-Series Comfort Chair S-Series Comfort Chair </p>
              <div className="ratings">
                <ul>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                </ul>
                <strong>(99)</strong>
              </div>
              <strong>₹3,750</strong>
            </div>
          </div>
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr">50% Off</span>
              <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
              <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
              <img src="assets/img/image12.png" alt="Beauty" />
            </div>

            <div className="fade-in prod-dtls">
              <p>S-Series Comfort Chair S-Series Comfort Chair </p>
              <div className="ratings">
                <ul>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                </ul>
                <strong>(99)</strong>
              </div>
              <strong>₹3,750</strong>
            </div>
          </div>
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr">50% Off</span>
              <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
              <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
              <img src="assets/img/image13.png" alt="Personal Care" />
            </div>

            <div className="fade-in prod-dtls">
              <p>S-Series Comfort Chair S-Series Comfort Chair </p>
              <div className="ratings">
                <ul>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                </ul>
                <strong>(99)</strong>
              </div>
              <strong>₹3,750</strong>
            </div>
          </div>
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr">50% Off</span>
              <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
              <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
              <img src="assets/img/image14.png" alt="Home & Kitchen" />
            </div>

            <div className="fade-in prod-dtls">
              <p>S-Series Comfort Chair S-Series Comfort Chair </p>
              <div className="ratings">
                <ul>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                </ul>
                <strong>(99)</strong>
              </div>
              <strong>₹3,750</strong>
            </div>
          </div>

        </div>
      </div>
      <div className="daily-deal padding-left">
        <div className="daily-deal-left">
          <div className="section-header">
            <div className="fade-in section-title">Daily Deals</div>
            <div className="deal-timer fade-in">
              <div className="deal-timer-dv"><span>Hours</span><strong>23</strong></div>
              <div className="deal-timer-dv"><span>&nbsp;</span><strong className="dotet">:</strong></div>
              <div className="deal-timer-dv"><span>Minutes</span><strong>07</strong></div>
              <div className="deal-timer-dv"><span>&nbsp;</span><strong className="dotet">:</strong></div>
              <div className="deal-timer-dv"><span>Seconds</span><strong>56</strong></div>
            </div>
            <a href="#" className="view-all fade-in">View All</a>
          </div>
          <div className="product-grid">
            <div className="fade-in category-item">
              <div className="fade-in category-item-img">

                <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
                <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
                <img src="assets/img/image9.png" alt="Fashion" />
              </div>
              <div className="fade-in prod-dtls">
                <p>S-Series Comfort Chair S-Series Comfort Chair </p>
                <div className="ratings">
                  <ul>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                  </ul>
                  <strong>(99)</strong>
                </div>
                <strong>₹3,750</strong>
              </div>
            </div>
            <div className="fade-in category-item">
              <div className="fade-in category-item-img">
                <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
                <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
                <img src="assets/img/image10.png" alt="Furniture" />
              </div>
              <div className="fade-in prod-dtls">
                <p>S-Series Comfort Chair S-Series Comfort Chair </p>
                <div className="ratings">
                  <ul>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                  </ul>
                  <strong>(99)</strong>
                </div>
                <strong>₹3,750</strong>
              </div>
            </div>
            <div className="fade-in category-item">
              <div className="fade-in category-item-img">

                <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
                <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
                <img src="assets/img/image11.png" alt="Electronics" />
              </div>

              <div className="fade-in prod-dtls">
                <p>S-Series Comfort Chair S-Series Comfort Chair </p>
                <div className="ratings">
                  <ul>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                  </ul>
                  <strong>(99)</strong>
                </div>
                <strong>₹3,750</strong>
              </div>
            </div>
            <div className="fade-in category-item">
              <div className="fade-in category-item-img">

                <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
                <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
                <img src="assets/img/image12.png" alt="Beauty" />
              </div>

              <div className="fade-in prod-dtls">
                <p>S-Series Comfort Chair S-Series Comfort Chair </p>
                <div className="ratings">
                  <ul>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                  </ul>
                  <strong>(99)</strong>
                </div>
                <strong>₹3,750</strong>
              </div>
            </div>
            <div className="fade-in category-item">
              <div className="fade-in category-item-img">

                <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
                <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
                <img src="assets/img/image13.png" alt="Personal Care" />
              </div>

              <div className="fade-in prod-dtls">
                <p>S-Series Comfort Chair S-Series Comfort Chair </p>
                <div className="ratings">
                  <ul>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                  </ul>
                  <strong>(99)</strong>
                </div>
                <strong>₹3,750</strong>
              </div>
            </div>
            <div className="fade-in category-item">
              <div className="fade-in category-item-img">

                <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
                <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
                <img src="assets/img/image14.png" alt="Home & Kitchen" />
              </div>

              <div className="fade-in prod-dtls">
                <p>S-Series Comfort Chair S-Series Comfort Chair </p>
                <div className="ratings">
                  <ul>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                  </ul>
                  <strong>(99)</strong>
                </div>
                <strong>₹3,750</strong>
              </div>
            </div>

          </div>
        </div>
        <div className="macbook-section">
          <img src="assets/img/image21.png" alt="Macbook" className="macbook-image" />
          <div className="macbook-text deal-dive">
            <div className="macbook-title fade-in">Macbook <span>Air</span></div>
            <div className="macbook-description fade-in">The new 15-inch MacBook Air makes room for more of what you love with
              a
              spacious Liquid Retina display.</div>
            <button className="macbook-button fade-in">Shop Now</button>
          </div>
        </div>
      </div>
      <div className="topsale padding">
        <div className="section-header">
          <div className="fade-in section-title">Top Sell</div>
          <a href="#" className="view-all fade-in">View All</a>
        </div>
        <div className="product-grid">
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr best-sale">Best Seller</span>
              <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
              <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
              <img src="assets/img/image9.png" alt="Fashion" />
            </div>
            <div className="fade-in prod-dtls">
              <p>S-Series Comfort Chair S-Series Comfort Chair </p>
              <div className="ratings">
                <ul>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                </ul>
                <strong>(99)</strong>
              </div>
              <strong>₹3,750</strong>
            </div>
          </div>
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr best-sale">Best Seller</span>
              <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
              <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
              <img src="assets/img/image10.png" alt="Furniture" />
            </div>

            <div className="fade-in prod-dtls">
              <p>S-Series Comfort Chair S-Series Comfort Chair </p>
              <div className="ratings">
                <ul>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                </ul>
                <strong>(99)</strong>
              </div>
              <strong>₹3,750</strong>
            </div>
          </div>
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr best-sale">Best Seller</span>
              <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
              <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
              <img src="assets/img/image11.png" alt="Electronics" />
            </div>

            <div className="fade-in prod-dtls">
              <p>S-Series Comfort Chair S-Series Comfort Chair </p>
              <div className="ratings">
                <ul>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                </ul>
                <strong>(99)</strong>
              </div>
              <strong>₹3,750</strong>
            </div>
          </div>
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr best-sale">Best Seller</span>
              <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
              <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
              <img src="assets/img/image12.png" alt="Beauty" />
            </div>

            <div className="fade-in prod-dtls">
              <p>S-Series Comfort Chair S-Series Comfort Chair </p>
              <div className="ratings">
                <ul>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                </ul>
                <strong>(99)</strong>
              </div>
              <strong>₹3,750</strong>
            </div>
          </div>
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr best-sale">Best Seller</span>
              <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
              <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
              <img src="assets/img/image13.png" alt="Personal Care" />
            </div>

            <div className="fade-in prod-dtls">
              <p>S-Series Comfort Chair S-Series Comfort Chair </p>
              <div className="ratings">
                <ul>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                </ul>
                <strong>(99)</strong>
              </div>
              <strong>₹3,750</strong>
            </div>
          </div>
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr best-sale">Best Seller</span>
              <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
              <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
              <img src="assets/img/image14.png" alt="Home & Kitchen" />
            </div>

            <div className="fade-in prod-dtls">
              <p>S-Series Comfort Chair S-Series Comfort Chair </p>
              <div className="ratings">
                <ul>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                </ul>
                <strong>(99)</strong>
              </div>
              <strong>₹3,750</strong>
            </div>
          </div>

        </div>
      </div>
      <div className="topsale resaleprod padding">
        <div className="section-header">
          <div className="fade-in section-title">Resale Products</div>
          <a href="#" className="view-all fade-in">View All</a>
        </div>
        <div className="product-grid">
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr best-sale">Featured</span>
              <span className="spn-offr resale">Resale</span>
              <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
              <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
              <img src="assets/img/image9.png" alt="Fashion" />
            </div>
            <div className="fade-in prod-dtls">
              <p>S-Series Comfort Chair S-Series Comfort Chair </p>
              <div className="ratings">
                <ul>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                </ul>
                <strong>(99)</strong>
              </div>
              <strong>₹3,750</strong>
            </div>
          </div>
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr best-sale">Featured</span>
              <span className="spn-offr resale">Resale</span>
              <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
              <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
              <img src="assets/img/image10.png" alt="Furniture" />
            </div>

            <div className="fade-in prod-dtls">
              <p>S-Series Comfort Chair S-Series Comfort Chair </p>
              <div className="ratings">
                <ul>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                </ul>
                <strong>(99)</strong>
              </div>
              <strong>₹3,750</strong>
            </div>
          </div>
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr best-sale">Featured</span>
              <span className="spn-offr resale">Resale</span>
              <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
              <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
              <img src="assets/img/image11.png" alt="Electronics" />
            </div>

            <div className="fade-in prod-dtls">
              <p>S-Series Comfort Chair S-Series Comfort Chair </p>
              <div className="ratings">
                <ul>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                </ul>
                <strong>(99)</strong>
              </div>
              <strong>₹3,750</strong>
            </div>
          </div>
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr best-sale">Featured</span>
              <span className="spn-offr resale">Resale</span>
              <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
              <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
              <img src="assets/img/image12.png" alt="Beauty" />
            </div>

            <div className="fade-in prod-dtls">
              <p>S-Series Comfort Chair S-Series Comfort Chair </p>
              <div className="ratings">
                <ul>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                </ul>
                <strong>(99)</strong>
              </div>
              <strong>₹3,750</strong>
            </div>
          </div>
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr best-sale">Featured</span>
              <span className="spn-offr resale">Resale</span>
              <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
              <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
              <img src="assets/img/image13.png" alt="Personal Care" />
            </div>

            <div className="fade-in prod-dtls">
              <p>S-Series Comfort Chair S-Series Comfort Chair </p>
              <div className="ratings">
                <ul>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                </ul>
                <strong>(99)</strong>
              </div>
              <strong>₹3,750</strong>
            </div>
          </div>
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr best-sale">Featured</span>
              <span className="spn-offr resale">Resale</span>
              <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
              <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
              <img src="assets/img/image14.png" alt="Home & Kitchen" />
            </div>

            <div className="fade-in prod-dtls">
              <p>S-Series Comfort Chair S-Series Comfort Chair </p>
              <div className="ratings">
                <ul>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                </ul>
                <strong>(99)</strong>
              </div>
              <strong>₹3,750</strong>
            </div>
          </div>

        </div>
      </div>
      <div className="add padding">
        <div className="addinner">
          <div className="box single-box">
            <img src="assets/img/prod1.png" alt="PlayStation 5" />
            <div className="product-content">
              <h3 className="fade-in">PlayStation 5</h3>
              <p className="fade-in">
                Black and White version of the PS5 coming out on sale.
              </p>
              <a href="#" className="shop-button fade-in">Shop Now</a>
            </div>
          </div>

          <div className="box double-box">
            <div className="box-item"><img src="assets/img/prod2.png" alt="Women's Collections" />
              <div className="product-content">
                <h3 className="fade-in">Women's Collections</h3>
                <p className="fade-in">
                  Featured women collections that give you another vibe.
                </p>
                <a href="#" className="shop-button fade-in">Shop Now</a>
              </div>
            </div>
            <div className="box-inner">
              <div className="box-item">
                <img src="assets/img/prod3.png" alt="Amazon Wireless Speakers" />
                <div className="product-content">
                  <h3 className="fade-in">Speakers</h3>
                  <p className="fade-in">
                    Amazon wireless speakers
                  </p>
                  <a href="#" className="shop-button fade-in">Shop Now</a>
                </div>
              </div>
              <div className="box-item">
                <img src="assets/img/prod4.png" alt="GUCCI INTENSE OUD EDP" />
                <div className="product-content">
                  <h3 className="fade-in">Perfume</h3>
                  <p className="fade-in">
                    GUCCI INTENSE OUD EDP
                  </p>
                  <a href="#" className="shop-button fade-in">Shop Now</a>
                </div>
              </div>
            </div>

          </div>





        </div>
      </div>
      <div className="topsale auctnprod padding">
        <div className="section-header">
          <div className="fade-in section-title">Auction Products</div>
          <a href="#" className="view-all fade-in">View All</a>
        </div>
        <div className="product-grid">
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr best-sale">Featured</span>
              <span className="spn-offr auctn">Auction</span>
              <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
              <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
              <img src="assets/img/image9.png" alt="Fashion" />
            </div>
            <div className="fade-in prod-dtls">
              <p>S-Series Comfort Chair S-Series Comfort Chair </p>
              <div className="ratings">
                <ul>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                </ul>
                <strong>(99)</strong>
              </div>
              <strong>₹3,750</strong>
            </div>
          </div>
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr best-sale">Featured</span>
              <span className="spn-offr auctn">Auction</span>
              <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
              <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
              <img src="assets/img/image10.png" alt="Furniture" />
            </div>

            <div className="fade-in prod-dtls">
              <p>S-Series Comfort Chair S-Series Comfort Chair </p>
              <div className="ratings">
                <ul>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                </ul>
                <strong>(99)</strong>
              </div>
              <strong>₹3,750</strong>
            </div>
          </div>
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr best-sale">Featured</span>
              <span className="spn-offr auctn">Auction</span>
              <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
              <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
              <img src="assets/img/image11.png" alt="Electronics" />
            </div>

            <div className="fade-in prod-dtls">
              <p>S-Series Comfort Chair S-Series Comfort Chair </p>
              <div className="ratings">
                <ul>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                </ul>
                <strong>(99)</strong>
              </div>
              <strong>₹3,750</strong>
            </div>
          </div>
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr best-sale">Featured</span>
              <span className="spn-offr auctn">Auction</span>
              <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
              <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
              <img src="assets/img/image12.png" alt="Beauty" />
            </div>

            <div className="fade-in prod-dtls">
              <p>S-Series Comfort Chair S-Series Comfort Chair </p>
              <div className="ratings">
                <ul>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                </ul>
                <strong>(99)</strong>
              </div>
              <strong>₹3,750</strong>
            </div>
          </div>
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr best-sale">Featured</span>
              <span className="spn-offr auctn">Auction</span>
              <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
              <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
              <img src="assets/img/image13.png" alt="Personal Care" />
            </div>

            <div className="fade-in prod-dtls">
              <p>S-Series Comfort Chair S-Series Comfort Chair </p>
              <div className="ratings">
                <ul>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                </ul>
                <strong>(99)</strong>
              </div>
              <strong>₹3,750</strong>
            </div>
          </div>
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr best-sale">Featured</span>
              <span className="spn-offr auctn">Auction</span>
              <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
              <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
              <img src="assets/img/image14.png" alt="Home & Kitchen" />
            </div>

            <div className="fade-in prod-dtls">
              <p>S-Series Comfort Chair S-Series Comfort Chair </p>
              <div className="ratings">
                <ul>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill active"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                </ul>
                <strong>(99)</strong>
              </div>
              <strong>₹3,750</strong>
            </div>
          </div>

        </div>
      </div>
      <div className="daily-deal bargain-prod padding">
        <div className="daily-deal-left">
          <div className="section-header">
            <div className="fade-in section-title">Bargain Product</div>
            <a href="#" className="view-all fade-in">View All</a>
          </div>
          <div className="product-grid">
            <div className="fade-in category-item">
              <div className="fade-in category-item-img">
                <span className="spn-offr bargain">Bargain</span>
                <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
                <img src="assets/img/image9.png" alt="Fashion" />
              </div>
              <div className="fade-in prod-dtls">
                <p>S-Series Comfort Chair S-Series Comfort Chair </p>
                <div className="ratings">
                  <ul>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                  </ul>
                  <strong>(99)</strong>
                </div>
                <strong>₹3,750</strong>
              </div>
            </div>
            <div className="fade-in category-item">
              <div className="fade-in category-item-img">
                <span className="spn-offr bargain">Bargain</span>
                <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
                <img src="assets/img/image10.png" alt="Furniture" />
              </div>

              <div className="fade-in prod-dtls">
                <p>S-Series Comfort Chair S-Series Comfort Chair </p>
                <div className="ratings">
                  <ul>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                  </ul>
                  <strong>(99)</strong>
                </div>
                <strong>₹3,750</strong>
              </div>
            </div>
            <div className="fade-in category-item">
              <div className="fade-in category-item-img">
                <span className="spn-offr bargain">Bargain</span>
                <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
                <img src="assets/img/image11.png" alt="Electronics" />
              </div>

              <div className="fade-in prod-dtls">
                <p>S-Series Comfort Chair S-Series Comfort Chair </p>
                <div className="ratings">
                  <ul>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                  </ul>
                  <strong>(99)</strong>
                </div>
                <strong>₹3,750</strong>
              </div>
            </div>
            <div className="fade-in category-item">
              <div className="fade-in category-item-img">
                <span className="spn-offr bargain">Bargain</span>
                <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
                <img src="assets/img/image12.png" alt="Beauty" />
              </div>

              <div className="fade-in prod-dtls">
                <p>S-Series Comfort Chair S-Series Comfort Chair </p>
                <div className="ratings">
                  <ul>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                  </ul>
                  <strong>(99)</strong>
                </div>
                <strong>₹3,750</strong>
              </div>
            </div>
            <div className="fade-in category-item">
              <div className="fade-in category-item-img">
                <span className="spn-offr bargain">Bargain</span>
                <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
                <img src="assets/img/image13.png" alt="Personal Care" />
              </div>

              <div className="fade-in prod-dtls">
                <p>S-Series Comfort Chair S-Series Comfort Chair </p>
                <div className="ratings">
                  <ul>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                  </ul>
                  <strong>(99)</strong>
                </div>
                <strong>₹3,750</strong>
              </div>
            </div>
            <div className="fade-in category-item">
              <div className="fade-in category-item-img">
                <span className="spn-offr bargain">Bargain</span>
                <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
                <img src="assets/img/image14.png" alt="Home & Kitchen" />
              </div>

              <div className="fade-in prod-dtls">
                <p>S-Series Comfort Chair S-Series Comfort Chair </p>
                <div className="ratings">
                  <ul>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                  </ul>
                  <strong>(99)</strong>
                </div>
                <strong>₹3,750</strong>
              </div>
            </div>

          </div>
        </div>
        <div className="macbook-section">
          <img src="assets/img/banner2.png" alt="Macbook" className="macbook-image" />
          <div className="macbook-text">
            <div className="macbook-title"><span className="fade-in">Register as a</span>
              <strong className="fade-in">Srutle Seller</strong>
            </div>
            <div className="macbook-description fade-in">Start your Online Business with Zero Investment</div>
            <button className="macbook-button fade-in">Join Now</button>
          </div>
        </div>
      </div>
      <div className="topsale branddeal padding">
        <div className="section-header">
          <div className="fade-in section-title">Brand Deals </div>
          <a href="#" className="view-all fade-in">View All</a>
        </div>
        <div className="product-grid">
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr brandname">Brand Name</span>
              <img src="assets/img/image9.png" alt="Fashion" />
            </div>
            <div className="fade-in prod-dtls branddle">
              <strong>Up to 50% off</strong>
              <p>Lorem ipsum doler sit</p>
            </div>
          </div>
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr brandname">Brand Name</span>
              <img src="assets/img/image9.png" alt="Fashion" />
            </div>
            <div className="fade-in prod-dtls branddle">
              <strong>Up to 50% off</strong>
              <p>Lorem ipsum doler sit</p>
            </div>
          </div>
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr brandname">Brand Name</span>
              <img src="assets/img/image9.png" alt="Fashion" />
            </div>
            <div className="fade-in prod-dtls branddle">
              <strong>Up to 50% off</strong>
              <p>Lorem ipsum doler sit</p>
            </div>
          </div>
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr brandname">Brand Name</span>
              <img src="assets/img/image9.png" alt="Fashion" />
            </div>
            <div className="fade-in prod-dtls branddle">
              <strong>Up to 50% off</strong>
              <p>Lorem ipsum doler sit</p>
            </div>
          </div>
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr brandname">Brand Name</span>
              <img src="assets/img/image9.png" alt="Fashion" />
            </div>
            <div className="fade-in prod-dtls branddle">
              <strong>Up to 50% off</strong>
              <p>Lorem ipsum doler sit</p>
            </div>
          </div>
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr brandname">Brand Name</span>
              <img src="assets/img/image9.png" alt="Fashion" />
            </div>
            <div className="fade-in prod-dtls branddle">
              <strong>Up to 50% off</strong>
              <p>Lorem ipsum doler sit</p>
            </div>
          </div>
          <div className="fade-in category-item">
            <div className="fade-in category-item-img">
              <span className="spn-offr brandname">Brand Name</span>
              <img src="assets/img/image9.png" alt="Fashion" />
            </div>
            <div className="fade-in prod-dtls branddle">
              <strong>Up to 50% off</strong>
              <p>Lorem ipsum doler sit</p>
            </div>
          </div>



        </div>
      </div>
      <div className="category padding">
        <div className="category-inner">
          <div className="category-div singlee">
            <img src="assets/img/image16.png" alt="" />
            <a href="#" className="view-all fade-in">View All</a>
          </div>
        </div>
        <div className="category-inner mid-div">
          <div className="category-div ">
            <img src="assets/img/banner3.png" alt="" />
            <div className="product-content">
              <div className="sale fade-in">Sale 35% off</div>
              <h2 className="fade-in">Smartphone BLU G91 Pro 2022</h2>
              <a href="" className="fade-in">Shop Now</a>
            </div>
          </div>
        </div>
        <div className="category-inner double-box">
          <div className="category-div">
            <img src="assets/img/image17.png" alt="" />
            <div className="product-content">
              <h3 className="fade-in">HyperX Cloud II Wireless</h3>
              <div className="sale fade-in">Sale 35% off</div>
              <a href="#" className="view-all">View All</a>
            </div>
          </div>
          <div className="category-div">
            <img src="assets/img/image18.png" alt="" />
            <div className="product-content">
              <h3 className="fade-in">Selected Novelty Products</h3>
              <div className="sale">Up to 75% off</div>
            </div>
          </div>
        </div>

      </div>
      <div className="daily-deal spancer-prod padding-left">
        <div className="daily-deal-left">
          <div className="section-header">
            <div className="fade-in section-title">Sponsored Products</div>
            <a href="#" className="view-all fade-in">View All</a>
          </div>
          <div className="product-grid">
            <div className="fade-in category-item">
              <div className="fade-in category-item-img">

                <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
                <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
                <img src="assets/img/image12.png" alt="Beauty" />
              </div>

              <div className="fade-in prod-dtls">
                <p>S-Series Comfort Chair S-Series Comfort Chair </p>
                <div className="ratings">
                  <ul>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                  </ul>
                  <strong>(99)</strong>
                </div>
                <strong>₹3,750</strong>
              </div>
            </div>
            <div className="fade-in category-item">
              <div className="fade-in category-item-img">

                <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
                <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
                <img src="assets/img/image13.png" alt="Personal Care" />
              </div>

              <div className="fade-in prod-dtls">
                <p>S-Series Comfort Chair S-Series Comfort Chair </p>
                <div className="ratings">
                  <ul>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                  </ul>
                  <strong>(99)</strong>
                </div>
                <strong>₹3,750</strong>
              </div>
            </div>
            <div className="fade-in category-item">
              <div className="fade-in category-item-img">

                <button className="btn ntn-favr"><i className="bi bi-heart"></i></button>
                <button className="btn ntn-view"><i className="bi bi-eye"></i></button>
                <img src="assets/img/image14.png" alt="Home & Kitchen" />
              </div>

              <div className="fade-in prod-dtls">
                <p>S-Series Comfort Chair S-Series Comfort Chair </p>
                <div className="ratings">
                  <ul>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill active"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                    <li><i className="bi bi-star-fill"></i></li>
                  </ul>
                  <strong>(99)</strong>
                </div>
                <strong>₹3,750</strong>
              </div>
            </div>

          </div>
        </div>
        <div className="macbook-section">
          <img src="assets/img/image19.png" alt="Macbook" className="macbook-image" />
          <div className="macbook-text deal-dive">
            <div className="macbook-title fade-in">Enhance Your Music Experience</div>

          </div>
        </div>
      </div>
      <div className="topsale topbrand padding">
        <div className="section-header">
          <div className="fade-in section-title">Top Brands </div>
          <a href="#" className="view-all fade-in">View All</a>
        </div>
        <div className="product-grid">
          <div className="fade-in category-item">
            <img src="assets/img/image20.png" alt="Fashion" />
          </div>
          <div className="fade-in category-item">
            <img src="assets/img/image20.png" alt="Furniture" />
          </div>
          <div className="fade-in category-item">
            <img src="assets/img/image20.png" alt="Electronics" />
          </div>
          <div className="fade-in category-item">
            <img src="assets/img/image20.png" alt="Beauty" />
          </div>
          <div className="fade-in category-item">
            <img src="assets/img/image20.png" alt="Personal Care" />
          </div>
          <div className="fade-in category-item">
            <img src="assets/img/image20.png" alt="Home & Kitchen" />
          </div>
          <div className="fade-in category-item">
            <img src="assets/img/image20.png" alt="Home & Kitchen" />
          </div>
          <div className="fade-in category-item">
            <img src="assets/img/image20.png" alt="Home & Kitchen" />
          </div>
          <div className="fade-in category-item">
            <img src="assets/img/image20.png" alt="Home & Kitchen" />
          </div>

        </div>
      </div>
    </>
  )
}

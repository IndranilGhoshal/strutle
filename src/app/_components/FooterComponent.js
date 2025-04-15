import Image from 'next/image'
import React from 'react'

export default function FooterComponent() {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">

          <div className="footer-column contact-info">
            <h3>Contact Us</h3>
            <p><i className="bi bi-headset"></i> <strong>Call Us:</strong> (+91) 12345 78912</p>
            <p><i className="bi bi-send-fill"></i> <strong>Email:</strong> sale@srutle.com</p>
            <p><i className="bi-alarm"></i> <strong>Hours:</strong> 10:00 AM - 8:00 PM, Mon - Sat</p>
            <div className="clllg">
              <Image
                src={"/assets/img/cal.svg"}
                alt="Fashion"
                width={30}
                height={30}
              />
              <div><strong>1900-6666</strong>
                <p>(Working 8:00 AM - 11:00 PM) </p>
              </div>
            </div>
            <div className="clllg">
              <Image
                src={"/assets/img/cal.svg"}
                alt="Fashion"
                width={30}
                height={30}
              />
              <div><strong>1900-8888</strong>
                <p>(24/7 Support Center)</p>
              </div>
            </div>
          </div>

          <div className="footer-column">
            <h3>Company</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Delivery Information</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Support Center</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Account</h3>
            <ul>
              <li><a href="#">Sign In</a></li>
              <li><a href="#">View Cart</a></li>
              <li><a href="#">My Wishlist</a></li>
              <li><a href="#">Track My Order</a></li>
              <li><a href="#">Help Ticket</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Corporate</h3>
            <ul>
              <li><a href="#">Become a Seller</a></li>
              <li><a href="#">Affiliate Program</a></li>
              <li><a href="#">Join as Partner</a></li>
              <li><a href="#">Accessibility</a></li>
              <li><a href="#">Promotions</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Help</h3>
            <ul>
              <li><a href="#">Payment</a></li>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Return & Cancellation</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-column install-app">
            <h3>Install App</h3>
            <div className="app-links">
              <a href="#">
                <Image
                  src={"/assets/img/app1.png"}
                  alt="Fashion"
                  width={100}
                  height={100}
                />
              </a>
              <a href="#">
                <Image
                  src={"/assets/img/app2.png"}
                  alt="Fashion"
                  width={100}
                  height={100}
                />
              </a>
            </div>
            <div className="social-links">
              <h3>Follow Us</h3>
              <a href="#">
                <Image
                  src={"/assets/img/socl1.png"}
                  alt="Fashion"
                  width={100}
                  height={100}
                />
              </a>
              <a href="#"><Image
                src={"/assets/img/socl2.png"}
                alt="Fashion"
                width={100}
                height={100}
              /></a>
              <a href="#">
                <Image
                  src={"/assets/img/socl3.png"}
                  alt="Fashion"
                  width={100}
                  height={100}
                />
              </a>
              <a href="#">
                <Image
                  src={"/assets/img/socl4.png"}
                  alt="Fashion"
                  width={100}
                  height={100}
                />
              </a>
              <a href="#">
                <Image
                  src={"/assets/img/socl5.png"}
                  alt="Fashion"
                  width={100}
                  height={100}
                />
              </a>
            </div>
          </div>

        </div>
      </footer>
    </>
  )
}

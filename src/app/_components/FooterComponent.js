import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { getLocalStorageData, opneLoginModal, opneWorkinProgresModal, removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common'
import { Modal } from "react-bootstrap";

export default function FooterComponent() {
  const router = useRouter()
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false)
  const goto = (path) => {
    showLoader()
    if (path == "/admin" || path == "/seller") {
      removeLocalStorageData("pathName")
      router.push(path)
    } else {
      removeLocalStorageData("pathName")
      setLocalStorageData('pathName', path)
      router.push("/consumer" + path)
    }
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }

  const checkuser = (path) => {
    if (!getLocalStorageData('consumer')?._id) {
      opneLoginModal()
    } else {
      goto(path)
    }
  }
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
              <li><a onClick={() => { goto("/aboutus") }}>About Us</a></li>
              <li><a onClick={() => { goto("/deliveryinformation") }}>Delivery Information</a></li>
              <li><a onClick={() => { goto("/privacypolicy") }}>Privacy Policy</a></li>
              <li><a onClick={() => { goto("/termsconditions") }}>Terms & Conditions</a></li>
              <li><a onClick={() => { goto("/contactus") }}>Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Account</h3>
            <ul>
              <li><a onClick={() => { opneLoginModal() }}>Sign In</a></li>
              <li><a onClick={() => { checkuser('/cart?type=cart') }}>View Cart</a></li>
              <li><a onClick={() => { checkuser('/myaccount?tab=my-favrot-tab') }}>My Favorites</a></li>
              <li><a onClick={() => { checkuser('/myaccount?tab=my-order-tab') }}>Track My Order</a></li>
              <li><a onClick={() => { opneWorkinProgresModal() }}>Help Ticket</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Corporate</h3>
            <ul>
              <li><a onClick={() => { goto("/admin") }}>Admin Login</a></li>
              <li><a onClick={() => { goto("/seller") }}>Seller Login</a></li>
              <li><a onClick={() => { opneWorkinProgresModal() }}>Affiliate Program</a></li>
              <li><a onClick={() => { opneWorkinProgresModal() }}>Join as Partner</a></li>
              <li><a onClick={() => { opneWorkinProgresModal() }}>Promotions</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Help</h3>
            <ul>
              <li><a onClick={() => { opneWorkinProgresModal() }}>Payment</a></li>
              <li><a onClick={() => { opneWorkinProgresModal() }}>Shipping</a></li>
              <li><a onClick={() => { opneWorkinProgresModal() }}>Return & Cancellation</a></li>
              <li><a onClick={() => { goto("/faq") }}>FAQ</a></li>
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
      <a id="workinprogressbtn" style={{ display: "none" }} onClick={handleShow}>work</a>
      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        onHide={handleClose}
        size='md'
      >
        <Modal.Body style={{ padding: '10px' }}>
          <Modal.Header closeButton>
          <Modal.Title>Work in Progress!</Modal.Title>
        </Modal.Header>
          <div><Image width={600} height={100} alt='no' src={'/assets/img/work-in-progress.png'} /></div>
        </Modal.Body>
      </Modal>
    </>
  )
}

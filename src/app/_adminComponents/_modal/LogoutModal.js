import { adminEvent } from '@/app/lib/apiService';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { hideLoader, removeLocalStorageData, setPassData, showLoader } from '@/app/lib/common'
import { useRouter } from 'next/navigation';

export default function LogoutModal() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const router = useRouter();

    const logoutEvent = async () => {
        showLoader()
        let logResp = await adminEvent("Logout")
        if (logResp.success) {
            handleClose()
            removeLocalStorageData("admin")
            removeLocalStorageData("pathName")
            removeLocalStorageData("adminrole")
            removeLocalStorageData('col-key');
            setPassData("You have successfully logged out from the system")
            router.push("/admin");
        } else {
            hideLoader()
            onLogout("Logout fail", false)
        }
    }
    return (
        <>
            <a className="dropdown-item" onClick={handleShow}>Sign out</a>

            <Modal
                show={show}
                backdrop="static"
                keyboard={false}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to log out?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button id="adminlogoutbtn" variant="primary" onClick={logoutEvent}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

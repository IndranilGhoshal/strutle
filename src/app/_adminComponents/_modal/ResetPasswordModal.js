'use client'
import { adminResetPasswordApi } from '@/app/lib/apiService';
import { hideLoader, removeLocalStorageData, setLocalStorageData, setPassData, showLoader } from '@/app/lib/common';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default function ResetPasswordModal({ id }) {
  useEffect(() => {
    hideLoader()
  }, [])
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [error, setError] = useState(false)
  const [passwordType, setPasswordType] = useState('password');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');

  const router = useRouter();

  const handleSubmit = async () => {
    let err = 0;
    setError(false)
    setValidPassword(false)

    if (!confirmPassword || !password) {
      setError(true)
      err++
    }
    if (confirmPassword !== password) {
      setValidPassword(true)
      err++
    }
    if (err == 0) {
      showLoader()
      let data = { id, password, accountreset:true }
      let response = await adminResetPasswordApi(data)
      if (response.success) {
        const { result, message } = response;
        // delete result.password;
        removeLocalStorageData('admin')
        hideLoader()
        setPassword('')
        setConfirmPassword('')
        setPassData(message)
        setLocalStorageData("admin", result)
        router.push("/admin/account");
      } else {
        hideLoader()
        toast.error(response.message)
      }
    }
  }


  return (
    <>
      <div className="modal fade show" id="accountpasswordresetmodal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: "block" }} data-bs-backdrop="static">
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5>Reset Password</h5>
            </div>
            <div className="modal-body">

              <div className="frm-resetPass">
                <div className="role_select">
                  <label className="mb-2">Password</label>
                  <div className='frm-resetPass-inpt'>
                    <input
                      type={passwordType}
                      className={`form-control ${error && !password ? "error-txt" : ""} ${validPassword ? "error-txt" : ""}`}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value) }}
                    />
                    {
                      passwordType === 'password'
                        ?
                        <>
                          <i className="bi bi-eye-slash-fill" onClick={() => { setPasswordType("text") }}></i>
                        </>
                        :
                        <>
                          <i className="bi bi-eye-fill" onClick={() => { setPasswordType("password") }}></i>
                        </>
                    }
                  </div>

                  {
                    error && !password && <div className='input-error'>Please enter password</div>
                  }
                </div>
                <div className="role_select mt-3">
                  <label className="mb-2">Confirm Password</label>
                  <div className='frm-resetPass-inpt'>
                    <input
                      type={confirmPasswordType}
                      className={`form-control ${error && !confirmPassword ? "error-txt" : ""} ${validPassword ? "error-txt" : ""}`}
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value) }}
                    />
                    {
                      confirmPasswordType === 'password'
                        ?
                        <>
                          <i className="bi bi-eye-slash-fill" onClick={() => { setConfirmPasswordType("text") }}></i>
                        </>
                        :
                        <>
                          <i className="bi bi-eye-fill" onClick={() => { setConfirmPasswordType("password") }}></i>
                        </>
                    }
                  </div>
                  {
                    error && !confirmPassword && <div className='input-error'>Please enter confirm password</div>
                  }
                  {
                    validPassword && !error && password && confirmPassword && <div className='input-error'>Password mismatch</div>
                  }
                </div>
                <div className="add_btn">
                  <button type="button" className="btn btn-primary" onClick={() => { handleSubmit() }}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

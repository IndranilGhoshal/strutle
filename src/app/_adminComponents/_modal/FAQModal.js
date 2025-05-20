import { adminFaqApi } from '@/app/lib/apiService';
import { hideLoader, showLoader } from '@/app/lib/common';
import Editor from '@/app/lib/Editor';
import React, { useState } from 'react'

export default function FAQModal({ onMessage }) {
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [status, setStatus] = useState('0');
    const [error, setError] = useState(false)

    const handleClose = () => {
        setQuestion('')
        setAnswer('')
        setStatus('0')
        setError(false)
    };


    const getModalClose = () => {
        const elem = document.getElementById('addfaqclsBtn');
        elem.click()
    }

    const addEvent = async () => {
        let err = 0;
        setError(false)
        if (!question || !answer) {
            setError(true)
            err++
        }
        if (err == 0) {
            showLoader()
            let data = { question, answer, status, addfaq: true }
            let response = await adminFaqApi(data)
            if (response.success) {
                hideLoader()
                handleClose()
                getModalClose()
                setTimeout(() => {
                    onMessage(response.message, true)
                }, 150);
            } else {
                hideLoader()
                onMessage(response.message, false)
            }
        }
    }

    return (
        <>
            <button className="btn down_btn" data-bs-toggle="modal" data-bs-target="#addfaq" onClick={()=>{setEditorLoaded(true)}}><i className="bi bi-plus"></i> Add New</button>


            <div className="modal fade" id="addfaq" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h5>Add FAQ</h5>
                            <button
                                id="addfaqclsBtn"
                                type="button"
                                className="close-button"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={handleClose}
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>
                        <div className="modal-body">

                            <div className="frm">
                                <div className="role_select">
                                    <label className="mb-2">Question</label>
                                    <input
                                        type="text"
                                        className={`form-control ${error && !question ? "error-txt" : ""}`}
                                        value={question}
                                        onChange={(e) => { setQuestion(e.target.value) }}
                                    />
                                    {
                                        error && !question && <div className='input-error'>Please enter question</div>
                                    }
                                </div>

                                <div className="role_select mt-3">
                                    <label className="mb-2">Answer</label>
                                    <Editor
                                        name="description"
                                        onChange={(data) => {
                                            setAnswer(data);
                                        }}
                                        editorLoaded={editorLoaded}
                                        value={answer}
                                    />
                                    {
                                        error && !answer && <div className='input-error'>Please enter answer</div>
                                    }
                                </div>

                                <div className="role_select mt-3">
                                    <label className="mb-2">Status</label>
                                    <div className="contct_no">
                                        <select
                                            className={`form-control ${error && !status ? "error-txt" : ""}`}
                                            value={status}
                                            onChange={(e) => { setStatus(e.target.value) }}
                                        >
                                            <option value="0">Active</option>
                                            <option value="1">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="add_btn">
                                    <button type="button" className="btn btn-primary" onClick={addEvent}>Add</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

import React, { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import "./styles.css";

const Modal = () => {

    const {modalData, setModalData} = useContext(GlobalContext);
    const { open, title, msg, callback, okBtn } = modalData;

    const handleYesClick = () => {
        callback && callback();
        setModalData({
            open: false,
        });
    };

    return (
        <>
        {
            open ? (
                <div className="modal" id="modal-one">
                    <div className="modal-dialog">
                        <div className="modal-header">
                            <h2>{title}</h2>
                            <a onClick={() => setModalData({open: false})} className="btn-close">×</a>
                        </div>
                        <div className="modal-body">
                            <p>{msg}</p>
                        </div>
                        <div className='modal-btnGrp'>
                            {okBtn ? (
                                <div className="modal-footer"> <button onClick={() => setModalData({open: false})}>OK</button></div>
                            ): (
                                <>
                                    <div className="modal-footer"> <button onClick={() => handleYesClick()}>Yes</button></div>
                                    <div className="modal-footer"> <button onClick={() => setModalData({open: false})}>No</button></div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ) : null
        }
        </>
    )
}

export default Modal;

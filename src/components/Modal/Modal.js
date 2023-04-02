import React, { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import "./styles.css";

const Modal = () => {

    const {modalData, setModalData} = useContext(GlobalContext);
    const { open, title, msg, callback } = modalData;

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
                            <div className="modal-footer"> <a onClick={() => handleYesClick()} className="btn">Yes</a></div>
                            <div className="modal-footer"> <a onClick={() => setModalData({open: false})} className="btn">No</a></div>
                        </div>
                    </div>
                </div>
            ) : null
        }
        </>
    )
}

export default Modal;

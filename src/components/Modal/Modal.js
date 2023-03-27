import React from 'react';
import "./styles.css";

const Modal = (props) => {
    const { open, setOpen, title, msg, callback } = props;
    const handleYesClick = () => {
        callback && callback();
        setOpen(false)
    }
    
    return (
        <>
        {
            open ? (
                <div className="modal" id="modal-one">
                    <div className="modal-dialog">
                        <div className="modal-header">
                            <h2>{title}</h2>
                            <a onClick={() => setOpen(false)} className="btn-close">×</a>
                        </div>
                        <div className="modal-body">
                            <p>{msg}</p>
                        </div>
                        <div className='modal-btnGrp'>
                            <div className="modal-footer"> <a onClick={() => handleYesClick()} className="btn">Yes</a></div>
                            <div className="modal-footer"> <a onClick={() => setOpen(false)} className="btn">No</a></div>
                        </div>
                    </div>
                </div>
            ) : null
        }
        </>
    )
}

export default Modal;

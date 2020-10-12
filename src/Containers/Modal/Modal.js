import React from 'react'
const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div className="modal-dailog">
                    <div className="modal-content">
                        {children}
                    </div>
                </div>
            </section>
        </div>
    );
};


export default Modal

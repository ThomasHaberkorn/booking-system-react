import React from "react";
import "./ConfirmModal.scss";

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="confirm-modal-overlay">
            <div className="confirm-modal">
                <p>{message}</p>
                <div className="modal-actions">
                    <button className="btn confirm" onClick={onConfirm}>
                        Ja
                    </button>
                    <button className="btn cancel" onClick={onCancel}>
                        Nein
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;

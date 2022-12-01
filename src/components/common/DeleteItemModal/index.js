import React from 'react';
import Modal from 'react-bootstrap/Modal';

const DeleteItemModal = ({ show, isProcessing, onConfirm, onHide, title }) => {
    return (
        <Modal show={show} fullscreen={'sm-down'} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Bạn có muốn xóa {title} này ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex gap-2 align-items-center py-3">
                    <button
                        className="button button-sm button-green"
                        type="button"
                        disabled={isProcessing}
                        onClick={onConfirm}
                    >
                        Xác nhận
                    </button>
                    <button
                        className="button button-sm button-secondary"
                        type="button"
                        disabled={isProcessing}
                        onClick={onHide}
                    >
                        Hủy
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default DeleteItemModal;

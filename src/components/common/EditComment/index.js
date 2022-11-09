import { notification } from 'antd';
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Input from '../Input/Input';

const EditComment = ({ show, setShow, formData, callback, promise, blogId }) => {
    const [content, setContent] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (formData?.content) {
            setContent(formData?.content);
        }
    }, [formData]);

    const onSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        const payloadToSubmit = {
            content,
        };
        if (formData?.blogCommentID) {
            payloadToSubmit.blogCommentId = formData?.blogCommentID;
        }
        if (blogId) {
            payloadToSubmit.blogId = blogId;
        }
        promise(payloadToSubmit)
            .then(({ data }) => {
                callback && callback(content);
                setContent('');
                setShow(null);
                setIsProcessing(false);
                notification.open({
                    message: data?.messContent,
                });
            })
            .catch((err) => {
                console.log(err);
                setIsProcessing(false);
            });
    };
    return (
        <Modal show={show} fullscreen={true} onHide={() => setShow(null)}>
            <Modal.Header closeButton>
                <Modal.Title>Thay đổi nội dung bình luận</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={onSubmit}>
                    <Input
                        type="textarea"
                        label="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Content ..."
                        textAreaRows={8}
                    />
                    <div className="d-flex justify-content-end">
                        <button className="button button-sm" type="submit" disabled={!content.trim() || isProcessing}>
                            Post
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default EditComment;

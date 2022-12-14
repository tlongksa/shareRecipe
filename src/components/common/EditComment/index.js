import { notification } from 'antd';
import React, { useState, useEffect } from 'react';
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
        <form onSubmit={onSubmit} className={`${show ? '' : 'd-none'}`}>
            <Input
                type="textarea"
                label="Nội dung"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Nội dung ..."
                textAreaRows={3}
            />
            <div className="d-flex justify-content-end gap-2 align-items-center">
                <button
                    className="button button-sm button-secondary"
                    type="button"
                    disabled={isProcessing}
                    onClick={() => setShow(null)}
                >
                    Hủy
                </button>
                <button
                    className="button button-sm button-green"
                    type="submit"
                    disabled={!content.trim() || isProcessing}
                >
                    Lưu
                </button>
            </div>
        </form>
    );
};

export default EditComment;

import React, { useState, useEffect, useContext } from 'react';
import {
    CheckCircleTwoTone,
    CloseCircleOutlined,
    DeleteOutlined,
    DislikeFilled,
    DislikeOutlined,
    EditOutlined,
    FlagFilled,
    FlagOutlined,
    LikeFilled,
    LikeOutlined,
} from '@ant-design/icons';
import { Avatar, Comment, notification, Tooltip } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Rating, Stack } from '@mui/material';
import './ViewComment.css';
import AuthContext from '../../context/auth-context';

const MyComment = (props) => {
    const { comment, cmtContent, onDelete } = props;
    const { dishId } = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const [action, setAction] = useState(null);
    const [star, setStar] = useState(0);
    const {
        userInfo: { accessToken },
    } = useContext(AuthContext);
    const [commentContent, setCommentContent] = useState(cmtContent);
    const token = `Bearer ${accessToken}`;

    useEffect(() => {
        if (comment && comment.checkLike) {
            setAction('liked');
        }
        if (comment && comment.checkDislike) {
            setAction('disliked');
        }
    }, [comment]);

    const like = () => {
        if (accessToken) {
            axios
                .post(
                    `/likeDishComment?dishCommentId=${comment.dishCommentID}`,
                    { commentContent },
                    {
                        headers: {
                            Authorization: token,
                        },
                    },
                )
                .then((response) => {
                    onDelete();
                    if (action === 'liked') {
                        setAction('');
                    } else {
                        setAction('liked');
                    }
                })
                .catch((err) => {});
        }
    };

    const dislike = () => {
        if (accessToken) {
            axios
                .post(
                    `/dislikeDishComment?dishCommentId=${comment.dishCommentID}`,
                    { commentContent },
                    {
                        headers: {
                            Authorization: token,
                        },
                    },
                )
                .then((response) => {
                    if (action === 'disliked') {
                        setAction('');
                    } else {
                        setAction('disliked');
                    }
                    onDelete();
                })
                .catch((err) => {});
        }
    };

    const flag = () => {
        if (accessToken) {
            axios
                .post(
                    `/reportDishComment?dishCommentId=${comment.dishCommentID}`,
                    { commentContent },
                    {
                        headers: {
                            Authorization: token,
                        },
                    },
                )
                .then((response) => {
                    setAction('flaged');
                })
                .catch((err) => {});
        }
    };
    const LoadEditComment = async (e) => {
        e.preventDefault();
        if (accessToken) {
            if (star) {
                const dishCommentID = comment.dishCommentID;
                await axios
                    .post(
                        `/saveDishComment`,
                        { dishId, content: commentContent, starRate: star, dishCommentId: dishCommentID },
                        {
                            headers: {
                                headers: { 'Content-Type': 'application/json' },
                                Authorization: token,
                            },
                        },
                    )
                    .then((response) => {
                        setIsEdit(false);
                        onDelete();
                        openNotification('Sửa bình luận thành công!');
                    })
                    .catch((err) => {});
            } else {
                openNotification('Vui lòng đánh giá công thức nấu ăn trước khi bình luận!');
            }
        } else {
            openNotification('Vui lòng đăng nhập trước khi bình luận');
        }
    };

    function handDelete(id) {
        if (accessToken) {
            axios
                .post(
                    `/deleteDishComment?dishCommentId=${id}`,
                    { commentContent },
                    {
                        headers: {
                            Authorization: token,
                        },
                    },
                )
                .then((response) => {
                    onDelete();
                    openNotification('Bình luận đã được xóa');
                })
                .catch((err) => {});
        }
    }
    function openNotification(message) {
        notification.open({
            message: message,
            icon: (
                <CheckCircleTwoTone
                    style={{
                        color: '#108ee9',
                    }}
                />
            ),
        });
    }
    const Cancel = (value) => {
        setIsEdit(!isEdit);
    };
    const handleChangeEditComment = (value) => {
        setIsEdit(!isEdit);
        setCommentContent(comment.content);
    };

    const actions = [
        <Tooltip key="comment-basic-like" title="Thích">
            <span onClick={like}>
                {React.createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                <span className="comment-action">{comment.totalLike}</span>
            </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Không thích">
            <span onClick={dislike}>
                {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                <span className="comment-action">{comment.totalDisLike}</span>
            </span>
        </Tooltip>,
        <Tooltip key="comment-basic-flag" title="Đánh giá sao"></Tooltip>,

        <Tooltip key="comment-basic-flag" title="Báo cáo">
            <span onClick={flag} className="comment-action">
                {React.createElement(action === 'flaged' ? FlagFilled : FlagOutlined)}
            </span>
        </Tooltip>,
    ];

    return (
        <div className="my-comment">
            <Comment
                actions={actions}
                author={<p>{comment.accountUserName}</p>}
                avatar={<Avatar src={comment.avatarImage} alt={comment.accountUserName} />}
                content={
                    <p>
                        <h6> {comment.content}</h6>
                        <div className="actions-hover">
                            <DeleteOutlined
                                onClick={() => handDelete(comment.dishCommentID)}
                                className="styles-icon "
                            />
                            <EditOutlined
                                onClick={() => handleChangeEditComment(comment.dishCommentID)}
                                className="styles-icon hidden"
                            />
                        </div>
                        <div style={{ fontSize: '16px' }}>
                            Đánh giá :
                            <Rating
                                style={{ marginTop: '10px', fontSize: '16px' }}
                                name="read-only"
                                value={comment.startRate}
                                readOnly
                            />
                        </div>
                    </p>
                }
                datetime={
                    <Tooltip title="">
                        <span>{comment.updateDate}</span>
                    </Tooltip>
                }
            />
            {isEdit && (
                <Form onSubmit={LoadEditComment} autoComplete={'off'}>
                    <Form.Group className="mb-3" controlId="commentContent">
                        <CloseCircleOutlined onClick={() => Cancel(comment.dishCommentID)} style={{ float: 'right' }} />
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                        />
                    </Form.Group>
                    <Stack spacing={1}>
                        Đánh giá công thức nấu ăn :
                        <Rating
                            name="half-rating"
                            defaultValue={0}
                            precision={1}
                            value={star}
                            onChange={(e) => setStar(e.target.value)}
                        />
                    </Stack>

                    <Button className="cmt" variant="info" type="submit">
                        Lưu
                    </Button>
                </Form>
            )}
        </div>
    );
};

export default MyComment;

import React, { useState, useEffect, useContext } from 'react';
import {
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
import { Avatar, Comment, Tooltip } from 'antd';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Rating, Stack } from '@mui/material';
import './ViewComment.scss';
import AuthContext from '../../context/auth-context';
import { createRecipeCommentRequest } from '../../api/requests';

const CommentItem = (props) => {
    const { comment, cmtContent, onDelete, onFetch, isAuth, isAdmin, username, onLike, onDislike, onFlag } = props;
    const { dishId } = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const [star, setStar] = useState(3);
    const {
        userInfo: { accessToken },
    } = useContext(AuthContext);
    const [commentContent, setCommentContent] = useState(cmtContent);

    useEffect(() => {
        if (cmtContent) {
            setCommentContent(cmtContent);
        }
    }, [cmtContent]);

    const LoadEditComment = async (e) => {
        e.preventDefault();
        if (accessToken) {
            if (star) {
                const dishCommentID = comment.dishCommentID;
                await createRecipeCommentRequest({
                    dishId,
                    content: commentContent,
                    starRate: star,
                    dishCommentId: dishCommentID,
                })
                    .then(() => {
                        onFetch();
                        setIsEdit(false);
                        onDelete();
                        // openNotification('Sửa bình luận thành công!');
                    })
                    .catch((err) => {});
            } else {
                // openNotification('Vui lòng đánh giá công thức nấu ăn trước khi bình luận!');
            }
        } else {
            // openNotification('Vui lòng đăng nhập trước khi bình luận');
        }
    };

    const Cancel = (value) => {
        setIsEdit(!isEdit);
    };

    const handleChangeEditComment = (value) => {
        setIsEdit(!isEdit);
        setCommentContent(comment.content);
    };

    const actions = [
        <Tooltip key="comment-basic-like" title="Thích">
            <div
                className={`d-flex align-items-center gap-1 me-3 cursor-pointer ${isAuth ? '' : 'divDisabled'}`}
                onClick={() => onLike(comment.dishCommentID)}
            >
                {comment.checkLike ? (
                    <LikeFilled
                        style={{
                            fontSize: 18,
                        }}
                    />
                ) : (
                    <LikeOutlined
                        style={{
                            fontSize: 18,
                        }}
                    />
                )}
                <span className="comment-action__count">{comment.totalLike}</span>
            </div>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Không thích">
            <div
                className={`d-flex align-items-center gap-1 me-3 cursor-pointer ${isAuth ? '' : 'divDisabled'}`}
                onClick={() => onDislike(comment.dishCommentID)}
            >
                {comment.checkDislike ? (
                    <DislikeFilled
                        style={{
                            fontSize: 18,
                        }}
                    />
                ) : (
                    <DislikeOutlined
                        style={{
                            fontSize: 18,
                        }}
                    />
                )}
                <span className="comment-action__count">{comment.totalDisLike}</span>
            </div>
        </Tooltip>,
        <Tooltip key="comment-basic-flag" title="Đánh giá sao"></Tooltip>,
        <Tooltip key="comment-basic-flag" title="Báo cáo">
            <div
                onClick={() => onFlag(comment.dishCommentID)}
                className={`cursor-pointer d-flex align-items-center ${isAuth ? '' : 'divDisabled'} ${
                    username === comment.accountUserName ? 'divDisabled' : ''
                }`}
            >
                {comment.flag ? (
                    <FlagFilled
                        style={{
                            fontSize: 18,
                        }}
                    />
                ) : (
                    <FlagOutlined
                        style={{
                            fontSize: 18,
                        }}
                    />
                )}
                <span></span>
            </div>
        </Tooltip>,
    ];

    return (
        <div className="my-comment">
            <Comment
                actions={actions}
                author={
                    <strong
                        style={{
                            fontSize: 20,
                        }}
                    >
                        {comment.accountUserName}
                    </strong>
                }
                avatar={<Avatar src={comment.avatarImage} alt={comment.accountUserName} />}
                content={
                    <div className="comment-item__container">
                        <h5
                            dangerouslySetInnerHTML={{
                                __html: comment.content?.replaceAll('\n', '<br />'),
                            }}
                            className="comment-item__content"
                        />
                        <div
                            className={`d-flex gap-2 justify-content-end comment-item__change-actions ${
                                username === comment.accountUserName || isAdmin ? '' : 'd-none'
                            }`}
                        >
                            <DeleteOutlined
                                className="recipe-action__comment-icon"
                                onClick={() => onDelete(comment.dishCommentID)}
                            />
                            <EditOutlined
                                className={`recipe-action__comment-icon ${
                                    username === comment.accountUserName ? '' : 'd-none'
                                }`}
                                onClick={() => handleChangeEditComment(comment.dishCommentID)}
                            />
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <strong>Đánh giá :</strong>
                            <Rating
                                style={{ fontSize: 20, cursor: 'pointer' }}
                                name="read-only"
                                value={comment.startRate}
                                readOnly
                            />
                        </div>
                    </div>
                }
                datetime={
                    <Tooltip title="">
                        <span
                            style={{
                                fontSize: 20,
                            }}
                        >
                            {comment.updateDate}
                        </span>
                    </Tooltip>
                }
            />
            {isEdit && (
                <Form onSubmit={LoadEditComment} autoComplete={'off'}>
                    <Form.Group className="mb-3" controlId="commentContent">
                        <CloseCircleOutlined onClick={() => Cancel(comment.dishCommentID)} />
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
                            defaultValue={5}
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

export default CommentItem;

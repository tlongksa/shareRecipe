/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { Rating, Stack } from '@mui/material';
import Form from 'react-bootstrap/Form';
import CommentItem from './CommentItem';
import AuthContext from '../../context/auth-context';
import {
    createRecipeCommentRequest,
    deleteRecipeCommentRequest,
    dislikeRecipeCommentRequest,
    likeRecipeCommentRequest,
    reportRecipeCommentRequest,
} from '../../api/requests';
import RecipeContext from '../../context/recipe-context';
import Paginator from '../../components/common/Paginator';
import { ROLES } from '../../App';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { notification } from 'antd';

const RecipeComments = ({ dishId }) => {
    const [content, setContent] = useState('');
    const [star, setStar] = useState(3);
    const {
        userInfo: { accessToken, roles, username },
    } = useContext(AuthContext);
    const {
        recipeDetail: {
            comments: { list, isLoading, extraListInfo },
        },
        onFetchRecipeComments,
    } = useContext(RecipeContext);

    useEffect(() => {
        onFetchRecipeComments(dishId, 1);
    }, [dishId]);

    const addCommentHandler = (e) => {
        e.preventDefault();
        if (accessToken && star) {
            createRecipeCommentRequest({ dishId, content: content, starRate: star })
                .then(() => {
                    setContent('');
                    onFetchRecipeComments(dishId, extraListInfo.pageIndex);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const onLikeRecipeCmtHandler = (dishCommentID, commentContent) => {
        if (accessToken) {
            likeRecipeCommentRequest(dishCommentID, { commentContent })
                .then(() => {
                    onFetchRecipeComments(dishId, extraListInfo.pageIndex);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const onDislikeRecipeCmtHandler = (dishCommentID) => {
        if (accessToken) {
            dislikeRecipeCommentRequest(dishCommentID, null)
                .then((response) => {
                    onFetchRecipeComments(dishId, extraListInfo.pageIndex);
                })
                .catch((err) => {});
        }
    };

    const onFlagRecipeCmtHandler = (dishCommentID) => {
        if (accessToken) {
            reportRecipeCommentRequest(dishCommentID, null)
                .then((response) => {
                    onFetchRecipeComments(dishId, extraListInfo.pageIndex);
                })
                .catch((err) => {});
        }
    };

    function onDeleteRecipeCmtHandler(id) {
        if (accessToken) {
            deleteRecipeCommentRequest(id)
                .then((response) => {
                    onFetchRecipeComments(dishId, extraListInfo.pageIndex);
                    openNotification('Bình luận này đã được xóa');
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

    return (
        <section className={`${isLoading ? 'divDisabled' : ''}`}>
            <div className="view-cmt">
                <Form onSubmit={addCommentHandler} autoComplete={'off'}>
                    <Form.Group className="mb-3" controlId="commentContent">
                        <Form.Label>Bình luận</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Nhập nội dung bình luận..."
                            rows={3}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
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
                            disabled={!accessToken}
                        />
                    </Stack>
                    <hr />
                    <button className="button button-sm" type="submit" disabled={!accessToken}>
                        Thêm bình luận
                    </button>
                </Form>
                <br />
            </div>
            <div>
                {list.map((comment, index) => (
                    <CommentItem
                        key={index}
                        comment={comment}
                        cmtContent={content}
                        onFetch={() => onFetchRecipeComments(dishId, extraListInfo.pageIndex)}
                        isAuth={!!accessToken}
                        isAdmin={roles === ROLES.admin}
                        username={username}
                        onLike={onLikeRecipeCmtHandler}
                        onDislike={onDislikeRecipeCmtHandler}
                        onFlag={onFlagRecipeCmtHandler}
                        onDelete={onDeleteRecipeCmtHandler}
                    />
                ))}
                <Paginator
                    curPage={extraListInfo.pageIndex}
                    maxPage={extraListInfo.numOfPages}
                    scrollAfterClicking={false}
                    isLoading={false}
                    callback={(page) => {
                        onFetchRecipeComments(dishId, page);
                    }}
                />
            </div>
        </section>
    );
};
export default RecipeComments;

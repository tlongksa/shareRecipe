/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { Rating, Stack } from '@mui/material';
import Form from 'react-bootstrap/Form';
import CommentItem from './CommentItem';
import AuthContext from '../../context/auth-context';
import { createRecipeCommentRequest, getRecipeCommentsAuthRequest } from '../../api/requests';
import RecipeContext from '../../context/recipe-context';
import Paginator from '../../components/common/Paginator';

const RecipeComments = ({ dishId }) => {
    const [content, setContent] = useState('');
    const [star, setStar] = useState(3);
    const {
        userInfo: { accessToken },
    } = useContext(AuthContext);
    const [index] = useState(1);
    const {
        recipeDetail: {
            comments: { list, isLoading, extraListInfo },
        },
        onFetchRecipeComments,
    } = useContext(RecipeContext);

    useEffect(() => {
        onFetchRecipeComments(dishId, 1);
    }, [dishId]);

    const getListComment = () => {
        getRecipeCommentsAuthRequest(dishId, index)
            .then(({ data }) => {
                // setCommentList(data?.dishCommentAccountVoList);
            })
            .catch((err) => console.log(err));
    };

    const addCommentHandler = (e) => {
        e.preventDefault();
        if (accessToken && star) {
            createRecipeCommentRequest({ dishId, content: content, starRate: star })
                .then(() => {
                    onFetchRecipeComments(dishId, extraListInfo.pageIndex);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

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
                        />
                    </Stack>
                    <hr />
                    <button className="button button-sm" type="submit">
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
                        onDelete={getListComment}
                        onFetch={() => onFetchRecipeComments(dishId, extraListInfo.pageIndex)}
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

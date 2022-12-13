import { LoadingOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { createCategoryRequest, deleteCategoryRequest } from '../../../api/requests';
import RecipeCategoryDatalist from '../../../components/admin/recipe-category-datalist';
import DeleteItemModal from '../../../components/common/DeleteItemModal';
import RecipeContext from '../../../context/recipe-context';
import Modal from 'react-bootstrap/Modal';
import Input from '../../../components/common/Input/Input';
import './index.scss';
import { generateImageUrl } from '../../../utils';
import { fileUploadHandler } from '../../../hooks/useFileUpload';

const RecipeCategories = () => {
    const { onFetchRecipeCategories, categories, onRemoveCategoryFromList } = useContext(RecipeContext);
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedDeleteId, setSelectedDeleteId] = useState('');
    const [showNewCategory, setShowNewCategory] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState(null);
    const [categoryImageUrl, setCategoryImageUrl] = useState('');
    const [imgError, setImgError] = useState('');
    const [categoryNameErr, setCategoryNameError] = useState('');

    useEffect(() => {
        onFetchRecipeCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (categoryImage) {
            setCategoryImageUrl(generateImageUrl(categoryImage, setImgError));
        }
    }, [categoryImage]);

    useEffect(() => {
        if (selectedCategory?.dishCategoryID) {
            setCategoryName(selectedCategory?.name);
            setCategoryImageUrl(selectedCategory?.dishCategoryImage);
        }
    }, [selectedCategory]);

    const onDeleteCategoryHandler = () => {
        setIsProcessing(true);
        deleteCategoryRequest(selectedDeleteId)
            .then(({ data }) => {
                setIsProcessing(false);
                notification.open({
                    message: data?.messContent,
                });
                onRemoveCategoryFromList(selectedDeleteId);
                setSelectedDeleteId('');
                if (categories.list.length === 0) {
                    onFetchRecipeCategories();
                }
            })
            .catch((err) => {
                setIsProcessing(false);
                console.log(err);
            });
    };

    const onSubmitHandler = (payloadToSubmit) => {
        setIsProcessing(true);
        createCategoryRequest(payloadToSubmit)
            .then(({ data }) => {
                setCategoryImageUrl('');
                setCategoryName('');
                setCategoryImage(null);
                setShowNewCategory(false);
                setIsProcessing(false);
                setSelectedCategory(null);
                notification.open({
                    message: data?.messContent,
                });
                onFetchRecipeCategories();
            })
            .catch((err) => {
                console.log(err);
                setIsProcessing(false);
            });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!categoryName) {
            setCategoryNameError('Vui lòng nhập thể loại công thức');
            return;
        }

        if (categoryImage) {
            return fileUploadHandler(categoryImage, setIsProcessing, setImgError, (url) => {
                const payloadToSubmit = {
                    categoryName,
                    categoryImage: url,
                };
                if (selectedCategory?.dishCategoryID) {
                    payloadToSubmit.categoryId = selectedCategory?.dishCategoryID;
                }
                onSubmitHandler(payloadToSubmit);
            });
        }

        if (!categoryImage && !categoryImageUrl) {
            setImgError('Vui lòng chọn ảnh cho thể loại ');
            return;
        }

        const payloadToSubmit = {
            categoryName,
            categoryImage: categoryImageUrl,
        };
        if (selectedCategory?.dishCategoryID) {
            payloadToSubmit.categoryId = selectedCategory?.dishCategoryID;
        }
        onSubmitHandler(payloadToSubmit);
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0">Quản lí thể loại</h3>
                <button
                    className="button button-sm button-green d-flex align-items-center gap-2"
                    onClick={() => setShowNewCategory(true)}
                >
                    <PlusCircleOutlined />
                    <span>Thêm thể loại công thức</span>
                </button>
            </div>
            <RecipeCategoryDatalist
                list={categories.list}
                onDelete={(id) => setSelectedDeleteId(id)}
                onEdit={(item) => {
                    setSelectedCategory(item);
                    setShowNewCategory(true);
                }}
            />
            {categories.isLoading && (
                <div className="global-list__loader-container">
                    <LoadingOutlined className="global-list__loader-icon" />
                </div>
            )}
            <DeleteItemModal
                title="loại công thức"
                show={!!selectedDeleteId}
                onHide={() => setSelectedDeleteId('')}
                isProcessing={isProcessing}
                onConfirm={onDeleteCategoryHandler}
            />
            <Modal
                show={showNewCategory}
                fullscreen={true}
                onHide={() => {
                    setShowNewCategory(false);
                    setSelectedCategory(null);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{selectedCategory ? 'Cập nhật' : 'Thêm'} thể loại công thức</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={onSubmit}>
                        <Input
                            onChange={(e) => {
                                setCategoryName(e.target.value);
                                setCategoryNameError('');
                            }}
                            placeholder="Category Name"
                            label={'Category Name'}
                            value={categoryName}
                            error={categoryNameErr}
                            touched={true}
                            className="flex-fill"
                        />
                        <Input
                            type="file"
                            label="Category Image"
                            onChange={(e) => {
                                setImgError('');
                                setCategoryImage(e.target?.files?.[0]);
                            }}
                            touched={true}
                            error={imgError}
                        />
                        {categoryImageUrl && (
                            <div className="category-image__preview">
                                <img src={categoryImageUrl} alt="" />
                            </div>
                        )}
                        <div className="d-flex justify-content-end">
                            <button className="button button-sm button-green" type="submit" disabled={isProcessing}>
                                Đăng
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default RecipeCategories;

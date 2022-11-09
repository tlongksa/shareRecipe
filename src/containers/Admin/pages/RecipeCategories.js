import { LoadingOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { createCategoryRequest, deleteCategoryRequest } from '../../../api/requests';
import RecipeCategoryDatalist from '../../../components/admin/recipe-category-datalist';
import DeleteItemModal from '../../../components/common/DeleteItemModal';
import RecipeContext from '../../../context/recipe-context';
import Modal from 'react-bootstrap/Modal';
import Input from '../../../components/common/Input/Input';

const RecipeCategories = () => {
    const { onFetchRecipeCategories, categories, onRemoveCategoryFromList } = useContext(RecipeContext);
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedDeleteId, setSelectedDeleteId] = useState('');
    const [showNewCategory, setShowNewCategory] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState('');

    useEffect(() => {
        onFetchRecipeCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (selectedCategory?.dishCategoryID) {
            setCategoryName(selectedCategory?.name);
            setCategoryImage(selectedCategory?.dishCategoryImage);
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

    const onSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        const payloadToSubmit = {
            categoryName,
            categoryImage,
        };
        if (selectedCategory?.dishCategoryID) {
            payloadToSubmit.categoryId = selectedCategory?.dishCategoryID;
        }
        createCategoryRequest(payloadToSubmit)
            .then(({ data }) => {
                setCategoryImage('');
                setCategoryName('');
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

    return (
        <>
            <div className="d-flex justify-content-end mb-3">
                <button
                    className="button button-sm d-flex align-items-center gap-2"
                    onClick={() => setShowNewCategory(true)}
                >
                    <PlusCircleOutlined />
                    <span>Thêm loại công thức</span>
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
                    <Modal.Title>{selectedCategory ? 'Cập nhật' : 'Thêm'} loại công thức</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={onSubmit}>
                        <Input
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="Category Name"
                            label={'Category Name'}
                            value={categoryName}
                            error={null}
                            touched={true}
                            className="flex-fill"
                        />
                        <Input
                            label="Category Image Url"
                            value={categoryImage}
                            onChange={(e) => setCategoryImage(e.target.value)}
                            placeholder="Category Image ..."
                            textAreaRows={15}
                        />
                        <div className="d-flex justify-content-end">
                            <button
                                className="button button-sm"
                                type="submit"
                                disabled={!categoryImage.trim() || !categoryName.trim() || isProcessing}
                            >
                                Post
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default RecipeCategories;

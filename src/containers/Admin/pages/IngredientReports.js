import { LoadingOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { createIngredientReportRequest, removeIngredientReportRequest } from '../../../api/requests';
import DeleteItemModal from '../../../components/common/DeleteItemModal';
import Input from '../../../components/common/Input/Input';
import RecipeContext from '../../../context/recipe-context';
import Modal from 'react-bootstrap/Modal';
import IngredientReportDataList from '../../../components/admin/ingredient-report-datalist';

const IngredientReports = () => {
    const {
        ingReport: { error, extraListInfo, list, isLoading },
        onFetchMoreIngReport,
        onRemoveIngReportItemFromList,
    } = useContext(RecipeContext);
    const [search, setSearch] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedDeleteId, setSelectedDeleteId] = useState('');
    const [ingredientA, setIngredientA] = useState('');
    const [ingredientB, setIngredientB] = useState('');
    const [ingredientAErr, setIngredientAErr] = useState('');
    const [ingredientBErr, setIngredientBErr] = useState('');
    const [consequence, setConsequence] = useState('');
    const [selectedIngredientReport, setSelectedIngredientReport] = useState({});
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (selectedIngredientReport?.ingredientConflictId) {
            setIngredientA(selectedIngredientReport?.ingredientA);
            setIngredientB(selectedIngredientReport?.ingredientB);
            setConsequence(selectedIngredientReport?.consequence);
        }
    }, [selectedIngredientReport]);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!ingredientA) {
            setIngredientAErr('Vui lòng nhập nguyên liệu A');
            return;
        }

        if (!ingredientB) {
            setIngredientBErr('Vui lòng nhập nguyên liệu B');
            return;
        }

        setIsProcessing(true);

        const payloadToSubmit = {
            ingredientA,
            ingredientB,
            consequence,
        };
        if (selectedIngredientReport?.ingredientConflictId) {
            payloadToSubmit.ingredientConflictId = selectedIngredientReport?.ingredientConflictId;
        }
        createIngredientReportRequest(payloadToSubmit)
            .then(({ data }) => {
                onFetchMoreIngReport(1);
                setIngredientA('');
                setIngredientB('');
                setConsequence('');
                setShow(false);
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

    useEffect(() => {
        onFetchMoreIngReport(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteIngReportHandler = () => {
        setIsProcessing(true);
        removeIngredientReportRequest(selectedDeleteId)
            .then(({ data }) => {
                setIsProcessing(false);
                onRemoveIngReportItemFromList(selectedDeleteId);
                notification.open({
                    message: data?.messContent,
                });
                setSelectedDeleteId('');
                if (list.length === 0) {
                    onFetchMoreIngReport(1);
                }
            })
            .catch((err) => {
                console.log(err);
                setIsProcessing(false);
            });
    };

    if (!isLoading && error) {
        return <p className="error-message">{error?.message || 'Lỗi xảy ra!'}</p>;
    }

    return (
        <section className={`account-list__container pb-3 ${isLoading || isProcessing ? 'divDisabled' : ''}`}>
            <div className="d-flex justify-content-between align-align-items-center mb-3 gap-3 sm:flex-col">
                <h3 className="mb-0">Quản lý cảnh báo nguyên liệu</h3>
                <div className="d-flex gap-3">
                    <form
                        className="global-list_search shadow rounded-3"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (search.trim()) {
                                onFetchMoreIngReport(1, search);
                            }
                        }}
                    >
                        <SearchOutlined
                            className="global-list_search-icon cursor-pointer"
                            onClick={() => {
                                if (search.trim()) {
                                    onFetchMoreIngReport(1, search);
                                }
                            }}
                        />
                        <Input
                            onChange={(e) => {
                                const { value } = e.target;
                                setSearch(value);
                                if (!value.trim()) {
                                    onFetchMoreIngReport(1, '');
                                }
                            }}
                            placeholder="Tìm kiếm..."
                            value={search}
                            error={null}
                            touched={true}
                            containerNoMarginBottom
                            className="flex-fill"
                            inputClassName="border-0"
                        />
                    </form>
                    <button
                        className="button button-sm button-green d-flex align-items-center gap-2"
                        onClick={() => {
                            setShow(true);
                        }}
                    >
                        <PlusCircleOutlined />
                        <span>Thêm cảnh báo</span>
                    </button>
                </div>
            </div>
            <IngredientReportDataList
                list={list}
                maxPage={extraListInfo.numOfPages}
                currentPage={extraListInfo.pageIndex}
                onDelete={(id) => setSelectedDeleteId(id)}
                paginateCallback={(page) => {
                    onFetchMoreIngReport(page, search || '');
                }}
                onEdit={(item) => {
                    setSelectedIngredientReport(item);
                    setShow(true);
                }}
            />
            {!isLoading && !error && list.length === 0 && (
                <p className="f-24 text-center">Bạn chưa có quản lý cảnh báo nguyên liệu nào</p>
            )}
            {isLoading && (
                <div className="global-list__loader-container">
                    <LoadingOutlined className="global-list__loader-icon" />
                </div>
            )}
            <DeleteItemModal
                title="cảnh báo nguyên liệu"
                show={!!selectedDeleteId}
                onHide={() => setSelectedDeleteId('')}
                isProcessing={isProcessing}
                onConfirm={deleteIngReportHandler}
            />
            <Modal
                show={show}
                fullscreen={true}
                onHide={() => {
                    setShow(false);
                    setSelectedIngredientReport({});
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cảnh báo nguyên liệu kết hợp với nhau gây nguy hiểm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={onSubmit}>
                        <Input
                            onChange={(e) => {
                                setIngredientA(e.target.value);
                                setIngredientAErr('');
                            }}
                            label={'Nguyên liệu A :'}
                            placeholder="Nhập nguyên liệu "
                            value={ingredientA}
                            error={ingredientAErr}
                            touched={true}
                            className="flex-fill"
                        />
                        <Input
                            onChange={(e) => {
                                setIngredientB(e.target.value);
                                setIngredientBErr('');
                            }}
                            label={'Nguyên liệu B :'}
                            placeholder="Nhập nguyên liệu "
                            value={ingredientB}
                            error={ingredientBErr}
                            touched={true}
                            className="flex-fill"
                        />
                        <Input
                            type="textarea"
                            onChange={(e) => setConsequence(e.target.value)}
                            label={'Hậu quả của kết hợp Nguyên liệu A và Nguyên liệu B :'}
                            placeholder="Nhập Hậu quả"
                            value={consequence}
                            error={null}
                            touched={true}
                            className="flex-fill"
                        />
                        <div className="d-flex justify-content-end">
                            <button className="button button-sm button-green" type="submit" disabled={isProcessing}>
                                {selectedIngredientReport?.ingredientConflictId ? 'Cập nhật' : 'Thêm'} cảnh báo
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </section>
    );
};

export default IngredientReports;

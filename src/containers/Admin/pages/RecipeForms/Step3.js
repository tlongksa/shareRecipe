import {
    CloseOutlined,
    DeleteOutlined,
    EditOutlined,
    FileImageOutlined,
    VideoCameraAddOutlined,
} from '@ant-design/icons';
import React, { useRef, useState, useEffect } from 'react';
import { generateImageUrl, generateVideoUrl } from '../../../../utils';
import { v4 as uuid_v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import Input from '../../../../components/common/Input/Input';

const Step3 = ({ recipeFormData, setRecipeFormData, setShouldFinish, id, isMod }) => {
    const recipeImagesRef = useRef();
    const recipeVideoRef = useRef();
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [imgError, setImgError] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    const [videoError, setVideoError] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [video, setVideo] = useState('');
    const [describe, setDescribe] = useState('');
    const [listStep, setListStep] = useState([]);
    const [stepError, setStepError] = useState('');
    const [selectedStep, setSelectedStep] = useState({});

    useEffect(() => {
        if (recipeFormData?.listDishImage?.length) {
            setImageUrls(recipeFormData?.listDishImage?.map((it) => it.url));
        }
        if (recipeFormData?.video) {
            setVideo(recipeFormData?.video);
        }
        if (recipeFormData?.listStep?.length) {
            setListStep(
                recipeFormData?.listStep?.map((it) => ({
                    describe: it.describe,
                    title: uuid_v4(),
                })),
            );
        }
    }, [recipeFormData]);

    useEffect(() => {
        if (files.length > 0) {
            setImageUrls([]);
            [...files].forEach((file) => {
                setImageUrls((prevState) => [...prevState, generateImageUrl(file, setImgError)]);
            });
        }
    }, [files]);

    useEffect(() => {
        if (videoFile) {
            setVideo(generateVideoUrl(videoFile, setVideoError));
        }
    }, [videoFile]);

    return (
        <>
            <input
                type="file"
                className="d-none"
                multiple
                ref={recipeImagesRef}
                onChange={(e) => {
                    setImgError('');
                    setFiles((prevState) => [...prevState, ...e.target.files]);
                }}
            />
            <div className="d-flex-custom mb-3">
                <h4>Ảnh chụp mô tả cách làm của món ăn : </h4>
                <button
                    className="button button-sm button-green d-flex align-items-center gap-2"
                    onClick={() => {
                        setImgError('');
                        recipeImagesRef.current?.click();
                    }}
                    type="button"
                >
                    <FileImageOutlined /> Thêm ảnh
                </button>
            </div>
            {imgError && <p className="error-message">{imgError}</p>}
            <div className="recipe-image__galerry mb-3">
                {imageUrls.map((imgSrc, index) => (
                    <div className="recipe-image__galerry-item" key={imgSrc}>
                        <img src={imgSrc} alt="" />
                        <CloseOutlined
                            className="recipe-image__galerry-close__icon cursor-pointer"
                            onClick={() => {
                                setImageUrls((prevState) => prevState.filter((imgUrl) => imgUrl !== imgSrc));
                                setFiles((prevState) => [...prevState].filter((_, idx) => idx !== index));
                            }}
                        />
                    </div>
                ))}
            </div>
            <div className="d-flex-custom mb-3 mt-3">
                <h4>Video mô tả cách làm của món ăn : </h4>
                <button
                    className="button button-sm button-green d-flex align-items-center gap-2"
                    onClick={() => {
                        recipeVideoRef.current?.click();
                    }}
                    type="button"
                >
                    <VideoCameraAddOutlined /> Thêm video
                </button>
            </div>
            {videoError && <p className="error-message">{videoError}</p>}
            <input
                type="file"
                className="d-none"
                ref={recipeVideoRef}
                onChange={(e) => {
                    setVideoError('');
                    setVideoFile(e.target?.files?.[0]);
                }}
            />
            {video && (
                <div className="recipe-video__container">
                    <video src={video} controls width={400}></video>
                </div>
            )}
            <div className="steps-container mt-3">
                <h4>Các bước thực hiện món ăn : </h4>
                {stepError && <p className="error-message mb-2">{stepError}</p>}
                <Input type="textarea" value={describe} onChange={(e) => setDescribe(e.target.value)} />
                <div className="d-flex justify-content-end mb-3 mt-3">
                    <button
                        className="button button-sm button-green"
                        onClick={() => {
                            setStepError('');
                            if (selectedStep?.title) {
                                setListStep((prevState) =>
                                    prevState.map((it) =>
                                        it.title === selectedStep?.title
                                            ? { describe, title: selectedStep?.title }
                                            : it,
                                    ),
                                );
                                setDescribe('');
                                setSelectedStep({});
                                return;
                            }
                            setListStep((prevState) => [
                                ...prevState,
                                {
                                    title: uuid_v4(),
                                    describe,
                                },
                            ]);
                            setDescribe('');
                        }}
                        type="button"
                        disabled={!describe.trim()}
                    >
                        {selectedStep?.title ? 'Cập Nhật' : 'Tạo Bước'}
                    </button>
                </div>
                <div className="mt-3">
                    {listStep.map((item, index) => (
                        <li className="step__list-item mt-3" key={`step__item-${item.title}`}>
                            <div className="d-flex justify-content-between align-items-center gap-5">
                                <div>
                                    <strong className="recipe-step-item__step">Bước {index + 1} : </strong>
                                    <span
                                        className={`recipe-step-item__content`}
                                        dangerouslySetInnerHTML={{
                                            __html: item?.describe?.replaceAll('\n', '<br />'),
                                        }}
                                    />
                                </div>
                                <span className="d-flex gap-3 align-items-center">
                                    <EditOutlined
                                        className="cursor-pointer"
                                        onClick={() => {
                                            setSelectedStep(item);
                                            setDescribe(item.describe);
                                        }}
                                    />
                                    <DeleteOutlined
                                        className="cursor-pointer"
                                        onClick={() => {
                                            setListStep((prevState) =>
                                                prevState.filter((it) => it.title !== item.title),
                                            );
                                        }}
                                    />
                                </span>
                            </div>
                        </li>
                    ))}
                </div>
            </div>
            <div className="d-flex justify-content-end gap-4 align-items-center mt-4">
                <button
                    className="button button-sm button-secondary"
                    type="button"
                    onClick={() => navigate(`${isMod ? '' : '/admin'}/recipe-form?step=2${id ? `&id=${id}` : ''}`)}
                >
                    Trở về
                </button>
                <button
                    className="button button-sm button-green"
                    type="button"
                    disabled={imgError || videoError || stepError}
                    onClick={() => {
                        if (![...files].length && imageUrls.length === 0) {
                            setImgError('Vui lòng chọn ảnh mô tả cách làm của món ăn');
                            return;
                        }
                        if (!video && !videoFile) {
                            setVideoError('Vui lòng chọn video mô tả cách làm của món ăn');
                            return;
                        }
                        if (listStep.length === 0) {
                            setStepError('Vui lòng nhập các bước thực hiện món ăn');
                            return;
                        }
                        setRecipeFormData({
                            ...recipeFormData,
                            listStep,
                            files,
                            videoFile,
                        });
                        setShouldFinish(true);
                    }}
                >
                    Xác nhận
                </button>
            </div>
        </>
    );
};

export default Step3;

import {
    CloseOutlined,
    DeleteOutlined,
    EditOutlined,
    FileImageOutlined,
    VideoCameraAddOutlined,
} from '@ant-design/icons';
import React, { useRef, useState, useEffect } from 'react';
import Input from '../../../../components/common/Input/Input';
import { generateImageUrl, generateVideoUrl } from '../../../../utils';
import { v4 as uuid_v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const Step3 = ({ recipeFormData, setRecipeFormData, setShouldFinish }) => {
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
    const [selectedStep, setSelectedStep] = useState({});

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
                onChange={(e) => setFiles(e.target.files)}
            />
            {imgError && <p className="error-message">{imgError}</p>}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Ảnh chụp mô tả cách làm của món ăn : </h4>
                <button
                    className="button button-sm d-flex align-items-center gap-2"
                    onClick={() => {
                        recipeImagesRef.current?.click();
                        setImgError('');
                    }}
                    type="button"
                >
                    <FileImageOutlined /> Thêm ảnh
                </button>
            </div>
            <div className="recipe-image__galerry mb-3">
                {imageUrls.map((imgSrc, index) =>
                    imgSrc ? (
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
                    ) : null,
                )}
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                <h4>Dán link video mô tả cách làm của món ăn : </h4>
                <button
                    className="button button-sm d-flex align-items-center gap-2"
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
                onChange={(e) => setVideoFile(e.target?.files?.[0])}
            />
            {video && (
                <div className="recipe-video__container">
                    <video src={video} controls width={400}></video>
                </div>
            )}
            <div className="steps-container mt-3">
                <h4>Các bước thực hiện món ăn : </h4>
                <Input
                    type="textarea"
                    value={describe}
                    onChange={(e) => setDescribe(e.target.value)}
                    placeholder="Vui lòng mô tả chi tiết các bước của công thức nấu ăn "
                />
                <div className="d-flex justify-content-end mb-3 mt-3">
                    <button
                        className="button button-sm"
                        onClick={() => {
                            if (selectedStep?.title) {
                                setListStep((prevState) =>
                                    prevState.map((it) =>
                                        it.title === selectedStep?.title
                                            ? { describe, title: selectedStep?.title }
                                            : it,
                                    ),
                                );
                                setDescribe('');
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
                    >
                        Tạo Bước
                    </button>
                </div>
                <div className="mt-3">
                    {listStep.map((item, index) => (
                        <li className="step__list-item mt-3" key={`step__item-${item.title}`}>
                            <div className="d-flex justify-content-between align-items-center gap-5">
                                <strong>
                                    Bước {index + 1}: {item.describe}
                                </strong>
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
                    onClick={() => navigate('/admin/recipe-form?step=2')}
                >
                    Trở về
                </button>
                <button
                    className="button button-sm"
                    type="button"
                    onClick={() => {
                        setRecipeFormData((prevState) => ({
                            ...prevState,
                            listStep,
                            files,
                            videoFile,
                        }));
                        setShouldFinish(true);
                    }}
                >
                    Tiếp theo
                </button>
            </div>
        </>
    );
};

export default Step3;

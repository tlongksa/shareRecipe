export const generateImageUrl = (file, setError) => {
    if (file?.type !== 'image/jpeg' && file?.type !== 'image/png') {
        setError('Please choose image with this format: png,jpg,jpeg');
        return '';
    }
    if (file) {
        return URL.createObjectURL(file);
    }
    return '';
};

export const generateVideoUrl = (file, setError) => {
    if (file?.type !== 'video/mp4') {
        setError('Please choose video with this format: mp4');
        return '';
    }

    if (file) {
        return URL.createObjectURL(file);
    }

    return '';
};

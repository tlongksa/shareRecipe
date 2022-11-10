export const showRecipeLevelText = (level) => {
    if (level === 3) return 'Khó';
    if (level === 2) return 'Bình thường';
    return 'Dễ';
};

export const showNumOfSlideBaseOnScreenSize = (
    isMobile,
    isExtraSmallTablet,
    isSmallTablet,
    isTablet,
    isSmallLaptop,
) => {
    if (isMobile) return 2;
    if (isExtraSmallTablet) return 3;
    if (isSmallTablet) return 4;
    if (isTablet) return 5;
    if (isSmallLaptop) return 6;
    return 8;
};

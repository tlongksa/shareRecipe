export const showNumOfSlideBaseOnScreenSize = (
    isMobile,
    isExtraSmallTablet,
    isSmallTablet,
    isTablet,
    isSmallLaptop,
) => {
    if (isMobile) return 1;
    if (isExtraSmallTablet) return 2;
    if (isSmallTablet) return 3;
    if (isTablet) return 3;
    if (isSmallLaptop) return 4;
    return 5;
};

export const showNumOfBmiItemsBaseOnScreenSize = (isMobile, isExtraSmallTablet, isSmallTablet, isTablet) => {
    if (isMobile) return 2;
    if (isExtraSmallTablet) return 3;
    if (isSmallTablet) return 3;
    if (isTablet) return 3;
    return 4;
};

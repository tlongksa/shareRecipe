import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import SlickSlider from 'react-slick';

const Slider = ({ children, slidesToShow }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow || 1,
        slidesToScroll: 1,
    };
    return <SlickSlider {...settings}>{children}</SlickSlider>;
};

export default Slider;

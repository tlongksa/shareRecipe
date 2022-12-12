import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ListCategory from '../../components/List/listCategory';
import ListTopMonth from '../../components/List/listTopMonth';
import ListTopNew from '../../components/List/listTopNew';
import ListTopWeek from '../../components/List/listTopWeek';
import img1 from '../../assets/img/img1.jpg';
import img2 from '../../assets/img/img2.jpg';
import img3 from '../../assets/img/img3.jpg';
import './homePage.scss';
import SearchBar from '../../components/Search/SearchBar';
import SearchRecipe from './SearchRecipe';

const carousels = [
    {
        imgSrc: img1,
        title: 'First slide',
        desc: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
    },
    {
        imgSrc: img2,
        title: 'Second slide',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        imgSrc: img3,
        title: 'Third slide',
        desc: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.',
    },
];

export const HomeBannerCarousel = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <div className="position-relative">
            <Carousel activeIndex={index} onSelect={handleSelect}>
                {carousels.map(({ imgSrc, desc, title }) => (
                    <Carousel.Item key={title}>
                        <img className="d-block w-100 h-10 home-carousel__banner-img" src={imgSrc} alt={title} />
                    </Carousel.Item>
                ))}
            </Carousel>
            <SearchRecipe />
        </div>
    );
};

const HomePage = (props) => {
    return (
        <div key={'home-page__key'}>
            <HomeBannerCarousel />
            <div className="custom-page__container">
                <ListCategory />
                <SearchBar />
                <ListTopNew />
                <ListTopWeek />
                <ListTopMonth />

            </div>
        </div>
    );
};

export default HomePage;

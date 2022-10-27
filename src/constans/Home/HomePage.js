import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ListCategory from '../../components/List/listCategory';
import ListTopMonth from '../../components/List/listTopMoth';
import ListTopNew from '../../components/List/listTopNew';
import ListTopWeek from '../../components/List/listTopWeek';
import img1 from '../../img/img1.jpg';
import img2 from '../../img/img2.jpg';
import img3 from '../../img/img3.jpeg';
import './homePage.scss';
import SearchBar from '../../components/Search/SearchBar';
import useRedirectToManagementDashboard from '../../hooks/useRedirectToManagementDashboard';

const HomePage = (props) => {
    useRedirectToManagementDashboard();
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

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

    return (
        <div key={'home-page__key'}>
            <Carousel activeIndex={index} onSelect={handleSelect}>
                {carousels.map(({ imgSrc, desc, title }) => (
                    <Carousel.Item className="img" key={title}>
                        <img className="d-block w-100 h-10" src={imgSrc} alt={title} />
                        <Carousel.Caption>
                            <h3>{title}</h3>
                            <p>{desc}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
            <div className="custom-page__container">
                {/* <Filter/> */}
                <SearchBar />
                <ListCategory />
                <ListTopWeek />
                <ListTopMonth />
                <ListTopNew />
                {/* <ListRecipe/> */}
            </div>
        </div>
    );
};

export default HomePage;

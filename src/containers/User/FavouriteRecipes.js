import { LoadingOutlined, ShareAltOutlined } from '@ant-design/icons';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../../context/recipe-context';
import './index.scss';

const ProfileFavouriteRecipe = ({ item }) => {
    return (
        <li className="profile-favourite__recipe-item">
            <Link to={`/recipe-detail/${item.dishId}`} className="d-block">
                {item.name}
            </Link>
            <img src={item.urlImage} alt="" />
            <p>
                By <strong>{item.verifier}</strong> <span className="text-muted">{item.createDate}</span>
            </p>
            <div className="d-flex align-items-center gap-2">
                <ShareAltOutlined /> <strong>{item.totalStarRate}</strong> <span>shares</span>
            </div>
        </li>
    );
};

const FavouriteRecipes = () => {
    const { favouriteRecipeList, isLoading, error, onFetchFavouriteMore } = useContext(RecipeContext);

    useEffect(() => {
        onFetchFavouriteMore(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isLoading && error) {
        return <p className="error-message">Something went wrong!</p>;
    }
    return (
        <div className="mt-4">
            <h2>Các món yêu thích của tôi : </h2>
            <ul className="profile-favourite__recipes">
                {favouriteRecipeList.map((item) => (
                    <ProfileFavouriteRecipe key={item.dishId} item={item} />
                ))}
            </ul>
            {isLoading && (
                <div className="global-list__loader-container">
                    <LoadingOutlined className="global-list__loader-icon" />
                </div>
            )}
        </div>
    );
};

export default FavouriteRecipes;

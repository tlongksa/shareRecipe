import { LoadingOutlined } from '@ant-design/icons';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../../context/recipe-context';
import './index.scss';

export const ProfileFavouriteRecipe = ({ item }) => {
    return (
        <li className="profile-favourite__recipe-item">
            <img src={item.urlImage || 'https://via.placeholder.com/150'} alt="" />
            <div className="p-2">
                <Link
                    to={`/recipe-detail/${item.dishId}`}
                    className="d-block"
                    onClick={() =>
                        window.scrollTo({
                            top: 0,
                            left: 0,
                        })
                    }
                >
                    {item.name}
                </Link>
                <p className="mt-2">
                    By <strong>{item.verifier}</strong> <span className="text-muted">{item.createDate}</span>
                </p>
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
        return <p className="error-message mt-3">{error?.message || 'Lỗi xảy ra!'}</p>;
    }
    return (
        <div className="mt-4">
            <h2 className="mb-3">Các món yêu thích của tôi : </h2>
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

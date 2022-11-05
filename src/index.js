import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.scss';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import HomePage from './containers/Home/HomePage';
import About from './containers/Page/about';
import Contact from './containers/Page/contact';
import BmiInfo from './containers/Page/BmiInfo';
import Save from './containers/Page/save';
import ForgotPassword from './containers/Auth/forgotPassword';
import Profile from './containers/User/profile';
import RecipesByCategory from './components/List/RecipesByCategory';

import NotFound from './components/Error/NotFound';
import SearchBar from './components/Search/SearchBar';
import ChangePassword from './containers/Auth/ChangePassword';
import ClientRecipeDetail from './containers/ClientRecipeDetail';
import NewPassword from './containers/Auth/NewPassword';
import Blogs from './containers/Page/Blogs';
import BlogDetail from './containers/Page/BlogDetail';
import AdminLayout from './containers/Admin/AdminLayout';
import Accounts from './containers/Admin/pages/Accounts';
import Recipes from './containers/Admin/pages/Recipes';
import RecipesByName from './components/List/RecipesByName';
import PendingBlogs from './containers/Admin/pages/PendingBlogs';
import RecipeForm from './containers/Admin/pages/RecipeForms';
import BlogCommentReports from './containers/Admin/pages/BlogCommentReports';
import RecipeCommentReports from './containers/Admin/pages/RecipeCommentReports';
import RecipeCategories from './containers/Admin/pages/RecipeCategories';

// contexts
import { BlogProvider } from './context/blog-context';
import { RecipeProvider } from './context/recipe-context';
import { AccountProvider } from './context/account-context';
import { AuthProvider } from './context/auth-context';
import { BmiProvider } from './context/bmi-context';
import FavouriteRecipes from './containers/FavouriteRecipes';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <AuthProvider>
        <AccountProvider>
            <BmiProvider>
                <RecipeProvider>
                    <BlogProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<App />}>
                                    <Route path="/home" exact element={<HomePage />} />
                                    <Route path="/test" element={<homeTest />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/blogs/:id" element={<BlogDetail />} />
                                    <Route path="/blogs" element={<Blogs />} />
                                    <Route path="/save" element={<Save />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/bmi" element={<BmiInfo />} />
                                    <Route path="/favourite-recipes" element={<FavouriteRecipes />} />
                                    <Route path="/signin" element={<Login />} />
                                    <Route path="/profile/:id" element={<Profile />} />
                                    <Route path="/sign-up" element={<Register />} />
                                    <Route path="/forgot-password" element={<ForgotPassword />} />
                                    <Route path="/change-password" element={<ChangePassword />} />
                                    <Route path="/new-password" element={<NewPassword />} />
                                    <Route path="/list-recipe-by-category/:id" element={<RecipesByCategory />} />
                                    <Route path="/list-recipe-by-name" element={<RecipesByName />} />
                                    <Route path="/recipe-detail/:dishId" element={<ClientRecipeDetail />} />
                                    <Route path="/search/:searchTitle" element={<SearchBar />} />
                                    <Route path="/admin" element={<AdminLayout />}>
                                        <Route path="accounts" element={<Accounts />} />
                                        <Route path="recipes" element={<Recipes />} />
                                        <Route path="approve-blogs" element={<PendingBlogs />} />
                                        <Route path="recipe-form" element={<RecipeForm />} />
                                        <Route path="recipe-categories" element={<RecipeCategories />} />
                                        <Route path="blog-comment-reports" element={<BlogCommentReports />} />
                                        <Route path="recipe-comment-reports" element={<RecipeCommentReports />} />
                                    </Route>
                                    <Route path="*" element={<NotFound />} />
                                    <Route index element={<HomePage />} />
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </BlogProvider>
                </RecipeProvider>
            </BmiProvider>
        </AccountProvider>
    </AuthProvider>,
);

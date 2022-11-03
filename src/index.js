import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
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
import ViewDetail from './containers/ViewDetail/viewDetail';
import NewPassword from './containers/Auth/NewPassword';
import Blogs from './containers/Page/Blogs';
import BlogDetail from './containers/Page/BlogDetail';
import AdminLayout from './containers/Admin/AdminLayout';
import Accounts from './containers/Admin/pages/Accounts';
import Recipes from './containers/Admin/pages/Recipes';
import RecipesByName from './components/List/RecipesByName';
import PendingBlogs from './containers/Admin/pages/PendingBlogs';
import RecipeForm from './containers/Admin/pages/RecipeForms';

// contexts
import { BlogProvider } from './context/blog-context';
import { RecipeProvider } from './context/recipe-context';
import { AccountProvider } from './context/account-context';
import { AuthProvider } from './context/auth-context';
import RecipeCategories from './containers/Admin/pages/RecipeCategories';
import { BmiProvider } from './context/bmi-context';
import BlogCommentReports from './containers/Admin/pages/BlogCommentReports';

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
                                    <Route path="/signin" element={<Login />} />
                                    <Route path="/profile/:id" element={<Profile />} />
                                    <Route path="/sign-up" element={<Register />} />
                                    <Route path="/forgot-password" element={<ForgotPassword />} />
                                    <Route path="/change-password" element={<ChangePassword />} />
                                    <Route path="/new-password" element={<NewPassword />} />
                                    <Route path="/list-recipe-by-category/:id" element={<RecipesByCategory />} />
                                    <Route path="/list-recipe-by-name" element={<RecipesByName />} />
                                    <Route path="/view-detail/:dishId" element={<ViewDetail />} />
                                    <Route path="/search/:searchTitle" element={<SearchBar />} />
                                    <Route path="/admin" element={<AdminLayout />}>
                                        <Route path="accounts" element={<Accounts />} />
                                        <Route path="recipes" element={<Recipes />} />
                                        <Route path="approve-blogs" element={<PendingBlogs />} />
                                        <Route path="recipe-form" element={<RecipeForm />} />
                                        <Route path="recipe-categories" element={<RecipeCategories />} />
                                        <Route path="blog-comment-reports" element={<BlogCommentReports />} />
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

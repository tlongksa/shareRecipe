import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// contexts
import { BlogProvider } from './context/blog-context';
import { RecipeProvider } from './context/recipe-context';
import { AccountProvider } from './context/account-context';
import { AuthProvider } from './context/auth-context';
import { BmiProvider } from './context/bmi-context';
import { LoadingOutlined } from '@ant-design/icons';
import AdminLayout from './containers/Admin/AdminLayout';

const App = lazy(() => import('./App'));
const Login = lazy(() => import('./containers/Auth/Login'));
const Register = lazy(() => import('./containers/Auth/Register'));
const HomePage = lazy(() => import('./containers/Home/HomePage'));
const Introduce = lazy(() => import('./containers/Page/Introduce'));
const BmiInfo = lazy(() => import('./containers/Page/BmiInfo'));
const Save = lazy(() => import('./containers/Page/Save'));
const ForgotPassword = lazy(() => import('./containers/Auth/forgotPassword'));
const Profile = lazy(() => import('./containers/User/UserProfile'));
const RecipesByCategory = lazy(() => import('./components/List/RecipesByCategory'));

const NotFound = lazy(() => import('./components/Error/NotFound'));
const SearchBar = lazy(() => import('./components/Search/SearchBar'));
const ChangePassword = lazy(() => import('./containers/Auth/ChangePassword'));
const ClientRecipeDetail = lazy(() => import('./containers/ClientRecipeDetail'));
const PublicIngReport = lazy(() => import('./containers/PublicIngReport'));
const NewPassword = lazy(() => import('./containers/Auth/NewPassword'));
const Blogs = lazy(() => import('./containers/Page/Blogs'));
const BlogDetail = lazy(() => import('./containers/Page/BlogDetail'));
const Accounts = lazy(() => import('./containers/Admin/pages/Accounts'));
const Recipes = lazy(() => import('./containers/Admin/pages/Recipes'));
const RecipesByName = lazy(() => import('./components/List/RecipesByName'));
const PendingBlogs = lazy(() => import('./containers/Admin/pages/PendingBlogs'));
const RecipeForm = lazy(() => import('./containers/Admin/pages/RecipeForms'));
const BlogCommentReports = lazy(() => import('./containers/Admin/pages/BlogCommentReports'));
const RecipeCommentReports = lazy(() => import('./containers/Admin/pages/RecipeCommentReports'));
const RecipeCategories = lazy(() => import('./containers/Admin/pages/RecipeCategories'));
const IngredientReports = lazy(() => import('./containers/Admin/pages/IngredientReports'));
const FavouriteRecipes = lazy(() => import('./containers/FavouriteRecipes'));
const MyRecipes = lazy(() => import('./containers/mod/MyRecipes'));

const root = ReactDOM.createRoot(document.getElementById('root'));

const SuspenseWrapper = ({ children }) => (
    <Suspense
        fallback={
            <div className="global-list__loader-container">
                <LoadingOutlined className="global-list__loader-icon" />
            </div>
        }
    >
        {children}
    </Suspense>
);

root.render(
    <AuthProvider>
        <AccountProvider>
            <BmiProvider>
                <RecipeProvider>
                    <BlogProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route
                                    path="/"
                                    element={
                                        <SuspenseWrapper>
                                            <App />
                                        </SuspenseWrapper>
                                    }
                                >
                                    <Route
                                        path="/home"
                                        exact
                                        element={
                                            <SuspenseWrapper>
                                                <HomePage />
                                            </SuspenseWrapper>
                                        }
                                    />
                                    <Route
                                        path="/test"
                                        element={
                                            <SuspenseWrapper>
                                                <homeTest />
                                            </SuspenseWrapper>
                                        }
                                    />
                                    <Route
                                        path="/introduce"
                                        element={
                                            <SuspenseWrapper>
                                                <Introduce />
                                            </SuspenseWrapper>
                                        }
                                    />
                                    <Route
                                        path="/blogs/:id"
                                        element={
                                            <SuspenseWrapper>
                                                <BlogDetail />
                                            </SuspenseWrapper>
                                        }
                                    />
                                    <Route
                                        path="/blogs"
                                        element={
                                            <SuspenseWrapper>
                                                <Blogs />
                                            </SuspenseWrapper>
                                        }
                                    />
                                    <Route
                                        path="/ing-report"
                                        element={
                                            <SuspenseWrapper>
                                                <PublicIngReport />
                                            </SuspenseWrapper>
                                        }
                                    />
                                    <Route
                                        path="/save"
                                        element={
                                            <SuspenseWrapper>
                                                <Save />
                                            </SuspenseWrapper>
                                        }
                                    />

                                    <Route
                                        path="/bmi"
                                        element={
                                            <SuspenseWrapper>
                                                <BmiInfo />
                                            </SuspenseWrapper>
                                        }
                                    />
                                    <Route
                                        path="/favourite-recipes"
                                        element={
                                            <SuspenseWrapper>
                                                <FavouriteRecipes />
                                            </SuspenseWrapper>
                                        }
                                    />
                                    <Route
                                        path="/my-recipes"
                                        element={
                                            <SuspenseWrapper>
                                                <MyRecipes />
                                            </SuspenseWrapper>
                                        }
                                    />
                                    <Route
                                        path="/signin"
                                        element={
                                            <SuspenseWrapper>
                                                <Login />
                                            </SuspenseWrapper>
                                        }
                                    />
                                    <Route
                                        path="/profile/:id"
                                        element={
                                            <SuspenseWrapper>
                                                <Profile />
                                            </SuspenseWrapper>
                                        }
                                    />
                                    <Route
                                        path="/sign-up"
                                        element={
                                            <SuspenseWrapper>
                                                <Register />
                                            </SuspenseWrapper>
                                        }
                                    />
                                    <Route
                                        path="/forgot-password"
                                        element={
                                            <SuspenseWrapper>
                                                <ForgotPassword />
                                            </SuspenseWrapper>
                                        }
                                    />
                                    <Route
                                        path="/change-password"
                                        element={
                                            <SuspenseWrapper>
                                                <ChangePassword />
                                            </SuspenseWrapper>
                                        }
                                    />
                                    <Route
                                        path="/new-password"
                                        element={
                                            <SuspenseWrapper>
                                                <NewPassword />
                                            </SuspenseWrapper>
                                        }
                                    />
                                    <Route
                                        path="/list-recipe-by-category/:id"
                                        element={
                                            <SuspenseWrapper>
                                                <RecipesByCategory />
                                            </SuspenseWrapper>
                                        }
                                    />
                                    <Route
                                        path="/list-recipe-by-name"
                                        element={
                                            <SuspenseWrapper>
                                                <RecipesByName />
                                            </SuspenseWrapper>
                                        }
                                    />
                                    <Route
                                        path="/recipe-detail/:dishId"
                                        element={
                                            <SuspenseWrapper>
                                                <ClientRecipeDetail />
                                            </SuspenseWrapper>
                                        }
                                    />
                                    <Route
                                        path="/search/:searchTitle"
                                        element={
                                            <SuspenseWrapper>
                                                <SearchBar />
                                            </SuspenseWrapper>
                                        }
                                    />
                                    <Route
                                        path="recipe-form"
                                        element={
                                            <SuspenseWrapper>
                                                <RecipeForm />
                                            </SuspenseWrapper>
                                        }
                                    />
                                    <Route path="/admin" element={<AdminLayout />}>
                                        <Route
                                            path="accounts"
                                            element={
                                                <SuspenseWrapper>
                                                    <Accounts />
                                                </SuspenseWrapper>
                                            }
                                        />
                                        <Route
                                            path="recipes"
                                            element={
                                                <SuspenseWrapper>
                                                    <Recipes />
                                                </SuspenseWrapper>
                                            }
                                        />
                                        <Route
                                            path="approve-blogs"
                                            element={
                                                <SuspenseWrapper>
                                                    <PendingBlogs />
                                                </SuspenseWrapper>
                                            }
                                        />
                                        <Route
                                            path="recipe-form"
                                            element={
                                                <SuspenseWrapper>
                                                    <RecipeForm />
                                                </SuspenseWrapper>
                                            }
                                        />
                                        <Route
                                            path="recipe-categories"
                                            element={
                                                <SuspenseWrapper>
                                                    <RecipeCategories />
                                                </SuspenseWrapper>
                                            }
                                        />
                                        <Route
                                            path="blog-comment-reports"
                                            element={
                                                <SuspenseWrapper>
                                                    <BlogCommentReports />
                                                </SuspenseWrapper>
                                            }
                                        />
                                        <Route
                                            path="recipe-comment-reports"
                                            element={
                                                <SuspenseWrapper>
                                                    <RecipeCommentReports />
                                                </SuspenseWrapper>
                                            }
                                        />
                                        <Route
                                            path="ingredient-reports"
                                            element={
                                                <SuspenseWrapper>
                                                    <IngredientReports />
                                                </SuspenseWrapper>
                                            }
                                        />
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

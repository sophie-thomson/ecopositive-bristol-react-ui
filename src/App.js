import Container from 'react-bootstrap/Container';
import { Route, Switch } from "react-router-dom";
import './api/axiosDefaults'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './App.module.css';
import NavBar from './components/NavBar';
import AddCompany from './components/AddCompany';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import CompanyCreateForm from './pages/companies/CompanyCreateForm';
import CompanyPage from './pages/companies/CompanyPage';
import CompanyEditForm from './pages/companies/CompanyEditForm';
import ProfilePage from "./pages/profiles/ProfilePage";
import CompanyListPage from './pages/companies/CompanyListPage';
import AdminPage from './pages/admin/AdminPage';
import PageNotFound from './pages/notfound/PageNotFound';
import ProfileEditForm from './pages/profiles/ProfileEditForm';
import { useCurrentUser } from "./contexts/CurrentUserContext";


function App() {

    const currentUser = useCurrentUser();
    const profile_id = currentUser?.profile_id || "";

    return (
        <div className={`${styles.bg} ${styles.App}`}>
            <div>
                <NavBar />
                <AddCompany />
                <Container className={`${styles.Main}`}>
                    <ToastContainer autoClose={2000}></ToastContainer>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <CompanyListPage 
                                    message="No results found. Try searching for something else." 
                                />
                            )}
                        />
                        <Route 
                            exact 
                            path="/signin" 
                            render={() => <SignInForm />} 
                        />
                        <Route 
                            exact 
                            path="/signup" 
                            render={() => <SignUpForm />} />
                        <Route
                            exact
                            path="/companies/create"
                            render={() => <CompanyCreateForm />}
                        />
                        <Route
                            exact
                            path="/companies/:id/edit"
                            render={() => <CompanyEditForm />}
                        />
                        <Route
                            exact
                            path="/companies/:id"
                            render={() => <CompanyPage />}
                        />
                        <Route
                            exact
                            path="/profiles/:id"
                            render={() => <ProfilePage />}
                            filter={`profile=${profile_id}&`}
                        />
                        <Route
                            exact
                            path="/profiles/:id/edit"
                            render={() => <ProfileEditForm />}
                        />
                        <Route
                            exact
                            path="/staff"
                            render={() => <AdminPage />}
                        />
                        <Route render={() => <PageNotFound />} />
                    </Switch>
                </Container>
            </div>
        </div>

    );
}

export default App;
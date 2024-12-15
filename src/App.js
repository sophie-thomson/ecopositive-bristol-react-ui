import Container from 'react-bootstrap/Container';
import { Route, Switch } from "react-router-dom";
import './api/axiosDefaults'

import styles from './App.module.css';
import NavBar from './components/NavBar';
import AddCompany from './components/AddCompany';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import CompanyCreateForm from './pages/companies/CompanyCreateForm';


function App() {

    return (
        
                <div className={styles.App}>
                    <div className={`fluid ${styles.bg}`}>
                        <NavBar />
                        <AddCompany />
                        <Container className={styles.Main}>
                            <Switch>
                                <Route exact path="/" render={() => <h1>Directory</h1>} />
                                <Route exact path="/signin" render={() => <SignInForm />} />
                                <Route exact path="/signup" render={() => <SignUpForm />} />
                                <Route
                                    exact
                                    path="/companies/create"
                                    render={() => <CompanyCreateForm />} 
                                />
                                <Route render={() => <p>Page not Found!</p>} />
                            </Switch>
                        </Container>
                    </div>        
                </div>
            
    );
}

export default App;
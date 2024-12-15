import Container from 'react-bootstrap/Container';
import { Route, Switch } from "react-router-dom";
import './api/axiosDefaults'

import styles from './App.module.css';
import NavBar from './components/NavBar';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';


function App() {

    return (
        
                <div className={styles.App}>
                    <div className={`fluid ${styles.bg}`}>
                        <NavBar />
                        <Container className={styles.Main}>
                            <Switch>
                                <Route exact path="/signin" render={() => <SignInForm />} />
                                <Route exact path="/signup" render={() => <SignUpForm />} />
                                <Route exact path="/" render={() => <h1>Browse</h1>} />
                                <Route render={() => <p>Page not Found!</p>} />
                            </Switch>
                        </Container>
                    </div>        
                </div>
            
    );
}

export default App;
import { createContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Route, Switch } from "react-router-dom";
import './api/axiosDefaults'

import styles from './App.module.css';
import NavBar from './components/NavBar';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import axios from 'axios';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

function App() {
    const [currentUser, setCurrentUser] = useState(null)

    const handleMount = async () => {
        try {
            const {data} = await axios.get('dj-rest-auth/user/')
            setCurrentUser(data)
        } catch (err) {
            console.log(err)          
        }
    }

    useEffect(() => {
        handleMount()
    }, [])

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <SetCurrentUserContext.Provider value={setCurrentUser}>
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
            </SetCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    );
}

export default App;
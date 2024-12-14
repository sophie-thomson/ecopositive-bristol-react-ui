import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import { Route, Switch } from "react-router-dom";


function App() {
  return (
    <div className={styles.App}>
        <div className={styles.bg}>
            <NavBar />
            <Container className={styles.Main}>
                <Switch>
                    <Route exact path="/signin" render={() => <h1>Sign In</h1>} />
                    <Route exact path="/signup" render={() => <h1>Sign Up</h1>} />
                    <Route exact path="/" render={() => <h1>Directory</h1>} />
                    <Route render={() => <p>Page not Found!</p>} />
                </Switch>
            </Container>
        </div>        
    </div>
  );
}

export default App;
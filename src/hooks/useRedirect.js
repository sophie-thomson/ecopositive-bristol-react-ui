import axios from "axios";
import { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router";

export const useRedirect = (userAuthStatus) => {
    const history = useHistory();

    useEffect(() => {
        const handleMount = async () => {
            try {
                await axios.post("/dj-rest-auth/token/refresh/");
                // if user is logged in, the code below will run
                if (userAuthStatus === "loggedIn") {
                  history.push("/");
                }
            } catch (err) {
                // if user is not logged in, the code below will run
                if (userAuthStatus === "loggedOut") {
                    history.push("/");
                    <Alert variant="warning">
                        <p>
                            You need to be logged in to view more information about a company and add your own endorsement or comments.
                        </p>
                        <Alert.Link
                            href="/signin"
                        >
                            Sign in
                        </Alert.Link> or 
                        <Alert.Link 
                            href="/signup"
                        >   
                            Sign up
                        </Alert.Link>
                    </Alert>
                }
            }
        };

    handleMount();
    }, [history, userAuthStatus]);
};
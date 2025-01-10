import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../NavBar";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";

test("renders NavBar", () => {
    render(
    <Router>
        <NavBar />
    </Router>
    );

    screen.debug();

    const signInLink = screen.getByRole('link', {name: 'Sign In'})
    expect(signInLink).toBeInTheDocument();
});

test("renders NavBar", () => {
    render(
    <Router>
        <NavBar />
    </Router>
    );
    
    const browseLink = screen.getByRole('link', {name: 'Browse'})
    expect(browseLink).toBeInTheDocument();
});

test("renders link to the user profile for a logged in user", async () => {
    render(
    <Router>
        <CurrentUserProvider>
            <NavBar />
        </CurrentUserProvider>
    </Router>
    );

    const myProfileLink = await screen.findByText('My ecoPositive')
    expect(myProfileLink).toBeInTheDocument();    
});

test("Renders Sign In and Sign Up buttons again on log out", async () => {
    render(
    <Router>
        <CurrentUserProvider>
            <NavBar />
        </CurrentUserProvider>
    </Router>
    );

    const signOutLink = await screen.findByRole('link', {name: 'Sign Out'})
    fireEvent.click(signOutLink)

    const signInLink = await screen.findByRole('link', {name: 'Sign In'})
    expect(signInLink).toBeInTheDocument();

    const signUpLink = await screen.findByRole('link', {name: 'Sign Up'})
    expect(signUpLink).toBeInTheDocument();

});
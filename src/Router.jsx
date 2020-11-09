import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./pages/Home/index"
import Register from "./pages/Register"
import AuthState from "./Auth/Context"
import AuthRouter from "./Middleware/authRouter"
import Search from "./pages/ManageSummary/Search/index"
import Contacts from "./pages/ManageContacts/Contacts/index"
import ContactsList from "./pages/ManageContacts/ContactsList"

const Routes = () => {
    return (
        <AuthState>
            <Router>
                <Switch>
                    <Home path="/">
                        <Switch>
                            <Route
                                path="/register"
                                exact
                                component={Register}
                            />
                            <AuthRouter>
                                <Route
                                    path="/search"
                                    exact
                                    component={Search}
                                />
                                <Route
                                    path="/contact"
                                    exact
                                    component={Contacts}
                                />
                                <Route
                                    path="/contactList"
                                    exact
                                    component={ContactsList}
                                />
                            </AuthRouter>
                        </Switch>
                    </Home>
                </Switch>
            </Router>
        </AuthState>
    )
}

export default Routes
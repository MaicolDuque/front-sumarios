import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./Pages/Home/index"
import Register from "./Pages/Register/index"
import AuthState from "./Auth/Context"
import AuthRouter from "./Middleware/authRouter"
import Search from "./Pages/ManageSummary/Search/index"
import ContactsList from "./Pages/ManageContacts/ContactsList/index"
import Summaries from "./Pages/Summaries/index"
import Articles from "./Pages/Summaries/Articles/index"

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
                                    path="/contactList"
                                    exact
                                    component={ContactsList}
                                />
                                <Route path="/summaries" exact component={Summaries} />
                                <Route path="/summaries/articles" exact component={Articles} />
                            </AuthRouter>
                        </Switch>
                    </Home>
                </Switch>
            </Router>
        </AuthState>
    )
}

export default Routes
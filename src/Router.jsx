import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./Pages/Home/index"
import Register from "./Pages/Register"
import AuthState from "./Auth/Context"
import AuthRouter from "./Middleware/authRouter"
import Search from "./Pages/Search/index"

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
                            </AuthRouter>
                        </Switch>
                    </Home>
                </Switch>
            </Router>
        </AuthState>
    )
}

export default Routes
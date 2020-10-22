import { MenuItem } from "@material-ui/core"
import { LocalGasStationRounded } from "@material-ui/icons"
import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./Pages/Login/index.jsx"
import Home from "./Pages/Home/index"
import Register from "./Pages/Register/index"
import AuthState from "./Auth/Context"

const Routes = () => {
    return (
        <AuthState>
            <Router>
                <Switch>
                    <Login path="/" exact>
                        <Switch>
                            <Route
                                path="/register"
                                component={Register}
                                exact
                            />
                        </Switch>
                    </Login>
                    <Home path="/home" exact />
                </Switch>
            </Router>
        </AuthState>
    )
}

export default Routes
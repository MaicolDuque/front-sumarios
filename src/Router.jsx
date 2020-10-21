import { MenuItem } from "@material-ui/core"
import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Menu from "./Pages/Home/index"
import Register from "./Pages/Register/index"

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Menu>
                    <Switch>
                        <Route
                            path="/register"
                            component={Register}
                            exact
                        />
                    </Switch>
                </Menu>
            </Switch>
        </Router>
    )
}

export default Routes
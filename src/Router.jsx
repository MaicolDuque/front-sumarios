import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./pages/Home/index"
import Register from "./pages/Register/index"
import AuthState from "./Auth/Context"
import AuthRouter from "./Middleware/authRouter"

import Search from "./pages/ManageSummary/Search/index"
import ContactsList from "./pages/ManageContacts/ContactsList"
import Summaries from "./pages/Summaries"
import Articles from "./pages/Summaries/Articles"
import SendingHistory from "./pages/SendingHistory"
import Magazines from "./pages/Magazines"
import Volumes from "./pages/Magazines/Volumes"
import Solicitude from "./pages/ManagePublisher/Publisher/index"
import PersonalInformation from "./pages/ManagePublisher/Publisher/personalInfo"

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
                                <Route path="/search" exact component={Search} />
                                <Route path="/contactList" exact component={ContactsList} />
                                <Route path="/summaries" exact component={Summaries} />
                                <Route path="/summaries/articles" exact component={Articles} />
                                <Route path="/history" exact component={SendingHistory} />
                                <Route path="/magazines" exact component={Magazines} />
                                <Route path="/magazines/volumes" exact component={Volumes} />
                                <Route path="/request" exact component={Solicitude}/>
                                <Route path="/personal" exact component={PersonalInformation}/>
                            </AuthRouter>
                        </Switch>
                    </Home>
                </Switch>
            </Router>
        </AuthState>
    )
}

export default Routes
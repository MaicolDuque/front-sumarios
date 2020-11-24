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
import CustomRoute from "./components/CustomRoute"

const Routes = () => {
	return (
		<AuthState>
			<Router>
				<Switch>
					<Home path="/">
						<Switch>
							<Route path="/register" exact component={Register} />
							<AuthRouter>
								<CustomRoute condition="editor" path="/search" exact component={Search} />
								<CustomRoute condition="editor" path="/contactList" exact component={ContactsList} />
								<CustomRoute condition="editor" path="/summaries" exact component={Summaries} />
								<CustomRoute condition="editor" path="/summaries/articles" exact component={Articles} />
								<CustomRoute condition="editor" path="/history" exact component={SendingHistory} />
								<CustomRoute condition="admin" path="/magazines" exact component={Magazines} />
								<CustomRoute condition="admin" path="/magazines/volumes" exact component={Volumes} />
							</AuthRouter>
						</Switch>
					</Home>
				</Switch>
			</Router>
		</AuthState>
	)
}

export default Routes
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PrivateRoute from "./components/PrivateRoute";
import Auth from "./screens/Auth";
import Dashboard from "./screens/Dashboard";

import actions from "./actions";

function App() {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.App.state);
	const isLogin = useSelector((state) => state.App.user.isLogin);

	useEffect(() => {
		dispatch(actions.App.getNewTokenSaga);
	}, []);

	useEffect(() => {
		if (isLogin === true) {
			setInterval(() => {
				dispatch(actions.App.getNewSilentTokenSaga);
			}, 60000);
		}
	}, [isLogin]);

	return (
		<Router>
			{state.loading ? (
				<h1>Loading...</h1>
			) : (
				<Switch>
					<PrivateRoute exact path="/dashboard" component={Dashboard} />
					<Route exact path="/">
						<Auth />
					</Route>
				</Switch>
			)}
		</Router>
	);
}

export default App;

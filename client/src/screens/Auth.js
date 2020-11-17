import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

import config from "../config";
import { login, register } from "../api/authApi";
import actions from "../actions";

function Auth() {
	const dispatch = useDispatch();
	const [formLogin, setFormLogin] = useState(true);
	const [dataForm, setDataForm] = useState({
		name: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const user = useSelector((state) => state.App.user);

	const openGoogleWindow = () => {
		const googleWindow = window.open(
			`${config.url}/api/auth/google`,
			"_blank",
			"toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400"
		);
		googleWindow.onunload = () => {
			dispatch(actions.App.getNewSilentTokenSaga);
		};
	};
	const handleChange = ({ target }) => {
		const { input } = target.dataset;
		const { value } = target;

		setDataForm({
			...dataForm,
			[input]: value,
		});
	};

	const handleSubmit = async () => {
		if (formLogin) {
			try {
				const data = { email: dataForm.email, password: dataForm.password };
				const user = await login(data);
				dispatch(actions.App.saveUser(user));
			} catch (err) {
				setError(JSON.stringify(err));
			}
		} else {
			try {
				const user = await register(dataForm);
			} catch (err) {}
		}
	};

	return (
		// eslint-disable-next-line react/jsx-filename-extension

		<div className="container">
			{user.token && <Redirect to="/dashboard" />}

			<div className="presentation">
				<h1 className="title">Learn to code by watching others</h1>
				<p className="subtitle">
					See how experienced developers solve problems in real-time. Watching
					scripted tutorials is great, but understanding how developers think is
					invaluable.{" "}
				</p>
			</div>

			<div className="sign-form-container">
				<button
					type="submit"
					className="try-btn"
					onClick={() => setFormLogin(!formLogin)}
				>
					<span>{formLogin ? "Register" : "Login"}</span>
				</button>

				{error && <h2>Error:{error}</h2>}
				{!formLogin ? (
					<RegisterForm
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						name={dataForm.name}
						lastName={dataForm.lastName}
						email={dataForm.email}
						password={dataForm.password}
					/>
				) : (
					<LoginForm
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						email={dataForm.email}
						lastName={dataForm.lastName}
					/>
				)}
				<input type="button" onClick={openGoogleWindow} value="Google" />
			</div>
		</div>
	);
}

export default Auth;

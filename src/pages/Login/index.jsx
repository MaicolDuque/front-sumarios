import React, { useState, useContext, useEffect } from "react"
import axios from "axios";
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { useGoogleLogin } from "react-google-login";

import config from '../../config'
import { ContextCreate } from "../../Auth/Context"; //Context

const Login = () => {
	const history = useHistory();
	const [data, setData] = useState({
		email: ""
	})

	const { iniciarSesion, disableImgInit } = useContext(ContextCreate);

	const submitData = () => {
		axios(
			{
				method: "POST",
				baseURL: `${process.env.REACT_APP_PROTOCOL_BACKEND}://${process.env.REACT_APP_HOST_BACKEND}${process.env.REACT_APP_PORT_BACKEND}`,
				url: `${process.env.REACT_APP_API}`,
				data,
			},

		)
			.then((res) => {
				if (res.data.msg) {
					throw new Error(res.data.msg);
				}
				iniciarSesion(res.data.token);
				sessionStorage.setItem("token", res.data.token);
				history.push("/")
			})
			.catch((error) => {
				if (!axios.isCancel(error)) {
					console.error(error);
				}
			});
	}

	const onSuccess = (res) => {
		console.log('Login Success: currentUser:', res.profileObj.email);
		setData({
			email: res.profileObj.email,
		});
	}

	useEffect(() => {
		submitData();
	}, [data.email])

	const onFailure = (res) => {
		console.log('Login failed: res:', res);
	}
	const { signIn } = useGoogleLogin({
		onSuccess,
		onFailure,
		clientId: config.google.clientID,
		isSignedIn: true,
		accessType: 'offline',
	})

	return (
		<div style={{width: '50%', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end'}}>
			<Button color="inherit"
				onClick={() => {
					signIn();
				}}
			>Iniciar sesión</Button>
			<Button  color="inherit" 
				onClick={() => {
					disableImgInit()
					history.push("/register");
				}}>Registro</Button>
		</div>
	);
}

export default Login;
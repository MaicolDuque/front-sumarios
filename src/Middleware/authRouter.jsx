import React, { useContext, useState, useCallback, useEffect } from "react";

//Context
import { ContextCreate } from "../Auth/Context";

//librerias
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

const AuthRoute = ({ component: Component, children, ...props }) => {
    const { token, autenticarToken, cerrarSesion } = useContext(ContextCreate);

    const [data, setData] = useState();

    const getData = useCallback(
        async () => {
            await axios({
                method: "GET",
                baseURL: `${process.env.REACT_APP_PROTOCOL_BACKEND}://${process.env.REACT_APP_HOST_BACKEND}${process.env.REACT_APP_PORT_BACKEND}`,
                url: `${process.env.REACT_APP_VERIFY_TOKEN}`,
                headers: {
                    token
                },
            })
                .then((res) => {
                    if (res.data.error) {
                        throw new Error(res.data.data.error);
                    }
                    setData(res.data);
                })
                .catch((error) => {
                    if (!axios.isCancel(error)) {
                        cerrarSesion();
                        console.error(error);
                    }
                });
        },
        [token, cerrarSesion]
    );

    useEffect(() => {
        getData();
        if (data) {
            autenticarToken(data, true);
        }
    }, [data]);

    if (!token) {
        return <Redirect to="/" />;
    }
    return <Route {...props}>{children}</Route>;
}

export default AuthRoute;
import React, { useState, createContext } from "react"
import jwt_decode from "jwt-decode";

export const ContextCreate = createContext();

const Context = ({ children }) => {

    const [data, setData] = useState({
        token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
        autenticado: false,
        strData: "",
        user: localStorage.getItem("token") ? jwt_decode(localStorage.getItem("token").split(' ')[1]) : null
    });
    const iniciarSesion = (token) => {
        localStorage.setItem("token", token);
        setData((prevState) => ({
            ...prevState,
            token,
        }));
    };

    const cerrarSesion = () => {
        setData((prevState) => ({
            ...prevState,
            token: null,
            strData: "",
        }));
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
    };
    const autenticarToken = (data, boolean) => {
        if (boolean) {
            setData((prevState) => ({
                ...prevState,
                strData: data,
            }));
        } else {
            localStorage.removeItem("token");
            setData((prevState) => ({
                ...prevState,
                token: null,
                strData: "",
            }));
        }
    };

    return (
        <ContextCreate.Provider
            value={{
                iniciarSesion,
                cerrarSesion,
                autenticarToken,
                token: data.token,
                strData: data.strData,
                infoUser: data.user
            }}
        >
            {children}
        </ContextCreate.Provider>
    );
}

export default Context;

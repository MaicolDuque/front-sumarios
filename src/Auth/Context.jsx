import React, { useState, createContext } from "react"
import jwt_decode from "jwt-decode";

export const ContextCreate = createContext();

const Context = ({ children }) => {

    const [data, setData] = useState({
        token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
        autenticado: false,
        validationRegister: false,
        user: localStorage.getItem("token") ? jwt_decode(localStorage.getItem("token").split(' ')[1]) : null
    });

    // debugger;
    const iniciarSesion = (token) => {
        localStorage.setItem("token", token);
        setData((prevState) => ({
            ...prevState,
            token,
            validationRegister: true,
            user: jwt_decode(localStorage.getItem("token").split(' ')[1])
        }));
    };

    const cerrarSesion = () => {
        setData((prevState) => ({
            ...prevState,
            token: null,
            validationRegister: false,
            user:"",
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
    const disableImgInit = ()=>{
        setData((prevState)=>({
            ...prevState,
            validationRegister: true
        }))
    }
    const enableImgInit = ()=>{
        setData((prevState)=>({
            ...prevState,
            validationRegister: false
        }))
    }

    return (
        <ContextCreate.Provider
            value={{
                iniciarSesion,
                cerrarSesion,
                autenticarToken,
                disableImgInit,
                enableImgInit,
                token: data.token,
                validationRegister: data.validationRegister,
                infoUser: data.user
            }}
        >
            {children}
        </ContextCreate.Provider>
    );
}

export default Context;

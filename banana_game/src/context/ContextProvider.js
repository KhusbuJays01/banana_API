import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ToastOptions } from "../components/ToastOptions";
import Loading from "../components/Loading.js";
import 'react-toastify/dist/ReactToastify.css'

const StateContext = createContext({
    currentUser: {},
    userToken: {},
    toast: {
        message: null,
        type: null,
        options: {},
        show: false,
    },
    setCurrentUser: () => { },
    setUserToken: () => { },
});



export const ContextProvider = ({ children }) => {
    const [currentUser, _setCurrentUser] = useState(JSON.parse(localStorage.getItem('user-info')) || {});
    const [userToken, _setUserToken] = useState(localStorage.getItem('token') || '');
    const [toastData, setToastData] = useState({ message: '', options: {}, show: false });
    const [isLoading, setIsLoading] = useState(false);

    const setUserToken = (token) => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
        _setUserToken(token);
    }

    const setCurrentUser = (user) => {
        if (user) {
            localStorage.setItem('user-info', JSON.stringify(user))
        } else {
            localStorage.removeItem('user-info', {})
        }
        _setCurrentUser(user);
    }

    const showToast = (message, type) => {
        if (type === 'warn') {
            toast.warn(message, ToastOptions);
        }
        if (type === 'success') {
            toast.success(message, ToastOptions);
        }
        if (type === 'error') {
            toast.error(message, ToastOptions);
        }
        if (type === 'default') {
            toast(message, ToastOptions);
        }
        if (type === 'info') {
            toast.info(message, ToastOptions);
        }
    }

    return (
        <StateContext.Provider value={{
            currentUser,
            setCurrentUser,
            userToken,
            setUserToken,
            toast: toastData,
            showToast,
            isLoading,
            setIsLoading,

        }}>
            <ToastContainer />
            <Loading />
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
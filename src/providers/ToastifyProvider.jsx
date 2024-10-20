// src/context/ToastifyContext.js
import React, { createContext, useContext } from "react"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

// Create a Context for Toastify
const ToastifyContext = createContext()

// Create the provider component
export const ToastifyProvider = ({ children }) => {
  // Define the notification functions
    const notifySuccess = (message, options = {}) => toast.success(message, options);
    const notifyError = (message, options = {}) => toast.error(message, options);
    const notifyInfo = (message, options = {}) => toast.info(message, options);
    const notifyWarning = (message, options = {}) => toast.warning(message, options);
    const notifyCustom = (message, options = {}) => toast(message, options);
    const dismissToast = (toastId) => toast.dismiss(toastId);
    const dismissAllToasts = () => toast.dismiss();

    return (
        <ToastifyContext.Provider
        value={{
        notifySuccess,
        notifyError,
        notifyInfo,
        notifyWarning,
        notifyCustom,
        dismissToast,
        dismissAllToasts,
    }}>
    {children}
    <ToastContainer position="top-right" autoClose={5000} />
    </ToastifyContext.Provider>);
};

// Custom hook to use the Toastify context
export const useToastify = () => {
    return useContext(ToastifyContext);
};

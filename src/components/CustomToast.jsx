import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Reusable function to show toast with custom content
export const showToast = (content, type = 'default', options = {}) => {
    const defaultOptions = {
        
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    };

    const toastOptions = { ...defaultOptions, ...options };

    switch (type) {
        case 'success':
            return toast.success(content, toastOptions);
        case 'error':
            return toast.error(content, toastOptions);
        case 'info':
            return toast.info(content, toastOptions);
        case 'warning':
            return toast.warning(content, toastOptions);
        default:
            return toast(content, toastOptions);
    }
};
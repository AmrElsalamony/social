import { Navigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './../../Contexts/AuthContext';

const ProtectedRoute = ({ children }) => {

    const {isLogged} = useContext(AuthContext)


    return isLogged ? children : <Navigate to={"/login"} />



}

export default ProtectedRoute;

import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLAyout = () => {
    return (
        <div>
        <Outlet/>
        </div>
    );
}

export default AuthLAyout;

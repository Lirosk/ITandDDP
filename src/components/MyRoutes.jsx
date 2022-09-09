import React from 'react'
import { Outlet, Route, Routes, Switch, Navigate } from 'react-router-dom'
import { General } from '../pages/General'
import { Signin } from '../pages/Signin'


export function MyRoutes() {
    return (
        <Routes>
            <Route path='signin' element={<Signin />} />
            {/* <Route path='general' element={<General />} /> */}
            {/* <Route path='*' element={<Navigate to='general' reset />} /> */}
        </Routes>
    );
}

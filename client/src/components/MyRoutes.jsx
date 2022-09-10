import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { General } from '../pages/General'
import RequireSignin from './RequireSignin';


export function MyRoutes() {
    return (
        <Routes>
            <Route element={<RequireSignin />} >
                <Route path='/general' element={<General />} />
            </Route>
            <Route path='*' element={<Navigate to='/general' reset />} />
        </Routes >
    );
}

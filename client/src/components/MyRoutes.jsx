import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { General } from '../pages/General'
import { Signin } from '../pages/Signin'
import AfterSignin from './AfterSignin';
import RequireSignin from './RequireSignin';


export function MyRoutes() {
    return (
        <Routes>
            <Route element={<RequireSignin />} >
                <Route element={<AfterSignin />} >
                    <Route path='general' element={<General />} />
                </Route>
            </Route>
            <Route path='*' element={<Navigate to='signin' reset />} />
        </Routes >
    );
}

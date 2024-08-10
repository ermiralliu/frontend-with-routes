import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Admin from './Pages/Admin';
import Home from './Pages';
import ErrorPage from "./Pages/ErrorPage";
import AnimalInsertPage from "./Pages/AnimalInsertPage";
import './Pages/index.css';
import { DarkModeToggle } from "./Components";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
        errorElement: <ErrorPage/>
    },
    {
        path: '/admin/*',
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true, 
                element: <Admin/>
            },
            {
                path: 'new',        //this is a subroute in admin now. Good. React Routes are ez
                element: <AnimalInsertPage/>
            }
        ]
    }
]);

// const isDark = JSON.parse(localStorage.getItem('darkMode') ?? 'true') as boolean;
// document.body.className = isDark ? 'dark'  : 'light';   //this way it doesn't change between routes

const root = createRoot( document.getElementById('root') as HTMLElement );

root.render(
    <React.StrictMode>
        <DarkModeToggle/>    
        <RouterProvider router={router}/>
    </React.StrictMode>
);
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import Admin from './Pages/Admin/Admin';
import Home from './Pages/Home';
import ErrorPage from "./Pages/ErrorPage";
import AnimalInsertPage from "./Pages/InsertPage/AnimalInsertPage";
import './Pages/Home/index.css';
import { DarkModeToggle } from "./Pages/Home/Components";
import LogInPage from "./Pages/Admin/LogInPage";
import { LoggedIn } from "./Pages/Admin/LoggedIn";

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
		errorElement: <ErrorPage />
	},
	{
		path: '/admin/*',
		errorElement: <ErrorPage />,
		children: [
      {
        index: true,
        element: <LogInPage/>
      },
      {
        path: 'user',
        element: <LoggedIn/>
      },
			{
				path: 'new',        //this is a subroute in admin now. Good. React Routes are ez
				element: <AnimalInsertPage />
			},
      
		]
	}
]);

export function App(){
  return (   
   <>
      <DarkModeToggle />
      <RouterProvider router={router} />
    </>
  ) 
}

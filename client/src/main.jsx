import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import SearchRecipes from './pages/SearchRecipes'
import SavedRecipes from './pages/SavedRecipes'
import LoginForm from './components/LoginForm.jsx'
import SignupForm from "./components/SignupForm.jsx"

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <SearchRecipes />
      }, {
        path: '/saved',
        element: <SavedRecipes />
      },
      {
        path: '/login',
        element: <LoginForm />
      },
      {
        path: '/signup',
        element: <SignupForm />
      },
      {
        path: '/savedRecipes',
        element: <SavedRecipes />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

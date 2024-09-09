import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
 
  RouterProvider,

} from "react-router-dom";
import Sign from './Pages/Sign/Sign';
import Login from './Pages/Login/Login';
import Creat from './Pages/Creat/Creat';
import _ReportPage from './Pages/_RepoptPage/RepoptPage';
import Created from './Pages/Created/Created';
import ViewReport from './Pages/ViewReport/ViewReport';
import { AuthProvider } from './Context/AuthProvider';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "sign",
    element: <Sign/>,
  },
  {
    path: "login",
    element: <Login/>,
  },
  {
    path: "creat",
    element: <Creat/>,
  },

  {
    path: "reportPage",
    element: <_ReportPage/>,
  },
  {
    path: "created",
    element: <Created/>,
  },
  {
    path: "viewreport",
    element: <ViewReport/>,
  },




]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

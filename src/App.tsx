// import styled from 'styled-components';
import { DittoProvider } from './context/themeContext';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from './layout/Layout';

import Home from './pages/Home';
import ErrorPage from './pages/Error';
import Login from './pages/Login';
import Buttons from './pages/Buttons';
import LangPage from './pages/LangPage';
import Category from './pages/Category';
import Review from './pages/Review';

const router = createBrowserRouter([
  {
    path: '/',

    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    errorElement: (
      <Layout>
        <ErrorPage />
      </Layout>
    ),
  },
  {
    path: '/login',
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: '/buttons',
    element: (
      <Layout>
        <Buttons />
      </Layout>
    ),
  },
  {
    path: '/lang',
    element: (
      <Layout>
        <LangPage />
      </Layout>
    ),
  },
  {
    path: '/category',
    element: (
      <Layout>
        <Category />
      </Layout>
    ),
  },
  {
    path: '/review',
    element: (
      <Layout>
        <Review />
      </Layout>
    ),
  },
]);

function App() {
  return (
    <>
      <DittoProvider>
        <RouterProvider router={router} />
      </DittoProvider>
    </>
  );
}

export default App;

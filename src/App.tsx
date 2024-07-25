// import styled from 'styled-components';
import { DittoProvider } from './context/themeContext';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './App.css';
import Layout from './layout/Layout';
import Home from './pages/Home';
import ErrorPage from './pages/Error';
import LangPage from './pages/LangPage';
import SearchPage from './pages/SearchPage';
import TapPage from './pages/TapPage';

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
    path: '/lang',
    element: (
      <Layout>
        <LangPage />
      </Layout>
    ),
  },
  {
    path: '/searchPage',
    element: (
      <Layout>
        <SearchPage />
      </Layout>
    ),
  },
  {
    path: '/tapBar',
    element: (
      <Layout>
        <TapPage />
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

// import styled from 'styled-components';
import { DittoProvider } from './context/themeContext';

import './App.css';
import Layout from './layout/Layout';
import Home from './pages/Home';
import ErrorPage from './pages/Error';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

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

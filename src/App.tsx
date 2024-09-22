// import styled from 'styled-components';
import { DittoProvider } from './context/themeContext';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './App.css';
import Layout from './layout/Layout';
import Home from './pages/Home';
import ErrorPage from './pages/Error';
import LangPage from './pages/LangPage';
import Category from './pages/Category';
import Review from './pages/ReviewList';
import NewReview from './pages/NewReview';
import ReviewDetail from './pages/ReviewDetail';
import Search from './pages/Search';
import SearchResult from './pages/SearchResult';
import Join from './pages/Join';
import Report from './pages/Report';
import Spot from './pages/Spot';
import Around from './pages/Around';
import List from './pages/List';
import Login from './pages/Login';

import Ditto from './pages/Ditto';
import DittoDetail from './pages/DittoDetail';
import DittoWrite from './pages/DittoWrite';
import SpotApply from './pages/SpotApply';
import Alarm from './pages/Alarm';
import EditProfile from './pages/EditProfile';
import Character from './pages/Character';
import Badge from './pages/Badge';
import { getAccessToken } from './store/authStore';
import HeaderToken from './api/https';
import MyPage from './pages/MyPage';

const router = createBrowserRouter([
  {
    path: '/',

    element: (
      <Layout GNBType="home">
        <Home />
      </Layout>
    ),
    errorElement: (
      <Layout GNBType="home">
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
    path: '/category',
    element: (
      <Layout GNBType="search">
        <Category />
      </Layout>
    ),
  },
  {
    path: '/category/:id',
    element: (
      <Layout GNBType="search">
        <List />
      </Layout>
    ),
  },
  {
    path: '/spot/:id',
    element: (
      <Layout GNBType="search">
        <Spot />
      </Layout>
    ),
  },
  {
    path: '/around/:id',

    element: (
      <Layout GNBType="search">
        <Around />
      </Layout>
    ),
  },
  {
    path: '/reviews/:id',
    element: (
      <Layout GNBType="search">
        <Review />
      </Layout>
    ),
  },
  {
    path: '/review/new/:id',
    element: (
      <Layout GNBType="search">
        <NewReview />
      </Layout>
    ),
  },
  {
    path: '/review/:id',
    element: (
      <Layout GNBType="search">
        <ReviewDetail />
      </Layout>
    ),
  },
  {
    path: '/search',
    element: (
      <Layout GNBType="search">
        <Search />
      </Layout>
    ),
  },
  {
    path: '/search-result',
    element: (
      <Layout GNBType="search">
        <SearchResult />
      </Layout>
    ),
  },

  {
    path: '/join',
    element: (
      <Layout>
        <Join />
      </Layout>
    ),
  },
  {
    path: '/report/:type/:id',

    element: (
      <Layout GNBType="search">
        <Report />
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
    path: '/ditto',

    element: (
      <Layout GNBType="ditto">
        <Ditto />
      </Layout>
    ),
  },
  {
    path: '/ditto/:id',

    element: (
      <Layout GNBType="ditto">
        <DittoDetail />
      </Layout>
    ),
  },
  {
    path: '/ditto/new',

    element: (
      <Layout>
        <DittoWrite />
      </Layout>
    ),
  },
  {
    path: '/spot-apply',

    element: (
      <Layout>
        <SpotApply />
      </Layout>
    ),
  },
  {
    path: '/alarm',

    element: (
      <Layout GNBType="my">
        <Alarm />
      </Layout>
    ),
  },
  {
    path: '/editprofile',

    element: (
      <Layout GNBType="my">
        <EditProfile />
      </Layout>
    ),
  },
  {
    path: '/character',
    element: (
      <Layout GNBType="search">
        <Character />
      </Layout>
    ),
  },
  {
    path: '/badge',
    element: (
      <Layout GNBType="search">
        <Badge />
      </Layout>
    ),
  },
  {
    path: '/myPage',
    element: (
      <Layout GNBType="search">
        <MyPage />
      </Layout>
    ),
  },
]);

function App() {
  const token = getAccessToken();
  HeaderToken.set(token);

  return (
    <>
      <DittoProvider>
        <RouterProvider router={router} />
      </DittoProvider>
    </>
  );
}

export default App;

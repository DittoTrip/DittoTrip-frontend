// import styled from 'styled-components';
import { DittoProvider } from './context/themeContext';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import '../src/fonts/Font.css';

import './App.css';
import Layout from './layout/Layout';
import Home from './pages/Home';
import ErrorPage from './pages/Error';
import LangPage from './pages/LangPage';
import Category from './pages/Category';
import Review from './pages/ReviewList';
import NewReview from './pages/ReviewWrite';
import ReviewDetail from './pages/ReviewDetail';
import Search from './pages/Search';
import SearchResult from './pages/SearchResult';
import Join from './pages/Join';
import Report from './pages/Report';
import Around from './pages/Around';
import List from './pages/SpotList';
import Login from './pages/Login';

import Ditto from './pages/Ditto';
import DittoDetail from './pages/DittoDetail';
import DittoWrite from './pages/DittoWrite';
import SpotApply from './pages/SpotApply';
import Alarm from './pages/Alarm';
import EditProfile from './pages/EditProfile';
import Character from './pages/Character';
import Badge from './pages/Badge';
import { getAccessToken, getRefreshToken } from './store/authStore';
import HeaderToken from './api/https';
import MyPage from './pages/MyPage';
import Favorite from './pages/Favorite';
import Follow from './pages/Follow';
import FindPassword from './pages/FindPassword';
import EditNickname from './pages/EditNickname';
import EditPassword from './pages/EditPassword';
import MyDitto from './pages/MyDitto';
import MySpotApplyList from './pages/MySpotApplyList';
import MySpotApplyDetail from './pages/MySpotApplyDetail';
import Quest from './pages/Quest';
import VisitedSpotList from './pages/VisitedSpotList';
import Map from './pages/Map';
import SpotDetail from './pages/SpotDetail';

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
    path: '/spot/list/:id',
    element: (
      <Layout GNBType="search">
        <List />
      </Layout>
    ),
  },
  {
    path: '/spot/map/:id',
    element: (
      <Layout GNBType="search">
        <Map />
      </Layout>
    ),
  },
  {
    path: '/spot/:id',
    element: (
      <Layout GNBType="search">
        <SpotDetail />
      </Layout>
    ),
  },
  {
    path: '/around',

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
    path: '/review/new',
    element: (
      <Layout GNBType="search">
        <NewReview />
      </Layout>
    ),
  },
  {
    path: '/review/edit',
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
    path: '/ditto/edit',

    element: (
      <Layout>
        <DittoWrite />
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
    path: '/spot/new',

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
    path: '/edit-profile',

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
    path: '/my-page',
    element: (
      <Layout GNBType="my">
        <MyPage />
      </Layout>
    ),
  },

  {
    path: '/favorite',

    element: (
      <Layout GNBType="my">
        <Favorite />
      </Layout>
    ),
  },
  {
    path: '/follow/:id',

    element: (
      <Layout GNBType="my">
        <Follow />
      </Layout>
    ),
  },

  {
    path: '/find-password',

    element: (
      <Layout GNBType="my">
        <FindPassword />
      </Layout>
    ),
  },
  {
    path: '/edit-nickname',

    element: (
      <Layout GNBType="my">
        <EditNickname />
      </Layout>
    ),
  },
  {
    path: '/edit-password',

    element: (
      <Layout GNBType="my">
        <EditPassword />
      </Layout>
    ),
  },

  {
    path: '/user-ditto/:id',

    element: (
      <Layout GNBType="my">
        <MyDitto />
      </Layout>
    ),
  },
  {
    path: '/my-spotapply',

    element: (
      <Layout GNBType="my">
        <MySpotApplyList />
      </Layout>
    ),
  },
  {
    path: '/my-spotapply/:id',

    element: (
      <Layout GNBType="my">
        <MySpotApplyDetail />
      </Layout>
    ),
  },
  {
    path: '/quest/list',

    element: (
      <Layout GNBType="my">
        <Quest />
      </Layout>
    ),
  },
  {
    path: '/visited-spot/:id',
    element: (
      <Layout GNBType="my">
        <VisitedSpotList />
      </Layout>
    ),
  },
]);

function App() {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  HeaderToken.set(accessToken, refreshToken);

  return (
    <>
      <DittoProvider>
        <RouterProvider router={router} />
      </DittoProvider>
    </>
  );
}

export default App;

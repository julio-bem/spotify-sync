import React, { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ArtistProvider } from './contexts/ArtistContext';

const Home = lazy(() => import('./pages/Home'));
const ArtistDetail = lazy(() => import('./pages/ArtistDetail'));
const Playlists = lazy(() => import('./pages/Playlists'));
const Profile = lazy(() => import('./pages/Profile'));
const Artists = lazy(() => import('./pages/Artists'));
const Login = lazy(() => import('./pages/Login'));

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/artists"
          element={
            <ArtistProvider>
              <Artists />
            </ArtistProvider>
          }
        />
        <Route
          path="/artist/:name"
          element={
            <ArtistProvider>
              <ArtistDetail />
            </ArtistProvider>
          }
        />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;

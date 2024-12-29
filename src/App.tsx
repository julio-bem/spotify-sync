import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Artists from './pages/Artists';
import { ArtistProvider } from './contexts/ArtistContext';
import ArtistDetail from './pages/ArtistDetail';
import Playlists from './pages/Playlists';

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
      </Routes>
    </Router>
  );
};

export default App;

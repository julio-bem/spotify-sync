import React, { createContext, useContext, useState, useEffect } from 'react';

interface Artist {
  id: string;
  name: string;
  profilePic: string;
}

interface ArtistContextType {
  artist: Artist | null;
  setArtist: (artist: Artist) => void;
}

interface ArtistProviderTypes {
  children: React.ReactElement;
}

const ArtistContext = createContext<ArtistContextType | undefined>(undefined);

export const ArtistProvider: React.FC<ArtistProviderTypes> = ({ children }) => {
  const [artist, setArtist] = useState<Artist | null>(null);

  useEffect(() => {
    const storedArtist = localStorage.getItem('artist');
    if (storedArtist) {
      setArtist(JSON.parse(storedArtist));
    }
  }, []);

  const updateArtist = (artist: Artist) => {
    setArtist(artist);
    localStorage.setItem('artist', JSON.stringify(artist));
  };

  return (
    <ArtistContext.Provider value={{ artist, setArtist: updateArtist }}>
      {children}
    </ArtistContext.Provider>
  );
};

export const useArtist = () => {
  const context = useContext(ArtistContext);
  if (!context) {
    throw new Error('useArtist must be used within an ArtistProvider');
  }
  return context;
};

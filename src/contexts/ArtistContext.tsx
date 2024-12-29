import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Artist {
  id: string;
  name: string;
  profilePic: string;
}

interface ArtistContextProps {
  artist: Artist | null;
  setArtist: (artist: Artist) => void;
}

const ArtistContext = createContext<ArtistContextProps | undefined>(undefined);

export const ArtistProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [artist, setArtist] = useState<Artist | null>(null);

  return (
    <ArtistContext.Provider value={{ artist, setArtist }}>
      {children}
    </ArtistContext.Provider>
  );
};

export const useArtist = (): ArtistContextProps => {
  const context = useContext(ArtistContext);
  if (context === undefined) {
    throw new Error('useArtist must be used within an ArtistProvider');
  }
  return context;
};

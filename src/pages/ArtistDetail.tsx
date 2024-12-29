import React, { useCallback, useEffect, useState } from 'react';
import { useArtist } from '../contexts/ArtistContext';
import { useNavigate } from 'react-router-dom';

const ArtistDetail: React.FC = () => {
  const { artist } = useArtist();
  const navigate = useNavigate();

  const [albums, setAlbums] = useState([]);

  const fetchArtistAlbums = useCallback(
    async (artistId: string) => {
      const token = localStorage.getItem('accessToken');
      const limit = 50;

      try {
        const response = await fetch(
          `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setAlbums(data.items);
        } else if (response.status === 401) {
          navigate('/');
        } else {
          console.error('Erro ao buscar os albums:', response.statusText);
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (!artist || !artist.id) {
      navigate('/artists');
    } else {
      fetchArtistAlbums(artist.id); 
    }
  }, [artist, fetchArtistAlbums, navigate]);

  if (!artist) {
    return null; 
  }

  return (
    <div>
      <button onClick={() => navigate(-1)}>Voltar</button>
      <h1>{artist.name}</h1>
      <img src={artist.profilePic} alt={artist.name} />
      <p>ID: {artist.id}</p>
      {albums.map((album) => (
        <div key={album.id}>{album.name}</div>
      ))}
    </div>
  );
};

export default ArtistDetail;

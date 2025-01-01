import { useState, useEffect } from 'react';

const useMediaQuery = () => {
  const [mediaType, setMediaType] = useState('desktop');

  useEffect(() => {
    const updateMediaType = () => {
      if (window.matchMedia('(max-width: 767px)').matches) {
        setMediaType('mobile');
      } else if (
        window.matchMedia('(min-width: 768px) and (max-width: 1199px)').matches
      ) {
        setMediaType('tablet');
      } else {
        setMediaType('desktop');
      }
    };

    updateMediaType();

    window.addEventListener('resize', updateMediaType);

    return () => window.removeEventListener('resize', updateMediaType);
  }, []);

  return mediaType;
};

export default useMediaQuery;

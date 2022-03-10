import { useLocation } from 'react-router-dom';
import { parse } from 'qs';

const useQuery = (location?: any) => {
  const locationResult = location || useLocation();

  return parse(locationResult.search, {
    ignoreQueryPrefix: true,
    decoder(str, defaultDecoder, charset, type) {
      if (type === 'key') {
        return defaultDecoder(str); // Decoded key
      } else if (type === 'value') {
        return str; // Decoded value
      }
    },
  }) as Record<any, any>;
};

export default useQuery;

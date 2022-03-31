import { useLocation } from 'react-router-dom';
import { parse } from 'qs';

const useQuery = () => {
  const location = useLocation();

  return parse(location.search, {
    ignoreQueryPrefix: true,
    decoder(str, defaultDecoder, charset, type) {
      if (type === 'key') {
        return defaultDecoder(str); // Decoded key
      } else if (type === 'value') {
        return str; // Decoded value
      }
    },
  });
};

export default useQuery;

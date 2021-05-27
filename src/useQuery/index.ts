import { useLocation } from 'react-router-dom';
import { parse } from 'qs';

const useQuery = () => {
  const location = useLocation();

  return parse(location.search, { ignoreQueryPrefix: true }) as Record<any, any>;
};

export default useQuery;

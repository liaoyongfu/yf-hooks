import { useLocation } from 'react-router-dom';
import { parse } from 'qs';

const useQuery = (location?: any) => {
  const locationResult = location || useLocation();

  return parse(locationResult.search, {
    ignoreQueryPrefix: true,
  }) as Record<any, any>;
};

export default useQuery;

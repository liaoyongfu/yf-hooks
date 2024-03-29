import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { stringify } from 'qs';
import useQuery from '@/useQuery';

export interface QueryCache {
  data: Record<string, any>;
  initData: Record<string, any>;
  autoCache: boolean;
  location?: any;
}

const useQueryCache = ({
  data,
  initData,
  autoCache = false,
  location: originLocation,
}: QueryCache) => {
  const history = useHistory();
  const location = originLocation || useLocation();
  const query = useQuery();

  const updateToQuery = (object: Record<string, any>) => {
    const search = {
      ...query,
      ...object,
    };
    const noEmptyObject: Record<any, any> = {};
    Object.keys(search).forEach((propName) => {
      if (typeof search[propName] !== 'undefined' && search[propName] !== '') {
        noEmptyObject[propName] = search[propName];
      }
    });
    history.replace({
      pathname: location.pathname,
      search: stringify(noEmptyObject),
    });
  };

  const cache = () => updateToQuery(data);

  const resetCache = () => {
    updateToQuery(initData);
  };

  useEffect(() => {
    if (!autoCache) return;
    updateToQuery(data);
  }, [JSON.stringify(data), autoCache]);

  return {
    cache,
    resetCache,
    updateToQuery,
  };
};

export default useQueryCache;

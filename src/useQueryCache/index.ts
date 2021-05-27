import { useState, useEffect } from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import {stringify} from "qs";
import useQuery from "@/useQuery";

export interface QueryCache {
  data: Record<string, any>;
  initData: Record<string, any>;
  autoCache: boolean;
}

const useQueryCache = ({data, initData, autoCache = false}: QueryCache) => {
  const history = useHistory();
  const location = useLocation();
  const query = useQuery();

  const updateToQuery = (object: Record<string, any>) => {
    history.replace({
      pathname: location.pathname,
      search: stringify({
        ...query,
        ...object
      })
    });
  }

  const cache = () => updateToQuery(data);

  const resetCache = () => updateToQuery(initData);

  useEffect(() => {
    if(!autoCache) return;
    updateToQuery(data);
  },[JSON.stringify(data), autoCache]);

  return {
    cache,
    resetCache,
    updateToQuery
  }
};

export default useQueryCache;

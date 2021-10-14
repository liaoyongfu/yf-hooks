import useQuery from '@/useQuery';
import useQueryCache from '@/useQueryCache';
import { useDeepCompareEffect } from 'react-use';

export interface CacheListProps {
  reqData?: Record<any, any>;
  initReqData?: Record<any, any>;
  initFormState?: Record<any, any>;
  form: {
    setFieldValues: any;
    getFormData: any;
    reset: any;
  };
  values: Record<any, any>;
  listState: {
    query: any;
    refresh: any;
  };
  excludedFields?: string[];
}

const getReqData = (values: Record<any, any>) => {
  const reqData: Record<any, any> = {};

  Object.keys(values).forEach((fieldName) => {
    const fieldValue = values[fieldName];

    // 处理日期格式
    if (
      typeof fieldValue === 'object' &&
      typeof fieldValue.start !== 'undefined' &&
      typeof fieldValue.end !== 'undefined'
    ) {
      reqData[`${fieldName}Begin`] = fieldValue.start || '';
      reqData[`${fieldName}End`] = fieldValue.end || '';
    } else if (typeof fieldValue === 'boolean') {
      // 处理布尔值
      reqData[fieldName] = fieldValue ? '1' : '0';
    } else if (Array.isArray(fieldValue)) {
      reqData[fieldName] = fieldValue.join(',');
    } else {
      reqData[fieldName] = fieldValue;
    }
  });

  return reqData;
};

const getInitFormState = (
  values: Record<any, any>,
  query: Record<any, any>,
) => {
  const initFormState: Record<any, any> = {};

  Object.keys(query).forEach((fieldName) => {
    const fieldValue = query[fieldName];

    if (fieldName.endsWith('Begin')) {
      if (initFormState[fieldName.replace('Begin', '')]) {
        initFormState[fieldName.replace('Begin', '')].start = fieldValue;
      } else {
        initFormState[fieldName.replace('Begin', '')] = {
          start: fieldValue,
          end: '',
        };
      }
    } else if (fieldName.endsWith('End')) {
      if (initFormState[fieldName.replace('End', '')]) {
        initFormState[fieldName.replace('End', '')].end = fieldValue;
      } else {
        initFormState[fieldName.replace('End', '')] = {
          start: '',
          end: fieldValue,
        };
      }
    } else if (Array.isArray(values[fieldName])) {
      initFormState[fieldName] = fieldValue ? fieldValue.split(',') : [];
    } else {
      initFormState[fieldName] = fieldValue;
    }
  });

  return initFormState;
};

const removeExcludeFields = (
  values: Record<any, any>,
  excludedFields: string[] = [],
) => {
  const result: Record<any, any> = {};

  Object.keys(values).forEach((fieldName) => {
    if (!excludedFields.includes(fieldName)) {
      result[fieldName] = values[fieldName];
    }
  });

  return result;
};

const getInitReqData = (reqData: Record<any, any>, query: Record<any, any>) => {
  const result: Record<any, any> = {};

  Object.keys(reqData).forEach((fieldName) => {
    if (typeof query[fieldName] !== 'undefined') {
      result[fieldName] = query[fieldName];
    } else {
      result[fieldName] = '';
    }
  });

  return result;
};

const useCacheList = ({
  form,
  values,
  listState,
  excludedFields,
  reqData: userReqData,
  initReqData: userInitReqData,
  initFormState: userInitFormState,
}: CacheListProps) => {
  const query = useQuery();
  const reqData = removeExcludeFields(
    {
      ...getReqData(values),
      ...userReqData,
    },
    excludedFields,
  );
  const initReqData = removeExcludeFields(
    {
      ...getInitReqData(reqData, query),
      ...userInitReqData,
    },
    excludedFields,
  );
  const initFormState = {
    ...getInitFormState(values, query),
    ...userInitFormState,
  };
  const emptyInitReqData: Record<any, any> = {};

  Object.keys(initReqData).forEach((fieldName) => {
    const fieldValue = initReqData[fieldName];

    if (Array.isArray(fieldValue)) {
      emptyInitReqData[fieldName] = [];
    } else if (typeof fieldValue === 'object') {
      emptyInitReqData[fieldName] = {};
    } else {
      emptyInitReqData[fieldName] = '';
    }
  });
  const { resetCache, cache, updateToQuery } = useQueryCache({
    data: reqData,
    autoCache: false,
    initData: emptyInitReqData,
  });

  const search = () => {
    cache();
  };

  const reset = () => {
    form.reset();
    form.setFieldValues(initFormState);
    resetCache();
  };

  useDeepCompareEffect(() => {
    form.reset();
    form.setFieldValues(initFormState);
  }, [initFormState]);

  useDeepCompareEffect(() => {
    listState.query(initReqData);
  }, [initReqData]);

  return {
    search,
    reset,
    updateToQuery,
  };
};

export default useCacheList;

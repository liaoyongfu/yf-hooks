import useQuery from '@/useQuery';
import useQueryCache from '@/useQueryCache';
import { useEffect, useState } from 'react';

export interface CacheListProps {
  /**
   * 请求参数，如果表单值和查询字段值一样或者日期，则可以不用指定，否则需要自行指定
   */
  reqData?: Record<any, any>;
  /**
   * 初始请求参数，同上
   */
  initReqData?: Record<any, any>;
  /**
   * 初始表单值
   */
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
  /**
   * 排除请求的字段
   */
  excludedFields?: string[];
  /**
   * CalendarRange 组件开始日期字段名
   */
  calendarBeginName?: string;
  /**
   * CalendarRange 组件结束日期字段名
   */
  calendarEndName?: string;
  /**
   * 因为 shareui-form 3.x 的 CalendarRange 的值是数组，而以下是 { start: xx, end: xx}，所以需要指定 CalendarRange 的值是否是对象模式，不然里面不知道怎么做映射关系，默认是 true
   */
  calendarIsObject?: boolean;
}

const getReqData = (
  values: Record<any, any>,
  calendarBeginName: string,
  calendarEndName: string,
  calendarIsObject: boolean,
) => {
  const reqData: Record<any, any> = {};

  Object.keys(values).forEach((fieldName) => {
    const fieldValue = values[fieldName];

    // 处理日期格式
    if (
      calendarIsObject &&
      typeof fieldValue === 'object' &&
      typeof fieldValue.start !== 'undefined' &&
      typeof fieldValue.end !== 'undefined'
    ) {
      reqData[`${fieldName}${calendarBeginName}`] = fieldValue.start || '';
      reqData[`${fieldName}${calendarEndName}`] = fieldValue.end || '';
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
  calendarBeginName: string,
  calendarEndName: string,
  calendarIsObject: boolean,
) => {
  const initFormState: Record<any, any> = {};

  Object.keys(query).forEach((fieldName) => {
    if (!Object.keys(values).includes(fieldName)) return;
    const fieldValue = query[fieldName];

    if (calendarIsObject && fieldName.endsWith(calendarBeginName)) {
      if (initFormState[fieldName.replace(calendarBeginName, '')]) {
        initFormState[fieldName.replace(calendarBeginName, '')].start =
          fieldValue;
      } else {
        initFormState[fieldName.replace(calendarBeginName, '')] = {
          start: fieldValue,
          end: '',
        };
      }
    } else if (calendarIsObject && fieldName.endsWith('End')) {
      if (initFormState[fieldName.replace(calendarEndName, '')]) {
        initFormState[fieldName.replace(calendarEndName, '')].end = fieldValue;
      } else {
        initFormState[fieldName.replace(calendarEndName, '')] = {
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
  calendarBeginName = 'Begin',
  calendarEndName = 'End',
  calendarIsObject = true,
}: CacheListProps) => {
  const query = useQuery();
  const reqData = removeExcludeFields(
    {
      ...getReqData(
        values,
        calendarBeginName,
        calendarEndName,
        calendarIsObject,
      ),
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
    ...getInitFormState(
      values,
      query,
      calendarBeginName,
      calendarEndName,
      calendarIsObject,
    ),
    ...userInitFormState,
  };
  const emptyInitReqData: Record<any, any> = {};

  Object.keys(initReqData).forEach((fieldName) => {
    if (!Object.keys(values).includes(fieldName)) return;
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
    // 如果查询条件没变，也应该请求
    if (JSON.stringify(reqData) === JSON.stringify(initReqData)) {
      listState.refresh();
    }
  };

  const reset = () => {
    form.reset();
    form.setFieldValues(initFormState);
    resetCache();
  };

  useEffect(() => {
    form.reset();
    form.setFieldValues(initFormState);
  }, [JSON.stringify(initFormState)]);

  useEffect(() => {
    listState.query(initReqData);
  }, [JSON.stringify(initReqData)]);

  return {
    search,
    reset,
    updateToQuery,
  };
};

export default useCacheList;

---
group:
  path: /hooks
---

## useCacheList

PC 端列表页

```tsx
import React from 'react';
import {
  useForm,
  SearchForm,
  Input,
  RadioGroup,
  CalendarRage,
} from '@share/shareui-form';
import { useList } from '@share/list';
import { useCacheList } from 'yf-hooks';

const Demo = () => {
  const query = useQuery();
  const { XZQH: userXzqh } = useUserInfo();
  const [formData, form] = useForm({});
  const listState = useList({
    dataSource: async (params) => {
      // 有初始值时需要防止重复请求
      if (!params.data.xzqh)
        return {
          page: {
            currentPage: 1,
            totalPage: 0,
            totalNum: 0,
          },
          list: [],
        };
      const res = await request('/diagnose/findConfPsList.do', {
        method: 'POST',
        body: params,
      });

      return res;
    },
    autoLoad: false,
    uniqKey: 'id',
  });
  const { search, reset } = useCacheList({
    form,
    listState,
    reqData: {
      regTimeStart: formData.regTime.start,
    },
    initReqData: {
      xzqh: query.xzqh || userXzqh,
    },
    initFormState: {
      xzqh: query.xzqh || userXzqh,
    },
    // 请求时不传递字段
    excludedFields: ['regTimeBegin'],
  });
  return (
    <div>
      <SearchForm query={search} reset={reset}>
        <Division field="xzqh" label="行政区划" />
        <Input field="name" />
        <RadioGroup options={TrueFalse} field="isJn" label="是否境内" />
        <CalendarRange field="regTime" label="申请时间" />
      </SearchForm>
    </div>
  );
};

export default Demo;
```

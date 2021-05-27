---
group:
  path: /hooks
---
## useQueryCache

> useQueryCache({ data: Record<string, any>, initData: Record<string, any>, autoCache: boolean = false }) => { cache: () => void, resetCache: () => void, updateToQuery: (object: Record<string, nay>) }

缓存查询条件的功能比较常见，但是 React 原生不支持 `keep-alive` 功能。所以我们现在的做法是将查询条件缓存到 url 之上，这样进入详细页返回列表可以记住查询条件。


````tsx
import React, { useState, useEffect } from 'react';
import { Input, Button, message } from 'antd';
import { useQueryCache, useQuery } from 'yf-hooks';

export default () => {
    const query = useQuery();
    const [userName, setUserName] = useState(query.name || '');
    const reqData = {
        name: userName
    };
    const initialReqData = {
        name: ''
    };
    const { cache, resetCache, updateToQuery } = useQueryCache({
      data: reqData,
      initData: initialReqData
    });
    const queryList = (data) => {
      message.success('触发查询，查询条件：' + JSON.stringify(data));
    };
    const handleSubmit = e => {
        e.preventDefault();
        cache();
        queryList(reqData);
    };
    const handleReset = () => {
        setUserName('');
        resetCache();
        queryList(initialReqData);
    }
    
    useEffect(() => {
        queryList(initialReqData);
    }, []);
    return (
      <div>
        <form onSubmit={handleSubmit}>
          用户名：<Input value={userName} onChange={e => setUserName(e.target.value)} style={{width: 120}} />
          <Button type="primary" style={{margin: '0 15px'}} htmlType="submit">查询</Button>
          <Button type="default" onClick={handleReset}>重置</Button>
        </form>
        <div style={{marginTop: 15}}>
          页面路径：{window.location.href}
        </div>
      </div>
    )
};
````
在移动端，一般查询条件是实时的，我们只需传递 `autoCache` 为 `true` 即可

````tsx
import React, { useState, useEffect } from 'react';
import { Input, Button, message } from 'antd';
import { useQueryCache, useQuery } from 'yf-hooks';

export default () => {
    const query = useQuery();
    const [userName, setUserName] = useState(query.name || '');
    const reqData = {
        name: userName
    };
    const initialReqData = {
        name: ''
    };
    const { updateToQuery } = useQueryCache({
      data: reqData,
      initData: initialReqData
    });
    const queryList = (data) => {
      message.success('触发查询，查询条件：' + JSON.stringify(data));
    };
    
    useEffect(() => {
        queryList(reqData);
    }, [JSON.stringify(reqData)]);
    
    return (
      <div>
          用户名：<Input value={userName} onChange={e => {
          setUserName(e.target.value);
          updateToQuery({
            name: e.target.value
          });
        }} style={{width: 120}} />
        <div style={{marginTop: 15}}>
          页面路径：{window.location.href}
        </div>
      </div>
    )
};
````

## 思路

- 所有列表请求接口的参数统一从 url 中获取，如果 url 中未存在，则使用初始值
- PC端：查询/重置时更新参数到 url
- H5端：变更查询条件时调用 `updateToQuery` 更新当前变更的参数到 url

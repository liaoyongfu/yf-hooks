---
group:
  path: /hooks
---

## useQuery

> useQuery() => Record(string, any)

获取 `react-router-dom` 路由 `search` 参数

```tsx | pure
import { stringify } from 'qs';
import { useQuery } from 'yf-hooks';

// 路由跳转
history.push({
  pathname: '/detail',
  search: stringify({
    name: 'name',
    age: '12',
  }),
});
```

这时，我们就可以通过 `useQuery` 获取 `search` 里的参数

```tsx | pure
import { useQuery } from 'yf-hooks';

const Demo = () => {
  const { name, age } = useQuery();

  // Output: { name: 'name', age: '12' }
};
```

## API

```
const query = useQuery()
```

### Result

| 参数  | 说明   | 类型                   |
| ----- | ------ | ---------------------- |
| query | 参数值 | `Reacord<string, any>` |

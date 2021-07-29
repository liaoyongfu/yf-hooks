## 快速入门

推荐使用 `ahooks`。这里主要是积累一些项目中常用到自定义 Hook。

## 安装

```bash
$ yarn add yf-hooks
```

## 使用

```tsx | pure
import { useQuery } from 'yf-hooks';

const Demo = () => {
  const { name } = useQuery();

  return <div>demo page</div>;
};
```

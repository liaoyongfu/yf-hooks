---
group:
  path: /hooks
---

## useDebounceText

提供输入框防抖

```tsx
import React from 'react';
import { Input } from 'antd';
import { useDebounceText } from 'yf-hooks';

export default () => {
  const { targetValue, originValue, typing, onOriginChange } =
    useDebounceText('初始值');

  return (
    <div>
      <Input
        style={{ width: 200 }}
        type="text"
        value={originValue}
        onChange={(e) => onOriginChange(e.target.value)}
      />
      <p>防抖后的值：{typing ? '输入中...' : targetValue}</p>
    </div>
  );
};
```

## API

```
const {
  typing,
  targetValue,
  originValue,
  onOriginChange
} = useDebounceText(initValue?: string, ms?: number)
```

### Params

| 参数      | 说明             | 类型     | 默认值 |
| --------- | ---------------- | -------- | ------ |
| initValue | 初始值           | `string` | `''`   |
| ms        | 防抖间隔（毫秒） | `number` | `1500` |

### Result

| 参数           | 说明                   | 类型                       |
| -------------- | ---------------------- | -------------------------- |
| typing         | 防抖中                 | `boolean`                  |
| targetValue    | 防抖后的值             | `string`                   |
| originValue    | 防抖前的值             | `string`                   |
| onOriginChange | 防抖前的值变更回调函数 | `(curVal: string) => void` |

---
group:
  path: /hooks
---

## useCascade

接收 options 返回各个级别的数据。

```tsx
import React, { useState } from 'react';
import { cascadeUtils, useCascade } from 'yf-hooks';

const { transListToTree } = cascadeUtils;

const options = [
  {
    label: '福建省',
    value: '3502',
  },
  {
    label: '厦门市',
    value: '350201',
  },
  {
    label: '思明区',
    value: '35020101',
  },
  {
    label: '湖里区',
    value: '35020102',
  },
  {
    label: '泉州市',
    value: '350202',
  },
  {
    label: '安溪县',
    value: '35020201',
  },
  {
    label: '广东省',
    value: '3503',
  },
];

// 平级数据 =》 嵌套数据
const dealedOptions = transListToTree({
  data: options,
  isRoot(item) {
    return item.value.length === 4;
  },
  isChildren(item, childrenItem) {
    return (
      childrenItem.value.indexOf(item.value) === 0 &&
      item.value.length + 2 === childrenItem.value.length
    );
  },
});

export default () => {
  const [value, setValue] = useState();
  const { items } = useCascade({
    options: dealedOptions,
    value,
  });
  return (
    <div>
      {items.map((item, index) => (
        <select
          key={index}
          style={{ marginRight: 8, height: 30 }}
          value={item.value ? item.value.value : ''}
          onChange={(e) => {
            const val = e.target.value;
            const opt = item.options.find((it) => it.value === val);
            if (!val && index > 0) {
              setValue(items[index - 1].value.value);
            } else {
              setValue(val);
            }
          }}
        >
          <option value="">请选择</option>
          {item.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ))}
      <p>值：{value}</p>
    </div>
  );
};
```

如果数据为平级，则使用 transListToTree 工具函数先转换成嵌套格式的数据。

## API

```
const { items } = useCascade({
  options: CascadeOptions[];
  value: string | undefined;
  col?: number;
  valueKey?: string;
});
```

### Type

| 参数           | 说明       | 类型                                                                                           |
| -------------- | ---------- | ---------------------------------------------------------------------------------------------- |
| CascadeOptions | 数据源格式 | `{ label: string; value: string \| number; children?: CascadeOptions[]; [prop: string]: any;}` |

### Params

| 参数     | 说明                                 | 类型                  | 默认值    |
| -------- | ------------------------------------ | --------------------- | --------- |
| options  | 数据源                               | `CascadeOptions[]`    | `[]`      |
| value    | 级联最后一级的值                     | `string \| undefined` |           |
| col      | 保留级联数，未指定时自动根据层级计算 | `number`              |           |
| valueKey | 值字段                               | `string`              | `'value'` |

### Result

| 参数  | 说明                 | 类型                                                        |
| ----- | -------------------- | ----------------------------------------------------------- |
| items | 各个层级的值和数据源 | `{ value: string \| undefined, options: CascadeOptions[] }` |

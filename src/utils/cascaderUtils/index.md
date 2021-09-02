---
group:
  path: /utils
---

## cascaderUtils

提供级联常用的工具函数。

## transListToTree

```
const dealedOptions = transListToTree{
  data: CascadeOptions[];
  isChildren: isChildren;
  isRoot: isRoot;
  valueKey: string;
}
```

### Params

| 参数       | 说明                     | 类型                                                                    | 默认值  |
| ---------- | ------------------------ | ----------------------------------------------------------------------- | ------- |
| data       | 数据源                   | `CascadeOptions[]`                                                      |         |
| isChildren | 判断父节点与子节点的关系 | `(parentItem: CascadeOptions, childrenItem: CascadeOptions) => boolean` |         |
| isRoot     | 判断是否是父级节点       | `(item: CascadeOptions) => boolean`                                     |         |
| valueKey   | 指定值的字段             | `string`                                                                | `value` |

### Result

| 参数          | 说明             | 类型               |
| ------------- | ---------------- | ------------------ |
| dealedOptions | 嵌套格式的数据源 | `CascadeOptions[]` |

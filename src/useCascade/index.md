---
group:
  path: /hooks
---

## useCascade

平级数据处理成嵌套格式的数据。

```html
import React from 'react'; import { transListToTree } from 'yf-hooks'; const
options = [ { label: '福建省', value: '3502', }, { label: '厦门市', value:
'350201' }, { label: '思明区', value: '35020101' }, { label: '湖里区', value:
'35020102' }, { label: '泉州市', value: '350202' }, { label: '安溪县', value:
'35020201' }, { label: '广东省', value: '3503' } ]; const dealedOptions =
transListToTree({ data: options, isRoot(item){ return item.value.length === 4;
}, isChildren(item, childrenItem){ return childrenItem.value.indexOf(item.value)
=== 0 && item.value.length + 2 === childrenItem.value.length; } })
```

useCacader：

```html
const cascaderApi = useCascader({ options, value, col, valueKey });
```

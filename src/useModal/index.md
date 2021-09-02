---
group:
  path: /hooks
---

## useModal

获取 Modal 工具函数

```tsx
import React from 'react';
import { useModal } from 'yf-hooks';
import { Button, Modal } from 'antd';

export default () => {
  const { visible, onClose, onOpen } = useModal();
  return (
    <div>
      <Button type="primary" onClick={onOpen}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={onClose}
        onCancel={onClose}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};
```

## API

```
const { visible, onClose, onOpen, toggle } = useModal(initialVisible: boolean = false)
```

### Params

| 参数           | 说明     | 类型      | 默认值  |
| -------------- | -------- | --------- | ------- |
| initialVisible | 初始显示 | `boolean` | `false` |

### Result

| 参数    | 说明          | 类型      |
| ------- | ------------- | --------- |
| visible | 显示          | `boolean` |
| toggle  | 切换显示/隐藏 | `boolean` |
| onClose | 隐藏          | `boolean` |
| onOpen  | 显示          | `boolean` |

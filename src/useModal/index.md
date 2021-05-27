---
group:
  path: /hooks
---

## useModal

> useModal(initialVisible: boolean = false) => { visible, onClose, onOpen, toggle }

获取 Modal 工具函数

````tsx
import React from 'react';
import { useModal } from 'yf-hooks';
import { Button, Modal } from 'antd';

export default () => {
    const { visible, onClose, onOpen } = useModal();
    return (
        <div>
          <Button type="primary" onClick={onOpen}>Open Modal</Button>
          <Modal title="Basic Modal" visible={visible} onOk={onClose} onCancel={onClose}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </div>
    )
};
````

import { useState } from 'react';

const useModal = (initialVisible = false) => {
  const [visible, setVisible] = useState(initialVisible);

  const onClose = () => setVisible(false);

  const onOpen = () => setVisible(true);

  const toggle = () => setVisible(!visible);

  return {
    visible,
    onClose,
    onOpen,
    toggle
  }
};

export default useModal;

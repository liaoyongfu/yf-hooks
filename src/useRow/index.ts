import { useState } from 'react';

const useRow = (initialVisible = false) => {
  const [visible, setVisible] = useState(initialVisible);
  const [curRow, setCurRow] = useState<Record<any, any> | undefined>();

  const toggle = () => setVisible(!visible);
  const changeCurRow = (r: Record<any, any> | undefined) => setCurRow(r);

  return {
    curRow,
    visible,
    toggle,
    changeCurRow,
  };
};

export default useRow;

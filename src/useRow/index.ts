import { useState } from 'react';

const useRow = (initialVisible = false) => {
  const [visible, setVisible] = useState(initialVisible);
  const [curRow, setCurRow] = useState<Record<any, any> | undefined>();

  const toggle = () => setVisible(!visible);
  const changeCurRow = (r?: Record<any, any>) => setCurRow(r);
  const add = () => {
    changeCurRow();
    toggle();
  };
  const edit = (item: Record<any, any>) => {
    changeCurRow(item);
    toggle();
  };

  return {
    curRow,
    visible,
    toggle,
    changeCurRow,
    add,
    edit,
  };
};

export default useRow;

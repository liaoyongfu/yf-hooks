import { useState } from 'react';

const useRow = <Row>(initialVisible = false, initialRow = undefined) => {
  const [visible, setVisible] = useState(initialVisible);
  const [curRow, setCurRow] = useState<Row | undefined>(initialRow);

  const toggle = () => setVisible(!visible);

  const changeCurRow = (r?: Row) => setCurRow(r);

  const add = () => {
    changeCurRow();
    toggle();
  };

  const edit = (item: Row) => {
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

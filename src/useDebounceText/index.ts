import { useState } from 'react';
import { useDebounce } from 'react-use';

/**
 * @deprecated 请使用 ahooks 的 useDebounce 代替
 * @param initValue
 * @param ms
 * @returns
 */
const useDebounceText = (initValue = '', ms = 1500) => {
  const [originValue, setOriginValue] = useState(initValue);
  const [targetValue, setTargetValue] = useState(initValue);
  const [typing, setTyping] = useState(false);

  useDebounce(
    () => {
      setTargetValue(originValue);
      setTyping(false);
    },
    ms,
    [originValue],
  );

  const onOriginChange = (curVal: string) => {
    setTyping(true);
    setOriginValue(curVal);
  };

  return {
    originValue,
    targetValue,
    typing,
    onOriginChange,
  };
};

export default useDebounceText;

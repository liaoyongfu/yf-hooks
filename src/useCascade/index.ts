import { getLen, getSelectedOptions } from '@/utils/cascaderUtils';


export interface CascadeOptions {
  label: string;
  value: string | number;
  children?: CascadeOptions[],
  [prop: string]: any;
}

interface Cascade {
  options: CascadeOptions[];
  value: string | number;
  col?: number;
  valueKey?: string;
}

const useCascade = ({ options, value, col, valueKey = 'value' }: Cascade) => {
  const len = col || getLen(options);
  const selectedOptions = getSelectedOptions(options, value, valueKey);
  const items = [...Array(len).keys()].map((_, index) => {
    const itemOptions =
      index === 0
        ? options
        : selectedOptions[index - 1]
        ? selectedOptions[index - 1].children
        : [];
    return {
      value: selectedOptions[index],
      options: itemOptions
    };
  });

  return {
    items,
    selectedOptions,
    len
  };
};

export default useCascade;

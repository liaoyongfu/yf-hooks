export interface DivisionItem {
  label: string;
  value: string;
  children?: DivisionItem[];
  [prop: string]: any;
}

// 是否是市级
export const isCity = (code: string) => code && code.endsWith('00000000');
// 是否是区级
export const isDistrict = (code: string) =>
  code && !isCity(code) && code.endsWith('000000');
// 是否是街道
export const isStreet = (code: string) =>
  code && !isDistrict(code) && code.endsWith('000');
// 是否是社区
export const isCommunity = (code: string) =>
  code && code.length === 12 && !code.endsWith('000');
// 是否是网格
export const isGrid = (code: string) => code && code.length === 16;
// 获取每一层级的值
export const getLevels = (code: string | undefined) => {
  if (!code) {
    return {
      city: '',
      district: '',
      street: '',
      community: '',
      grid: '',
    };
  }
  return {
    city: `${code.substr(0, 4)}00000000`,
    district: isCity(code) ? '' : `${code.substr(0, 6)}000000`,
    street: isCity(code) || isDistrict(code) ? '' : `${code.substr(0, 10)}00`,
    community:
      isCity(code) || isDistrict(code) || isStreet(code)
        ? ''
        : `${code.substr(0, 12)}`,
    grid: isGrid(code) ? code : '',
  };
};
// 判断是否是某一层级的子级
export const isContains = (parentCode: string, childCode: string) => {
  if (parentCode > childCode) {
    return parentCode.indexOf(childCode.replace(/0+$/g, '')) === 0;
  } else {
    return childCode.indexOf(parentCode.replace(/0+$/g, '')) === 0;
  }
};
// 获取最低一层级的值
export const getValue = (code: string) => {
  const levels = getLevels(code);

  return (
    levels.grid ||
    levels.community ||
    levels.street ||
    levels.district ||
    levels.city
  );
};
// 根据 baseDivision（一般是用户行政区划）进行权限过滤
export const filter = (
  data: DivisionItem[],
  baseDivision: string,
  userWgs?: string[],
): DivisionItem[] => {
  return data
    .filter((item) => {
      if (isGrid(item.value) && userWgs && userWgs.length > 0) {
        return userWgs.includes(item.value);
      }
      if (item.value > baseDivision) {
        return item.value.indexOf(baseDivision.replace(/0+$/g, '')) === 0;
      } else {
        return baseDivision.indexOf(item.value.replace(/0+$/g, '')) === 0;
      }
    })
    .map((item) => {
      if (item.children) {
        return {
          ...item,
          children: filter(item.children, baseDivision, userWgs),
        };
      } else {
        return item;
      }
    });
};

// 判断是否是某个的子节点
export const isChildren = (parentCode: string, childrenCode: string) => {
  const parent = parentCode.replace(/0+$/g, '');
  return childrenCode.indexOf(parent) === 0;
};

// 判断是否是第一层子节点
export const isNextChildren = (parentCode: string, childrenCode: string) => {
  if (!isChildren(parentCode, childrenCode)) return false;
  if (isCity(parentCode)) {
    return isDistrict(childrenCode);
  } else if (isDistrict(parentCode)) {
    return isStreet(childrenCode);
  } else if (isStreet(parentCode)) {
    return isCommunity(childrenCode);
  } else if (isCommunity(parentCode)) {
    return isGrid(childrenCode);
  } else {
    return false;
  }
};

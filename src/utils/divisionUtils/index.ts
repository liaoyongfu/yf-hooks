export interface DivisionItem {
  label: string;
  value: string;
  children?: DivisionItem[];
  [prop: string]: any;
}

export const Index = {
  isCity: function (code: string) {
    return code.endsWith('00000000');
  },
  isDistrict: function (code: string) {
    return !this.isCity(code) && code.endsWith('000000');
  },
  isStreet: function (code: string) {
    return !this.isDistrict(code) && code.endsWith('000');
  },
  isCommunity: function (code: string) {
    return !this.isStreet(code) && !this.isGrid(code);
  },
  isGrid: function (code: string) {
    return code.length === 16;
  },
  // 获取各个级别的行政区划 code
  getLevels: function (code: string | undefined) {
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
      district: this.isCity(code) ? '' : `${code.substr(0, 6)}000000`,
      street:
        this.isCity(code) || this.isDistrict(code)
          ? ''
          : `${code.substr(0, 8)}00`,
      community:
        this.isCity(code) || this.isDistrict(code) || this.isStreet(code)
          ? ''
          : `${code.substr(0, 12)}`,
      grid: this.isGrid(code) ? code : '',
    };
  },
  // 获取最低一级的值
  getValue(code: string) {
    const levels = this.getLevels(code);

    return (
      levels.grid ||
      levels.community ||
      levels.street ||
      levels.district ||
      levels.city
    );
  },
  // childCode 是否是 parentCode 的子节点
  isContains(parentCode: string, childCode: string) {
    if (parentCode > childCode) {
      return parentCode.indexOf(childCode.replace(/0+$/g, '')) === 0;
    } else {
      return childCode.indexOf(parentCode.replace(/0+$/g, '')) === 0;
    }
  },
  // 根据 baseDivision（一般是用户行政区划）进行权限过滤
  filter: function (
    data: DivisionItem[],
    baseDivision: string,
  ): DivisionItem[] {
    return data
      .filter((item) => {
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
            children: this.filter(item.children, baseDivision),
          };
        } else {
          return item;
        }
      });
  },
};

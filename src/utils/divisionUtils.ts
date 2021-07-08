export const DivisionUtils = {
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
};

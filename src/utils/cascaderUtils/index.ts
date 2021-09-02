import memoize from 'lodash.memoize';
import { CascadeOptions } from '@/useCascade';

type isChildren = (item: CascadeOptions, subItem: CascadeOptions) => boolean;
type isRoot = (item: CascadeOptions) => boolean;
interface transListToTreeProps {
  data: CascadeOptions[];
  isChildren: isChildren;
  isRoot: isRoot;
  valueKey: string;
}

const getChildrenNodes = (
  data: CascadeOptions[],
  item: CascadeOptions,
  isChildren: isChildren,
  valueKey: string,
) => {
  const findChildren = data.filter(
    (subItem: CascadeOptions) =>
      subItem[valueKey] !== item[valueKey] && isChildren(item, subItem),
  );

  return findChildren.map((subItem: CascadeOptions) => {
    const subItemData = {
      ...subItem,
    };
    const subItemChildren = getChildrenNodes(
      data,
      subItem,
      isChildren,
      valueKey,
    );
    if (subItemChildren.length > 0) {
      subItemData.children = subItemChildren;
    }

    return subItemData;
  });
};

// 处理平级数据 =》 嵌套结构, getChildren(item, childrenItem) => true
export const transListToTree = ({
  data = [],
  isChildren,
  isRoot,
  valueKey = 'value',
}: transListToTreeProps) => {
  let dealData = [];

  dealData = data
    .filter((item) => isRoot(item))
    .map((item) => {
      const children = getChildrenNodes(data, item, isChildren, valueKey);
      if (children) {
        return {
          ...item,
          children,
        };
      }
    });

  return dealData;
};

export const getLen = (options: CascadeOptions[]) => {
  let maxLevel = 0;

  const mapOptions = (data: CascadeOptions[], level: number) => {
    if (level > maxLevel) {
      maxLevel = level;
    }
    data.forEach((option) => {
      if (option.children) {
        mapOptions(option.children, level + 1);
      }
    });
  };

  mapOptions(options, 1);

  return maxLevel;
};

// 获取 id map、pid map
const memoizedNodes = memoize((data: CascadeOptions[], valueKey: string) => {
  // 先把每级映射出来，然后在查找，不然每次都递归影响性能
  const idMap: Record<string, any> = {};
  const pidMap: Record<string, any> = {};

  const mapOptions = (data: CascadeOptions[], parentIds: string[]) => {
    data.map((item) => {
      const value = item[valueKey];
      idMap[value] = item;
      if (!pidMap[value]) {
        pidMap[value] = [];
      }
      pidMap[value] = parentIds;
      if (item.children) {
        mapOptions(item.children, [...parentIds, value]);
      }
    });
  };

  mapOptions(data, []);

  return {
    idMap,
    pidMap,
  };
});

/**
 * 获取当前选中的各级节点
 * @param options
 * @param value
 * @param valueKey
 * @returns {[]}
 */
export const getSelectedOptions = (
  options: CascadeOptions[],
  value: string | undefined,
  valueKey: string,
) => {
  const { idMap, pidMap } = memoizedNodes(options, valueKey);

  return value
    ? pidMap[value]
      ? [
          ...pidMap[value].map((childId: string) => idMap[childId]),
          idMap[value],
        ]
      : []
    : [];
};

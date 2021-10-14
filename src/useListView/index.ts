import { useEffect, useRef, useState } from 'react';

let pageIndex: number = 0;

export interface ListView {
  // ListView 组件
  ListView: Record<any, any>;
  // 请求数据
  genData: (pageIndex: number) => Promise<Record<any, any>[]>;
  // 滚动视口，一般是 ListView 父级滚动节点
  container: HTMLElement;
  // 判断是否还有更多分页
  hasMore?: boolean;
  // 是否使用 body 作为视口
  useBodyScroll?: boolean;
}

export const useListView = ({
  ListView,
  genData,
  container,
  hasMore = true,
  useBodyScroll = false,
}: ListView) => {
  const [dataSource, setDataSource] = useState(
    new ListView.DataSource({
      rowHasChanged: (row1: Record<any, any>, row2: Record<any, any>) => {
        return JSON.stringify(row1) !== JSON.stringify(row2);
      },
    }),
  );
  const rData = useRef<Record<any, any>[]>([]);
  const [refreshing, setRefreshing] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [height, setHeight] = useState(0);

  const onRefresh = async () => {
    setRefreshing(true);
    setIsLoading(true);
    // simulate initial Ajax
    rData.current = await genData(1);
    pageIndex = 1;
    setDataSource(dataSource.cloneWithRows(rData.current));
    setRefreshing(false);
    setIsLoading(false);
  };

  const onEndReached = async () => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (!hasMore || isLoading) {
      return;
    }
    setIsLoading(true);
    pageIndex += 1;
    rData.current = [...rData.current, ...(await genData(pageIndex))];
    setDataSource(dataSource.cloneWithRows(rData.current));
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setRefreshing(true);
      const gd = await genData(1);
      pageIndex = 1;

      rData.current = gd;
      setDataSource(dataSource.cloneWithRows(gd));
      setRefreshing(false);
      setIsLoading(false);
    })();
  }, [genData]);

  useEffect(() => {
    if (!container) return;
    setTimeout(() => {
      const hei = container.clientHeight;

      setHeight(hei);
    });
  });

  return {
    dataSource,
    useBodyScroll,
    onEndReached,
    onRefresh,
    refreshing,
    height,
    isLoading,
  };
};

export default useListView;

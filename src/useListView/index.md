---
group:
  path: /hooks
---

@mshare/mshareui 长列表（包含上拉加载，下拉刷新）

```
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { ListView, PullToRefresh, Flex, Empty } from '@mshare/mshareui';
import useListView from 'yf-hooks';
import styles from './MobileListView.scss';

const MobileListView = ({ genData, hasMore, renderRow, container, emptyDescription, ...rest }) => {
    const lv = useRef();
    const { dataSource, onEndReached, onRefresh, refreshing, height, isLoading } = useListView({ genData, lv, container, hasMore });

    const empty = dataSource._cachedRowCount === 0;


    if (empty) {
        return (
            <Flex className={styles.empty} align="center" justify="center" direction="column">
                <Empty description={emptyDescription} />
            </Flex>
        );
    }

    return (
        <ListView
            className="listview-container"
            dataSource={dataSource}
            renderRow={renderRow}
            onEndReached={onEndReached}
            pageSize={10}
            ref={l => {
                lv.current = l?.listviewRef?.ListViewRef?.InnerScrollViewRef;
            }}
            style={{
                height
            }}
            renderFooter={() => (
                <div className={styles.indicator}>
                    <span>{!hasMore ? '我是有底线的' : (isLoading ? '加载中...' : '')}</span>
                </div>
            )}
            pullToRefresh={<PullToRefresh refreshing={refreshing} onRefresh={onRefresh} />}
            {...rest}
        />
    );
};

MobileListView.propTypes = {
    // 请求方法，接收 currentPage 参数，返回新增的 list
    genData: PropTypes.func.isRequired,
    // 是否有更多的分页
    hasMore: PropTypes.bool.isRequired,
    // 项渲染
    renderRow: PropTypes.func.isRequired,
    // 渲染容器，DOM 元素
    container: PropTypes.any,
    emptyDescription: PropTypes.string
};

MobileListView.defaultProps = {
    emptyDescription: '未查询到数据'
};

export default MobileListView;
```

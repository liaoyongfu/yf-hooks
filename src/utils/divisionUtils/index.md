---
group:
  path: /utils
---

## divisionUtils

提供行政区划常用的工具函数。

## isCity

判断是否是`市级`

```
(code: string) => boolean
```

## isDistrict

判断是否是`区级`

```
(code: string) => boolean
```

## isStreet

判断是否是`街道`

```
(code: string) => boolean
```

## isCommunity

判断是否是`社区`

```
(code: string) => boolean
```

## isGrid

判断是否是`网格`

```
(code: string) => boolean
```

## getLevels

获取各个级别的值

```
(code: string | undefined) => {
    city: string,
    district: string,
    street: string,
    community: string,
    grid: string,
}
```

## isContains

childCode 是否是 parentCode 的子节点

```
(parentCode: string, childCode: string) => boolean
```

## filter

根据 baseDivision（一般是用户行政区划）进行权限过滤

```
(data: DivisionItem[], baseDivision: string) => DivisionItem[]
```

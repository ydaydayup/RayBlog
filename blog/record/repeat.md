---
title: MDN CSS repeat() 函数
date: 2024-08-17
authors: Ray
tags: [grid, repeat ]
keywords: [grid, repeat ]
---



[CSS](/zh-CN/docs/Web/CSS) **`repeat()`** 函数表示轨道列表的重复片段，允许以更紧凑的形式写入大量显示重复模式的列或行。

该函数可以用于 CSS Grid 属性中 [`grid-template-columns`](/zh-CN/docs/Web/CSS/grid-template-columns) 和 [`grid-template-rows`](/zh-CN/docs/Web/CSS/grid-template-rows).

<!-- truncate -->

```css
/* <track-repeat> values */
repeat(4, 1fr)   /*表示 重复四次 每个网格 占据 1 / （1 + 1 + 1 + 1）, 也就是 1/4 */
repeat(4, [col-start] 250px [col-end])
repeat(4, [col-start] 60% [col-end])
repeat(4, [col-start] 1fr [col-end])
repeat(4, [col-start] min-content [col-end])
repeat(4, [col-start] max-content [col-end])
repeat(4, [col-start] auto [col-end])
repeat(4, [col-start] minmax(100px, 1fr) [col-end])
repeat(4, [col-start] fit-content(200px) [col-end])
repeat(4, 10px [col-start] 30% [col-middle] auto [col-end])
repeat(4, [col-start] min-content [col-middle] max-content [col-end])

/* <auto-repeat> values */
repeat(auto-fill, 250px)
repeat(auto-fit, 250px)
repeat(auto-fill, [col-start] 250px [col-end])
repeat(auto-fit, [col-start] 250px [col-end])
repeat(auto-fill, [col-start] minmax(100px, 1fr) [col-end])
repeat(auto-fill, 10px [col-start] 30% [col-middle] 400px [col-end])

/* <fixed-repeat> values */
repeat(4, 250px)
repeat(4, [col-start] 250px [col-end])
repeat(4, [col-start] 60% [col-end])
repeat(4, [col-start] minmax(100px, 1fr) [col-end])
repeat(4, [col-start] fit-content(200px) [col-end])
repeat(4, 10px [col-start] 30% [col-middle] 400px [col-end]) 
```

> **fr单位是什么？**
> 
> `fr`是单词fraction的缩写，表示分数


[语法](#语法)
---------

### [取值](#取值)

[`<length>`](/zh-CN/docs/Web/CSS/length)

正整数长度。

[`<percentage>`](/zh-CN/docs/Web/CSS/percentage)

相对于列网格轨道中网格容器的行内大小以及行网格轨道中网格容器的块大小的非负百分比。如果网格容器的大小取决于它的轨道大小，那么 `<percentage>` 必须被视为 `auto`. 用户代理（user-agent）可以将轨道的固有大小贡献调整为网格容器的大小，将轨道的最终大小增加到可以遵守该百分比的最小数量。

[`<flex>`](/zh-CN/docs/Web/CSS/flex_value)

带有 `fr` 单位的非负尺寸指定轨道的弹性系数。任何被 `<flex>` 指定大小的轨道会根据其弹性系数按比例分配剩余空间。

[`max-content`](#max-content)

代表占据网格轨道的网格项目所分配的最大内容区域的最大值。

[`min-content`](#min-content)

代表占据网格轨道的网格项目所分配的最小内容区域的最小值。

[`auto`](#auto)

作为最大值，等同于 `max-content`。作为最小值，它代表占据网格轨道的网格项目的最小尺寸的最大值（如同[`min-width`](/zh-CN/docs/Web/CSS/min-width)/[`min-height`](/zh-CN/docs/Web/CSS/min-height)所指定的)）。

[`auto-fill`](#auto-fill)

如果网格容器在相关轴上具有确定的大小或最大大小，则重复次数是最大可能的正整数，不会导致网格溢出其网格容器。如果定义了，将每个轨道视为其最大轨道尺寸大小函数 ( `grid-template-rows` 或 `grid-template-columns`用于定义的每个独立值。否则，作为最小轨道尺寸函数，将网格间隙加入计算。如果重复次数过多，那么重复值是 `1` 。否则，如果网格容器在相关轴上具有确定的最小尺寸，重复次数是满足该最低要求的可能的最小正整数。否则，指定的轨道列表仅重复一次。

[`auto-fit`](#auto-fit)

行为与 `auto-fill` 相同，除了放置网格项目后，所有空的重复轨道都将折叠。空轨道是指没有流入网格或跨越网格的网格项目。（如果所有轨道都为空，则可能导致所有轨道被折叠。）

折叠的轨道被视为具有单个固定轨道大小函数为 `0px`，两侧的槽都折叠了。

为了找到自动重复的轨道数，用户代理将轨道大小限制为用户代理指定的值（例如 `1px`），以避免被零除。

---------

# 参考：
https://developer.mozilla.org/zh-CN/docs/Web/CSS/repeat

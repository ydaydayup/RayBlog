---
title: 分别使用grid和绝对定位实现元素层叠效果
date: 2024-08-17
authors: Ray
tags: [grid, absolute, 元素层叠]
keywords: [grid, absolute, 元素层叠]
---

<!-- truncate -->

```jsx
<div className={"grid grid-cols-1 row-start-1"}>
    <img className={"row-start-1 col-start-1  z-50  select-none"} src={'/phone-template-white-edges.png'}
         alt="loading fail"/>
    <img className={"row-start-1 col-start-1  -z-10 object-cover min-w-full min-h-full"} src={imgSrc}
         alt="loading fail"/>
</div>
```
> 需要使用`z-50`和`-z-10`来控制图片的层级关系
> 
> `row-start-1 col-start-1`来控制图片的位置 -- 必选，当然也可以grid-area来控制，，当然也不一定是1，可以是其他数字
> 
> `object-cover`来控制图片的填充方式(object-fit: cover;)
> 
> `min-w-full min-h-full`来控制图片的宽高
> 
> `select-none`来禁止图片被选中(user-select: none;)

```jsx
        <div className={"relative"}>
            <img className={"absolute z-50  select-none"} src={'/phone-template-white-edges.png'}
                 alt="loading fail"/>
            <img className={"absolute -z-10 inset-0 object-cover min-w-full min-h-full"} src={imgSrc}
                 alt="loading fail"/>
        </div>
```
> `relative`来让父元素成为定位的参考，这样子元素就可以使用`absolute`来控制位置了，因为`absolute`是相对于最近的定位父元素来定位的
> 
> `absolute`来控制图片的位置, 脱离文档流，不占据空间
> 
> `inset-0`来控制图片的覆盖范围(inset 为简写属性，对应于 top、right、bottom 和 left 属性)

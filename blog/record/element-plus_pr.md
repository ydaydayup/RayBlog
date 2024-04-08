---
slug: element-plus-pr
title: element plus贡献记录
date: 2024-04-05
authors: Ray
tags: [vue github element-plus]
keywords: [vue github element-plus]
description: element plus贡献记录
#image: https://img.kuizuo.cn/202312270328599.png
sticky: 2
---


- https://github.com/element-plus/element-plus/issues/16377
  - focus 事件在元素获取焦点时触发。这个事件和 focusin (en-US) 最大的区别仅仅在于后者会事件冒泡。
  - blur 当一个元素失去焦点的时候 blur 事件被触发。它和 focusout (en-US) 事件的主要区别是 focusout 支持冒泡。
  - const children = slots.default?.()!
  >?. 是可选链操作符（Optional Chaining Operator）。它用于访问对象的属性，如果属性不存在或者是 null 或 undefined，则表达式会返回 undefined 而不会引发错误。在这里，slots.default?.() 表示如果 slots.default 存在且可调用（即为函数），则调用它；否则返回 undefined。
  > ! 是非空断言操作符（Non-null Assertion Operator）。它用于告诉 TypeScript 编译器某个表达式不会产生 null 或 undefined 值，因此可以放心地访问该表达式的属性或方法。在这里，slots.default?.() 的结果被 ! 标记，表示开发者明确知道该表达式一定不会返回 null 或 undefined，可以安全地使用它。
  > 综合起来，这段代码的意思是：如果 slots.default 存在且可调用，则调用它，并且断言调用结果不为 null 或 undefined，将结果赋给 children 变量。
  > 
  - 插槽:是用来弥补props的,组件能够接收任意类型的 JavaScript 值作为 props,slot的目的是用来接受模板内容
  - `<slot>` 元素是一个插槽出口 (slot outlet)，标示了父元素提供的插槽内容 (slot content) 将在哪里被渲染。

<!-- truncate -->
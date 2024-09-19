---  
title: The Infinite Marquee无限的跑马灯 -- 阅读笔记
date: 2024-09-23  
authors: Ray  
tags: [ animation, 跑马灯, Infinite， 阅读笔记  ]  
keywords: [ animation, 跑马灯, Infinite ,  阅读笔记 ]  
description: CSS 实现跑马灯
#image: https://img.kuizuo.cn/202312270328599.png  
sticky: 2
---  

import Link from '@docusaurus/Link'
import {ShowHtml} from '@site/src/components/Utils'


## 要点：
文章中提到的无限滚动动画效果是通过使用 HTML 和 CSS 来实现的。以下是实现这种效果的关键步骤和概念：

<!-- truncate -->
1. **内容复制**：为了创建无限循环的效果，需要将内容复制一份，并将其放置在原始内容的旁边。这样，当内容滚动到容器的一端时，复制的内容会接上，从而形成无缝循环。

2. **Flexbox 布局**：使用 Flexbox 布局来排列项目。Flexbox 允许项目在一行内水平排列，并且可以通过设置 `flex-shrink: 0` 来防止项目缩小，避免内容重叠。

3. **隐藏溢出**：在父容器上设置 `overflow: hidden`，这样当内容滚动到容器边缘时，超出部分会被隐藏，从而实现无缝循环的效果。

4. **禁用文本选择**：使用 `user-select: none` 属性来禁用用户在滚动内容上的选择功能，提高用户体验。

5. **响应式设计**：通过设置 `min-width: 100%`，确保每个子容器至少占据父容器的全宽。这样，即使在不同尺寸的视口中，内容也能正确地分布和滚动。

6. **空间分布**：使用 `justify-content: space-around` 属性在项目之间以及项目与容器边缘之间均匀分配空间。

7. **自定义 CSS 属性**：定义一个自定义 CSS 属性 `--gap` 来表示项目之间的间隔。这使得在动画和布局中调整间隔变得更加灵活。

8. **关键帧动画**：使用 `@keyframes` 定义一个名为 `scroll` 的动画，该动画通过改变 `transform` 属性的 `translateX` 值来移动内容。动画的结束位置会考虑到 `--gap` 的值，以确保循环时的对齐。

9. **动画应用**：将 `scroll` 动画应用到滚动内容上，通常设置为无限循环，并根据需要调整动画的持续时间。

通过这些步骤，可以实现一个现代的、响应式的无限滚动动画效果，同时保持代码的简洁和易于维护。


## 对于关键帧动画， 为什么gap会解决错位问题，原理是什么

在关键帧动画中使用 `gap` 变量解决错位问题的原理涉及到动画的起始和结束状态的精确控制。以下是详细解释：

1. **动画的起始和结束**：在滚动动画中，我们希望内容从视窗的一端平滑滚动到另一端，然后无缝地接上。为了实现这一点，我们需要在动画的 `from` 状态设置 `transform: translateX(0);`，表示内容从视窗的起始位置开始滚动。

2. **动画的结束状态调整**：在动画的 `to` 状态，我们使用 `transform: translateX(calc(-100% - var(--gap)));` 来控制内容滚动的结束位置。这里的关键点是 `calc(-100% - var(--gap))` 表达式。

3. **`calc` 函数的作用**：`calc` 函数允许我们执行 CSS 表达式计算，这里用来计算滚动结束时的确切位置。

4. **`var(--gap)` 的作用**：`var(--gap)` 是一个自定义的 CSS 属性，用于定义项目之间的间隔。在滚动动画中，它不仅用于设置间隔，还用于确保动画结束时内容的对齐。

5. **解决错位的原理**：如果不在 `calc` 函数中使用 `var(--gap)`，那么动画结束时内容可能会停在视窗的中间位置，而不是紧贴视窗的边缘。这是因为滚动内容的宽度加上间隔（`gap`）才是滚动内容实际占据的空间。如果我们只使用 `translateX(-100%)`，那么滚动内容在结束时会超出视窗边缘，导致错位。

6. **无缝循环**：通过使用 `calc(-100% - var(--gap))`，我们可以确保滚动内容在动画结束时正好对齐到视窗的起始位置，并且与复制的内容无缝对接，从而实现无限循环的滚动效果。

7. **动画的连贯性**：当动画重新开始时，滚动内容会从复制内容的末尾开始，继续滚动，这样用户就感知不到循环的开始和结束，实现了平滑且连贯的滚动动画。

通过这种方式，`gap` 变量不仅用于布局中的间隔设置，还用于动画的精确控制，确保了滚动动画的无缝循环和视觉连贯性。


---

A modern approach 现代方法
Now that we've gleaned a tiny slice of web history, it's arguable that a marquee-style animation can inject some pop to a page when done responsibly. Developers have discovered a few ways of reimagining the concept, the most popular accomplished with HTML and CSS. In this scenario, content is duplicated to create the illusion of it looping indefinitely. Here's a stripped-down example:
现在我们已经收集了网络历史的一小部分，可以说，如果负责任地完成，选框式动画可以为页面注入一些流行感。开发人员已经发现了几种重新构想这个概念的方法，其中最受欢迎的是用 HTML 和 CSS 实现的。在这种情况下，内容被复制以产生无限循环的错觉。下面是一个精简的示例：

```html
<div class="marquee">
  <ul class="marquee__content">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
  <!-- Mirrors the content above -->
  <ul class="marquee__content" aria-hidden="true">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
</div>
```

> note:
> Be sure to set aria-hidden="true" to hide any repeated or redundant content from screen readers.
请务必设置 aria-hidden=“true” 以在屏幕阅读器中隐藏任何重复或冗余的内容。
>


The marquee concept has been done plenty of times and may seem old hat. However, most of the examples I came across weren't fully responsive. Many rely on a fixed-width parent or having enough elements to overflow the container for a seamless loop. What if, when the parent container is wider than the content overflow, the items spread themselves out so that the loop works at any size? I experimented with a few ideas to see what's possible in making this concept more flexible.
跑马灯的概念已经做过很多次了，可能看起来很老了。但是，我遇到的大多数示例都没有完全响应。许多依赖于固定宽度的父元素，或者有足够的元素溢出容器以实现无缝循环。如果当父容器的宽度超过内容溢出的宽度时，项目会自行分散开来，以便循环在任何大小下工作，该怎么办？我尝试了一些想法，看看有什么可能使这个概念更加灵活。

Here are the responsive styles that correspond to the HTML code block above:
以下是与上述 HTML 代码块相对应的响应式样式：

```css
.marquee {
  --gap: 1rem;
  display: flex;
  overflow: hidden;
  user-select: none;
  gap: var(--gap);
}

.marquee__content {
  flex-shrink: 0;
  display: flex;
  justify-content: space-around;
  min-width: 100%;
  gap: var(--gap);
}
```

To get a better sense of what's happening, open up [this CodePen demo](https://codepen.io/hexagoncircle/pen/eYMrGwW). Try turning each CSS rule off and on to see how it affects the marquee. Adjust the amount of items in the marquee's HTML. Watch how they spread out as the viewport widens or naturally overflow as it narrows.  
为了更好地了解正在发生的事情，请打开[此 CodePen 演示](https://codepen.io/hexagoncircle/pen/eYMrGwW)。尝试关闭和打开每个 CSS 规则，看看它如何影响选框。调整选取框的 HTML 中的项目数量。观察它们如何在视口变宽时散开，或在视口变窄时自然溢出

Allow me to explain what this CSS is doing.
请允许我解释一下这个CSS正在做什么。

- A flexbox display is applied to both the `.marquee` parent and `.marquee__content` child containers. This places every item on a single row without any wrapping.  
    flexbox 显示同时应用于 `.marquee` 父容器和 `.marquee__content`子容器。这会将每个项目放在一行上，而没有任何换行。
- There is a hidden overflow set on the parent. When the animation loops, the overflow conceals the elements snapping back to their start positions.  
    在父级上设置了隐藏的溢出。当动画循环时，溢出会隐藏元素弹回其起始位置。
- `user-select: none` disables highlighting or selecting text inside the marquee.  
    `user-select： none` 禁用在选框内突出显示或选择文本。
- `flex-shrink: 0` prevents the child containers from shrinking, avoiding overlap of content.  
    `flex-shrink：0` 可防止子容器收缩，避免内容物重叠。
- `min-width: 100%` stretches each child container to the parent width. With this rule, the first child container is visible while the duplicate container is hidden in the overflow.  
    `min-width：100%` 将每个子容器拉伸到父宽度。使用此规则时，第一个子容器是可见的，而复制的容器则隐藏在溢出中。
- `justify-content: space-around` evenly distributes space between each child container item, then applies half of that as empty space before the first item and after the last.  
    `justify-content：space-around` 在每个子容器项之间均匀分配空间，然后在第一个项之前和最后一个项之后将其中一半应用为空白空间。

As items begin to overflow, gaps can be set to create room between each item. Gap values for the parent and child containers will need to match; Well that's a perfect case for defining a new [CSS custom property](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)! The `gap: var(--gap)` declaration supplies the space between each item when content overflows the parent plus space between the two child containers. This variable also comes in handy to offset the end position in the animation precisely:  
当物品开始溢出时，可以设置间隙以在每个物品之间创造空间。父容器和子容器的间隙值需要匹配;嗯，这是定义新的[CSS自定义属性](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)的完美案例！`gap： var（--gap）` 声明提供当内容溢出父容器时每个项目之间的空间加上两个子容器之间的空间。此变量还可以派上用场，精确地偏移动画中的结束位置：

```css
@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - var(--gap)));
  }
}
```

Without including `var(--gap)` in this calculation, there would be a visible misalignment when the animation loops. Try updating the value to `translateX(-100%)` to see the issue.  
如果在此计算中包含 `var（--gap），`则当动画循环时，将会出现明显的错位。尝试将值更新为 `translateX（-100%）` 以查看问题。

The appearance of an infinite loop happens by animating the first child container completely out into the overflow while simultaneously pulling the duplicate container all the way into view. When the animation restarts, the first container picks up where the last left off. The illusion is complete! Yet it's also neverending... 😮  
无限循环的出现是通过将第一个子容器完全动画到溢出中，同时将复制的容器完全拉入视图中来实现的。当动画重新启动时，第一个容器将从最后一个容器停止的地方继续。幻觉完成了！然而，它也是永无止境的......😮

## Important considerations 重要注意事项

Really examine the use case for a marquee. They can be incredibly distracting and disorienting when implemented poorly.  
真正检查选框的用例。如果实施不力，它们可能会令人难以置信地分散注意力和迷失方向。

- Use them sparingly. Overloading a page with a bunch of auto-scrolling areas is never a good time.  
    谨慎使用它们。用一堆自动滚动区域使页面过载绝不是一个好时机。
- Marquee content should be purely decorative. Leave out important page copy and focusable elements.  
    跑马灯内容应纯粹是装饰性的。省略重要的页面副本和可聚焦的元素。
- Animation speeds should be slow. Content scrolling by super fast can be nauseating even for those that don't have reduced-motion enabled.  
    动画速度应该很慢。即使对于那些没有启用缩小运动的人来说，超快滚动内容也会令人作呕。
- Respect reduced-motion preferences. If set, best bet would be to completely disable auto-scrolling.  
    尊重减少运动的偏好。如果设置，最好的办法是完全禁用自动滚动。

## Welcome to the demo zone  
欢迎来到演示区

Here are a couple of CodePen ideas I had thrown together while experimenting with marquee animations. The [logo wall](https://codepen.io/hexagoncircle/full/wvmjomb) is especially fun, introducing reverse animations and the ability to toggle the axis for a vertical marquee.  
以下是我在试验选框动画时提出的一些 CodePen 想法。[标志墙](https://codepen.io/hexagoncircle/full/wvmjomb)特别有趣，它引入了反向动画和切换轴以形成垂直选框的能力。

- [CSS Marquee Logo Wall CSS 选框标志墙](https://codepen.io/hexagoncircle/full/wvmjomb)
- [The Dogs of Unsplash Unsplash 的狗](https://codepen.io/hexagoncircle/full/jOzZPJw)
- [CSS Marquee Examples CSS 选框示例](https://codepen.io/hexagoncircle/full/eYMrGwW)

## Explore more resources 探索更多资源

- [`<marquee>` elements are deprecated and must not be used  
    `<marquee>` 元素已弃用，不得使用](https://dequeuniversity.com/rules/axe/4.1/marquee)
- [CSS-Only Marquee Effect 仅限 CSS 的选框效果](https://tympanus.net/codrops/2020/03/31/css-only-marquee-effect/)
- [Modern and Accessible `<marquee>` with TailwindCSS  
    现代且易于访问的 `<marquee>` 与 TailwindCSS](https://olavihaapala.fi/2021/02/23/modern-marquee.html)


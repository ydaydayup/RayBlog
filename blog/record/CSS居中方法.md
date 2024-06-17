---
#slug: use-nuxt3-build-api-server
title: css居中方法总结
date: 2024-06-05
tags: [ css, 居中 ]
keywords: [ css, 居中 ]
description: css居中方法总结
sticky: 2
---

<!-- truncate -->

CSS中将元素上下居中（垂直居中）有多种方法，以下是一些常用的技术：

1. **Flexbox（弹性盒子）**:
   使用Flexbox可以很容易地实现元素的垂直居中。将父元素设置为`display: flex;`
   ，并使用`align-items`和`justify-content`属性。
   ```css
   .parent {
     display: flex;
     align-items: center; /* 垂直居中 */
     justify-content: center; /* 水平居中 */
     height: 100px; /* 父元素需要有确定的高度 */
   }
   ```

2. **Grid（网格布局）**:
   使用CSS Grid也可以轻松实现垂直居中。
   ```css
   .parent {
     display: grid;
     place-items: center;
     height: 100px; /* 父元素需要有确定的高度 */
   }
   ```

3. **绝对定位**:
   将子元素绝对定位到父元素的中心，然后使用负边距或`transform`属性进行微调。
   ```css
   .parent {
     position: relative;
     height: 100px;
   }
   .child {
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
   }
   ```

解释：
绝对定位居中的原理基于CSS中的绝对定位（absolute
positioning）特性，它允许你将元素从文档的正常流中移除，并相对于其最近的已定位（非static）祖先元素进行定位。如果没有这样的祖先元素，它将相对于初始包含块（通常是文档的`<html>`
元素）定位。

要使用绝对定位实现垂直和水平居中，通常遵循以下步骤：

1. **设置父元素的定位**:
   首先，你需要将父元素的`position`属性设置为`relative`
   。这样做是因为绝对定位的子元素是相对于其最近的已定位祖先元素定位的，而`relative`
   属性将父元素变成这样一个定位上下文。
   ```css
   .parent {
     position: relative;
     /* 父元素的高度和宽度可以根据需要设置 */
   }
   ```

2. **绝对定位子元素**:
   然后，将子元素的`position`属性设置为`absolute`
   。这样，子元素就可以从文档流中脱离出来，并可以相对于父元素进行定位。
   ```css
   .child {
     position: absolute;
     /* 其他样式 */
   }
   ```

3. **计算50%偏移**:
   为了居中子元素，你需要将其从父元素的中心向上下左右各移动50%。这可以通过设置`top`
   和`left`属性为`50%`来实现。
   ```css
   .child {
     position: absolute;
     top: 50%;
     left: 50%;
     /* 其他样式 */
   }
   ```

4. **使用`transform`属性进行调整**:
   由于子元素的`top`和`left`
   设置为50%，其中心点会与父元素的中心点对齐。但是，这会导致子元素的左上角而不是中心点居中。为了解决这个问题，可以使用`transform`
   属性的`translate`函数将子元素向左和向上移动其自身宽度和高度的一半。
   ```css
   .child {
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     /* 其他样式 */
   }
   ```

这种方法的优点是它非常灵活，可以适用于任何尺寸的子元素，并且不需要知道子元素的具体尺寸。此外，它也适用于垂直或水平居中单个元素，或者在父元素中居中多个子元素。

绝对定位居中的原理基于CSS中的绝对定位（absolute
positioning）特性，它允许你将元素从文档的正常流中移除，并相对于其最近的已定位（非static）祖先元素进行定位。如果没有这样的祖先元素，它将相对于初始包含块（通常是文档的`<html>`
元素）定位。

要使用绝对定位实现垂直和水平居中，通常遵循以下步骤：

1. **设置父元素的定位**:
   首先，你需要将父元素的`position`属性设置为`relative`
   。这样做是因为绝对定位的子元素是相对于其最近的已定位祖先元素定位的，而`relative`
   属性将父元素变成这样一个定位上下文。
   ```css
   .parent {
     position: relative;
     /* 父元素的高度和宽度可以根据需要设置 */
   }
   ```

2. **绝对定位子元素**:
   然后，将子元素的`position`属性设置为`absolute`
   。这样，子元素就可以从文档流中脱离出来，并可以相对于父元素进行定位。
   ```css
   .child {
     position: absolute;
     /* 其他样式 */
   }
   ```

3. **计算50%偏移**:
   为了居中子元素，你需要将其从父元素的中心向上下左右各移动50%。这可以通过设置`top`
   和`left`属性为`50%`来实现。
   ```css
   .child {
     position: absolute;
     top: 50%;
     left: 50%;
     /* 其他样式 */
   }
   ```

4. **使用`transform`属性进行调整**:
   由于子元素的`top`和`left`
   设置为50%，其中心点会与父元素的中心点对齐。但是，这会导致子元素的左上角而不是中心点居中。为了解决这个问题，可以使用`transform`
   属性的`translate`函数将子元素向左和向上移动其自身宽度和高度的一半。
   ```css
   .child {
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     /* 其他样式 */
   }
   ```

: definition

>
这种方法的优点是它非常灵活，可以适用于任何尺寸的子元素，并且不需要知道子元素的具体尺寸。此外，它也适用于垂直或水平居中单个元素，或者在父元素中>
居中多个子元素。
>
>
需要注意的是，这种方法的一个限制是父元素需要有一个确定的高度，或者至少是一个可以计算出50%偏移的高度。如果没有确定的高度，那么50%偏移将不会起>
作用，子元素可能不会居中。需要注意的是，这种方法的一个限制是父元素需要有一个确定的高度，或者至少是一个可以计算出50%偏移的高度。如果没有确定的>
高度，那么50%偏移将不会起作用，子元素可能不会居中。
> 绝对定位居中的原理基于CSS中的绝对定位（absolute
> positioning）特性，它允许你将元素从文档的正常流中移除，并相对于其最近的已定位（非static）>
> 祖先元素进行定位。如果没有这样的祖先元素，它将相对于初始包含块（通常是文档的`<html>`
> 元素）定位。
>
> 要使用绝对定位实现垂直和水平居中，通常遵循以下步骤：
>
> 1. **设置父元素的定位**:
     > 首先，你需要将父元素的`position`属性设置为`relative`
     。这样做是因为绝对定位的子元素是相对于其最近的已定位祖先元素定位的，而`relative`>
     属性将父元素变成这样一个定位上下文。
     >    ```css
>    .parent {
>      position: relative;
>      /* 父元素的高度和宽度可以根据需要设置 */
>    }
>    ```
>
> 2. **绝对定位子元素**:
     > 然后，将子元素的`position`属性设置为`absolute`
     。这样，子元素就可以从文档流中脱离出来，并可以相对于父元素进行定位。
     >    ```css
>    .child {
>      position: absolute;
>      /* 其他样式 */
>    }
>    ```
>
> 3. **计算50%偏移**:
     >
     为了居中子元素，你需要将其从父元素的中心向上下左右各移动50%。这可以通过设置`top`
     和`left`属性为`50%`来实现。
     >    ```css
>    .child {
>      position: absolute;
>      top: 50%;
>      left: 50%;
>      /* 其他样式 */
>    }
>    ```
>
> 4. **使用`transform`属性进行调整**:
     > 由于子元素的`top`和`left`
     设置为50%，其中心点会与父元素的中心点对齐。但是，这会导致子元素的左上角而不是中心点居中。为了解决这个问题，可以>
     使用`transform`属性的`translate`函数将子元素向左和向上移动其自身宽度和高度的一半。
     >    ```css
>    .child {
>      position: absolute;
>      top: 50%;
>      left: 50%;
>      transform: translate(-50%, -50%);
>      /* 其他样式 */
}

   ```

这种方法的优点是它非常灵活，可以适用于任何尺寸的子元素，并且不需要知道子元素的具体尺寸。此外，它也适用于垂直或水平居中单个元素，或者在父元素中居中多个子元素。

需要注意的是，这种方法的一个限制是父元素需要有一个确定的高度，或者至少是一个可以计算出50%偏移的高度。如果没有确定的高度，那么50%偏移将不会起作用，子元素可能不会居中。

4. **表格布局**:
   使用表格布局，元素可以很容易地居中。
   ```css
   .parent {
     display: table-cell;
     text-align: center;
     vertical-align: middle;
     height: 100px;
   }
   .child {
     display: inline-block;
   }
   ```

5. **线性居中**:
   使用`line-height`属性来居中文本或行内元素。
   ```css
   .parent {
     height: 100px;
     line-height: 100px; /* 与父元素高度相同 */
     text-align: center;
   }
   ```

6. **使用`margin`**:
   如果元素的高度是固定的，可以使用`margin`属性来实现垂直居中。
   ```css
   .child {
     width: 50px;
     height: 20px;
     margin: auto 0;
   }
   .parent {
     height: 100px;
   }
   ```

7. **使用`calc()`**:
   使用CSS的`calc()`函数来计算元素的上下边距，以实现垂直居中。
   ```css
   .child {
     width: 50px;
     height: 20px;
     position: absolute;
     top: calc(50% - 10px); /* 减去元素高度的一半 */
     left: 0;
     right: 0;
   }
   .parent {
     height: 100px;
     position: relative;
   }
   ```

选择哪种方法取决于具体的布局需求和浏览器兼容性。Flexbox和Grid是现代CSS布局的强大工具，它们提供了更灵活和简洁的方式来实现复杂的布局和居中效果。
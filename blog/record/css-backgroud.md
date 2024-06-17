---
slug: css/record2
title: background可以实现哪些效果
date: 2024-06-23
authors: Ray
tags: [ css ]
keywords: [ python ]
description: CSS笔记
#image: https://img.kuizuo.cn/202312270328599.png
sticky: 2
---
<!-- truncate -->
import Link from '@docusaurus/Link'
import {ShowHtml} from '@site/src/components/Utils'

CSS的`background`属性是一个非常强大的工具，它允许你为元素的背景设置多种效果。以下是一些可以通过`background`属性实现的效果：

1. **单一颜色背景**：

```css
div {
    background-color: #f0f0f0;
}
   ```

2. **渐变背景**：

- 线性渐变（Linear Gradient）：

```css
div {
    background: linear-gradient(to right, #f0f0f0, #e0e0e0);
}
```


- 径向渐变（Radial Gradient）：

```css
div {
    background: radial-gradient(circle, #f0f0f0, #e0e0e0);
}
```
- 径向渐变（Radial Gradient）：

```css
div {
    background: conic-gradient(#fff, #000);
}
```

- 径向渐变（Radial Gradient）：

```css
background: repeating-linear-gradient`、`repeating-radial-gradient`、`repeating-conic-gradient`
```

3. **图片背景**：

```css
div {
    background-image: url('image.jpg');
}
```

4. **背景平铺**：

- 不平铺：

```css
div {
    background-repeat: no-repeat;
}

```

- 平铺（默认）：

```css
div {
    background-repeat: repeat;
}
```

5
. * * 背景裁剪 * * ：

```css
div {
    background-clip: content-box;
}
```

6. **背景大小**：

- 覆盖整个元素：

```css
div {
  background-size: cover;
}
 ```
- 自定义大小：
```css
div {
  background-size: 100px 100px;
}
```

7. **背景定位**：
- 在元素内部定位图片：
```css
div {
  background-position: center;
}
 ```
- 指定位置：
```css
div {
  background-position: 50px 100px;
}
 ```

8. **背景层叠上下文**：
- 多个背景层叠：
```css
div {
  background: url('top-layer.png'), url('bottom-layer.jpg');
}
 ```

9. **固定背景**：
- 背景图像不随滚动条滚动：
```css
div {
  background-attachment: fixed;
}
 ```

10. **多背景图像**：
```css
div {
  background: url('bg1.jpg'), url('bg2.png'), linear-gradient(to right, #f0f0f0, #e0e0e0);
}
```

11. **原点背景**：
```css
div {
  background-origin: border-box;
}
```

12. **背景组合**：
```css
div {
  background: #f0f0f0 url('image.jpg') no-repeat center fixed;
  background-size: cover;
}
```

13. **使用CSS变量**：
```css
:root {
  --primary-color: #f0f0f0;
}
div {
  background-color: var(--primary-color);
}
```

14. **SVG作为背景**：
```css
div {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><path ... /></svg>');
}
```

15. **3D背景效果**：
通过CSS3的3D变换，可以创建具有深度感的背景效果。

16. **动画背景**：
使用`@keyframes`和`animation`属性，可以创建动画背景效果。

17. **交互式背景**：
利用伪类如`:hover`，可以创建鼠标悬停时改变的背景效果。

通过组合这些属性，你可以创造出几乎无限的可能性，从而增强网页的视觉吸引力。记得在实际项目中考虑性能和兼容性，确保为不同设备和浏览器提供良好的用户体验。

### [形式语法](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/radial-gradient#%E5%BD%A2%E5%BC%8F%E8%AF%AD%E6%B3%95)

```html
<!--/*<radial-gradient()>: 这是函数的总称，表示使用radial-gradient函数创建渐变。*/-->
<radial-gradient()> = 
  radial-gradient( [ <radial-gradient-syntax> ] )
  
<!--
<radial-gradient-syntax>: 这是radial-gradient函数的参数语法，可以包含形状、大小、位置和颜色停止列表
radial-shape radial-size至少有一个（||	“或”组合符	各部分至少出现一个，可以不按顺序）
[ <radial-shape> || <radial-size> ]? 零次或一次（即可选）
-->
<radial-gradient-syntax> = [ <radial-shape> || <radial-size> ]? [ at <position> ]? , <color-stop-list>  

<radial-shape> = 
  circle   |
  ellipse  

<radial-size> = 
  <radial-extent>               |
  <length [0,∞]>                |
  <length-percentage [0,∞]>{2}  

<position> = 
  [ left | center | right | top | bottom | <length-percentage> ]  |
  [ left | center | right ] && [ top | center | bottom ]  |
  [ left | center | right | <length-percentage> ] [ top | center | bottom | <length-percentage> ]  |
  [ [ left | right ] <length-percentage> ] && [ [ top | bottom ] <length-percentage> ]  

<color-stop-list> = 
  <linear-color-stop> , [ <linear-color-hint>? , <linear-color-stop> ]#  

<radial-extent> = 
  closest-corner   |
  closest-side     |
  farthest-corner  |
  farthest-side    

<length-percentage> = 
  <length>      |
  <percentage>  

<linear-color-stop> = 
  <color> <length-percentage>?  

<linear-color-hint> = 
  <length-percentage>
```


<ShowHtml href="/html/xxxx.html" name="xxxxxxxxxxxx"></ShowHtml>

<ShowHtml href="/html/backgroud1.html" name="backgroud"></ShowHtml>


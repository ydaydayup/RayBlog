在今天，`clip-path` 已经在 CSS 家族扮演了极其重要的角色，许多往日无法实现的形状，依靠 `clip-path` 如今都能轻松绘制。

本章，我们将一起走进 `clip-path`，从原理到各种技巧，一探究竟！



## 何为 `clip-path`？

根据官方文档，对 `clip-path` 的解释是，**该属性使用裁剪方式创建元素的可显示区域。区域内的部分显示，区域外的隐藏**。

简单看看它的语法：

```CSS
/* <clip-source> values */
clip-path: url(resources.svg#c1);

/* <basic-shape> values */
clip-path: inset(100px 50px);
clip-path: circle(50px at 0 100px);
clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
clip-path: path('M0.5,1 C0.5,1,0,0.7,0,0.3 A0.25,0.25,1,1,1,0.5,0.3 A0.25,0.25,1,1,1,1,0.3 C1,0.7,0.5,1,0.5,1 Z');
```

如果你对 `SVG` 比较熟悉，一眼就能看出，`clip-path` 内的参数，其实类比的就是 SVG 中的各种图形的语法。

我们可以通过 `clip-path` 定义一个特殊的**路径规则**，基于这个路径的形状，裁剪元素，最终得出我们想要的图形。

上述的 `clip-path` 规则看上去很多、很复杂，但是如果接触过 SVG，或者有使用过 PS、AI 等图形处理软件之类的工具，通过类比学习，其实很好记忆与理解。

当然，换过来想，如果没有接触过 SVG，学习完本文后再去学习 SVG 路径，也会事半功倍，会十分容易上手。


### clip-path 示例

`clip-path` 的语法及最基本的使用属于非常基础的内容，本文不会完全展开。如果有同学完全没有相关基础，可以快速了解一下 SVG 以及 SVG 中路径的相关内容后再来阅读本文。

来个最简单的 Demo，使用 `clip-path`，基于一个 `div` 元素，实现一个**圆形**和一个**十边形**图形。

```CSS
/* 圆形 */  
.circle {  
  width: 100px ;  
  height: 100px ;  
  background-color: yellowgreen;  
  clip-path: circle(50px at 50px 50px); 
}  
/* 十边形 */
.polygon {
  width: 100px;
  height: 100px;
  background-color: yellowgreen; 
  clip-path: polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%);
}
```

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7be3fc519b974a428ec7024abab8436f~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

1.  `clip-path: circle(50px at 50px 50px)` 的意思是，以元素的左上角为坐标起点，在元素的 （50px, 50px）处，生成一个半径为 50px 的圆，而这个生成的圆的范围之外，就是会被裁剪掉的内容。
1.  `clip-path: polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)` 中，依次列出了 10 个坐标点（仍旧是以元素的左上角为坐标起点）。整个图形就是依次连接这 10 个坐标点形成一个 10 边形，同理，这个生成的 10 边形图形的范围之外，就是会被裁剪掉的内容。

当然，上述单位采用的是百分比，也可以使用具体的数值，譬如 `0%` 是可以替换成 `0px`，`100%` 可以替换成 `100px`。

到这里，你应该可以快速 Get 到 `clip-path` 的作用。**元素将保留** **`clip-path`** **路径生成的图形内部的内容，裁剪掉生成图形之外的内容。**



## 技巧一：利用 `clip-path` 在线工具快速生成路径

有的时候，我们希望借助 `clip-path`，快速生成我们想要的图形，由于 `clip-path` 内的各种参数自己一个一个填不太方便，所以社区也涌现了非常多好用的 `clip-path` 工具，这里介绍两个我常用的。

-   [clippy](https://bennettfeely.com/clippy/)
-   [CSS clip-path Editor](https://codepen.io/stoumann/pen/abZxoOM)

以第一个网站—— [clippy](https://bennettfeely.com/clippy/) ——为例，对于一些简单图形，我们可以在这里快速拿到我们想要的 `clip-path` 代码。

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00f11199502b43ccaa3508c7011621af~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

这些常见图形可以满足大部分的需求，也可以基于这里的参数，稍微改造润色成我们想要的。

有了这些工具的辅助，我们可以快速生成想要的一些常见不规则图形。基于这个技巧，最常见的使用场景就是我们可以实现一些不规则的按钮。



## 技巧二：使用 clip-path 实现常见不规则图形

举几个例子，可以借助 `clip-path` 快速切出一个切角图形，这样，背景色可以是任意定制的颜色，无论是渐变还是纯色都不在话下：

```HTML
<div class="clip-notching">notching</div>
```

```CSS
.clip-notching {
    background: linear-gradient(
        45deg,#f9d9e7,#ff1493
    );
    clip-path: polygon(
        15px 0,
        calc(100% - 15px) 0,
        100% 15px,
        100% calc(100% - 15px),
        calc(100% - 15px) 100%,
        15px 100%,
        0 calc(100% - 15px),
        0 15px
    );
}
```

首先，利用 background 简单实现一个渐变背景。

其次，在渐变矩形图形的基础上，利用 `clip-path: polygon()` 切出我们想要的形状（一个 8 边形）：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/931e4519662c41fa990a66ccf88f4d4e~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

当然，上述代码非常容易联想到下述这种 6 边形，使用 `clip-path` 也可以轻松得到：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d1d7a4d11a16430d919a3c95df9bb33b~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

其核心代码，利用 `clip-path: polygon()` 切出我们想要的形状（一个 6 边形）：

```CSS
{
    background: linear-gradient(
        45deg,
        #f9d9e7,
        #ff1493
    );
    clip-path: polygon(
        30px 0,
        calc(100% - 30px) 0,
        100% 50%,
        calc(100% - 30px) 100%,
        30px 100%,
        0 50%
    );
}
```

对于上述的八边形和六边形，在我们的上几章中其实也出现过，直接使用渐变或者使用 mask 也是可以实现的。这里需要注意类比与渐变或者使用 mask 方式的异同。

这里，毫无疑问，使用 `clip-path` **实现不规则图形是最容易理解的并且代码量最少的**。我们只需要算出顶点的坐标即可。

再对比一下，如果让你使用渐变或者使用 mask 实现如下这个图形：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f8e7ac96ca914a5d8838170eb3cb58f7~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

你会怎么做呢？是不是感觉就有点棘手了？当然，使用渐变或者使用 mask 是完全可以实现上面这个图形的，就是有点 Hack 的味道。但是 `clip-path` 天生就是用于来实现这种不规则直线图形的！

这里给出 `clip-path` 的解法：

```CSS
{
    background: linear-gradient(45deg, #04e6fb, #65ff9a);
    clip-path: polygon(
        0 0,
        30px 50%,
        0 100%,
        calc(100% - 30px) 100%,
        100% 50%,
        calc(100% - 30px) 0
    );
}
```

所以，很多时候，一个非常规图形使用 CSS 画出来的方式可能会有很多，我们需要对各个属性更加了解，以做到灵活运用，在不同的场景中选择最适合的方案！



## `clip-path` 的局限性

使用 `clip-path` 生成图形的非常大一个问题在于，它无法作用完整的边框。

举个例子，我们利用 `clip-path` 得到一个箭头图形：

```HTML
<div></div>
```

```CSS
div {
    width: 200px;
    height: 100px;
    clip-path: polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%);
    background: #ff5722;
}
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3c342c6193e4615a71d8026550eb6a0~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

如果我们想给它添加一个边框，实际得到的可能并非我们想象的结果：

```
div {
    width: 200px;
    height: 100px;
    clip-path: polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%);
    background: #ff5722;
    border: 1px solid #000;
}
```

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bfa71f5ea8194a8a9fc378c24ceb8b91~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

可以看到，只有图形的最右侧展示了边框。这是因为，`clip-path` 其实是切割图形，边框其实是作用在原本的整个 div 之上的，看看这个 Gif 图就能一目了然：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b3c2e1d3a2344f6b4fdc5bfca044b92~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

那么，我们又想给切割完成之后的图形添加边框，怎么办呢？

这里，我们需要 `filter: drop-shadow()`。




## 技巧三：借助 `filter: drop-shadow()` 给 `clip-path` 图形添加边框或者阴影

我们可以借助 `filter: drop-shadow()` 给 `clip-path` 图形添加边框或者阴影。

`box-shadow` 盒阴影的作用是在整个元素的后方创建阴影，而 `drop-shadow()` 滤镜则是创建一个符合元素本身形状（alpha 通道）的阴影。

因此，我们可以通过给元素添加一层极为薄的 `drop-shadow()` 模拟元素的边框，当然，这里还需要注意，需要给作用了 `clip-path` 的父元素去添加 `drop-shadow()`。

我们改造下代码：

```HTML
<div class="father">
    <div class="children"></div>
</div>
```

```CSS
.father {
    margin: auto;
    filter: drop-shadow(0 0 0.5px #000);
}
.children {
    width: 200px;
    height: 100px;
    clip-path: polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%);
    background: #ff5722;
}
```

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f99a2159a9424be29c18bc6b758155dd~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

emmm，看到这，大家肯定会吐槽，这是啥啊？这不是阴影么？和边框有啥关系？

是的，这里还需要另外一个小技巧，那就是：`drop-shadow()` 是可以重复添加多次的（我们称之为多层阴影）。我们再尝试多添加几层一样的 `drop-shadow()`：

```CSS
.father {
    margin: auto;
    filter: 
        drop-shadow(0 0 .5px #000)
        drop-shadow(0 0 .5px #000)
        drop-shadow(0 0 .5px #000)
        drop-shadow(0 0 .5px #000)
        drop-shadow(0 0 .5px #000)
        drop-shadow(0 0 .5px #000)
        drop-shadow(0 0 .5px #000);
}
```

如此一来，再看看效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87bf8314a8844c0b888e83dc59ceeb93~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

这次，基本上给元素添加上了我们想要的边框效果。

接下来，我们再换个图形，真正利用 `drop-shadow()` 给 `clip-path` 图形添加阴影。




## 技巧四：clip-path 的坐标可以是负数，可以超出 100%

这个技巧很有意思。

最常见的使用的 `clip-path: polygon()`中，`polygon()` 内需要填入具体的数值，但是这里面的值**可以是负数，可以超出 100%** 。

看一个例子，我们实现一个容器，内部有一个图片，图片的高宽是容器的 `120%`：

```HTML
<div>
    <img src="https://picsum.photos/400/400?random=5" alt="">
</div>
```

```CSS
div {
    position: relative;
    width: 300px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    &::before {
        content: "";
        position: absolute;
        inset: 0;
        border: 3px dashed #e30;
    }
}
div img {
    width: 120%;
    height: 120%;
}
```

效果如下（为了方便示意，红色虚线边框是父容器的大小）：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d384128b98874ee78be134a79fa63fcb~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

我们尝试给父容器 `div` 添加一个 `clip-path()`：

```CSS
div {
    position: relative;
    width: 300px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    clip-path: polygon(-5% -9%, 107% -3%, 100% 108%, -5% 105%);
}
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3117e1faae2475cabecb338450f7d1e~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

这个技巧非常重要，意思是 `clip-path` **不仅仅能控制元素内的裁剪，对超出元素范围的内容一样有裁剪的能力**！

这个技巧常用于一些不规则布局当中。看看下面这个例子，GTA 5 游戏的封面布局图：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed2b69f18b7e461180c4aa16aa249c1c~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

很多同学会说，唉，这里切图不就好了？那我们再加上交互效果呢？像是这样：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b2d30ad433c411f9ab3d3734d4866d5~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

这就没法切图实现了，这里的核心就在于：利用 `clip-path` 切割的范围，可以超出容器，配合 Grid 布局实现。

我们看看实际的步骤：

1.  首先利用 Grid 布局实现一个 4 x 4 的网格布局；
1.  再将其内部的空间划分为 9 个不同的部分。

> 这里可能涉及了一些 Grid 布局的知识，但是不难，核心就是设定网格，划分区域，对 Grid 布局不太熟悉的同学也不必惊慌，网格布局在这里只是起辅助作用。不影响后续对 clip-path 技巧的理解。

整体代码如下：

```HTML
<div class="parent">
  <div class="child" >
    <img src="image1.png" alt="">
  </div>
  <div class="child">
    <img src="image2.png" alt="">
  </div>
  <div class="child">
    <img src="image3.png" alt="">
  </div>
  <div class="child">
    <img src="image4.png" alt="">
  </div>
  <div class="child">
    <img src="image5.png" alt="">
  </div>
  <div class="child">
    <img src="image6.png" alt="">
  </div>
  <div class="child">
    <img src="image7.png" alt="">
  </div>
  <div class="child">
    <img src="image8.png" alt="">
  </div>
  <div class="child">
    <img src="image9.png" alt="">
  </div>
</div>  
```

```CSS
.parent{
  border: 1px solid #c9b473;
  overflow: hidden;
  display: grid;

  grid-template-columns: 1fr .7fr .3fr 1fr;
  grid-template-rows: 20% 40% 20% 20%;
  grid-template-areas: 
    'one two two three'
    'four five five five'
    'six five five five'
    'six seven eight eight';
}
.child{
  &:first-child{
    grid-area: one;
  }
  &:nth-child(2){
    grid-area: two;
  }
  &:nth-child(3){
    grid-area: three;
  }
  &:nth-child(4){
    grid-area: four;
  }
  &:nth-child(5){
    grid-area: five;
  }
  &:nth-child(6){
    grid-area: six;
  }
  &:nth-child(7){
    grid-area: seven;
  }
  &:nth-child(8){
    grid-area: eight;
  }
  &:nth-child(9){
    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 2;
    grid-column-end: 4; 
  }
}
```

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f685576f33748e3aa56669abb0cfd5e~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

紧接着，我们可以利用 `clip-path` 对每一块的 Gird item 进行二次裁剪。注意，这里的裁剪就利用了上面说的非常重要的技巧 —— **裁剪的区域是可以超出元素本身的一个区域所在**。

同时，我们控制被裁剪区域内的图片大小，让这些图片的大小超出容器本身，这样可以让图片溢出容器，同时受到 `clip-path` 的控制。

```CSS
.child{
  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3){
    img{
      width:120%;
      height: 120%;
    }
  }
  &:first-child{
    grid-area: one;
    clip-path: polygon(0% 0%, 93.24% 0%, 105.04% 110.16%, 0% 90%);
  }
  &:nth-child(2){
    grid-area: two;
    clip-path: polygon(0% 0%, 108.28% 0%, 96.45% 110.13%, 10.55% 110.93%);
  }
  &:nth-child(3){
    grid-area: three;
    clip-path:polygon(15.05% 0%, 100% 0%, 99.35% 91.7%, 3.08% 108.48%);
  }
  &:nth-child(4){
    grid-area: four;
    clip-path: polygon(0% -0.85%, 106.34% 9.98%, 121.32% 65.63%, 99.66% 109.89%, 1.86% 124.41%);

    img{
      width: 135%;
      height: 135%;
    }
  }
  &:nth-child(5){
    grid-area: five;
    clip-path: polygon(6.4% 6.48%, 47.24% 5.89%, 100% 0%, 98.41% 96.85%, 53.37% 100%, 53% 63.21%, 3.23% 73.02%, 14.30% 44.04%);
  }
  &:nth-child(6){
    grid-area: six;
    clip-path:  polygon(2.14% 29.3%, 99.34% 15.42%, 98.14% 100.82%, 1.57% 101.2%);
  }
  &:nth-child(7){
    grid-area: seven;
    clip-path: polygon(7.92% 33.47%, 96.31% 23.39%, 95.38% 100%, 5.30% 100.85%);
  }
  &:nth-child(8){
    grid-area: eight;
    clip-path: polygon(2.5% 22.35%, 100% 0%, 100% 100%, 1.55% 100%);
  }
  &:nth-child(9){
    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 2;
    grid-column-end: 4; 

    clip-path:polygon(5.94% 28.66%, 100.61% -0.67%, 101.1% 108.57%, 5.4% 126.28%);

    img {
      object-position: 30% 50%;
      height: 135%;
    }
  }
}
```

这样，因为设置了**图片溢出容器，同时受到** **`clip-path`** **的控制。** 就实现了我们最终想要的效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4595004e7cce43a1ad725ad74a06d106~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

在这里，`clip-path` 可以裁剪容器之外的区域，发挥了重要的作用。

> 完整的代码，你可以戳这里：[CodePen Demo -- GTA 5 poster ( Grid and Clip Path)](https://codepen.io/Chokcoco/pen/jOVjxjo)





## 技巧五：利用 clip-path 实现指定区域的 `overflow:hidden`

我们继续延续上面的话题，既然 `clip-path` 可以控制区域外的裁剪，那么还会发生什么呢？

这还意味着，我们可以利用 `clip-path`，实现指定区域的 overflow:hidden。什么意思呢？我们都知道，正常情况下，我们想实现元素的超出裁剪，使用的都是 `overflow:hidden`。

除了 `overflow: hidden`，CSS 中还有其他属性也可以实现超出容器区域进行内容裁剪的。没错，正是 `clip-path` 。

使用 `clip-path`，可以实现任意方向上的空间裁剪！其控制内容的溢出裁剪的能力比 `overflow: hidden` 还要强大。

如何理解呢？想象这样一种场景，在某个需求的实现过程中，有一类特殊情况，要求容器内的内容，**在竖直方向上超出容器区域后会被裁剪，而如果在水平方向上超出容器区域，则不会被裁剪**。

类似于如下动图所示：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1822f85f89046bba4c67d330b41b143~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

这里，我们借助 `clip-path`，实现自定义的裁剪空间，关键的 CSS 代码如下：

```CSS
.g-container {
    width: 200px;
    height: 200px;
    clip-path: polygon(-1000% 0, 1000% 0, 1000% 100%, -1000% 100%);
}
```

这里我们可以利用 `clip-path: polygon()`来裁剪一个矩形区域。

值得注意的是，这里也会运用到上述提到的技巧，**裁剪的区域是可以超出元素本身的一个区域所在的。**

没错，`clip-path: polygon()` 内的点是支持负坐标的，因此，基于实际需求，我们就可以利用 `clip-path` 构建一个任意大的裁剪区域，这个区域可以远远超出元素本身的大小范围。

在这里，基于需要，我们将整个裁剪区域画成一个超大的矩形形状，也就是 `polygon(-1000% 0, 1000% 0, 1000% 100%, -1000% 100%)`，这样我们就成功实现了特定区域的 `overflow: hidden`。

再举两个例子：

```CSS
{
    // 只允许右侧可以溢出的容器
    clip-path: polygon(0 0 ,1000% 0, 1000% 100%, 0 100%);

   // 裁剪出左边、上边、右边都 overflow:hidden，下边不 overflow: hidden 的区域
    clip-path: polygon(100% 0，100% 1000%, 0 1000%, 0 0);
}
```

譬如，上述的 `clip-path: polygon(0 0 ,1000% 0, 1000% 100%, 0 100%)` 实现了一个只允许右侧可以溢出的容器：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3abeb068808245248dee235a6048b999~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

其实际裁剪区域是这样的：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b6378b5501e4e1bab27f2906dba1c94~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

并且，这种方案的好处是，我们能够在当前容器大小范围内，画出任意形状的 `overflow: hidden` 的范围，并且不会影响到其他元素内容。

> 完整的代码，你可以点进 Demo 里面尝试下：[CodePen -- Clip-path overflow](https://codepen.io/Chokcoco/pen/eYQNLRa)

当然，上述代码中的 `1000%` 是非常灵活的，自己控制，够用就行。




## 总结

OK，总结一下，`clip-path` 是由参考 SVG 引入 CSS 中的非常重要的一个属性。本文的重要内容再罗列一下：

1.  与 SVG 的路径类似，理解 `clip-path` 使用裁剪方式创建元素的可显示区域。区域内的部分显示，区域外的隐藏。
1.  可以利用 `clip-path` 在线工具快速生成路径，基于此实现常见的不规则图形。
1.  可以借助 `filter: drop-shadow()` 给 `clip-path` 图形添加**边框**或者**阴影**。
1.  `clip-path` 的坐标可以是负数，可以超出 100%。
1.  `clip-path` 可以实现指定方向上的 `overflow: hidden` 效果。

下一章节，依旧是 `clip-path`相关内容，我们将看看基于 `clip-path`的动画又能碰撞出什么火花！

好的，本章节到此结束，大伙还有什么疑问，可以在评论区一起讨论。
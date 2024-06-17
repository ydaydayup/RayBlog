从本章开始，我们将进入 **`滤镜`** 相关的篇章当中！

在 CSS 中，滤镜 `filter` 是一类功能非常强大的属性。

CSS 包含有多种不同的滤镜，它们的作用各不相同，通常用于调整图像、背景和边框的渲染，可以将模糊或颜色偏移等图形效果应用于元素之上，以产生不同的效果。

在 CSS 中，滤镜的使用方式主要会分为 3 种：

1.  通过 CSS 的 filter 属性，使用滤镜；
1.  通过 CSS 的 backdrop-filter 属性，使用滤镜；
1.  通过 CSS filter 属性中的 `url()` 值，引入由 SVG 实现的特殊滤镜效果。

在接下来几个章节中，我们将主要讲述通过上述 (1)、(2) 方式引用的滤镜效果。



## filter 滤镜基础扫盲

首先，filter 滤镜的语法比较简单：

```CSS
{
    // 模糊滤镜
    filter: blur(5px);
    // 明亮度滤镜
    filter: brightness(0.4);
    // 对比度滤镜
    filter: contrast(200%);
    // 阴影滤镜
    filter: drop-shadow(16px 16px 20px blue);
    // 灰度滤镜
    filter: grayscale(50%);
    // 色相旋转滤镜
    filter: hue-rotate(90deg);
    // 反转滤镜
    filter: invert(75%);
    // 不透明度滤镜
    filter: opacity(25%);
    // 饱和度滤镜
    filter: saturate(30%);
    // 褐色滤镜
    filter: sepia(60%);

    /* 滤镜可以叠加 */
    filter: contrast(175%) brightness(3%);
}
```

关于它们的效果，不一一赘述，可以通过这张图来一个大致的了解：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58529726249e4b71855fb9aeb658be83~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整代码，戳这里：[CodePen Demo -- Css3 filter](https://codepen.io/Chokcoco/pen/wrwbvG)

建议你点进 Demo 当中，通过 hover 元素感受每一个滤镜的作用，观察该滤镜的效果。




## filter 滤镜是可以叠加使用的

基础扫盲后，我们来了解一下使用滤镜的过程中，需要注意的点以及它们的一些特殊之处。


### 可以给同个元素同时定义多个不同的滤镜

例如：

1.  `filter: contrast(150%) brightness(1.5)`
1.  `filter: brightness(1.5) contrast(150%)`

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e913b1d2f784b229dc4bb35014d6f92~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

当然，在**同个元素同时定义多个不同的滤镜的背景下**，要介绍滤镜当中非常重要的一个特性，那就是：**多个相同滤镜，以不同的先后顺序作用于元素之上，最终产生的效果也将会是不一样的**。

这是因为每一个滤镜都有其特殊的色值处理算法，而不同的滤镜基于不同的顺序，最终对图片产生的效果也是不一样的。


### 可以给同个元素同时定义多个相同的滤镜

还有一个情况，我们可以给同个元素，同时定义多个相同的滤镜。

什么意思呢？或者说什么场景下会出现这种情况呢？通常而言，在 `filter: drop-shadow()` 的使用过程中，用得比较多。

譬如，我们使用 `border` 来实现一个三角形：

```HTML
<div></div>
```

```CSS
div {
    margin: auto;
    border: 50px solid transparent;
    border-top: 50px solid #000;
}
```

得到这样一个图形：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/535241e220dc498e8638985a34d9ac52~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

还记得在之前阴影章节中，我们有讲到阴影是可以多重的吗？在 `drop-shadow()` 中也是一样的，只是语法稍有不同，我们需要多次使用 `drop-shadow()` 关键字来生成多重阴影。

像是这样：

```CSS
div {
    margin: auto;
    border: 50px solid transparent;
    border-top: 50px solid #000;
    filter: 
        drop-shadow(5px 10px 2px #f00)
        drop-shadow(-5px -10px 2px #0f0);
}
```

这里，我们就运用了**给同个元素同时定义多个相同的滤镜，给元素添加了两个** **`drop-shadow`** **。**

我们将得到如下的效果，基于元素生成了两个阴影：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de6b50e6c931466fa8de02e6f666d800~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

总之，记住，**可以给同个元素定义多个滤镜，并且滤镜是可以重复的**。这个技巧在我们后面的章节中会频繁用到。





## filter 与 backdrop-filter 的异同

继续，在 CSS 中，已经有了 `filter`，为啥又多出了一个 `backdrop-filter`？

简单而言，两者的作用元素是有所差异的。

-   `filter`：模糊滤镜的作用是将模糊或颜色偏移等图形效果**作用于元素之上**。
-   `backdrop-filter`：该属性可以在元素后方区域，添加上模糊或颜色偏移等图形效果。`backdrop-filter` **的生效范围是元素背后的所有内容，因此，为了能够看到效果，元素或其背景至少要保持部分透明**。

综上，不难得出两者之间的差异：`filter` 滤镜作用于元素本身，而 `backdrop-filter` 滤镜作用于元素背后区域所覆盖的所有元素。

再看看它们所支持的滤镜种类：

|             | filter | backdrop-filter | 备注             |
| ----------- | ------ | --------------- | -------------- |
| url         | √      | √               | 获取指向SVG过滤器的URI |
| blur        | √      | √               | 高斯模糊滤镜         |
| brightness  | √      | √               | 图像明亮度的滤镜       |
| contrast    | √      | √               | 图像的对比度滤镜       |
| drop-shadow | √      | √               | 图像的阴影滤镜        |
| grayscale   | √      | √               | 图像灰度滤镜         |
| hue-rotate  | √      | √               | 图像色相滤镜         |
| invert      | √      | √               | 反转滤镜           |
| opacity     | √      | √               | 透明度滤镜          |
| sepia       | √      | √               | 深褐色滤镜          |
| saturate    | √      | √               | 图像饱和度滤镜        |

可以看到，`filter` 和 `backdrop-filter`支持的滤镜种类是一模一样的。其差异点就在于作用的元素上。

那么，上面所谓的**作用元素上的差异**，该如何理解？我们下面详细来看看。


### 作用对象的差异

`backdrop-filter` 滤镜最为常见的使用场景，就是实现毛玻璃效果。

下面我们就通过实现毛玻璃效果来理解 `filter` 和 `backdrop-filter` 两个滤镜在使用上的一些差异。

在没有 `backdrop-filter` 属性前，我们想实现如下所示的毛玻璃效果，是比较困难的：

> **毛玻璃效果**是一种视觉效果，通常用于美化设计或增加隐私保护。它通过模糊化图像的某些区域来达到这种效果，使图像看起来有一层轻微的模糊，同时仍然清晰可见。毛玻璃效果可以应用于图像、文本、按钮等各种 UI 元素上，为用户提供更加优雅和良好的视觉体验。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a897c1c8a7744d8e80aa2ae5b7e6f3a7~tplv-k3u1fbpfcp-zoom-1.image)

在有了 `backdrop-filter` 属性后，毛玻璃效果的实现就非常简单了。

仅仅需要如下一段简单的代码：

```HTML
<div class="bg">
    <div>Normal</div>
    <div class="g-filter">filter</div>
    <div class="g-backdrop-filter">backdrop-filter</div>
</div>
```

```CSS
.bg {
    background: url(image.png);
    
    & > div {
        width: 300px;
        height: 200px;
        background: rgba(255, 255, 255, .7);
    }
    .g-filter {
        filter: blur(6px);
    }
    .g-backdrop-filter {
        backdrop-filter: blur(6px);
    }
}
```

下面列出了 3 种效果，分别是：

1.  正常情况，没有使用任何滤镜；
1.  元素作用了 `filter: blur(6px)`；
1.  元素作用了 `backdrop-filter: blur(6px)`。

效果对比图如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c326dc45eb742f6add725b50515a5e6~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整代码，戳这里：[CodePen Demo -- filter 与 backdrop-filter 对比](https://codepen.io/Chokcoco/pen/WNjebrr)


两个模糊滤镜最明显的差异点是：

-   `filter` 滤镜作用于**当前元素**，仔细理解这里的当前元素，并且它的后代元素也会继承模糊滤镜的效果；
-   `backdrop-filter` 滤镜作用于**元素背后区域的所有元素**。

仔细区分理解什么是**当前元素**、什么是**元素背后区域的所有元素**，可以理解为，`backdrop-filter` 并非作用于自身的。弄明白了这个点，就能够明白为什么规范设计了一个 `filter`滤镜，又出了一个 `backdrop-filter`。


### 效果上的差异

下面来看一些实际使用上效果的差异。

譬如，我们想实现这样一个图片的蒙版 Hover 效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9fbeaa781b094f79b51b62a4c7aadca5~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

由于 `backdrop-filter`的作用范围是元素背后区域的所有元素，而这个区域是可以移动的。

基于这一点，我们可以轻松利用它实现上述效果，其核心就是将作用了 `backdrop-filter` 的元素当成一个蒙版。我们要做的，只是在 Hover 的时候，移动这个蒙版即可，其核心伪代码如下：

```HTML
<div></div>
```

```CSS
div {
    position: relative;
    background: url(https://www.wptunnel.com/wp-content/uploads/2021/07/wptunnel-hd-beautiful-wallpaper-4.jpg);
}

div::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    backdrop-filter: grayscale(100%);
    transition: .3s transform;
}

div:hover::before {
    transform: translate(100%, 0);
}
```

而如果要使用 `filter` 实现上述效果，则会比较麻烦，因为 `filter` 是作用于一整个的元素上的。

所以，`filter` 滤镜只能实现类似于下面这样的 Hover 效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f607f90728b4bfb94e2056a5c667636~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

可以再通过上面两个例子，好好理解两种滤镜的差异。

> 上述两个效果 Demo：[CodePen -- filter VS backdrop-filter](https://codepen.io/Chokcoco/pen/VwzQYRV)


核心代码：

```CSS
div {
    filter: grayscale(100%);
    transition: .3s filter;
}
div:hover {
    filter: grayscale(0);
}
```





## 作用了 `filter` 和 `backdrop-filter` 的元素会导致 3D 效果失效

接下来这一点很有意思。

当然，这一点 `filter` 和 `backdrop-filter` 都一样，那就是作用了 `filter` 和 `backdrop-filter` 的元素（值不为 `none`），都会生成 `Backdrop Root`。

什么是 `Backdrop Root` 呢？（规范：[CSS 草案 -- Backdrop Root](https://drafts.fxtf.org/filter-effects-2/#BackdropRoot)。）也就是我们常说的，生成了自己的堆叠上下文（Stacking Context）。

我们直接来看，它会造成什么问题。


### 生成了 `Backdrop Root` 的元素会使 CSS 3D 失效

首先，我们可以使用 CSS，简单实现一个 3D 球的旋转动画，大概是这样：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b6b6953d66145ee9f0744364b86379d~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 这个 Demo 你可以戳这里：[CodePen Demo - 3D ball](https://codepen.io/Chokcoco/pen/JwdvmJ)

此时，如果再给上述的元素，随意添加上一个 `filter` 或者 `backdrop-filter` 滤镜效果：

```CSS
.container {
    transform-style: preserve-3d;
    filter: blur(1px);
    // 或者
    backdrop-filter: blur(1px);
}
```

这里，设置了 `transform-style: preserve-3d` 的元素，如果再添加上一个 `filter`，整个 3D 动画就会坍缩为 2D 动画：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8af9b69f792b4c00a090e48d826c7f77~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

奇怪的事情发生了，`filter: blur(1px)` 的效果应该是让 3D 球变模糊，但是预想中的情形并没有发生，取而代之的是整个 3D 效果的失效。

经过一番资料的查找，发现这个问题属于 Chromium 内核的老问题了，详细信息在 Chromium bug 提交网站上，有一个 15 年就被提出的 bug 单：

- [BUG -CSS mix-blend-mode turns off CSS perspective.](https://bugs.chromium.org/p/chromium/issues/detail?id=543445)

在 bug 单的最下面找到了可能靠谱的回答：

> When we have mix-blend-mode, the closest ancestor that creates stacking context will isolate blending. We create a render surface at the root of this isolated group and because render surfaces don't support preserve-3d(because they render into separate FBO), we see a flattened result.
>
> ajuma@ suggested that this bug maybe much easier to fix after Slimming paint v2 if we can somehow disentangle transforms from layers.

翻译一下，意思大概是：如果对一个元素应用了**滤镜或者混合模式**，那么堆叠上下文会在该元素的根节点处重新创建一个独立的渲染平面。但是，这个独立的渲染平面是不支持 `preserve-3d` 的，而 CSS 中 `preserve-3d` 是用于创建三维空间的。它们最终被渲染到单独的帧缓冲对象中，所以我们只能得到一个 2D 平面效果。


### 验证 Layer borders

在 Chrome 开发者工具里面，也可以看到页面的渲染层级。我们再验证一下，打开 Chrome 开发者工具，在右上角的三个点中，选择 More Tools -> Rendering -> Layer borders，勾选上如下选项：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e01a20a7c5d548db804a90469afd4279~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

在勾选之后，你会发现页面多了一些新的元素，其中：

1.  页面中的橙黄色线框代表渲染时候的 GraphicsLayer 层；
1.  蓝色网格表示瓦片（tile），你可以把它们当作是层的单元（并不是层），Chrome 内核可以将它们作为一个大层的部分上传给 GPU 进行渲染加速。

可以看到，在没有添加滤镜，也就是正常模式下，开启 Layer borders 后的效果如下所示：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e10d24500d084dab959981e781b33fff~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

而手动添加了 `filter: blur()` 后，再观察开启 Layer borders 后的效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/507fec42565e424485b9c0d629dbdf89~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

可以看到，在添加了 `filter: blur()` 后，在整个球形元素之外，又多了一层蓝色的网格。

这个蓝色网格就是上文中提到的独立的渲染平面，而这个蓝色网格在 Chrome 中是不支持 `preserve-3d` 的，也就是因为这个渲染平面不支持 `preserve-3d` 的原因，最终整个 3D 退化成了一个 2D 平面图形。

截止到本小册写作的今天，不仅仅是 `filter` 会导致 3D 失效，下述的几个属性，都会导致 CSS 3D 失效：

-   `mix-blend-mode`；
-   `background-blend-mode`；
-   `filter`；
-   `backdrop-filter`。






## 作用了 `filter` 和 `backdrop-filter` 的元素会使内部的 fixed 定位失效

下面这个特性并不能被视为 Bug，它是 CSS 中的一个独特表现。

通常，CSS 中的 `position: fixed` 是相对于屏幕视口进行定位的。但是，对于应用了 `filter`和 `backdrop-filter` 的元素，其内部的 `position: fixed` 元素将不再相对于屏幕视口进行定位，而是相对于 Backdrop Root 元素进行定位。

这意味着，`position: fixed` 定位的元素会退化变成 `position: absolute`的表现形式。

下面我们通过一个 Demo 来演示这一现象，我们设置两个父子 div，子元素应用了 fixed 定位，然后通过修改父元素来创建一个新的层叠上下文，观察子元素的 fixed 定位是否不再相对于视口进行定位。

```HTML
<div class="container"> 
  <div class="fixed"> </div>
</div>
```

最初的 CSS 代码：

```CSS
.container {
    width:10vw;
    height: 10vw;
    background: rgba(255, 100, 100, .8);
}

.fixed {
    position: fixed;
    top: 1vw;
    left: 1vw;
    right: 1vw;
    bottom: 1vw;
    background: rgba(100, 100, 255, .8);
}
```

我们会得到这样一个图形：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86ca3ab85e1f4f299051f5872ae85b5d~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

当前，上述图形中：

1.  红色色块，是 `.container` 父级元素，没有设置一些特殊属性；
1.  蓝色色卡，是 `.fixed` 子元素，设置了 `position: fixed` 定位。

由于子元素是 `position: fixed`定位，设置距离上下左右的距离为 `1vw`，因为是相对于视口进行定位的，因此当前是正常的展示。

然而，如果我们给父元素 `.container` 新增一个 `filter: blur(1px)`，子元素的 `fixed` 定位就会退化成 `position: absolute` 定位！

```CSS
.container {
    width:10vw;
    height: 10vw;
    background: rgba(255, 100, 100, .8);
    filter: blur(1px);
}
```

看看效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1531c0696b384c6c97043057d4af3027~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>



### 理解 Stacking Context 堆叠上下文

那么，为什么会发生这种情况呢？说好的相对视口（Viewport）定位呢？

这个问题，就牵涉到了 Stacking Context，也就是堆叠上下文的概念了。解释上面的问题分为两步：

1.  任何非 none 的 transform 值都会导致一个堆叠上下文（Stacking Context）和包含块（Containing Block）的创建。
1.  由于堆叠上下文的创建，该元素会影响其子元素的固定定位。设置了 `position:fixed` 的子元素将不会基于 viewport 定位，而是基于这个父元素。

**堆叠上下文（Stacking Context）和包含块（Containing Block）的理解会比较困难。** 堆叠上下文是 HTML 元素的三维概念，这些 HTML 元素在一条假想的相对于面向（电脑屏幕的）视窗或者网页的用户的 z 轴上延伸，HTML 元素依据其自身属性按照优先级顺序占用层叠上下文的空间。

概念比较抽象，简单理解，记住**生成了 Stacking Context 的元素会影响该元素的层叠关系与定位关系**。

CSS 中，能够生成堆叠上下文的方法有非常多，方法如下（参考自 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context)）：

-   根元素 (HTML)；
-   z-index 值不为 "auto" 的绝对/相对定位；
-   一个 z-index 值不为 "auto" 的 flex 项目 (flex item)，即：父元素 display: flex|inline-flex；
-   opacity 属性值小于 1 的元素（参考 the specification for opacity）；
-   transform 属性值不为 "none" 的元素；
-   mix-blend-mode 属性值不为 "normal" 的元素；
-   filter 值不为 “none” 的元素；
-   perspective 值不为 “none” 的元素；
-   isolation 属性被设置为 "isolate" 的元素；
-   position: fixed；
-   在 will-change 中指定了任意 CSS 属性，即便你没有直接指定这些属性的值；
-   -webkit-overflow-scrolling 属性被设置 "touch" 的元素；
-   backdrop-filter 值不为 “none” 的元素。

但是，除了 `filter` 和 `backdrop-filter` 之外，并非所有能够生成**堆叠上下文或者包含块**的属性，都会导`position: fixed` 失效。

在 CSS 中，目前一共有 7 种方式可以让元素内部的 `position: fixed` 基于该元素定位：

1.  `transform` 属性值不为 none 的元素；
1.  设置了 `transform-style`: preserve-3d 的元素；
1.  `perspective` 值不为 none 的元素；
1.  在 `will-change` 中指定了任意 CSS 属性；
1.  设置了 `contain: paint`；
1.  filter 值不为 `none` 的元素；
1.  backdrop-filter 值不为 `none`的元素。

此外，我们也需要关注其他内核下的表现。

在今天（2023-04-11），我系统性地测试了一下当前比较常用的浏览器内核：

1.  Chrome Version 112+，上述结论会导致 fixed 定位失效；
1.  Firefox 111.0+，上述结论会导致 fixed 定位失效；
1.  Edge 112.0+，**不会存在 fixed 定位失效的问题**；
1.  Safari 15.6+，**不会存在 fixed 定位失效的问题**。

看，Safari、Edge 的表现还有点不一样，稍微有点特殊，并没有发生类似的情况。

所以，当遇到 `position: fixed` 定位基准元素改变的时候，需要具体问题具体分析，多尝试一下，根据需要兼容适配的浏览器做出调整，不能一概而论。



## 总结

本文作为滤镜的开篇，首先，我们需要知道，在 CSS 中，滤镜的使用方式主要会分为 3 种：

1.  通过 CSS 的 filter 属性，使用滤镜；
1.  通过 CSS 的 backdrop-filter 属性，使用滤镜；
1.  通过 CSS filter 属性中的 `url()` 值，引入由 SVG 实现的特殊滤镜效果。

其次，我们对比看了下 filter 与 backdrop-filter 的异同之处。

最后，我们介绍了 2 个 filter 与 backdrop-filter 都会导致的问题：

1.  作用了 filter 和 backdrop-filter 的元素会导致 3D 效果失效；
1.  作用了 filter 和 backdrop-filter 的元素会使内部的 fixed 定位失效。

知道这两个现象很重要，了解它们背后的原理更有意义。CSS 中还会有非常多类似的“怪异”表现、兼容性问题。这需要我们更多的沉淀，遇到问题的时候主动记录，才能在编程过程中少踩坑。

从下一章开始，我们将回归滤镜本身，回归技巧本身，通过滤镜打开 CSS 中的各种奇思妙想！

好的，本章节到此结束，大伙还有什么疑问，可以在评论区一起讨论。
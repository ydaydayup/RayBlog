好，结束了滤镜的章节，我们开启新的篇章，也就是 -- **混合模式**。

在 CSS 中，有两个与混合模式相关的属性：

1.  `mix-blend-mode`
1.  `background-blend-mode`

而 mix 和 blend 的中文翻译都是混合的意思，通常而言，这两个元素都是**混合模式**的意思 **，只是** `background-blend-mode` 是背景混合模式。

混合模式用于创建两个或多个元素之间互相混合的效果。可以将混合模式应用于元素、背景图片和边框等任何元素。

通过设置不同的混合模式，我们可以创造出各种各样的视觉效果，如图像变暗、颜色加深、图像叠加等。CSS混合模式不仅能够增强页面的视觉效果，而且还能优化用户体验。

## `mix-blend-mode` 与 `background-blend-mode` 语法介绍

通常而言，使用 CSS 混合模式需要有两个元素，一个作为“混合源”（mixing source），一个作为“混合模式”（mixing mode）。这两个元素会按照指定的模式进行混合，生成新的元素。

当然，我们只需要对其中一个元素从语法层面设定混合模式即可。

`mix-blend-mode` 与 `background-blend-mode` 支持的混合模式是一模一样的，我们以 `mix-blend-mode` 为例子，看看可取的值有哪些：

```CSS
{
  mix-blend-mode: normal;         // 正常
  mix-blend-mode: multiply;       // 正片叠底
  mix-blend-mode: screen;         // 滤色
  mix-blend-mode: overlay;        // 叠加
  mix-blend-mode: darken;         // 变暗
  mix-blend-mode: lighten;        // 变亮
  mix-blend-mode: color-dodge;    // 颜色减淡
  mix-blend-mode: color-burn;     // 颜色加深
  mix-blend-mode: hard-light;     // 强光
  mix-blend-mode: soft-light;     // 柔光
  mix-blend-mode: difference;     // 差值
  mix-blend-mode: exclusion;      // 排除
  mix-blend-mode: hue;            // 色相
  mix-blend-mode: saturation;     // 饱和度
  mix-blend-mode: color;          // 颜色
  mix-blend-mode: luminosity;     // 亮度
  
  mix-blend-mode: initial;
  mix-blend-mode: inherit;
  mix-blend-mode: unset;
}
```

除了 `initial` 默认值、`inherit` 继承和 `unset` 还原这 3 个，混合模式属性一共提供了 16 个不同的具体取值，每个取值代表一种特定的混合效果。

对于那些并不经常与混合模式打交道的人来说，或许需要花费一些功夫才能够记住这么多效果。幸运的是，已经有前人对这些效果进行了总结：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/efed91f64a9a4a6aaf421fc3187d48e2~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 图片来源：[Photoshop中高级进阶系列之一——图层混合模式原理](http://www.zcool.com.cn/article/ZMzcyNzY=.html)：

当然，上图中罗列的是 Photoshop 中的各种混合模式，其数量会比 CSS 中的多出几个。但是整体而言，两者的分都是通用的，并且 CSS 中的混合模式效果也是与 Photoshop 中的一致的。

在这里，同样提供一个 DEMO，供大家快速初步理解混合模式 - [CodePen Demo - Mix-blend-mode DEMO](https://codepen.io/Chokcoco/pen/XWxpYZK)

默认的混合模式为 `mix-blend-mode: normal`，也就是没有作用任何混合模式。效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a09000681a2f44409b34c57601034c1f~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

也可以选择切换不同的混合模式：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89a01fa57fb340fba529d2a81eb2b538~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

通过观察几个圆形的叠加部分的颜色状态，快速感受不同混合模式的作用：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d1554995fad24c6693fd0ea28f019764~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

## `mix-blend-mode` 与 `background-blend-mode` 差异点

很多初接触混合模式的同学，都会有这么个困惑，为什么会有两种混合模式？`mix-blend-mode` 与 `background-blend-mode` 差异点到底在哪？

1.  `mix-blend-mode` 控制元素内部内容和父元素以及背景混合的方式，即在元素的当前前景色与其父元素或背景颜色产生的效果如何叠加。我们可以通过设置混合模式来控制这种混合效果，如让两个颜色相乘、相加、筛选等操作。它主要应用于单个元素的内容上。
1.  而 `background-blend-mode` 控制元素背景图片之间的混合方式，即让多张背景图片按照指定的混合方式进行混合。我们可以将多张背景图像设置为元素的背景，然后通过设置混合模式对其进行混合。它主要应用于元素背景图片上。

两者的作用虽然相似，但应用场景不同。我们通过一些例子，来一探究竟。

首先，我们实现这样一个布局，三个带透明度的圆，叠在加一起，注意，**这里 3 个圆是由 3 个 div 实现的：**

```HTML
<div class="container">
    <div class="red"></div>
    <div class="green"></div>
    <div class="blue"></div>
</div>
```

```CSS
.container {
    position: relative;
}
.container > div{
    position: absolute;
    top: 0;
    left: 0;
    width: 150px;
    height: 150px;
    border-radius: 50%;
}
.red {
    background-color: rgba(255, 0, 0, .8);
    transform: translateX(25%);
}
.green {
    background-color: rgba(0, 255, 0, .8);
    transform: translateX(-25%);
}
.blue {
    background-color: rgba(0, 0, 255, .8);
    transform: translateY(-25%);
}
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84245234b9954f73803f1bbc29884198~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

我们可以通过给最上层的元素添加 `mix-blend-mode`，快速尝试不同混合模式的作用，譬如

```
.blue {
    mix-blend-mode: color;
}
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/757ceed8e5c04376a37c13813f480d36~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

我们暂且不深入，为什么添加上 `mix-blend-mode: color` 后，效果变成了这样。仅仅在这里先了解如何将混合模式使用起来。

可以快速修改不同的混合模式，查看不一样的效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d1deeb3f11d4f5bad105432de4ec8bc~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

那么，`background-blend-mode` 是怎么使用的呢？如果我们把上述的 `mix-blend-mode` 替换成 `background-blend-mode`，将不会有任何效果。

原因在于，`background-blend-mode` 的作用生效是在单个元素的不同背景之间的！而上面是 3 个 div 元素。

我们需要改造一下代码，使用一个 div 实现 2 块背景：

```HTML
<div class="bgblend"></div>
```

```CSS
.bgblend {
    width: 225px;
    height: 75px;
    border: 2px dashed #999;
    background:
        linear-gradient(rgba(128, 64, 191, 1), rgba(128, 64, 191, 1)),
        linear-gradient(rgba(255, 204, 0, 1), rgba(255, 204, 0, 1));
    background-size: 150px 100%;
    background-repeat: no-repeat;
    background-position: 75px 0, 0 0;
}
```

得到这么一个图形：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f20282dfeb544ea1ae087c830bbdec3d~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

当然，这里是利用渐变，在 background 中，实现了两块背景区域，再明确一下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8739f65b546b4247bacc2cbc4548f6fb~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

此时，在一个元素的多个 background 下，想利用混合模式实现一些效果，就需要使用 `background-blend-mode`。这就是与 `mix-blend-mode` 的不一致之处。

我们试一下：

```CSS
div {
    background:
        linear-gradient(rgba(128, 64, 191, 1), rgba(128, 64, 191, 1)),
        linear-gradient(rgba(255, 204, 0, 1), rgba(255, 204, 0, 1));
    background-size: 150px 100%;
    background-repeat: no-repeat;
    background-position: 75px 0, 0 0;
    background-blend-mode: overlay;
}
```

使用了 `background-blend-mode: overlay` 后，效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3dd503b8fe6647648c1b0d53e3b01c04~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

能够清楚的看到，两个背景的重叠部分的颜色，发生了变化。当然，不同的 `background-blend-mode` 混合模式，效果也是不一样的。

可以快速修改不同的混合模式，查看不一样的效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/536dcc47cc2f414fa633ac06df3041a7~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

这一小模块的核心点就在于，实际使用混合模式的时候，一定要知道，`background-blend-mode` 和 `mix-blend-mode` 的应用场景。

## 什么时候使用混合模式？

很多同学在学习混合模式的过程中，遇到的最大的一个问题就是：在什么时候，我们应该使用混合模式？

这是一个非常有意思的点。首先，能够做到灵活使用混合模式，是需要一定训练的。**当然，有一个小技巧，当我们的元素/图片，在色彩方面遇到了一些问题（与色彩打交道），譬如透明遮罩、颜色翻转、反相、变暗、重叠展示等场景，就应该想到，可能可以利用混合模式来解决问题！**

譬如说：

1.  我有一个 A 颜色的 ICON 图片，能不能将这个图片的颜色置换为 B？
1.  甚至乎，我的图片里有两个颜色 A 和 B，我想改变其中 A 颜色，但是不改变 B 颜色。
1.  我有两张图片，我想将它们完全重叠在一起，通过某种特殊的规则，让两张图片都能被看到。

上面提到的场景，就是接下来两章会具体深入探讨的问题。

当然，除此之外，混合模式也经常用于艺术效果的创作。

我们使用 `repeating-linear-gradient` 重复线性渐变，制作两个角度相反的背景条纹图：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32a8ef3a623f48c5a8f7096d7c45f217~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

正常而言，不使用混合模式，将两个图案叠加在一起，看看会发生什么：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c85711f939241f2832d11c29b80d8ef~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

显而易见，由于图案不是透明的，叠加在一起之后，由于层叠的关系，只能看到其中一张图。

好，在这个基础上，我们给**最上层**的图案，添加 `mix-blend-mode: multiply`，再来一次，看看这次会发生什么：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95b4ef79e58343e5a2b3e639ee3dedd2~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

可以看到，添加了混合模式之后，两张背景图通过某种算法叠加在了一起，展现出了非常漂亮的图案效果，也正是我们想要的效果。

那为什么上面使用的是 `mix-blend-mode: multiply` 呢？用其他混合模式可不可以？

当然可以。这里仅仅只是一个示例，`mix-blend-mode: multiply` 在 PS 中意为**正片叠底**，属于图层混合模式的变暗模式组之一。

我们使用上面的 Demo，尝试其他的混合模式，可以得到不同的效果，如下所示：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a6998f87d4ee4ab886167d82cef6157d~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

可以看到，不同混合模式的叠加，效果相差非常之大。当然，运用不同的混合模式，我们也就可以创造出效果各异的图案。

> 完整的代码，你可以戳这里：[CodePen Demo - Repeating-linear-gradient background & mix-blend-mode](https://codepen.io/Chokcoco/pen/QWKwKbq)

现在你能够初步感受到混合模式的有意思之处吗？

混合模式的特点就在于，结合多种颜色，在不设置透明度的情况，通过不同的算法，展示成新的颜色值。

## 混合模式也会导致 3D 效果失效

在深入到混合模式的学习之前，还有一点需要再提及一次 -- **混合模式也会导致 3D 效果失效**。

在滤镜章节中，我们有提到过这个特性。考虑到部分同学会跳着章节来看，可快速回顾一下。

首先，我们可以使用 CSS，简单实现一个 3D 球的旋转动画，大概是这样：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/382a0339ad0e437b82ae4b3bf13c473a~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 这个 Demo 你可以戳这里：[CodePen Demo - 3D ball](https://codepen.io/Chokcoco/pen/JwdvmJ)

然而，如果我们给上述动画的容器，添加一个 `background-blend-mode` 和 `mix-blend-mode`：

```CSS
.container {
    transform-style: preserve-3d;
    mix-blend-mode: color;
    // 或者
    background-blend-mode: color;
}
```

这里，设置了 `transform-style: preserve-3d` 的元素，如果再添加上一个 `mix-blend-mode`，整个 3D 动画就会坍缩为 2D 动画：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a91477626fca47039ad2dde1d5a52be9~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

这就很蹊跷了，预想中的给 3D 效果添加上滤镜的情形并没有发生，取而代之的是 3D 的失效。

到目前为止，下述几个属性，都会导致 CSS 3D 失效：

-   `mix-blend-mode`
-   `background-blend-mode`
-   `filter`
-   `backdrop-filter`

这个隐藏的 Bug 是我们在使用混合模式需要注意的一个特殊点。

关于这个知识点更具体的讲解，同学们可以翻看滤镜的第一章节。

## 总结一下

本章比较简单，没有一些烧脑的实战环节，重点内容是：

1.  初步介绍了混合模式的基本语法，快速了解混合模式的简单用法；
1.  明确`mix-blend-mode` 与 `background-blend-mode` 差异点；
1.  明确混合模式也会导致 3D 效果失效。

从下一章开始，将会进入实战技巧环节，真正开始领略混合模式的神奇。

好的，本章节到此结束，大伙还有什么疑问，可以在评论区一起讨论。
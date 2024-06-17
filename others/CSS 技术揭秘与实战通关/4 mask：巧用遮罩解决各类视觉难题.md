本章节，我们将在上两章描述 background 的基础上，进入到 mask 遮罩属性的学习中。

顾名思义，**mask 译为遮罩**。在 CSS 中，mask 属性允许使用者通过遮罩或者裁切特定区域的图片的方式来隐藏一个元素的部分或者全部可见区域。

需要注意：学好 mask 的前提是对 background 掌握得足够好，这是因为，mask 的语法基本上与 background 一致。

## 初识 mask？

来看一个最简单的例子，mask 可以接受一个与 background 语法一样的参数，**也就是渐变**。

最简单语法如下：

```CSS
{
    /* 使用渐变来做遮罩 */
    mask: linear-gradient(#000, transparent)                     
}
```

可以看到，这里 `mask: linear-gradient(#000, transparent)` 中的 `linear-gradient(#000, transparent)` 分明就是一个渐变写法。

那么，mask 该具体怎么使用呢？

首先，我们实现一个简单的背景图：

```CSS
{
    background: url(image.png);
}
```

得到这样一张图：

<p align="center"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/411fcbe8d8d947ecaffc18937c69c649~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p>

再加上我们提及的 mask 代码，非常的简单：

```CSS
{
    background: url(image.png);
    mask: linear-gradient(90deg, transparent, #000);
}
```

`mask: linear-gradient(90deg, transparent, #000)` 实现了一个从黑色到透明渐变色的 mask 遮罩。当图片应用了 mask 之后，就会变成这样：

<p align="center"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c23991e6ab84f999fc0a805750342fd~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p>

> 完整的代码，你可戳这里：[CodePen Demo -- 使用 MASK 的基本使用](https://codepen.io/Chokcoco/pen/YzwZbLQ)

通过这个 Demo，可以了解到 mask 最基本用法，**mask 允许使用者通过遮罩或者裁切特定区域的图片的方式来隐藏一个元素的部分或者全部可见区域**。

而其中一种最常见的用法，就是使用上述所说的 background 的语法来实现一个 mask 遮罩效果，示意图如下：

<p align="center"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b36474bb42c84d0dae18f71bb50df22e~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p>

这里得到了使用 mask 最重要结论：元素的内容**与 mask 生成的渐变的透明重叠部分，将会变得透明**。

值得注意的是，上面的渐变使用的是 `linear-gradient(90deg, transparent, #000)`，这里的 `#000`纯色部分其实换成任意颜色都可以，不影响效果。

**理解了 mask 的这一点，很多需要裁剪的场景，就手到擒来了**。接下来，我们会直接进入实战环节，通过实战，不断加深对 mask 的理解。

## 技巧一：使用 mask 进行内容裁切

利用上述简单的技巧，我们可以使用 mask 实现简单的图片裁剪。

### 使用 mask 实现图片切角效果

在 background 章节，我们有介绍，使用线性渐变的技巧，可以实现如下一个简单的切角图形：

```CSS
.notching{
    width: 200px;
    height: 120px;
    background:linear-gradient(135deg, transparent 15px, deeppink 0)
    top left,linear-gradient(-135deg, transparent 15px, deeppink 0)
    top right,linear-gradient(-45deg, transparent 15px, deeppink 0)
    bottom right,linear-gradient(45deg, transparent 15px, deeppink 0)
    bottom left;
    background-size: 50% 50%;
    background-repeat: no-repeat;
}
```

像是这样：

<p align="center"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8914fac57986414ea98ca602fa77d01b~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p>

我们将上述渐变运用到 mask 之上，而 background 替换成一张图片，就可以得到运用了切角效果的图片：

```CSS
{
    background: url(image.png);
    mask:linear-gradient(135deg, transparent 15px, #fff 0)
        top left,linear-gradient(-135deg, transparent 15px, #fff 0)
        top right,linear-gradient(-45deg, transparent 15px, #fff 0)
        bottom right,linear-gradient(45deg, transparent 15px, #fff 0)
        bottom left;
    mask-size: 50% 50%;
    mask-repeat: no-repeat;
}
```

得到的效果如下：

<p align="center"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/becd211e52d14b209f2241846eeb6c1e~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p>

> 完整的代码，你可戳这里：[CodePen Demo -- 使用 MASK 实现图片切角遮罩](https://codepen.io/Chokcoco/pen/eYJgOxB)


### 同理，使用 mask 实现内切圆角图形

同理，按照上述的思想，我们可以快速实现这样一个内切圆角的按钮造型效果。

首先，我们可以使用渐变，得到这样一个图形：

```CSS
.mask-inset-circle {
    background: radial-gradient(
            circle at 100% 100%,
            transparent 0,
            transparent 12px,
            #2179f5 13px
        ),
        radial-gradient(
            circle at 0 0,
            transparent 0,
            transparent 12px,
            #2179f5 13px
        ),
        radial-gradient(
            circle at 100% 0,
            transparent 0,
            transparent 12px,
            #2179f5 13px
        ),
        radial-gradient(
            circle at 0 100%,
            transparent 0,
            transparent 12px,
            #2179f5 13px
        );
    background-repeat: no-repeat;
    background-position: right bottom, left top, right top, left bottom;
    background-size: 50% 50%;
}
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5e62b6e7bc54f089fb17e53e6ab2683~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

这个造型的按钮会有什么问题吗？这样看上去好像挺好的。但是，如果要求按钮的背景颜色不是纯色，而是一个渐变色，那么上述使用渐变的方案是基本无法完成的！

但是，如果使用 mask 遮罩的思想，这个问题迎刃而解，简单改造下代码，我们将上述的 background 代码作为 mask 的代码，而 background 直接写成我们需要的渐变颜色：

```HTML
<div class="mask-inset-circle">inset-circle</div>
```

```CSS
.mask-inset-circle {
    background: linear-gradient(45deg, #2179f5, #e91e63);
    mask: radial-gradient(
            circle at 100% 100%,
            transparent 0,
            transparent 12px,#2179f5 13px
        ),radial-gradient(
            circle at 0 0,
            transparent 0,
            transparent 12px,#2179f5 13px
        ),radial-gradient(
            circle at 100% 0,
            transparent 0,
            transparent 12px,#2179f5 13px
        ),radial-gradient(
            circle at 0 100%,
            transparent 0,
            transparent 12px,#2179f5 13px
        );
    mask-repeat: no-repeat;
    mask-position: right bottom, left top, right top, left bottom;
    mask-size: 70% 70%;
}
```

效果如下，我们就得到了这样一个图形：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d8f6c42afb8a4e729578ca627d30f1fa~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

通过这个例子，相信大家对 mask 的理解会更进一步！我们再把它的原理绘制一次：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc712a21ae824a1291b9852ec5ac4085~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>




## 技巧二：巧用 mask 实现渐变消失布局

接下来，我们来看一些实际业务场景。

譬如，我们希望实现这样一种布局效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d95248cf80f4e0eb3721e173b63a6ab~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

当看到这种内容渐变消失的场景，最先想到的就应该是使用 mask 遮罩进行实现。

而且我们一定要记住，mask 不仅仅是作用于颜色背景，它是可以将整个元素的内容都进行遮罩控制。

简单模拟一下场景，假设我们有如下一个 `ul` 列表，超出可以滚动：

```HTML
<div class="g-container">
    <ul>
        <li>Button</li>
        <li>Button</li>
        <li>Button</li>
        <li>Button</li>
        <li>Button</li>
        <li>Button</li>
    </ul>
</div>
```

```CSS
ul {
    width: 300px;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
}
```

像是这样：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/740390c9ee714a01a7e54a3d0d0f3c6e~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

利用 mask，只需要一行代码即可解决上述布局问题：

```CSS
ul {
    width: 300px;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    mask: linear-gradient(90deg, #000 70%, transparent);
}
```

`mask: linear-gradient(90deg, #000 70%, transparent)`的意思是从左到右实现一个从实色到透明的遮罩效果，这样我们就得到了这样的效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4fd5f0bd2fec4857a1712e83572c3326~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整的代码，你可以戳这里：[CodePen Demo -- Linear Gradient Mask](https://codepen.io/Chokcoco/pen/GROyjRO)



## 技巧三：巧用 mask 实现融合效果

还有一种非常常见的效果，就是两张图片的融合效果。

假设我们有两张图片，使用 mask，可以很好将它们叠加在一起进行展示。最常见的一个用法：

```CSS
div {
    position: relative;
    background: url(image1.jpg);

    &::before {
        position: absolute;
        content: "";
        top: 0;left: 0; right: 0;bottom: 0;
        background: url(image2.jpg);
        mask: linear-gradient(45deg, #000 50%, transparent 50%);
    }
}
```

两张图片，一张完全重叠在另外一张之上，然后使用 `mask: linear-gradient(45deg, #000 50%, transparent 50%)` 分割两张图片：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/efe06f501ba04dde962962a46ca337c6~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整的代码，你可戳这里：[CodePen Demo -- MASK 的基本使用，多张图片下的基本用法](https://codepen.io/Chokcoco/pen/ZEQeNad)

当然，注意上面我们使用的 mask 的渐变，是完全的实色变化，没有过渡效果。

我们稍微修改一下 mask 内的渐变：

```CSS
{
    - mask: linear-gradient(45deg, #000 50%, transparent 50%)
    + mask: linear-gradient(45deg, #000 40%, transparent 60%)
}
```

我们预留了从 `40%` 到 `60%`的从不透明到透明的过渡，即可得到图片 1 向图片 2 过渡切换的效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2af520984b6c49099ed4279fcf1bb27e~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整的代码，你可戳这里：[CodePen Demo -- MASK 的基本使用，多张图片下的基本用法2](https://codepen.io/Chokcoco/pen/RwrQwXG)

理解了这个用法后，我们看一个实际的例子，譬如在国庆的时候经常能看到的头像效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d8a94266bc7147898802fabba37eeb54~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

我们仅仅需要将两张图片叠加在一起，对上层的图片使用 mask 属性，一行代码即可实现该效果。

```HTML
<div></div>
```

```CSS
div {
    position: relative;
    margin: auto;
    width: 200px;
    height: 200px;
    // 正常头像
    background: url(image1) no-repeat;
    background-size: cover;
}
.div::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    // 国旗图片
    background: url(image2) no-repeat;
    background-size: cover;
    mask: linear-gradient(110deg, #000 10%, transparent 70%, transparent);
}
```

在上面的代码中，我们利用了 `div` 和它的一个伪元素 `div::after`，实现了将头像和国旗叠加在一起。

只需要在 `div::after` 中，设置一层 mask 遮罩 `mask: linear-gradient(110deg, #000 10%, transparent 70%, transparent)`，我们就可以实现头像与国旗的巧妙叠加：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bef7d341a11f49f29f98a4a11512c7fc~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整的代码，你可戳这里：[CodePen Demo -- Mix of avatar and national flag](https://codepen.io/Chokcoco/pen/gOREMBp)




## 技巧四：使用 mask 实现内容切换效果

通过上面的例子，相信大家已经能够比较好的开始理解 mask 属性。

我们一定不能死记硬背，切记：**尝试去理解这个属性被设计出来的目的，以及想要解决的问题**。

Mask 的核心就是遮罩，遮挡住元素的内容（可以是部分挡住，可以是逐渐消失，甚至是可以分块挡住），显示出其元素背后的内容。

理解了核心之后，我们再尝试利用它，实现一个简单的图片切换展示的效果。像是这样：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3cdcccd023f4ad2b29eea1e6083ed48~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

实现这个切换效果的方式有很多，最容易想到的可能是动态改变上层图片的宽度，或者动态移走上层元素的图片。这都是可行的。

那如果我们使用 mask 呢？也非常的简单，假设我们的结构如下，分别使用 `background` 展示两张图片：

```HTML
<div class="g-outer">
    <div class="g-inner"></div>
</div>
```

核心的 CSS 代码非常的少：

```CSS
.g-outer {
    background-image: url(https://images.cnblogs.com/cnblogs_com/coco1s/881614/o_21081614180122.png);
}
.g-inner {
    background: url(https://images.cnblogs.com/cnblogs_com/coco1s/881614/o_21081614175811.png);
    mask: linear-gradient(90deg, #fff 0%, #fff 50%, transparent 50%, transparent 100%);
    mask-size: 200% 100%;
    animation: maskChange 2s infinite alternate linear;
}
@keyframes maskChange {
    0% {
        mask-position: -100% 0;
    }
    100% {
        mask-position: 0 0;
    }
}
```

通过这个案例，想引出的一个观点是：在 CSS 中，有非常多酷炫/实用的动画，我们都可以借助 mask 实现，并且 mask 本身也能用于实现一些非常特殊的交互效果。

> 上述的图片切换效果只是一个引子，我们将在下一章节，去讲述更多通过 mask 实现的**动画效果**。




## 技巧五：`mask-composite` 组合遮罩大法，让切图更轻松

mask 家族中还有一个非常有用属性，名为 `mask-composite`。

`mask-composite`可以进一步强化 mask 的能力。它指定了将应用于同一元素的多个蒙版图像相互合成的方式。

通俗点来说，它的作用就是，当一个元素存在多重 mask 时，我们就可以运用 `mask-composite` 进行效果叠加。

举个例子：

```HTML
<div class="original"></div>
```

```CSS
.original {
    background: #000;
    mask: radial-gradient(circle at 0 0, #000, #000 200px, transparent 200px);
}
```

我们用一个 `radial-gradient` 作为 mask，切割原本的矩形，得到一个新的图形。

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9b370bcdf314073815adf832573b481~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

如果再换一个方向：

```HTML
<div class="original"></div>
```

```CSS
.original {
    background: #000;
    mask: radial-gradient(circle at 100% 0, #000, #000 200px, transparent 200px);
}
```

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db6634c38dbb4768b136245874bcc5f1~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

而如果我想得到这样一个效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/94f8d527b5b647229e0d0301ebb2ef90~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

该怎么做呢？我们尝试合并上述两个 mask 的效果：

```CSS
.mask {
    background: #000;
    mask: 
        radial-gradient(circle at 100% 0, #000, #000 200px, transparent 200px),
        radial-gradient(circle at 0 0, #000, #000 200px, transparent 200px);
}
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8edec8954a97469bb717ede13b038b7f~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

与我们想象的不太一样，这是因为，两个 mask 的图形叠加，就是上述图形的效果，所以上述效果是没有问题的。

只是，我们想得到的是两个 mask 图形的重叠部分。

这时，我们就可以使用 `mask-composite`：

```CSS
.mask {
    background: #000;
    mask: radial-gradient(circle at 100% 0, #000, #000 200px, transparent 200px),radial-gradient(circle at 0 0, #000, #000 200px, transparent 200px);
    -webkit-mask-composite: source-in;
}
```

添加了 `-webkit-mask-composite: source-in` 后，我们就可以得到两个 mask 图形的重叠部分，再基于这个重叠部分作用到整个 mask 遮罩：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e29c94b4ac5a4458acb644ea5a49969a~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整的代码，你可以看这里：[CodePen Demo -- mask-composite Demo](https://codepen.io/Chokcoco/pen/KKQjxMP)

`-webkit-mask-composite` 还可以实现非常多不同的功能，包括但不限于：

```CSS
{
    -webkit-mask-composite: clear; /*清除，不显示任何遮罩*/
    -webkit-mask-composite: copy; /*只显示上方遮罩，不显示下方遮罩*/
    -webkit-mask-composite: source-over; 
    -webkit-mask-composite: source-in; /*只显示重合的地方*/
    -webkit-mask-composite: source-out; /*只显示上方遮罩，重合的地方不显示*/
    -webkit-mask-composite: source-atop;
    -webkit-mask-composite: destination-over;
    -webkit-mask-composite: destination-in; /*只显示重合的地方*/
    -webkit-mask-composite: destination-out;/*只显示下方遮罩，重合的地方不显示*/
    -webkit-mask-composite: destination-atop;
    -webkit-mask-composite: xor; /*只显示不重合的地方*/
}
```

当然，有个问题，标准的规范其实只支持如下 4 种模式：

```CSS
{
    /* Keyword values */
    mask-composite: add;
    mask-composite: subtract;
    mask-composite: intersect;
    mask-composite: exclude;
}
```

只是目前，我们使用 `mask-composite` 需要借助 `-webkit-mask-composite`，它们核心支持的能力都是一样的，只是如上所示 `mask-composite` 和 `-webkit-mask-composite`的语法有点不一致。

看看这张图，就是所谓的组合遮罩裁剪大法：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e93751633b374bbfb8e2f019ba3f9787~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 你也可以在规范中看到这部分的内容介绍：[CSS Masking Module Level 1](https://drafts.fxtf.org/css-masking/#the-mask-composite)

很多时候，当我们单个的 mask 图形很难满足需求，就可以考虑通过 `mask-composite`进行组合遮罩！




## 兼容性

OK，面对这种稍微新一点的属性，很多同学其实最担心的还是兼容性问题。

到目前为止（2023-04-02），虽然在 Chrome 内核浏览器下，我们使用 mask 属性的时候，仍然要加上 `-webkit`前缀，但是，mask 的兼容性其实已经非常的好了。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eeec8dd860ce4815bdbc8ff3d714a475~tplv-k3u1fbpfcp-zoom-1.image)

如果无需兼容 IE 系列，其实可以放心使用！并且，前缀的事情，通常我们都会交由预处理器或者类似于 `autoprefixer` 这类工程化工具帮助完成。



## 本章小结

在本章，我们由浅慢慢及深地介绍了 mask 的基础用法及其的一些在业务场景中使用技巧，它们分别是：

1.  **技巧一：使用 mask 进行内容裁切**；
2.  **技巧二：巧用 mask 实现渐变消失布局**；
3.  **技巧三：巧用 mask 实现融合效果**；
4.  **技巧四：使用 mask 实现内容切换效果**；
5.  **技巧五：** **`mask-composite`** **组合遮罩大法，让切图更轻松**。
> 需要注意 mask 在今天的兼容性，除去 IE 系列，mask 可以在业务中放心使用！

mask 是现代 CSS 家族中，非常重要的一个属性，掌握它并且灵活运用它能够帮助我们解决非常多问题。下一章，我们会`由静转动`，看看利用 mask 能够创造出什么不一样的交互/动画效果！

好的，本章节到此结束，大伙还有什么疑问，可以在评论区一起讨论。

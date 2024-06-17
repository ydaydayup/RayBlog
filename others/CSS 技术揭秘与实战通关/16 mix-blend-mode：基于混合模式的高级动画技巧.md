在本章，我们继续混合模式的探索。我们将围绕基于混合模式构建的各种动画效果进行展开，继续去加深对混合模式的理解。

与上一章一样，首先，在学习混合模式的过程中，我们需要逐渐建立起来的一个**意识**是，我们在`什么场景`下，发现这是能够利用混合模式解决的场景，或者是能够利用混合模式解决的问题。

混合模式的核心就是：**描述当元素重叠时，颜色应当如何呈现**。

因此，这些场景包括但不限于：

1.  两个图层或者元素之间希望产生交互作用，形成一些特殊效果；
1.  两个图层或者元素重叠后，想改变 / 隐藏元素中特定部分的颜色，譬如基于一张图片 / ICON，得到不同颜色的其他颜色的效果；
1.  文本与背景非常规展示，譬如创建独特的文本效果，又或者是譬如让文字在不同背景下都能产生强烈的反差效果。

好，下面进入具体动画的案例讲解。



## 基于混合模式叠加不同的渐变图案实现高级背景效果

首先，我们来看下面这么个背景动画效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/99938395ca2e41a6a1eda734ad2866ee~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

如果让我们使用 CSS 来实现它们，有思路么？

是的，混合模式非常适合用来实现一些非常具有高级感的背景效果。像是下面这些：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/14ca8460a8904d48902d69ca6a09f3d2~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

怎么做的呢？非常好理解，**多重背景叠加再配合不同的背景混合模式**！代码如下：

```HTML
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
```

```CSS
div {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    animation: move 60s infinite linear;
}

div:nth-child(1) {
    background: linear-gradient(
        238deg,
        rgb(130, 255, 0) 0%,
        rgb(0, 84, 166) 100%
    );
}

div:nth-child(2) {
    background: linear-gradient(
        238deg,
        rgb(33, 200, 69) 0%,
        rgb(0, 0, 100) 100%
    );
    mix-blend-mode: overlay;
}

div:nth-child(3) {
    background: linear-gradient(
        238deg,
        rgb(200, 255, 255) 48%,
        rgb(3, 0, 151) 100%
    );
    mix-blend-mode: multiply;
}

div:nth-child(4) {
    background: radial-gradient(
        100% 85% at 0% 100%,
        rgb(0, 0, 0) 0%,
        rgb(0, 131, 255) 50%,
        rgb(255, 0, 0) 100%
    );
    mix-blend-mode: difference;
}

div:nth-child(5) {
    background: radial-gradient(
        100% 225% at 0% 100%,
        rgb(255, 0, 0) 0%,
        rgb(66, 255, 0) 100%
    );
    mix-blend-mode: difference;
}

div:nth-child(6) {
    background: radial-gradient(
        100% 140% at 100% 0%,
        rgb(0, 134, 62) 0%,
        rgb(0, 239, 255) 50%,
        rgb(0, 113, 186) 100%
    );
    mix-blend-mode: overlay;
}

@keyframes move {
    0% {
        filter: unset;
    }
    
    100% {
        filter: hue-rotate(360deg);
    }
}
```

首先，我们使用线性渐变或者径向渐变，随意创建几个渐变图案，如下所示：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/efd1ada97b7e49f4a98b84168e31fa27~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

紧接着，两两背景之间，从第二层开始，使用一个背景混合模式进行效果混合，因此这里一共需要设定 5 个混合模式。在这里，我使用了 `overlay`、`multiply`、`difference`、`difference`、`overlay` 5 个不同的混合模式（当然，这里可以随意通过调试获取效果更好的混合模式）。

看看叠加之后的效果，非常的 Nice：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87efe730201149c9b5cd463bc40363c5~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整代码，戳这里：[CodePen Demo -- Graideint background mix](https://codepen.io/Chokcoco/pen/GRjgQMd)

由于上面动图 Gif 的压缩率非常高，所以看上去锯齿很明显、图像很模糊，你可以点进上面的链接看看。

最后，我们给叠加后的图像再加上一个 `filter: hue-rotate(360deg)`，让整个背景动起来，就可以得到上述绚丽夺目的光影背景效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b368e612687341d3949d07e026549083~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>




## 基于混合模式的文字镂空动画

混合模式的核心，就是对于图层重叠后，重叠部分颜色的控制。我们再来看这么一个文字波浪动画效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f54443c161e04dc89798b5bbf6887eea~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

正常而言，首先，我们需要得到一个波浪动画。由于本章的核心是混合模式，因此对于这个波浪动画的推导实现我们就加速一下，这是一个可以利用 CSS 快速实现的动画效果，其原理我们快速过一下。

使用 CSS 实现的波浪效果，如果不是在镂空的文字内，而是在一个 `div` 容器内，一种常见的技巧是使用滚动大圆的方式，效果图类似于这样：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79912708b1a446cc82ec2a467aebb451~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

假设虚线部分代表容器，给容器 div 应用 `overflow: hidden`，就能得到这样的效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8e21860efb384230beebdff3f1e77c62~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 对这个技巧还不理解，可以猛击这篇文章：[纯 CSS 实现波浪效果！](https://github.com/chokcoco/iCSS/issues/22)

那么，如何在文字中应用此效果呢？

首先，我们可以尝试将白底黑字和该波浪效果叠加在一起：

```HTML
<div class="g-container">
    <p>TEXT WAVE</p>
</div>
```

核心的 CSS 伪代码如下：

```CSS
p {
    background: #fff;
    color: #000;
    
    &::before,&::after {
        content: "";
        position: absolute;
        border-radius: 45% 48% 43% 47%;
        background: rgba(3, 169, 244, .85);
        animation: rotate 10s infinite linear;
    }
    
    &::after {
        border-radius: 43% 47% 44% 48%;
        animation: rotate 10s infinite .5s linear;
    }
}

@keyframes rotate {
    0% {
        transform: translate(-50%, -50%) rotate(0);
    }
    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}
```

效果大概是这样：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9de669a6be4948d38ce10e0e4806afa3~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

也可以把它放置到文字层下面，更直观点：

```CSS
p {
    ...
  
    &::before,&::after {
        ...
      + z-index: -1;  
    }
}
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10809a2c28074e759773f90cf3bce5e0~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

可见，两者并不是简单的叠加的关系，仅仅这样是没法实现文字的波浪效果的。

那么这个时候，利用上混合模式，就非常好解决了！我们想要的效果就黑色部分，叠加上波浪的动效，而白色部分不变，这不是我们上一章反复利用混合模式在实现的内容吗？

我们尝试给两个大圆，添加混合模式，在当前的配色下，也就是白底黑字的情况下，滤掉白底下的蓝色。尝试一下：

```CSS
p::before,
p::after {
    // ...
    mix-blend-mode: lighten;
}
```

仅仅是这样，我们就丝滑地让两个图层进行了叠加，实现了文字波浪效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb1b6db36d0c48dab9c4677e2202a9c9~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

Wow，当给两个波浪圆形加上 `mix-blend-mode: lighten` 时，成功地在白底上过滤掉了蓝色，只在黑色字体上能够看到蓝色波浪的效果。

当然，另外一个混合模式 `mix-blend-mode: screen` 也能达到类似的效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/20eb354d4d8a47f2b653887b241a2768~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

至此，通过混合模式，我们巧妙地实现了这样一个文字镂空的波浪效果。**通过混合模式的特性，过滤掉了效果中一些我们不希望看见的颜色，只让正确的颜色在正确的地方出现**。

> 完整的代码你可以猛击：[CodePen Demo -- Pure CSS Text Wave](https://codepen.io/Chokcoco/pen/jOwEqvR)




## 基于混合模式的故障艺术风格动画

还有一类非常有意思的基于混合模式的动画效果：故障艺术效果。

在上一章节，我们介绍了利用混合模式制作的抖音的 LOGO 效果，是一种晕眩感觉的视觉效果。

我们也可以把这种叠加方式，运用在图片之上，假设有这样一张图片：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/350e6e36926a4e1585bba99497831b97~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

利用好元素的两个伪元素，只需要一个标签即可：

```HTML
<div class="mix"></div>
```

我们需要实现的效果步骤如下：

1.  给两张同样的图片，分别叠加上青色`#0ff` 和红色`#f00`，并且错开一定的距离，两张图都要加上 `background-blend-mode: lighten`；
1.  两张运用了背景混合模式的图片，再利用 `mix-blend-mode: darken` 进行一次二次叠加。

```CSS
.mix {
    width: 400px;
    height: 400px;
    background: url($img), #0ff;
    background-blend-mode: lighten;

  &::after {
    content: '';
    position: absolute;
    margin-left: 10px;
    width: 400px;
    height: 400px;
    background: url($img), #f00;
    background-blend-mode: lighten;
    mix-blend-mode: darken;
  }
}
```

得到如下效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/50d3b1d71e9e433e90492632c73aae07~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

简单解释下：

1.  因为图片本身不是红色和青色的，所以需要通过 `background-image` 叠加上这两种颜色，并通过 `background-blend-mode: lighten` 让其表现出来。
1.  为了保持中间叠加部分的原色，需要再叠加一个 `mix-blend-mode: darken` 反向处理一下。（不理解的同学可以打开调试，手动关掉几个混合模式，自己感受感受即可。）

原理图如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0bcf4bd849ce41c2ae80bf6e7d8c87e5~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>


> 完整的 Demo，戳这里：[CodePen Demo - 使用 background-blend-mode | mix-blend-mode 实现类抖音 LOGO 晕眩效果](https://codepen.io/Chokcoco/pen/VVMQgj)

当然，这里使用 Gif 图也是完全可以的，我们替换下我们的 Gif 图，看看会得到什么样的一种效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f02a56af30d546df8c4a6b25f8b3bf05~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 有点意思，完整的代码你可以戳这里：[使用 background-blend-mode | mix-blend-mode 实现类抖音 LOGO 晕眩效果](https://codepen.io/Chokcoco/pen/vYQGOKx)

除了应用在静态与动态图之上，这种方式也适用于文字效果。

有了上面的铺垫，我们接下来可以给文字加上这种效果，其关键点在于：

-   利用 mix-blend-mode: lighten 混合模式实现两段文字结构重叠部分为白色；
-   利用元素位移完成错位移动动画，形成视觉上的冲击效果。

看看效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/720d1ae921b548a5985272466fb911eb~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>


核心代码如下：

```HTML
<div class="text-magic" data-word="CSSTextGlitch"></div>
```

```CSS
.text-magic {
    position: relative;
    font-size: 36px;
}
.text-magic::before {
    content: attr(data-word);
    position: absolute;
    top: 0; left: 0;
    color: red;
    text-shadow: 1px 0 0 red;
    animation: move 0.95s infinite;
}
.text-magic::after {
    content: attr(data-word);
    position: absolute;
    top: 0; left: -1px;
    color: cyan;
    text-shadow: -1px 0 0 cyan;
    mix-blend-mode: lighten;
    animation: shake 1.1s infinite 0.2s;
}
// 抖动动画
@keyframes shake {
    10% {
        top: -0.4px;
        left: -1.1px;
    }
    // ... 抖动动画
    100% {
        left: -1.2px;
    }
}
```

其实原理就是如下两个这样的随机运动字动画，通过混合模式，叠加在一起：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af290a3d632e41789683247a529b0f1f~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整 Demo 在这里：[CodePen Demo -- 类抖音 LOGO 文字故障效果](https://codepen.io/Chokcoco/pen/KKwLaOV)

将文本文字进行替换，再辅以一线线条动画以及再添加上一些滤镜效果，譬如`hue-rotate()`、`blur()`。这样，我们就能实现一些非常酷炫的 404 效果，效果一：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5b43f1d08324dc097a8a64a43533f35~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

效果二：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a13de6c7f1ec4fc5947c7d4060b3422d~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

两个 404 效果的 Demo 如下：

-   [CodePen -- CSS 404 故障效果](https://codepen.io/Chokcoco/pen/OJPexEm)；
-   [CodePen -- 404 故障效果](https://codepen.io/Chokcoco/pen/QWwXqra)。




## 总结一下

怎么样，混合模式是不是非常有意思？

在本章中，我们结合了 CSS 中的动画 Animation，配合混合模式的使用，实现了很多有意思的动画效果：

1.  基于混合模式叠加不同的渐变图案实现高级背景效果；
1.  基于混合模式的文字镂空动画；
1.  基于混合模式的故障艺术风格动画。

介绍这些动画的核心还是希望大家理解混合模式的本质，**描述当元素重叠时，颜色应当如何呈现。只有理解了这一点，才能在适当的时候利用混合模式快速解决问题，同时在适当的时候利用混合模式构建更强大的** **CSS** **动画效果。**

好的，本章节到此结束，大伙还有什么疑问，可以在评论区一起讨论。
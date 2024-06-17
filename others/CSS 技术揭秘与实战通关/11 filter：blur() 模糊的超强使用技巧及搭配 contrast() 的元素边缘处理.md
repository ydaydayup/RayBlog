我们继续滤镜的大模块。CSS 中，存在各种功能各异的滤镜。对于它们最基本的用法，我们不做过多的赘述。

抛开最基本的用法，本小册将从它们的衍生技巧入手，基于频率入手，逐一讲解，递次深入。而本文，我们将主要围绕 `blur()` 和 `contrast()` 滤镜。




## 模糊滤镜 `blur()`

`filter: blur()` 应该属于 CSS 中使用频率最高的滤镜了，`blur()` [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) 方法将[高斯模糊](https://en.wikipedia.org/wiki/Gaussian_blur)应用于元素之上。

它的语法也非常简单：

```HTML
<div><div>
<div class="blur"><div>
```

```CSS
div {
    width: 200px;
    height: 200px;
    background: #000;
}
.blur {
    filter: blur(5px);
}
```

下图左侧是正常图像，右侧就是应用了模糊滤镜后的效果。

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/55c7738cea8f48ea90de99f1bae45a79~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

那么，在 CSS 中，模糊的具体应用场景以及一些高阶技巧有哪些呢？我们一起来看看。


### 利用模糊滤镜实现毛玻璃效果

毛玻璃效果属于模糊滤镜最常见的使用场景。

譬如，我们想实现这么一个模糊毛玻璃效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9d14afdb6854b328df6fb9480a2064f~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

可能有一部分同学会认为是需要使用 `filter: blur()`，这里其实需要用到 `backdrop-filter:blur()`。

在上一篇文章中，我们也提到了，`backdrop-filter` 滤镜可以为元素后方的区域添加如模糊或颜色偏移等滤镜效果。

因为它的**生效范围是元素背后的所有内容，因此，为了能够看到效果，元素或其背景至少要保持部分透明**。

`backdrop-filter` 与 `filter` 非常类似，可以取的值都是一样的，但是一个是作用于整个元素，一个是只作用于元素后面的区域。

我们使用 `backdrop-filter` 滤镜与 `filter` 滤镜分别尝试实现毛玻璃效果作为对比，代码如下：

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

看看效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a49819c811f14022b9b307c8d0d9f20e~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整代码，戳这里：[CodePen Demo -- filter 与 backdrop-filter 对比](https://codepen.io/Chokcoco/pen/WNjebrr)

只有最后一个，才是我们想要的毛玻璃效果。当然，这里必须要再次强调的是，必须使元素或其背景至少部分透明，`backdrop-filter` 才会生效。

上面我们使用了 `background: rgba(255, 255, 255, .7)` 让元素透明，其实我们也可以换成黑色透明 `background: rgba(0, 0, 0, .7)`：

```CSS
div {
    width: 300px;
    height: 200px;
    background: rgba(0, 0, 0, .7);
    backdrop-filter: blur(6px);   
}
```

也是能够得到类似的效果，只是视觉上有所差异：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c09058c709c444ed9f9930e199ec1e8d~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

使用 `backdrop-filter` 实现毛玻璃效果，有几点需要特别注意。

1.  在没有 `backdrop-filter` 属性前，想实现给元素背后特定的区域添加滤镜效果是非常困难的，`backdrop-filter` 正是为了解决这个问题才应运而生的。
1.  在过往很长一段时间，Firefox 都不支持 `backdrop-filter` 滤镜，庆幸的是，在本文写作的今天（2023-04-14），Firefox 已经原生支持了 `backdrop-filter` 滤镜，这是之前制约它大范围使用最为核心的一个因素。

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/049354e4dc734d32a1b32ce48973414d~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>


### 利用模糊实现彩色阴影 / 渐变阴影

在阴影的章节中，我们介绍了使用模糊效果实现的**彩色阴影**与**渐变阴影**。一起快速回顾一下。

有下述这样一张头像图片：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc727f9d08c04e01b7fe5b1dd5063147~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

首先创建一个图形的副本，其次再利用模糊效果，实现一层与原图色彩相仿的**彩色阴影效果**，最终，通过位置偏移到恰当的地方，使得看上去就是一个彩色阴影的效果。

核心 CSS 代码如下：

```CSS
.avator {
    position: relative;
    background: url($img) no-repeat center center;
    background-size: 100% 100%;
    
    &::after {
        content: "";
        position: absolute;
        top: 10%;
        width: 100%;
        height: 100%;
        background: inherit;
        background-size: 100% 100%;
        filter: blur(10px);
        z-index: -1;
    }
}
```

看看效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88fa4f2d006a4d8c91c4ccbd0fe4141f~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>


嗯，最重要的就是这一句 `filter: blur(10px)` ，我们通过一个动画，再理解一下**模糊滤镜**在其中扮演的角色：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce3e11d096a24d269d069b524201c1e5~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 详细完整的代码，你可以戳这里：[CodePen Demo -- Colorful Shadow](https://codepen.io/Chokcoco/pen/eGYYpo)



### 利用模糊滤镜实现层次感 / 3D 效果

模糊还经常被用于实现视差效果。合理使用模糊滤镜，能很好地实现一些视觉上的层次感。

在通常的视觉效果中，距离我们更近的对象往往看起来更清晰，而距离我们较远的对象则相对不太清晰。

因此，我们可以利用这种**清晰与模糊**的差异来创建视差效果。

1.  将**清晰**与**模糊**两种状态运用在文字上。

首先实现一个简单文字的 3D 变换动画，主要是借助 `transform-style: preserve-3d` 和 `perspective`，并且让文字绕 Y 轴进行旋转。

> 对 `transform-style: preserve-3d` 和 `perspective` 还不太了解的，可以先看看小册 3D 部分的基础章节再回过来阅读。

代码如下：

```HTML
<p>CSS3DEFFECT</p>
```

```CSS
body {
    perspective: 160vmin;
}
p {
    font-size: 24vmin;
    transform-style: preserve-3d;
    animation: rotate 10s infinite ease-in-out;
}
@keyframes rotate {
    0% {
        transform: rotateY(-45deg);
    }
    50% {
        transform: rotateY(45deg);
    }
    100% {
        transform: rotateY(-45deg);
    }
}
```

可以得到如下所示的一个 3D 文字运动效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c443c59b8cf40ee8865ff8b1815e118~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

尽管已经初步实现了 3D 效果，但是这似乎还不够完美。为了让视觉效果更加真实，我们需要添加一定量的模糊效果，以便近距离的文字保持清晰，而较远的文字则变得模糊。

但是，实现这种效果需要对每个文字进行精细的处理。然而，单个的 `<p>` 结构无法实现对每个文字的单独处理。因此，我们需要对这一结构进行简单地改造：

```HTML
<p>
    <span>C</span>
    <span>S</span>
    <span>S</span>
    <span>3</span>
    <span>D</span>
    <span>E</span>
    <span>F</span>
    <span>F</span>
    <span>E</span>
    <span>C</span>
    <span>T</span>
</p>
```

完整的 CSS 代码大概是这样：

```CSS
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

$count: 12;

body, html {
    font-family: 'Lobster', cursive;
    perspective: 160vmin;
    overflow: hidden;
}

p {
    margin: auto;
    font-size: 24vmin;
    transform-style: preserve-3d;
    animation: rotate 10s infinite ease-in-out;
    
    span {
        text-shadow: 
            1px 1px 0 rgba(0, 0, 0, .9),2px 2px 0 rgba(0, 0, 0, .7),3px 3px 0 rgba(0, 0, 0, .5),4px 4px 0 rgba(0, 0, 0, .3),5px 5px 0 rgba(0, 0, 0, .1);
        
        &:nth-child(-n+5) { 
            animation-delay: -5s; 
        }
    }
}

@for $i from 1 to 7 {
    span:nth-child(#{$i}), 
    span:nth-last-child(#{$i}) {
        animation: filterBlur-#{$i} 10s infinite ease-in-out;
    }

    @keyframes filterBlur-#{$i} {
        0% {
            filter: blur(0px) contrast(5);
        }
        50% {
            filter: blur(#{7 - $i}px) contrast(1);
        }
        100% {
            filter: blur(0px) contrast(5);
        }
    }
}
@keyframes rotate {
    0% {
        transform: rotateY(-45deg);
    }
    50% {
        transform: rotateY(45deg);
    }
    100% {
        transform: rotateY(-45deg);
    }
}
```

在这个效果中，我们需要采用一些小技巧来简化代码，并且实现目标效果。

1.  首先，我们需要注意到，在最左和最右的效果下，第一个字符和最后一个字符的效果其实是一致的，第二个字符和倒数第二个字符也应该有相同的效果。因此，它们可以放到一起进行处理，简化代码。并且我们可以借助预处理器 SASS、选择器 `:nth-child` 和 `:nth-last-child` 来编写高效的 CSS 代码。
1.  其次，为了让文字看起来更加立体，我们可以配合使用 `text-shadow`。
1.  最后，注意到我们需要将每个字符分成清晰和模糊两部分，所以我们可以利用 animation-delay 来使得其中一半动画延迟一定时间进行。

通过这些小技巧，我们最终可以得到需要的文字模糊视差效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a966dc83495b4bd6949abd306f46413c~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整的代码，你可以戳这里：[CodePen Demo -- 利用 filter:blur 增强文字的 3D 效果](https://codepen.io/Chokcoco/pen/rNwOvNW)



### 利用模糊滤镜提取图片主题色

模糊滤镜还有一种比较偏门的用法，就是**获取图片的主色。**

假设，有一张图片，我们希望能够获取它的主色调：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97091adbc84549f7a59681b2f0015eba~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

这个主色调的使用场景就非常之多了，可以利用它们来填充背景，等等，像是下面这样：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9df2c8bf0a0e4759ad755ab100f83075~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

通常要实现类似的需求肯定还是需要 Canvas 的能力进行取色、一系列计算、再平均色值得出最终结果。

而这里，我们可以巧妙地通过模糊滤镜以及放大效果，近似地拿到图片的主题色。

假定我们有这样一张图片：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba053c0d958d4b86a2953466a5de94c8~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

```HTML
<div></div>
```

```CSS
div {
    background: url("image.png");
    background-size: cover;
    filter: blur(50px);
}
```

首先，利用模糊滤镜，设置一个非常大的模糊值，作用于图片上，效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29b4ea17ce8f4a2c9f81335fd14b1630~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

模糊之后的图片确实有点主色调的感觉了，不过边缘明显还是有很大的问题，需要进一步的裁剪。

接下来，通过 `overflow: hidden` 等方式去掉模糊的边缘，再可以借助 `transform: scale()` 将整个模糊效果放大，使颜色更为聚焦：

```CSS
div {
    position: relative;
    width: 320px;
    height: 200px;
    overflow: hidden;
}

div::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("image.png");
    background-size: cover;
    // 核心代码：
    filter: blur(50px);
    transform: scale(3);
}
```

最终结果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a6d2693a873c485dad63ed8ff6de8b70~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

如此一来，就巧妙地通过模糊滤镜取到了图片的主色调值，并且整体效果不错。

> 完整的代码你可以戳这里：[CodePen Demo -- Get the main color of the image by filter and scale](https://codepen.io/Chokcoco/pen/poRBQGg)

当然，该方案也是存在一定的小问题的：

1.  只能是大致拿到图片的主色调，无法非常精确，并且 `filter: blur(50px)` 这个 `50px` 需要进行一定的调试；
1.  模糊滤镜本身是比较消耗性能的，如果一个页面存在多个这种方法获取到的背景，可能对性能会造成一定的影响，实际使用的时候需要进行一定的取舍。




## 对比度滤镜 contrast()

OK，聊完了模糊滤镜，接下来我们来看看对比度滤镜 `contrast()`。

对比度滤镜相对而言，单独使用的话，技巧就没那么多了。

在 CSS 中，对比度滤镜 `contrast()`用于改变元素的**对比度**。

> 图像对比度指的是一幅图像中明暗区域最亮的白和最暗的黑之间不同亮度层级的测量，即一幅图像灰度反差的大小。


### 图片及按钮元素的 Hover 过渡效果

当对比度滤镜单独使用的时候，最多的场景就是在一些元素的 Hover、Click 上：

```HTML
<div class="container">
    <div class="btn">Btn</div>
    <img class="img" src="image.png" alt="">
</div>
```

```CSS
.btn:hover,
.img:hover {
    cursor: pointer;
    transition: filter .3s;
    filter: contrast(130%);
}
```

实现一种 Hover 过渡高亮的效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24b806055a2844d0aa1e5fb28074fdc3~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整代码，戳这里：[CodePen Demo -- CSS3 filter hover IMG](https://codepen.io/Chokcoco/pen/VwEapwr)



### 可访问性提升，提升文字对比度

还有一个比较少人关注的用法。`filter: contrast()` 滤镜是非常好的提升背景与背景上文字对比度的方法。

那么，**提升背景与背景上文字对比度**有什么意义呢？

这个就涉及了可访问性 A11Y 相关的内容了，我们在这一章节只简单描述。

> A11Y 是 Accessibility 的一种缩写方式，其中数字 11 代表了 Accessibility 中的 11 个字母。Accessibility（可访问性）指的是在 Web 开发中，使尽可能多的人能够使用网站，即使这些人的能力在某些方面受到限制。通过增加 Accessibility 的支持，可以使残障人士和其他有特殊需求的用户更方便地访问和使用网站。

颜色是我们日常中需要经常接触的一种属性。对于多数视觉正常的用户而言，可能并没有太过敏感于网站的颜色设计。然而，对于一小部分色弱或色盲的用户而言，他们对于网站的颜色设计会非常敏感，差劲的设计可能会给他们带来极大的不便。

因此，这里引出一个非常重要的概念：**色彩对比度**。简单来说，色彩对比度描述了两种颜色之间在亮度方面的差异。在网站设计方面，这通常指的是背景颜色（background-color）与内容颜色（color）之间的对比差异。

最权威的互联网无障碍规范 —— [WCAG AA](https://www.w3.org/Translations/WCAG21-zh/) 规范规定，所有重要内容的色彩对比度需要达到 4.5:1 或以上（字号大于 18 号时达到 3:1 或以上），才算拥有较好的可读性。

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f0a51c9394bc40abab517b51d23a8034~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

很明显，上述图片前两个例子，文字与背景的对比度非常低，正常用户都已经很难看得清了。

因此，一些场景下，我们可以利用 `filter: contrast()` 快速提升有文本及背景组合的元素的对比度，有效提升可访问性。




## 模糊滤镜叠加对比度滤镜的融合效果

好，快速过完 `contrast()`，我们将介绍 CSS 滤镜中，最有意思的一对组合：**模糊滤镜配合对比度滤镜**。

单独将两个滤镜拿出来，它们的作用分别是：

1.  `filter: blur()`： 给图像设置高斯模糊效果。
1.  `filter: contrast()`： 调整图像的对比度。

但是，当它们“合体”的时候，产生了奇妙的融合现象。

先来看一个简单的例子，我们在一个父容器下，设定两个元素，两个元素进行交互的来回位移运动：

```HTML
<div class="g-container">
    <div class="g-ball-a"></div>
    <div class="g-ball-b"></div>
</div>
```

```CSS
.g-container {
    margin: auto;
    position: relative;
    width: 300px;
    height: 200px;
}
// 小球 1
.g-ball-a {
    // ...
    animation: filterBallMove 4s ease-out infinite;
}
// 小球 2
.g-ball-b {
    // ...
    animation: filterBallMove2 4s ease-out infinite;
}
@keyframes filterBallMove {
    50% {
        left: 140px;
    }
}
@keyframes filterBallMove2 {
    50% {
        right: 140px;
    }
}
```

于是，可以得到这样一个动画：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98f7367c7b3745e186929560519cbbbf~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

我们给父元素，添加 `filter: blur()` 和 `filter: contrast()` 的组合，以及一个白色的背景色：

```CSS
.g-container {
    margin: auto;
    position: relative;
    width: 300px;
    height: 200px;
    filter: blur(6px) contrast(20);
    background: #fff;
}
```

这样，我们就得到了这样一种融合效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/75c05b3bb6c740adbc97f54f59ff280f~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整代码，戳这里：[CodePen Demo -- filter mix between blur and contrast](https://codepen.io/Chokcoco/pen/QqWBqV)

仔细看两圆相交的过程，在边与边接触的时候，会产生一种边界融合的效果，通过对比度滤镜把高斯模糊的模糊边缘给干掉，利用高斯模糊实现融合效果。

上述效果的实现基于两点：

1.  融合动画的两个元素是在被设置了 `filter: blur(6px) contrast(20)` 的画布背景上进行动画的；
1.  设置了`filter: blur(6px) contrast(20)` 的画布必须设置一个背景色，在上述的 Demo 中，这个背景色是白色，但不局限于白色。

值得注意的是，我们也可以将模糊滤镜，设置给子元素，而不是父元素，可以得到一样的效果，像是这样：

```CSS
.g-container {
    margin: auto;
    position: relative;
    width: 300px;
    height: 200px;
    filter: contrast(20);
    background: #fff;
}
// 小球 1
.g-ball-a {
    // ...
    filter: filter(6px);
    animation: filterBallMove 4s ease-out infinite;
}
// 小球 2
.g-ball-b {
    // ...
    filter: filter(6px);
    animation: filterBallMove2 4s ease-out infinite;
}
```

这个效果可谓 CSS 中最有趣、最神奇的效果了。掌握了这个技巧后，我们可以实现非常多意想不到、妙趣横生的动画效果！

下面我们就将进入实战中，看看融合效果的威力到底有多强大，下面是一些我个人在过往几年中我认为使用融合效果实现过的最具代表性的几个动画效果。



### 使用融合效果实现**燃烧的火焰**

首先，来看看这样一个燃烧的火焰：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/14c86aa119f04e6dbf7dea974e71ac0a~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

不用怀疑你的眼睛，上述动图效果就是使用纯 CSS 实现的。

核心就是 `filter: contrast()` 与 `filter: blur()` 配合使用，不过实现的过程也非常有趣，我们需要使用 CSS 画出一个火焰形状。

火焰形状 CSS 核心代码如下：

```CSS
.fire {
    width: 0;
    height: 0;
    border-radius: 45%;
    box-sizing: border-box;
    border: 100px solid #000;
    border-bottom: 100pxsolid transparent;
    background-color: #b5932f;
    transform: scaleX(.4);
    filter: blur(20px) contrast(30);
}
```

大概是长这样：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8bbb607720bb42999b06cb55537ad1c6~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

分解一下过程：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0df1593fc4bc423e85d9d4f53b34915c~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

放在纯黑的背景下，就得到了上述图片的效果。

接下来，在 `.fire` 元素内部，实现一个大量的黑色圆形由下至上的无规律动画即可，让这些黑色圆形不断地穿过火焰。由于滤镜的融合效果，就能产生神奇的火焰效果！

在这里，为了让你更好地理解，我把背景色切换成白色，整个动画的原理一看即懂：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/577292b36ace4f92b0a06b338e3bbae4~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

基于这个火焰，其实我们可以继续探索，把它最终实现成这样：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7baeb6e0a0b448148a50ad34b0d550e6~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整的代码，你可以看这里：[CodePen Demo -- CSS Fire](https://codepen.io/Chokcoco/pen/jJJbmz)



### 实现粘性气泡墙效果

再来看这么一个页脚的粘性气泡墙效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/545bb3a1b82a418ba123d4b9f3956e50~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

上述效果没有气泡的融合效果，可能就仅仅是这样（忽略颜色不一样）：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5815b826415b48da90ea20326fb99693~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

核心的融合效果，使用的就是`filter: contrast()` 与 `filter: blur()` 的组合实现的。

要实现上述的没有融合效果的效果，使用 CSS 是不难的，核心要做的，就是让 N 个圆形元素，从底部无规律地进行向上升起的动画。

再在上述动画的基础之上，给父容器，添加上`filter: contrast()` 与 `filter: blur()` 的组合， 就能够完美地得到这样一个复刻效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9adfa84352ac4aa3bb870b0156f7cd6d~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整的源码，你可以戳这里：[CodePen Demo -- Bubble Rises](https://codepen.io/Chokcoco/pen/QWQRjrX)


### 实现华为手机充电效果

再来看一个融合效果的经典之作，模拟华为手机之前的充电效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/04b61624ef2e4e7bb7e753e43b83dbf1~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

这里动画过程中的核心融合效果，就是`filter: contrast()` 与 `filter: blur()` 的组合使用。

> 源码也和上面两个动画的制作非常的类似，完整的源码：[CodePen Demo - HuaWei Battery Charging Animation](https://codepen.io/Chokcoco/pen/vYExwvm)


### 使用融合效果实现文字融合特效

另外，我们可以在动画的过程中，动态改变元素滤镜的 `filter: blur()` 的值。

利用这个方法，我们还可以设计一些文字融合的效果。

来看这么一个例子：

```HTML
<div class="container">
  <h1>Blur word Animation</h1>
</div>
```

```CSS
.container {
    filter: contrast(20);
    background: #000;
}
h1 {
    color: #fff;
    animation: letterspacing 5s infinite alternate ease-in-out;
}
@keyframes letterspacing {
    0% {
        letter-spacing: -2.2rem;
        filter: blur(5px);
    }

    50% {
        filter: blur(10px);
    }

    100% {
        letter-spacing: .5rem;
        filter: blur(0);
    }
}
```

这样，我们就可以实现这样一种文字融合的动画效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09ec18cd2520405e9d6472e514859122~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3890b8890bf948ac804367d096aa2c9c~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 具体实现你可以看这里：[CodePen Demo -- word animation | word filter](https://codepen.io/Chokcoco/pen/jLjNRj)



### 使用融合效果构建圆角

最后，我们再来看一种特殊的用法，利用 `filter: contrast()` 与 `filter: blur()` 实现特殊的圆角效果。

首先，我们来看这样一个图形：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/418baad83699401a81819b459ca2eead~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

一个矩形，没什么特别的，代码如下：

```CSS
div {
    width: 200px;
    height: 40px;
    background-color: #000;
}
```

如果，我们现在需要给这个矩形的两端加上**圆角**，像是这样，该怎么做呢：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4259f501c5854e6d96065327c877d57a~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

So easy，不过就是加个 `border-radius` 而已：

```CSS
div {
    width: 200px;
    height: 40px;+ border-radius: 40px;
    background-color: #000;
}
```

好，那如果，不再是直线，而是一条曲线，希望曲线两端，带有圆角，像是这样，又该怎么办呢：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f25568ef450440eae2c6ca1767edeee~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

到这，基本上触及了传统 CSS 的天花板，想通过一个属性搞定这个效果是不太可能了。

当然，方法之一，通过首尾两端，利用两个伪元素，实现两个圆形，叠加上去：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa531869915c4d76b978253631ae6418~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

还有一种特殊的技巧，也就是本文的模糊滤镜与对比度滤镜的叠加。

**blur 与 contrast 滤镜的组合不仅能用于实现粘性融合效果特效，其特殊的性质使得它们的组合可以将直角变成圆角！**

直接上代码：

```CSS
div {
    position: relative;
    width: 250px;
    height: 250px;
    filter: contrast(20);
    background-color: #fff;
    overflow: hidden;
}
div::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    filter: blur(7px);
    border: 25px solid transparent;
    border-bottom: 25px solid #000;
    border-radius: 50%;
}
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/072fda03febf4c78be4fa38c9455970b~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

通过 Gif 动图，更加直观，**通过滤镜，将边缘从锐利变成了平滑的圆角效果**：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/126bf3f2afd04302885162ccec03505b~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整代码，戳这里：[CodePen Demo -- Arc with rounded corners](https://codepen.io/Chokcoco/pen/bGveoPY)

那么，这个直角变圆角的技巧还有什么有意思的妙用呢？

我们再来看一个有意思的：使用 `filter: contrast()` 配合 `filter: blur()` 实现波浪效果。

在之前，我们如果想使用纯 CSS 实现下述的波浪效果，是非常困难的：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/948ce43e22ce4e9d8b95a777c19d2d8f~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

这种波浪效果，通常会使用在**优惠券**等切图中：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0eb532c0648e4fa4b6cbbc783e3b89a9~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

在之前，我们是怎么去做的呢？如果不切图，使用纯 CSS 的话，需要使用两层渐变进行叠加，大概是这样，感受一下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/188d904ff1e144c8afa6b449d02bf3e8~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

其代码也比较复杂，需要不断地调试渐变，使两个径向渐变吻合：

```CSS
div {
    position: relative;
    width: 400px;
    height: 160px;
    background: linear-gradient(90deg, #945700 0%, #f49714 100%);
    
    &::before,&::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom :0;
    }
    &::before {
        width: 10px;
        background-image: radial-gradient(circle at -5px 10px, transparent 12px, #fff 13px, #fff 0px);
        background-size: 20px 20px;
        background-position: 0 15px;
    }
    &::after {
        width: 15px;
        background-image: radial-gradient(circle at 15px 10px, #fff 12px, transparent 13px, transparent 0px);
        background-size: 20px 40px;
        background-position: 0 15px;
    }
}
```

那么，如果使用 `filter: contrast()` 配合 `filter: blur()` 的话，整个过程将会变得非常简单。

我们只需要实现这样一个图形：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/25b1b792ac964b6aa00790f3b7084a68~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

这个图形使用渐变是容易得到的：

```CSS
div {
    background: radial-gradient(circle at 20px 0, transparent, transparent 20px, #000 21px, #000 40px);
    background-size: 80px 100%;
}
```

按照上文介绍的技巧，只需要应用上 `filter: contrast()` 配合 `filter: blur()`，就能将锐利的直角转化成圆角。我们尝试一下：

```HTML
<div class="g-container">
  <div class="g-inner"></div>
  </div>
```

```CSS
.g-container {
    position: relative;
    margin: auto;
    height: 200px;
    padding-top: 100px;
    filter: contrast(20);
    background-color: #fff;
    overflow: hidden;
}

.g-inner {
    position: relative;
    height: 200px;
    background: radial-gradient(circle at 20px 0, transparent, transparent 20px, #000 21px, #000 40px);
    background-size: 80px 100%;
    filter: blur(10px)
}
```

> 可以写在 1 个 DIV 里面（通过元素和它的伪元素构造父子关系），也可以用 2 个，都可以，问题不大。

得到如下所示的波浪图形：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4dad20803e6a4595b44f9e5258096831~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

我们希望它波浪的地方的确是波了，但是我们不希望的地方，它也变成了圆角：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4ac8e0e1cc274cb6a7f52a177e5bf9ff~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

这是 `filter: blur()` 的一个问题，好在，我们是可以使用 `backdrop-filter()` 去规避掉这个问题的，我们简单改造下代码：

```CSS
.g-container {
    position: relative;
    width: 380px;
    padding-top: 100px;
    filter: contrast(20);
    background-color: #fff;
    overflow: hidden;
    
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        backdrop-filter: blur(10px);
        z-index: 1;
    }
}
.g-inner {
    position: relative;
    width: 380px;
    height: 100px;
    background: radial-gradient(circle at 20px 0, transparent, transparent 20px, #000 21px, #000 40px);
    background-size: 80px 100%;
}
```

这样，我们就实现了一份完美的波浪效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/086bb7949e3e49b898b48a2ee4eec267~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

基于这种方式实现的波浪效果，我们甚至可以给它加上动画，让它动起来，也非常的好做，简单改造下代码：

```CSS
.g-inner {
    position: relative;
    width: 480px;
    height: 100px;
    background: radial-gradient(circle at 20px 0, transparent, transparent 20px, #000 21px, #000 40px);
    background-size: 80px 100%;
    animation: move 1s infinite linear; 
}

@keyframes move {
    100% {
        transform: translate(-80px, 0);
    }
}
```

通过一个简单的位移动画，并且使之首尾帧一致，看上去就是连续的：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/82131216547d4ecca5354230b8c5a737~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整的代码，你可以戳这里：[CodePen Demo -- Pure CSS Wave](https://codepen.io/Chokcoco/pen/PoRzeav)



## 总结一下

在本章中，我们的核心围绕着 `blur()` 滤镜与 `contrast()` 滤镜展开。

对于模糊滤镜，它们的一些常见技巧有：

1.  利用模糊滤镜配合 `backdrop-filter` 实现毛玻璃效果；
1.  利用模糊实现彩色阴影 / 渐变阴影；
1.  利用模糊滤镜实现层次感 / 3D 效果；
1.  利用模糊滤镜提取图片主题色。

对于对比度滤镜，其最常见的技巧是：

1.  利用对比度滤镜实现元素的过渡高亮的效果；
1.  可访问性提升，提升文字对比度。

而最后，我们介绍了 CSS 中最神奇的一组组合，模糊滤镜叠加对比度滤镜的实现融合效果，掌握它们，我们可以实现：

1.  各种融合动画效果；
1.  文字的融合动画效果；
1.  构建圆角效果，实现波浪效果。

当然，模糊滤镜叠加对比度滤镜可以鼓捣的花活还有很多，你可以多观察日常工作业务中的各式交互动画，尝试自己利用它们实现一些巧妙的动画效果！

好的，本章节到此结束，大伙还有什么疑问，可以在评论区一起讨论。
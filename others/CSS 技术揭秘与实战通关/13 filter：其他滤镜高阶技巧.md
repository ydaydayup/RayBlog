聊完了模糊滤镜 `blur`、对比度滤镜 `contrast` 以及阴影滤镜 `drop-shadow`，由于剩下的一些滤镜内容不足以支撑其单独成章，所以本文会将它们整合成一章，在剩下的一些滤镜中，介绍其中一些比较有技巧性的用法。




## filter: grayscale 应用于各种置灰场景

首先，我们来看看 `filter: grayscale`。`grayscale` 滤镜意为灰度滤镜，主要运用在需要把有色画面变为灰白画面的场景。


### 元素 / 图片置灰

`filter: grayscale` 最为常见的场景就是在图片的展示效果上。

默认设置了 `filter: grayscale` 滤镜，当 Hover 之后移除置灰效果，可以搭配一些特殊布局，在特定交互场景下比较多见。

核心代码非常简单，就是这样：

```CSS
div {
  filter: grayscale(100%);
  transition: filter 0.9s;
}

div {
  filter: grayscale(0);
}
```

搭配一些特殊布局或者交互，实现类似下面这样的效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e00175c4e254ff0a2f7882cf40f4871~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>


### 网站置灰

当发生一些大事件的时候，网站经常可能需要从彩色变成灰色，如下所示：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41e34b240a6d41f4aeaa0a2af7043aa8~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>


最常见的就是全站置灰，而全站置灰其实是非常简单的事情。

这个时候，我们就会使用 `filter: grayscale`，没错，仅仅需要使用一行 CSS，就能实现全站置灰的方式。

像是这样，我们仅仅需要给 HTML 添加一个统一的滤镜即可：

```CSS
html {
    filter: grayscale(.9);
}
```

### 首屏置灰

全站置灰的好处是显而易见的，工作量少！

但是，全站置灰不一定能满足所有的场景。

譬如，当只需要置灰网站的首屏画面，随着用户开始操作页面，向下滚动的时候，非首屏画面部分仍旧保持彩色，如下述动图所示，该怎么办呢？

看看示意图：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/756616d218d04ac692941d27b2a3b2aa~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

这种只置灰首屏的需求该如何实现呢？

这里，就会利用 `backdrop-filter` 替换 `filter` 实现一种遮罩的置灰滤镜效果。

我们需要改造一下上述的代码，给 HTML 添加一层伪元素，在伪元素中，添加 `backdrop-filter: grayscale()`：

```CSS
html {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: scroll;
}
html::before {
    content: "";
    position: absolute;
    inset: 0;
    backdrop-filter: grayscale(95%);
    z-index: 10;
}
```

仅仅只是这样而已，我们就在整个页面上方叠加了一层滤镜蒙版，实现了只对首屏页面的置灰：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23f44ac80ca04c35a3647274208ccace~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

上述实现，有个**交互上的问题**：如果我们的页面是存在大量交互效果的，当叠加了一层遮罩滤镜效果在原内容上，那这层遮罩下方的所有交互事件都将失效，也就是我们的 hover、click 效果将无法被正常触发。

那该如何解决呢？这个也好办，我们可以通过给这层遮罩添加上 `pointer-events: none`，让这层遮罩不阻挡事件的点击交互。

代码如下：

```CSS
html::before {
    content: "";
    position: absolute;
    inset: 0;
    backdrop-filter: grayscale(95%);
    z-index: 10;+ pointer-events: none;
}
```

> 完整的代码，可以戳这里：[CodePen Demo -- Gray Website by backdrop-filter](https://codepen.io/Chokcoco/pen/zYaJQJm)




## filter: hue-rotate 应用于各种色彩调整

`hue-rotate` 色相旋转滤镜。理解这个滤镜的核心是理解 HSL 颜色表示法。

那么，什么是 HSL？

HSL 是一种颜色模型，其中 HSL 代表色相（Hue）、饱和度（Saturation）和亮度（Lightness）。HSL 颜色模型通过指定颜色的色相、饱和度和亮度三个值来定义颜色。在 HSL 颜色模型中，色相是颜色的基本属性，表示颜色在色轮上的位置，其值从 0 到 360 度。饱和度表示颜色的强度或纯度，其值从 0% 到 100%。亮度表示颜色的明暗程度，其值也从 0% 到 100%。

理解 HSL 的核心，在于理解下面这张图：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c307c40805d4908a2424c26ffae8f76~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

通过控制色相，变换色相，其实我们就能够实现颜色值的一个转换。

在之前的章节中，我们多次提到了 `hue-rotate` 滤镜，举个 `hue-rotate` 最常见的例子，实现渐变色动画效果。

再复习一次，我们利用角向渐变，实现一个色彩圆盘：

```CSS
div {
    margin: auto;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: conic-gradient(red, #ff4d00, #ff9900, #ffe600, #ccff00, #80ff00, #33ff00, #00ff1a, #00ff66, #00ffb3, aqua, #00b3ff, #0066ff, #001aff, #3300ff, #8000ff, #cc00ff, #ff00e6, #ff0099, #ff004d, red);
}
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a5a31c7c70324902b6d5936e0e5633c2~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

添加上 `hue-rotate` 动画：

```CSS
div {
    animation: hueRotate 5s infinite linear;
}

@keyframes hueRotate {
    100% {
        filter: hue-rotate(360deg);
    }
}
```

就能得到渐变色变换动画：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/727d34a40c3f4fcd8d5e091ddb26da73~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

当然，值得注意的是。`hue-rotate` 动画其实可以用在任何你觉得可以给动画添彩的地方，它的好处就是能够让动画循环变换。

作用在文字之上，也是一样 OK 的。首先，利用 `background-clip: text` 实现渐变文字：

```CSS
div {    
 background: linear-gradient(45deg, #009688, yellowgreen, pink, #03a9f4, #9c27b0, #8bc34a);    
    background-clip: text;
}
```

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aee7b0423d1d4f79a30d7060c31977c5~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

配合 `filter: hue-rotate()`，让渐变动起来：

```CSS
div {    
 background: linear-gradient(45deg, #009688, yellowgreen, pink, #03a9f4, #9c27b0, #8bc34a);    
    background-clip: text;    
    animation: huerotate 5s infinite;
}
@keyframes huerotate {    
    100% {        
         filter: hue-rotate(360deg);    
    }
}
```

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e87d4bdeccf041ba8a5b3c8db0a34c5b~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整代码，戳这里：[CodePen Demo -- 利用 hue-rotate 实现文字渐变色动画](https://codepen.io/Chokcoco/pen/PmjMwz)




## filter: invert 滤镜应用于黑夜 / 日间模式转换

下面谈谈相对比较冷门的 `filter: invert` 滤镜。

invert 滤镜可以将元素中的**颜色反转**，即将黑色变成白色，白色变成黑色，其他颜色也会相应地进行反转。通过使用这个滤镜，可以为元素带来独特的视觉效果。

简单看看其效果：

```CSS
div {
    filter: invert(100%);
}
```

如果作用于图片，效果会是这样：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b32c94bc6d614b239c32b4e3e8bbe8a9~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

而如果作用于文本内容，假设我们的正常文本的 HTML 及 CSS 代码如下：

```HTML
<div>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        <span>Voluptas fugit</span> 
        iure nemo sunt incidunt ut neque dolore corrupti et recusandae. 
    </p>
</div>
```

```CSS
p {
    border: 3px solid #999;
    background: #fff;
    color: #000;
    
    span {
        color: #f00;
    }
}
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4c31f63927f34cae92a878e1b9d83fb7~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

仔细看上面两张图，发现什么了吗？虽然图片应用了 invert 之后，基本不太能看，但是对于文本内容，非常好地实现了一种颜色反转的作用。而这不正是有点类似于日间模式与黑夜模式么？

因此，我们可以尝试使用 **`filter: invert()` 来实现日间模式、黑夜模式的转换**。

代码也非常简单：

```CSS
.dark-mode-invert {
    filter: invert(100%);
}

.dark-mode-invert img {
    filter: invert(100%);
}
```

我们可以给 HTML 元素挂载 `.dark-mode-invert` 样式，由于图片被 `filter: invert(100%)` 后，基于处于不可用的状态，所以需要二次 `filter: invert(100%)` 使其复位。

尝试使用掘金作为例子试了下，转换前：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b39af75ba114fb093d5d2b6b843f8ef~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

转换后：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b60a57d47d444b639b60ce4ec8a92db8~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

当然，虽然理论上 invert 的方案可行。但是实际生产环境，很少会有使用 invert 作为黑夜/日间模式解决方案的手段。原因在于：

1.  需要对图片额外处理，如果图片是以非 IMG 形式嵌入，譬如以 background、SVG 等方式嵌入，则改造的工作量很大；
1.  Invert 转换后的非黑白色不好控制，且效果一般。也就是说，除了黑白颜色能够正常转换，非黑白色的 invert 转换极大可能并非设计师、PM 想要的效果。

因此，invert 方案存在一定的局限性。当然，这是一个非常好的探索，也是一种值得学习借鉴的思路。





## filter: opacity 与 opacity 之争？

聊到 `filter: opacity`，不透明度滤镜，很多同学其实会很疑惑。原因在于，CSS 还有另外一个非常类似的属性 `opacity`。

两者的用法完全一致：

```CSS
div {
    filter: opacity(35%);
}
// OR
div {
    opacity: 0.35;
}
```

两个不透明度滤镜本身的用法无需多言。那么，它们的不同之处在哪呢？

1.  在介绍滤镜的第一篇文章中，我们有提到，`filter` 滤镜会导致 3D 失效和 `position: fixed` 定位失效，这个属于所有滤镜的特性。`opacity` 则不会。
1.  其次，使用 `filter: opacity` 能够更好地获得浏览器提供的硬件加速支持，也就是获得更好的性能。从层叠上下文和包含块的角度而言，`filter: opacity` 和 `opacity` 都会生成一个新的层叠上下文，但是只有 `filter: opacity` 会生成包含块（Containing Block）。当然，对于现代浏览器，这两者的性能差异，几乎可以忽略。

> 关于层叠上下文和包含块，我们在介绍滤镜的第一篇文章中，其实就已经提及。
> 
> 更为细致的内容，你可以再看看这篇官方文档：[MDN-层叠上下文](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)、[MDN-布局和包含块](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Containing_block)

3.  还有一种说法，两者在交互上的一些不一致。譬如在一些浏览器上，如果给 iframe 元素添加上 `opacity` 属性，并且值不为 none 或者 1，则 iframe 内的所有链接将不可点击，`filter: opacity` 则不会有这个限制。opacity 的这种现象无疑是基于一种安全考虑。只是，截止到今天（2023-04-20），我又实测了各大浏览器，发现 `opacity` 已经没有了上述的限制，可以放心使用。




## filter: brightness、saturate、sepia 图像调整

剩下的没有单独拎出来讲的滤镜，还有 brightness、saturate、sepia。

算上之前已经提到过的 contrast，它们更多的就是应用在图像处理之上。

当然，对待这些滤镜，我们可以灵活地借助工具。这里介绍一个平时我用的比较多的在线滤镜小工具：[CodePen - CSS filter Editor](https://codepen.io/stoumann/pen/MWeNmyb) **。**

我们可以通过这个工具，快速尝试滤镜效果，快速尝试滤镜组合：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a458722a4774462c914d46f7659ed1ce~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

并且，它内置了一些滤镜组合，像是一个迷你版本的 P 图工具。当我们需要实际用的滤镜去处理图片的时候，可以用工具尝试效果，获取相关代码。




## 总结

好，到这里，滤镜基本被我们过了一遍。我们把剩余的几个滤镜的有意思的点进行了剖析。本文的重点在于：

1.  介绍了 `filter: grayscale` 应用于各种置灰场景；
1.  介绍了 `filter: hue-rotate` 应用于各种色彩调整；
1.  介绍了 `filter: invert` 滤镜应用于黑夜 / 日间模式转换的技巧；
1.  详述了 `filter: opacity` 与 `opacity`的异同点；
1.  最后，介绍了 brightness、saturate、sepia 滤镜应用于图像调整，并且介绍了一个在线工具 [CodePen - CSS filter Editor](https://codepen.io/stoumann/pen/MWeNmyb)，可以帮助我们快速尝试滤镜效果和获取相关代码。

好的，本章节到此结束，大伙还有什么疑问，可以在评论区一起讨论。
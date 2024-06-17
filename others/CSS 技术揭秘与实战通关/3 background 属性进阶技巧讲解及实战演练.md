在上一章中，我们介绍了许多 background 中比较基础的技巧。

这一章，我们将继续探索背景，挖掘一些高阶技巧。

## 渐变色动画

有的时候，我们可能需要下面这样的动画效果，渐变背景色的过渡动画：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c90fe872981443ddb1db7c62d2264087~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

假设我们渐变的写法如下：

```CSS
div {
    background: linear-gradient(90deg,  #ffc700 0%, #e91e1e 100%);
}
```

按照常规想法，配合 `animation` ，我们首先会想到在 `animation` 的步骤中通过改变颜色实现颜色渐变动画，那么我们的 CSS 代码可能是：

```CSS
div {
    background: linear-gradient(90deg,  #ffc700 0%, #e91e1e 100%);
    animation: gradientChange 2s infinite;
}

@keyframes gradientChange  {
    100% {
        // 渐变中的颜色发生了变化
        background: linear-gradient(90deg,  #e91e1e 0%, #6f27b0 100%);
    }
}
```

上面我们用到了三种颜色：

-   `#ffc700` 黄色；
-   `#e91e1e` 红色；
-   `#6f27b0` 紫色。

最后，并没有我们预期的结果，而是这样的：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0bead660568e4d7fad1add85a148ffea~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整代码戳这里：[CodePen Demo - linear-graident 变换的动画效果](https://codepen.io/Chokcoco/pen/VpXEpz)

  


我们预期的过渡动画，变成了逐帧动画。这里需要明确的一点是，**渐变是不支持动画** **`animation`** **的**。


### 部分属性是不支持直接整个进行过渡动画的

简单总结一下，线性渐变（径向渐变、角向渐变）是不支持 `animation` 的，单色的 background 是支持的。

查找了下文档，在 `background` 附近区域截图如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3df5682a83a94669ad034daca7c0eb31~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

**[哪些 CSS 属性可以动画？](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties)** 上面的截图是不完整的支持 CSS 动画的属性，完整的可以戳左边。

对于 `background` 相关的，文档里写的是支持 `background` ，但是没有细说不支持 `background: linear-gradient()/radial-gradient()` 。

那么是否我们想要的背景色渐变动画就无法实现了呢？下面我们就发散下思维看看有没有其他方式可以达到我们的目标。

因此，在传统的 CSS 中，我们通常想实现背景色渐变动画，有几种方式：

1.  通过 background-position 的移动模拟渐变动画；
1.  通过 background-size 的缩放过程来模拟渐变动画；
1.  通过外层的大渐变图形的移动（transform）来模拟渐变动画。

我们简单来看看这几种方式。

### 通过 background-position 模拟渐变动画

上面“哪些 CSS 属性可以动画”的截图中，列出了与 `background` 相关的还有 `background-position` ，也就是 `background-position` 是支持动画的，通过改变 `background-position` 的方式，可以实现渐变动画：

```CSS
div {
    background: linear-gradient(90deg,  #ffc700 0%, #e91e1e 50%, #6f27b0 100%);
    background-size: 200% 100%;
    background-position: 0 0;
    animation: bgposition 2s infinite linear alternate;
}

@keyframes bgposition {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: 100% 0;
    }
}
```

这里我们还配合了 `background-size`。首先了解下：

> `background-position`：指定图片的初始位置。这个初始位置是相对于以 `background-origin` 定义的背景位置图层来说的。
>
> `background-size`：设置背景图片大小。当取值为百分比时，表示指定背景图片相对背景区的百分比大小。当设置两个参数时，第一个值指定图片的宽度，第二个值指定图片的高度。

通过 `background-size: 200% 100%` 将图片的宽度设置为两倍背景区的宽度，再通过改变 `background-position` 的 x 轴初始位置来移动图片，由于背景图设置的大小是背景区的两倍，所以 `background-position` 的移动是由 `0 0` -> `100% 0`。

### 通过 background-size 模拟渐变动画

既然 `background-position` 可以，那么另一个 `background-size` 当然也是不遑多让。与上面的方法类似，只是这次 `background-position` 辅助 `background-size` ，CSS 代码如下：

```CSS
div {
    background: linear-gradient(90deg,  #ffc700 0%, #e91e1e 33%, #6f27b0 66%, #00ff88 100%);
    background-position: 100% 0;
    animation: bgSize 5s infinite ease-in-out alternate;

}

@keyframes bgSize {
    0% {
        background-size: 300% 100%;
    }
    100% {
        background-size: 100% 100%;
    }
}
```

> 完整代码戳这里：[CodePen--Demo--position-size 实现渐变动画](https://codepen.io/Chokcoco/pen/KWoYaQ)


通过改变 `background-size` 的第一个值，我将背景图的大小由 3 倍背景区大小向 1 倍背景区大小过渡，在背景图变换的过程中，就有了一种动画的效果。

而至于为什么要配合 `background-position: 100% 0`，是由于如果不设置 `background-position` ，默认情况下的值为 `0% 0%`，会导致动画最左侧的颜色不变，像下面这样，不大自然：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f58b9c876f4d40cbbc9d8ce54cb1521f~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

### 通过 transform 模拟渐变动画

上面两种方式虽然都可以实现，但是总感觉不够自由，或者随机性不够大。

不仅如此，上述两种方式，由于使用了 `background-position` 和 `background-size`，并且在渐变中改变这两个属性，导致页面不断地进行大量的重绘（repaint），对页面性能消耗非常严重，所以我们还可以试试 `transfrom` 的方法。

下面这种方式，使用**伪元素**配合 `transform` 进行渐变动画，通过元素的伪元素 `before` 或者 `after` ，在元素内部画出一个大背景，再通过 `transform` 对伪元素进行变换：

```CSS
div {
    position: relative;
    overflow: hidden;
    width: 100px;
    height: 100px;
    margin: 100px auto;
    border: 2px solid #000;
    
    &::before {
        content: "";
        position: absolute;
        top: -100%;
        left: -100%;
        bottom: -100%;
        right: -100%;
        background: linear-gradient(45deg,  #ffc700 0%, #e91e1e 50%, #6f27b0 100%);
        background-size: 100% 100%;
        animation: bgposition 5s infinite linear alternate;
        z-index: -1;
    }
}


@keyframes bgposition {
    0% {
        transform: translate(30%, 30%);
    }
    25% {
        transform: translate(30%, -30%);
    }
    50% {
        transform: translate(-30%, -30%);
    }
    75% {
        transform: translate(-30%, 30%);
    }
    100% {
        transform: translate(30%, 30%);
    }
}
```

实现原理如下图所示：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d3a510ddf38404f9975a0584c490add~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整代码戳这里：[CodePen--Demo--伪元素配合transform实现背景渐变](https://codepen.io/Chokcoco/pen/vxRwep)

上面列出来的只是部分方法，理论而言，伪元素配合能够产生位移或者形变的属性都可以完成上面的效果。我们甚至可以运用不同的缓动函数或者借鉴蝉原则，制作出随机性十分强的效果。


### 通过滤镜 hue-rotate 实现渐变动画

下面这个方法，可谓是新时代的利器。

`hue-rotate`：为色相旋转滤镜，默认的值为 `0deg`，当旋转 `360deg` 后，相当于回到了本身的颜色值。

通过滤镜 `hue-rotate`，可以非常方便地实现背景色渐变动画，过渡效果也非常的自然，代码量也少。

```
div {
    background: linear-gradient(45deg, #5fddcc, #ff004d);
    animation: hueRotate 10s infinite alternate;
}

@keyframes hueRotate {
    0 {
        filter: hue-rotate(0);
    }
    100% {
        filter: hue-rotate(360deg);
    }
}
```

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8dd43f04e657493aba4cdf4f7d4a6435~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整代码戳这里：[CodePen Demo -- hue-rotate实现渐变背景动画](https://codepen.io/Chokcoco/pen/YzjPVXa?editors=1100)


### 使用 CSS @property 实现背景色渐变动画

到今天，我们还可以使用 `CSS @property` 实现背景色渐变动画，它的出现，极大地增强了 CSS 的能力！

根据 [MDN -- CSS Property](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@property)，@property CSS at-rule 是 CSS Houdini API 的一部分，它允许开发者显式地定义他们的 CSS 自定义属性，允许进行属性类型检查、设定默认值以及定义该自定义属性是否可以被继承。

```CSS
 @property --colorA {
  syntax: '<color>';
  inherits: false;
  initial-value: fuchsia;
}
@property --colorC {
  syntax: '<color>';
  inherits: false;
  initial-value: #f79188;
}
@property --colorF {
  syntax: '<color>';
  inherits: false;
  initial-value: red;
}
div {
    background: linear-gradient(45deg,
        var(--colorA),
        var(--colorC),
        var(--colorF));
    animation: change 10s infinite linear;
}

@keyframes change {
    20% {
        --colorA: red;
        --colorC: #a93ee0;
        --colorF: fuchsia;
    }
    40% {
        --colorA: #ff3c41;
        --colorC: #e228a0;
        --colorF: #2e4c96;
    }
    60% {
        --colorA: orange;
        --colorC: green;
        --colorF: teal;
    }
    80% {
        --colorA: #ae63e4;
        --colorC: #0ebeff;
        --colorF: #efc371;
    }
}
```

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c8efd02b96424f9d91930e11ed89bfed~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

简单解读下，CSS @property 其实就是灵活度更高的 CSS 自定义属性，我们也可以称其为 CSS Houdini 自定义属性。其中：

-   `@property --property-name` 中的 `--property-name` 就是自定义属性的名称，定义后可在 CSS 中通过 `var(--property-name)` 进行引用。
-   syntax：该自定义属性的语法规则，也可以理解为表示定义的自定义属性的类型。
-   inherits：是否允许继承。
-   initial-value：初始值。

在上述的 Demo 中，我们利用了 CSS Houdini 自定义属性，将原本定义在 `background` 的过渡效果嫁接到了 `color` 之上，而 CSS 是支持一个颜色变换到另外一个颜色的，这样，我们巧妙地实现了渐变背景色的过渡动画。

> 完整的代码可以戳这里：[CodePen Demo -- CSS Houdini 自定义属性实现渐变色过渡动画](https://codepen.io/Chokcoco/pen/Bapmzbd)

我们利用 CSS @property 的能力，赋予了渐变更加灵活的特性！

以往使用纯 CSS 非常复杂才能实现的效果，如今可以轻松地达成，不得不感慨 `CSS @property` 强大的能力！

当然，由于本章节主要围绕渐变展开，`CSS @property` 也是本小册非常重要的一节，本文不过多描述，感兴趣的可以提前阅读学习该章节！

至此，我们就得到了 **5** 种不一样的，使用纯 CSS 制作的渐变背景的过渡动画的方式。

## `background-clip` 与渐变文字

下一个单元是关于 `background-clip`，它是与 background 配合非常紧密的一个属性，尤其在与字体相关的动效上，经常能看到它的身影。

### 了解 `background-clip`

首先看看它的用法，简单而言，`background-clip` 的作用就是**设置元素的背景（背景图片或颜色）的填充规则**。

与 `box-sizing` 的取值非常类似，通常而言，它有 4 个取值：

```CSS
{
    background-clip: border-box;  // 背景延伸到边框外沿（但是在边框之下）
    background-clip: padding-box; // 边框下面没有背景，即背景延伸到内边距外沿。
    background-clip: content-box; // 背景裁剪到内容区 (content-box) 外沿。
    backgrounc-clip: text; 
}
```

头三个值用于设置元素的背景（背景图片或颜色）是否延伸到边框下面。

看看这个例子，你就能够明白：

```HTML
<div class="clip-border"></div>
<div class="clip-padding"></div>
<div class="clip-content"></div>
```

```CSS
div {
    width: 100px;
    height: 100px;
    padding: 20px;
    background: #000;
    background-repeat: no-repeat;
    border: 10px dashed red;
}
.clip-border {
    background-clip: border-box;
}
.clip-padding {
    background-clip: padding-box;
}
.clip-content {
    background-clip: content-box;
}
```

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2aa80520779d4c9fb6d7c27d29d6aba5~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

上面三个图，分别设置了 `background-clip: border-box`、`background-clip: padding-box`、`background-clip: content-box` 控制背景图案的起始与终点位置。

利用这个技巧，我们来看看这样一个有意思的案例：现在我们需要实现一个红黄相间的边框，像下图这样，怎么做呢？

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca6e2907198d40b486327b7537598492~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

方法很多，利用 `background-clip` 的话，可以快速实现这个需求：

1.  利用 ` border-style: dashed  `设置一个虚线边框；
1.  利用 `background-clip: border-box` 让背景色从边框处开始绘制；
1.  再设置第二重背景色，利用 `background-clip: padding-box` 让这重背景色从 padding 处开始即可。

看看代码，很好理解：

```HTML
<div></div>
```

```CSS
div {
    width: 100px;
    height: 100px;
    background: linear-gradient(#fff, #fff), #e91e63;
    background-clip: padding-box, border-box;
    border: 5px dashed #ffeb3b;
}
```

结果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/188596087894414387443ba271f7bdc2~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

当然，这里还利用了 `background` 可以多重这个特性，不过由于不支持写成 `background: #fff, #e91e63`，所以将第一重白色写成了 `linear-gradient(#fff, #fff)`，它其实等价于 `#fff`。


> 完整的代码，你可以戳这里：[background-clip DEMO](https://codepen.io/Chokcoco/pen/ZEjGEMo)


### 必须掌握的 `background-clip: text`

在整个 `background-clip` 取值中，最常用的莫过于 `background-clip: text`。

`-webkit-background-clip:text` 属性的意思是，以区块内的文字作为裁剪区域向外裁剪，文字的背景即为区块的背景，文字之外的区域都将被裁剪掉。

看个最简单的 Demo ，没有使用 `-webkit-background-clip:text` ：

```CSS
<div>Clip</div>
<style>div {
  font-size: 180px;
  font-weight: bold;
  color: deeppink;
  background: url($img) no-repeat center center;
  background-size: cover;
}
</style>
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5b4d9a51df64a04b3c16b23d2d64b3c~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>


### 使用 `background-clip:text`

我们稍微改造下上面的代码，添加 `background-clip:text`：

```CSS
div {
  font-size: 180px;
  font-weight: bold;
  color: deeppink;
  background: url($img) no-repeat center center;
  background-size: cover;
  background-clip: text;
}
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/37879f4fb12a48c8b427a16b13515569~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整代码戳这里：[CodePen Demo](https://codepen.io/Chokcoco/pen/eWRaVJ)



这是由于文字设置了颜色，挡住了 div 块的背景，如果将文字设置为透明呢？文字是可以设置为透明的 `color: transparent` 。

```CSS
div {
  color: transparent;
  background-clip: text;
}
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88362fc6e8954c12a767a050d1abe707~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整代码戳这里：[CodePen Demo](https://codepen.io/Chokcoco/pen/oWwRmE)

通过将文字设置为透明，原本 div 的背景就显现出来了，而文字以外的区域全部被裁剪了，这就是 `background-clip:text` 的作用。

利用 `background-clip:text`，可以实现的效果就非常的多。


### 利用 `background-clip: text` 实现渐变文字

首先，最常见的利用 `background-clip: text` 的效果，就是实现渐变色文字效果。代码如下：

```HTML
<div> background-clip: text</div>
```

```CSS
div {
    font-size: 54px;
    color: transparent;
    background: linear-gradient(45deg, #ffeb3b, #009688, yellowgreen, pink, #03a9f4, #9c27b0, #8bc34a);
    background-clip: text;
}
```

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee9e6c969f444a13bfdcdc7a8f9b65f0~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整代码戳这里：[CodePen Demo -- background-clip: text 文字渐变色](https://codepen.io/Chokcoco/pen/PmjMwz);


### 特定的文字配合特定的图片

利用这个特性，特殊的文字配上特定的图片，就能实现任意风格的文字效果。

譬如 Fire 搭配火焰的图片：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/187096f20f91497fb8e73365b544e6e6~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整代码戳这里：[CodePen Demo -- background-clip: text & Image text](https://codepen.io/Chokcoco/pen/wvopKEL)


### `background-clip: text` 配合动态背景

当然，背景图不一定是静态背景，动态背景也是可以的。

譬如配合上面的渐变色动画技巧，我们给上述渐变字体代码加上动画，这样就形成了带动画的渐变色字体：

```CSS
div {
    font-size: 54px;
    color: transparent;
    background: linear-gradient(45deg, #ffeb3b, #009688, yellowgreen, pink, #03a9f4, #9c27b0, #8bc34a);
    background-clip: text;
    animation: huerotate 3s infinite;
}
@keyframes huerotate {
    100% {
        filter: hue-rotate(360deg);
    }
}
```

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c67db40110c41459e9c7a636440c2f2~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整代码戳这里：[CodePen Demo -- background-clip: text 文字渐变色](https://codepen.io/Chokcoco/pen/PmjMwz)

当然，也可以是更为复杂的动画效果，譬如，我们再利用它实现下述的文字高光动画，像是这样：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f5b8b9077c84a90a960712bc998bd5c~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

其本质也是利用了 `background-clip`，伪代码如下：

```HTML
<p data-text="Lorem ipsum dolor"> Lorem ipsum dolor </p>
```

```CSS
p {
    position: relative;
    color: transparent;
    background-color: #E8A95B;
    background-clip: text;
}
p::after {
    content: attr(data-text);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(120deg, transparent 0%, transparent 6rem, white 11rem, transparent 11.15rem, transparent 15rem, rgba(255, 255, 255, 0.3) 20rem, transparent 25rem, transparent 27rem, rgba(255, 255, 255, 0.6) 32rem, white 33rem, rgba(255, 255, 255, 0.3) 33.15rem, transparent 38rem, transparent 40rem, rgba(255, 255, 255, 0.3) 45rem, transparent 50rem, transparent 100%);
    background-clip: text;
    background-size: 150% 100%;
    background-repeat: no-repeat;
    animation: shine 5s infinite linear;
}
@keyframes shine {
        0% {
                background-position: 50% 0;
        }
        100% {
                background-position: -190% 0;
        }
}
```

去掉伪元素的 `background-clip: text`，就能看懂原理：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/459af1f218d640a787dd81023f803996~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整代码戳这里：[CodePen Demo -- shine Text && background-clip](https://codepen.io/Chokcoco/pen/OJbEOmb)

**总结一下，当文字内部图案不再是规则的纯色，我们就应该想到使用** **`background-clip`** **进行裁剪实现。**

## background 与 display: inline

继续下一个模块，本模块，我要再介绍一种与 background 相关，非常有意思的用法。

**那就是 background 在** **`display: inline`** **和** **`display: block`** **下的不同表现**。

其表现为 `display: inline` 内联元素的 `background` 展现形式与 `display: block` 块级元素（或者 `inline-block`、`flex`、`grid`）不一致。

简单看个例子：

```HTML
<p>Lorem .....</p>
<a>Lorem .....</a>
```

这里需要注意，`<p>` 元素是**块级元素**，而 `<a>` 是**内联元素**。

我们给它们统一添加上一个从绿色到蓝色的渐变背景色：

```
p, a {
  background: linear-gradient(90deg, blue, green);
}
```

看看效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d20213b10a3b40ed8dbcfbe50192fed8~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

什么意思呢？区别很明显，块级元素的背景整体是一个渐变整体，而内联元素的每一行都是会有不一样的效果，整体连起来串联成一个整体。

基于上述的 Demo，我们可以给它们添加一个 `background-size` 的动画。像是这样：

```HTML
<p>Lorem .....</p>
<a>Lorem .....</a>
```

```CSS
p, a {
    color: #000;
    background: linear-gradient(90deg, blue, green);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    transition: all 1s linear;
}

p:hover ,
a:hover {
    background-size: 0 100%;
}
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c75b15675d7449669e409168c2a1e8c5~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整代码戳这里：[CodePen Demo -- background & display Animation DEMO](https://codepen.io/Chokcoco/pen/PoBPbOB)

就可以得到这样不同的动画，可以看到，在 `display: inline` 的 `<a>` 标签下，动画效果是以行为单位进行变换的。


### 多行文本的渐隐消失

基于这个特性，我们可以很轻松地实现**多行文本的渐隐消失**。

我们可以构造这样一种布局：

```HTML
<p>
  <a>Mollitia nostrum placeat consequatur deserunt velit ducimus possimus commodi temporibus debitis quam
  </a>
</p>
```

```CSS
p {
    position: relative;
    width: 400px;
}
a {
    background: linear-gradient(90deg, transparent, transparent 70%, #fff);
    background-repeat: no-repeat;
    cursor: pointer;
    color: transparent;
    
    &::before {
        content: "Mollitia nostrum placeat consequatur deserunt velit ducimus possimus commodi temporibus debitis quam";
        position: absolute;
        top: 0;
        left: 0;
        color: #000;
        z-index: -1;
    }
}
```

这里需要解释一下：

1.  为了利用到实际的内联元素的 `background` 的特性，我们需要将实际的文本包裹在内联元素 `<a>` 内；
1.  实际的文本，利用了 `opacity: 0` 进行隐藏，实际展示的文本使用了 `<a>` 元素的伪元素，并且将它的层级设置为 `-1`，目的是让父元素的背景可以盖过它；
1.  `<a>` 元素的渐变为从透明到白色，利用它去遮住下面的实际用伪元素展示的文字，实现文字的渐隐。

这样，我们就能得到这样一种效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db65edf80ed54b9dbc591deb51588da0~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

这里，`<a>` 元素的渐变为从透明到白色，利用后面的白色逐渐遮住文字。

如果我将渐变改为从黑色到白色（为了方便理解，渐变的黑色和白色都带上了一些透明），你能很快明白这是怎么回事：

```CSS
a {
    background: linear-gradient(
      90deg, 
      rgba(0,0,0, .8), 
      rgba(0,0,0, .9) 70%, 
      rgba(255, 255, 255, .9)
    );
}
```

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf272d99921b4cd5bb32a463de23bc8f~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

完整的代码，你可以戳这里：[CodePen Demo -- Text fades away](https://codepen.io/Chokcoco/pen/xxWPZmz)

### 文字 hover 动效

还是利用上述的技巧，通过巧妙改变 `background-size` 与 `background-position` 属性，可以实现一些非常有意思的文字 hover 效果。

先看这样一个 Demo，核心代码作用于被 `<p>` 标签包裹的 `<a>` 标签之上：

```HTML
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. <a>Mollitia nostrum placeat consequatur deserunt velit ducimus possimus commodi temporibus debitis quam</a>, molestiae laboriosam sit repellendus sed sapiente quidem quod accusantium vero.</p>
```

```CSS
a {
    background: linear-gradient(90deg, #ff3c41, #fc0, #0ebeff);
    background-size: 0 3px;
    background-repeat: no-repeat;
    background-position: 0 100%;
    transition: 1s all;
    color: #0cc;
}
a:hover {
    background-size: 100% 3px;
    color: #000;
}
```

我们虽然设定了 `background: linear-gradient(90deg, #ff3c41, #fc0, #0ebeff)`，但是一开始默认它的 `background-size: 0 3px`，也就是一开始是看不到下划线的，当 hover 的时候，改变 `background-size: 100% 3px`，这个时候，就会有一个 `0 3px` 到 `100% 3px` 的变换，也就是一个从无到有的伸展效果。

看看最后的效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3525d1c7fb3a46319909ceab4c956e37~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

这里设定的 `background-position` 是 `0 100%`，如果设定的 `background-position` 是 `100% 100%`，我们可以得到一个反向的效果：

```CSS
// 其他都保持一致，只改变 background-position，从 0 100% 改为 100% 100%a {
    ...
    background-position: 100% 100%;
    ...
}
```

再看看效果，你可以对比着上面的动图看看具体的差异点在哪：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c8199d32463449ec99bf19724c882be1~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整代码戳这里：[CodePen Demo -- background underline animation](https://codepen.io/Chokcoco/pen/QWdgLwp)

OK，如果我们使用 `background` 实现两条重叠的下划线，再利用上述的两个不同的 `background-position` 值，我们就可以得到一个更有意思的下划线 hover 效果。

CSS 代码示意，注意看两条使用 background 模拟的下划线的 `background-position` 的值是不一样的：

```CSS
a {
    background: 
        linear-gradient(90deg, #0cc, #0cc),
        linear-gradient(90deg, #ff3c41, #fc0, #8500d8);
    background-size: 100% 3px, 0 3px;
    background-repeat: no-repeat;
    background-position: 100% 100%, 0 100%;
    transition: 0.5s all;
    color: #0cc;
}
a:hover {
    background-size: 0 3px, 100% 3px;
    color: #000;
}
```

可以得到这样一种效果，其实每次 hover， 都有两条下划线在移动：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b6854574111464b907746ad43f4812a~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整代码戳这里：[CodePen Demo -- background underline animation](https://codepen.io/Chokcoco/pen/MWJogjQ)

是的，掌握了 `background` 在 `display: inline` 下的一些特性，就可以利用它去完成各种有意思的文字交互效果。

## 冷门属性 `background-attachment`

最后，再介绍一下 background 中一个比较冷门的属性 ：`background-attachment`。

`background-attachment` 算是一个比较生僻的属性，基本上平时写业务样式都用不到这个属性。但是它本身很有意思。

`background-attachment`：如果指定了 `background-image` ，那么 `background-attachment` 决定背景是在视口中固定的还是随着包含它的区块滚动的。

单单从定义上有点难以理解，随下面几个 Demo 了解下 `background-attachment` 到底是什么意思。


### `background-attachment: scroll`

**scroll** 此关键字表示背景相对于元素本身固定， 而不是随着它的内容滚动。

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e37498c70854381b94be0b08e0ae1f0~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

### `background-attachment: local`

**local** 此关键字表示背景相对于元素的内容固定。如果一个元素拥有滚动机制，背景将会随着元素的内容滚动，并且背景的绘制区域和定位区域是相对于可滚动的区域而不是包含它们的边框。

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4847ced2fdaf404fb9ac1690a26b4721~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>


### `background-attachment: fixed`

**fixed** 此关键字表示背景相对于视口固定。即使一个元素拥有滚动机制，背景也不会随着元素的内容滚动。

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8da95c0b691d4e63b4e0e30225292170~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

需要注意的是，看上去 scroll 与 fixed 的效果是一样的，实则不然。

scroll 与 fixed，一个是相对元素本身固定，一个是相对视口固定，有点类似 `position` 定位的 `absolute` 和 `fixed`。如果我们拖动页面大小，会发现 `background-attachment: fixed` 的图片在变换，这是因为里面的图片是基于视口进行定位的，如下图：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1fc08a7a15ab4e239fc27fdb28684352~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 可以点击 Demo，感受下 3 种不同取值的不同效果：[CodePen Demo -- bg-attachment Demo](https://codepen.io/Chokcoco/pen/xJJorg)


### 使用 `background-attachment` 实现滚动视差

虽然 `background-attachment` 有一些冷门，但是在一些特殊交互上有着不错的表现。

最常见的，便是使用 `background-attachment` 实现滚动视差。像是一些企业级官网非常常见的全屏幕滚动视差特效，譬如这样：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8dbbd4bee6e42bbbac491ee15f7306c~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>


怎么实现呢？利用的就是 `background-attachment: fixed` 的特性。其实核心代码非常简单，HTML 代码如下：

```HTML
<section class="g-img">IMG1</section>
<section class="g-img">IMG2</section>
<section class="g-img">IMG3</section>
```

```CSS
section {
    height: 100vh;
}
.g-img {
    background-image: url(...);
    background-attachment: fixed;
}
```

不到 10 行的核心代码，就能实现滚动视差效果，可能很多同学看到这里会有一点懵逼，我们应该如何理解这段代码或者说这个效果呢？

1.  背景图都设定了 `background-attachment: fixed`，所以背景图都是相对页面视口进行定位的。
1.  通过滚动操作，改变的其实是不同的 `<section>` 在视口内的展示区域，通过这个区域的改变，这个区域内的背景图逐渐展现。

我们可以给上述 Demo，每个 `<section>` 添加一个边框，这样能辅助大家理解，变化的其实只是 `<section>` 在视口内的展示区域：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53c683e94f0942dfbda58747454d167d~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

这样应该能比较好的理解：**区域在变换，但是区域内的图片都是基于视口左上角进行定位的，视觉上造成了一种视差效果**！

> 完整的代码，你可以戳这里查看：[CodePen Demo - Pure CSS Scroll Parallax](https://codepen.io/Chokcoco/pen/oMPrGZ)

### 使用 `background-attachment` 实现滚动阴影

还有一个比较有意思的技巧：**结合 srcoll 与 local，实现一种伪滚动阴影**。

对于一些可滚动的元素而言，通常在滚动的时候会给垂直于滚动的一侧添加一个阴影，用于表明当前有元素被滚动给该滚出了可视区域，类似这样：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95980afd4a824d5297299240a565e1b8~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

可以看到，在滚动的过程中，会出现一条阴影：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8357ce38d46e4299ba31fe145ddbd308~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

滚动阴影的难点在于，初始没有滚动的时候是没有阴影展现的，只有当开始滚动，阴影才会出现。

所以这里，我们借助 `background-attachment: srcoll` 和 `background-attachment: local` 两个属性，在滚动初始的时候，利用两层背景叠加在一起隐藏阴影背景，真正滚动的时候，将叠加的部分移走，只漏出阴影部分即可。

嗯？什么意思。我们用给滚动容器，加上两个渐变效果，分别运用上 `background-attachment: srcoll` 和 `background-attachment: local`，再叠加起来，像是这样：

```HTML
 <!-- 可滚动容器 --> <ul> 
    <li>...</li>
    ...
    <li>...</li></ul> 
```

```CSS
// 情形一：
.g-one {
    background: linear-gradient(#fff, #f00);
    background-size: 100% 10px;
    background-repeat: no-repeat;
    background-attachment: local;
}

// 情形二：
.g-two {
    background: radial-gradient(at 50% 0, #000, #0f0 70%);
    background-size: 100% 10px;
    background-repeat: no-repeat;
    background-attachment: scroll;
}

// 情形三：
.g-combine {
    background: 
        linear-gradient(#fff, #f00),
        radial-gradient(at 50% 0%, #000, #0f0 70%);
    background-size: 100% 10px, 100% 10px;
    background-repeat: no-repeat;
    background-attachment: local, scroll;
}
```

实际效果就是这样，一个背景是随容器滚动，一个背景是随容器固定。

随容器滚动的背景充当初始的遮罩层：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/939b371138e145b39abc47143710f77d~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

OK，可以看到，当滚动的时候，最后一幅叠加的情况，其实就是我们需要的滚动的时候展示不同的颜色（阴影）的效果。我们调整一下两个渐变的颜色，遮罩层（`background-attachment: local`）为白色，再把固定不动的阴影层（`background-attachment: scroll`），利用径向渐变模拟为我们想要的阴影颜色。

CSS 核心代码如下：

```CSS
.g-final {
    background: 
        linear-gradient(#fff, transparent 100%),
        linear-gradient(rgba(0, 0, 0, .5), transparent 100%);
    background-size: 100% 50px, 100% 10px;
    background-repeat: no-repeat;
    background-attachment: local, scroll;
}
```

利用 `linear-gradient(rgba(0, 0, 0, .5), transparent 100%)` 线性渐变模拟了一层灰色阴影：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1341c1e08c9541c7946c9b32d274d34b~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

OK，大功告成。上述所有 Demo，可以戳这里看看：[CodePen Demo -- Pure CSS Scroll shadow](https://codepen.io/Chokcoco/pen/QWKmjKd)

然后，我们把这个技巧尝试直接运用在 `table` 里面，就基本还原了我们上面提到的滚动阴影效果。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/533904ae185c4abd8f3dda1e630d46aa~tplv-k3u1fbpfcp-zoom-1.image)

> 完整代码戳这里：[CodePen Demo -- Pure CSS Table scroll shadow](https://codepen.io/Chokcoco/pen/abmqMJQ)

当然，这个方式还是有一点瑕疵的。

**第一个是层叠顺序**。在上述的实现中，有个小问题，就是由于是使用背景 `background` 模拟的阴影，其实最终的效果，内容是在阴影（也就是文字叠在了阴影上方，而不是阴影覆盖了文字）。

虽然实际效果没有很大的差别，但是实际使用过程，还是需要进行一定的取舍。

**第二个是兼容性问题**。截至本文写作的当日，`Safari on iOS` 及 `Android Browser` 对 background-attachment 的支持度依旧不高，这个可能就是目前限制它大规模使用最大的一个障碍！

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e67b567c2c104cdb996443f27907b0ff~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

## 总结

好，到这里，本章节的内容已经非常之多了，我们来总结一下。

-   首先，我们介绍了 **5** 种不一样的，使用纯 CSS 制作的渐变背景的过渡动画的方式。

    -   通过 background-position 的移动模拟渐变动画；
    -   通过 background-size 的缩放过程来模拟渐变动画；
    -   通过外层的大渐变图形的移动（transform）来模拟渐变动画；
    -   通过滤镜 hue-rotate 实现渐变动画；
    -   使用 CSS @property 实现背景色渐变动画。

-   其次，介绍了 `background-clip` 及 `background-clip: text` 的具体应用，这里记住一个核心点：**当文字内部图案不再是规则的纯色，我们就应该想到使用** **`background-clip`** **进行裁剪实现** **。**

-   接着，介绍了 background 在 `display: inline` 和 `display: block` 下的不同表现形式，以及如何借助其完成酷炫的文字动画。

-   最后，介绍了 background 中偏冷门的 `background-attachment` 属性，以及利用它如何实现滚动视差交互及滚动阴影，当然不要忘记当前 `background-attachment` 可能存在一些兼容性问题。

不得不说的是，background 是我认为在 CSS 中最有意思且功能最为强大的属性，除了本文及上一篇基础技巧篇之外，background 还可以配合滤镜、混合模式、SVG 等属性碰撞出更多不一样的火花，更多高阶技巧会在后续章节中放出！

本文内容较多，大家需要好好吸收，有任何问题欢迎留言一起讨论。
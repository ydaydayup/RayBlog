本章我们正式进入关于混合模式相关技巧的介绍。混合模式有非常多种，我们不会也没必要一一介绍。

对于混合模式，核心在于我们得知道，什么时候混合模式可以派上用场，换言之，在遇到特定场景特殊需求的时候，我们应该想到，能够利用混合模式解决一些问题。

混合模式的核心就是：**描述当元素重叠时，颜色应当如何呈现**。

因此这些场景包括但不限于：

1.  两个图层或者元素之间希望产生交互作用，形成一些特殊效果；
1.  两个图层或者元素重叠后，想改变 / 隐藏元素中特定部分的颜色，譬如基于一张图片 / ICON，得到不同颜色的其他颜色的效果；
1.  文本与背景非常规展示，譬如创建独特的文本效果，又或者是譬如让文字在不同背景下都能产生强烈的反差效果。

下面，基于这些场景，我们进行逐一讲解。




## 利用混合模式让元素叠加部分产生特殊叠加色彩

首先，来看最简单的一种利用。

就是让多个不同的色块叠加在一起，让叠加部分产生特定的叠加颜色。这个在上一章的 Demo 中也有出现过。当然，我们会在此基础上做一些延伸。

譬如，我们可以首先实现这样一种 3 个元素围绕着互相运动的动画效果：

```HTML
<div class="container">
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>
```

```CSS
.container {
  position: relative;
}

.box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform-origin: 47% 47%;
}

.box:nth-child(1) {
  background-color: #0801fb;
  animation: turn 0.6s linear 0.4s infinite;
}

.box:nth-child(2) {
  background-color: #1ffe27;
  animation: turn 0.6s linear 0.2s infinite;
}

.box:nth-child(3) {
  background-color: #fd1a20;
  animation: turn 0.6s linear 0s infinite;
}

@keyframes turn {
  to {
    transform: rotate(360deg);
  }
}
```

将三个 div 元素，设置其旋转圆心为 `transform-origin: 47% 47%`，正常而言，默认的旋转圆心是 `50% 50%`，此处就是特意设置旋转圆心相对中心有一定的偏移。

然后，让设置了圆心为 `transform-origin: 47% 47%` 的元素，旋转起来。下图给出旋转圆心为中心点 `50% 50%` 和 `47% 47%` 两种情况：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1fabbdab823940dc84135501e14a9d0e~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

可以看到，当旋转圆心不是 `50% 50%` 时，元素在旋转过程中会一定幅度的抖动。

最后，设置三个圆按照不同动画延时（`animation-delay`）小幅度旋转起来，即可得到这样一种效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2df1660ede72444c877a0550ea5335d6~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

看上去没什么特殊的，我们可以通过给 `.box` 加上一个混合模式 `mix-blend-mode: screen`，让重叠部分变成白色。

```CSS
.box {
    mix-blend-mode: screen;
}
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0f966be0ee54a43b3b54be60cc00be3~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

`mix-blend-mode: screen` 意为滤色混合模式，是一种能够将图像色彩提亮的混合模式。也就是两个颜色同时投影到一个屏幕上的合成颜色。具体做法是把两个颜色都反相，相乘，然后再反相。简单记忆为“让白更白，而黑不变”。

这样，我们就得到了一种非常有意思的 Loading 效果。

> 完整的代码，你可以戳这里：[CodePen Demo - mix-blend-mode: screen](http://codepen.io/Chokcoco/pen/zwPyWj)

那么，重叠部分的颜色只能是白色么？当然不是，我们再看看这张表：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53278e3d39dc4850a5aec9c2416f453f~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

当我们希望重叠部分的颜色有不一样的效果的时候，可以基于上述混合模式表格，多尝试。

再看一个混合模式的典型应用：**抖音的 LOGO 制作**。

看看，抖音的 LOGO 的示意图如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71001c298d5847af9fa0000816abca15~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

第一眼看上去，抖音的 LOGO 像是由 3 个 `J` 形重叠在一起。然而实际情况，LOGO 是两个 `J` 形叠加的结果。

什么意思呢？其实是重叠部分表现为了白色，这与我们上面的 Demo 不是不谋而合了么？

使用混合模式非常好实现，我们来尝试一下，首先我们需要实现单个 `J` 形，示意图如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/62ede8c1831b4e6db1afc0dfde3249c1~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

单个 J 形其实是由 “3/4圆 + 竖线 + 1/4圆” 组成，使用一个标签即可完成（加上两个伪元素）。这里的核心关键点是：

1.  借助了元素的两个伪元素实现了整体 `J` 形结构；
1.  借助了 `mix-blend-mode: lighten` 混合模式实现两个 `J` 形结构重叠部分为白色的效果。

所以，利用 CSS 实现抖音 LOGO，整个效果只需要两个标签：

```HTML
<div class="j"></div>
<div class="j"></div>
```

CSS 代码如下（利用了 SASS 简化一些代码）：

```CSS
// 实现第一个 J
.j {
    position: absolute;

    &::before {
        content: "";
        ...
    }

    &::after {
        content: "";
        ...
    }
}

// 实现第二个 J，加上混合模式
.j:last-child {
    position: absolute;
    mix-blend-mode: lighten;

    &::before {
        content: "";
        ...
    }
    &::after {
        content: "";
        ...
    }
}
```

示意图如下（为了更好理解，加上了动画）：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1965da3ea84b4730912767b8b8ab9510~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整的 Demo，你可以戳这里：[使用 mix-blend-mode 实现抖音 LOGO](https://chokcoco.github.io/CSS-Inspiration/#/./blendmode/blend-douyin-logo)

细心的同学肯定会发现，上面 3 个 div 实现的 Loading 效果，使用了 screen 的混合模式，使得重叠部分为白色，而这里利用了 `mix-blend-mode: lighten`，同样实现了使得重叠部分为白色。

是的，这里其实使用 `mix-blend-mode: screen`也是完全 OK 的。这一点也需要牢记，并非每一种混合模式的效果都不一样。因此，具体使用的时候，多调试，选择最恰当符合我们要求的混合模式。

当然，有同学希望刨根问题，每一个混合模式的计算公式，到底是怎么计算的？没问题，我们可以翻看混合模式的官方规范 —— [W3C CSS Compositing and Blending Level 2](https://drafts.fxtf.org/compositing/#mix-blend-mode)，查看每一个混合模式具体的颜色叠加计算公式。

同时，我也找到了一个图文说明，大家可以配合学习（图片来源：[Photoshop 中高级进阶系列之一——图层混合模式原理](https://www.zcool.com.cn/article/ZMzcyNzY=.html)）：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/117908df3eb4404284b1fcdc2b83215f~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/675b160ed6624a7dac5aa2479b5b9f49~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>





## 利用混合模式实现图片效果的叠加

上面主要利用的是 `mix-blend-mode`，我们再来看看 `background-blend-mode`。

对于 `background-blend-mode`，最简单的应用就是将两个或者多个图片叠加在一起。

假设我们有两张图片，尝试利用背景混合模式 `background-blend-mode` 将它们叠加在一起：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/453fba8cce3b46e8a092a0951d94b5cc~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>


代码如下：

```HTML
<div></div>
```

```CSS
div {
    background: url($pic1), url($pic2);
    background-size: cover;
    background-blend-mode: lighten;
}
```

通过添加 `background-blend-mode: lighten` 混合模式，其整体效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/000687b06bfa41028c48fbe9f487ec52~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>


那这个技巧可以再具体一点，如何应用呢？

想象一下，如果两张图片的其中一张，不是一开始就叠在其上面，而是通过交互手段，譬如 Hover 状态，进行控制叠加，那会产生什么样的效果？

我们尝试一下，利用 `background-blend-mode` 背景混合模式制作点击或者 hover 时候的特殊交互效果。

OK，假设我们有这样一张原图：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/617a9a3c40644719ba6330c25f5b53a7~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

通过混合叠加不同的渐变背景色，配合 Hover 效果，实现如下效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df5140450b7e4c488d77e1968e67169a~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

代码也非常简单：

```CSS
div {
    width: 300px;
    height: 200px;
    background: url($img),linear-gradient(#f00, #00f);
    background-size: cover, 100% 100%;
    background-position: 0 0, -300px 0;
    background-blend-mode: luminosity;
    background-repeat: no-repeat;
    transition: .5s background-position linear;
}

div:hover { 
    background-position: 0 0, 0 0; 
}
```

> 完整的代码，你可以戳这里：[CodePen Demo --background-blend-mode && Hover](https://codepen.io/Chokcoco/pen/baejNL)

Demo 中的效果使用的 `background-blend-mode: luminosity` ，是一种色彩叠加型混合模式。当然，我们可以尝试不同的混合模式，有不一样的效果。





## 利用混合模式实现单张 ICON 的颜色控制技术

好，我们继续。利用混合模式，还有一种有意思的技巧：**实现一些 ICON 图片颜色的控制，实现任意颜色的转换**。

什么意思呢？假设有如下这样一张 ICON 图片，图片的格式不限（JPG、PNG、GIF），但有一个特殊要求，图片要求**内容主体为黑色纯色，背景为白色**：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e14e8ba1d834e669ecb1b3ca1b997a3~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>


通过 `background-blend-mode`，以及 background 是可以支持多重背景这个技巧，我们在图片元素的上方，再多叠加一层颜色效果 A，最后通过设置 `background-blend-mode: lighten` 混合模式，将图片的主体颜色，也就是黑色部分，替换为上面的颜色效果 A。

尝试一下，代码示意如下：

```CSS
.pic {
    width: 200px;
    height: 200px;
    background-image: url($img);
    background-size: cover;
}

.pic1 {
    background-image: url($img), linear-gradient(#f00, #f00);
    background-blend-mode: lighten;
    background-size: cover;
}
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/40f92fa4ae204545bc3cd6f84b252fa6~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

解释一下：

1.  这里的关键点在于理解 `background-image: url($img), linear-gradient(#f00, #f00)` ，这里相当于有两层背景：

    -  一层是原始的图案，也就是 `url($img)`；
    -  另外一层则利用渐变 `linear-gradient(#f00, #f00)` 实现的一层红色背景。

1.  接着，通过混合模式 `background-blend-mode: lighten` 让红色与图片的黑色重叠部分变为红色，而红色与图片的白色重叠部分，仍旧是白色。

1.  基于此，实现了一个 ICON 图片的色彩转变。


其实原理就是这样，非常好理解，**两层元素叠加在一起，一层是原图，另外一层是颜色层，再设置一个混合模式**，仅此而已：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bdba9cfb54af4a4a98a8549cb5302ed6~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

当然，需要注意的是，这里 `background-image: url($img), linear-gradient(#f00, #f00)` 的先后顺序是无所谓的，反过来也可以得到同样的效果。

并且，此方法有意思之处在于不仅可以将原本的纯色图片，由一种颜色 A 改为另一种颜色 B，甚至可以将图片内的黑色部分由原本的纯色，改为渐变颜色！本质就是将上述的 `linear-gradient(#f00, #f00)` 渐变层内的色值改为渐变颜色即可。

直接上代码：

```CSS
.pic {
    background-image: url($img), linear-gradient(#f00, #00f);
    background-blend-mode: lighten;
    background-size: cover;
}
```

在这里，`linear-gradient(#f00, #00f)` 实现的是一层渐变颜色，最终叠加运用混合模式后，可以得到这样的效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9303cc7762094bf9a11a869e93bb892c~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

不仅仅是 `linear-gradient`，改成 `conic-gradient` 和 `radial-gradient` 都是可以的。

> 完整的代码，你可以戳这里：[CodePen Demo -- 纯色图片赋色技术尝试](https://codepen.io/Chokcoco/pen/rpLryX)

当然，这个方法也是存在一定缺陷的，那就是对于图片本身是有一定要求的。上述方法**要求图片本身内容为纯色黑色，底色为白色**。

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0743e0d3a37e4f5583cc5689810fe410~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

如果是一张 PNG 图片一样，只存在主色，而底色是透明的，是否能够同样实现效果呢？我们尝试一下。

假设我们有一张这样的 PNG 图片（灰色主色，透明底色）：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7172535d180943898ce164f2c238b220~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

按照上面的方式实现一遍，结果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4ed00a7603543fd9d792bb2d28e046d~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整代码，戳这里：[任意颜色赋色技术尝试 -- PNG 图片](https://codepen.io/Chokcoco/pen/RxRBzy)

可以看到，当图片的底色是透明色而不是白色时，利用了混合模式后，背景部分的颜色变成了叠加层的颜色，导致无法实现我们想要的颜色转换。

当然，如果我们有这么一张底色透明的图片，利用在 mask 章节提到的 `mask-composite`，也是可以实现任意颜色转换的。因此，掌握了 `mask` 和混合模式后，我们就可以通过一个基础的 ICON 图，衍生得到其他颜色的 ICON 图。

再来一个有意思的实战例子，我们可以通过这个技巧，将普通的白底黑字二维码，转换成酷炫有色彩的二维码。

像是这样：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e641129ba89407c8274395223f1e664~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

代码也非常简单，使用 `mix-blend-mode` 或者 `background-blend-mode` 都是可以的。有的时候，我们如果不想写多重的 `background`，利用元素的伪元素配合 `mix-blend-mode`，也是可以很好地替换`background-blend-mode` 的效果：

```HTML
<div class="g-container">
    <img src="qrcode.png">
</div>
```

```CSS
.g-container {
    position: relative;
    width: 200px;
    height: 200px;
    
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: linear-gradient(45deg, #673ab7, #ff5722);
        mix-blend-mode: lighten;
    }
}
```


这里，由于是 `img` 元素的图片，我们无法 `background-blend-mode`。因此，在这个 Demo 中，原二维码 `img` 为一层，然后通过一个伪元素，设置了渐变图案并且叠加在其之上，最后设置 `mix-blend-mode: lighten` 即可实现彩色二维码效果。

> 完整的代码，你可以戳这里：[CodePen - Make A Gradient QrCode](https://codepen.io/Chokcoco/pen/XWzPEXW)





## 利用混合模式实现元素内容的置灰

下面这个技巧非常有意思。

在滤镜章节中，我们有讲过，利用 `backdrop-filter` 来实现网站的首屏置灰。（如果忘记了的同学，可以回过头看看。）

而如果我们不需要整个站点的置灰，只需要置灰首屏内容或者部分内容，其实除了 `backdrop-filter` 之外，还可以使用混合模式实现。

假设，我们有这么一个页面：

```HTML
// 模拟完整页面
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
...
```

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c5b38f0189f48489083f9a71470f30b~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

我们可以快速借助混合模式 `mix-blend-mode: color` 实现首屏的置灰遮罩效果，看看代码：

```CSS
html {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: scroll;
    background: #fff;
}
html::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 1);
    mix-blend-mode: color;
    pointer-events: none;
    z-index: 10;
}
```

首先，通过 HTML 元素的伪元素，叠加了一层额外的元素在整个页面的首屏，并且把它的背景色设置成了黑色 `background: rgba(0, 0, 0, 1)`，正常而言，网站应该是一片黑色的。

但是，神奇的地方在于，通过混合模式的叠加，也能够实现网站元素的置灰。我们来看看效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/efc92ac9778247d3a2141b8789125f36~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

经过实测：

```CSS
{
  mix-blend-mode: hue;            // 色相
  mix-blend-mode: saturation;     // 饱和度
  mix-blend-mode: color;          // 颜色
}
```

上述 3 个混合模式，叠加一个黑色背景，都是可以实现内容的置灰的。

值得注意的是，上述方法，我们需要给 HTML 设置一个白色的背景色，同时，不要忘记了给遮罩层添加一个 `pointer-events: none`。

> 完整的代码，你可以看看这里：[CodePen Demo -- Gray Website By MixBlendMode](https://codepen.io/Chokcoco/pen/poKOmxp)





## 利用混合模式实现各式文字效果

文字和背景，也是非常适合使用混合模式来构建一些特殊的效果的。

我们再来看看，基于混合模式的背景和文字，又能碰撞出什么样的花火。


### 基于混合模式实现类 `background-clip` 的效果

在之前 `background` 的章节中，介绍了利用 `background-clip: text` 实现的文字裁切效果，可以使得仅仅文字部分透出后面的背景。

像是下面这样：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb30e7ee560a473b87556c785b770ca7~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

除去 `background-clip: text` 外，使用混合模式，其实有办法实现类似的效果。

我们只需要构造出黑色文字、白色底色的文字元素，再叠加上相应的图片，最后运算 `mix-blend-mode` 即可，简单原理如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5b870a4d1fe442895c26610cd34c32e~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

核心代码如下，可以看看：

```HTML
<div class="container">
    <div class="pic"></div>
    <div class="text">IMAGE</div>
</div>
```

```CSS
.pic {
    position: relative;
    width: 100%;
    height: 100%;
    background: url($img);
    background-repeat: no-repeat;
    background-size: cover;
}

.text {
    position: absolute;
    width:100%;
    height:100%;
    color: #000;
    mix-blend-mode: lighten;
    background-color: #fff;
}
```

这里还是运用了 `mix-blend-mode: lighten`，核心的点在于，文字黑色部分变成了图片相应部分的内容，而元素的白色底色，保持不变。

> 完整的代码，你可以戳这里：[CodePen Demo -- mix-blend-mode && TEXT IMAGE](https://codepen.io/Chokcoco/pen/xpgwPN)


### 利用混合模式实现文字与背景的高对比度展示

还有一类非常实用的文字与背景配合混合模式的用法。也就是利用 `mix-blend-mode: difference` 差值模式，实现文字与背景的高对比度展示。

来看这么一个场景：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f345c401d7494adfa18f509977c8ff72~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

文本在黑色底色上表现为白色，在白色底色上表现为黑色。看似很复杂的一个效果，但利用混合模式 `mix-blend-mode: difference`可谓手到擒来。

`mix-blend-mode: difference`意为**差值模式**。该混合模式会查看每个通道中的颜色信息，比较底色和绘图色，用较亮的像素点的像素值减去较暗的像素点的像素值。

其效果就是与白色混合将使底色反相；与黑色混合则不产生变化。因此，上方图层的亮区将下方图层的颜色进行反相，暗区则将颜色正常显示出来，**效果与原图像是完全相反的颜色**。

利用这个技巧，我们可以非常轻松地实现：

```HTML
<div></div>
```

```CSS
div {
    height: 100vh;
    background: linear-gradient(30deg, #000 0, #000 50%, #fff 50%);

    &::before {
        content: "混合模式";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        mix-blend-mode: difference;
        animation: move 3s infinite linear alternate;
    }
}
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1515ef0e79a1486ebb130fff484dd70b~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

当给这个效果添加上对应的动画，就是上面的动图效果：

```CSS
@keyframes move {
    0% {
        transform: translate(-30%, -50%);
    }
    100% {
        transform: translate(-70%, -50%);
    }
}
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/faffe028a7704b2f834ac6f9d1381798~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

配合不同的利用背景效果，可以用这个来实现一些有趣的标题效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/73ba779636914f25ad59d59ceb313ab0~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整的代码，你可以戳这里：[CodePen Demo -- Radial-gradient + Mix-blend-mode](https://codepen.io/Chokcoco/pen/GRpzYxE)

又或者，有这么一种场景，有的时候，无法确定文案背景颜色的最终表现值（因为背景颜色的值可能是后台配置，通过接口传给前端），但是，我们又需要能够让文字在任何背景颜色下都正常展现（譬如当底色为黑色时文字应该是白色，当背景为白色时，文字应该为黑色）。

此时，就可以尝试使用 `mix-blend-mode: difference`去解决这种问题：

```HTML
<ul class="flex-box"><div class="box"><p>开通会员查看我的VIP等级</p></div>
   // ..... 
</ul>
```

```CSS
div {
    // 不确定的背景色
}
p {
    color: #fff;
    mix-blend-mode: difference;
}
```

这样，无论背景色是什么颜色，设置了 `mix-blend-mode: difference` 的 `<p>` 元素都可以以一种高颜色对比度的方式，正常展示出文本内容：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/551e20aab12b419f9f42d2bc6f4b86fe~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整代码，戳这里：[CodePen Demo -- mix-blend-mode:difference 实现文字颜色自适应底色](https://codepen.io/Chokcoco/pen/EJgEzL)





## 总结一下

OK，到此，我们介绍了几种 CSS 中混合模式常用的一些偏技巧的用法，记住，当遇到下面的一些场景的时候，我们可以尝试利用混合模式解决问题：

1.  两个图层或者元素之间希望产生交互作用，形成一些特殊效果；
1.  两个图层或者元素重叠后，想改变 / 隐藏元素中特定部分的颜色，譬如基于一张图片 / ICON，得到不同颜色的其他颜色的效果；
1.  创建独特的文本效果，譬如让文字在不同背景下都能产生强烈的反差效果。

而本文，我们具体列举了下面一些实际场景案例，我们再一起回顾一下，它们是：

1.  利用混合模式让元素叠加部分产生特殊叠加色彩；
1.  利用混合模式实现图片效果的叠加；
1.  利用混合模式实现单张 ICON 的颜色控制技术；
1.  利用混合模式实现元素内容的置灰；
1.  利用混合模式实现各式文字效果。

当然，本章更多的是在围绕静态的一些效果进行讲解，在下一章中，我们将从动画的角度继续探索，看看利用混合模式制作出的一系列惊艳效果！不要错过。

好的，本章节到此结束，大伙还有什么疑问，可以在评论区一起讨论。
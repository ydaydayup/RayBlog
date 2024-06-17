本章，将开启新的篇章，主题是**阴影**。在 CSS 中，阴影看似简单，实则千变万化，核心有两个点：

1.  阴影效果并非一定是由阴影属性实现的。

    譬如我想实现一个下述所示的立体阴影效果，就不是用常见的阴影属性实现的。

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d12f4cd52ef4381bf011ba89addd981~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

2.  阴影属性并非只能实现阴影。

    像是如下这个图形，能想象是用阴影绘制的吗？

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6e27716c7a34cb58adbe6871c149a17~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

在接下来的两章中，我们将深入到 CSS 的阴影中，一起探索 CSS 阴影的奇妙。



## CSS 阴影基础

CSS 中，明面上可以实现阴影的有**三个属性**：

-   box-shadow，盒阴影；
-   text-shadow，文字阴影；
-   filter: drop-shaodw()，滤镜内的阴影。

关于它们的基础语法和使用就不过多描述，这一部分大家可以先在 MDN 补齐，贴几张图快速复习一下：

`box-shadow` - 盒阴影：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b77108961554797a9af1f0d3c5b87bc~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

`text-shadow` - 文字阴影：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7104ca8fa4eb4bf6a63610cd38ef7e80~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

`filter: drop-shaodw()` - 滤镜内的阴影：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f0bab5ec3d8c4cd5aad095f0ac9a4d01~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

基本上 3 种阴影大同小异，需要注意的就是：

-   `box-shadow` 还区分内阴影，内阴影使用关键字 `inset` 进行描述；
-   `box-shadow` 多一个阴影扩散半径参数。

接下来，进入本文的正题，本文将会介绍使用 CSS 实现各类不同类型的阴影。有一个需要注意的点是，**有的时候看起来是阴影，但是它不一定是用上述 3 种阴影属性实现的。**




## 阴影一：CSS 中的最普通的阴影

首先，来看看 CSS 中，最常见也是**最普通的盒阴影效果**。当然，这也是通常而言，我们使用最多的阴影：

```CSS
div {
    box-shadow: 4px 4px 4px 2px #999;
}
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1730e8b6576b4553943fa89de6a573c3~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

当然，我们也可以使用 `filter: drop-shadow()` 实现盒阴影：

```CSS
div {
    filter: drop-shadow(4px 4px 2px #999);
}
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0026da2c2984484c869466dfca2502a7~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

还有最常见的**文字阴影**效果：

```CSS
p {
    text-shadow: 6px 6px 4px #999;
}
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd345df421284b1eae18efe5341b81dc~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

但是，在 CSS 中，除了这些常见的阴影，其实还有很多有意思的阴影效果，继续往下看。




## 阴影二：单侧阴影

接下来，我们来看看单侧的阴影。关于 `box-shadow`，大部分同学对它的使用更多的还是停留在生成一个两侧或者四侧的阴影。

类似如下两种常见的使用方式：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c83f28525baf493d8e3ddfaddd750d38~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>


那么问题来了，如果希望元素只有一侧存在阴影，应该怎么做呢？

我们来看看 box-shadow 的用法定义：

```CSS
{
    box-shadow: none | [inset? && [ <offset-x> <offset-y> <blur-radius>? <spread-radius>? <color>? ] ]#
}
```

以 `box-shadow: 2px 4px 6px 8px #000` 为例，其中的 4 个数值的含义分别是：

1.  x 方向偏移值；
1.  y 方向偏移值；
1.  阴影的模糊半径；
1.  阴影的扩张半径。

这里就需要介绍一个非常有用的技巧：**阴影的扩张半径可以为负值**。

什么意思呢？我们可以设置元素的阴影的模糊半径与它的扩张半径一样，但是，扩张半径为相等的负值。

此时，元素将看不到任何阴影，这是由于生成的阴影将被遮挡在整个元素之下。

基于这种情况，我们只需要再给元素设定任意一个方向的偏移值，即可实现某个方向上的单侧阴影效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc62376ff63c4f818a85230b054b5971~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 相关代码，你可以戳这里：[CodePen Demo -- CSS 单侧阴影](https://codepen.io/Chokcoco/pen/pergRb)

当然，可以看到，上面的单侧阴影有明显的问题，就是阴影的大小相对元素而言较小，只能是缩在整个元素的下方。

如果想要单侧阴影的范围更大，就需要利用到我们在之前讲到的 `clip-path`，利用它进行元素的裁剪，只保留单侧的阴影效果。

譬如，我们想要这样的单侧光影效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c075334f40b443fab11e23883b27339~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

可以通过 `clip-path` 裁剪得到：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76d5de2d55d0402dad85cbc959709746~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

核心代码如下：

```CSS
div {
    width: 200px;
    height: 200px;
    background: #fff;
    box-shadow: .....;
    clip-path: polygon(-100% 100%, 200% 100%, 200% 500%, -100% 500%);
}
```




## 阴影三：立体阴影

好，我们继续。下一个主题是**立体阴影**。

这个说法很奇怪，因为阴影的出现本就是为了给元素增加立体感，所以所谓的「立体阴影」是什么意思呢？

所谓的「立体阴影」，并不一定非要使用 `box-shadow`、`text-shadow` 或 `drop-shadow` 等属性来实现，而是可以通过使用其他元素或属性模拟元素的阴影。这样做是为了突破 `box-shadow` 等属性的定位、样式表现等方面的局限，从而更灵活地控制阴影的位置、大小和模糊度。

让我们看一个例子，如果我们想要让一个元素更具立体感，可以通过自定义阴影的位置来实现：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d1c61ea44924445bee48ca069ad84dd~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

上图中，元素只设置了一个非常浅色的 `box-shadow` ，整体而言，看上去并不是非常的立体。

接下来，我们通过 div 的伪元素，在图形的下方生成一个和原图边角形状类似的矩形图形，再借助 transform 调整一下位置，得到如下的一种效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d0140e1fe62c4716be9cee4f4bfae55f~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

接着，最后利用 `filter: blur()` 或者 `box-shadow` 对这个用伪元素生成的模拟阴影进行一定的虚化效果。如此一来，就巧妙地实现了一个边角看起来像被撕开的立体效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3386cbd3ca64430789d8e8d6f2df70bb~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

代码非常简单，伪 CSS 代码示意如下：

```CSS
div {
    position: relative;
    width: 600px;
    height: 100px;
    background: hsl(48, 100%, 50%);
    border-radius: 20px;
}

div::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 5%;
    right: 5%;
    bottom: 0;
    border-radius: 10px;
    background: hsl(48, 100%, 20%);
    transform: translate(0, -15%) rotate(-4deg);
    transform-origin: center center;
    box-shadow: 0 0 20px 15px hsl(48, 100%, 20%);
}
```

总结一下：

-   要制作立体阴影，关键在于基于元素的伪元素，生成一个大小与父元素相近的元素，通过位移形变等手段将其进行 rotate 以及定位到合适位置，再赋予模糊操作；
-   颜色运用也至关重要，通常阴影的颜色比原本的颜色更深。使用 HSL 颜色表示方式更容易操作，其中 L 通道可以控制颜色的明暗度。

再看一个例子，我们来实现这样一个立体阴影效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9b5f054ab424ba9a58b481af3c4eb52~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

其两侧的阴影效果，其实也是通过两个伪元素，再背后的叠加形成。看看这个动图：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76126a0518c3405999df85a4a84b7dc0~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 代码就不贴了，与上述效果是一样的，完整的代码，你可以戳这里：[CodePen Demo -- 立体投影](https://codepen.io/Chokcoco/pen/LgdRKE?editors=1100)



## 阴影四：浮雕阴影

还有一类立体效果的阴影就是浮雕阴影，它的本质还是 `box-shadow` 和 `text-shadow`，只是需要控制好颜色的配合以及内外阴影的一起使用。核心就是 2 点：

1.  背景色与内容（文本或者盒子颜色）一致；
1.  **使用两个相反的方向，使用两组对比明显的颜色值，来实现凹凸效果**。

首先，我们来看一个文字版的浮雕效果。

先实现一个凸起的效果，我们需要实现一个背景色和文字色一样的文字：

```HTML
<div>浮雕阴影</div>
```

```CSS
body {
    background: #999;
}
p {
    color: #999;
}
```

效果如下，由于背景色和文字色的颜色一样，所以我们什么都看不到。

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/359eb097393a415e821779a5ed203edb~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

不过没事，我们给文字添加一个 `1px` x、y 方向的黑色阴影：

```CSS
p {
    color: #999;
    text-shadow: 1px 1px 1px #000;
}
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5009a14d3159471b8604ebbc156341d7~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

有点感觉了，再反向，也就是 `-1px` x、y 方向添加一个与黑色相对的白色阴影：

```CSS
p {
    color: #999;
    text-shadow: 
        1px 1px 1px #000, 
        -1px -1px 1px #fff;
}
```

效果如下，这样我们就得到了一个凸起质感的浮雕阴影：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4113d9f8a7b34e5bb6500b2a42f50936~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

如果我们把颜色对调一下呢？

```CSS
p {
    color: #999;
    text-shadow: 
        1px 1px 1px #fff, 
        -1px -1px 1px #000;
}
```

就能很轻松的得到凹下质感的浮雕阴影：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a987f249968947cc96300a31597e6ae6~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 上述 Demo 的完整代码：[CodePen Demo - Embossed Shadow](https://codepen.io/Chokcoco/pen/yLPmMXM)



## 阴影五：新拟态风格阴影

我们将运用在文字上的技巧，扩展延伸到容器上，就能得到最近比较火的拟态风格阴影，其原理也是大同小异。

两个阴影，使用两个相反的方向，使用两组对比明显的颜色值，来实现凹凸效果。**与文字不同的是，这里的凹效果，我们需要使用盒子的内阴影实现**。

```HTML
<div>浮雕阴影</div><div>浮雕阴影</div>
```

```CSS
div {
    width: 120px;
    height: 120px;
    background: #e9ecef;
    color: #333;
    box-shadow:
        7px 7px 12px rgba(0, 0, 0, .4),
        -7px -7px 12px rgba(255, 255, 255, .9);
}

div:nth-child(2) {
    box-shadow:
        inset -7px -7px 12px rgba(255, 255, 255, .9),
        inset 7px 7px 12px rgba(0, 0, 0, .4);
}
```

这样，就可以得到拟态风格的按钮，如下图所示，左凸右凹：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f8536fac7700496dbbe526c5339c5be2~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

再通过一个简单的过渡，就可以实现整个点击的交互：

```CSS
div {
    transition: .2s all;
    box-shadow:
        7px 7px 12px rgba(0, 0, 0, .4),
        -7px -7px 12px rgba(255, 255, 255, .9),
        inset 0 0 0x rgba(255, 255, 255, .9),
        inset 0 0 0 rgba(0, 0, 0, .4);
    
    &:active {
        box-shadow:
            0 0 0 rgba(0, 0, 0, .4),
            0 0 0 rgba(255, 255, 255, .9),
            inset -7px -7px 12px rgba(255, 255, 255, .9),
            inset 7px 7px 12px rgba(0, 0, 0, .4);
    }
}
```

看看效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2bfb30b9198743eaa09136e707eb0ac3~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 详细完整的代码，你可以戳这里：[CodePen Demo -- Embossed Shadow 拟态风格阴影](https://codepen.io/Chokcoco/pen/LYOwWzg)




## 阴影六：文字立体投影 / 文字长阴影

上面的立体效果在文字上就完全不适用了，所以对待文字的立体阴影效果，还需要另辟蹊径。

正常而言，我们会利用 `text-shadow` 生成文字的阴影效果，像这样：

```CSS
<div> Txt Shadow</div>
-----
div {
    text-shadow: 6px 6px 3px hsla(14, 100%, 30%, 1);
}
```

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f8447377b584bee996238a5820653a2~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

文字的阴影是有了，就是看上去不够立体。

那么如果希望得到立体的文字阴影，我们可以怎么做呢？常见的一种方式就是使用多层文字阴影的叠加。

这里有一个非常重要的知识点：`text-shadow` 和 `box-shadow` 一样，是可以叠加多层文字阴影的。

基于上面的文字，我们尝试反复叠加 50 层的文字阴影依次排列下来。

当然，手写 50 层的阴影代码，实在太痛苦了，还容易出错。好在我们有 CSS 预处理器 SASS/LESS，借助预处理器，封装一个可以生成 50 层阴影的函数就好，每层阴影向右和向下偏移 `1px`，代码如下：

```CSS
@function makeLongShadow($color) {
    $val: 0px 0px $color;

    @for $i from 1 through 50 {
        $val: #{$val}, #{$i}px #{$i}px #{$color};
    }

    @return $val;
}

div {
    text-shadow: makeLongShadow(hsl(14, 100%, 30%));
}
```

上面 `makeLongShadow(hsl(14, 100%, 30%))` 的代码，经过编译后，就会生成如下完整的 CSS 代码，包含了 50 层的文字阴影：

```CSS
div {
      text-shadow: 
        0px 0px #992400, 
        1px 1px #992400, 
        2px 2px #992400, 
        3px 3px #992400, 
        4px 4px #992400, 
        5px 5px #992400, 
        6px 6px #992400, 
        7px 7px #992400, 
        8px 8px #992400, 9px 9px #992400, 10px 10px #992400, 11px 11px #992400, 12px 12px #992400, 13px 13px #992400, 14px 14px #992400, 15px 15px #992400, 16px 16px #992400, 17px 17px #992400, 18px 18px #992400, 19px 19px #992400, 20px 20px #992400, 21px 21px #992400, 22px 22px #992400, 23px 23px #992400, 24px 24px #992400, 25px 25px #992400, 26px 26px #992400, 27px 27px #992400, 28px 28px #992400, 29px 29px #992400, 30px 30px #992400, 31px 31px #992400, 32px 32px #992400, 33px 33px #992400, 34px 34px #992400, 35px 35px #992400, 36px 36px #992400, 37px 37px #992400, 38px 38px #992400, 39px 39px #992400, 40px 40px #992400, 41px 41px #992400, 42px 42px #992400, 43px 43px #992400, 44px 44px #992400, 45px 45px #992400, 46px 46px #992400, 47px 47px #992400, 48px 48px #992400, 49px 49px #992400, 50px 50px #992400;
}
```

看看最终的效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/82129f3f46f14038b9fc9fb005817dc8~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

已经初步具备立体效果了，但是总感觉哪里不对。

那么问题是出在哪里呢？原因在于，阴影是存在透明度和明暗度的变化的。

因此，对于每一层的文字阴影，它们的透明度和明暗度应该是有个逐渐不断变化的。这个需求，借助预处理器 SASS 也可以很好的实现。

下面介绍两个有用的 SASS 颜色函数：

-   `fade-out` 函数可以修改颜色的透明度，让颜色基于基准色更加的透明；
-   `desaturate` 函数可以修改颜色的饱和度值，让颜色基于基准色更少的饱和。

> 了解更多关于 SASS 的颜色函数，可以点这里：[SASS 颜色函数](https://www.w3cplus.com/preprocessor/sass-color-function.html)

在这里，我们利用如上两个 SASS 颜色函数修改上面的函数代码，让每一层的颜色，逐渐地变化：

```CSS
 @function makelongrightshadow($color) {
    $val: 0px 0px $color;

    @for $i from 1 through 50 {
        $color: fade-out(desaturate($color, 1%), .02);
        $val: #{$val}, #{$i}px #{$i}px #{$color};
    }

    @return $val;
}
```

这样修改过后，看看最终效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de476078e66e429b83d39a3fe77718e5~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

颜色从接近文字的颜色到逐渐透明，整个文字的立体感强烈了不少。

> 完整的代码，你可以戳这里：[CodePen Demo -- 立体文字阴影](https://codepen.io/Chokcoco/pen/JmgNNa)

当然除了上述方法外，还有其他生成立体的文字阴影的方法。

下面再贴出一例，通过**透明色叠加底色的多重线性渐变，给文字添加了一个特殊的阴影效果，使之上看具有一定的立体感**：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d00c7f53882d43b081ae9f1fcb0ee3af~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 详细完整的代码，你可以戳这里：[线性渐变配合阴影实现条纹立体阴影条纹字](https://codepen.io/Chokcoco/pen/XxQJEB?editors=1100)



## 阴影七：长阴影 / 长投影

下一类有趣的阴影是**长阴影**。

假设我们想实现如下所示的一种阴影效果，又该如何实现呢？

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41854f83d87f47478082260dda48ffad~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

要生成这种长投影，也叠加 50 层阴影吗？显然不太优雅，这里的方式是借助元素的两个伪元素 `::before` 和 `::after`，拆解上面的图，其实是这样的：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9aae82682dcc4ff78612c36823f50031~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

关键点在于，我们通过对两个伪元素的 `transform: skew()` 变换以及从实色到透明色的背景色变化，实现了长投影的效果。

> 详细完整的代码，你可以戳这里：[CodePen Demo -- 线性渐变模拟长阴影](https://codepen.io/Chokcoco/pen/qJvVGy)




## 阴影八：彩色阴影 / 渐变阴影

在 CSS 中，大部分阴影效果都是单色的。

那如果我们想实现彩色阴影，又有什么方法呢？

彩色阴影当然也是可以的，在 CSS 中，最常见的实现彩色阴影的方式就是**通过** **`filter: blur()`** **模糊滤镜，作用给一个元素的副本，以此来生成颜色丰富的彩色阴影效果**。

假设我们有下述这样一张头像图片：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2a7d402085440e39864718b6c18410b~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

下面就利用滤镜，给它添加一层与原图颜色相仿的阴影效果，核心 CSS 代码如下：

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
        filter: blur(10px) brightness(80%) opacity(.8);
        z-index: -1;
    }
}
```

看看效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bff1e3937d7043da9db2d93d2906a063~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

此方法的步骤如下：

1.  利用元素的伪元素，生成了一个与原图一样的新图，并且将其叠加在原图之下；
1.  利用滤镜 `filter: blur()` 配合其他的亮度、对比度、透明度等滤镜，制作出与原图类似的虚幻的影子，伪装成原图的阴影效果。

其中，最为核心的代码就是 `filter: blur() brightness() opacity()`。

> 详细完整的代码，你可以戳这里：[CodePen Demo -- filter create shadow](https://codepen.io/Chokcoco/pen/eGYYpo)

又或者，我们想给元素的边框，添加一圈渐变彩色阴影，像是如下这样，我们应该怎么做呢？

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/059569a2475e4af185696c0642f26fb3~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

仔细看，这里的边框是渐变的，阴影也是渐变的：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf99a86927e84c35aa24c59b4e4ac309~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

这里的原理也是一样的。

1.  首先我们可以利用角向渐变实现一份角向渐变图形：

```CSS
div {
    background-image: conic-gradient(#ff4d00, #ffe600, #80ff00, #00ff1a, #00ffb3, #00b3ff, #001aff, #8000ff, #ff00e6, #ff004d 20%, transparent 20.5%, transparent
    );
}
```

得到这样一种效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6056522f63074509855287c0ff4c4712~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

2.  如果给上述图形添加一份模糊滤镜，就会变成这样：

```CSS
div {
    background-image: conic-gradient(#ff4d00, #ffe600, #80ff00, #00ff1a, #00ffb3, #00b3ff, #001aff, #8000ff, #ff00e6, #ff004d 20%, transparent 20.5%, transparent
    );
    filter: blur(10px);
}
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8a6b52a0ad242c988ac51cb54fb0f61~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

3.  在其上面叠加一个小一点点的圆形，设置为黑底，就能把中间部分隐藏起来，这样就巧妙地得到了渐变色阴影：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db99028033c94a0a8f569e4444a64328~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

利用这个技巧，我们可以实现各式渐变色阴影，给我们需要的一些效果添彩：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/815574531d3941199649e58071777604~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 上述几个图形的完整代码，你可以戳这里：[CodePen Demo - Neon border animation](https://codepen.io/Chokcoco/pen/abBZdOj)



## 总结

OK，本文篇幅已经非常之长了。我们再来简单归纳一下，在 CSS 中，我们可以通过各种形式的技巧与方式，实现：

1.  普通阴影；
1.  单侧阴影；
1.  立体阴影；
1.  浮雕阴影；
1.  拟态阴影；
1.  文字长阴影；
1.  盒子长阴影；
1.  彩色阴影 / 渐变阴影。

好的，本章节到此结束，大伙还有什么疑问，可以在评论区一起讨论。
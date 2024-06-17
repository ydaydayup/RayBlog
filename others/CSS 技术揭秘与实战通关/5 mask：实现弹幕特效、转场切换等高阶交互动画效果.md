在上一篇中，我们介绍了什么是 mask，并且介绍了 mask 在实际业务使用过程中的多种技巧。

本文，我们将更进一步，看看可以如何使用 mask 制作各种酷炫有意思的动画效果。OK，我们直接进入正题！


## 使用 mask 实现图片切换动画

在上一章中的最后，我们介绍了这么一种动态切换效果：

<p align="center"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a747e579e38246eb8700400da4c0e3bf~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p>

这里的核心就在于，**动态改变 mask 属性范围、大小等值**。我们再更进一步，假设还是这么一个图片效果：

```HTML
<div></div>
```

```CSS
div {
    position: relative;
    background: url(image1.jpg);

    &::before {
        position: absolute;
        content: "";
        top: 0;left: 0; right: 0;bottom: 0;
        background: url(image2.jpg);
        mask: linear-gradient(45deg, #000 40%, transparent 60%);
    }
}
```

<p align="center"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f28243d562d4cdbb1a69a240abedf84~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p>

如果我们可以动态改变 `mask: linear-gradient(45deg, #000 40%, transparent 60%)`中的 `40%` 和 `60%` 的值，是否就能得到一种动态变换的效果呢？

我们尝试一下：

```CSS
div {
    position: relative;
    background: url(image2.jpg) no-repeat;

    &::before {
        position: absolute;
        content: "";
        top: 0;left: 0; right: 0;bottom: 0;
        background: url(image1.jpg);
        animation: maskChange 1.2s ease-in-out;
    }
}
@keyframes maskChange {
  0% {
    mask: linear-gradient(45deg, #000 0%, transparent 5%, transparent 5%);
  }
  1% {
    mask: linear-gradient(45deg, #000 1%, transparent 6%, transparent 6%);
  }
  ...
  100% {
    mask: linear-gradient(45deg, #000 100%, transparent 105%, transparent 105%);
  }
}
```

在[《background 属性进阶技巧讲解及实战演练》](https://juejin.cn/book/7052964245259943948/section/7053286722200666123)这一章中，我们有介绍到，渐变是不支持直接的动画效果的。

因此，我们需要对 `mask: linear-gradient(xxxx)` 一帧一帧地控制，没办法，我们需要大费周章地定义动画从 `0%` 到 `100%` 共 101 帧的效果，如此一来，我们便可以得到这样一种切换动画效果：

<p align="center"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf365cdf8b18424dae9ee0dc822f6264~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p>

> 完整的代码，你可戳这里：[CodePen Demo -- MASK linear-gradient 转场](https://codepen.io/Chokcoco/pen/RwrpmyL)

当然，上面代码的问题在于我们需要手写 101 段的 `@keyframes` 动画分段代码。因此，我们可以借助 SASS/LESS 等预处理器优化这段代码：

```CSS
@keyframes maskChange {
    @for $i from 0 through 100 { 
        #{$i}% {
            mask: linear-gradient(45deg, #000 #{$i + '%'}, transparent #{$i + 5 + '%'}, transparent 1%);
        }
    }
}
```

代码实际编译后，其实还是非常多的，不过不急，继续往下看。


### 尝试使用 conic-gradient() 实现内容切换动画

OK，有了预处理器的帮助，代码看上去简化了不少（仅仅只是未编译时，看上去有所简化）。

我们可以再尝试一下使用 `conic-gradient()` 实现另外一种类似的切换动画，像是这样：

<p align="center"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91d0158753494791816bf9787e03cefd~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p>

原理也很简单，不断改变 mask 中 `conic-gradient()` 的参数即可：

```CSS
@keyframes maskChange {
    @for $i from 0 through 100 { 
        #{$i}% {
            mask: conic-gradient(
                #000 0, 
                #000 #{$i - 10 + '%'}, 
                transparent #{$i + '%'}, 
                transparent 100%
            );
        }
    }
}
```

> 完整的代码，你可戳这里：[CodePen Demo -- MASK conic-gradient 转场](https://codepen.io/Chokcoco/pen/eYJVmZX)

这里与上面的线性切换原理一模一样，动态地将 mask 属性从状态 A 切换至状态 B。

### 使用 CSS @property 简化代码

虽然上面我们是成功实现了效果，但是 SASS/LESS 代码经过编译后，还是太多了，并不是十分优雅。我们想在业务中使用这种转场效果，还是需要尽可能地简化代码。

在现代 CSS 中，我们还有一个非常好的帮手来帮助我们解决在动画中遇到的此类问题，那就是 `CSS @property`。

> 根据 [MDN -- CSS Property](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@property)，CSS @property at-rule 是 CSS Houdini API 的一部分，它允许开发者显式地定义他们的 CSS 自定义属性，允许进行属性类型检查、设定默认值以及定义该自定义属性是否可以被继承。

`CSS @property` 是我们后面会讲到的一个重要章节，在这里利用它进行我们的动画优化又非常的恰当。可能大家现在读下面的代码会有一些难度，我建议你可以快速浏览一下 `CSS @property` 章节的内容，再回来阅读！

借助 `CSS @property` 自定义变量，我们就可以将对整个 mask 的动画变换，转移到对变化的变量的动画，代码如下：

```CSS
@property --per {
  syntax: '<percentage>';
  inherits: false;
  initial-value: -10%;
}

div {
    position: relative;
    width: 400px;
    height: 400px;
    background: url(https://picsum.photos/400/400?random=5) no-repeat;

    &::before {
        content: "";
        position: absolute;
        top: 0;left: 0; right: 0;bottom: 0;
        background: url(https://picsum.photos/400/400?random=100) no-repeat;
        mask: conic-gradient(
            #000 0, 
            #000 var(--per), 
            transparent calc(var(--per) + 10%), 
            transparent
        );
        z-index: 1;
        animation: maskRotate 1.2s ease-in forwards;
    }
}

@keyframes maskRotate {
    0% {
        --per: -10%;
    }
    100% {
        --per: 100%;
    }
}
```

效果如下：

<p align="center"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88e5bf334bcc40d8b4127fed5460e8d6~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p>

这里，我们将对整个 mask 的动画变换，转移到对变化的变量 `--per`的动画，如此一来，就巧妙地绕开了渐变不支持动画这个坑，也就不需要再写如此多的动画关键帧代码。


### 举一反三，将此类变换动画应用到更多场景

在掌握了上述的技巧之后，我们便可以将这类转换效果应用到更多的地方。

因为，譬如，当我们想实现一个图表的 hover 动画，像是这样：

<p align="center"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c9f1df46481843da9bc1703100faf18b~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p>

有没有发现，它其实就是上面的的动画效果。通过动态改变 `mask: conic-gradient()` 实现。

```CSS
@property --per {
  syntax: '<percentage> | <angle>';
  inherits: false;
  initial-value: 360deg;
}
.g-content {
    //...
    mask: conic-gradient(#000, #000 var(--per), transparent var(--per), transparent 360deg); 

    &:hover {
        animation: hoverPie 600ms ease-in-out;
    }
}
@keyframes hoverPie {
    0% {
        --per: 0deg;
    }
    100% {
        --per: 360deg;
    }
}
```

假设，`.g-content` 就是我们需要在 hover 的时候实现一个 360° 重绘效果的元素，通过 `:hover` 伪类，在 hover 元素的时候，执行动画，而动画的核心就是改变 mask 内用到了的 @property 属性 `--per`。

> 完整的代码，你可戳这里：[CodePen Demo -- LPL Player Hexagram Ability Chart Animation](https://codepen.io/Chokcoco/pen/OJooXex)




## 使用 mask 实现转场动画

mask 介绍到现在，我们一直在使用 background 属性中的渐变作为属性值。

但是其实，mask 还可以使用 `SVG`、`图片` 作为遮罩内容。

### 使用图片作为 mask 属性值

假设，我们有这样一张 PNG 图（黑色为主体，其余部分为透明色）：

<p align="center"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56e73b8291b84dccbd57f7a3a0000455~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p>

假设我们有一个纯白色元素，元素后面是渐变背景，我们可以使用这张图片作为 mask，看看会发生什么？

```HTML
<div></div>
```

```CSS
body, html {
    width: 100%;
    height: 100%;
    display: flex;
    background: linear-gradient(45deg, #03A9F4, #FFEB3B);
}

div {
    background: #673AB7;
    width: 100px;
    height: 100px;
    mask: url('image.png');
    mask-size: 100px 100px;
    mask-repeat: no-repeat;
}
```

效果如下：

<p align="center"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/565b84655513424a89a440d90f7cd48a~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p>

上述背景使用了渐变色是为了区分元素的白色透明色，让大家更直观地理解 mask 能够使元素的内容变透明的特性！

我们再通过一张图理解一下上面到底发生了什么，其实是这么个意思：

<p align="center"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10405bb19c21418383d21baf7eda80d0~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p>

这里，我们可以得到使用图片作为遮罩的效果的原理：

**图片的实色部分与元素内容叠加的部分将可见，图片透明部分与元素内容的叠加部分将不可见。**

这其实与使用渐变作为 mask 属性的表现是一致的。

### 在 mask 中利用多图切换实现转场动画

因此，基于这个结论，我们来尝试实现这样一种酷炫的转场动画：

<p align="center"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ccdf0fd2c4f4e76b2e6b56e21307aa2~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p>

这里的转场动画，看似复杂，其实核心也是利用了 mask 属性的切换，只不过，这一次，我们切换的是不同的图片。

在这里，核心其实是一张雪碧图，如下所示：

<p align="center"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/04af2894dcec4620860cd1cdf56bfc5f~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p>

当然，上述的雪碧图没有完全展示，一共分成了 29 份。紧接着，使用了逐帧动画 `steps()`，去切换每一帧的 mask 图片内容：

```HTML
<div class="g-container">
    <div class="img1"></div>
    <div class="img2"></div>
</div>
```

```CSS
.img1 {
    background: url(https://s.newtalk.tw/album/news/111/5a558de0a141b.jpg);
}

.img2 {
    background: url(https://estnn.com/wp-content/uploads/2020/07/yone-splash-800x450.jpg);
    mask: url(https://i.imgur.com/AYJuRke.png);
    mask-size: 3000% 100%;
    animation: maskMove 2s steps(29) infinite;
}

@keyframes maskMove {
    from {
        mask-position: 0 0;
    }
    to {
        mask-position: 100% 0;
    }
}
```

这里，我们的步骤如下：

1.  让两个需要切换的场景叠在一起（Demo 中为了方便演示，使用了两张图片）；
2.  叠加在上层的图片默认隐藏；
3.  通过一张雪碧图，里面放置了 mask 在切换过程中的 29 种形态，在动画过程中不断切换这 29 种形态，最终完成从场景一到场景二的切换。

> 上述的代码中，animation 中的 `stpes()`可能目前对一些同学而言理解上有点困难，这个是属于 CSS 中的逐帧动画，我们将会在后续的动画章节中讲到，不太了解的同学可以先快速阅读该章节，再回来阅读上述代码。

非常好理解，核心就在于我们可以通过图片，让我们每一帧动画的 mask 遮罩内容更加富有设计性！再通过动画的连贯性将它们串联起来，形成一个完整的转场动画。

> 核心代码戳这里：[CodePen Demo -- mask 制作转场动画](https://codepen.io/Chokcoco/pen/rNxeKRZ)

可以看到，其实转场动画也是一种内容形式的切换。




## 使用 mask 实现视频人物遮挡弹幕功能

还有一个 mask 的使用技巧被大家津津乐道，那就是视频人物遮挡弹幕功能。

如果你关注过 LOL 等比赛直播的话，应该有留意过类似的场景。在一些视频弹幕网站中，如虎牙、BiliBili 等，当直播画面中的人物与直播弹幕重叠在一起的时候，弹幕会“**巧妙**”地躲到人物的下方，从而做到不遮挡住人物。

看着非常智能，简单的一个例子：

<p align="center"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f07af4194bfc45228e335c9f255551da~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p>

这种让弹幕不遮挡住人物的效果就是运用了 CSS 中的 MASK 属性实现的。

我们来简单剖析一下实现的过程。打开控制台审查元素，可以在 `Network` Tab 下看到一连串的下载请求。

这些请求就是视频画面每一帧需要用到的图片，其作用就是将其设置为包裹弹幕的容器的 mask 属性的值。

<p align="center"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18f986eeca4c480ea00742ff0fc3a43b~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p>

请求返回的核心是一个 SVG 图片，其图片内容大致如下：

<p align="center"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/248c2f9e539a47e09d0146d655f32993~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p>

这样，根据我们上面提到的：**图片的实色部分与元素内容叠加的部分将可见，图片透明部分与元素内容的叠加部分将不可见。**

因此，根据视频人物的实时位置变化，后台会不断计算新的 mask 图片，返回给前端，前端再实时作用于弹幕容器之上，成功实现了视觉上的视频人物遮挡住弹幕的效果。

我们可以来简单还原一下场景：首先我们模拟一个召唤师峡谷（其实就是一张图），以及一些基本的视频弹幕内容：

<p align="center"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/982ed7884bfa4e39bb2f08e413f69c00~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p>

为了简化 Demo，这里选取了一张静态图表示整个 LOL 地图，并非真的视频内容。其次，一条一条的 `<p>` 元素表示一条条的弹幕，贴近实际情况。

最终的代码大概是这样：

```HTML
    <!-- 地图 -->
    <div class="g-map"></div>
    <!-- 包裹所有弹幕的容器 -->
    <div class="g-barrage-container">
        <!-- 所有弹幕 -->
        <div class="g-barrage">6666</div>
        ...
        <div class="g-barrage">6666</div>
    </div>
```

为了模拟实际情况，我们再用一个 div 添加一个实际的人物，如果不做任何处理，其实就是我们看视频打开弹幕的感受，人物被视频所遮挡：

<p align="center"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a39f7662f5b43d182896c37be570208~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p>

接着，添加了一个人物 PNG，并且利用 animation 实现了一个人物从左向右运动的动画，模拟人物在视频中的运动过程。此时可以看到人物是被弹幕给遮挡住的。

接下来，就可以让 mask 登场了。

我们利用 mask 制作一个 `radial-gradient` ，使得人物附近为 `transparent`，并且根据人物运动的 animation，给 mask 的 `mask-position` 也添加上相同的 animation 即可。

> 实际使用中，mask 图形的计算是后台基于视频内容实时计算产生的，这一块还是需要依赖后端强大的图像识别能力，是前端无法做到的。

```CSS
.g-barrage-container {
    position: absolute;
    mask: radial-gradient(circle at 100px 100px, transparent 60px, #fff 80px, #fff 100%);
    animation: mask 10s infinite alternate;
}

@keyframes mask {
    100% {
        mask-position: 85vw 0;
    }
}
```

最终可以得到这样的效果：

<p align="center"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f618a9819c4a44a3827f360df9441203~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p>

实际上就是给放置弹幕的容器，添加一个 `mask` 属性，把人物所在的位置标识出来，并且根据人物的运动不断地去变换这个 mask 即可。

**需要明确的是，使用 mask，不是将弹幕部分给遮挡住，而是利用 `mask`，指定弹幕容器之下，哪些部分正常展示，哪些部分透明隐藏**。

> 完整的 Demo 你可以戳这里：[CodePen Demo -- mask 实现弹幕人物遮罩过滤](https://codepen.io/Chokcoco/pen/MWbyjoX)



## 总结一下

在本章，我们讲述了如何使用 mask 实现一些内容切换、场景转换以及实现视频人物遮挡弹幕的效果，其中一些需要记住的技巧如下：

1.  可以通过逐帧改变 mask 中遮罩的内容，以实现内容及场景的切换；
2.  mask 中遮罩的内容可以是利用渐变实现的，也可以是图片，甚至是 SVG；
3.  对于 mask 中遮罩的内容是图片而言，其效果是**图片的实色部分与元素内容叠加的部分将可见，图片透明部分与元素内容的叠加部分将不可见**；
4.  对于 mask 中的遮罩内容是渐变而言，我们可以使用 SASS/LESS 等预处理器工具，或者使用 CSS @property 实现代码的简化。

mask 在现代 CSS 中，与很多裁剪、遮罩、动画转场切换效果都息息相关，是现代 CSS 综合解决方案中非常重要的一个属性，也因此放在这么前面的章节。大家需要好好理解，灵活使用。

好的，本章节到此结束，大伙还有什么疑问，可以在评论区一起讨论。

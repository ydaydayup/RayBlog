在上章节中，我们详细介绍了 `clip-path` 的一些基础特性及技巧，并且更多的是围绕**静态效果**在进行描述。

而本章节，我们将继续探索 `clip-path` 在**动画方面**的能力与极限，看看使用 `clip-path` 能够制作出什么不一样的动画效果。




## 基于 `clip-path` 的形变动画

`clip-path` 的一大优点在于它可以与 CSS 中的过渡 transtion 与动画 animation 进行联动，实现动画效果。

因此，我们可以借助 CSS transtion 与 CSS animation 来进行一些形变动画效果。

首先，看一个多边形的过渡切换动画，比如，我们想实现一个多边形从三边形向四边形再到五边形的变换效果：

```HTML
<div class="polygon-animate"></div>
```

```CSS
.polygon-animate {
    width: 200px;
    height: 200px;
    background-color: crimson;
    animation: polygon-ani 3s linear infinite;
}
@keyframes polygon-ani {
    0%,
    5% {
        clip-path: polygon(
            50% 0%,
            0% 100%,
            100% 100%,
            100% 100%,
            100% 100%
        );
    }
    30%,
    35% {
        clip-path: polygon(
            50% 0%, 
            100% 50%, 
            50% 100%, 
            0% 50%,
            0% 50%
        );
    }
    60%,
    65% {
        clip-path: polygon(
            50% 0%, 
            100% 38%, 
            82% 100%,
            18% 100%, 
            0% 38%
        );
    }
    95%,
    100% {
        clip-path: polygon(
            50% 0%,
            0% 100%,
            100% 100%,
            100% 100%,
            100% 100%
        );
    }
}
```

我们只需要在 `keyframes` 的关键帧中，设置不同的 `clip-path: polygon()` 属性，即可得到它们的一个动画变换效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5cc4e1d360b64c9e9eec340985dc73fa~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整的代码，你可以戳这里：[CodePen Demo -- Clip-path 多边形过渡动画](https://codepen.io/Chokcoco/pen/QWZWEmd?editors=1100)

当然，眼尖的同学，可能已经发现问题了，上面我们的代码中，是**三边形向四边形再到五边形的一个变换效果**，但是为什么 `clip-path: polygon` 中的顶点个数都是 5 个呢？

譬如，动画一开始的 `clip-path: polygon(50% 0%, 0% 100%, 100% 100%, 100% 100%, 100% 100%)` 明明是表示一个三角形，但是却用了 5 个顶点，不能简化成 `clip-path: polygon(50% 0%, 0% 100%, 100% 100%)` 吗？

如果顶点数量不保持一致，我们得到的实际会是这样一个效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e72ce597f414c8cab6123b72b5c4584~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

我们得到的将是一个逐帧动画，而不是带有变换效果的补间动画。

> **逐帧动画**就是每一帧都是关键帧：每一帧都是自己做出来的。 **补间动画**就是知道两端的关键帧，通过计算机自己能计算出中间帧的动画。



## clip-path 动画的局限

这里就涉及了 `clip-path` 的一个限制性条件。

虽然`clip-path` 可以进行动画及过渡变换，下面我们以 `clip-path: polygon()` 动画为例，看看其限制性条件是什么。

其限制性**核心点在于：进行动画或者过渡的两个** **`clip-path`** **状态，** **`polygon()`** **内的顶点的数量必须保持一致**。

假设三角形和矩形的 `clip-path` 分别为：

-   三角形：`clip-path: polygon(50% 0, 0 100%, 100% 0)`；
-   矩形：`clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%)`。

在进行动画变换的时候，如果是直接从 `clip-path: polygon(50% 0, 0 100%, 100% 0)` 变换到 `clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%)` 是不行的，因为这里的变换是从 3 个坐标点变换到 4 个坐标点。

当然，这难不倒我们，基于这个限制，我们需要对代码进行一定量的改造，在三角形的 `polygon` 坐标表示中，虽然只需要 3 个顶点，但是我们可以使用四个坐标点表示，只需要让其中两个坐标点进行重合即可。

也就是：

-   三角形：`polygon(50% 0, 0 100%, 100% 0)` 改成 `polygon(50% 0, 50% 0, 0 100%, 100% 0)`。

用一张图来表示上面的**三边形向四边形再到五边形的一个变换效果，每个 clip-path 都有 5 个顶点，只是对于多出了顶点的图形，利用坐标点重合进行隐藏：**

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b29d75e367fe4ab58439c0839c282896~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>




## 基于 clip-path 的图形变换动画

除此之外，我们还可以尝试，将一个完整的图形，分割成多个小图形，这也是 `clip-path` 的魅力所在，纯 CSS 的图形变换：


<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e1f6d73f5c694622ba3ba51088c525d4~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

这个动画效果又是如何实现的呢？这里利用了容器大小的变换加上 clip-path 的变化共同作用实现。

我们取其中一个三角形的变化作为示意。

首先，我们实现这样一个容器大小变化动画：

```HTML
<div></div>
```

```CSS
.triangle2rect {
    width: 100px;
    height: 100px;
    animation: aniContainer 2s infinite alternate;
}
@keyframes aniContainer {
    0%, 10% {
        width: 100px;
        height: 100px;
    }
    90%, 100% {
        width: 250px;
        height: 60px;
    }
}
```

实现的是一个容器从正方形拉长到矩形的变化效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ada29aa02f946c29a74bd6f6008dcf1~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

我们再实现另外一个 `clip-path` 动画效果，是一个三角形到另外一个三角形的动画变换：

```HTML
<div></div>
```

```CSS
.triangle2rect {
    width: 100px;
    height: 100px;
    animation: a 2s infinite alternate;
}
@keyframes a {
    0%, 10% {
        background: deeppink;
        clip-path: polygon(0% 0%, 0% 100%, 50% 50%);
    }
    90%, 100% {
        background: #000;
        clip-path: polygon(0% 100%, 25% 100%, 12.5% 0%);
    }
}
```

实现两个由 `clip-path` 实现的三角形动画变换：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a12cebdbcd664d82a46d439e354545fe~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

如果我们将上述两个动画效果合并，就会是这样：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65ccb02ef99a4f7cb7b0f316ec653066~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

只需要依次实现 4 个子三角形，最终叠在一起实现一个正方形即可，最终就可以得到上述的效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e75cf754626b408aaf2f0f576630ea35~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整的代码，你可以戳这里：[CodePen Demo -- Clip-path triangle2rect](https://codepen.io/Chokcoco/pen/yXOjZm)




## 基于 `clip-path` 的边框动画

上面我们的核心一直在围绕着，`clip-path` 是可以进行坐标点的形变动画进行展开的。

因此，可以实现从一个裁剪形状变换到另外一个裁剪形状的动画效果。

我们继续利用这个特点，来实现这样一种边框跟随动画，思考一下下述动画效果，如果让你来实现，你有什么头绪：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d51268cca5324785b1bd618c768cefa3~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

看似不好做，其实可以利用裁剪的方式实现。我们实现一个完整的边框，然后动态地裁剪整个元素，让边框的部分不可见。

核心代码如下：

```CSS
div {
    position: relative;
}
div::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid gold;
    animation: clippath 3s infinite linear;
}
@keyframes clippath {
    0%,
    100% {
        clip-path: inset(0 0 95% 0);
    }
    25% {
        clip-path: inset(0 95% 0 0);
    }
    50% {
        clip-path: inset(95% 0 0 0);
    }
    75% {
        clip-path: inset(0 0 0 95%);
    }
}
```

> clip-path 中的 inset() 方法，用于定义一个矩形裁剪，我在这里准备了一个非常详细的 inset 语法示意 Demo，如果你对 inset() 的使用不是很熟悉，可以先看看这里：[CodePen - clip-path inset()](https://codepen.io/Chokcoco/pen/ExdxgNJ)。

效果图与示意图一起，右图是边框加上背景色基于整个裁剪动画的示意：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0dda843dc3814ae2a7e1673b13d15724~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整的代码，你可以戳这里：[CodePen - clip-path border animation](https://codepen.io/Chokcoco/pen/bGNJGWX)

这里的核心就是 clip-path 的动画在不断裁剪元素，裁剪的是一个完整的边框，被裁掉的部分不可见。

这里，因为使用了 `clip-path` 后，会裁剪元素，所以借用伪元素，整个边框的效果其实是由伪元素实现的，这样裁剪不会影响到元素内容本身。

这种方法，也是支持圆角 `border-radius` 的。同时，我们把元素的另外一个伪元素也利用上。

这样，我们就巧妙地实现了一个如下所示的一个非常酷炫的线条动画按钮：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e1075897d0fc4cc182f94d1605fe76c4~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整的代码，你可以戳这里：[CodePen - clip-path border animation 2](https://codepen.io/Chokcoco/pen/dypayrM)




## 基于 `clip-path` 的故障动画

由于 `clip-path` 有将内容进行裁剪切割的能力，在很多时候，一些图片及文字的动画也经常会使用到这个特性。

我们基于 `clip-path` 可以将元素的内容，裁剪成我们想要的形状。例如这样：

```HTML
<div>TXET</div>
```

```CSS
div  {
    margin: auto;
    padding: 10px;
    line-height: 1.2;
    font-size: 60px;
    background: #ddd;
}
```

正常而言，内容展示效果是这样的：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff9d5b06af0d4e76a4208b79be6ea2f1~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

使用 `clip-path` 将其剪裁为一个平行四边形：

```CSS
div  {
    margin: auto;
    padding: 10px;
    line-height: 1.2;
    font-size: 60px;
    background: #ddd;
    clip-path: polygon(35% 0, 85% 0, 75% 100%, 25% 100%);
}
```

结果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b3493797955747c5add12c7ee4dc7973~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

基于这个裁剪思路，我们来实现一个酷炫的文字断裂动画。思路如下：

1.  可以将一段文字内容，多复制几个副本，然后利用定位将它们都重叠在一起；
1.  再分别裁剪这几个副本，让裁剪的剩余部分可以拼凑成完整的文字内容；
1.  基于 CSS Animation 进行动画控制。

在这里，为了节省元素，可以使用元素的两个伪元素—— `::before`和 `::after` 复制两份文字的副本，再分别使用 `clip-path` 对它们进行剪裁，最后再配合 animation，使用 transform 对 3 个部分进行控制。

核心代码如下：

```HTML
<div data-text="Text Crack">
    <span>Text Crack</span>
</div>
```

```CSS
div {
    position: relative;
    animation: shake 2.5s linear forwards;
}

div span {
    clip-path: polygon(10% 0%, 44% 0%, 70% 100%, 55% 100%);
}

div::before,
div::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
}

div::before {
    animation: crack1 2.5s linear forwards;
    clip-path: polygon(0% 0%, 10% 0%, 55% 100%, 0% 100%);
}

div::after {
    animation: crack2 2.5s linear forwards;
    clip-path: polygon(44% 0%, 100% 0%, 100% 100%, 70% 100%);
}

// 元素晃动，断裂前摇@keyframes shake {    
    ...
}

@keyframes crack1 {
    0%,
    95% {
        transform: translate(-50%, -50%);
    }

    100% {
        transform: translate(-55%, -45%);
    }
}

@keyframes crack2 {
    0%,
    95% {
        transform: translate(-50%, -50%);
    }

    100% {
        transform: translate(-45%, -55%);
    }
}
```

看看效果，最终，我们可以得到这样的效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18307451d7884c9c8c373b9938264701~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 相关情况，你可以戳这里：[clip-path 实现文字断裂效果](https://chokcoco.github.io/CSS-Inspiration/#/./clippath/clippath-word-crack)

继续，有了上面的内容铺垫，下面我们尝试也把类似效果作用于图片之上，看能实现什么有趣的效果。

随便选一张非常赛博朋克的图片：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff053353ed9e40fba210a47ac4bb7605~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

我们接下来要实现的动画效果，其关键在于：

-   首先，使用元素的两个伪元素 `::before` 和 `::after`，多生成图片的两个副本，也就是将图片复制两份；
-   其次，使用 `clip-path` 对两个副本图片元素进行随机的裁剪，然后配合进行一系列的 transform 变换，最后添加上滤镜等一系列操作。

简单贴一下核心代码：

```HTML
<div></div>
```

为了简化代码量，下述的代码使用了 SASS 语法：

```CSS
$img: "https://mzz-files.oss-cn-shenzhen.aliyuncs.com///uploads/U1002433/0cb5e044a1f0f7fc15f61264ee97ac1f.png";

div {
    position: relative;
    width: 658px;
    height: 370px;
    background: url($img) no-repeat;
    animation: main-img-hide 16s infinite step-end;
}

div::before,
div::after {
    position: absolute;
    width: 658px;
    height: 370px;
    top: 0;
    left: 0;
    background: inherit;
}

div::after {
    content: "";
    animation: glitch-one 16s infinite step-end;
}

div::before {
    content: "";
    animation: glitch-two 16s infinite 1s step-end;
}

@keyframes glitch-one {
    @for $i from 20 to 30 {
        #{$i / 2}% {
            left: #{randomNum(200, -100)}px;
            clip-path: inset(#{randomNum(150, 30)}px 0 #{randomNum(150, 30)}px);
        }
    }

    15.5% {
        clip-path: inset(10px 0 320px);
        left: -20px;
    }
    16% {
        clip-path: inset(10px 0 320px);
        left: -10px;
        opacity: 0;
    }
    ....
}

@keyframes glitch-two {
    @for $i from 40 to 50 {
        #{$i / 2}% {
            left: #{randomNum(200, -100)}px;
            clip-path: inset(#{randomNum(180)}px 0 #{randomNum(180)}px);
        }
    }

    25.5% {
        clip-path: inset(10px 0 320px);
        left: -20px;
    }
    26% {
        clip-path: inset(10px 0 320px);
        left: -10px;
        opacity: 0;
    }
   ...
}

@keyframes main-img-hide {
    5% {
        filter: invert(1);
    }
    ...
}
```

由于设置了多个 `@keyframes` 关键帧，因此动画部分的代码量非常多。

基于此，我们借助预处理器 SASS 的循环函数，随机生成了部分代码。如果时间允许，手动控制每一帧的效果，其实整体感觉还会更好，当然，调试动画消耗的时间会更多。

看看效果，虽然 CSS 能力有限，但也能实现令人惊艳的图片故障效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f082dbd95958433f96d0db2f1f617caa~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

整个效果当然不仅仅只是 `clip-path`，但是 `clip-path` 在其中扮演了非常重要的角色。

> 完整的 Demo 及效果，你可以戳这里：[使用 Clip-path 配合形变、滤镜等功能实现图片的故障艺术风格动画](https://chokcoco.github.io/CSS-Inspiration/#/./clippath/clippath-img-glitch)





## 基于 `clip-path` 的动态区域裁剪动画

最后，再来看这样一个有意思的效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4418f01052cc4650b40b924ca3d3dae6~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

这里就是利用了 `clip-path` 的过渡，实现了一个区域动态裁剪的动画。这里的关键之处在于，内容是随着动画一起展开的，整个内容最开始是不可见或者可以理解为被裁剪掉了。

代码其实并不复杂，核心就在于 `clip-path` 动画：

```HTML
<div class="g-container"></div>
```

```CSS
.g-container {
    position: relative;
    width: 400px;
    height: 300px;
    overflow: hidden;
    transition: clip-path .3s linear;
    clip-path: circle(20px at 44px 44px);
    background: #fff;
    
    &:hover {
        clip-path: circle(460px at 44px 44px);
    }
}
```

> clip-path 中的 circle() 方法，用于定义一个圆形裁剪，我在这里准备了一个非常详细的 circle 语法示意 Demo，如果你对 circle() 的使用不是很熟悉，可以先看看这里： [CodePen - clip-path circle()](https://codepen.io/Chokcoco/pen/rNqNMpb)。

在这里，我们利用了 `clip-path` 支持动画的能力，步骤如下：

1.  首先，实现一个矩形容器，设置其背景色为白色；
1.  将上述的容器，利用 `clip-path: circle(20px at 44px 44px)` 裁剪成一个圆形；
1.  当 hover 元素的时候，扩大裁剪圆的半径，直到整个图形恢复到整个矩形范围即可。

我们来看看效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa2a78093a0d476aa1a30731d06dd7a8~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

完美地还原了上面图示的效果。接下来，只需要将原本的布局内容元素，写进上述的矩形容器中即可：

```
<div class="g-container">
    <ul>
        <li>11111</li>
        <li>22222</li>
        <li>33333</li>
        <li>44444</li>
    </ul>
</div>
```

最终效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f45062f4d8c84d3dacda2af64f37681d~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>


> 完整的代码，你可以戳这里：[CodePen Demo -- clip-path zoom in animation](https://codepen.io/Chokcoco/pen/yLorrRm)

是不是一个非常有意思的技巧？这里利用 `clip-path` 实现的动态区域裁剪的动画，非常适合应用于各类导航栏的隐藏展示，希望大家能够掌握。




## 总结

在本章，我们对利用 `clip-path` 实现的动画效果进行了深入的探究。总体而言，在使用 `clip-path` 的时候，需要注意几点：

1.  `clip-path: polygon` 多边形是可以进行动画变换的，但是要注意，**进行动画及过渡的两个状态，polygon() 内的坐标顶点的数量必须一致**；
1.  使用 `clip-path` 实现的动画由于会裁剪掉裁剪区域外的内容，因此对容器有内容的情况需要特别注意，可以通过伪元素等方式将对元素本身的影响进行转移，通过一些与内容无关的元素进行动画效果的呈现；
1.  利用`clip-path` 裁剪切割元素的特性，在动画的过程中，可以配合其他属性，共同完成更多奇思妙想的动画效果。

好的，本章节到此结束，大伙还有什么疑问，可以在评论区一起讨论。
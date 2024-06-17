在之前，我们用了两章详细地介绍了 CSS 中的 `box-shadow` 和 `text-shadow`，而在 CSS 阴影家族中，还有一类特殊的阴影—— `drop-shadow()`。

本文，就将继续我们的滤镜之旅，详细介绍滤镜家族中非常重要的 `drop-shadow()` 属性。

根据 [MDN - drop-shadow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter-function/drop-shadow) 文档，`drop-shadow()`：投影实际上是输入图像的 alpha 蒙版的一个模糊的、偏移的版本，用特定的颜色绘制并合成在图像下面。




## drop-shadow 与 box-shadow 的异同

首先，我们快速过一下 drop-shadow 与 box-shadow 的异同，看看它们有一些什么不一样。


### 作用范围的差异

`drop-shadow()`这个函数有点类似于 `box-shadow` 属性，但是其最本质的区别在于阴影的作用范围：

1.  `box-shadow` 属性在元素的整个框后面创建一个矩形阴影；
1.  `drop-shadow()` 滤镜用于创建一个符合元素（图像）本身形状（alpha 通道）的阴影。

像下面这样，假设我们有一张三角形图案，下图左边是使用普通 `box-shadow`的效果，而右边则是是使用 `drop-shadow` 的效果。

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7410311f842a48a8a736ecc85204da0f~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

通过这个例子，去感受两者在作用范围上的差异。



### 语法层面的差异：扩散半径与内阴影

`box-shadow` - 盒阴影：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b6c2be317c547f89ecbdce7f93a7b52~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

`filter: drop-shaodw()` - 滤镜内的阴影：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d2e056c07ced42f5b00ea2b320c077e1~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

2 种阴影大同小异，需要注意的就是：

-   `box-shadow` 有内阴影，内阴影使用关键字 `inset` 进行描述，而 `drop-shadow` 是没有内阴影的；
-   `box-shadow` 多一个阴影扩散半径参数，`drop-shadow` 是没有阴影扩散半径参数的。



### 都支持多重阴影

还有一点需要特别注意，`box-shadow` 和 `drop-shadow` 都是支持多重阴影的。

这一点其实我们在滤镜的第一个章节中也提过的。

举个简单的例子，`box-shadow` 的多重阴影的写法比较简单：

```HTML
<div></div>
```

```CSS
    width: 100px;
    height: 100px;
    background: #000;
    box-shadow: 
        5px 10px 2px 2px #f00,
        -5px -10px 2px #0f0;
```

可以得到这样一个图形：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53b0324bf7874b979ac2080d94a43151~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

而 CSS 中，滤镜也是支持多重滤镜的，单个滤镜效果也可以重复设置，所以多重 `drop-shadow` 也是支持的，写法如下：

```CSS
.drop-shadow {
    border: 50px solid transparent;
    border-top: 50px solid #000;
    filter: 
        drop-shadow(5px 10px 2px #f00)
        drop-shadow(-5px -10px 2px #0f0);
}
```

可以得到这样一个图形：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d35d6c5fc3d446ca07bb034fbe2de89~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整的代码，你可以戳这里：[CodePen Demo -- CSS3 Shadow 是支持多重阴影的](https://codepen.io/Chokcoco/pen/qBJZmWM)


### 作用元素差别

还有一个显著的差异，`box-shadow` 和 `drop-shadow` 的作用元素存在一定的差异。

还是以这个使用 CSS 实现的三角形为例子：

```HTML
<div class="drop-shaodw"></div>
```

```CSS
.drop-shadow {
    border: 50px solid transparent;
    border-top: 50px solid #000;
}
```

当前，什么都不做的话，是这样一个使用 CSS 实现的三角形：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51e90da31c004bfe87eb5dcb67d11710~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

我们可以给这个 div 元素添加 `filter: drop-shadow()` 得到三角形的轮廓阴影。

我们也可以给这个元素的父元素添加 `filter: drop-shadow()`，效果是一样的，改造一下代码：

```HTML
<div class="g-container">
    <div class="drop-shaodw"></div>
</div>
```

```CSS
.g-container {
    filter: 
        drop-shadow(5px 10px 2px #f00)
        drop-shadow(-5px -10px 2px #0f0);
}
.drop-shadow {
    border: 50px solid transparent;
    border-top: 50px solid #000;    
}
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59084c7c07cf4402a15e00a2a5d72fe1~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

这一点在实际使用的过程中非常重要，原因在于，设置了 `drop-shadow()` 的元素，它不单单是针对自身元素，还会向下寻找所有子元素的形状（alpha 通道），对其设置阴影。

所以，如果我们的 Demo 再改造一下，利用 `.drop-shadow` 元素本身及其两个伪元素，生成 3 个三角形：

```CSS
.drop-shadow {
    position: relative;
    border: 50px solid transparent;
    border-top: 50px solid #000;    
}
.drop-shadow::after {
    content: "";
    position: absolute;
    top: -100px;
    left: 80px;
    border: 50px solid transparent;
    border-bottom: 50px solid #000;    
}
.drop-shadow::before {
    content: "";
    position: absolute;
    top: -100px;
    right: 100px;
    border: 50px solid transparent;
    border-right: 50px solid #000;    
}
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95dc2e4612504a1ab2833fd4cdac52f7~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

此时，再给父容器添加上 `drop-shadow`：

```CSS
.g-container {
    filter: 
        drop-shadow(5px 10px 2px #f00)
        drop-shadow(-5px -10px 2px #0f0);
}
```

就得到了我们上面说的，**设置了** **`drop-shadow()`** **的元素，它不单单是针对自身元素，还会向下寻找所有子元素的形状（alpha 通道），对其设置阴影**。效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f77e920de654e71b7e8e6762ea45705~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

如果是给父元素添加 `box-shadow`，效果是这样的：

```CSS
.g-container {
    margin: auto;
    box-shadow: 
        5px 10px 2px #f00,
        -5px -10px 2px #0f0;
}
```

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47315752cde141d899ac836049265b06~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

因此，很多时候，我们在使用 `drop-shadow` 发现没生效或者作用范围不对，原因是可能需要将 `drop-shadow` 设置给父元素。

接下来，我们就来看看，`drop-shadow` 的一些实际应用场景。





## 利用 drop-shadow() 实现不规则阴影

`drop-shadow()` 最为常见的技巧，就是利用它生成不规则的阴影。

上面也提到了，`drop-shadow()` 就是用于创建一个符合图像本身形状（alpha 通道）的阴影。

看这么一个例子，我们使用 CSS 实现了两个气泡对话框：

```HTML
<div class="message drop-shadow">filter: drop-shadow</div>
<div class="message box-shadow">box-shadow</div>
```

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6236c33025d2404ea785f3fb133f8e91~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

我们想给整个气泡框实现一个阴影效果，这种时候就必须使用 `drop-shadow()`。

当然，同时使用 `box-shadow` 作为对比：

```CSS
.drop-shadow {
    filter: drop-shadow(0px 0px 5px #999);
}
.box-shadow {
    box-shadow: 0px 0px 5px #999;
}
```

效果如下，注意观察气泡处的差异：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23f3787ea5ee4f3cbc94161b945cf53b~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

同理，再举个例子，左边是使用 `drop-shadow()`，右边使用的是 `box-shadow`。

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c37291bbd1d488c8e574a95033a215d~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整的代码，你可以戳这里：[CodePen Demo -- Drop-shadow vs box-shadow](https://codepen.io/Chokcoco/pen/ExdKORa)





## 利用 drop-shadow() 不规则元素边框

上面，我们利用了 `drop-shadow()` 生成了不规则阴影，但是有的时候，我们对待不规则元素，需要的不是阴影，而是边框，又该怎么办呢？

我们来看看这样一个图形：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/83b518cb2e61465f83e371071576eccc~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

如果只是要求使用 CSS 实现如上所示的图形，相对而言还是不难的，可以利用 mask 或者 background 中的渐变实现，像是这样：

```HTML
<div class="arrow-button"></div>
```

```CSS
.arrow-button {
    position: relative;
    width: 180px;
    height: 64px;
    background: #f49714;

    &::after {
        content: "";
        position: absolute;
        width: 32px;
        height: 64px;
        top: 0;
        right: -32px;
        background: 
            linear-gradient(-45deg, transparent 0, transparent 22px, #f49714 22px, #f49714 100%),
            linear-gradient(-135deg, transparent 0, transparent 22px, #f49714 22px, #f49714 100%);
        background-size: 32px 32px;
        background-repeat: no-repeat;
        background-position: 0 bottom, 0 top;
    }
}
```

但是，如果现在要求背景色透明，只保留元素的边框部分，利用 CSS 就不那么好实现了，像是这样：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/78677c365a4542a78d2749201dd11c17~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

来看这么一个小技巧，在这种需要绘制边框的场景下，利用多重 `drop-shadow()`，是可以大致得到它的边框效果的。

代码如下：

```CSS
div {
    position: relative;
    width: 180px;
    height: 64px;
    background: #fff;

    &::after {
        content: "";
        position: absolute;
        width: 32px;
        height: 64px;
        top: 0;
        right: -32px;
        background: 
            linear-gradient(-45deg, transparent 0, transparent 22px, #fff 22px, #fff 100%),linear-gradient(-135deg, transparent 0, transparent 22px, #fff 22px, #fff 100%);
        background-size: 32px 32px;
        background-repeat: no-repeat;
        background-position: 0 bottom, 0 top;
    }
}
div {
    filter: 
        drop-shadow(0px 0px .5px #000)
        drop-shadow(0px 0px .5px #000)
        drop-shadow(0px 0px .5px #000);
}
```

通过叠加了 3 层相同的 `drop-shadow()`阴影，近似实现了不规则图形的边框。虽然 `drop-shadow()` 原本的作用是用于生成阴影的，但是在多层扩散值很小的阴影效果叠加下，竟然有了类似于边框的效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e0cbdfc656d94730962ef9fc1f67abd3~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 此处由于图片放的很大，还是能较为明显地看到阴影效果的，如果图片本身不太大，阴影效果就不会那么明显。

套用这个方法，我们可以给上面**利用 drop-shadow() 实现不规则阴影**部分提到的两个图形，添加不规则边框试试：

```CSS
.drop-shadow {
    filter: 
        drop-shadow(0px 0px .5px #999)
        drop-shadow(0px 0px .5px #999)
        drop-shadow(0px 0px .5px #999)
        drop-shadow(0px 0px .5px #999);
}
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a528e191cf448199fbd75260c3d2687~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

效果勉强可用，但是仔细看的话，还是能看出模糊的阴影部分。

**此方法应用场景有限，适用于一些特定的对** **UI** **没那么高要求的需求之上。并且在后续章节中，我们会详细介绍为不规则图形添加边框更好的方法。**




## 利用 filter: drop-shadow() 复制不规则自身

最后，再介绍一个 `drop-shadow()` 有意思的技巧：复制不规则自身。

在阴影章节，我们有讲过 `box-shadow` 可以复制自身，但是局限于元素本身的造型，被复制出来的图形只能是正方形或者圆形一类比较规则的图形。

而 `drop-shadow()` 可以基于内部图像本身形状，复制出不规则的图形自身！

我们还是以上述的箭头图形为例：

```HTML
<div class="flecha"></div>
```

```CSS
.flecha {
    position: relative;
    width: 0;
    height: 0;
    border-top: 90px solid transparent;
    border-right: 90px solid #ffc000;
    transform: rotate(10deg);
}
.flecha:after {
    content: "";
    position: absolute;
    border: 0 solid transparent;
    border-top: 30px solid #ffc000;
    border-radius: 200px 0 0 0;
    top: -119px;
    left: -98px;
    width: 120px;
    height: 120px;
    transform: rotate(45deg);
}
```

得到这样一个箭头图形：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0263a0db82cb4730b652127676d90342~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

通过 `drop-shadow()`，可以复制这个箭头图形本身，并且，可以改变颜色！

```CSS
.drop-shadow {
    filter: drop-shadow(50px 50px 0 #999);
}
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ffd7b47a3e6f4fbe8c9b5fd004d9a9b6~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

**复制自身核心的技术点**在于：可以通过 `drop-shadow(50px 50px 0 #999` 的前两个参数控制距离，第三个参数为 0 则代表没有模糊半径，阴影将不会模糊，通过最后一个参数控制颜色。

我们利用这个技巧，利用单个标签来实现这么个抖音的 LOGO：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4cd6af046f34e5aa2e0077e6b1d9fca~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

从上图中可以看到，元素 LOGO 的主体是由 3 个颜色的类似 J 的形状组成。而单独拎出一个 J 形，又可以把它分成**四分之三圆**、 **| 以及 ㇏** 组成。

正好，一个元素加上它的两个伪元素，刚好可以凑成这三个形状，我们试着实现以下，简单 CSS 代码如下：

```HTML
<div></div>
```

```CSS
div {
    position: relative;
    width: 37px;
    height: 218px;
    background: #fff;

    &::before {
        content: "";
        position: absolute;
        width: 100px;
        height: 100px;
        border: 37px solid #fff;
        border-top: 37px solid transparent;
        border-radius: 50%;
        top: 123px;
        left: -137px;
        transform: rotate(45deg);
    }
    &::after {
        content: "";
        position: absolute;
        width: 140px;
        height: 140px;
        border: 30px solid #fff;
        border-right: 30px solid transparent;
        border-top: 30px solid transparent;
        border-left: 30px solid transparent;
        top: -100px;
        right: -172px;
        border-radius: 100%;
        transform: rotate(45deg);
    }
}
```

上面的代码就可以生成整个形状的主体：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e7791dec95eb4f78b84e3e0cf5fb54cf~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

然后，我们可以配合上面说的技巧，利用 `filter: drop-shadow()` 生成它的第一层左边的蓝色阴影，添加在父元素上：

```CSS
div {
    position: relative;
    width: 37px;
    height: 218px;
    background: #fff;
    filter: drop-shadow(-10px -10px 0 #24f6f0);

    &::before,&::after {
        ...
    }
}
```

得到如下效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/37b26e36780944adaf3257891d9492f5~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

正常而言，下一步的做法，理所当然地会认为应该使用 `drop-shadow()` 实现另外一层红色的图形。

但是，这里就容易陷入一个误区之中！

当我们再使用 `drop-shadow()` 作用在已经作用了 `drop-shadow()` 的元素上时，后一个 `drop-shadow()` 的生效范围是前一个 `drop-shadow()` 生效后的图形。

这里有一点绕，什么意思呢？意思是如果此时我们给上面的图形再添加第二重 `drop-shadow()`，将会得到两个 `J` 图形。

尝试一下：

```CSS
div {
    position: relative;
    width: 37px;
    height: 218px;
    background: #fff;
    filter: 
        drop-shadow(-10px -10px 0 #24f6f0)
        drop-shadow(50px -10px 0 #fe2d52);

    &::before,&::after {
    ...
    }
}
```

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56bb8149bbf94f17a249fb26efdfe160~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

上述 `filter` 中，一共有两重 `drop-shadow`。而第二重`drop-shadow` 是给之前已经作用了第一重 `drop-shadow` 的图形再添加一个阴影。所以，得到的图形并不是我们想要的单个 `J` 形！

这一点是与 `box-shadow` 的多重阴影区别非常大的一点， 在实际使用的过程中一点要留意。

回到这个 TikTok Logo 的 Demo 中，我们还是有一些方式能够实现另外一重 J 的形状的。

虽然再叠加一层 `drop-shadow` 一共会生成 3 重阴影，但是可以把其中一重巧妙地藏在原元素之下：

```CSS
{
    filter: 
        drop-shadow(-10px -10px 0 #24f6f0)
        drop-shadow(10px 10px 0 #fe2d52);
}
```

这样，我们就大致得到了这么一种效果（障眼法虽然只看到了 3 个 J，实际有 4 个 J 形状）：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/52d8328b1ac3417788641c8a3f0d5ace~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 当然，不得不提的是，抖音的 LOGO 其实应该只是两个类 J 形的形状重叠在一起，重叠部分为白色，非重叠部分为各自原色。最佳的做法应该是使用 CSS 的混合模式 `mix-blend-mode` 实现的。我们将在混合模式章节再详细教学。

> 完整的代码，你可以戳这里：[CodePen Demo - TikTok Logo (Single Div)](https://codepen.io/Chokcoco/pen/qBJNOqB)




## 总结

至此，我们就把滤镜中 `drop-shadow` 的一些重要特性及实用技巧完整地剖析了一遍，我们再来复习一下。

首先是 `drop-shadow` 与 `box-shadow` 的异同：

1.  作用范围的差异，`box-shadow` 在元素的整个框后面创建一个矩形阴影，而 `drop-shadow()` 滤镜则是用于创建一个符合元素（图像）本身形状（alpha 通道）的阴影；
1.  语法层面的差异，`drop-shadow` 没有扩散半径与内阴影；
1.  都支持多重阴影，但是需要注意，对于多重 `drop-shadow` ，每一重的生效范围是会算上已经作用了 `drop-shadow` 的元素效果之上；
1.  作用元素差别，设置了 `drop-shadow()` 的元素，它不单单是针对自身元素，还会向下寻找所有子元素的形状（alpha 通道），对其设置阴影。


其次，我们介绍了 `drop-shadow()` 的一些实际应用场景：

1.  利用 drop-shadow() 实现不规则阴影；
1.  利用 drop-shadow() 不规则元素边框；
1.  利用 filter: drop-shadow() 复制不规则自身。

好的，本章节到此结束，大伙还有什么疑问，可以在评论区一起讨论。
本章，我们将主要围绕伪元素和伪类展开。

这一章的内容思考了很久，讲什么内容，讲多少内容。

原因在于，CSS 发展到今天（2023-05-29），已经存在大量的伪元素和伪类。

基于 [MDN - Pseudo-elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements)，CSS 到今天一共有 16 个伪元素：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09ef56241a254c9ebfd058e9a8446faf~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

以及基于 [MDN - Pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)，一共有 65 个伪类：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45a8b4aa5b5445dbbcb8eb35023f3c68~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

全部内容在一章之内肯定是讲不完的。全部都讲也不符合本小册的定位。因此，专门挑出一章来讲一讲 CSS 伪元素伪类中的两个伪元素—— `::before` 和 `::after`。

挑这两个伪元素进行讲解的核心在于到今天，伪元素在 CSS 中仍旧扮演着非常重要的角色。掌握伪元素 `::before` 和 `::after`，能够有效提升我们的开发效率，解决很多琐碎的布局细节问题。



## 伪元素和伪类的异同

当然，在进入伪元素 `::before` 和 `::after` 的学习之前，需要解决一些认知上的误区。

CSS 中是存在伪元素（[Pseudo-elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements)）和伪类（[Pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)）的，我们需要能够清楚地区分它们并且理解它们之间的异同。

CSS 中的伪元素（Pseudo-elements）和伪类（Pseudo-classes）是两种不同的选择器，它们用于对文本内容、容器元素等进行样式化，但它们的作用略有不同。

1.  伪元素（Pseudo-elements）

伪元素是用来选择某一元素的子元素，并在这些子元素上添加额外的样式。伪元素在 HTML 代码中并不存在，可以通过 CSS 代码来为其添加样式。

常见的伪元素有 `::before`和 `::after`，它们可以在一个元素内添加虚拟的元素。

2.  伪类（Pseudo-classes）

伪类则是用于选取当前元素的某个状态或属性，并且这个状态不能通过普通选择器选择到。例如 `:hover`、`:link`、`:visited`、`:active` 等。

伪类可以选择不同状态的内容，比如链接不同状态下的颜色等。伪类也可以应用于元素之外，例如 `:first-child` 可以选择某个元素的第一个子元素。

两者的区别：

-   伪元素是用来表示选中某一元素内部的子元素，并在这些子元素上添加样式；而伪类是用来表示元素的状态，并在元素处于该状态时添加样式。
-   伪元素能够创建一些不存在于文档结构中的元素，而伪类只是改变已经存在的元素的表现形式。

还有一点非常重要，CSS 规范定义，伪元素通常使用 `::` 两个冒号进行表现，而伪类使用 `:` 单个冒号进行表示：

```CSS
// 伪元素使用两个冒号
#id::after{
 ...
}

// 伪类使用单个冒号
#id:hover{
 ...
}
```

当然，现代浏览器也都支持单个冒号表示的伪元素，譬如 `:before` 也可以正常工作。这是由于最早的 CSS2 规范，定义伪元素就是使用 `:` 单个冒号表示的。为了更加符合规范，建议大家一定要在使用伪元素和伪类的时候，注意区分使用单双冒号。





## `::before` 和 `::after` 伪元素使用的时机

那么，我们什么时候应该使用 `::before` 和 `::after` 伪元素呢？

这就要求我们需要深入了解 `::before` 和 `::after` 的机制了。


### 使用一个元素无法完成完整样式的绘制，需要额外的元素完成一些细节

伪元素 `::before` 和 `::after` 更多的时候是用于完成一些细节 UI 的绘制，通常的场景是我们不想额外增加多余的元素去绘制一些较小的细节。此时，使用伪元素就非常贴切。

来看这么一个例子，假设我们想使用 CSS 实现如下的气泡对话框：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8903834fc7704bda8e81b71785df7e03~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>


主体部分非常简单：

```HTML
<div></div
```

```CSS
div {
    position: relative;
    width: 200px;
    height: 100px;
    background: #e91e63;
    border-radius: 8px; 
}
```

可以得到这么一个圆角矩形：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd75412c481b488c933c2ed5682eb417~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

此时，剩下一个气泡三角形需要实现。当然 CSS 实现一个三角形的方式非常之多，我们就使用 border 来实现一个三角形。但是，需要额外添加一个元素来绘制这个三角形吗？显然太过铺张浪费，此时，伪元素就是非常好的选择。

因此，使用元素的一个伪元素完成三角形的绘制：

```CSS
.pop::after {
    content:"";
    position: absolute;
    top: 45px;
    left: -24px;
    width: 0;
    height: 0;
    border: 12px solid;
    border-color: transparent #e91e63 transparent transparent;
}
```

这样，我们就在一个标签内完美地实现了这个气泡框：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ef1c271cdcea40f3b01d90d7ba9f1a1a~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

同样的，我们再举个例子，假设我们要实现如下一个按钮，类似于 Chrome 的分页，该怎么实现呢？

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de650321d8d14f569c6fb437200eed00~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

仔细分析一下上述按钮造型，可以对这个按钮的形状进行分解，这里这个按钮是由 3 块的叠加：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f3786d402354470baec51f953cef842~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

此时，中间的大块使用一个 div 即可实现，而两侧的两个弧形三角形，要额外借助两个元素吗？不，这里使用 `::before` 和 `::after` 两个伪元素再适合不过了。

接下来，只需要想清楚如何借助伪元素实现两侧的弧形三角即可。这里其实也很容易，我们借助**径向渐变**的能力。如下图所示，想象一下，左右两侧的图形是两个基于径向渐变（radial-gradient）生成的图形。

我们只需要把黑色部分替换为透明即可：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56fdea9af5e941068555caafcf6c52d0~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

代码如下：

```HTML
<div>outside-circle</div>
```

```CSS
div {
    position: relative;
    background: #e91e63;
    border-radius: 10px 10px 0 0;
 }
div::before {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    left: -20px;
    bottom: 0;
    background: #000;
    background:radial-gradient(circle at 0 0, transparent 20px, #e91e63 21px);
}
div::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    right: -20px;
    bottom: 0;
    background: #000;
    background:radial-gradient(circle at 100% 0, transparent 20px, #e91e63 21px);
}
```

借助两个伪元素的能力，我们轻松地在一个 div 元素的限制下，得到如下的按钮：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c5c8ad650ec4258a76fa04f63a02a12~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整的代码，你可以戳这里：[CodePen Demo -- CSS Various Button Shapes](https://codepen.io/Chokcoco/pen/QWMoBGO?editors=1100)



### 当元素无具体语义时，与宿主又属于同一主体进行展示，也适用于伪元素

第二种常见的使用场景为：当元素无具体语义时，与宿主又属于同一主体进行展示。

什么意思呢？我们来看这么一个按钮：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3141588a739e4b40a470295a7e8c53c6~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

当我们要实现这么一个按钮，可以看到在“分享”两个字旁边，还有一个 ICON 图形，这个 ICON 图形其实没有具体的语义，仅仅是增强元素的表现力。此时，这个 ICON 就适用于使用伪元素进行制作。

伪代码如下：

```HTML
<div>分享</div>
```

```CSS
div {
    position: relative;
    width: 100px;
    height: 48px;
    background: blue;
    border-radius: 10px;
 }
div::before {
    content: "";
    position: absolute;
    background-image: url(icon.png)
}
```

理解了上述代码后，当我们看到类似于这种 UI 布局后，其实其中的 ICON ，如果可以的话，都是可以使用伪元素来实现的：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7dee3a6f3a5848f29d63857bbbfebebc~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 当然，实际情况，我们还需要考虑 ICON 的引入方式，譬如部分组件是以特殊标签的形式引入预定义好的 ICON。此时也不必因为适用而强行使用伪元素。



### 当元素的样式 UI 不适合使用主元素实现时，也适用于伪元素

这是一个非常有意思的场景：什么情况下**元素的样式** **UI** **不适合使用主元素实现**？

还是以按钮为例子。假设我们要实现这么一个梯形按钮：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eeaf0a0e96df4ffb801894c77bb2f3ae~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

方式很多，其中一种常见的方式是使用 3D 旋转实现，什么意思呢？看看这个示意图你就明白了，其实是利用了一定的 3D 变换。原理就是一个矩形，绕着 X 轴旋转，像是这样：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f66f68bf9f684c888262b51b72ea7405~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

代码也非常简单：

```HTML
<div>Trapezoid<div>
```

```CSS
div {
    position: relative;
    width: 160px;
    height: 64px;
    line-height: 64px;
    transform: perspective(40px) scaleY(1.3) rotateX(10deg);
    transform-origin: bottom;
    background: #ff9800;
    text-align: center;
}
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/75fa68a567ce46819720f10928e78280~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

虽然成功得到了梯形，但是由于元素经过了 `transform: perspective(40px) scaleY(1.3) rotateX(10deg)`，因此也导致内部的文字也变形了，这是无法接受的。

这种情况，我们就可以利用元素的伪元素实现梯形造型，这样，元素内部的文字就不会受到影响，我们改造一下我们的代码：

```CSS
.btn {
    position: relative;
    width: 160px;
    height: 64px;
    line-height: 64px;
    text-align: center;
}
.btn::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: perspective(40px) scaleY(1.3) rotateX(10deg);
    transform-origin: bottom;
    background: #ff9800;
    z-index: -1;
}
```

这样，我们就得到了我们想要的效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18cd9a85bd044f68b428b16e66719cb5~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整的代码，你可以戳这里：[CodePen Demo - 利用伪元素实现梯形按钮](https://codepen.io/Chokcoco/pen/ExdzgPp)



### 增强元素的交互体验，又不想额外添加元素

作为前端开发人员，利用我们的前端知识在成本尽可能小的情况下尽可能大地去提升用户体验是非常有意义的一件事件。

而伪元素 `::before` 和 `::after` 的其中一种使用场景就是增强元素的交互体验。

如何理解这种场景呢？

我们来看这么一个有意思的例子，可能很多同学有同样的经历：

**假设在摇晃的车厢上或者是单手操作着手机，手机的页面上，有一个按钮，由于按钮设计得太小，非常难以成功点击。**

在移动端，让用户更容易地点击到按钮无疑能很好地提升用户体验，并且由于手机屏幕大小的缘故，按钮通常都很小，并且受限于设计稿或者整体 UI 风格，我们不能通过直接去改变按钮元素的高宽去扩大点击的热区。

那么，这个时候有什么办法在不改变按钮原本大小的情况下去增加它的点击热区呢？

这里有个非常有用的技巧，伪元素也是可以代表其宿主元素来响应鼠标交互事件的。

因此，借助伪元素可以轻松帮我们实现，我们可以这样写：

```CSS
.btn::before{
  content:"";
  position:absolute;
  top:-10px;
  right:-10px;
  bottom:-10px;
  left:-10px;
}
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e1102e8453b4738b9b494f8353ba74c~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

仔细看图，在我们的鼠标没有完全接近按钮的时候，其实就已经触发了按钮的 `hover` 变色，表示按钮可以点击了，这里运用的就是伪元素区域上下左右各比父元素多出 `10px` 实现的。

在按钮的伪元素没有其他用途的时候，这个方法确实是个很好的提升用户体验的点。





## `::before` 和 `::after` 伪元素的一些细节知识及小技巧

在了解了几个伪元素的比较恰当的使用时机后，我们再来看看关于伪元素的一些细节知识与小技巧。

### 巧用 `inset` 关键字

第一个我认为非常实用的技巧，就在于 `inset` 属性。什么是 `inset` 属性？它的作用是什么？

别急，首先我们看这么一个场景，我们需要实现一个和元素一样大小的伪元素，代码通常是这样的：

```HTML
<div></div>
```

```CSS
div {
    position: relative;
    width:120px;
    height: 64px;
}
div::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom:0;
}
```

可以看到，几乎每次当你使用伪元素的时候，都需要借助 `position:absolute` 绝对定位加上 `top`、`left`、`right`、`bottom` 四个定位属性控制伪元素的定位。


此时，我们可以使用 `inset` 简化我们的代码：

```CSS
div {
    position: relative;
    width:120px;
    height: 64px;
}
div::before {
    content: "";
    position: absolute;
    inset: 0;
}
```

上述 `inset: 0` 就等同于 `top:0; left: 0; right: 0; bottom: 0`，可以有效地简化代码量。

[根据 MDN - inset](https://developer.mozilla.org/zh-CN/docs/Web/CSS/inset)：[CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) 属性 `inset` 为简写属性，对应于 `top`、`right`、`bottom` 和 `left` 属性。其与 `margin` 简写属性具有相同的多值语法。

并且，到今天，它的兼容性已经非常好了：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6edcd85bd87e4ea1b3bf77d717008d96~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

我们可以合理地应用 `inset` 去简化 top、right、bottom、left 的代码。并且上面提到了，其与 `margin` 简写属性具有相同的多值语法。

所以，再看一个例子，即便我们的 top、right、bottom、left 值不一样，也是同样可以使用 `inset` 的：

```CSS
div::before {
    content: "";
    position: absolute;
    top: 2px;
    right: 4px;
    bottom: 6px;
    left: 8px;
}
// 等同于
div::before {
    content: "";
    position: absolute;
    inset: 2px 4px 6px 8px; /* 上 | 右 | 下 | 左 */
}
```

完整的语法值：

```CSS
/* 长度值 */
inset: 10px; /* 应用于所有边 */
inset: 4px 8px; /* 上下 | 左右 */
inset: 5px 15px 10px; /* 上 | 左右 | 下 */
inset: 2.4em 3em 3em 3em; /* 上 | 右 | 下 | 左 */

/* 包含块的宽度（左或右）或高度（上或下）的百分比 */
inset: 10% 5% 5% 5%;
```


### 理解并灵活使用伪元素的 `content`

`::before` 和 `::after` 伪元素中一个重要的属性就是 `content` 属性，它用于设置在伪元素中要呈现的内容。

基于 `content` 其实有非常多意思的点。

1.  `::before` 和 `::after` 伪元素想要生效，一定要有 `content` 元素，至少需要设置 `content: ''`。

    第一个点，一个伪元素要生效，一定要设置 `content` 元素，有的时候，我们需要伪元素，但是不需要它有内容，因此更多的时候，伪元素的 `content` 都是空值，像是这样：`content: ''`。

2.  `content` 元素可以读取 HTML 的属性值，通过 `attr(xxx)` 的形式。

我们来看这么一个例子：

```HTML
<div data-content="EDF">ABC</div>
```

```CSS
div::before {
    content: attr(data-content);
}
```

在 `content` 属性中，通过 `attr(data-content)` 可以读取到对应元素的 `data-content` 属性，效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e58785d13b2240d9ac0130972c8be2b2~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

这是一个非常有用的技巧！有非常多有意思的动画、交互效果基于这个功能实现。

首先，我们来看这么一个在业务中实用的案例。

我们有一个按钮，需要在右上角实时展示一个数字，可以巧妙地通过伪元素的 `content` 实现，我们只需要把需要展示的数字，赋值给元素的某个属性，利用元素的伪元素 `content` 进行读取即可：

```HTML
<div class="btn" count="5">Message</div>
```

```CSS
div {
    position: relative;
    width: 200px;
    height: 64px;
}

div::before {
    content: attr(count);
    ...
}
```

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53998b614e2e4870b2a3a7b354dae5be~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

这里右上角的数字 5 提示角标，就是利用伪元素 content 读取了 HTML 元素的值，可以适应各种长度，以及中英文。

当然，这个角标可以是任何内容：

```HTML
<div count="角标提示">Message</div>
```

效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36aec3ee9b9a4a0081ba808e9d481626~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 完整的代码，你可以戳这里：[CodePen Demo -- 属性选择器实现角标功能](https://codepen.io/Chokcoco/pen/EBKMpw)

我们再来看一个有意思的案例。我们都知道，如果给一个图片添加一个 title 属性，当我们 hover 到图片上面的时候，会展示 title 属性里面附加的内容，类似这样：

```HTML
<img src="xxxxxxxxx" title="风景图片">
```

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/877daa5d6cf14368a153d1258a2dac53~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

这里不一定是 `img` 标签，其他标签添加 `title` 属性都能有类似的效果。但是这里会有两个问题：

-   响应太慢，通常鼠标 hover 上去要隔 1s 左右才会出现这个 title 框；
-   框体结构无法自定义，弹出框的样式无法自定义。

所以这里，如果我们希望有一些自己能够控制样式的可快速响应的浮层，可以自定义一个类 title 属性，我们把它称作 `popTitle`。

我们可以这样操作，稍微改造一下代码：

```HTML
<p class="title" popTitle="文字弹出">这是一段描述性文字</p>
<p class="title" popTitle="标题A">这是一段描述性文字</p>
```

```CSS
p[popTitle]:hover::before {
    content: attr(popTitle);
    position: absolute;
    color: red;
    border: 1px solid #000;
    ...
}
```

我们可以利用伪元素 content 读取了 popTitle 的值，模拟元素被 hover 时，弹出的 hover 层。

对比一下，第一个是原生自带的 `title` 属性，下面两个是使用属性选择器配合伪元素模拟的提示：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7bc4592fbfd4e23a5ab25263b8460b1~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 浏览器自带的 `title` 属性延迟响应是添加一层防抖保护，避免频繁触发，这里也可以通过对伪元素添加一个 100 毫秒级的 `transition-delay` 实现延迟展示。

而且框体由于是伪元素生成的，所以我们可以自定义它的样式及位置，运用这个效果，可以应用在许多无法正常把信息展示完的地方。

> 完整的代码，你可以戳这里：[CodePen Demo -- 属性选择器配合伪元素实现类 title 功能](https://codepen.io/Chokcoco/pen/GaaXyp)

甚至乎，我们还可以使用 `content` 元素来制作动画效果。来看这么一个 Loading 动画效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c82bf4fa10241feb198fb5e4123d5b8~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

实现方式有很多，但是这里一个核心点在于内容动态发生了变化，那需要 JavaScript 动态改变元素文本内容吗？

使用 `content`，问题也可以迎刃而解，代码非常简单也很好理解：

```HTML
<p>加载中</p>
```

```CSS
p {
    position: absolute;
    font-size: 6vw;
}

p::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    animation: dot 3s infinite steps(3, start);
}

@keyframes dot {
    33.33% {
        content: ".";
    }
    66.67% {
        content: "..";
    }
    100% {
        content: "...";
    }
}
```

这里，通过 `content` 的动画，动态修改了 `content` 的值，巧妙地实现了这么一个 Loading 动画效果。

> 完整的代码，你可以戳这里：[CodePen Demo -- 利用伪元素实现打点 loading 效果](https://codepen.io/Chokcoco/pen/yrJpQG)


### 没有伪元素的元素

伪元素虽然强大，但是需要特别注意的是，还是有一些特定的元素是不支持伪元素 `::before` 和 `::after` 的。

诸如 `<img>` 、 `<input>`、 `<iframe>`，这几个标签是不支持类似 `input::before` 这种使用方式的。

究其原因，要想标签支持伪元素，需要这个元素是要可以插入内容的，也就是说这个元素要是一个容器。而 input、img、iframe 等元素都不能包含其他元素，所以不能通过伪元素插入内容。

当然，在例外中，还有例外！那就是 `<img>` 元素，按照上述而言，`<img>` 元素属于替换元素，是没有伪元素的。

正常也确实是这样，举个例子：

```HTML
<img src="image.png"></img>
```

当 img 元素的 src 地址能够正常指向一个图片资源的时候， `<img>` 的 `::before` 和 `::after` 确实是不会生效的。但是，如果 src 指向的是一个错误的地址，也就是图片无法正常被解析替换，在这种特殊的情况下，大部分现代浏览器是支持这种状态下的元素能够有自己的伪元素 `::before` 和 `::after` 的。

这个有什么意义吗？有这么一个实际案例，能够利用上这个特殊的点。

也就是上面说的，当图片链接挂了，应该如何对图片进行错误处理。处理的方式有很多种。

这里讲一种结合了伪元素在 `<img>` 的 `src` 生效和失效下表现不一样，以及上面提到的伪元素的 `content` 可以读取元素的属性值的解决方案：

1.  利用图片加载失败，触发 `<img>` 元素的 `onerror` 事件，给加载失败的 `<img>` 元素新增一个样式类；
1.  利用新增的样式类，配合 `<img>` 元素的伪元素，展示默认兜底图的同时，还能一起展示 `<img>` 元素的 `alt` 信息。

```HTML
<img src="test.png" alt="图片描述" onerror="this.classList.add('error');">
```

```CSS
img.error {
    position: relative;
    display: inline-block;
}

img.error::before {
    content: "";
    /** 定位代码 ** /
    background : url ( error-default.png ); }  img .error ::after {  content : attr (alt);  / ** 定位代码 **/
}
```

我们利用伪元素 `before` ，加载默认错误兜底图，利用伪元素 `after`，展示图片的 `alt` 信息，此方案的优点在于既非常好地展示了错误兜底图，同时还能额外图片原本的 `alt` 描述！非常的 Nice。

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86ae145e399e4af48f36b73e5c1ddff4~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

> 此方案我最早是在张鑫旭张老师的博客中看到，此处用于讲解伪元素非常恰当。

> 完整的 Demo，你可以戳这里看看：[CodePen Demo -- 图片的错误处理](https://codepen.io/Chokcoco/pen/WNGgNqv?editors=1100)




## 单标签的艺术

当然，还有一类场景，就是在 CSS 高度发达的今天。

很多时候，有一些有极客精神的 CSSer 在追求的一种状态，使用单个元素画出一些复杂图形。

此时，两个 `::before` 和 `::after` 伪元素就发挥了巨大的作用，因为其实对于一个 `div` 而言，算上两个伪元素，其实相当于我们拥有 3 个元素能够使用。

所以，大部分打着单标签实现的图形，其实都用到了 `::before` 和 `::after` 伪元素。

譬如下面这个心形图形，只能使用一个 div 实现它，该怎么做呢？

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d81b041e27149609bc9731de4d7b4e5~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

仔细观察图形，其实可以将图片分成 3 部分：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c77857fadf924d3da2e60b6a21bbd196~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

Wow，其实这里，我们只需要元素本身实现正方形，元素的两个伪元素利用绝对定位实现两个圆形，叠加在一起即可！

完整的代码非常简单：

```CSS
div {
    position: relative;
    transform: rotate(45deg);
    background: rgba(255, 20, 147, 0.85);
    width: 140px;
    height: 140px;
}
div::before,div::after {
    content: "";
    position: absolute;
    top: 0;
    left: -70px;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background: rgb(255, 20, 147);
}
div::before {
    top: -70px;
    left: 0;
}
```

> 完整的示例代码，你可以戳这里：[CodePen Demo -- A Signle Div heartShape](https://codepen.io/Chokcoco/pen/yLMPJwy)

再来看一个有意思的案例。看看下面两个图案，一个象棋棋盘，一个线条背景框，你觉得应该用多少个标签去实现呢？

象棋棋盘：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/038d5af43a7247dea8568b54bf875bad~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

线条背景框：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7dec30eb3d224ae8adef1d6a019bf298~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

结合小册至今的内容，你能够尝试使用一个标签去实现它们吗？利用伪元素、阴影、背景渐变，等等等等。

是的，上面两个元素，都是使用一个 div 能够完成的，代码其实也不多，所谓单标签的艺术，可能莫过于此吧。

> 完整的代码，你可以看看这两个 Demo：
> 
> 1.  单标签实现象棋棋盘：[CodePen Demo -- CSS Chess board](https://codepen.io/Chokcoco/pen/JjvPjrN)
> 1.  单标签实现线框背景图：[CodePen Demo -- Conic Gradient Skill Demo](https://codepen.io/Chokcoco/pen/eYLKpRa)

当然，实际业务场合中，我是不推荐用单标签去实现它们的，因为切图明显是性价比与效率更高的方式。作为提升 CSS 能力的训练，倒是可以挑战一下自己。

如果想有效提升自己的 CSS 能力，有的时候，尝试进行一下类似这种的挑战也是很有意思的。强迫自己在单个元素内，使用各种 CSS 技巧，完成目标图形。




## 总结一下

在本章，我们从伪元素和伪类的概念开始，首先旨在让大家能够完全识别区分伪元素及伪类，了解它们的不同。

其次，我们介绍了 4 个伪元素常见的使用场景：

1.  使用一个元素无法完成完整的样式的绘制，需要额外的元素完成一些细节；
1.  当元素无具体语义时，与宿主又属于同一主体进行展示，也适用于伪元素；
1.  当元素的样式 UI 不适合使用主元素实现时，也适用于伪元素；
1.  增强元素的交互体验，又不想额外添加元素。

接着，我们介绍了一些 `::before` 和 `::after` 伪元素的一些细节知识及小技巧：

1.  巧用 `inset` 关键字；
1.  理解并灵活使用伪元素的 `content`；
1.  没有伪元素的元素，并且基于这个点了解了一个非常有用的图片容错处理技巧。

最后，讲解了尝试借助两个伪元素，在元素标签中挑战绘制图形。

当然，在 CSS 发展的浪潮中，早期的伪元素其实还承担了很多其他功能及职责，譬如大家耳熟能详的清除浮动，在之前也算是伪元素的专属技巧。当然，这类技巧在今天已经使用得非常少了，本文也就没有赘述。

总而言之，伪元素在如今的前端开发中扮演了非常重要的角色，识别出伪元素适用的场景，灵活使用它们，绝对可以有效提升重构的效率。

好的，本章节到此结束，大伙还有什么疑问，可以在评论区一起讨论。
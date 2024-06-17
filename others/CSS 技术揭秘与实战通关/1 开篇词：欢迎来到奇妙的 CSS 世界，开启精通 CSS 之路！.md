CSS 从早年间的仅仅负责布局，到今天，它的作用及能力已经越来越大，包括但不限于如下一系列重要角色：

-   绘制各类图形；
-   兼容设备差异；
-   制作酷炫动画；
-   完善复杂交互；
-   提升可访问性；
-   构建奇思妙想的艺术效果；
-   ……

很多时候，实现一个页面，不仅仅只是按照设计稿把它还原出来那么简单，还原静态设计稿只是第一步，我们基于静态页面还能继续完善丰富它与用户的交互，设计恰当的动画，关注不被大部分人重视的可访问性，而正是这些点，能够体现我们作为一名前端工程师与他人的不同之处，真正体现我们的价值所在。

我们来看看，到今天，强大的 CSS 能够实现的那些有意思的`布局`、`动画`及`交互效果`。
  
## 花样繁多的页面布局与结构

我们页面的布局效果，能够**不再局限于规矩的多行多列**。

譬如，我们将学习如何轻松地实现各种复杂布局：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e397c330240749cba8d6689e2398bf74~tplv-k3u1fbpfcp-zoom-1.image" alt="op.gif"  /></p>

又或者，能够做到竖向的**瀑布流布局**，自动占据剩余空间，形成如下的不规则布局：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d35f419cd334141984c081b3fd5ed22~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

甚至乎，我们可以做到花式的文字随图形排布，以及构造各种奇形怪状的布局容器：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a730f07267ce47d790634be7fac4f636~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

又或者，每逢重大日期，我们的网站需要置灰，但是除了整站置灰，可能我们还需要首屏置灰：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bbd62abbbdf0490799d9f15518bb171e~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

看似复杂，但是相对整站置灰仅仅需要一个 `filter` 属性即可完成，其实首屏置灰也仅仅依靠一行核心代码即可完成！

再者，类似如下所示的不同类型的混合效果 —— 图片混合与颜色混合：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7132a4fb49fc4c70a8f28de6a7bc5e96~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

在掌握了 CSS 中的 mask、混合模式等技巧后，我们能够不依靠切图，快速实现此类效果。

## 极具创意的交互与展示

许多视频网站中，当弹幕经过人物的时候，可以巧妙地”躲“到视频下方，这种遮罩效果，其实是利用了 CSS 的 mask：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a068a390b8ae4bb1af7fd519b4c9a2f0~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>


利用 mask，我们还可以实现一些非常赞的交互效果，譬如这种令人眼前一亮的图片切换效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0854e6cfe591455d93024b65d5254a1c~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>


当然，CSS 可以做到的远不仅此而已。掌握好它们，各种有意思的交互效果可以做到信手拈来，譬如：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77a66f4f2586462dac1580aca43f79f5~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>


又或者各种按钮、图片、文字的创意交互。

按钮 hover 效果如下：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/106222a5b57a473f937091bc30f2a154~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf3efbee61b44241a7f1599283cf70ff~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

文字 hover 效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a665c7c9389b4fa6a3a666bbb0e4670d~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

只看上面的效果，你能想象这个效果的核心元素是 `background` 吗？

在 CSS 中，`background` 可不仅仅只是能够用来绘制背景图这么简单。再看几个例子：

1.  有趣的波浪下划线效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17207aaeb4aa4c6387c1b1a4a0204829~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

2.  一个有趣的圆环进度条：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8515d2e6d13443afa2f4a0d003ff0427~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

2.  甚至是实现一个神奇的电视的雪花效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/313332e9757d423c8d824fe4d93b07c7~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

上面几个动画，**你能想象，它们其实都是利用不同的** **`background`** **绘图技巧实现的吗**？并且，它们只是强大的 `background` 中非常小的一部分！

在本小册中，我们将会挖掘 CSS 中各种常用高频属性，真正理解并且掌握它们，通过介绍许多不为人知的技巧，学会如何将它们真正运用于实践中，提升页面重构效率，提升用户体验及可访问性。为每天碰到的各种 CSS 问题构思巧妙且简洁的解法！

 
## 不可思议的动画与过渡

合理使用动画能够非常好地提升我们页面的用户体验，增强页面的表现力。而 CSS 动画到今天，也已经是非常之强大。

你肯定知道 CSS 中有滤镜，但是你知道如下这些效果，居然都是由滤镜完成的吗？

CSS 绘制的火焰效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed403bc89ca2455abbd60cb8765283d7~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

CSS 模拟华为手机充电效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c909a88db06b49f0b76e4e8e71d8c6e0~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

你知道如下这种有意思的边框动画和文字动画，由背景 `background` 配合 `mask` 可以轻松实现吗？

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5201a25cedc4221817f102ead0ce048~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

还有由背景实现的酷炫的文字动画:

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eaf1e0f5856a4eda8312b6718675c7ce~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

又或者在设计中非常常见的波浪动画，使用 CSS 也可以达成：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/005974e2b90a43749fdc80f275103680~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

有想过如何仅仅依靠 CSS，实现如此复杂的图片交互效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d4ee81f4eda4f26831830210e23f614~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

有思考过，如何利用 CSS 3D 技术，来增强页面的交互体验吗，实现这么一种 3D Hover 效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/43638af82aa340419f337fdb3b3f5f49~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

在本小册中，上述的内容都将是我们会遇到的实际场景！我们将会介绍如何在理解、掌握 CSS 各个属性的基础上，进一步在实际场景中运用它们，帮助我们创造各种有意思的、不可思议的动画效果。

## 奇思妙想 CSS

上述内容基本都是在我们实际业务中、生产环境中能够用得上的，并且很有帮助。

当然，我认为 CSS 发展到今天，其作用及功能绝不止如此。我们能够用 CSS 实现的还有更多！

像是使用渐变创造的艺术图案：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1500442960354c9ab85105625d8d7d1c~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d58d44a4fa74364a849a13dd8149a09~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

使用混合模式创造的艺术图案：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4c9d301ee8e4b4692508cbc3f238d34~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

使用 `clip-path` 实现的故障艺术：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a9eb2592513452681cdfef9b0636cfd~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

使用滤镜实现的类似于烟雾质感的效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/38f26a8b4d044a61b04a348f2d79a77e~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

使用 3D 构建的无限循环动画：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51c831241c364d629595344c1f4283b9~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

又或者是这样的 3D 时空效果：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/81f36cc72e9046e39dbf6453d8f8b935~tplv-k3u1fbpfcp-zoom-1.image" alt=""  /></p>

在本小册的一些章节中，我还会穿插介绍一些使用 CSS 实现的美妙图案、高级感拉满的动画效果，以及“不可思议”的 CSS 艺术效果。通过它们，彻底拔高我们对 CSS 的认知。通过它们，更好地理解 CSS 的本质、动画的本质。通过它们，学会举一反三，并在恰当的时机利用 CSS 解决实际面临的难题！

## 总结

总之，本小册将会从多个方面为你剖析和讲解，包括但不限于如下：

-   绘制各类图形；
-   实现复杂布局；
-   兼容设备差异；
-   制作酷炫动画；
-   完善复杂交互；
-   构建奇思妙想的艺术效果。

本小册会由浅入深地逐一讲解，通过对一个一个属性的剖析，兼顾基础的概述，同时注重对技巧的挖掘，结合实际进行运用。**不仅适合刚入门的新手，更加适合希望在 CSS 领域有所突破、对 CSS 的掌握能够更上一层楼的同学**。

如果上面的某个 Demo 有打动到你，如果你也渴望成为 CSS 高手，如果你也希望 CSS 能够成为你的优势技能，以帮助你更好地在前端立足，那么本小册绝对是你应该需要读一读的。

你将能够得到的`收获`：

1.  从入门到精通，深度学习 CSS 中高频核心属性；
1.  高阶技巧放送，学会灵活运用 CSS 解决各类样式、交互疑难点；
1.  从静态到动态，彻底掌握 CSS 动画原理及性能调优技巧；
1.  构建核心竞争力，理解并且掌握各种现代化 CSS 新知识。

我的目标：希望这是一本 **`能够帮助你从对 CSS 仅仅是略懂一二的水平，跨越到敢说自己是 CSS 高手水平`** 的小册。我想通过这本小册，把 CSS 中真正精华的部分，毫无保留地传递给大家。

很多时候，实现一个页面，**不仅仅只是按照设计稿把它还原出来那么简单**，还原静态设计稿只是第一步，我们基于静态页面还能继续完善丰富它与用户的交互，设计恰当的动效，关注不被大部分人重视的可访问性，而正是这些点，能够体现我们作为一名前端工程师与他人的不同之处。

真正掌握 CSS，并且利用它创造更多价值，将更好的体验与交互带给用户，才能真正体现我们作为前端工程师的价值所在。
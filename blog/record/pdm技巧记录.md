---
#slug: use-nuxt3-build-api-server
title: pdm技巧记录
date: 2024-03-13
#authors: Ray
tags: [pdm, python]
keywords: [pdm, python]
description: python的包管理工具pdm
#image: https://img.kuizuo.cn/202312270328599.png
#sticky: 2
---

## 全局配置
```shell
# 全局配置镜像地址
pdm config --global  pypi.url  "http://cmc-cd-mirror.rnd.huawei.com/pypi/simple/"

# 查看全局配置的目录,之后可以编辑对应的文件进行配置(因为一开始可能没有全局配置的文件,所以执行上一步进行生辰个,当然也可以自己创建)
pdm config --global
```

<!-- truncate -->


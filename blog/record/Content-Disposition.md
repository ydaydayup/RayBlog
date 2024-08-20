---  
title: Content-Disposition包含中文的解决方案【前后端】
date: 2024-03-23  
authors: Ray  
tags: [ Content-Disposition, 文件下载 ]  
keywords: [ Content-Disposition, 文件下载 ]  
description: Content-Disposition包含中文的解决发难 
#image: https://img.kuizuo.cn/202312270328599.png  
sticky: 2  
---  

<!-- truncate -->

```python
def generate_content_disposition(filename):
        """
        解决filename存在中文问题
        参考fastapi中的文件下载的代码
        :param filename:
        :return:
        """
        content_disposition_filename = quote(filename)
        content_disposition_type: str = "attachment"
        if content_disposition_filename != filename:
            content_disposition = "{}; filename*=utf-8''{}".format(
                content_disposition_type, content_disposition_filename
            )
        else:
            content_disposition = '{}; filename="{}"'.format(
                content_disposition_type, filename
            )
        return content_disposition
```

```ts
import fileDownload from 'js-file-download' // 下载文件
const contentDisposition = decodeURIComponent(res.headers['content-disposition'])
  // "*=utf-8''%E7%AB%AF%E5%8F%A3%26%E6%BC%8F%E6%B4%9E%E6%89%AB%E6%8F%8F%E6%B5%8B%E8%AF%95%E7%BB%93%E8%AE%BA.docx"]
  const filename = [...contentDisposition?.matchAll(/filename.*?=.*['"](?<filename>.+)/g)][0]?.groups?.filename
```


这段代码分为两部分，一部分是Python代码，另一部分是JavaScript代码。下面是对这两部分代码的解释：

### Python代码部分：
这是一个Python函数，名为`generate_content_disposition`，其目的是生成一个适合HTTP响应头中`Content-Disposition`字段的值。这个字段通常用于定义响应体的呈现方式，比如告诉浏览器这是一个文件，并且应该被下载。

函数接收一个参数`filename`，即要下载的文件的名称。

1. 使用`quote`函数（来自Python标准库`urllib.parse`模块）对`filename`进行URL编码，以确保文件名中的非ASCII字符可以安全地在HTTP头中传输。编码后的文件名存储在`content_disposition_filename`变量中。

2. 定义一个变量`content_disposition_type`，值为`"attachment"`，表示响应体是一个附件，应该被下载。

3. 如果编码后的文件名与原始文件名不同（即文件名中包含非ASCII字符），则使用`filename*=utf-8''`格式来构造`Content-Disposition`的值，这是RFC 5987规定的编码方式，用于处理非ASCII字符的文件名。

4. 如果文件名没有变化（即文件名只包含ASCII字符），则直接使用`filename="..."`格式。

5. 函数返回构造好的`Content-Disposition`值。

### JavaScript代码部分：
这段JavaScript代码用于处理HTTP响应头中的`Content-Disposition`字段，并从中提取文件名。

1. 使用`decodeURIComponent`函数解码`Content-Disposition`的值，因为HTTP头中的URL编码可能没有被正确解码。

2. 使用正则表达式`/filename.*?=.*['"](?<filename>.+)/g`来匹配`Content-Disposition`字段中的文件名部分。这个正则表达式查找以`filename=`开始，后面跟着任意字符，直到遇到单引号或双引号，捕获这部分内容作为文件名。

3. 使用`matchAll`方法查找所有匹配项，并通过解构赋值获取第一个匹配项的`filename`组。

4. `const filename`变量将存储解码后的文件名。

### 导入的`js-file-download`库：
这是一个JavaScript库，用于简化文件下载的过程。通过调用这个库的`fileDownload`函数，可以轻松地触发浏览器的下载行为，而不需要处理Blob对象或设置`Content-Disposition`头。

整体来看，这段代码的目的是处理文件下载时的文件名编码问题，确保即使文件名包含非ASCII字符也能被正确处理和下载。

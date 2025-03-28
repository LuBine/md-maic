## 编写基本块
在此部分，您将学习如何编写一份 `Syntax.json` 的基础块用于文本解析。我们在这里以 *HTML* 元素 `sup` 作为介绍。

正常情况下的 sup 是用于 数学平方x<sup>2</sup> 或 书节的解释性注释<sup>1</sup> 

#### > 按 **正则表达式查找** 方言符号 “^”
> 此查找方法可以寻找 `x^2` 或 `x^2^` 的匹配格式，使用正则表达式需要转码填写 base64，否则不会按照你的预期运行！
```json
"sup": {
    "index": null,
    "RegExp": ["L1xeKC9kKykvZw==", "L1xeKC9kKylcXi9n"],
    "element": "<sup>$1<sup>"
}
```

#### > 按 **索引查找** 方言符号 “^”
> 此查找方法只能寻找 `x^2^` 的匹配格式
```json
"sup": {
    "index": ["^"],
    "RegExp": [],
    "element": "<sup>$1<sup>"
}
```

#### 这二者可以合并写为如下，而不用写两条（下面介绍将使用此条内容）：
```json
"sup": {
    "index": ["^"],
    "RegExp": ["L1xeKC9kKykvZw==", "L1xeKC9kKylcXi9n"],
    "element": "<sup>$1<sup>"
}
```

## 应用您的基本块
在 **md-maic** 规定的 `Syntax.json` 文件当中，你需要先 **对基本块打包** 然后 **提交给黑白名单** 。头部文件编写如下：
```json
"maic":{
    "AllowList":["default"],
    "BlockList":[],
    "apply":{
        "default":["sup"]
    }
}
```

## 关于拓展语法支持
基本块的标准只要求必须填写 **index**,**RegExp**,**element** 这三个。

但我们推荐的通用标准可加上 **Group** 和 **tip** 用于清晰文件结构和协助管理。这在 Release 0.0.4 版本中是可以兼容的。

在给组织提供的开发版中，可能你必须填写此通用规范。

```json
      "ruby": {
        "index": null,
        "RegExp": ["LyguKz8pOjohKC4rPyk6Oi9n"],
        "element": "<ruby>$1<rt>$2</rt></ruby>",
        "Group": "github-:"
      },
      "color-natural": {
        "index": null,
        "RegExp": ["LyhbXlxzXSspOjojKFthLXpBLVowLTldKyk6Oi9n"],
        "element": "<font color='#$2'>$1</font>",
        "Group": "github-:"
      },
      "color-16": {
        "index": null,
        "RegExp": ["LyhbXlxzXSspOjomKFthLXpBLVowLTldKyk6Oi9n"],
        "element": "<font color='$2'>$1</font>",
        "Group": "github-:"
      },
      "title": {
        "index": null,
        "RegExp": ["LyhbXlxzXSspOjooLis/KTo6L2c="],
        "element": "<font title='$2'>$1</font>",
        "Group": "github-:",
        "tip":"此正则规则是泛匹配，当 打包的正则表达集包含其同类 Group 时必须放于最后一个！"
      }
```

---
[<button>上一篇：定义你的语法!</button>](./[00]custom%20syntax.md) | [<button>下一篇：提交基本块</button>](./[02]Apply%20Item.md)
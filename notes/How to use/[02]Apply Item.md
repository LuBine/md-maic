## 提交基本块
在实际编写中，我们更倾向于使用 **"index"** 或 **"RegExp"** 的某一条、行规则，这在 **apply** 打包中是可以自定义的，在 **md-maic** 程序中被称为 `ePATH`。

> [!tip]
> 由于 interface 的缘故，所以和编程语言字符串数组(列表)读取的方式略有不同，需要额外加个符号 '.' 用于统一标识 `ePATH` 。

```json
"maic":{
    "AllowList":["匹配 RegExp 的指定规则"],
    "BlockList":[],
    "apply":{
        "默认匹配 RegExp 的全部规则":["sup"],
        "匹配 RegExp 的全部规则":["sup.RegExp"],
        "匹配 RegExp 的指定规则":["sup.RegExp.0"],
        "匹配 Index 的全部规则":["sup.index"],
        "匹配 Index 的指定规则":["sup.index.0"]
    }
}
```
对于文本 `x^2^123^1^^`，根据 AllowList 应用的规则，就只会解析为 x<sup>2^123^1^^</sup> 了。

---
[<button>上一篇：编写基本块</button>](./[01]Create%20Item.md) | [<button>下一篇：屏蔽基本块</button>](./[03]Block%20Item.md)
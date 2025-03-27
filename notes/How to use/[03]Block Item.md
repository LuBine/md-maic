## 屏蔽基本块
在实际的编写中，
如果我们选中了此文本，再使用 <kbd>Ctrl</kbd> + <kbd>SHIFT</kbd> + <kbd>A</kbd> (`markdown.md-maic.processText` 标识，`md-maic.main` 命令)
```latex
$$
x^2+y^2+2xy=(x+y)^2
$$
```

那么就会被解析为
```latex
$$
x<sup>2+y^2+2xy=(x+y)^2</sup>
$$
```

对于其他方言或编程语言来说，这显然是不合适的。**"BlockList"** 配置就是解决这类问题的。它会在队列化解析任务后（已选中文本，开始格式化后的程序任务中的一部分），从文本中屏蔽这类文本。

> [!tip]
> **"apply"** 默认适配 `ePATH` 的对象。
```json
{
    "maic":{
        "AllowList":[],
        "BlockList":["默认匹配 index"],
        "apply":{
            "默认匹配 index":["sup","latex"]
        }
    }
    "space":{
        "latex":{
            "index":["$","$$"],
            "RegExp": [],
            "element": ""
        }
    }
}
```

---
[<button>上一篇：提交基本块</button>](./[02]Apply%20Item.md) | [<button>下一篇：md-maic 快捷键绑定</button>](./[04]md-maic%20keybord%20bind.md)
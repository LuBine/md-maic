# 定义你的语法!
> [!tip]
> Syntax.json 文件位于 rootDir/Syntax.json <br>
> 关于文件结构 👉 [DataTree](../How%20to%20Develop/DataTree.md)

`Syntax.json` 定义了名称为 *maic* 的 **系统配置项** 和名称为 *space* 的 **正则块匹配池**。

`Syntax.json` 允许您制作正则集合打包到 **apply** 的系统配置项当中。

`Syntax.json` 允许您规定 **黑名单** 和 **白名单** 以规避方言冲突问题。

`Syntax.json` 的基础语法支持 **按索引查找 [index]** 和 **按正则表达式查找[RegExp]** ，然后用 *格式化后* 的 **HTML 标记元素** 直接替换掉对应的文本。

> [!important]
> 目录
> 1. 了解 Syntax.json 的文件结构 >> [GO](#syntaxjson-的文件结构)
> 2. 编写基本块 >> [GO](./[01]Create%20Item.md)
> 3. 提交基本块 >> [GO](./[02]Apply%20Item.md)
> 4. 屏蔽基本块 >> [GO](./[03]Block%20Item.md)
> 5. md-maic 快捷键绑定 >> [GO](./[04]md-maic%20keybord%20bind.md)
> 6. md-maic 配置设置 >> [GO](./[05]md-maic%20config%20setting.md)



## Syntax.json 的文件结构
> 在 `Syntax.json` 当中，JSON 所有的 `Array` 类型均填写 `Object`。

#### > interface 具体匹配规则如下
```ts
interface Syntax_header {
    maic:{
        AllowList:string[];
        BlockList:string[];
        apply:{
            [key:string]:string[]
        }
    }
}

interface Syntax_item {
    index: string[] | null;
    RegExp: string[];
    element: string;

    // 此段作为匹配保留项，供插件后续的添加修改
    dynamicFields?: Record<string, { RegExp: string[]; element: string; } | null>;
}

interface Syntax extends Syntax_header {
    space: {
        [key:string]:Syntax_item;
    }
}
```

---
[<button>下一篇：编写基本块</button>](./[01]Create%20Item.md)
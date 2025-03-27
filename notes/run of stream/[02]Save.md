# 存储数据内容

`Syntax.json` 在程序中的存储属于动态存储，每次运行都将重新获取此文件创造结构。

因此，存储的数据在每次流有实质性输入后会不断变化，重要内容包含如下：
|存储名称|类型|来源|介绍|
|-|-|-|-|
|Syntax 空间变量|Any|初始化、程序运行|存储 Syntax 的结构化 JSON 数据|
|WorkTask|Any|初始化、程序运行|存储 auto 待处理的正则匹配队列|
|SelectedText|String|程序运行|存储待处理的已选中文本|
|tmp|Any|程序运行|黑名单标识符空间,存储 Block 的数据类型|

## 后续可能存在的优化方向
1. 存储 `Syntax.json` 到 com_Stream 的内存当中。
2. 通过 Windows 服务对比 MD5 值决定是否刷新内存。

# 构造存储数据的程序处理流

1. 从 `com_Stream` 中获取 FORMAT:object 后的数据构造 中间层映射结构 用于 `WorkTask` 的队列构造。
2. 访问 **"apply"** 配置中交付的 *正则规则集（packages）*
3. 构造 *正则规则集* 中存在的基本块形成 WorkTask（Space池中选中格式化规则）
4. 判断 *正则规则集* 是位于 **AllowList** 还是 **BlockList**


---

[<button>上一篇：程序工作的读取流</button>](./[01]Read.md) | [<button>下一篇：程序运行</button>](./[03]Run.md)
# 在 VSCode 当中启用 md-maic
此 NOTES 分类主要告诉你 md-maic 的 **业务处理逻辑** 和 **业务数据处理流** 是怎么样的。更多技术细节请参考源代码。

在 `package.json` 的 VSCode 注册文件中，我们规定了插件只能在你 **正在编辑** *markdown* 文件时才能使用！`md-maic.help` 除外。

当你的页面焦点聚集到 `.md` 文档时，VSCode 会 push 热加载这个插件到 你的工作空间。此时 md-maic 将根据 **Register Manager** 的配置注册命令并告知插件是否可以工作。

当插件已工作时，md-maic 会动态监控配置是否更改以加载预制的程序。


## 启用 md-maic 的工作流程总述
当您聚焦于 `.md` 文档时。
1. 注册 `md-maic.help` 全局命令，并不限制运行要求。
2. 根据 **VSCode** 的语言初始化如 `en.json` 的业务翻译文件。（一次性的，后续无监听）
3. 注册 *基本命令* 和 *保留命令* 👉[查看哪些属于基础命令](../How%20to%20use/[04]md-maic%20keybord%20bind.md)
4. 进入动态配置监听区，监听 **观察性功能命令** 是否在 **Register Manager** 中启用以加载。


## 基础命令注册与工作流程总述

`md-maic.main` 相较于 `md-maic.kbd` 而言，属于根据 `Syntax.json` 的配置间接解析 **你所选中的文本** 。

所以在 VSCode 的注册命名上，`md-maic.kbd` 的辨识符是 `markdown.md-maic.function.kbd` 而非 `markdown.md-maic.kbd`

你可以通过它辨识不同命令的基本工作流程。

---
[<button>下一篇：程序工作的读取流</button>](./[01]Read.md)
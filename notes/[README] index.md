# VScode.md-maic NOTES 帮助


ℹ️  ***适配 0.0.4 版本，GITHUB 保持更新***


根据 MaicWorkbench 的相关定义进行的文档配置，请搭配专业的 Markdown 阅读器以确保阅读便捷！



## 如何使用 md-maic ？
使用 **md-maic** 的默认快捷键是  <kbd>Ctrl</kbd> + <kbd>Shfit</kbd> + <kbd>A</kbd>

这是默认分配的格式化 **按键**，对应的命令是 `md-maic.main`，在我们提供的 [测试文件](../conf/maic/test.md) 中，可以快速预览它的效果。

让我们先从 [如何定义方言语法](./How%20to%20use/[00]custom%20syntax.md) 开始，然后深入了解 [按键绑定与命令分配](./How%20to%20use/[04]md-maic%20keybord%20bind.md)。最后关注 [此插件的 VSCode 配置设定](./How%20to%20use/[05]md-maic%20config%20setting.md) 后。您便可以丝滑地使用它了。



## 参与到 md-maic 的开发
我推荐你先了解 [此插件的工作存储结构](./How%20to%20Develop/DataTree.md) 对我们项目文件的结构有所了解。然后从 [VSCode插件加载](./run%20of%20stream/[00]Enabled.md) 了解程序是如何 [处理数据](./run%20of%20stream/[01]Read.md) 的。

在拥有了基本的业务选择概念后，在 **How to develop** 文件夹中了解有关 **中间层** 和 **规范处理** 的内容部分！



## 安全性开发内容变动告知
在经过多次测试分析后，出于安全性考量，我在 `Release 0.0.4` 版本中完全移除了 **functionLab** 的拓展功能以避免遭受到网络攻击。

这意味着热加载在后续版本会一直受限。此版本在热加载方面，只有 `Syntax.json` 和 `语言文件.json` 是受支持的。

> [!tip]
> 当前，我对同步文件（Sync *.json）的态度是追求稳定。非缺失的必要情况下，是不会从组织网络上获取分发资源的。

对于后续所有的 Release 分发版，都不允许加载 `root.ts` 文件以获取 `DevTools` 的调试权限。包括热加载任何 `*.ts` 文件。
## md-maic 配置设置

相较于我们在 `package.json` 设置的全局默认值而言，VSCode 在你改变了配置值后，会单独生成一份文件用于保证您更改的使用。

**md-maic** 的配置现在完全交由 **Register Manager** 进行配置管理

例如在 branch:Develop 版本中应用 `root.ts` 调试时，appStamp 值会改变。

这意味着我们会主动设置一些检测内容用于防傻防呆，这在 Release 版本中是十分常见的。而 Develop 版本相对来说会少很多。

更多的配置设置请直接查看源码，而非在这个介绍文件上。

---
[<button>上一篇：md-maic 快捷键绑定</button>](./[04]md-maic%20keybord%20bind.md)
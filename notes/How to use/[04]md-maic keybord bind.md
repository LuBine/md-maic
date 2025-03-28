## md-maic 快捷键绑定

### 关于 VSCode 使用

> [!tip]
> 在文本编辑时 按住 <kbd>alt</kbd> 配合 *光标* 可实现 多选区操作！

<kbd>Ctrl</kbd> + <kbd>Shfit</kbd> + <kbd>A</kbd> 是 md-maic 功能的默认使用键。

<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> 打开 VSCode 的执行面板，可以搜索 md-maic 的命令。

<kbd>Ctrl</kbd> + <kbd>,</kbd> 打开 VSCode 的设置页面，可以配置 md-maic 的设定。

<kbd>Ctrl + A</kbd> + <kbd>Ctrl + S</kbd> 打开 VSCode 的键位分配页面，可以分配 md-maic 命令的快捷键用于 **避免按键冲突**。



### 以下是关于命令/标识符的部分
<font color="green">绿色</font> 代表 后续开发长期保留的 **基础命令**，不再更改。<br>
<font color="red">红色</font> 代表 **保留命令**，但并没有被正式归类进 `Syntax.json`。<br>
<font color="blue">蓝色</font> 代表 **功能正在观察**，属于测试性内容。

|命令|快捷键|功能介绍|注册标识符|
|-|-|-|-|
|<font color="green">md-maic.main</font>|<kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>A</kbd>|按 syntax.json 的配置，快速格式化 markdown 文件的方言显示|markdown.md-maic.main|
|<font color="green">md-maic.help</font>||获取 md-maic 的帮助|markdown.md-maic.help|
|<font color="red">md-maic.kbd</font>|<kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>X</kbd>|快速创建 `<kbd></kbd>` 或 快速格式化指定内容为 <kbd>kbd</kbd> 元素(标签)|markdown.md-maic.function.kbd|
|<font color="blue">md-maic.than</font>||快速创建 `&lt; &gt;` 或 将大小符号转化为 `&lt; &gt;`|markdown.md-maic.function.than|
|<font color="blue">md-maic.br</font>||快速创建 `<br>` 元素换行|markdown.md-maic.function.br|
||<kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>Q</kbd>|**【推荐保留的快捷按钮供分配或替换】**|
---
[<button>上一篇：屏蔽基本块</button>](./[03]Block%20Item.md) | [<button>下一篇：md-maic 配置设置</button>](./[05]md-maic%20config%20setting.md)
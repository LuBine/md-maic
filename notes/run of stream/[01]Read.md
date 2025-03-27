# 程序初始化工作的读取流

在上一篇中，你应该了解了不同命令之间的区别。后面的所有介绍都是建立在 **间接解析文本** 的基础上

> [!tip]
> 如果你希望了解直接解析文本的工作流，请参考 NOTES 分类: `How to Develop`，我们将 **[FunctionLab](../How%20to%20Develop/Release%20md-maic.function.md)（辨识符：markdown.md-maic.function.*）** 的内容整合了进去。


## 构造插件支持
1. 获取 `extension.Path` 位置，直接指向 NOTES 文件位置


## 异步注册业务语言支持
1. 获取 **用户使用语言**，**语言文件路径**，**备用文件路径**，**配置设定**，**网络文件路径**
2. 进入 **异常捕获块**，尝试装载使用文件路径，不成功则装载英文，最后保底为装载网络文件路径
3. 如果进入网络文件获取阶段，异步加载文件并保存到本地语言配置文件夹。
4. 上述功能都失效后，代表无此类语言支持且网络环境恶劣， `throw new Error` 终止代码运行。


## 初始化语法文件
1. 读取 **Registe Manager** 的 语法文件 值（默认 Syntax.json）
2. 通过 `maicofig` 构造文件基础路径 `RootMaker()` 做读取前的准备
3. 读入文件，进入 `com_Stream` 进行文件校验与构造
4. 确认 **语法文件** 装载完毕。



# 程序运行的读取流

完成初始化的标志是 md-maic 向 VSCode 递交了 基础命令。后续的命令无需重复加载。

1. 通过 `vscode.window.activeTextEditor` 对象，获取已选中的文本。
2. &lt;后续实验中的功能&gt; 按选中的行格式化。


---

[<button>上一篇：在 VSCode 当中启用 md-maic</button>](./[00]Enabled.md) | [<button>下一篇：存储数据内容</button>](./[02]Save.md)
# 实验室文档
> [!TIP]
> 此文档只有简体中文版本，其他版本请使用自行翻译！

我们将部分功能定义为了实验室功能，用于不断测试与改进。满足以下全部条件的功能将成为实验室功能：
1. 非本地运行的脚本
2. 涉及到网络资源请求
3. 会影响插件系统的运行
4. 属于插件系统架构(最低限度是需要满足vscode的命令激活)一部分

满足以下任意条件也将被视为实验室功能：

1. 涉及数据库操作

## 关于实验室开启方式
实验室开启需要你在设置中主动增加记录用于激活对应功能（项/Item 需要填写文件名），关闭或者卸载同理。这些功能都受 addon/qcrAPI.ts 管辖，任何JS文件接入架构都需要在其中进行注册。

`Markdown md-maic config` > `function Lab` 只接受 String 类型的数据，能够兼容 JSON。

## 实验室功能管控方法
很简单，对应关系如下：
|Object|Key|Value(Bealon)|
|-|-|-|
|文件名|函数|是否启用|
```json
"Object":{ "Key": true }
```

## 0.0.4版本 实验室预装功能
|文件名(fileName)|注册名(Item)|值(Value)|函数功能|备注|
|-|-|-|-|-|
|无|appStamp|20241104-github|无|版本标记、无实际应用意义|
|element.js|element.js|{"FormatKBD": true, "FormatTag": true}|FormatKBD、FormatTag|GitHub讨论结果|
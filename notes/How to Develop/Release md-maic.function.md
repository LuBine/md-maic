# `markdown.md-maic.function.*` 保留命令设计宗旨

md-maic 的命令大致分为以下两种:
1. `markdown.md-maic.*` 间接解析命令
2. `markdown.md-maic.function.*` 直接解析命令

间接解析命令的用法主要在于先导入 `Syntax.json` 文件构造解析队列，然后格式化 **已选中的文本**。

直接解析命令是对 **已选中文本** 直接应用函数解析。在 `0.0.4` 版本以前的设计讨论中就是 **实验室功能**。

# 0.0.4 版本的直接解析命令函数代码公示

我们在这里公示了 Release 0.0.4 版本的 md-maic 有哪些直接解析的命令，在任何情况下，你都可以在 [VSCode快捷键分配](../How%20to%20use/[04]md-maic%20keybord%20bind.md) 的页面下，为它们添加快捷键！


> 此版本无 tmp 存储格式化前的字符串的中间层，是否可逆由开发者提供。
可逆的概念是对于同一段文本，反复应用此命令可以在 **格式化前** 和 **格式化后** 中转化。

**适配多选区** 意味着 <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd> 的操作可用。但在这里只展示代码原理核心实现部分，实际应用请查看源代码。

|命令|关键符号|是否可逆|对应元素|适配多选区操作|
|-|-|-|-|-|
|markdown.md-maic.function.kbd|+|不可逆|&lt;kbd&gt;&lt;/kbd&gt;|已支持|
|markdown.md-maic.function.than|<、>、\&lt;、\&gt;|可逆|<>、\&lt;、\&gt;|已支持|
|markdown.md-maic.function.br|无|不可逆|&lt;br&gt;|已支持|

## `markdown.md-maic.function.kbd` - 添加/格式化 &lt;kbd&gt; 元素

此部分属于需要精细化的内容，但由于精力原因没有进一步更新，后续可能将它加入基础命令。

它的默认的全局快捷使用键是: <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>X</kbd>

### 以下是我们推荐的经典写法：

|选中字符串|正则匹配替换结果|
|-|-|
|Ctrl+Shift+A|<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>A</kbd>|
|Ctrl + Shift + L|<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd>|
|Ctrl+C|<kbd>Ctrl</kbd> + <kbd>C</kbd>|
|Ctrl+V|<kbd>Ctrl</kbd> + <kbd>V</kbd>|

### 下述写法极大可能会造成歧义，后续需要讨论：

|选中字符串|正则匹配替换结果|
|-|-|
|+|<kbd></kbd> + <kbd></kbd>|
|Ctrl++|<kbd>Ctrl</kbd> + <kbd></kbd> + <kbd></kbd>|
|Ctrl +C|<kbd>Ctrl</kbd> + <kbd>C</kbd>|
|Ctrl+ C|<kbd>Ctrl</kbd> + <kbd></kbd> <kbd>C</kbd>|
|Ctrl+ C+ v|<kbd>Ctrl</kbd> + <kbd></kbd> <kbd>C</kbd> + <kbd></kbd> <kbd>v</kbd>|
|Ctrl+ C +v|<kbd>Ctrl</kbd> + <kbd></kbd> <kbd>C</kbd> + <kbd>v</kbd>|
|Ctrl+C + Ctrl+V|<kbd>Ctrl</kbd> + <kbd>C</kbd> + <kbd>Ctrl</kbd> + <kbd>V</kbd>|

它应用的正则表达式如下：
```re
/([A-Za-z0-9!@#$%^&*()_+={};':"<>?,./`~]+(?:\s*\+\s*[A-Za-z0-9!@#$%^&*()_+={};':"<>?,./`~]+)*)/g
```
> [!tip]
> 匹配的关键字符在于 **"+"**，左右无内容会自动添加 `<kbd></kbd>`。如果选中未含关键字符的字符串，默认把这段字符串插入 `<kbd></kbd>`当中。
>
> 此过程在 md-maic 当中不可逆。
```ts
function formatKBD(processedText) {
    return processedText = processedText.replace(/([A-Za-z0-9!@#$%^&*()_+={};':"<>?,./`~]+(?:\s*\+\s*[A-Za-z0-9!@#$%^&*()_+={};':"<>?,./`~]+)*)/g, (match) => {
        return match.split('+').map(key => `<kbd>${key.trim()}</kbd>`).join(' + ');
    });
}
```

## `markdown.md-maic.function.than` - 添加/格式化 "&lt;"、"&gt;" HTML元素声明符号

```ts
function formatThan(processedText){
   let typeE = processedText.includes('<') ?? processedText.includes('>');
   var back = processedText;
   if(typeE)
   {
    back = processedText.replace(/</g, '&lt;').replace(/>/g, '&gt;');
   }
   else
   {
    back = processedText.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
   }
    return back;
}
```

## `markdown.md-maic.function.br` - 添加 &lt;br&gt; 元素

```ts
// 此方法已抛弃，采用了 insert() 的方法。
function formatBr(processedText){
    return processedText += '<br>';
}

// 现在的原理核心
editBuilder.insert(position, '<br>');
```

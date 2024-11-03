# **markdown dialect format**

**Converting markdwon's special markup to HTML's element on the file and quickly add kbd elements!**

<img src="logo.png" height="100px" style="align:center"/>

> &#x1F917; open-source on [GitHub](https://github.com/ZoMaii/md-maic)! | &#x1F3AF; edit file by VSCode(TS/JSON)

USE (*Text must be selected*):
1. <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>,input Command: `md-maic`
2. <kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>A</kbd> to query edit.
3. <kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>X</kbd>,input Command: `md-maic.kbd`

> [!WARNING]
> 此版本为 GITHUB 开发版本，并非正式版本源代码。可能会包含致命错误导致计算机被攻击，请勿直接使用！
>
> 提醒：虽然许可为MIT，但不推荐分发此开发版代码，推荐分发Main版本代码！
## **Dialect Table**
|dialect|element|nick|
|-|-|-|
|H\~2\~O|sub|subscript|
|E=mc\^2|sup|superscript|
|==hello==|mark|mark|


## 简体中文
将 Markdown 的一些方言转化为 HTML标签，让未安装拓展的阅读者能够轻松地查看它！

也可以快速修改kbd标签或切换 < 为 \&lt; 等特殊转义！

|markdown方言|HTML元素/HTML标签|介绍|
|-|-|-|
|H\~2\~O|sub|下标|
|E=mc^2|sup|上标|
|==hello==|mark|高亮|
|redtext::#red:1:|&lt;font color="red"/&gt;|文本颜色|
|MDN::MOZ//a org.::|&lt;font title="MOZ//a org."&gt;|注释|
|你好::!ni hao::||音标|

## 日本語
Markdownの方言をHTMLタグに変換し、拡張機能がインストールされていない読者でも簡単に閲覧できるようにします！

|方言|タグ|意義|
|-|-|-|
|H\~2\~O|sub|subscript|
|E=mc\^2|sup|superscript|
|==hello==|mark|mark|
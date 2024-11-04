# **markdown dialect format**

**Converting markdwon's special markup to HTML's element on the file and quickly add kbd elements!**

<div>
<img src="logo.png" height="150px"/>
<a href="https://github.com/zomaii"><img src="https://img.shields.io/badge/@ZoMaii-black?logo=github" height="20px"/></a>&nbsp;
<a href="https://github.com/ZoMaii/md-maic/tree/main"><img src="https://img.shields.io/badge/main-0.0.3-red?logo=git" height="20px"/></a>&nbsp;
<a href="https://github.com/ZoMaii/md-maic/tree/develop"><img src="https://img.shields.io/badge/develop-0.0.4(beta)-颜色?logo=git" height="20px"/></a>&nbsp;
<a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/Typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white" height="20px"></a>&nbsp;
</div>

> &#x1F917; open-source on [GitHub](https://github.com/ZoMaii/md-maic)! | &#x1F3AF; edit file by VSCode(TS/JSON)

USE (*Text must be selected*):

1. <kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>A</kbd> OR input Command: `md-maic`
2. <kbd>CTRL</kbd>+<kbd>Alt</kbd>+<kbd>X</kbd> OR input Command: `md-maic.kbd`
3. <kbd>CTRL</kbd>+<kbd>Alt</kbd>+<kbd>A</kbd> OR input Command: `md-maic.Tag`

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
|redtext::#red:1:|&lt;font color="red"/&gt;|color|
|MDN::MOZ//a org.::|&lt;font title="MOZ//a org."&gt;|title|

## 简体中文
通过快捷键将 Markdown 的一些方言转化为 HTML标签，让未安装拓展的阅读者能够轻松地查看它！

> &#x1F4A1; 通过 <kbd>CTRL</kbd>+<kbd>Alt</kbd>+<kbd>A</kbd> 可以快速转义 ‘<’ 和 ‘>’

|markdown方言|HTML元素/HTML标签|介绍|
|-|-|-|
|H\~2\~O|sub|下标|
|E=mc^2|sup|上标|
|==hello==|mark|高亮|
|redtext::#red:1:|&lt;font color="red"/&gt;|文本颜色|
|MDN::MOZ//a org.::|&lt;font title="MOZ//a org."&gt;|注释|
|你好::!ni hao::|&lt;ruby&gt;你好&lt;rt&gt;ni hao&lt;/rt&gt;&lt;/ruby&gt;|音标|

## 日本語
Markdownの方言をHTMLタグに変換し、拡張機能がインストールされていない読者でも簡単に閲覧できるようにします！

|方言|タグ|意義|
|-|-|-|
|H\~2\~O|sub|subscript|
|E=mc\^2|sup|superscript|
|==hello==|mark|mark|
|redtext::#red:1:|&lt;font color="red"/&gt;|color|
|MDN::MOZ//a org.::|&lt;font title="MOZ//a org."&gt;|title|
|日本語::!にほん::|&lt;ruby&gt;日本&lt;rt&gt;にほん&lt;/rt&gt;&lt;/ruby&gt;|rt|
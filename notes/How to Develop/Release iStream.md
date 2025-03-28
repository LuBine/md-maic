# md-maic iStream 开发模式

md-maic Release 0.0.4 是面向过程开发的最后一个版本，我在此版本彻底格式化它并采提供了这份 NOTES。

> [!tip]
> 此版本在打包时保留了源代码，有需求直接打开拓展文件夹查看。

如果 md-maic 有后续的开发需求，请参考 `src/iStream` 的未来概念设想。处理流将在代码结构上发生颠覆性的变化。

iStream 如果得到开发，后续将以 `WEB ES6` 的支持的方式开发，这意味着您可以在**任何支持** *vscode* 编辑器的网页应用上使用 `md-maic`，而非是桌面应用本身。

## Release 0.0.4 iStream 构想基础
1. `interface.ts` 基础流程定义
2. `work.ts` 流操作抽象层
3. `template.ts` 预设 md-maic 工作流
4. `tmprun.ts` 实例化 md-maic 预设的工作流
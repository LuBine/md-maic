# markdown.md-maic.main 函数工作原理

此部分主要对 processSelectionsWithPrompt 进行解释，`markdown.md-maic.main` 的主要业务处理基础单条逻辑是：
1. 临时匹配剔除选区内的 **黑名单** 文本内容，并留下 `<!--__TMP...__ -->` 的标识符用于占位。
2. 对剔除后的文本应用 **白名单** 文本内容
3. 按标识符换回替换选区的文本内容
4. 交由 **编辑者** 对象 执行文本 IO 替换操作

> processSelectionsWithPrompt 是上述操作的 MASTER。管控单选区的操作流。

## processSelectionsWithPrompt

processSelectionsWithPrompt 属于间接操作的核心部分，因此安全策略相对其他函数而言会更加充足，如 "??" 的备选存在。

总体步骤如下：
1. 获取活动编辑器实例
2. 文档状态快照（防丢失与页面切换导致的原对象关闭）
3. 选区处理逻辑（单选区工作）
4. 编辑队列准备
5. 异步进度处理
6. 应用编辑前校验
7. 批量应用编辑
8. 操作结果反馈
9. 统一错误处理


### 步骤一、获取编辑器实例
在命令注册函数中也包含此部分内容，没有注释的原因在于存在被强制修改的情况（源于他人共享的遥感数据）。
```ts
const editor = vscode.window.activeTextEditor;
if (!editor) {
    // 左下角提示
    vscode.window.setStatusBarMessage(LANGCONF.main?.no_active_editor ?? "未找到存活的编辑器", 3000);
    return false;
}
```
获取当前聚焦的文本编辑器对象（正在编辑的文件窗口）<br>
若不存在活动编辑器（关闭了所有文件），显示状态栏提示并终止操作（防止 package中的 when 失效）


### 步骤二、获取动态指针（文档状态快照）
```ts
// 原始
const initialDoc = editor.document;
// 自增
const initialDocVersion = initialDoc.version;
```

### 步骤三、多选区状态确认
```ts
let selections = [...editor.selections];
if (selections.every(s => s.isEmpty)) {
    // 显示模态弹窗让用户选择是否全选
    const choice = await vscode.window.showWarningMessage(...);
    
    // 用户取消操作
    if (choice !== 全选选项) {
        vscode.window.setStatusBarMessage(...);
        return false;
    }

    // 创建全文档选区
    selections = [new vscode.Selection(文档起始位置)];
}
```


### 步骤四、构造选区队列防越位
```ts
const edits: vscode.TextEdit[] = [];
const sortedSelections = [...selections].sort((a, b) => 
    b.start.compareTo(a.start)
);
```


### 步骤五、划分最大工作量，制作异步

```ts
await vscode.window.withProgress({...}, async (progress, token) => {
    // 最大五块，防卡顿
    const chunkSize = 5;
    for (let i = 0; i < sortedSelections.length; i += chunkSize) {
        // 分块处理逻辑
    }
});

···

// 检查取消请求
if (token.isCancellationRequested) break;

// 检查文档是否已关闭
if (initialDoc.isClosed) throw new Error("DOC_CLOSED");

// 报告进度
progress.report({
    message: `已处理 ${i+chunkSize}/${total}`,
    increment: 每块进度百分比
});
```


### 步骤六、校验切换，关闭，修改等情况
```ts
const currentEditor = vscode.window.activeTextEditor;
if (!currentEditor || currentEditor.document !== initialDoc) {
    // 文档被切换或关闭
}

if (currentEditor.document.version !== initialDocVersion) {
    // 文档已被修改，弹窗让用户确认是否覆盖
}
```



### 步骤七、集中在 edit() 中完成替换
```ts
const success = await currentEditor.edit(editBuilder => {
    edits.forEach(edit => editBuilder.replace(...));
}, { 
    undoStopBefore: true,
    undoStopAfter: false  // 结束步骤
});
```


### 步骤八、结算工作流
```ts
const statusMsg = edits.length > 0 
    ? `成功处理 ${edits.length} 个选区`
    : "未作任何修改";
vscode.window.setStatusBarMessage(statusMsg, 5000);
// MVP 5s 展示
```


### 步骤九、捕获异常
```ts
} catch (error) {
    const errorMap = {
        DOC_CLOSED: "文档已被关闭",
        DEFAULT: "操作执行失败"
    };
    // ... 显示错误信息
}
```
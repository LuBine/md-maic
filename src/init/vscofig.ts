// 此文件必须在激活前导入，提前激活 VSCode 的配置
import path from 'path';
import * as vscode from 'vscode';
import * as cr from './com_Stream';
import { auto, mergeSyntaxRule, SyntaxMaker, transSyntaxREG } from './md-maic_Syntax';
import { Report,Lang } from './maicofig';
import { randomUUID } from 'crypto';


export function VersionCheck(lang:any){
    let appStamp = vscode.workspace.getConfiguration('md-maic').get('RegisterManager.appStamp');
    if(appStamp != 'Release 0.0.4'){
        vscode.window.showWarningMessage(`${appStamp} ${lang.system.version.haveChange}`,`${lang.system.version.OK}`);
    }
}

function SpaceMaker(){
    return [
        'markdown.md-maic.main',
        'markdown.md-maic.function.kbd',
        'markdown.md-maic.function.than',
        'markdown.md-maic.help',
        'markdown.md-maic.function.br'
    ]
}


export function getConfigInfo(ePATH:string):string{
    const auto = cr.getConfigInfo_ForMat(ePATH);
    return vscode.workspace.getConfiguration(auto.whois)[`${auto.query}`];
}

    
interface Task{
    RegExp:RegExp,
    element:string
}


// index 对译
function escapeRegexChars(source: string): string {
    const escapedSource = source.split("").map(c => `\\${c}`).join("");
    const pattern = `${escapedSource}([\\s\\S]*?)${escapedSource}`;
    return pattern;
}

function processAutoRules(rules: auto[]): auto[] {
    return rules.map(rule => ({
        ...rule,
        RegExp: new RegExp(
            escapeRegexChars(rule.RegExp.source),
            rule.RegExp.flags
        )
    }));
}

function makeTaskService(enbaled:any, apply:any, Task:string[], space:any):Task[] {
    // 最终正则表达式构造
    // 此函数的核心要求是根据 md-maic_Syntax.ts/interface.auto 的 auto 属性
    // 构造最终可应用执行的 [{正则表达式，元素}] 列表。
    //
    // enbaled 代表 allow 或 block 这类的设置。
    // index 是 Space 的基本块命名，代表索引列表。
    // Space 是原始工作池。

    let index: any[] = [];
    let back: Task[] = [];
    enbaled.forEach((res: string | number) => {
        apply[res].forEach((rp: string | undefined) => {
            // console.log(rp)
            index.push(rp)
        })
    });
    
    Task.forEach(res => {
        // 进入单任务工作组
        // 返回值示例： [{...},{...},...]、[{...}]
        const once:any = transSyntaxREG(res,index,space);
        once.forEach((auto: any) =>{
            if(auto['auto']){
                const maded:Task ={
                    RegExp:auto['RegExp'],
                    element:auto['element']
                }
                back.push(maded)
            }else{
                const i = processAutoRules([auto]);
                const maded:Task ={
                    RegExp:i[0]['RegExp'],
                    element:''
                }
                back.push(maded);
            }
        })       
    })

    // foreach 不会遇到 return 终止函数
    return back;
}

// 处理单个选区文本
async function processSingleSelection(
text: string, allowTasks: Task[], blockTasks: Task[], start: vscode.Position): Promise<string> {
    // 黑名单阶段处理
    const tmpStorage = new Map<string, string>();
    const blockRegex = blockTasks.length > 0 
        ? new RegExp(blockTasks.map(t => `(${t.RegExp.source})`).join('|'), 'gi')
        : null;

    let phase1Text = text;
    if (blockRegex) {
        phase1Text = phase1Text.replace(blockRegex, match => {
            const key = `<!--__TMP_${randomUUID().replace(/-/g, '')}__-->`;
            tmpStorage.set(key, match);
            return key;
        });
    }

    // 白名单阶段处理
    let phase2Text = phase1Text;
    for (const task of allowTasks) {
        phase2Text = phase2Text.replace(task.RegExp, task.element);
    }

    // 恢复黑名单内容
    let finalText = phase2Text;
    if (tmpStorage.size > 0) {
        const restoreRegex = new RegExp(
            Array.from(tmpStorage.keys()).join('|'),
            'g'
        );
        finalText = finalText.replace(restoreRegex, match => 
            tmpStorage.get(match) || match
        );
    }

    return finalText;
}

// 多选区功能操作
async function processSelectionsWithPrompt(
    editor: vscode.TextEditor,
    allowTasks: Task[],
    blockTasks: Task[],
    LANGCONF:any
): Promise<boolean> {
    // 获取当前选区（创建副本避免污染原始数据）
    let selections = [...editor.selections];
    
    // 未选中文本处理流程（添加进度提示）
    if (selections.every(s => s.isEmpty)) {
        const choice = await vscode.window.showWarningMessage(
            `${LANGCONF.main.NO_SELECTED_AREA}`,
            { modal: true }, 
            `${LANGCONF.main.NO_SELECTED_AREA_True}`, `${LANGCONF.main.NO_SELECTED_AREA_False}`
        );
        
        if (choice !== `${LANGCONF.main.NO_SELECTED_AREA_True}`) {
            vscode.window.setStatusBarMessage(`${LANGCONF.main.NO_SELECTED_AREA_False_st}`, 3000);
            return false;
        }
        
        // 创建全文档选区（添加边界校验）
        const doc = editor.document;
        const textLength = doc.getText().length;
        selections = [new vscode.Selection(
            doc.positionAt(0),
            doc.positionAt(Math.max(0, textLength - 1)) // 防止越界
        )];
    }

    // 准备编辑队列（优化逆序处理逻辑）
    const edits: vscode.TextEdit[] = [];
    
    // 按选区起始位置逆序（更安全的处理顺序）
    const sortedSelections = selections.sort((a, b) => 
        b.start.compareTo(a.start)
    );

    // 添加异步进度提示
    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `${LANGCONF.main.working}`,
        cancellable: true
    }, async (progress, token) => {
        for (const [index, selection] of sortedSelections.entries()) {
            if (token.isCancellationRequested) break;

            progress.report({
                message: `${LANGCONF.main.working_item} ${index + 1}/${sortedSelections.length}`,
                increment: (100 / sortedSelections.length)
            });

            try {
                const original = editor.document.getText(selection);
                // 传入选区位置
                const processed = await processSingleSelection(
                    original, 
                    allowTasks,
                    blockTasks,
                    selection.start
                );
                
                if (processed !== original) {
                    edits.push(vscode.TextEdit.replace(selection, processed));
                }
            } catch (err) {
                console.error(`${LANGCONF.main.working_ERROR} [${selection.start.line}:${selection.start.character}]`, err);
                vscode.window.showErrorMessage(`${LANGCONF.main.working_ERROR} ${err instanceof Error ? err.message : err}`);
            }
        }
    });

    // 批量原子操作（优化大文档性能）
    try {
        const success = await editor.edit(editBuilder => {
            edits.forEach(edit => {
                
                const range = new vscode.Range(
                    editor.document.positionAt(editor.document.offsetAt(edit.range.start)),
                    editor.document.positionAt(editor.document.offsetAt(edit.range.end))
                );
                editBuilder.replace(range, edit.newText);
            });
        }, { 
            undoStopBefore: true,
            undoStopAfter: false,
        });

        // 添加处理结果提示
        if (success && edits.length > 0) {
            const msg = `${LANGCONF.main.working_in_0} ${edits.length} ${LANGCONF.main.working_in_1}`;
            vscode.window.setStatusBarMessage(msg, 5000);
        }
        return success;
    } catch (editErr) {
        console.error(`${LANGCONF.main.working_item_ERROR}`, editErr);
        vscode.window.showErrorMessage(`${LANGCONF.main.working_item_ERROR}`);
        return false;
    }
}


export function registerCommandMaic(context: vscode.ExtensionContext,LANGCONF:any){
    const com = SpaceMaker()[0];
    const editor = vscode.window.activeTextEditor;
    context.subscriptions.push(
        vscode.commands.registerCommand(com, async () => {
            let MySyntaxFile = await SyntaxMaker();
            let allow = MySyntaxFile[0]["AllowList"];
            let block = MySyntaxFile[0]["BlockList"];
            let apply = MySyntaxFile[0]["apply"];
            let space = MySyntaxFile[1];

            // 面向过程架构的 Stream 工作。此步骤未打包复用优化。
            // 此级别的流处理出问题，一律采取 Report 终止程序运行。
            // 含有 Report() 的层次才是受到 Release 0.0.4 生命周期中受支持的部分。
            // 需要观察程序处理流，去除 console.log 的注释即可！

            let WorkTask_allow:string[]=[];
            let WorkTask_block:string[]=[];
            allow.forEach((app: string) => {
                if(app in apply){
                    WorkTask_allow=mergeSyntaxRule(WorkTask_allow,apply[app]);
                }else{
                    // Report 会终止后续程序的继续运行
                    Report(`[AllowList] ${app} ${LANGCONF.system.syntax.no_pack}`);
                }
            });
            block.forEach((app:string) => {
                if(app in apply){
                    WorkTask_block=mergeSyntaxRule(WorkTask_block,apply[app]);
                }else{
                    // Report 会终止后续程序的继续运行
                    Report(`[BlockList] ${app} ${LANGCONF.system.syntax.no_pack}`);
                }
            });

            // console.log(WorkTask_allow);
            // console.log("-=-=-=-=-=-=-=-=-");
            // console.log(WorkTask_block);
            // console.log('\n');


            const allowTask = makeTaskService(allow,apply,WorkTask_allow,space);
            // console.log("-=-=-=-=-=-=-=-=-");
            const blockTask = makeTaskService(block,apply,WorkTask_block,space);
            
            console.log(allowTask);
            // const blockTask:Task[]=[
            //     { RegExp: /```([\s\S]*?)```/g, element: '' },
            //     { RegExp: /\$\$([\s\S]*?)\$\$/g, element: '' },
            //     { RegExp: /:::([\s\S]*?):::/g, element: '' },
            //     { RegExp: /\$([^\$]*)\$/g, element: '' },
            //     { RegExp: /`([^`]*)`/g, element: '' }
            // ]
            console.log(blockTask);


            if (!editor) {
                vscode.window.showErrorMessage(`${LANGCONF.system.editor.NO_OPEN}`);
                return;
            }
            
            const success = await processSelectionsWithPrompt(editor, allowTask, blockTask,LANGCONF);
            if (success) {
                vscode.window.setStatusBarMessage(`${LANGCONF.main.OK}`, 3000);
            }

            
        })
    )
}

export function registerCommandKBD(context: vscode.ExtensionContext,LANGCONF:any){
    const com = SpaceMaker()[1];
    const editor = vscode.window.activeTextEditor;
    context.subscriptions.push(
        vscode.commands.registerCommand(com, () => {
            if (!editor) {
                vscode.window.showErrorMessage(`${LANGCONF.system.editor.NO_OPEN}`);
                return;
            }
            const document = editor.document;
            const selections = editor.selections;
            
            // 检查所有选区是否都为空
            if (selections.every(selection => document.getText(selection) === '')) {
                vscode.window.showInformationMessage(`${LANGCONF.function.KBD.NO_SELECTED}`);
                return;
            }
            
            editor.edit(editBuilder => {
                selections.forEach(selection => {
                    const selectedText = document.getText(selection);
                    if (selectedText) {
                        // 转换快捷键格式
                        const convertedText = selectedText.replace(
                            /([A-Za-z0-9!@#$%^&*()_+={};':"<>?,./`~]+(?:\s*\+\s*[A-Za-z0-9!@#$%^&*()_+={};':"<>?,./`~]+)*)/g,
                            match => match.split('+').map(key => `<kbd>${key.trim()}</kbd>`).join(' + ')
                        );
                        editBuilder.replace(selection, convertedText);
                    }
                });
            }).then(success => {
                if (!success) {
                    vscode.window.showErrorMessage(`${LANGCONF.function.KBD.replace_ERROR}`);
                }
            });
        })
    )
}

export function registerCommandElement(context: vscode.ExtensionContext,LANGCONF:any){
    const com = SpaceMaker()[2];
    const editor = vscode.window.activeTextEditor;
    context.subscriptions.push(
        vscode.commands.registerCommand(com, () => {

            if (!editor) {
                vscode.window.showErrorMessage(`${LANGCONF.system.editor.NO_OPEN}`);
                return;
            }
            
            const document = editor.document;
            const selections = editor.selections;
            
            // 检查所有选区是否都为空
            if (selections.every(selection => document.getText(selection) === '')) {
                vscode.window.showInformationMessage(`${LANGCONF.function.THAN.NO_SELECTED}`);
                return;
            }
            
            editor.edit(editBuilder => {
                selections.forEach(selection => {
                    const selectedText = document.getText(selection);
                    if (selectedText) {
                        const hasSpecialChars = selectedText.includes('<') || selectedText.includes('>');
                        let convertedText = selectedText;
                        
                        if (hasSpecialChars) {
                            convertedText = selectedText.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                        } else {
                            convertedText = selectedText.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                        }
                        editBuilder.replace(selection, convertedText);
                    }
                });
            }).then(success => {
                if (!success) {
                    vscode.window.showErrorMessage(`${LANGCONF.function.THAN.replace_ERROR}`);
                }
            });

        })
    )
}


export function registerConfigHelp(context: vscode.ExtensionContext){
    const com = SpaceMaker()[3];
    context.subscriptions.push(
        vscode.commands.registerCommand(com, () => {
            const docPath = path.join(context.extensionPath, 'notes', '[README] index.md');
            const uri = vscode.Uri.file(docPath);
            vscode.window.showTextDocument(uri);
        })
    )
}

export function registerCommandBr(context: vscode.ExtensionContext,LANGCONF:any){
    const com = SpaceMaker()[4];
    const editor = vscode.window.activeTextEditor;
    context.subscriptions.push(
        vscode.commands.registerCommand(com, () => {
            if (!editor) {
                vscode.window.showErrorMessage(`${LANGCONF.system.editor.NO_OPEN}`);
                return;
            }
            const newSelections = editor.selections.map(selection => {
                const active = selection.active;
                // 折叠选区
                return new vscode.Selection(active, active); 
            });

            editor.edit(editBuilder => {
                newSelections.forEach(selection => {
                    const position = selection.active;
                    editBuilder.insert(position, '<br>');
                });
            }).then(success => {
                if (!success) {
                    vscode.window.showErrorMessage(`${LANGCONF.function.BR}`);
                }
            });
        })
    )
}

export function registerNone(context:vscode.ExtensionContext,COMMAND:number,LANGCONF:any){
    const com = SpaceMaker()[COMMAND];
    context.subscriptions.push(
        vscode.commands.registerCommand(com,()=>{
            vscode.window.showErrorMessage(`${LANGCONF.function.NO_ENABLED}`);
        })
    )
}

// 有重新加载的调用就检查应用戳是否正确
// VersionCheck();
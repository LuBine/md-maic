import * as vscode from 'vscode';
import * as vsconf from './init/vsconf';
import * as lang from './init/lang';
import * as qcr from './init/qcr';

const { formatKBD,formatTag,rootMod } = require('../maic.conf/regex/format/element.js');


// 定义正则表达式接口，初始化
interface RegexPattern {
    regex: RegExp;
    replacement: string;
}
interface RegexPatterns {
    [key: string]: RegexPattern;
}
let regexPatterns: RegexPatterns = {};


// VSCode 主进程
export function activate(context: vscode.ExtensionContext){
    // 装载语言配置
    lang.JSON_clear();
    try{
        // 这段参数传递内容比较阴间，后续有待优化
        lang.loadTranslations(lang.language,qcr.addon('lang.conf',`${lang.language}.json`));
    } catch(error){
        if(error instanceof Error){
            lang.report(error.message);
        }else{
            lang.report(error);
        }
    }
    // console.info(lang.translations);

    // 正式功能初始化
    let ItemOne = vscode.commands.registerCommand('markdown.md-maic.processText', async () => {
        // 每次激活按键刷新注册信息
        let conf = vsconf.updateConfiguration();
        console.log(conf['useAlternateRegex']);
        await loadRegex(conf['useAlternateRegex']);

        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const doc = editor.document;
            const selection = editor.selection;
            const selectedText = doc.getText(selection);
            
            if (selectedText) {
                let processedText = selectedText;

                // // 解析大小于号
                // processedText = formatTag(processedText);

                // 遍历所有正则表达式并应用替换
                for (const { regex, replacement } of Object.values(regexPatterns)) {
                    processedText = processedText.replace(regex, replacement);
                }

                editor.edit(editBuilder => {
                    editBuilder.replace(selection, processedText);
                }).then(success => {
                    if (!success) {
                        vscode.window.showErrorMessage(lang.translations.view.error);
                    }
                });

            } else {
                vscode.window.showInformationMessage(lang.translations.view.none);
            }
        }
    });

    let ItemTwo = registerFormatCommand('markdown.md-maic.function.kbd', formatKBD);
    let ItemThree = registerFormatCommand('markdown.md-maic.function.tag', formatTag);
    let root = registerFormatCommand('markdown.md-maic.root', rootMod);
    vscode.window.showInformationMessage(lang.translations.system.enabled);

    // 功能推送
    context.subscriptions.push(ItemOne);
    context.subscriptions.push(ItemTwo);
    context.subscriptions.push(ItemThree);
    context.subscriptions.push(root);
}
// 读取正则表达式
function loadRegex(filename:string) {
    // 必须清空其存储！
    regexPatterns = {};
    qcr.addon('maic.conf.regex',filename).then((result: string)=>{
        const regexLines:string[] = result.split('\n');
        regexLines.forEach(line => {
            const [pattern, replacement] = line.split(', ').map(part => part.trim());
            if (pattern && replacement) {
                // 保留 'g' 标志并创建正则表达式
                const regexPattern = pattern.slice(1, -2); // 移除前后的斜杠
                const regex = new RegExp(regexPattern, 'g'); // 匹配全局
                regexPatterns[pattern] = { regex, replacement }; // 动态添加正则表达式和替换文本
            }
        });
        console.log(`【${loadRegex.name}】装载的表达式如下：`, regexPatterns);
    })
    .catch((error: any) => {
        console.error(`【${loadRegex.name}】错误信息如下:`, error);
    });
}

// 相同功能注册，为实验室做准备
function registerFormatCommand(commandId: string, formatFunction: (text: string) => string) {
    return vscode.commands.registerCommand(commandId, () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const doc = editor.document;
            const selection = editor.selection;
            const selectedText = doc.getText(selection);
            
            if (selectedText) {
                let processedText = formatFunction(selectedText);

                editor.edit(editBuilder => {
                    editBuilder.replace(selection, processedText);
                }).then(success => {
                    if (!success) {
                        vscode.window.showErrorMessage(lang.translations.view.error);
                    }
                });
            } else {
                vscode.window.showInformationMessage(lang.translations.view.none);
            }
        }
    });
}

// 状态占用取消
export function deactivate() {}
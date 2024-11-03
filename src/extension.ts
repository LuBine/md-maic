import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

let translations: any;

function loadTranslations(language: string) {
    const filePath = path.join(__dirname, '../lang.conf', `${language}.json`);
    try{
        translations = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch(error){
        console.error(`Failed to load translations for ${language}:`, error);
        vscode.window.showErrorMessage('Failed to load language file!\ndef:zh-cn');
        translations = {"system":{"enable":"Markdown-dialect-format 扩展已激活！","REGX":{"sub":"启用双'^'符号解析标签<sub>"}},"view":{"none":"请选择文本进行处理。","error":"文本替换失败。"}};
    }
    
}

export function activate(context: vscode.ExtensionContext) {
    const language = vscode.env.language;
    loadTranslations(language);
    console.info(language);

    let disposable = vscode.commands.registerCommand('md-maic.extension.processText', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const doc = editor.document;
            const selection = editor.selection;
            const selectedText = doc.getText(selection);

            const config = vscode.workspace.getConfiguration('markdownDialectFormat');
            const useAlternateRegex = config.get('useAlternateRegex');

            if (selectedText) {
                let processedText;

                if(useAlternateRegex){
                    processedText = selectedText
                    
                    .replace(/\^(\d+)\^/g, '<sup>$1</sup>')
                    .replace(/\^([^\s]+)\^/g, '<sup>$1</sup>')
                    .replace(/~([^\s]+)~/g, '<sub>$1</sub>')
                    .replace(/==(.+)==/g, '<mark>$1</mark>');
                } else {
                    processedText = selectedText

                    .replace(/\^(\d+)/g, '<sup>$1</sup>')
                    .replace(/\^([^\s]+)/g, '<sup>$1</sup>')
                    .replace(/~([^\s]+)~/g, '<sub>$1</sub>')
                    .replace(/==(.+)==/g, '<mark>$1</mark>');
                }


                
                editor.edit(editBuilder => {
                    editBuilder.replace(selection, processedText);
                }).then(success => {
                    if (!success) {
                        vscode.window.showErrorMessage(translations.view.error);
                    }
                });
            } else {
                vscode.window.showInformationMessage(translations.view.none);
            }
        }
    });

    console.info(translations);
    vscode.window.showInformationMessage(translations.system.enable);
    context.subscriptions.push(disposable);
}

export function deactivate() {}

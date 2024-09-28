import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.processText', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const doc = editor.document;
            const selection = editor.selection;

            const selectedText = doc.getText(selection);
            let processedText = selectedText
                .replace(/\^([^\s]+)/g, '<sup>$1</sup>')
                .replace(/~([^\s]+)~/g, '<sub>$1</sub>')
                .replace(/==([^\s]+)==/g, '<mark>$1</mark>');

            editor.edit(editBuilder => {
                editBuilder.replace(selection, processedText);
            });
        }
    });

    context.subscriptions.push(disposable);
    vscode.window.showInformationMessage('Markdown-dialect-format 扩展已激活！');
}

export function deactivate() {}

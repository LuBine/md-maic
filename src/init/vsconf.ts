import * as vscode from 'vscode';

export function updateConfiguration() {
    return vscode.workspace.getConfiguration('md-maic');
}
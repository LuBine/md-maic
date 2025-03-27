import * as vscode from 'vscode';
import * as qcr from './init/vscofig'
import * as oe from './iStream/interface'
import { Lang,logChannel } from './init/maicofig';

// VSCode 主进程
export async function activate(context: vscode.ExtensionContext){

    // 注册配置页面的支持
    qcr.registerConfigHelp(context);
    // 支持语言支持
    let lang = await Lang();
    vscode.window.showInformationMessage(lang.system.enabled);


    // 主要按键注册
    qcr.registerCommandMaic(context,lang);
    qcr.registerCommandKBD(context,lang);
    qcr.registerCommandElement(context,lang);
    qcr.registerCommandBr(context,lang);
}

// 状态占用取消
export function deactivate() {}
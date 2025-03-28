import * as vscode from 'vscode';
import * as qcr from './init/vscofig'
import { Lang } from './init/maicofig';


// VSCode 主进程
export async function activate(context: vscode.ExtensionContext){

    // 注册配置页面的支持
    qcr.registerConfigHelp(context);
    // 支持语言支持
    let lang = await Lang();
    vscode.window.showInformationMessage(lang.system.enabled);

    // 间接解析功能注册
    qcr.registerCommandMaic(context,lang);

    // RegisterManager 配置 直接解析功能 注册
    const RM_function_enbaled = qcr.getConfigInfo('md-maic.RegisterManager.["function.enabled"]').split(',');

    const en_kbd = RM_function_enbaled.includes('kbd');
    const en_than = RM_function_enbaled.includes('than');
    const en_br = RM_function_enbaled.includes('br');

    // markdown.md-maic.function.* 注册
    // 数字是命令的添加顺序，详细查看 vsconfig.ts/SpaceMaker()
    if(en_kbd){
        qcr.registerCommandKBD(context,lang);
    }else{
        qcr.registerNone(context,1,lang);
    }

    if(en_than){
        qcr.registerCommandElement(context,lang);
    }else{
        qcr.registerNone(context,2,lang);
    }
    
    if(en_br){
        qcr.registerCommandBr(context,lang);
    }else{
        qcr.registerNone(context,4,lang);
    }
}

// 状态占用取消
export function deactivate() {}
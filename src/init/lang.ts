import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export let translations: any;
export const language = vscode.env.language;
let exc = false;

// 判断文件是否存在
function fileExists(path:string):boolean {
    return fs.existsSync(path);
}

// 寄存exec处理
export function execs(value:any,add?:string){
    translations = value;
    if (add !== undefined) {
        vscode.window.showErrorMessage(add, { modal: true });
    }
}

// 内存清理
export function JSON_clear(){
    translations='';
}

// 语言模块装载
export function loadTranslations(language: string,exec?:any){
    // 默认装载语言
    const dirPath = path.join(__dirname, '../../lang.conf');
    const filePath = path.join(dirPath, `${language}.json`);
    const eFilePath = path.join(dirPath, 'en.json');
    if(fileExists(filePath)){
        translations = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } else {
        if(fileExists(eFilePath)){
            translations = JSON.parse(fs.readFileSync(eFilePath,'utf-8'));
            vscode.window.showWarningMessage(`localhost haven't file: ${language}.json,${translations.lang.default}`);
        }else{
            // 预留的实验室功能入口
            exec();
        }
    }
    
}

// 报告对应内容,需要提前载入语言包！
export function report(message:any){
    if(translations.system.enabled===undefined){
        console.error(message);
    }else{
        console.error(translations.system['try.error'],message);
    }
    
}
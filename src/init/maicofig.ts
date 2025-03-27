import * as vscode from 'vscode';
import fs from 'fs';
import path from 'path';

export const logChannel = vscode.window.createOutputChannel('md-maic DevLogs console');
    
export function RootMaker(){
    let root = path.join(__dirname,'../../');
    let confDir = path.join(root,'conf');
    let langDir = path.join(confDir,'lang');
    let rootDir = path.join(confDir,'maic');

    return [root,confDir,langDir,rootDir];
}

export function Report(msg:string,args?:any){
    if(args)
    {
        logChannel.appendLine(msg+"\n"+args);
        console.warn(msg+"\n"+args);
        throw new Error(msg+"\n"+args);
    }
    else
    {
        logChannel.appendLine(msg+"\n");
        console.warn(msg+"\n");
        throw new Error(msg+"\n");
    }

}

function SpaceMaker(){
    return [
        'md-maic',
        'md-maic.RegisterManager'
    ]
}

export function CloudMaker(){
    const rootDir = RootMaker()[3];
    let RM_cloud  = vscode.workspace.getConfiguration(SpaceMaker()[1])["conf.cloud"] ?? 'cloud.repo.json';
    let repo = JSON.parse(fs.readFileSync(path.join(rootDir,RM_cloud),'utf-8'));
    return repo;
}

// 导出语言支持
export let Lang = async () => {
    const langDir = RootMaker()[2];
    let useLangFilePath = path.join(langDir,`${vscode.env.language}.json`);
    let backupFilePath = path.join(langDir,`en.json`);
    let repo = CloudMaker();
    let repoFilePath = repo['lang.net.repository']+`${vscode.env.language}.json`;
    
    try{
        if(fs.existsSync(useLangFilePath))
        {
            return JSON.parse(fs.readFileSync(useLangFilePath,'utf-8'));
        }
        else if(fs.existsSync(backupFilePath))
        {
            vscode.window.showWarningMessage(`localhost haven't language file of ${vscode.env.language}!\n\n we enabled English`)
            return JSON.parse(fs.readFileSync(backupFilePath,'utf-8'));
        }
        else if(repo['lang.net'])
        {
            let repoContent = await fetch(repoFilePath);

            vscode.window.showInformationMessage(`[maicofig.CloudMaker Error] > 尝试连接: ${repoFilePath} 中。`);
            if(!repoContent.ok){
                vscode.window.showErrorMessage('[maicofig.CloudMaker Error] > 网络连接失败');
                throw new Error(`[maicofig.CloudMaker Error] > 连接 ${repoFilePath} 失败！`);
            }

            // 存储文件以备用
            let output = await repoContent.json();
            await fs.promises.writeFile(useLangFilePath, JSON.stringify(output), 'utf-8');
            
            return output;
        }
        else
        {
            throw new Error("插件无对应的语言文件支持，请在 ~/conf/lang 中添加对应文件！");
        }
    } catch(e){
        return `[maicofig.Lang Error] > ${e}`;
    }
};

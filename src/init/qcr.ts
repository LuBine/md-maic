import * as fs from 'fs';
import * as path from 'path';
import { window,ConfigurationTarget,workspace } from 'vscode';
import { execs } from './lang';
import * as vsconf from './vsconf';

let conf = vsconf.updateConfiguration();
const lang=/\.json$/;
const regex=/\.txt/;
// 预留功能
// 后续可能移除
// export const langPath=path.join(__dirname,'../../lang.conf');

// // 安装包服务
// async function langSetup(source: string): Promise<void>{
//     let toPath=path.join(__dirname,'../lang.conf');

//     try {
//         // 确保目标文件夹存在
//         await fs.promises.mkdir(toPath, { recursive: true });

//         const fileName = path.basename(source); // 获取文件名
//         const destinationPath = path.join(toPath, fileName); // 构建目标路径

//         await fs.promises.rename(source, destinationPath); // 移动文件
//         console.log(`文件已移动到: ${destinationPath}`);
//     } catch (error) {
//         console.error(`无法移动文件: ${error}`);
//     }
// }

// // 卸载包服务
// async function langRemove(packageName:string) {
//     // 定义包内容
//     const removePackage=[path.join(langPath,packageName),path.join(langPath,packageName)];
//     try {
//         await fs.promises.unlink(removePackage[0]);
//         await fs.promises.unlink(removePackage[1]);
//         console.log(`已删除: ${packageName}`);
//     } catch (error) {
//         console.error(`无法删除文件: ${error}`);
//     }
// }

// 读入存储池
function addonRead(URL:string,type:RegExp): string[] {
    try {
        const files = fs.readdirSync(URL);
        const jsFiles = files.filter(file => type.test(file));
        return jsFiles;
    } catch (error) {
        console.error(`[${addonRead.name}]无法读取目录: ${error}`);
        return [];
    }
}

async function lang_exec(name: string) {
    try {
        const filePath = path.join(__dirname, '../../maic.conf/qcr.json');
        const set = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const netURL = path.join(set['lang_exec.net.repository'], name);
        
        if (set['lang_exec.net']) {
            // 访问网络服务
            const response = await fetch(netURL);
            if (!response.ok) {
                throw new Error(`错误来源 ${netURL}: ${response.statusText}`);
            }
            const data = await response.json();
            execs(data);
        }
    } catch (error) {
        console.error(`[${lang_exec.name}]无法获取数据:`, error instanceof Error ? error.message : error);
        execs(null,`组织网络错误！<${error instanceof Error ? error.message : error}>`);
    }
}

async function regex_exec(name:string) {
    const filePath = path.join(__dirname,'../../maic.conf/regex');
    let regex_list=addonRead(filePath, regex);

    // 避免覆盖问题，保持统一
    workspace.getConfiguration().update('md-maic.appliedRegexFile', undefined, ConfigurationTarget.Global);

    if(regex_list.includes(name)){
        const spath = path.join(filePath, name);
        const regexData = fs.readFileSync(spath, 'utf-8');
        return regexData;
    } else {
        let select = await window.showQuickPick(regex_list,{
            placeHolder: `[${regex_exec.name}] 请选择一个可供解析的 regex 文件`,
            canPickMany: false
        });
        if(select){
            // console.log(select);
            conf.update('appliedRegexFile', select , ConfigurationTarget.Workspace);
        }else{
            conf.update('appliedRegexFile', regex_list[0] , ConfigurationTarget.Workspace);
        }
    }
}

// 应用引入对应的函数
export function addon(...callnote: string[]): any {
    if(callnote[0].length===0){
        // 如果未选择任何函数执行备用操作
        return console.error(`[${addon.name}]请引入函数名称`);
    } else{
        if(callnote[0]==='lang.conf'){
            lang_exec(callnote[1]);
        }else{
            if(callnote[0]==='maic.conf.regex'){
                return regex_exec(callnote[1]);
            }
        }
    }
}
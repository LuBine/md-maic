import * as cr from './com_Stream';
import fs from 'fs';
import { CloudMaker, logChannel, Report, RootMaker } from './maicofig';
import { getConfigInfo } from './vscofig';
import { window } from 'vscode';

export interface auto {
    RegExp: RegExp,
    element: string,
    auto: boolean
}

// ePATH 映射 JSON 结构数据定义
type JsonValue = string | number | boolean | null | JsonArray | JsonObject;
interface JsonArray extends Array<JsonValue> {}
interface JsonObject {
  [key: string]: JsonValue;
}

export async function SyntaxMaker(){
    let CONF_NAME = getConfigInfo('md-maic.RegisterManager.["conf.syntax"]') ?? "syntax.json";
    let CONF_PATH = RootMaker()[3]+'\\'+CONF_NAME;
    let CONF_NET_REPO = CloudMaker();
    let CONF_NET_ENABLED = CONF_NET_REPO['regex.net'];
    let CONF_NET_ADR = CONF_NET_REPO['regex.net.repository'];
    

    let JSON_CONTENT = JSON.parse(fs.readFileSync(CONF_PATH,'utf-8'))

    let OBJECT = await cr.SyntaxMaker_ForMat(JSON_CONTENT);
    return Object.values(OBJECT);
}

export function mergeSyntaxRule(arr1: string[], arr2: string[]): string[] {
    return [...arr1, ...arr2];
}

function getValueFromPath<T = undefined>(
    json: JsonObject,
    path: string,
    defaultValue?: T
  ): T extends undefined ? JsonValue | undefined : JsonValue | T {
    const keys = path.split(".");
    let current: any = json;
  
    for (const key of keys) {
      if (current === undefined || current === null || typeof current !== "object") {
        // 如果路径不存在或当前值不是对象，返回默认值
        return defaultValue as T extends undefined ? JsonValue | undefined : JsonValue | T;
      }
      current = current[key];
    }
  
    return current as T extends undefined ? JsonValue | undefined : JsonValue | T;
}

function isBase64(str: string): boolean {
    const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;
    return base64Regex.test(str);
}

function makeBack(value:string,toElement:string,result:auto[],SpaceItem:string){
    try{
        if(isBase64(value))
        // String[] 内的 BASE64 类型解码
        {
            let rule = atob(value).slice(1,-2);
            if(rule == ''){
                Report(`表达式存在空值`)
            }
            let regex = new RegExp(rule,'g');
            const back:auto = {
                RegExp:regex,
                element:toElement,
                auto:true
            };
            result.push(back);
        }
        else
        // String[] 内的 String 直接解析
        {
            let regex = new RegExp(value,'g');
            const back:auto ={
                RegExp:regex,
                element:toElement,
                auto:false
            }
            result.push(back);
        }
    }
    catch(e)
    {
        Report(`无法解码 ${SpaceItem} 的 ePATH: ${e}`)
    }
}

export function transSyntaxREG(SpaceItem: string,applyPack:string[] ,dictMap:any):Object{

    // console.log("格式化指引是："+SpaceItem)
    // console.log("许可包是："+applyPack)

    if(applyPack.includes(SpaceItem) && SpaceItem.split('.')[0] in dictMap){
        let map = getValueFromPath(dictMap,SpaceItem);
        let toElement = dictMap[SpaceItem.split('.')[0]]['element'];

        const result:auto[] = [];

        // TS 类型推导式嵌套
        // Array 内的 index 直接判断 和 正则表达式判断
        // String 内的 index 直接判断 和 正则表达式判断
        if(Array.isArray(map))
        {
            for(const value of map){
                if(typeof value === "string"){
                    makeBack(value,toElement,result,SpaceItem);
                }
                else{
                    Report(`无内容：${value}`)
                }
            }
        } 
        else if(typeof map === "string")
        {
            makeBack(map,toElement,result,SpaceItem);
            // console.log(result);
        }
        else if(typeof map === "object" && map !== null)
        {
            const arrlink = map["RegExp"];
            if(Array.isArray(arrlink)){
                for(const value of arrlink){
                    if(typeof value === "string"){
                        makeBack(value,toElement,result,SpaceItem);
                    }
                    else{
                        Report(`无内容：${value}`)
                    }
                }
            }
        }
        else
        {
            logChannel.appendLine("非法的类型修改！")
            console.log("非法的类型修改!");
        }
        // console.log(result);
        return result;
    }else{
        Report(`${SpaceItem} 未定义或未交付！`)
    }
    return {}
}

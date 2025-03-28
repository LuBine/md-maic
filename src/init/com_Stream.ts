/**
 * ePATH 解析处理流
*/

import { Lang,logChannel } from "./maicofig";

interface GConfigPath {
    whois: string;
    query: string;
}

export function getConfigInfo_ForMat(ePATH:string):GConfigPath {
  const regex = /^(?<whois>[^\[]+?)(?:\["(?<query>[^"]+)"\])?$/;
  const match = ePATH.match(regex);

  if (!match?.groups) {
      throw new Error(`非法的 ePATH 地址: ${ePATH}`);
  }

  const { whois = '', query = '' } = match.groups;

  return {
      whois: whois.replace(/\.$/, ''),
      query: query
  };
}


// export function ePATH_ForMat(ePATH:string):GConfigPath{
//   const isEPATH = ()=>{
//     if(ePATH.split('.').length>1){
//       return true;
//     }else{
//       return false;
//     }
//     return false
//   }
  
//   if(isEPATH()){
//     const regex = /^(?<whois>.*?)\.\[(?<query>[^\]]+)\]$/;
//     const match = ePATH.match(regex);
  
//     if (!match?.groups) {
//         throw new Error(`非法的 ePATH 地址: ${ePATH}`);
//     }
//     const { whois = '', query = '' } = match.groups;
    
//     return {
//       whois: whois,
//       query: query
//     };
//   }

//   return {
//     whois:ePATH,
//     query:''
//   }
// }

/**
 * Syntax 解析处理流
*/
interface Syntax_header {
    maic:{
        AllowList:string[];
        BlockList:string[];
        apply:{
            [key:string]:string[]
        }
    }
}

interface Syntax_item {
    index: string[] | null;
    RegExp: string[];
    element: string;
    dynamicFields?: Record<string, { RegExp: string[]; element: string; } | null>;
}

interface Syntax extends Syntax_header {
    space: {
        [key:string]:Syntax_item;
    }
}

    
const isBoolean = (x: any): x is boolean => typeof x === 'boolean';
const isStringArray = (x: any): x is string[] => Array.isArray(x) && x.every(i => typeof i === 'string');
const isObject = (x: any): x is Record<string, unknown> => x !== null && typeof x === 'object';
const checkSyntaxItem = (item: any): item is Syntax_item => {
    return (
      isObject(item) &&
      (item.index === null || isStringArray(item.index)) &&
      isStringArray(item.RegExp) &&
      typeof item.element === 'string' &&
      (item.dynamicFields === undefined ||
        (isObject(item.dynamicFields) &&
          Object.values(item.dynamicFields).every(v =>
            v === null ||
            (isObject(v) && isStringArray(v.RegExp) && typeof v.element === 'string')
          )))
    );
};

function checkSyntax(obj: any): obj is Syntax {
    try {
      return (
        isObject(obj) &&
        isObject(obj.maic) &&
        isStringArray(obj.maic.AllowList) &&
        isStringArray(obj.maic.BlockList) &&
        isObject(obj.maic.apply) &&
        Object.values(obj.maic.apply).every(isStringArray) &&
        isObject(obj.space) &&
        Object.values(obj.space).every(checkSyntaxItem)
    );
  } catch (e) {
    console.error('[com_Stream Error] (类型错误) > ', e);
    logChannel.append('[com_Stream Error] (类型错误) > '+e);
    return false;
    }
}

export async function SyntaxMaker_ForMat(JSONText: unknown): Promise<Syntax> {
    const LANGCONF = await Lang();
    if (typeof JSONText !== 'object' || JSONText === null) {
      throw new Error(`${LANGCONF.system.syntax.Frame_ERROR}`);
    }
  
    if (!checkSyntax(JSONText)) {
      throw new Error(`${LANGCONF.system.syntax.Frame_ERROR_SET}`);
    }
  
    const validSyntax = JSONText as Syntax;
  
    return {
      maic: {
        ...validSyntax.maic,
        apply: { ...validSyntax.maic.apply }
      },
      space: Object.fromEntries(
        Object.entries(validSyntax.space).map(([k, v]) => [
          k,
          {
            ...v,
            index: v.index ? [...v.index] : null,
            RegExp: [...v.RegExp],
            dynamicFields: v.dynamicFields 
              ? Object.fromEntries(
                  Object.entries(v.dynamicFields).map(([dk, dv]) => [
                    dk,
                    dv 
                      ? { ...dv, RegExp: [...dv.RegExp] } 
                      : null
                  ])
                )
              : undefined
          }
        ])
      )
    };
}
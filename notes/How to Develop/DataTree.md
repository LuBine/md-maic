# VScode.md-maic 数据存储结构参考

以下文件规范已入选到了本程序的数据存储
1. JSON     -       通常用作配置数据存储
2. XML      -       通常用作记录数据存储

## 重要目录存储结构
```
文件名              定义    别名        介绍

md-maic            [/][~]  root
 ├     conf        [ ]     confDir
 │       ├ lang    [ ]     langDir  用于存储语言 JSON 文件
 │       └ maic    [ ]     rootDir  配置文件存储位置
 └     src         [ ]     -        存储源代码
         └ init    [.]     -        QCR.System 核心部分
```
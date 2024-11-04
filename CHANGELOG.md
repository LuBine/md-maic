# Change Log

All notable changes to the "md-maic" extension will be documented in this file.If a version has been open-sourced, it means that the author's support for that version will end within 90 days.

:warning: We won't add more setting options or config file on 
this addon (now：2/3)

## 0.0.4
> [!TIP]
> Final sub-feature updata on 0.0.x，fix BUG until 0.1.0(develop version)
>
> what's the rootDir: `useName/.vscode/extensions/maictext*`

ADD:
- Added functional lab options
  - on rootDir: maic.conf/qcr.json
- Added Dialect Regex(GitHub#2 LDGcode)
  - text-color=> red-text::#red:: (`<font color="red">hello</font>`)
  - Tip=> MDN::MOZ://a org.:: (`<font title="MOZ://a org.">MDN</font>`)
  - ruby、rt=> 日本::!にほん::　(`<ruby>日本<rt>にほん</rt></ruby>`)
- Added element formatting shortcut(GitHub#2 LDGcode)
  - select your text.
  - use: <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>X</kbd>

Develop:
- lang support online(neo-free & enable `lang_exec.net`)
- export Regex file(on rootDir: maic.conf/regex)
- Regex Hot-fix function.(neo-free & enable `regex.net`)

FIX:
 1. error from default language(Maictext#02 ZoMaii)
 2. fix BUG '更改设置后不能对markdown方言格式化'(Maictext#03 fusama)
 3. fix BUG '切换未支持的语言后，程序功能无法正常使用 '(Maictext#04 fusama)
 4. fix BUG '方言符号 `==` 的功能无法使用！'(GitHub#4 LuBine)
 5. fix BUG '配置存在重复操作问题'(MaicText#04 1ovo1)

NEXT:
 1. ADD Master config.
 2. ADD CSV file of REGEX as db.
 3. [todo] Optimize code architecture

FUTURE:
 1. MySQL/ORM (I'm still on the fence and may load on other expansions)
 2. Distributed Communicatio (Awaiting follow-up discussion)
 3. FTP support ？

## 0.0.3

- fix REGX rule of elemnet sub（<kbd>CTRL</kbd>+<kbd>,</kbd> to select your style,search 'markdown Dialect Format'）
- add Language Support file（Localisation support）

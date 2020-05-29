export default {
    // 是否有_power属性产生的索引
    hasIndexReg: /_rowIndex|_lastIndex|_ctrlPath/,
    powerForIn: /for[ ]+in/,
    // 匹配function(){}
    functionReg: /^return\s*function\s*\([\w,\s]*\)\s*\{.*\}\s*$/,
    // 匹配立刻执行函数$name()或$$name(xxxx)，获取$name或$$name
    exeFuncReg: /\${1,2}\w+(?=\s*\(.*\))/g,
    // 匹配gf('data.xxx.xxx')或gf("data.xxx.xxx"),只获取路径data.xxx.xxx
    funcBodyDataReg: /gf\(\s*['"]data(\.(?!length)\w+)+(?=['"]\s*\))/g,
    funcBodyDataPrefixReg: /gf\(\s*['"]/,
    // 匹配data.xxx.xxxx,不匹配字符串'data.xxx.xxxx'或"data.xxx.xxxx"
    dataReg: /[^'"]data(\.(?!length)\w+)+/g,
}

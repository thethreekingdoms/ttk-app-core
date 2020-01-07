// import { number, math } from 'edf-utils'
import math from '../math'
let calcjs = math
const typeMap = {
    calculateAndCheck: 0,
    onlySetValue: 1,
    onlyCalculate: 2,
    onlyCheck: 3,
}
const CHECK = 1; //校验类型
const CALC = 0;  //计算类型 
const PATHRGX = /[a-zA-Z0-9]+[_]{1}[a-zA-Z0-9_]+/g
const SIGNRGX = /[==|\!=|<=|>=|<|>|?|\|\||\&\&|\:]+/g
const GSRGX = /[^=&^\!&^<&^>&^?&^\|&\&|\:]+/g

//数据格式 
/*****
 * data = {所有数据，每个子元素是一个表格，必有项
 *  table1Data: {},
 *  table2Data: {},
 *  table3Data: {}
 * }
 * changeData = {
 *  changeTableName: 'table1Data',改变的表的名称
 *  changeTable: {},改变所修改项后的数据（比如把表格第一行第一列由0改为1，changeTable的数据是改为1后的数据）
 *  changeItems: {},改变单元格的路径，即值
 *  failCount: 0 非公式校验后得出的错误数，如果表内无计算则为0。(非公式校验，调用这个公式校验前的校验。)
 * }
 * formulas 所有计算公式
 * checks 所有校验公式 
 * notFormulasCheckFailCounts = {}, //非公式校验的错误数 必填项
 * formulasCheckFailCounts = {} //公式校验的错误数 必填项
 */
// type 为 1计算加校验，type为2计算，type为3校验，type为4不计算也不校验
function setDataByFormula ( { type, data, changeData, formulas, checks, notFormulasCheckFailCounts = {}, formulasCheckFailCounts = {} } ) {
    let willCalcFormula = [],
        checkRes
    //第一步 将更新数据
    //第二步 根据 更改项 提取出有关公式，并对公式进行排序
    //第三步 计算
    //第四步 校验

    // 1
    if( !data ) return console.log('没有数据')
    let oldData = JSON.parse( JSON.stringify( data ) )
    if( !changeData || !changeData.changeTableName || !changeData.changeTable ) return console.log('没有改变的表名或没有改变表的数据')
    data[ changeData.changeTableName ] = changeData.changeTable
    notFormulasCheckFailCounts[ changeData.changeTableName ] = changeData.failCount || 0
    if( type == calculate.onlySetValue ) return {
        type,
        data,
        changeData,
        notFormulasCheckFailCounts,
        formulasCheckFailCounts,
        checkData: undefined
    }
    // 2提取有关公式
    let changeItems = changeData.changeItems
    if( type == typeMap.onlyCalculate || type == typeMap.calculateAndCheck ) {
        willCalcFormula =  getAboutFormulas( changeItems, formulas, willCalcFormula, 0 )//得到所有相关公式
    }
    // 3计算
    if( type == typeMap.onlyCalculate || type == typeMap.calculateAndCheck ) {
        data = calculate( { changeItems ,data, oldData, formulas, willCalcFormula } )
    }
    // 4校验
    if( type == typeMap.onlyCheck || type == typeMap.calculateAndCheck ) {
        checkRes = checkData( data, checks )
        formulasCheckFailCounts = checkRes.tableFailCounts
    }
    //返回数据
    return {
        type,
        data,
        changeData,
        notFormulasCheckFailCounts,
        formulasCheckFailCounts,
        checkData: checkRes.tableFailCounts[ changeData.changeTableName ]? checkRes.tableFailCounts[ changeData.changeTableName ].target:[]
    }
}
//得到所有需要计算的相关公式
function getAboutFormulas ( changeItems, formulas, willCalcFormula, index ) {
    if( !changeItems || changeItems.length ==0 ) return []
    if( !index ) index = 0
    changeItems.map( ( item , itemIndex ) => {
        --index 
        let response = getAboutFormulasItem( changeItems[itemIndex].path, formulas, willCalcFormula , index, true )
        index = response.index
        willCalcFormula = response.willCalcFormula
    })
    willCalcFormula = sortFormulaList( willCalcFormula )
    
    return willCalcFormula
}

//通过递归给将有依赖关系的公式排序 把公式中第一个等号右边含有修改路径的公式 取出来
function getAboutFormulasItem ( path, tFormulaList, willCalcFormula, index, fisrtTime ) {
    if( !willCalcFormula || !willCalcFormula.length ) {
        willCalcFormula = []
    }
    let formulaStrArr = willCalcFormula.map( item => item.formula)
    tFormulaList.map( item => {
        let tFormulaStrList = item.split('='),
            tFormulaRight
        if( tFormulaStrList.length > 1 ) {
            tFormulaStrList.shift()
            tFormulaRight = tFormulaStrList.join('=')
        } else {
            tFormulaRight = ''
        }
        if( item.split('=').length>1 && tFormulaRight.match(PATHRGX).indexOf( path ) != -1 ) {
                
            if( formulaStrArr.indexOf( item )<0 ) {
                formulaStrArr.push( item )
                willCalcFormula.push( {
                    formula: item,
                    path
                } )
            }
        }
    })
    if( willCalcFormula.length ==0 || index == willCalcFormula.length -1 ) {

        return {
            willCalcFormula: willCalcFormula,
            index: index
        }
    } else {
        index++
        return getAboutFormulasItem( willCalcFormula[index].formula.split('=')[0], tFormulaList, willCalcFormula, index )
    }

}

//将得到的所有相关公式进行排序 把公式第一个等号左边的路径取出（设为公式1）， 如果前边公式时的第一个等号右边含这个路径（设为公式2），就把这个公式1提前到公式2前
function sortFormulaList ( willCalcFormula ) {
    for(let i=willCalcFormula.length-1; i>0; i--) {
        let leftPath = willCalcFormula[i].formula.split('=')[0],
            lastIndex //最后公式右侧出现字段的地方
        for(let j=i-1; j>0; j--) {
            let rightStr = willCalcFormula[j].formula.split('=')[1]
            if( rightStr.match(PATHRGX).indexOf( leftPath ) >=0 ) {
                lastIndex = j
            }
        }
        if(lastIndex!==undefined) {
            let curItem = willCalcFormula[i]
            willCalcFormula.splice(i , 1 )
            willCalcFormula.splice(lastIndex , 0 , curItem )
            lastIndex = undefined
            i++
        }
    }
    return willCalcFormula
}

//计算方法入口 如果只改变了一个单元格 只调用一次 calculationData方法；如果改了多个单元格，多次调用calculationData方法
function calculate ( { changeItems , data, oldData ,formulas ,willCalcFormula } ) {
    let res
    if(changeItems && changeItems.length ==1 ) {
        //如果有涉及的公式
        if( willCalcFormula && willCalcFormula.length ) {
            let selfCals = isSelfCals( willCalcFormula[0].formula, changeItems[0] ) 
            data = calculationData( changeItems[0].newValue , changeItems[0].oldValue , changeItems[0].path , data, oldData, willCalcFormula[0], formulas, willCalcFormula, selfCals )
        }              
    } else if(changeItems && changeItems.length >1 ) {
        if( willCalcFormula && willCalcFormula.length ) {
            changeItems.map( item => {
                let selfCals = isSelfCals( willCalcFormula[0].formula, item ) 
                data = calculationData( item.newValue , item.oldValue , item.path , data, oldData, willCalcFormula[0], formulas, willCalcFormula, selfCals )
            })
        }                        
    }
    return data
}

//本年累计类型的特殊计算 减去原来的值加上新值
function isSelfCals( formula, changeItem ) {
    if( !changeItem ) return 
    let newValue = changeItem.newValue,
        oldValue = changeItem.oldValue,
        path = changeItem.path
    if( oldValue === undefined ) {
        oldValue = '0.00'
    }
    if(  formula.split('=')[1].indexOf( formula.split('=')[0]) >-1 ) {
        let str = formula.split(path)[0].substr(-1),
            value
        if( str =='-' ) {
            value = '(' + ( clearThousPos(newValue) + clearThousPos(oldValue)) + ')'
        } else if( str == '*') {
            value = '(' + (clearThousPos(newValue)  /  clearThousPos(oldValue)) + ')'
        } else if(str == '/') {
            value = '(' + clearThousPos(newValue)  *  clearThousPos(oldValue) + ')'
        } else {
            value = '(' + (clearThousPos(newValue)  -  clearThousPos(oldValue)) + ')'
        }
        return {
            newValue: value,
            oldValue: oldValue,
            path: path
        }    
    } else {
        return false
    } 
}

//计算通过递归所有公式计算出最新数据
function calculationData ( newValue, oldValue, pathName, changeData, oldData, formulaObj, formulas, willCalcFormula, selfCals ) {
    let formulaStr = formulaObj.formula,
        responsePath = formulaStr.split('=')[0],//目标值
        responseTName,
        formula = formulaStr.split('=').splice(1).join('='),            
        responseNum,
        response,
        preValue

    response = transNum( formula ,changeData, selfCals )
    preValue = getPathData( changeData, responsePath )// 取出计算前值
    changeData = setPathData( changeData, responsePath, mathRound( response, 2 ) )//更新计算结果

    willCalcFormula.shift()

    if( willCalcFormula && willCalcFormula.length==0 ) {
        //这时计算完毕
        return  changeData
    } else {
        let nextPath ,nextOldValue, nextNewValue
        if( willCalcFormula[0].path == pathName ) {
            nextPath = pathName
            nextOldValue = oldValue
            nextNewValue = newValue
        } else {
            nextPath = willCalcFormula[0].path
            nextOldValue = getPathData( oldData, willCalcFormula[0].path )
            nextNewValue = getPathData( changeData, willCalcFormula[0].path )
        }
        let nextSelfCals = isSelfCals( willCalcFormula[0].formula ,{ newValue: nextNewValue, oldValue: nextOldValue,path: nextPath} )
        return calculationData( nextNewValue, nextOldValue, nextPath, changeData, oldData, willCalcFormula[0], formulas, willCalcFormula, nextSelfCals )
    }
}

//将带有数字的路径改成可以解析的路径，将名字由 a_b_c_4_f 改成 a_b_c[4]_f
function transPath( path ) {
    let NUMRGX = /\_[\d]+\_/g,
        numArr = path.match( NUMRGX )
    if(numArr != null) {

        numArr.map( item => {
            let numStr = '[' + parseInt( item.replace('_','') ) + ']_'
            path = path.replace( item, numStr )
        })
    }
    return path.replace(/\_/g,'.')
}

//将传入的数字num 保留digit位小数（默认两位）
function mathRound ( num , digit = 2 ) {//数字，精确位数 默认
    return Math.round(num * (Math.pow(10 , digit)) ) / (Math.pow(10 , digit))
}

//把公式中的路径 转换成 路径所对应的值 ，并计算出公式的结果
function transNum (formula, changeData, selfCals, type) { //
    console.log( formula )
    if (selfCals) {
        formula = formula.replace(selfCals.path, selfCals.newValue)
    }
    let paths = formula.match(PATHRGX)

    paths.map(item => {
        if (isNaN(item - 0)) {
            try {
                let pathStr = transPath(item),
                    value
                value = eval('changeData.' + pathStr)
                if( pathStr.indexOf('.hmc')>=0 || value == 'N' || value == 'Y' || value=='false' || value=='true' ) {
                    value = "'"+value+"'"
                } else {
                    value = value ? value : 0
                    value = value == '- -' ? 0 : value
                    value = '(' + value + ')'
                }
                formula = formula.replace(item, value)
            } catch (err) {
                console.log(err)
            }
        }
    })

    //
    let signArr = formula.match(SIGNRGX),
        gsArr = formula.match(GSRGX),
        signChangeArr,
        newFormula = ''
    if (signArr) {//校验时 计算的结果保留两位数字再比较，防止等式两边因有一边未保留两位小数导致校验出现问题
        
        gsArr.map((item, index) => {
            if( formula.indexOf(signArr[0]) == 0 && gsArr.length == signArr.length ) {
                if( item.match(/[\+|\-|\*|\\|\%]/g) ) {
                    if( gsArr[index].match(/\(/g).length == gsArr[index].match(/\)/g).length ) {
                        newFormula += (signArr[index] + "(calcjs("+gsArr[index]+",2))" )
                    } else {
                        let leftLen = gsArr[index].match(/\(/g).length,
                            rightLen = gsArr[index].match(/\)/g).length
                        if( leftLen > rightLen ) {
                            newFormula += (signArr[index] + gsArr[index].substr(0,leftLen-rightLen) + "(calcjs("+ gsArr[index].substr(leftLen-rightLen)+ ",2))" )                            
                        } else if( gsArr[index].match(/\(/g).length < gsArr[index].match(/\)/g).length ) {
                            newFormula += (signArr[index] + "(calcjs("+gsArr[index].substr(0,gsArr[index].length+leftLen-rightLen)+",2))"+ gsArr[index].substr(gsArr[index].length+leftLen-rightLen) ) 
                            
                        }
                        newFormula += (signArr[index] + gsArr[index] )                            
                    }
                } else {
                    
                    newFormula += (signArr[index] + gsArr[index] )
                }
            } else {
                if( item.match(/[\+|\-|\*|\\|\%]/g) ) {
                    let leftLen = gsArr[index].match(/\(/g).length,
                        rightLen = gsArr[index].match(/\)/g).length
                    if (index <= signArr.length - 1) {
                        if( leftLen == rightLen ) {
                            newFormula += ("(calcjs("+gsArr[index]+",2))" + signArr[index])
                        } else {
                            if( leftLen > rightLen ) {
                                newFormula += (gsArr[index].substr(0,leftLen-rightLen)+"(calcjs("+ gsArr[index].substr(leftLen-rightLen)+",2))" + signArr[index])
                            } else if( leftLen < rightLen ) {
                                newFormula += ("(calcjs("+ gsArr[index].substr(0,gsArr[index].length+leftLen-rightLen)+",2))"+gsArr[index].substr(gsArr[index].length+leftLen-rightLen) + signArr[index])
                            }
                        }
                    } else {
                        if( leftLen == rightLen ) {
                            newFormula += "(calcjs("+gsArr[index]+",2))"
                        } else {
                            if( leftLen > rightLen ) {
                                newFormula += gsArr[index].substr(0,leftLen-rightLen)+"(calcjs("+ gsArr[index].substr(leftLen-rightLen)+",2))"
                            } else if( leftLen < rightLen ) {
                                newFormula += "(calcjs("+ gsArr[index].substr(0,gsArr[index].length+leftLen-rightLen)+",2))"+gsArr[index].substr(gsArr[index].length+leftLen-rightLen)
                            }
                            
                        }
                    } 
                } else {
                    if (index <= signArr.length - 1) {
                        newFormula += (gsArr[index] + signArr[index])
                    } else {
                        newFormula += gsArr[index]
                    }
                }
            }
        })
        formula = newFormula
    }
    console.log( formula )
    
    try {
        return eval(formula)
    } catch(e) {
        console.log( formula + '---' + e + ' 公式有问题')
        return false
    }
}

//通过路径(path)获取数据(changeData)中指定字段的值
function getPathData ( changeData, path ) {
    let pathStr = transPath( path ),
        value = eval('changeData.' + pathStr )
    return value
}

//通过路径(path)设置数据(changeData)中指定字段的值为（value）
function setPathData ( changeData, path, value ) {
    let pathStr = transPath( path )
    eval('changeData.' + pathStr + '=' + value )
    return changeData
}

//校验
function checkData ( changeData, checkList ) {
    
    let newFailList = []
    checkList.map( item => {//创建新的校验不通过的列表
        let res = transNum( item.formula , changeData , undefined, CHECK )
        if( res ) { //计算成功为 需要弹出提示
            newFailList.push( item )
        }
    })
    let tableFailCounts = getFailData( newFailList )
    return {
        tableFailCounts: tableFailCounts,
        newFailList: newFailList
    }
}

//得到每个表 有几个校验未通过项
function getFailData ( newFailList ) {
    let checkItemList = [],
        cellNameList = [],
        checkTargetList = []
    let tableFailCounts = {}

    newFailList.map( item => {
        let targetArr = item.targetName.split(',')
        targetArr.map( target => {
            checkItemList.push({
                formula: item.formula,
                target: target,
                message:  item.message 
            })
        })
    })
    //checkItemList 分开所有需要提示的单元格
    newFailList.map( item => {
        cellNameList = cellNameList.concat( item.targetName.split(',') )
    })
    cellNameList = Array.from( new Set( cellNameList ) ) //去除重复元素
    //相同单元格的合并
    cellNameList.map( item => {
        let message = []
        checkItemList.map( cell => {
            if( cell.target == item ) {
                message.push( cell.message )
            }
        } )
        checkTargetList.push({
            target: item,
            message: message
        })
    })
    //将不同的表格项分组

    checkTargetList.map ( cell => {
        let tName = cell.target.split('_')[0]
        if( tableFailCounts[tName] ) {
            tableFailCounts[tName].num += 1
            tableFailCounts[tName].target.push(cell)
        } else {
            let arr = [ cell ]
            tableFailCounts[tName] = {
                num:1,
                target: arr
            }
        }
    })
    return tableFailCounts
}

/**
 * 去除数值的千分位
 * num 具体数值
 * isRetOriginalVal  true: 保留原始值，false：返回0
 */
function clearThousPos(num, isRetOriginalVal) {
    let ret

    if (num && num.toString().indexOf(',') > -1) {
        ret = parseFloat(num.toString().replace(/,/g, ""))
    } else {
        if (num == undefined || isNaN(num) || num == null || num.toString().replace(/\s+/g, '') == '') {
            if (!!isRetOriginalVal) {
              ret = num
            } else {
              ret = 0
            }
        } else {
            ret = parseFloat(num)
        }
    }

    return ret
}

export default {
	setDataByFormula,
	calculationData,
	checkData,
	getFailData
}

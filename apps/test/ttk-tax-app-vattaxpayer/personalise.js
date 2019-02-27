import { Map, fromJS } from 'immutable'

let beijingZzsjmssbmxbjsxmGridlbVO = [
    {
        bqfse: "0.00",
        bqsjdjse: "0.00",
        bqydjse: "0.00",
        ewbhxh: "1",
        hmc: "合计",
        jmbhmc: "合计",
        qcye: "0.00",
        qmye: "0.00",
        swsxDm: ""
    },{
        ewbhxh: "2",
        hmc: '',
        qcye: '0',
        bqfse: '0',
        bqydjse: '0',
        bqsjdjse: '0',
        qmye: '0'
    },{
        ewbhxh: "3",
        hmc: '',
        qcye: '0',
        bqfse: '0',
        bqydjse: '0',
        bqsjdjse: '0',
        qmye: '0'
    },{
        ewbhxh: "4",
        hmc: '',
        qcye: '0',
        bqfse: '0',
        bqydjse: '0',
        bqsjdjse: '0',
        qmye: '0'
    },{
        ewbhxh: "5",
        hmc: '',
        qcye: '0',
        bqfse: '0',
        bqydjse: '0',
        bqsjdjse: '0',
        qmye: '0'
    }
]

function personaliseRenderTableName( SS , activeTabKey ) {
    let tableName
	switch(SS) {
		case '11':
            tableName = beijingRenderTableName( SS , activeTabKey );
            break;
        default:
            tableName = defaultRenderTableName( SS , activeTabKey );
    }
    return tableName
}

function defaultRenderTableName( SS , activeTabKey ) {
    let tableName
    if( activeTabKey == 'zzsjmssbmxb' ) {
        tableName = `ttk-tax-app-zzsjmssbmxb`
    } else {
        tableName = `ttk-tax-app-${activeTabKey}`        
    }
    return tableName
}

function beijingRenderTableName( SS , activeTabKey ) {
    let tableName
    if( activeTabKey == 'zzsjmssbmxb' ) {
        tableName = `ttk-tax-app-zzsjmssbmxb-beijing`
    } else {
        tableName = `ttk-tax-app-${activeTabKey}`        
    }
    return tableName
}

function personaliseFormatData( SS , VOData ) {
    let tableName
	switch(SS) {
		case '11':
            VOData = beijingFormatData( SS , VOData );
            break;
    }
    return VOData
}

function beijingFormatData( SS , VOData ) {
    if( !VOData.zzsjmssbmxb ) return VOData    
    let zzsjmssbmxbjsxmGridlbVO = VOData.zzsjmssbmxb && VOData.zzsjmssbmxb.zzsjmssbmxbjsxmGrid ? VOData.zzsjmssbmxb.zzsjmssbmxbjsxmGrid.zzsjmssbmxbjsxmGridlbVO : [],
        cloneArr = JSON.parse(JSON.stringify(beijingZzsjmssbmxbjsxmGridlbVO))
    
    if(zzsjmssbmxbjsxmGridlbVO.length < 5 ) {
        zzsjmssbmxbjsxmGridlbVO.map( item => {
            cloneArr[ item.ewbhxh-1 ] = item
        })
        zzsjmssbmxbjsxmGridlbVO = cloneArr
    }
    VOData.zzsjmssbmxb.zzsjmssbmxbjsxmGrid.zzsjmssbmxbjsxmGridlbVO = zzsjmssbmxbjsxmGridlbVO
    
    return VOData
}

function personaliseShowTable( SS, gdslx, treeLeft ) {
    if( SS != '11') treeLeft = notBeijingShowTable( treeLeft );
	switch(SS) {
		case '52'://贵州
            treeLeft = guizhouShowTable( gdslx, treeLeft );
            break;
        default:
            treeLeft = defaultShowTable( treeLeft );
    }
    return treeLeft
}

function guizhouShowTable( gdslx, treeLeft ) {
    treeLeft = treeLeft.map( item => {
        if( item.key == 'zzsxgmfjssb' ) {
            item.isShow = gdslx == 1 ? true : false
        }
        return item
    })
    return treeLeft
}

function notBeijingShowTable( treeLeft ) {
    treeLeft = treeLeft.map( item => {
        if( item.key == 'zzsxgmxsbdcqkb' || item.key == 'zzsxgmkcxmqd' ) {
            item.isShow = false
        }
        return item
    })
    return treeLeft
}

function defaultShowTable( treeLeft ) {
    treeLeft = treeLeft.map( item => {
        if( item.key == 'zzsxgmfjssb' ) {
            item.isShow = false
        }
        return item
    })
    return treeLeft
}

function personaliseCalc( SS, otherData, zzssyyxgmnsrySbSbbdxxVO ) {
	switch(SS) {
		case '52'://贵州
            zzssyyxgmnsrySbSbbdxxVO = guizhouCalc( otherData, zzssyyxgmnsrySbSbbdxxVO );
            break;
        default:
            zzssyyxgmnsrySbSbbdxxVO = defaultCalc( zzssyyxgmnsrySbSbbdxxVO );
    }
    return zzssyyxgmnsrySbSbbdxxVO
}

function guizhouCalc( otherData, zzssyyxgmnsrySbSbbdxxVO ) {
    // i.	如果附表没有数据，取“货物及劳务”列下及“服务、不动产和无形资产”列下的行1+行4+行7+行9+行13本期数之和；
    // ii.	如果附表栏次5有数据，取“货物及劳务”列下的行1+行7+行9+行13本期数+附表栏次5÷1.03+ “服务、不动产和无形资产”列下的行4+行9+行13本期数之和。
    // iii.	如果附表栏次13有数据，取“货物及劳务”列下的行1+行7+行9+行13本期数+附表栏次13÷1.05+“服务、不动产和无形资产”列下的行1+行9+行13本期数之和。
    // iv.	如果附表栏次5与栏次13都有数据，取“货物及劳务”列下的行1+行7+行9+行13本期数+附表栏次5÷1.03+附表栏次13÷1.05+“服务、不动产和无形资产”列下的行9+行13本期数之和。
    
    if( otherData.gdslx == 1 ) {
        let jsyj = mathRound( (zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr.zzsxgmGrid.zzsxgmGridlb[0].ynsehj-0||0) + (zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr.zzsxgmGrid.zzsxgmGridlb[1].ynsehj-0||0) ),
            xgmfjsxxGridlb = zzssyyxgmnsrySbSbbdxxVO.zzsxgmfjssb.xgmfjsxxGrid.xgmfjsxxGridlb,
            xse,
            fwbdcC1 = formatNum( zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr.zzsxgmGrid.zzsxgmGridlb[1].yzzzsbhsxse ),
            fwbdcC4 = formatNum( zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr.zzsxgmGrid.zzsxgmGridlb[1].xsczbdcbhsxse )

            if( zzssyyxgmnsrySbSbbdxxVO.zzsxgmflzl.flzlForm.ysfwxsqbhssr > 0 ) {
                fwbdcC1 = mathRound( formatNum( zzssyyxgmnsrySbSbbdxxVO.zzsxgmflzl.flzlForm.ysfwxsqbhssr )/1.03 )
            }
            if( zzssyyxgmnsrySbSbbdxxVO.zzsxgmflzl.flzlForm.ysfwxsqbhssr5 > 0 ) {
                fwbdcC4 = mathRound( formatNum( zzssyyxgmnsrySbSbbdxxVO.zzsxgmflzl.flzlForm.ysfwxsqbhssr5 )/1.05 )
            }
            xse = formatNum( zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr.zzsxgmGrid.zzsxgmGridlb[0].yzzzsbhsxse ) + 
                  formatNum( zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr.zzsxgmGrid.zzsxgmGridlb[0].xsczbdcbhsxse ) +
                  formatNum( zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr.zzsxgmGrid.zzsxgmGridlb[0].xssygdysgdzcbhsxse ) +
                  formatNum( zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr.zzsxgmGrid.zzsxgmGridlb[0].msxse ) +
                  formatNum( zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr.zzsxgmGrid.zzsxgmGridlb[0].ckmsxse ) +
                  fwbdcC1 + 
                  fwbdcC4 +
                  formatNum( zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr.zzsxgmGrid.zzsxgmGridlb[1].xssygdysgdzcbhsxse ) +
                  formatNum( zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr.zzsxgmGrid.zzsxgmGridlb[1].msxse ) +
                  formatNum( zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr.zzsxgmGrid.zzsxgmGridlb[1].ckmsxse )

            let zspmDmList = xgmfjsxxGridlb.map( item => {
                return item.zspmDm
            })
        
            xgmfjsxxGridlb.map( ( item, index ) => {
                if( zspmDmList.indexOf( item.zspmDm ) == index && zspmDmList.indexOf( item.zspmDm , index+1 ) < 0 ) {//是第一个值，且后面没值
                    //不用拆分
                    item.jsyj = mathRound( jsyj )
                } else if(  zspmDmList.indexOf( item.zspmDm ) == index && zspmDmList.indexOf( item.zspmDm , index+1 ) > 0 ) {//是第一个值，且后面有值
                    //拆分货物及劳务
                    item.jsyj =  mathRound( (zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr.zzsxgmGrid.zzsxgmGridlb[0].ynsehj-0||0) )
                } else if(  zspmDmList.indexOf( item.zspmDm ) < index ) {//前面有值，当前值是后面的值
                    //拆分服务、不动产和无形资产
                    item.jsyj =  mathRound( (zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr.zzsxgmGrid.zzsxgmGridlb[1].ynsehj-0||0) )
                }
                // item.jsyj = mathRound( jsyj )
                item.ynse = mathRound( item.jsyj * item.sl1 )
                if( xse <= 100000 * otherData.during && ( item.jsyj > 0 ) ) {
                    item.ssjmxzDmMc = '其他'
                    // item.ssjmxzDm = item.zsxmDmMc.indexOf('地方教育附加') >=0 ? '0099129999' : '0061129999'
                    if(item.zsxmDm == "30216") {
                        item.ssjmxzDm = "0099129999"
                    }else if(item.zsxmDm == "30203") { //教育附加
                        item.ssjmxzDm = "0061129999"
                    }
                    item.jmse = item.ynse
                    item.ybtse = 0 
                } else {
                    item.ssjmxzDmMc = ""
                    item.ssjmxzDm = ""
                    item.jmse = 0
                    item.ybtse = item.ynse
                }
            })
        
    }
    return zzssyyxgmnsrySbSbbdxxVO
}

function defaultCalc( zzssyyxgmnsrySbSbbdxxVO ) {
    return zzssyyxgmnsrySbSbbdxxVO
}

function mathRound( num , digit = 2 ) {//数字，精确位数 默认
    num = isNaN(parseFloat(num)) ? 0: num-0
    return Math.round(num * (Math.pow(10 , digit)) ) / (Math.pow(10 , digit))
}

function formatNum(num) {
    num = isNaN(parseFloat(num))? 0 : num-0
    return num
}

function personalDelEmptyRow( SS , list, listName ) {
	switch(SS) {
		case '11':
            list = beijingDelEmptyRow( SS , list, listName );
            break;
        default:
            list = defaultDelEmptyRow( SS , list, listName );
    }
    return list
}

function defaultDelEmptyRow( SS , list, listName ) {
    if( listName == 'zzsjmssbmxbjsxmGridlbVO' ) {
        list = list.filter(item => item.ewbhxh )
    }
    return list
}

function beijingDelEmptyRow( SS , list, listName ) {
    if( listName == 'zzsjmssbmxbjsxmGridlbVO' ) {
        list = list.filter(item =>{
            return (item.hmc=="合计") || (item.hmc || (item.qcye-0) || (item.bqfse-0) || (item.bqydjse-0) || (item.bqsjdjse-0) || (item.qmye-0) ) 
        } )
    }
    return list
}

function personalCancatCheckList( SS , checkList , sumRowCheckList , changeData ) {
	switch(SS) {
		case '11':
            checkList = beijingCancatCheckList( SS , checkList , sumRowCheckList , changeData );
            break;
    }
    return checkList
}

function beijingCancatCheckList( SS , checkList , sumRowCheckList , changeData ) {
    let addCheckList = []
    sumRowCheckList.map( item => {
        if( changeData[item.needHaveName] ) {
            addCheckList.push( item )
        }
    })
    checkList = checkList.concat( addCheckList )
    return checkList
}

export default {
    personaliseRenderTableName,//不同地区表格名称不一样
    personaliseFormatData,//减免税数据固定5行，行数不够的补齐
    personaliseShowTable,//部分地区加可以展示的表格
    personaliseCalc,//特殊计算
    personalDelEmptyRow,//去除空行
    personalCancatCheckList//个性化加校验提示
}
import React from 'react'
function initColumn(column, _this) {
    let resColumns = []
    column.map((item, index) => {
        if(item.fieldName=='jsff'){   //计税方法
            item.render = _this.getjsffContent   
        }else if(item.fieldName=='hwlx') {     //货物类型
            item.render = _this.gethwlxContent
        }else if(item.fieldName=='sl') {   //税率
            item.render = _this.getslContent
        }else if(item.fieldName=='fplx'){    //发票类型
            item.render = _this.getInvoicesTypeContent
        }else if(item.children){
            item.children.map(m => {
                if(m.fieldName.indexOf('_xse')>-1 || m.fieldName.indexOf('_se')>-1 || m.fieldName.indexOf('_je')>-1) {
                    if(item.fieldName == 'generalProject'){
                        m.render = _this.getGeneralProjectLinkContent
                    }else if(item.fieldName == 'signAndRetreat') {
                        m.render = _this.getSignAndRetreatLinkContent
                    }else if(item.fieldName == 'authentication') {
                        m.render = _this.getAuthenticationLinkContent
                    }else if(item.fieldName == 'genera') {
                        m.render = _this.getGeneratLinkContent
                    }else if(item.fieldName == 'hwjlw') {
                        m.render = _this.getHwjlwLinkContent
                    }else if(item.fieldName == 'fwbdchwxzc') {
                        m.render = _this.getFwbdchwxzcLinkContent
                    }else {
                        m.render = _this.getLinkContent
                    }
                }
            })
        }else{
            item.render = (text, record, index)=>{ <span>{text}</span> }
        }
        
        resColumns.push(item)
    })
    return resColumns
}

export default function renderColumns(tableList, _this, data) {
    let columns = [
        { fieldName: 'jsff', title: '计税方法', dataIndex: 'jsff', key: 'jsff', width: 69 },
        { fieldName: 'hwlx', title: '货物类型', dataIndex: 'hwlx', key: 'hwlx', width: 119 },
        { fieldName: 'sl', title: '税率', dataIndex: 'sl', key: 'sl', width: 52 },
        { fieldName: 'generalProject', title: '一般项目', dataIndex: 'generalProject', key: 'generalProject', width: 216, children: [{
                fieldName: 'ybxm_xse', title: '销售额', dataIndex: 'ybxm_xse', key: 'ybxm_xse', width: 108
            },{
                fieldName: 'ybxm_se', title: '税额', dataIndex: 'ybxm_se', key: 'ybxm_se', width: 108
            }] 
        },
        { fieldName: 'signAndRetreat', title: '即征即退', dataIndex: 'signAndRetreat', key: 'signAndRetreat', width: 216, children: [{
                fieldName: 'jzjt_xse', title: '销售额', dataIndex: 'jzjt_xse', key: 'jzjt_xse', width: 108
            },{
                fieldName: 'jzjt_se', title: '税额', dataIndex: 'jzjt_se', key: 'jzjt_se', width: 108
            }] 
        },
        { fieldName: 'oper', title: '合计', dataIndex: 'oper2', key: 'oper2', width: 216, children: [{
                fieldName: 'hj_xse', title: '销售额', dataIndex: 'hj_xse', key: 'hj_xse', width: 108
            },{
                fieldName: 'hj_se', title: '税额', dataIndex: 'hj_se', key: 'hj_se', width: 108
            }] 
        },
    ]

    if(data.other.isVattaxpayer){
        columns = [
            { fieldName: 'sl', title: '税率', dataIndex: 'sl', key: 'sl', width: 52 },
            { fieldName: 'fplx', title: '发票类型', dataIndex: 'fplx', key: 'fplx', width: 200 },
            { fieldName: 'hwjlw', title: '货物及劳务', dataIndex: 'hwjlw', key: 'hwjlw', width: 200, children: [{
                    fieldName: 'hwjlw_xse', title: '销售额', dataIndex: 'hwjlw_xse', key: 'hwjlw_xse', width: 100
                },{
                    fieldName: 'hwjlw_se', title: '税额', dataIndex: 'hwjlw_se', key: 'hwjlw_se', width: 100
                }] 
            },
            { fieldName: 'fwbdchwxzc', title: '服务、不动产和无形资产', dataIndex: 'fwbdchwxzc', key: 'fwbdchwxzc', width: 200, children: [{
                    fieldName: 'fwbdchwxzc_xse', title: '销售额', dataIndex: 'fwbdchwxzc_xse', key: 'fwbdchwxzc_xse', width: 100
                },{
                    fieldName: 'fwbdchwxzc_se', title: '税额', dataIndex: 'fwbdchwxzc_se', key: 'fwbdchwxzc_se', width: 100
                }] 
            },
            { fieldName: 'oper2', title: '合计', dataIndex: 'oper2', key: 'oper2', width: 200, children: [{
                    fieldName: 'hj_xse', title: '销售额', dataIndex: 'hj_xse', key: 'hj_xse', width: 100
                },{
                    fieldName: 'hj_se', title: '税额', dataIndex: 'hj_se', key: 'hj_se', width: 100
                }] 
            },
        ]
    }else if(data.other.tabId == '02'){
        columns = [
            { fieldName: 'fplx', title: '发票类型', dataIndex: 'fplx', key: 'fplx', width: 240 },
            { fieldName: 'authentication', title: '本期认证抵扣', dataIndex: 'authentication', key: 'authentication', width: 240, children: [{
                    fieldName: 'bqrzdk_fs', title: '份数', dataIndex: 'bqrzdk_fs', key: 'bqrzdk_fs', width: 80
                },{
                    fieldName: 'bqrzdk_je', title: '金额', dataIndex: 'bqrzdk_je', key: 'bqrzdk_je', width: 80
                },{
                    fieldName: 'bqrzdk_se', title: '税额', dataIndex: 'bqrzdk_se', key: 'bqrzdk_se', width: 80
                }] 
            },
            { fieldName: 'genera', title: '发票日期在属期内的发票', dataIndex: 'genera', key: 'genera', width: 240, children: [{
                    fieldName: 'fprqzsqndfp_fs', title: '份数', dataIndex: 'fprqzsqndfp_fs', key: 'fprqzsqndfp_fs', width: 80
                },{
                    fieldName: 'fprqzsqndfp_je', title: '金额', dataIndex: 'fprqzsqndfp_je', key: 'fprqzsqndfp_je', width: 80
                },{
                    fieldName: 'fprqzsqndfp_se', title: '税额', dataIndex: 'fprqzsqndfp_se', key: 'fprqzsqndfp_se', width: 80
                }] 
            }
        ]
    }
    if (tableList) return initColumn(columns, _this)
}

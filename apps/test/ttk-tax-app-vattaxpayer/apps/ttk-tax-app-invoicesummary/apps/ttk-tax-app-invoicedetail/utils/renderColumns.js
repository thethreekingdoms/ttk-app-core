import React from 'react'
import { DataGrid, Checkbox, Icon, TableSort, Select, DatePicker } from 'edf-component'
const Option = Select.Option

export default function renderColumns(columns, list, other, _this, tabId) {
    let { Column, Cell } = DataGrid, cols = [], 
        selectArr = ['hwlx','jsfs','zsfs','kplx']

    columns.forEach(op => {
        let col = <Column name={op.id} columnKey={op.fieldName} flexGrow={op.flexGrow ? 1 : undefined} isResizable={true} width={op.width}
            header={<Cell name='header'>{op.caption}</Cell>}
            cell={(ps) => {
                if(selectArr.indexOf(op.fieldName)>-1 && list[ps.rowIndex].xh != '合计' && tabId == '01'){
                    return <Cell className= 'selectCell'>
                        <Select 
                            title={list[ps.rowIndex][op.fieldName_id]}
                            value={list[ps.rowIndex][op.fieldName_id]}
                            disabled={(list[ps.rowIndex].accountStatus && list[ps.rowIndex].accountStatus == '4000140002') || _this.selfSystemDeclare}
                            onChange={(value) => _this.selectValue(ps.rowIndex, value, op.fieldName)}
                        >
                            {_this.selectOption(`${op.fieldName}List`,'isTable')}
                        </Select>
                    </Cell>
                }else if(op.fieldName == 'sfdk' && list[ps.rowIndex].xh != '合计' && tabId == '02'){
                    return <Cell className= 'selectCell'>
                        <Select 
                            title={list[ps.rowIndex][op.fieldName]}
                            value={list[ps.rowIndex][op.fieldName]}
                            disabled={(list[ps.rowIndex].accountStatus && list[ps.rowIndex].accountStatus == '4000140002') || _this.selfSystemDeclare}
                            onChange={(value) => _this.selectValue(ps.rowIndex, value, op.fieldName)}
                        >
                            {_this.selectOption(`${op.fieldName}List`,'isTable')}
                        </Select>
                    </Cell>
                }else if(list[ps.rowIndex].xh == '合计'){
                    return <Cell tip={true} className='total mk-datagrid-cellContent-right'>
                        {list[ps.rowIndex][op.fieldName]}
                    </Cell>
                }else{
                    return <Cell tip={true} className={getClassName(list[ps.rowIndex], op.idAlignType)}>
                        {list[ps.rowIndex][op.fieldName]}
                    </Cell>
                }
            }}
        />
        cols.push(col)
    })
    return cols
}

function getClassName(option, idAlignType) {
    let leftName = 'mk-datagrid-cellContent-left',
        rightName = 'mk-datagrid-cellContent-right'

    if (idAlignType == '1000050001') {
        // return 'total' 
    } else if (idAlignType == '1000050003') {
        return rightName
    } else if (idAlignType == '1000050002')  {
        return ''
    }
}

function addThousandsPosition(value) {
    let num
    if (!value) {
        return ''
    }
    num = parseFloat(value).toFixed(2)
    let regex = /(\d{1,3})(?=(\d{3})+(?:\.))/g
    return num.replace(regex, "$1,")
}




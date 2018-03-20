import utils from 'edf-utils'
import ReactDOM from 'react-dom'

export default class action {
    constructor(option) {
        this.metaAction = option.metaAction
        if (option.gridOption) {
            this.option = option.gridOption
        }
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
    }

    getColNames(gridName) {
        return this.option[gridName].getColNames(this.metaAction.gf)
    }

    isSelectAll = (gridName) => {
        if (!this.option)
            return

        if (!(typeof gridName == 'string' && gridName)) {
            gridName = Object.keys(this.option)[0]
        }

        const lst = this.metaAction.gf(this.option[gridName].path)
        if (!lst || lst.size == 0)
            return false

        return lst.every(o => o.get(this.option[gridName].selectFieldName))
    }

    selectAll = (gridName) => (e) => {
        if (!this.option)
            return


        if (!(typeof gridName == 'string' && gridName)) {
            gridName = Object.keys(this.option)[0]
        }

        this.injections.reduce('selectAll', e.target.checked, gridName)
    }

    getSelectedCount = (gridName) => {
        if (!this.option)
            return


        if (!(typeof gridName == 'string' && gridName)) {
            gridName = Object.keys(this.option)[0]
        }

        var lst = this.metaAction.gf(this.option[gridName].path)

        if (!lst || lst.size == 0)
            return 0

        var ret = lst.filter(o => !!o.get(this.option[gridName].selectFieldName)).size

        return ret
    }

    getSelected = (gridName) => {
        if (!this.option) return

        if (!(typeof gridName == 'string' && gridName)) {
            gridName = Object.keys(this.option)[0]
        }

        let lst = this.metaAction.gf(this.option[gridName].path), ret = []

        if (!lst || lst.size == 0) return 0

        lst.map(m => { if (m.get('selected')) ret.push({ id: m.get('id'), ts: m.get('ts') })})

        return ret
    }

    getSelectedInfo = (gridName) => {
        if (!this.option) return

        if (!(typeof gridName == 'string' && gridName)) {
            gridName = Object.keys(this.option)[0]
        }

        let lst = this.metaAction.gf(this.option[gridName].path), ret = []

        if (!lst || lst.size == 0) return 0

        lst.map(m => { if (m.get('selected')) ret.push(m.toJS()) })

        return ret
    }

    mousedown = (e) => {
        if (!this.option)
            return
        if (e && e.target) {
            if (e.target.className == 'linkApp') return
        }
        const path = utils.path.findPathByEvent(e)
        if (this.metaAction.isFocus(path)) return
        if (path.indexOf('cell.cell') != -1) {
            this.focusCell(this.getCellInfo(path), path, e)
        }
        else {
            if (!this.metaAction.focusByEvent(e)) return

            setTimeout(this.cellAutoFocus, 16)
        }
    }

    gridKeydown = (e) => {
        if (!this.option)
            return

        var path = ''

        if (e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 13 || e.keyCode == 108 || e.keyCode == 9 || e.keyCode == 38 || e.keyCode == 40) {
            path = utils.path.findPathByEvent(e)
            if (!path || path.indexOf(',') == -1) return
        }

        //37:左键
        if (e.keyCode == 37) {
            if (!utils.dom.cursorAtBegin(e)) return
            this.moveEditCell(path, 'left')
            return
        }

        //39:右键 13:回车 108回车 tab:9
        if (e.keyCode == 39 || e.keyCode == 13 || e.keyCode == 108 || e.keyCode == 9) {

            // 应该只有右键的时候，才会去判断光标是否已经到了文本的末端
            // 回车键、tab键不需要判断，直接切换
            if (e.keyCode == 39 && !utils.dom.cursorAtEnd(e)) return
            if (path) {
                let columnGetter = this.metaAction.gm(path)
                if (columnGetter) {
                    if (columnGetter.noTabKey == true) {
                        return
                    }
                }
            }

            this.moveEditCell(path, 'right')
            return
        }

        //38:上键
        if (e.keyCode == 38) {
            this.moveEditCell(path, 'up')
            return
        }

        //40:下键
        if (e.keyCode == 40) {
            this.moveEditCell(path, 'down')
            return
        }

    }

    moveEditCell(path, action) {
        const cellInfo = this.getCellInfo(path)
        this.moveCell(cellInfo, action, path)
    }

    moveCell(cellInfo, action, path) {
        var cellIsReadonly = (cellPosition, path, getField) => {
            /*
            if (path.indexOf('unitGrid') != -1) {
                if (cellPosition.x == 2) {
                    return true
                }
            }*/
            return false
        }

        const gridNames = Object.keys(this.option)

        for (var name of gridNames) {
            if (path.indexOf(name) != -1 && this.option[name].cellIsReadonly) {
                cellIsReadonly = this.option[name].cellIsReadonly
            }
        }

        const position = utils.matrix.move(cellInfo.rowCount, cellInfo.colCount, { x: cellInfo.x, y: cellInfo.y }, action)

        if (position.x === cellInfo.x && position.y === cellInfo.y) {
            return
        }
        if (cellIsReadonly(position, path, this.metaAction.gf)) {
            this.moveCell({ ...cellInfo, ...position }, action, path)
        } else {
            this.focusCell({ ...cellInfo, ...position }, path)
        }
    }

    /**
     * focus前，需要手动触发onblur，否则在fixed-data-table下，Onblur失效
     */

    compareFocusCell(path) {
        let oldFocusFieldPath = this.metaAction.gf('data.other.focusFieldPath')
        return path != oldFocusFieldPath
    }

    focusCell(position, path, e) {
        const gridNames = Object.keys(this.option)
        for (var name of gridNames) {
            if (path.indexOf(name) != -1) {
                let colPathPrefix = this.getColPathPrefix(path, name)


                this.metaAction.sfs({
                    'data.other.focusFieldPath': `${colPathPrefix}${this.getColNames(name)[position.x]}.cell.cell,${position.y}`,
                    [`data.other.${name}ScrollToRow`]: position.y,
                    [`data.other.${name}ScrollToColumn`]: position.x + 1
                })
            }
        }

        /*
        if(this.compareFocusCell(path)){

        }
        setTimeout(this.cellAutoFocusOut(position, path), 16)
        */
        setTimeout(this.cellAutoFocus(position, path), 16)
    }

    getColPathPrefix(path, gridName) {
        return path.substring(0, path.indexOf(gridName)) + gridName + '.columns.'
    }

    getCellInfo(path) {
        if (!this.option)
            return

        const parsedPath = utils.path.parsePath(path)
        const gridNames = Object.keys(this.option)

        for (var name of gridNames) {
            if (path.indexOf(name) != -1) {
                let colPathPrefix = this.getColPathPrefix(path, name)
                const rowCount = this.metaAction.gf(this.option[name].path).size
                const colCount = this.getColNames(name).length
                var colName = parsedPath.path
                    .replace(colPathPrefix, '')
                    .replace('.cell.cell', '')
                    .replace(/\s/g, '')

                return {
                    x: this.getColNames(name).findIndex(o => o == colName),
                    y: Number(parsedPath.vars[0]),
                    colCount,
                    rowCount,
                }
            }
        }
    }


    cellAutoFocusOut = (position, path) => {
        setTimeout(() => {
            utils.dom.gridCellAutoFocusOut(this.component, '.editable-cell', position, path)
        }, 0)
    }

    cellAutoFocus = (position, path) => {
        setTimeout(() => {
            utils.dom.gridCellAutoFocus(this.component, '.editable-cell', position, path)
        }, 0)
    }

    getCellClassName = (path, align, gridName) => {
        if (!this.option)
            return
        if (!(typeof gridName == 'string' && gridName)) {
            gridName = Object.keys(this.option)[0]
        }

        const defaultClsName = this.option[gridName].cellClassName
        let clsName = this.metaAction.isFocus(path) ? `${defaultClsName} editable-cell` : ''
        if (typeof (align) == "string") {
            clsName += ` ${defaultClsName}-${align}`
        }
        return clsName
    }

    dateOpenChange = (status) => {
        if (status) return
        const editorDOM = ReactDOM.findDOMNode(this.component).querySelector(".editable-cell")
        if (!editorDOM) return

        if (editorDOM.className.indexOf('datepicker') != -1) {
            const input = editorDOM.querySelector('input')
            input.focus()
        }
    }

    initColumnResize = (appPath, meta) => {
        if (window.localStorage) {
            if (appPath) {
                appPath = appPath.replace(/\//g, '-')
            }
            else return
            let htCols = JSON.parse(localStorage.getItem(appPath))

            if (htCols && htCols.cols) {
                htCols.cols.map((ele, i) => {
                    if (htCols.width[i] && ele) {
                    }

                })
            }

            return meta
        }
    }

    setColumnResize = (option) => {
        this.injections.reduce('setColumnResize', option)
    }

    addRow = (gridName) => (ps) => {
        this.injections.reduce('addRowBefore', gridName, ps.rowIndex)
        this.injections.reduce('addRow', gridName, ps.rowIndex)
    }

    delRow = (gridName) => (ps) => {
        this.injections.reduce('delRowBefore', gridName, ps.rowIndex)
        this.injections.reduce('delRow', gridName, ps.rowIndex)
    }

    upRow = (gridName) => (ps) => {
        if (ps.rowIndex == 0) {
            this.metaAction.toast('warning', '当前行已经是第一行')
            return
        }
        this.injections.reduce('moveRowToUpOrDown', gridName, ps.rowIndex, 0)
    }

    downRow = (gridName) => (ps) => {
        let details = this.metaAction.gf(`data.form.${gridName}`).toJS()

        if (ps.rowIndex == details.length - 1) {
            this.metaAction.toast('warning', '当前行已经是最后一行')
            return
        }
        this.injections.reduce('moveRowToUpOrDown', gridName, ps.rowIndex, 1)
    }
}

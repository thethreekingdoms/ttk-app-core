import { Map } from 'immutable'

let ht = new HashTable()
export default class reducer {

    constructor(option) {
        this.metaReducer = option.metaReducer
        if (option.gridOption) {
            this.option = option.gridOption
        }
    }

    selectAll = (state, checked, gridName) => {
        if (!this.option)
            return state
        const path = this.option[gridName].path,
            selectFieldName = this.option[gridName].selectFieldName
        var lst = this.metaReducer.gf(state, path),
        isCheckBoxColAccountSubjects = this.metaReducer.gf(state,'data.other.isCheckBoxColAccountSubjects')
        if (!lst || lst.size == 0)
            return state
        if (isCheckBoxColAccountSubjects == true){
            lst.map((item, index) => {
                if (!(!(item.get('isSystem') && !item.get('isAllowDel')) && item.get('isEndNode') && item.get('isEnable'))) {
                    lst = lst.update(index, item => item.set(`${selectFieldName}`, false))
                } else {
                    lst = lst.update(index, item => item.set(`${selectFieldName}`, checked))
                }
            })
        }else{
            lst.map((item, index) => {
                lst = lst.update(index, item => item.set(`${selectFieldName}`, checked))
            })
        }

        state = this.metaReducer.sf(state, `${path}`, lst)
        return state
    }


    setColumnResize = (state, option) => {
        let { columnKey, newColumnWidth, path, appPath } = option

        if (columnKey == null || newColumnWidth == null || path == null) return
        if (columnKey && newColumnWidth) {
            ht.add(columnKey, newColumnWidth)
        }

        appPath = appPath.replace(/\//g, '-')
        //适应宽度拖动的不同场景
        if (window.localStorage) {
            if (localStorage.getItem(appPath)) {
                let currentColData = JSON.parse(localStorage.getItem(appPath))
                if (currentColData && currentColData.cols) {
                    let isUpdated = false
                    currentColData.cols.map((ele, i) => {
                        if (columnKey && ele) {
                            if (ele === columnKey) {
                                isUpdated = true
                                currentColData.width[i] = newColumnWidth
                            }
                        }
                    })
                    if (!isUpdated && columnKey) {
                        currentColData.cols.push(columnKey)
                        currentColData.width.push(newColumnWidth)
                    }
                }
                localStorage.setItem(appPath, JSON.stringify(currentColData))
            }
            else {
                localStorage.setItem(appPath, JSON.stringify({ 'cols': ht.getKeys(), 'width': ht.getValues() }))
            }
        }
        ht.clear()
        //state = this.metaReducer.setter(state, path + '.' + columnKey, 'flexGrow', 0)
        //state = this.metaReducer.setter(state, path + '.' + columnKey, 'width', newColumnWidth)

        return state
    }



    addRow = (state, gridName, rowIndex) => {        
        if (!this.option)
            return state

        const path = this.option[gridName].path,
            emptyRow = this.option[gridName].emptyRow || {}

        var lst = this.metaReducer.gf(state, path)
        lst = lst.insert(rowIndex, Map(emptyRow))

        return this.metaReducer.sf(state, path, lst)
    }

    addBottomRow = (state, gridName, rowIndex) => {
        if (!this.option)
            return state

        const path = this.option[gridName].path,
            emptyRow = this.option[gridName].emptyRow || {}

        var lst = this.metaReducer.gf(state, path)
        lst = lst.insert(rowIndex + 1, Map(emptyRow))

        return this.metaReducer.sf(state, path, lst)
    }

    delRow = (state, gridName, rowIndex, delControl) => {        
        if (!this.option)
            return state

        const path = this.option[gridName].path
        var lst = this.metaReducer.gf(state, path)

        if (rowIndex == -1)
            return state

        lst = lst.remove(rowIndex)
        if (delControl != undefined) {
            return this.metaReducer.sf(state, path, lst)
        }
        //永远保证有5行
        let defaultLength = this.metaReducer.gf(state, 'data.other.defaultLength')
        let defaultSize = this.metaReducer.gf(state, 'data.other.defaultSize') || 5 //个别地方不需要默认保证5行数据，自定义一下
        if ((defaultLength != undefined && lst.size == defaultLength - 1) || lst.size == defaultSize-1)
            lst = lst.insert(lst.size, Map({}))

        return this.metaReducer.sf(state, path, lst)
    }

    setOther = (state, other) => {
        return this.metaReducer.sfs(state, other)
    }
}

function HashTable() {
    var size = 0;
    var entry = new Object();
    this.add = function (key, value) {
        if (!this.containsKey(key)) {
            size++;
        }
        entry[key] = value;
    }
    this.getValue = function (key) {
        return this.containsKey(key) ? entry[key] : null;
    }
    this.remove = function (key) {
        if (this.containsKey(key) && (delete entry[key])) {
            size--;
        }
    }
    this.containsKey = function (key) {
        return (key in entry);
    }
    this.containsValue = function (value) {
        for (var prop in entry) {
            if (entry[prop] == value) {
                return true;
            }
        }
        return false;
    }
    this.getValues = function () {
        var values = new Array();
        for (var prop in entry) {
            values.push(entry[prop]);
        }
        return values;
    }
    this.getKeys = function () {
        var keys = new Array();
        for (var prop in entry) {
            keys.push(prop);
        }
        return keys;
    }
    this.getSize = function () {
        return size;
    }
    this.clear = function () {
        size = 0;
        entry = null;
    }
}

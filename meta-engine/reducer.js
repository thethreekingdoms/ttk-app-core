import Immutable from 'immutable'

import contextManager from './context'

import * as common from './common'

class reducer {
    constructor(option) {
        this.appDataId = option.appDataId;
    }

    init = (state, option) => {
        const {
            data = {},
        } = option;

        return this.initByImmutable(state, {
            data: Immutable.fromJS(data),
        })
    };

    initByImmutable = (state, option) => {
        const {
            data,
        } = option;

        //设置状态
        return state.setIn([this.appDataId, 'data'], data);
    };

    getMeta = common.getMeta;

    getField = (state, fieldPath) => {
        return common.getField(state, fieldPath, this.appDataId)
    };

    getFields = (state, fieldPaths) => {
        return common.getFields(state, fieldPaths, this.appDataId)
    };

    setField = (state, fieldPath, value) => {
        let keys = [];
        if (fieldPath instanceof Array) {
            keys.push(fieldPath.join('.'));
        } else {
            keys.push(fieldPath);
        }
        return this.setTempDataChangeKeys(common.setField(state, fieldPath, value, this.appDataId), keys);
    };

    setFields = (state, values) => {
        let keys = Object.keys(values)
        return this.setTempDataChangeKeys(common.setFields(state, values, this.appDataId), keys);
    };

    // 设置data改变的key数组
    setTempDataChangeKeys = (state, keys = []) => {
        let oldKey = state.get('DataChange');
        return state.set('DataChange', oldKey ? oldKey.concat(keys) : keys)
    }

    setChildMeta = common.setChildMeta;

    gm = common.getMeta;

    sm = common.setMetaForce;

    gf = this.getField;

    gfs = this.getFields;

    sf = this.setField;

    sfs = this.setFields;

    context = contextManager

}

export default function creator(option) {
    return new reducer(option)
}
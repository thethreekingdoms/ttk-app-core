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

    setDataChangeKeysManager = (state, dataChangeKeysManager) => {
        this.dataChangeKeysManager = dataChangeKeysManager;
        return state;
    }

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
        this.dataChangeKeysManager && this.dataChangeKeysManager.setDataKeys(keys);
        return common.setField(state, fieldPath, value, this.appDataId);
    };

    setFields = (state, values) => {
        let keys = Object.keys(values)
        this.dataChangeKeysManager && this.dataChangeKeysManager.setDataKeys(keys);
        return common.setFields(state, values, this.appDataId);
    };

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
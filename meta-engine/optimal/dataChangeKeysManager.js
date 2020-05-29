import {geneUUID} from 'edf-utils'

class DataChangeKeysManager {
    constructor() {
        this.connectComponents = {};
    }

    generateId = () => {
        return `ConnectComponents_${geneUUID(8)}`
    }

    registerConnectComponent = (id) => {
        if (this.connectComponents[id]) {
            return;
        }
        this.connectComponents[id] = [];
    };

    unregisterConnectComponent = (id) => {
        if (this.connectComponents[id]) {
            delete this.connectComponents[id]
        }
    };

    getDataKeys = (id) => {
        if (this.connectComponents[id]) {
            let result = this.connectComponents[id];
            this.connectComponents[id] = [];
            return result;
        }
    };

    setDataKeys = (keys) => {
        for (let [key, value] of Object.entries(this.connectComponents)) {
            this.connectComponents[key] = value.concat(keys);
        }
    }
}

export default DataChangeKeysManager
;
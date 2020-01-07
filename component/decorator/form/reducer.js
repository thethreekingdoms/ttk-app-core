import { Map, fromJS, List } from 'immutable'
import { reducer as MetaReducer } from 'edf-meta-engine'
import utils from 'edf-utils'
export default class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
    }

    setMultiField = (state, value) => {
        if (value) {
            Object.keys(value).forEach(p => {
                state = this.metaReducer.sf(state, `${p}`, fromJS(value[p]))
            })
        }
        return state

    }

    upload = (state, file, ts, attachedNum) => {
        let isAttachCount = this.metaReducer.gf(state, 'data.form.isAttachCount'),
            attachCount = this.metaReducer.gf(state, 'data.form.attachCount'),
            enclosures = List()
        let attachmentFiles = []
        if (file && file.length > 0) {
            file.map(o => {
                attachmentFiles.push({
                    alt: o.name || o.file.name,
                    id: o.id,
                    type: o.type || o.file.type,
                    fileId: o.fileId,
                    name: o.name || o.file.originalName,
                    ts: o.ts || o.file.ts,
                    accessUrl: o.accessUrl || o.file.accessUrl
                })
                return attachmentFiles
            })
        }
        if (attachedNum > -1) {
            state = this.metaReducer.sf(state, 'data.form.attachCount', attachedNum)
        } else {
            if (isAttachCount || (file.length >= attachCount)) {
                state = this.metaReducer.sf(state, 'data.form.attachCount', file.length)
            }
        }

        if (!!ts) {
            let ts1 = this.metaReducer.gf(state, 'data.form.ts')
            if(ts1){
                let ts2 = ts1.slice(11,26).replace(/:/g, '')
                let newTs = ts.slice(11,26).replace(/:/g, '')
                if(ts2 <= newTs){
                    state = this.metaReducer.sf(state, 'data.form.ts', ts) 
                }
            }else {
                state = this.metaReducer.sf(state, 'data.form.ts', ts) 
            }
            
        }

        state = this.metaReducer.sf(state, 'data.form.adjunctInfo.album', file)
        state = this.metaReducer.sf(state, 'data.form.adjunctInfo.adjunctSize', file.length)
        // state = this.metaReducer.sf(state, 'data.form.attachmentFiles', fromJS(file))
        state = this.metaReducer.sf(state, 'data.form.attachmentFiles', fromJS(attachmentFiles))

        return state
    }

    //附件上传状态
	attachmentLoading = (state, attachmentLoading) => {
		return this.metaReducer.sf(state, 'data.form.attachmentLoading', attachmentLoading)
	}
}

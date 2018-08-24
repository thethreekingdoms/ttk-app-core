import React from 'react'
import { action as MetaAction, AppLoader } from 'edf-meta-engine'
import config from './config'
import { Map ,fromJS} from 'immutable'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        injections.reduce('init')
        this.load();
    }

    load = async (pagination, filter) => {
        const response = await this.webapi.notice.query({ pagination, filter }) //调用接口
        console.log(response);
      //  response.filter = filter//条件
        this.injections.reduce('load', response) //调用reduce 把res给load方法实现更新state
    }

    btnClick = () => {
        return;
       // this.injections.reduce('modifyContent')
    }
    
    getNotificationBox=()=>{
        return;
       // this.injections.reduce('modifyContent')
    }
    onTabChange=()=>{
        return
    }
    onItemClick=()=>{
        return
    }
    onClear =(tabName)=>{
        this.injections.reduce('onClear',tabName)
    }

}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}


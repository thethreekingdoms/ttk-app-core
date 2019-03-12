import { Map, fromJS } from 'immutable'
import { reducer as MetaReducer } from 'edf-meta-engine'
import config from './config'
import extend from './extend'
import { getInitState } from './data'

class reducer {
	constructor(option) {
		this.metaReducer = option.metaReducer
		this.extendReducer = option.extendReducer
		this.config = config.current
	}

    init = (state, option) => {
        let initState = getInitState()
        return this.metaReducer.init(state, initState)
	}
	
    load = (state, option) => {
		if(option.list){
			if(option.initData.isVattaxpayer){
				option.list.map((item, index)=>{
					if(item.kplx == '自开'){
						option.list[index].kplx_id = false
					}else if(item.kplx == '代开'){
						option.list[index].kplx_id = true
					}
				})
			}
			state = this.metaReducer.sf(state, 'data.list', fromJS(option.list))
		}else{
			state = this.metaReducer.sf(state, 'data.list', fromJS([]))
		}
		
		if(option.page) state = this.setPages(state, option.page)
		if(option.hwlxList || option.fplxList) {
			let slList = this.setArr(option.slList),
				jsfsList = this.setArr(option.jsfsList),
				fplxList = this.setArr(option.fplxList),
				zsfsList = this.setArr(option.zsfsList)
			state = this.metaReducer.sfs(state, {
				'data.other.slList': fromJS(slList), // 税率
				'data.other.hwlxList': fromJS(option.hwlxList), // 货物类型
				'data.other.jsfsList': fromJS(jsfsList),  // 计税方式
				'data.other.fplxList': fromJS(fplxList),  // 进项发票类型
				'data.other.zsfsList': fromJS(zsfsList),  // 征收方式
			})
			if(option.initData){
				let record = option.initData.record, sfdk
				if(record.expropriationMethod == 'authentication') sfdk = true

				state = this.metaReducer.sfs(state, {
					'data.form': fromJS({
						sl: record.sl_id == undefined ? 'all': record.sl_id,
						hwlx: record.hwlx_idList, 
						jsfs: record.jsff_id == undefined ? 'all':record.jsff_id,
						fplx: record.fplx_id  == undefined ? 'all':record.fplx_id ,
						zsfs: record.expropriationMethod ? record.expropriationMethod : 'all',
						sfdk: sfdk ? true : 'all',
						kplx: option.initData.isVattaxpayer && record.dk!=undefined ? record.dk : 'all'
					})
				})
				// 销项
				let skssqq = option.initData.date.skssqq, skssqz = option.initData.date.skssqz
				if(skssqq && skssqz) state = this.metaReducer.sfs(state, {
					'data.form.sbsqq': fromJS(skssqq.substring(0,7)),
					'data.form.sbsqz': fromJS(skssqz.substring(0,7))
				})

				if(option.initData.record.expropriationMethod == 'authentication'){  // 进项  本期认证抵扣
                    state = this.metaReducer.sfs(state, {
						'data.form.kpyf': undefined,
						'data.form.rzyf': fromJS(skssqq.substring(0,7))
					})
                }else{  // 进项  发票日期在属期内的发票
                    state = this.metaReducer.sfs(state, {
						'data.form.kpyf': fromJS(skssqq.substring(0,7)),
						'data.form.rzyf': undefined
					})
                }
			}
		}
        return state  
	}
	
	setArr = (arr) =>{
		if(arr){
			arr.splice(0, 0, {
				id: 'all',
				name: '全部'
			})
			return arr
		}
	}
	//设置分页
	setPages = (state, page) => {
		if(page){
			state = this.metaReducer.sf(state, `data.page`, fromJS({
				currentPage: page.currentPage,
				total: page.totalCount,
				pageSize: page.pageSize
			}))
        }
		return state
	}
}

export default function creator(option) {
	const metaReducer = new MetaReducer(option),
		extendReducer = extend.reducerCreator({ ...option, metaReducer }),
		o = new reducer({ ...option, metaReducer, extendReducer }),
		ret = { ...metaReducer, ...extendReducer.gridReducer, ...o }
	
	return { ...ret }
}
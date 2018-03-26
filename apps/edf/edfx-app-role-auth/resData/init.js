import { getData} from './db'

function init(){
	const { parent, menus, operations,  checked } = getData()
	return {
		"result": true,
		"value": {
			"roles": parent,
			"menus": menus,
			"operations": operations,
			"menuOperations": checked[parent[0].id.toString()]
		}
	}
}

export default init
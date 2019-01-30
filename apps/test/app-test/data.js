export function getInitState() {
	return {
		data: {
			content: 'Hello',
			input: 'World',
			dataSource: [{
				key: '1',
				name: '胡彦斌',
				age: 32,
				address: '西湖区湖底公园1号'
			}, {
				key: '2',
				name: '胡彦祖',
				age: 42,
				address: '西湖区湖底公园1号'
			}],
			columns: [{
				title: '姓名',
				dataIndex: 'name',
				key: 'name',
			}, {
				title: '年龄',
				dataIndex: 'age',
				key: 'age',
			}, {
				title: '住址',
				dataIndex: 'address',
				key: 'address',
			}],
			version: 'v1.0.0',
			list: [{
				fpDm: '1111',
				fphm: '2222',
				scqymc: '3333',
				cpxh1: '4444',
				clsbdm: '5555'
			}, {
				fpDm: '1111',
				fphm: '2222',
				scqymc: '3333',
				cpxh1: '4444',
				clsbdm: '5555'
			}, {
				fpDm: '1111',
				fphm: '2222',
				scqymc: '3333',
				cpxh1: '4444',
				clsbdm: '5555'
			}, {
				fpDm: '1111',
				fphm: '2222',
				scqymc: '3333',
				cpxh1: '4444',
				clsbdm: '5555'
			}, {
				fpDm: '1111',
				fphm: '2222',
				scqymc: '3333',
				cpxh1: '4444',
				clsbdm: '5555'
			}]
		}
	}
}
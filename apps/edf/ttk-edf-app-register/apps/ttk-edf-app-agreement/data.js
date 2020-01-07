export function getMeta() {
	return {
		name: 'root',
		component: 'div',
		children: [{
			name: 'hello',
			component: 'span',
			children: '{{data.content}}'
		}]
	}
}

export function getInitState() {
	return {
		data: {
			content: 'hello world'
		}
	}
}
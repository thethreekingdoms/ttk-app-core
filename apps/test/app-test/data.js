export function getMeta() {
	return {
		name: 'root',
		component: '::div',
		children: [{
			name: 'hello',
			component: '::span',
			className: 'app-test-span',
			children: '{{data.content}}'
		}]
	}
}

export function getInitState() {
	return {
		data: {
			content: 'hello edf'
		}
	}
}
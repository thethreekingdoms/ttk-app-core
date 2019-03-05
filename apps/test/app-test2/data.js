export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'app-test2',
		children: [{
			name: 'img',
			component: '::span',
			className: 'app-test2-div',
			children: [
				{
					name: 'tips',
					component: 'div',
					children: '{{data.content}}'
				}, {
					name: 'version',
					component: 'div',
					children: '{{data.version}}'
				}
			]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			content: 'Hello',
			input: '',
			version: 'v1.0.0'
		}
	}
}
export function getMeta() {
	return {
		name: 'root',
		className: 'ttk-edf-app-iframe',
		component: '::div',
		children: [{
			name: 'iframe',
			className: 'ttk-edf-app-iframe-iframe',
			component: '::iframe',
			src: '{{data.src}}'
		}]
	}
}

export function getInitState() {
	return {
		data: {
			src: ''
		}
	}
}
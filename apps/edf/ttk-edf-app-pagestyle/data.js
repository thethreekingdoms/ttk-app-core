export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'ttk-edf-app-pagestyle',
		children: [{
			name: 'demo',
			component: '::span',
			className: 't-skin-content',
			children: [{
				name: 'tips1',
				component: '::div',
				className: 't-layout-title',
				children: '布局选择',
			}, {
				name: 'content1',
				component: '::div',
				className: 't-skin-row t-selects t-layout-selects',
				children: [{
					name: 'a2',
					component: '::a',
					_visible: false,
					//onClick:'{{function(){{$layOutChange("T","change")}}}}',
					className: 't-selects-option L',
					'data-skinlayout': 'L',
					children: [{
						name: 'child2',
						className: 'skin-layout-l',
						component: '::div',
						children: [{
							name: 'child22',
							component: '::div',
							className: 'skin-layout-top'
						}, {
							name: 'child23',
							component: '::div',
							className: 'skin-layout-content'
						}]
					}, {
						name: 'childright2',
						component: '::div',
						className: 'skin-layout-r',
						children: [
							{
								name: 'childright2-1',
								component: '::div',
								className: 'skin-layout-top'
							},
							{
								name: 'childright2-2',
								component: '::span',
								className: 'skin-layout-content',
								children: [{
									name: 'childright2-2-title',
									component: '::span',
									children: 'L形'
								}]
							}
						]
					}]
				}, {
					name: 'a3',
					component: '::a',
					onClick: '{{function(){{$layOutChange("T","change")}}}}',
					className: 't-selects-option top',
					'data-skinlayout': 'top',
					children: [{
						name: 'child3',
						component: '::div',
						className: 'skin-layout-l',
						children: [{
							name: 'child3-1',
							component: '::div',
							className: 'skin-layout-top'
						}, {
							name: 'child3-2',
							component: '::div',
							className: 'skin-layout-content'
						}]
					}, {
						name: 'child32',
						component: '::div',
						className: 'skin-layout-r',
						children: [{
							name: 'child32-1',
							component: '::div',
							className: 'skin-layout-top'
						}, {
							name: 'child32-2',
							component: '::span',
							className: 'skin-layout-content',
							children: [{
								name: 'child2conent-title',
								component: '::span',
								children: '顶端'
							}]
						}]
					}]

				}, {
					name: 'a1',
					component: '::a',
					_visible: true,
					onClick: '{{function(){{$layOutChange("L","change")}}}}',
					className: 't-selects-option left selected',
					'data-skinlayout': 'left',
					children: [{
						name: 'child1',
						component: '::div',
						className: 'skin-layout-l'
					},
					{
						name: 'child2',
						component: '::div',
						className: 'skin-layout-r',
						children: [{
							name: 'child2top',
							component: '::div',
							className: 'skin-layout-top'
						},
						{
							name: 'child2content',
							component: '::span',
							className: 'skin-layout-content',
							children: [{
								name: 'child2conent-title',
								component: '::span',
								children: '左侧'
							}]
						}]
					}, {
						name: 'child3',
						component: '::span',
						className: 'ticonfont ticonfont-selected'
					}]
				}]
			}, {
				name: 'tips2',
				component: '::div',
				className: 't-layout-title',
				children: '颜色选择'
			}, {
				name: 'row2',
				component: '::div',
				className: 't-skin-row t-color-selects',
				children: [{
					name: 'skin1',
					component: "::a",
					onClick: '{{function(){{$toggleColor("#416AAA","change")}}}}',
					className: 'skinBtns skinBlue',
					"data-skin": "skinBlue	",
					children: [{
						name: 'skin1title',
						component: '::p',
						children: '商务蓝'
					}]
				}, {
					name: 'skin2',
					component: "::a",
					className: 'skinBtns skinGray',
					onClick: '{{function(){{$toggleColor("#414141","change")}}}}',
					"data-skin": "skinGray",
					children: [{
						name: 'skin2title',
						component: '::p',
						children: '经典灰'
					}]
				}]
			}, {
				name: 'row3title',
				component: '::div',
				className: 't-layout-title',
				children: '背景图片'
			}, {
				name: 'row3',
				component: '::div',
				className: 't-skin-row t-color-selects',
				children: [{
					name: 'skin1',
					component: "::a",
					className: 'skinBtns2',
					children: [{
						name: 'bg1',
						className: 'bg1',
						component: '::div',
					}]
				}, {
					name: 'skin2',
					component: "::a",
					className: 'skinBtns2',
					children: [{
						name: 'bg2',
						className: 'bg2',
						component: '::div',
					}]
				}, {
					name: 'skin3',
					component: "::a",
					className: 'skinBtns2',
					children: [{
						name: 'bg3',
						className: 'bg3',
						component: '::div',
					}]
				}]
			}
			]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			currentAppName: ''
		}
	}
}
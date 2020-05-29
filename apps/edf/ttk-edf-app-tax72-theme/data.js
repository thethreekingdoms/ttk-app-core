import { Tax72 }  from 'edf-component';
export function getMeta() {
	return {
		name: 'root',
        component: '::div',
        className: 'ttk-tax72-demo',
		children: [
            { 
                name: 'head',
                component: 'Tax72.Header',
                logoType: 'bj',
                hasLogin: '{{data.userInfo.hasLogin}}',
                userName: '{{data.userInfo.userName}}',
                onSearch: '{{function(value) { $onShowSuccessMsg("点击搜索" + value) }}}',
                onHomeClick: '{{function(value) { $onShowSuccessMsg("点击主页") }}}',
                onLogin: "{{function(value) { $setField('data.userInfo.hasLogin', true) }}}",
                onLogout: "{{function(value) { $setField('data.userInfo.hasLogin', false) }}}",
                onChangeUser: '{{function(value) { $onShowSuccessMsg("点击切换身份") }}}',
                onChangeDepartment: '{{function(value) { $onShowSuccessMsg("点击选择主管税务机关" + value) }}}',
            },
            {
                name: 'main',
                component: '::div',
                className: 'ttk-tax72-demo-main',
                children: [
                    {
                        name: 'left',
                        component: '::div',
                        className: 'ttk-tax72-demo-left',
                        children: [
                            { 
                                name: 'menuBox',
                                component: '::div',
                                style: { width: '228px' },
                                children: [
                                    { name: 'menuHeader', component: '::div', className: 'tax72-menu-header', children: 'Demo' },
                                    { 
                                        name: 'menu',
                                        component: 'Menu',
                                        mode: 'inline',
                                        inlineIndent: '20px', 
                                        style: { width: '228px' },
                                        defaultOpenKeys: ['1'],
                                        selectedKeys: '{{data.selectedKeys}}',
                                        onSelect: "{{function({ item, key, keyPath, selectedKeys, domEvent }){$setField('data.selectedKeys', [key])}}}",
                                        children: [
                                            {
                                                name: 'SubMenu1',
                                                component: 'Menu.SubMenu',
                                                title: '页面元素',
                                                key: '1',
                                                children: [
                                                    { name: 'MenuItem11', component: 'Menu.Item', key: '11', children : 'LOGO图标' },
                                                    { name: 'MenuItem12', component: 'Menu.Item', key: '12', children : 'PNG图标'},
                                                    { name: 'MenuItem13', component: 'Menu.Item', key: '13', children : 'css字体图标' },
                                                    { name: 'MenuItem14', component: 'Menu.Item', key: '14', children : '页头' },
                                                    { name: 'MenuItem15', component: 'Menu.Item', key: '15', children : '标题/文本' },
                                                    { name: 'MenuItem16', component: 'Menu.Item', key: '16', children : '按钮' },
                                                    { name: 'MenuItem17', component: 'Menu.Item', key: '17', children : '提示/提醒' },
                                                    { name: 'MenuItem18', component: 'Menu.Item', key: '18', children : '表单' },
                                                    { name: 'MenuItem19', component: 'Menu.Item', key: '19', children : '选项卡' },
                                                    { name: 'MenuItem20', component: 'Menu.Item', key: '20', children : 'Breadcrumb-面包屑' },
                                                    { name: 'MenuItem21', component: 'Menu.Item', key: '21', children : '表格' },
                                                    { name: 'MenuItem22', component: 'Menu.Item', key: '22', children : '弹出窗口' },
                                                    { name: 'MenuItem23', component: 'Menu.Item', key: '23', children : '日期控件' },
                                                    { name: 'MenuItem24', component: 'Menu.Item', key: '24', children : '左菜单' },
                                                    { name: 'MenuItem25', component: 'Menu.Item', key: '25', children : 'loading-加载层' },
                                                ]
                                            },
                                            {
                                                name: 'SubMenu2',
                                                component: 'Menu.SubMenu',
                                                title: '第三方组件',
                                                key: '2',
                                                children: [
                                                    { name: 'MenuItem21', component: 'Menu.Item', key: '21',children : '二级菜单'},
                                                    { name: 'MenuItem22', component: 'Menu.Item', key: '22',children : '二级菜单'},
                                                ]
                                            },
                                            {
                                                name: 'SubMenu3',
                                                component: 'Menu.SubMenu',
                                                title: '自主变更',
                                                key: '3',
                                                children: [
                                                    { name: 'MenuItem31', component: 'Menu.Item', key: '31',children : '二级菜单'},
                                                    { name: 'MenuItem32', component: 'Menu.Item', key: '32',children : '二级菜单'},
                                                ]
                                            },
                                            { name: 'MenuItem4', component: 'Menu.Item', children : '违法违章处理'},
                                            { name: 'MenuItem5', component: 'Menu.Item', children : '涉税代理业务服务'},
                                        ]
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        name: 'right',
                        component: '::div',
                        className: 'ttk-tax72-demo-right',
                        children: [
                            { name: 'content11', component: '::div', _visible: "{{data.selectedKeys.includes('11')}}", children: [
                                { name: 'header', component: 'Tax72.Title', style: { marginBottom: '20px' }, title: '系统功能大图标(520*83 规格)' },
                                { name: 'div', component: '::div', className: 'ttk-tax72-demo-logo', children: { name: 'logo', component: 'Tax72.Logo', type: '{{data.logoList[_rowIndex]}}'}, _power: 'for in data.logoList' },
                            ] },
                            { name: 'content12', component: '::div', _visible: "{{data.selectedKeys.includes('12')}}", children: [
                                { name: 'header', component: 'Tax72.Title', style: { marginBottom: '20px' }, title: '系统功能大图标(52*52 规格)——点击图标可复制代码' },
                                { name: 'div', component: '::div', className: 'ttk-tax72-demo-png', children: {
                                    name: 'pngLayout',
                                    component: '::div',
                                    className: 'ttk-tax72-demo-png-layout',
                                    onClick: "{{function(){$copyPngCode(data.pngList[_rowIndex])}}}",
                                    children: [
                                        { name: 'png', component: 'Tax72.Png', type: '{{data.pngList[_rowIndex].type}}' },
                                        { name: 'name', component: '::p', children: '{{data.pngList[_rowIndex].name}}' }
                                    ],
                                    _power: 'for in data.pngList'
                                } },
                            ] },
                            { name: 'content13', component: '::div', _visible: "{{data.selectedKeys.includes('13')}}", children: [
                                { name: 'header', component: 'Tax72.Title', style: { marginBottom: '20px' }, title: 'fsicon 图标——点击图标可复制代码' },
                                { name: 'div', component: '::div', className: 'ttk-tax72-demo-font', children: {
                                    name: 'pngLayout',
                                    component: '::div',
                                    className: 'ttk-tax72-demo-font-layout',
                                    onClick: "{{function(){$copyFontCode(data.fontList[_rowIndex])}}}",
                                    children: [
                                        { name: 'icon', component: 'Icon', fontFamily: 'fsicon', type: '{{data.fontList[_rowIndex].type}}' },
                                        { name: 'name', component: '::p', children: '{{data.fontList[_rowIndex].name}}' }
                                    ],
                                    _power: 'for in data.fontList'
                                } },
                            ] },
                            { name: 'content14', component: '::div', _visible: "{{data.selectedKeys.includes('14')}}", children: '见本页面页头' },
                            { name: 'content15', component: '::div', _visible: "{{data.selectedKeys.includes('15')}}", children: [
                                { name: 'header1', component: 'Tax72.Title', style: { marginBottom: '20px' }, title: '标题' },
                                { name: 'h1', component: '::h1', children : 'h1 电子税务局UI4.0' },
                                { name: 'h2', component: '::h2', children : 'h2 电子税务局UI4.0' },
                                { name: 'h3', component: '::h3', children : 'h3 电子税务局UI4.0' },
                                { name: 'h4', component: '::h4', children : 'h4 电子税务局UI4.0' },
                                { name: 'h5', component: '::h5', children : 'h5 电子税务局UI4.0' },
                                { name: 'h6', component: '::h6', children : 'h6 电子税务局UI4.0' },
                                { name: 'header2', component: 'Tax72.Title', style: { margin: '20px 0' }, title: '文本颜色(默认color:#333)' },
                                { name: 'p1', component: '::p', className: 'ttk-tax72-font-strong', children : 'class="ttk-tax72-font-strong" 电子税务局UI4.0 color:#000' },
                                { name: 'p2', component: '::p', children : '站点默认 电子税务局UI4.0 color:#333' },
                                { name: 'p3', component: '::p', className: 'ttk-tax72-font-medium', children : 'class="ttk-tax72-font-medium" 电子税务局UI4.0 color:#666' },
                                { name: 'p4', component: '::p', className: 'ttk-tax72-font-weak', children : 'class="ttk-tax72-font-weak" 电子税务局UI4.0 color:#999' },
                                { name: 'p5', component: '::p', className: 'ttk-tax72-font-weakest', children : 'class="ttk-tax72-font-weakest" 电子税务局UI4.0 color:#aaa' },
                                { name: 'p6', component: '::p', className: 'ttk-tax72-font-blue', children : 'class="ttk-tax72-font-blue" 电子税务局UI4.0 color:#0994dc' },
                                { name: 'p7', component: '::p', className: 'ttk-tax72-font-orange', children : 'class="ttk-tax72-font-orange" 电子税务局UI4.0 color:#ff8939' },
                                { name: 'p8', component: '::p', className: 'ttk-tax72-font-red', children : 'class="ttk-tax72-font-red" 电子税务局UI4.0 color:#ff0000' },
                                { name: 'header3', component: 'Tax72.Title', style: { margin: '20px 0' }, title: '字体大小(默认14px)' },
                                { name: 'p9', component: '::p', className: 'ttk-tax72-font-s24', children : 'class="ttk-tax72-font-s24" font-size:24px' },
                                { name: 'p10', component: '::p', className: 'ttk-tax72-font-s20', children : 'class="ttk-tax72-font-s20" font-size:20px' },
                                { name: 'p11', component: '::p', className: 'ttk-tax72-font-s18', children : 'class="ttk-tax72-font-s18" font-size:18px' },
                                { name: 'p12', component: '::p', className: 'ttk-tax72-font-s16', children : 'class="ttk-tax72-font-s16" font-size:16px' },
                                { name: 'p13', component: '::p', children : '站点默认 font-size:14px' },
                                { name: 'p14', component: '::p', className: 'ttk-tax72-font-s12', children : 'class="ttk-tax72-font-s12" font-size:12px' },
                                { name: 'header4', component: 'Tax72.Title', style: { margin: '20px 0' }, title: '区块标题' },
                            ] },
                            { name: 'content16', component: '::div', _visible: "{{data.selectedKeys.includes('16')}}", children: [
                                { name: 'header2', component: 'Tax72.Title', style: { marginBottom: '20px' }, title: 'Button-页面底部操作按钮' },
                                {
                                    name: 'title',
                                    component: '::div',
                                    children: [
                                        { name: 'btn1', component: 'Button', children : '一般行动点' },
                                        { name: 'btn2', component: 'Button', type: 'primary', children : '强行动点' },
                                        { name: 'btn3', component: 'Button', type: 'warm', children : '暖色按钮' },
                                        { name: 'btn3', component: 'Button', type: 'danger', children : '警告按钮' },
                                        { name: 'btn4', component: 'Button', disabled: true, children : '禁用按钮' },
                                    ],
                                },
                                { name: 'header3', component: 'Tax72.Title', style: { margin: '20px 0' }, title: 'Button-列表操作按钮' },
                                {
                                    name: 'title',
                                    component: '::div',
                                    style: { lineHeight: '35px' },
                                    children: [
                                        { name: 'btn1', component: 'Button', size: 'small', iconFontFamily: 'fsicon', icon: 'btn-invalidation', children : '申报作废' },
                                        { name: 'btn2', component: 'Button', size: 'small', iconFontFamily: 'fsicon', icon: 'btn-edit', children : '修改' },
                                        { name: 'btn3', component: 'Button', size: 'small', iconFontFamily: 'fsicon', icon: 'btn-del', children : '删除' },
                                        { name: 'btn4', component: 'Button', size: 'small', iconFontFamily: 'fsicon', icon: 'btn-Sync', children : '同步' },
                                        { name: 'btn5', component: 'Button', size: 'small', iconFontFamily: 'fsicon', icon: 'btn-refresh', children : '刷新' },
                                        { name: 'btn6', component: 'Button', size: 'small', iconFontFamily: 'fsicon', icon: 'btn-print', children : '打印' },
                                        { name: 'br', component: '::br' },
                                        { name: 'btn7', component: 'Button', size: 'small', type: 'primary', iconFontFamily: 'fsicon', icon: 'btn-table', children : '申请表' },
                                        { name: 'btn8', component: 'Button', size: 'small', type: 'primary', iconFontFamily: 'fsicon', icon: 'btn-review', children : '审核' },
                                        { name: 'btn9', component: 'Button', size: 'small', type: 'primary', iconFontFamily: 'fsicon', icon: 'btn-pay', children : '缴款' },
                                        { name: 'btn10', component: 'Button', size: 'small', type: 'primary', iconFontFamily: 'fsicon', icon: 'btn-check', children : '查看' },
                                        { name: 'btn11', component: 'Button', size: 'small', type: 'primary', iconFontFamily: 'fsicon', icon: 'btn-tracking', children : '进度追踪' },
                                        { name: 'btn12', component: 'Button', size: 'small', type: 'primary', iconFontFamily: 'fsicon', icon: 'btn-add', children : '添加' },
                                        { name: 'btn13', component: 'Button', size: 'small', type: 'primary', iconFontFamily: 'fsicon', icon: 'btn-save', children : '设置保存' },
                                        { name: 'btn14', component: 'Button', size: 'small', disabled: true, iconFontFamily: 'fsicon', icon: 'btn-add', children : '添加' },
                                    ],
                                },
                                { name: 'header4', component: 'Tax72.Title', style: { margin: '20px 0' }, title: 'Button-页面底部操作按钮' },
                                {
                                    name: 'title',
                                    component: '::div',
                                    children: [
                                        { name: 'btn1', component: 'Button', size: 'small', children : '普通操作' },
                                        { name: 'btn2', component: 'Button', size: 'small', type: 'primary', children : '推荐操作' },
                                        { name: 'btn3', component: 'Button', size: 'small', type: 'danger', children : '警惕操作' },
                                    ],
                                },
                                { name: 'header5', component: 'Tax72.Title', style: { margin: '20px 0' }, title: '文字链接' },
                                {
                                    name: 'title',
                                    component: '::div',
                                    children: [
                                        { name: 'link1', component: 'Link', children : '新开页面跳转(强)' },
                                        { name: 'link2', component: 'Link', className: 'mk-link-medium', style: { marginLeft: '10px' }, children : '新开页面跳转(中)' },
                                        { name: 'link3', component: 'Link', className: 'mk-link-weak', style: { marginLeft: '10px' }, children : '新开页面跳转(弱)' },
                                        { name: 'link4', component: 'Link', className: 'mk-link-weakest', style: { marginLeft: '10px' }, children : '新开页面跳转(最弱)' },
                                        { name: 'link5', component: 'Link', className: 'mk-link-blank', style: { marginLeft: '10px' }, children : '外部超链接' },
                                    ],
                                },
                            ] },
                            { name: 'content17', component: '::div', _visible: "{{data.selectedKeys.includes('17')}}", children: [
                                { name: 'header6', component: 'Tax72.Title', style: { marginBottom: '20px' }, title: 'Notice-提示' },
                                { name: 'alert1', component: 'Alert', style: { marginTop: '10px' }, message: '温馨提醒primary', type: "warning", showIcon: true, closable: true, onClose: '{{function(value) { $onShowSuccessMsg("温馨提醒primary关闭") }}}' },
                                { name: 'alert2', component: 'Alert', style: { marginTop: '10px' }, message: '通知info', type: "info", showIcon: true, closable: true, onClose: '{{function(value) { $onShowSuccessMsg("通知info关闭") }}}' },
                                { name: 'alert3', component: 'Alert', style: { marginTop: '10px' }, message: '严重警告warning', type: "error", showIcon: true, closable: true, onClose: '{{function(value) { $onShowSuccessMsg("严重警告warning关闭") }}}' },
                                { name: 'alert7', component: 'Tax72.Reminder', style: { marginTop: '10px' }, title: '温馨提示', children: [
                                    '事项进度管理可以进行查看、修改、删除和跟踪事项申请记录，便于纳税人跟进税务机关的受理进度',
                                    { name: 'li1', component: 'Tax72.Reminder.Li', children: [
                                        '可进行',
                                        { name: 'link1', component: 'Link', children : '修改' },
                                        '操作的办理状态有：“资料已保存” “资料已提交，带受理（可修改）” “受理不通过，待补齐补正” “预审不通过，待受理（可修改）”',
                                    ] },
                                    { name: 'li2', component: 'Tax72.Reminder.Li', children: [
                                        '可进行',
                                        { name: 'link1', component: 'Link', children : '删除' },
                                        '操作的办理状态有：“资料已保存” “资料已提交，带受理（可修改）” “预审不通过，待受理（可修改）”',
                                    ] },
                                ] },
                            ] },
                            { name: 'content18', component: '::div', _visible: "{{data.selectedKeys.includes('18')}}", children: [
                                { name: 'header7', component: 'Tax72.Title', style: { marginBottom: '20px' }, title: '表单集合演示' },
                                {
                                    name: 'form',
                                    component: 'Form',
                                    hideRequiredMark: true,
                                    style: { width: '100%' },
                                    children: [
                                        {
                                            name: 'item1',
                                            component: 'Form.Item',
                                            label: '单行输入框',
                                            labelCol: { span: 3 },
                                            wrapperCol: { span: 21 },
                                            validateStatus: "{{data.other.error.name?'error':'success'}}",
                                            help: '{{data.other.error.name}}',
                                            children: {
                                                name: 'property',
                                                component: 'Input',
                                                placeholder: '请输入标题',
                                                value: "{{data.form.name}}",
                                                onChange: "{{function(e){$setFields({ 'data.form.name': e.target.value, 'data.other.error.name': undefined })}}}",
                                            }
                                        },
                                        {
                                            name: 'item2',
                                            component: 'Form.Item',
                                            label: '验证必填项',
                                            labelCol: { span: 3 },
                                            wrapperCol: { span: 21 },
                                            validateStatus: "{{data.other.error.verify?'error':'success'}}",
                                            help: '{{data.other.error.verify}}', 
                                            children: {
                                                name: 'property',
                                                component: 'Input',
                                                placeholder: '请输入',
                                                value: "{{data.form.verify}}",
                                                onChange: "{{function(e){$setFields({ 'data.form.verify': e.target.value, 'data.other.error.verify': undefined })}}}",
                                            }
                                        },
                                        {
                                            name: 'row1',
                                            component: 'Row',
                                            children: [
                                                {
                                                    name: 'row1',
                                                    component: 'Col',
                                                    span: '8',
                                                    children: {
                                                        name: 'item3',
                                                        component: 'Form.Item',
                                                        label: '验证手机',
                                                        labelCol: { span: 9 },
                                                        wrapperCol: { span: 15 },
                                                        children: {
                                                            name: 'property',
                                                            component: 'Input',
                                                            placeholder: '请输入',
                                                        }
                                                    }
                                                },
                                                {
                                                    name: 'row1',
                                                    component: 'Col',
                                                    span: '8',
                                                    children: {
                                                        name: 'item3',
                                                        component: 'Form.Item',
                                                        label: '验证邮箱',
                                                        labelCol: { span: 9 },
                                                        wrapperCol: { span: 15 },
                                                        children: {
                                                            name: 'property',
                                                            component: 'Input',
                                                            placeholder: '请输入',
                                                        }
                                                    }
                                                },
                                            ]
                                        },
                                        {
                                            name: 'row1',
                                            component: 'Row',
                                            children: [
                                                {
                                                    name: 'row1',
                                                    component: 'Col',
                                                    span: '8',
                                                    children: {
                                                        name: 'item3',
                                                        component: 'Form.Item',
                                                        label: '多规则验证',
                                                        labelCol: { span: 9 },
                                                        wrapperCol: { span: 15 },
                                                        children: {
                                                            name: 'property',
                                                            component: 'Input',
                                                            placeholder: '请输入',
                                                        }
                                                    }
                                                },
                                                {
                                                    name: 'row1',
                                                    component: 'Col',
                                                    span: '8',
                                                    children: {
                                                        name: 'item3',
                                                        component: 'Form.Item',
                                                        label: '验证日期',
                                                        labelCol: { span: 9 },
                                                        wrapperCol: { span: 15 },
                                                        children: {
                                                            name: 'property',
                                                            component: 'Input',
                                                            placeholder: '请输入',
                                                        }
                                                    }
                                                },
                                                {
                                                    name: 'row1',
                                                    component: 'Col',
                                                    span: '8',
                                                    children: {
                                                        name: 'item3',
                                                        component: 'Form.Item',
                                                        label: '验证链接',
                                                        labelCol: { span: 9 },
                                                        wrapperCol: { span: 15 },
                                                        children: {
                                                            name: 'property',
                                                            component: 'Input',
                                                            placeholder: '请输入',
                                                        }
                                                    }
                                                },
                                            ]
                                        },
                                        {
                                            name: 'item3',
                                            component: 'Form.Item',
                                            label: '验证身份证',
                                            labelCol: { span: 3 },
                                            wrapperCol: { span: 21 },
                                            children: {
                                                name: 'property',
                                                component: 'Input',
                                                placeholder: '请输入',
                                            }
                                        },
                                        {
                                            name: 'item3',
                                            component: 'Form.Item',
                                            label: '自定义验证',
                                            labelCol: { span: 3 },
                                            wrapperCol: { span: 5 },
                                            children: {
                                                name: 'property',
                                                component: 'Input',
                                                type: 'password',
                                                placeholder: '请填写6到12位密码',
                                            }
                                        },
                                        {
                                            name: 'item3',
                                            component: 'Form.Item',
                                            label: '范围',
                                            labelCol: { span: 3 },
                                            wrapperCol: { span: 5 },
                                            children: {
                                                name: 'div',
                                                component: '::div',
                                                style: { display: 'flex' },
                                                children: [
                                                    {
                                                        name: 'property',
                                                        component: 'Input',
                                                        placeholder: '￥',
                                                    },
                                                    {
                                                        name: 'p',
                                                        component: '::p',
                                                        style: { margin: '0 10px'},
                                                        children: '-',
                                                    },
                                                    {
                                                        name: 'property',
                                                        component: 'Input',
                                                        placeholder: '￥',
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            name: 'item3',
                                            component: 'Form.Item',
                                            label: '单行选择框',
                                            labelCol: { span: 3 },
                                            wrapperCol: { span: 21 },
                                            children: {
                                                name: 'select',
                                                component: 'Select',
                                                placeholder: '请选择',
                                                showSearch: false,
                                                children: [
                                                    { name: 'opt1', component: 'Select.Option', value: 'optId1', children: '写作' },
                                                    { name: 'opt2', component: 'Select.Option', value: 'optId2', children: '阅读' },
                                                    { name: 'opt3', component: 'Select.Option', value: 'optId3', children: '音乐' },
                                                    { name: 'opt4', component: 'Select.Option', value: 'optId4', children: '游戏' },
                                                    { name: 'opt5', component: 'Select.Option', value: 'optId5', children: '旅行' },
                                                ],
                                                style: { width: '100%' }
                                            }
                                        },
                                        {
                                            name: 'row1',
                                            component: 'Row',
                                            children: [
                                                {
                                                    name: 'row1',
                                                    component: 'Col',
                                                    span: '8',
                                                    children: {
                                                        name: 'item3',
                                                        component: 'Form.Item',
                                                        label: '分组选择框',
                                                        labelCol: { span: 9 },
                                                        wrapperCol: { span: 15 },
                                                        children: {
                                                            name: 'select',
                                                            component: 'Select',
                                                            showSearch: false,
                                                            placeholder: '请选择问题',
                                                            children: [
                                                                {
                                                                    name: 'OptGroup1',
                                                                    component: 'Select.OptGroup',
                                                                    label: '城市记忆',
                                                                    children: [
                                                                        {
                                                                            name: 'opt11',
                                                                            component: 'Select.Option',
                                                                            value: 'fistcity',
                                                                            children: '你工作的第一个城市',
                                                                        },
                                                                    ],
                                                                },
                                                                {
                                                                    name: 'OptGroup2',
                                                                    component: 'Select.OptGroup',
                                                                    label: '学生时代',
                                                                    children: [
                                                                        {
                                                                            name: 'opt21',
                                                                            component: 'Select.Option',
                                                                            value: 'yournum',
                                                                            children: '你的工号',
                                                                        },
                                                                        {
                                                                            name: 'opt22',
                                                                            component: 'Select.Option',
                                                                            value: 'teacher',
                                                                            children: '你最喜欢的老师',
                                                                        },
                                                                    ],
                                                                }
                                                            ],
                                                            style: {width: '100%'}
                                                        }
                                                    }
                                                },
                                                {
                                                    name: 'row1',
                                                    component: 'Col',
                                                    span: '8',
                                                    children: {
                                                        name: 'item3',
                                                        component: 'Form.Item',
                                                        label: '搜索选择框',
                                                        labelCol: { span: 9 },
                                                        wrapperCol: { span: 15 },
                                                        children: {
                                                            name: 'select',
                                                            component: 'Select',
                                                            showSearch: true,
                                                            placeholder: '直接选择或搜索选择',
                                                            value: '{{data.searchSelectedValue}}',
                                                            onChange: "{{function(value){$setField('data.searchSelectedValue', value)}}}",
                                                            filterOption: "{{function(input, option) {return option.props.children.includes(input)}}}",
                                                            children: {
                                                                name: 'option',
                                                                component: 'Select.Option',
                                                                value: "{{data.searchSelectList && data.searchSelectList[_rowIndex].value}}",
                                                                children: '{{data.searchSelectList && data.searchSelectList[_rowIndex].label}}',
                                                                _power: 'for in data.searchSelectList'
                                                            },
                                                            style: {width: '100%'}
                                                        }
                                                    }
                                                },
                                            ]
                                        },
                                        {
                                            name: 'item3',
                                            component: 'Form.Item',
                                            label: '联动选择框',
                                            labelCol: { span: 3 },
                                            wrapperCol: { span: 21 },
                                            children: {
                                                name: 'property',
                                                component: 'Address',
                                                value: { disabled: false },
                                                showDetail: false,
                                                width: 123,
                                                height: 50,
                                                // provinces: '{{data.form.registeredProvincial}}',
                                                // citys: '{{data.form.registeredCity}}',
                                                // districts: '{{data.form.registeredCounty}}',
                                                // text: '{{data.form.registeredAddress}}',
                                                // onChange: "{{function(e) {$setAddress(e)}}}",
                                                getPopupContainer:".ttk-tax72-demo",
                                            }
                                        },
                                        {
                                            name: 'item3',
                                            component: 'Form.Item',
                                            label: '原始复选框',
                                            labelCol: { span: 3 },
                                            wrapperCol: { span: 21 },
                                            children: {
                                                name: 'cgroup',
                                                component: 'Checkbox.Group',
                                                children: [
                                                    {
                                                        name: 'check1',
                                                        component: 'Checkbox',
                                                        value: 'check1',
                                                        children: '写作'
                                                    },
                                                    {
                                                        name: 'check2',
                                                        component: 'Checkbox',
                                                        value: 'check2',
                                                        children: '阅读'
                                                    },
                                                    {
                                                        name: 'check3',
                                                        component: 'Checkbox',
                                                        value: 'check3',
                                                        disabled: true,
                                                        children: '游戏'
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            name: 'item3',
                                            component: 'Form.Item',
                                            label: '开关-默认关',
                                            labelCol: { span: 3 },
                                            wrapperCol: { span: 21 },
                                            children: {
                                                name: 'Switch',
                                                component: 'Switch',
                                                checkedChildren: 'ON',
                                                unCheckedChildren: 'OFF',
                                                defaultChecked: false,
                                            }
                                        },
                                        {
                                            name: 'item3',
                                            component: 'Form.Item',
                                            label: '开关-默认开',
                                            labelCol: { span: 3 },
                                            wrapperCol: { span: 21 },
                                            children: {
                                                name: 'Switch',
                                                component: 'Switch',
                                                checkedChildren: 'ON',
                                                unCheckedChildren: 'OFF',
                                                defaultChecked: true,
                                            }
                                        },
                                        {
                                            name: 'item3',
                                            component: 'Form.Item',
                                            label: '单选框',
                                            labelCol: { span: 3 },
                                            wrapperCol: { span: 21 },
                                            children: {
                                                name: 'cgroup',
                                                component: 'Radio.Group',
                                                defaultValue: 'radio1',
                                                children: [
                                                    {
                                                        name: 'radio1',
                                                        component: 'Radio',
                                                        value: 'radio1',
                                                        children: '男'
                                                    },
                                                    {
                                                        name: 'radio2',
                                                        component: 'Radio',
                                                        value: 'radio2',
                                                        children: '女'
                                                    },
                                                    {
                                                        name: 'radio3',
                                                        component: 'Radio',
                                                        value: 'radio3',
                                                        disabled: true,
                                                        children: '禁用'
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            name: 'item3',
                                            component: 'Form.Item',
                                            label: '普通文本域',
                                            labelCol: { span: 3 },
                                            wrapperCol: { span: 21 },
                                            children: {
                                                name: 'property',
                                                component: 'Input.TextArea',
                                                rows: '4',
                                                placeholder: '请输入内容',
                                            }
                                        },
                                        {
                                            name: 'btn',
                                            component: 'Form.Item',
                                            wrapperCol: { span: 24, offset: 3 },
                                            children: [
                                                { name: 'btn2', component: 'Button', type: 'primary', children : '立即提交', onClick: '{{$handleSubmit}}' },
                                                { name: 'btn1', component: 'Button', children : '重置', onClick: '{{$reset}}' },
                                                { name: 'remark', component: '::p', children: "提交校验及重置仅以'单行输入框'和'验证必填项'为例" }
                                            ]
                                        }
                                    ]
                                },
                                { name: 'header8', component: 'Tax72.Title', style: { margin: '20px 0' }, title: '单项搜索框样式' },
                                { name: 'search', component: 'Input.Search', placeholder: '请输入关键词', enterButton: '搜索', onSearch: '{{function(value) { $onShowSuccessMsg("点击搜索" + value) }}}', style: { width: '250px' } },
                                { name: 'header8', component: 'Tax72.Title', style: { margin: '20px 0' }, title: '模糊搜索' },
                                {
                                    name: 'select',
                                    component: 'Select',
                                    className: 'select-cursor-text',
                                    placeholder: '带搜索的选择框',
                                    showArrow: false,
                                    notFoundContent: null,
                                    filterOption: "{{function(input, option) {return option.props.children.includes(input)}}}",
                                    children: {
                                        name: 'option',
                                        component: 'Select.Option',
                                        value: "{{data.selectList && data.selectList[_rowIndex].value}}",
                                        children: '{{data.selectList && data.selectList[_rowIndex].label}}',
                                        _power: 'for in data.selectList'
                                    },
                                    style: { width: '250px', cursor: 'text' }
                                },
                                { name: 'header9', component: 'Tax72.Title', style: { margin: '20px 0' }, title: 'select菜单' },
                                {
                                    name: 'select',
                                    component: 'Select',
                                    placeholder: '带搜索的选择框',
                                    value: '{{data.selectedValue1}}',
                                    onChange: "{{function(value){$setField('data.selectedValue1', value)}}}",
                                    filterOption: "{{function(input, option) {return option.props.children.includes(input)}}}",
                                    children: {
                                        name: 'option',
                                        component: 'Select.Option',
                                        value: "{{data.selectList && data.selectList[_rowIndex].value}}",
                                        children: '{{data.selectList && data.selectList[_rowIndex].label}}',
                                        _power: 'for in data.selectList'
                                    },
                                    style: { width: '250px' }
                                },
                                { name: 'header10', component: 'Tax72.Title', style: { margin: '20px 0' }, title: 'Label 文字宽度统一' },
                                {
                                    name: 'title',
                                    component: 'Form',
                                    layout: 'horizontal',
                                    children: [
                                        {
                                            name: 'nameItem',
                                            component: 'Form.Item',
                                            label: '名称',
                                            labelAlign: 'right',
                                            style: { margin: '0 10px 0 0' },
                                            children: { name: 'input', component: 'Input' }
                                        },
                                        {
                                            name: 'usernameItem',
                                            component: 'Form.Item',
                                            label: '用户名',
                                            labelAlign: 'right',
                                            style: { margin: '0 10px 0 0' },
                                            children: { name: 'input', component: 'Input' }
                                        },
                                        {
                                            name: 'registerItem',
                                            component: 'Form.Item',
                                            label: '注册时间',
                                            labelAlign: 'right',
                                            style: { margin: '0 10px 0 0' },
                                            children: { name: 'input', component: 'Input' }
                                        },
                                        {
                                            name: 'usernameItem',
                                            component: 'Form.Item',
                                            label: '纳税人税号',
                                            labelAlign: 'right',
                                            style: { margin: '0 10px 0 0' },
                                            children: { name: 'input', component: 'Input' }
                                        },
                                        { name: 'btn', component: 'Button', children : '查询' },
                                    ],
                                },
                            ] },
                            { name: 'content19', component: '::div', _visible: "{{data.selectedKeys.includes('19')}}", children: [
                                { name: 'header11', component: 'Tax72.Title', style: { margin: '20px 0' }, title: 'Tab-选项卡' },
                                {
                                    name: 'tabs',
                                    component: 'Tabs',
                                    activeKey: '{{data.tabKey}}',
                                    onChange: "{{function(value){$setField('data.tabKey', value)}}}",
                                    children: [{
                                        name: 'pane1',
                                        component: 'Tabs.TabPane',
                                        key: 'pane1',
                                        tab: {
                                            name: 'span',
                                            component: '::span',
                                            children: [
                                                '通知公告',
                                                {
                                                    name: 'Badge',
                                                    component: 'Badge',
                                                    count: '6'
                                                }
                                            ]
                                        },
                                        children: '通知公告'
                                    }, {
                                        name: 'pane2',
                                        component: 'Tabs.TabPane',
                                        key: 'pane2',
                                        tab: '风险预警',
                                        children: '风险预警'
                                    }, {
                                        name: 'pane3',
                                        component: 'Tabs.TabPane',
                                        key: 'pane3',
                                        tab: '权限分配',
                                        children: '权限分配'
                                    }, {
                                        name: 'pane4',
                                        component: 'Tabs.TabPane',
                                        key: 'pane4',
                                        tab: '纳税管理',
                                        children: '纳税管理'
                                    }, {
                                        name: 'pane5',
                                        component: 'Tabs.TabPane',
                                        key: 'pane5',
                                        tab: '发票管理',
                                        children: '发票管理'
                                    }]
                                },
                                { name: 'header12', component: 'Tax72.Title', style: { margin: '20px 0' }, title: 'Tab-换行Tab标签' },
                                {
                                    name: 'radioGroup',
                                    component: 'Radio.Group',
                                    defaultValue: 'radioBtn1',
                                    onChange: "{{function(e){$setField('data.btnTabValue', e.target.value)}}}",
                                    children: {
                                        name: 'btns',
                                        component: 'Radio.Button',
                                        value: '{{data.btnTabsList && data.btnTabsList[_rowIndex].value}}',
                                        children: '{{data.btnTabsList && data.btnTabsList[_rowIndex].label}}',
                                        _power: 'for in data.btnTabsList'
                                    }
                                },
                                { 
                                    name: 'btnTabsContent',
                                    component: '::div',
                                    children: {
                                        name: 'content',
                                        component: '::div',
                                        _visible: '{{data.btnTabValue === data.btnTabsList[_rowIndex].value}}',
                                        children: '{{data.btnTabsList && data.btnTabsList[_rowIndex].label}}',
                                        _power: 'for in data.btnTabsList'
                                    }
                                },
                                { name: 'header13', component: 'Tax72.Title', style: { margin: '20px 0' }, title: 'Tab-纵向' },
                                {
                                    name: 'tabs',
                                    component: 'Tabs',
                                    tabPosition: 'left',
                                    style: { height: '380px' },
                                    activeKey: '{{data.leftTabValue}}',
                                    onChange: "{{function(value){$setField('data.leftTabValue', value)}}}",
                                    children: {
                                        name: 'btns',
                                        component: 'Tabs.TabPane',
                                        key: '{{data.leftTabsList && data.leftTabsList[_rowIndex].value}}',
                                        value: '{{data.leftTabsList && data.leftTabsList[_rowIndex].value}}',
                                        tab: '{{data.leftTabsList && data.leftTabsList[_rowIndex].label}}',
                                        children: { name: 'content', component: 'Tax72.Reminder', title: '办理须知', children: '{{data.leftTabsList && data.leftTabsList[_rowIndex].label}}', style: { height: '100%' } },
                                        _power: 'for in data.leftTabsList'
                                    }
                                },
                            ] },
                            { name: 'content20', component: '::div', _visible: "{{data.selectedKeys.includes('20')}}", children: [
                                { name: 'header14', component: 'Tax72.Title', style: { marginBottom: '20px' }, title: 'Breadcrumb-面包屑' },
                                {
                                    name: 'breadcrumb',
                                    component: 'Breadcrumb',
                                    separator: '',
                                    children: [
                                        {
                                            name: 'breadcrumbItem1',
                                            component: 'Breadcrumb.Item',
                                            href: '',
                                            children: [
                                                { name: 'icon', component: '::i', class: "fsicon fsicon-breadcrumb" },
                                                '首页'
                                            ]
                                        },
                                        { name: 'breadcrumbItem2', component: 'Breadcrumb.Item', href: '', children: '办税服务' },
                                        { name: 'breadcrumbItem2', component: 'Breadcrumb.Item', href: '', children: '通知公告' },
                                        { name: 'breadcrumbItem2', component: 'Breadcrumb.Item', children: '税务系统数字证书格式标准' },
                                    ]
                                },
                            ] },
                            { name: 'content21', component: '::div', _visible: "{{data.selectedKeys.includes('21')}}", children: [
                                { name: 'header15', component: 'Tax72.Title', style: { marginBottom: '20px' }, title: '表格DataGrid——性能好，数据量较大时使用' },
                                {
                                    name: 'table',
                                    component: 'DataGrid',
                                    headerHeight: 37,
                                    rowsCount: '{{data.tableList.length}}',
                                    rowHeight: 35,
                                    readonly: false,
                                    enableSequence: false,
                                    enableAddDelrow: false,
                                    startSequence: 1,
                                    // style: { height: '100%' },
                                    style: { height: "{{(data.tableList.length * 35 + 37 + 1) + 'px'}}" },
                                    columns: [{
                                        name: 'key',
                                        component: 'DataGrid.Column',
                                        columnKey: 'key',
                                        flexGrow: 1,
                                        width: 50,
                                        header: {
                                            name: 'header',
                                            component: 'DataGrid.Cell',
                                            children: '序号'
                                        },
                                        cell: {
                                            name: 'cell',
                                            component: "DataGrid.TextCell",
                                            value: "{{data.tableList[_rowIndex].key}}",
                                            _power: '({rowIndex})=>rowIndex',
                                        }
                                    },{
                                        name: 'type',
                                        component: 'DataGrid.Column',
                                        columnKey: 'type',
                                        flexGrow: 1,
                                        width: 110,
                                        header: {
                                            name: 'header',
                                            component: 'DataGrid.Cell',
                                            children: '业务域'
                                        },
                                        cell: {
                                            name: 'cell',
                                            component: "DataGrid.TextCell",
                                            value: "{{data.tableList[_rowIndex].type}}",
                                            _power: '({rowIndex})=>rowIndex',
                                        }
                                    }, {
                                        name: 'name',
                                        component: 'DataGrid.Column',
                                        columnKey: 'name',
                                        flexGrow: 1,
                                        width: 500,
                                        header: {
                                            name: 'header',
                                            component: 'DataGrid.Cell',
                                            children: '事项名称'
                                        },
                                        cell: {
                                            name: 'cell',
                                            component: "DataGrid.TextCell",
                                            value: "{{data.tableList[_rowIndex].name}}",
                                            _power: '({rowIndex})=>rowIndex',
                                        }
                                    },{
                                        name: 'state',
                                        component: 'DataGrid.Column',
                                        columnKey: 'state',
                                        flexGrow: 1,
                                        width: 401,
                                        header: {
                                            name: 'header',
                                            component: 'DataGrid.Cell',
                                            children: '办理状态'
                                        },
                                        cell: {
                                            name: 'cell',
                                            component: "DataGrid.TextCell",
                                            value: "{{data.tableList[_rowIndex].state}}",
                                            _power: '({rowIndex})=>rowIndex',
                                        }
                                    }]
                                },
                                { name: 'header16', component: 'Tax72.Title', style: { margin: '20px 0' }, title: '表格Table——功能较多，性能比DataGrid弱' },
                                { name: 'table2', component: '::div', style: { height: 'auto', padding: '10px' }, children: {
                                    name: 'table2',
                                    component: 'Table',
                                    bordered: true,
                                    pagination: {
                                        showSizeChanger: true,
                                        showQuickJumper: { goButton: { name: 'btn1', component: 'Button', children : '确定' } },
                                        showTotal: "{{function(total){ return '共' + total + '条'; }}}",
                                    },
                                    rowSelection: { hideDefaultSelections: true },
                                    columns: [
                                        {
                                            title: '应征凭证序号',
                                            dataIndex: 'num',
                                            width: '25%',
                                            align: 'center',
                                            key: 'num',
                                        }, {
                                            title: '税(费)种',
                                            dataIndex: 'type',
                                            width: '25%',
                                            key: 'type',
                                        },{
                                            title: '申报期限',
                                            dataIndex: 'deadline',
                                            width: '10%',
                                            align: 'center',
                                            key: 'deadline',
                                        },{
                                            title: '申报日期',
                                            dataIndex: 'applyDate',
                                            width: '10%',
                                            align: 'center',
                                            key: 'applyDate',
                                        },{
                                            title: '总额',
                                            dataIndex: 'amount',
                                            width: '30%',
                                            align: 'right',
                                            key: 'amount',
                                        },
                            
                                    ],
                                    dataSource: '{{data.tableList2}}'
                                } },
                            ] },
                            { name: 'content22', component: '::div', _visible: "{{data.selectedKeys.includes('22')}}", children: [
                                { name: 'header17', component: 'Tax72.Title', style: { marginBottom: '20px' }, title: '弹出窗口' },
                                {
                                    name: 'title',
                                    component: '::div',
                                    children: [
                                        { name: 'btn1', component: 'Button', children : '无按钮窗口', onClick: '{{$showModal}}' },
                                        { name: 'btn2', component: 'Button', children : '确定、取消按钮窗口', onClick: '{{$showModalWithBtn}}' },
                                        { name: 'btn2', component: 'Button', children : '其他按钮窗口', onClick: '{{$showModalWithOtherBtn}}' },
                                    ],
                                },
                            ] },
                            { name: 'content23', component: '::div', _visible: "{{data.selectedKeys.includes('23')}}", children: [
                                { name: 'header23-1', component: 'Tax72.Title', style: { marginBottom: '20px' }, title: '常规用法' },
                                {
                                    name: 'row1',
                                    component: 'Row',
                                    children: [
                                        {
                                            name: 'col1',
                                            component: 'Col',
                                            span: '8',
                                            children: {
                                                name: 'col1item',
                                                component: 'Form.Item',
                                                label: '中文版',
                                                labelCol: { span: 9 },
                                                wrapperCol: { span: 15 },
                                                children: {
                                                    name: 'date1',
                                                    component: 'DatePicker',
                                                    placeholder: 'YY-MM-DD',
                                                    value: "{{$stringToMoment(data.date.day)}}",
                                                    onChange: "{{function(date, dateString){$setField('data.date.day', dateString)}}}",
                                                }
                                            }
                                        },
                                        {
                                            name: 'col2',
                                            component: 'Col',
                                            span: '8',
                                            children: {
                                                name: 'col2item',
                                                component: 'Form.Item',
                                                label: '国际版',
                                                labelCol: { span: 9 },
                                                wrapperCol: { span: 15 },
                                                children: '通过全局配置ConfigProvider实现',
                                            }
                                        }
                                    ]
                                },
                                { name: 'header23-2', component: 'Tax72.Title', style: { margin: '20px 0' }, title: '其它选择器' },
                                {
                                    name: 'row2',
                                    component: 'Row',
                                    children: [
                                        {
                                            name: 'col1',
                                            component: 'Col',
                                            span: '8',
                                            children: {
                                                name: 'col1item',
                                                component: 'Form.Item',
                                                label: '年选择器',
                                                labelCol: { span: 9 },
                                                wrapperCol: { span: 15 },
                                                children: {
                                                    name: 'date1',
                                                    component: 'DatePicker.YearPicker',
                                                    placeholder: 'YYYY',
                                                    style: { width: '100%' },
                                                    value: "{{$stringToMoment(data.date.year)}}",
                                                    onChange: "{{function(date, dateString){$setField('data.date.year', dateString)}}}",
                                                }
                                            }
                                        },
                                        {
                                            name: 'col2',
                                            component: 'Col',
                                            span: '8',
                                            children: {
                                                name: 'col2item',
                                                component: 'Form.Item',
                                                label: '年月选择器',
                                                labelCol: { span: 9 },
                                                wrapperCol: { span: 15 },
                                                children: {
                                                    name: 'date1',
                                                    component: 'DatePicker.MonthPicker',
                                                    placeholder: 'YYYY-MM',
                                                    style: { width: '100%' },
                                                    value: "{{$stringToMoment(data.date.month)}}",
                                                    onChange: "{{function(date, dateString){$setField('data.date.month', dateString)}}}",
                                                }
                                            }
                                        },
                                        {
                                            name: 'col3',
                                            component: 'Col',
                                            span: '8',
                                            children: {
                                                name: 'col3item',
                                                component: 'Form.Item',
                                                label: '时间选择器',
                                                labelCol: { span: 9 },
                                                wrapperCol: { span: 15 },
                                                children: {
                                                    name: 'date1',
                                                    component: 'DatePicker.TimerPicker',
                                                    mode: 'time',
                                                    showTime: true,
                                                    format: 'HH:mm:ss',
                                                    placeholder: 'HH:mm:ss',
                                                    value: "{{data.date.time}}",
                                                    onChange: "{{function(date, dateString){$setField('data.date.time', dateString)}}}",
                                                }
                                            }
                                        },
                                        {
                                            name: 'col4',
                                            component: 'Col',
                                            span: '8',
                                            children: {
                                                name: 'col4item',
                                                component: 'Form.Item',
                                                label: '日期时间选择器',
                                                labelCol: { span: 9 },
                                                wrapperCol: { span: 15 },
                                                children: {
                                                    name: 'date1',
                                                    component: 'DatePicker',
                                                    showTime: true,
                                                    format: 'YYYY-MM-DD HH:mm:ss',
                                                    placeholder: 'YYYY-MM-DD HH:mm:ss',
                                                    value: "{{$stringToMoment(data.date.daytime)}}",
                                                    onChange: "{{function(date, dateString){$setField('data.date.daytime', dateString)}}}",
                                                }
                                            }
                                        },
                                    ]
                                },
                                { name: 'header23-3', component: 'Tax72.Title', style: { margin: '20px 0' }, title: '范围选择' },
                                {
                                    name: 'row3',
                                    component: 'Row',
                                    children: [
                                        {
                                            name: 'col1',
                                            component: 'Col',
                                            span: '8',
                                            children: {
                                                name: 'col1item',
                                                component: 'Form.Item',
                                                label: '日期范围',
                                                labelCol: { span: 9 },
                                                wrapperCol: { span: 15 },
                                                children: {
                                                    name: 'range',
                                                    component: 'DatePicker.RangePicker',
                                                    value: "{{[$stringToMoment(data.date.range.day[0]), $stringToMoment(data.date.range.day[1])]}}",
                                                    onChange: "{{function(date, dateString){$setField('data.date.range.day', dateString)}}}"
                                                }
                                            }
                                        },
                                        {
                                            name: 'col2',
                                            component: 'Col',
                                            span: '8',
                                            children: {
                                                name: 'col2item',
                                                component: 'Form.Item',
                                                label: '年范围',
                                                labelCol: { span: 9 },
                                                wrapperCol: { span: 15 },
                                                children: {
                                                    name: 'range',
                                                    component: 'DatePicker.YearRangePicker',
                                                    style: { width: '100%' },
                                                    value: "{{[$stringToMoment(data.date.range.year[0]), $stringToMoment(data.date.range.year[1])]}}",
                                                    onChange: "{{function(date, dateString){$setField('data.date.range.year', dateString)}}}"
                                                }
                                            }
                                        },
                                        {
                                            name: 'col3',
                                            component: 'Col',
                                            span: '8',
                                            children: {
                                                name: 'col3item',
                                                component: 'Form.Item',
                                                label: '年月范围',
                                                labelCol: { span: 9 },
                                                wrapperCol: { span: 15 },
                                                children: {
                                                    name: 'range',
                                                    component: 'DatePicker.MonthRangePicker',
                                                    style: { width: '100%' },
                                                    value: "{{[$stringToMoment(data.date.range.month[0]), $stringToMoment(data.date.range.month[1])]}}",
                                                    onChange: "{{function(date, dateString){$setField('data.date.range.month', dateString)}}}"
                                                }
                                            }
                                        },
                                        {
                                            name: 'col4',
                                            component: 'Col',
                                            span: '8',
                                            children: {
                                                name: 'col3item',
                                                component: 'Form.Item',
                                                label: '时间范围',
                                                labelCol: { span: 9 },
                                                wrapperCol: { span: 15 },
                                                children: {
                                                    name: 'range',
                                                    component: 'DatePicker.TimerRangePicker',
                                                    value: "{{data.date.range.time}}",
                                                    onChange: "{{function(date, dateString){$setField('data.date.range.time', dateString)}}}",
                                                    style: { width: '100%' },
                                                }
                                            }
                                        },
                                        {
                                            name: 'col4',
                                            component: 'Col',
                                            span: '16',
                                            children: {
                                                name: 'col3item',
                                                component: 'Form.Item',
                                                label: '日期时间范围',
                                                labelCol: { span: 5 },
                                                wrapperCol: { span: 19 },
                                                children: {
                                                    name: 'range',
                                                    component: 'DatePicker.RangePicker',
                                                    showTime: true,
                                                    format: 'YYYY-MM-DD HH:mm:ss',
                                                    style: { width: '100%' },
                                                    value: "{{[$stringToMoment(data.date.range.daytime[0]), $stringToMoment(data.date.range.daytime[1])]}}",
                                                    onChange: "{{function(date, dateString){$setField('data.date.range.daytime', dateString)}}}",
                                                }
                                            }
                                        },
                                    ]
                                },
                                { name: 'header23-4', component: 'Tax72.Title', style: { margin: '20px 0' }, title: '日期格式、限制选择日期等通过设置属性props实现，参考antd DatePicker文档' },
                            ] },
                            { name: 'content24', component: '::div', _visible: "{{data.selectedKeys.includes('24')}}", children: '见本页面左侧菜单' },
                            { name: 'content25', component: '::div', _visible: "{{data.selectedKeys.includes('25')}}", children: [
                                { name: 'btn1', component: 'Button', loading: false, children : 'loading加载', onClick: '{{$showLoadingMask}}' },
                            ] },
                        ]
                    },
                ]
            },
        ]
	}
}

export function getInitState() {
	return {
		data: {
            filterList: [],
            selectList: [
                { value: '1', label: '广州市越秀区税务局办税服务厅' },
                { value: '2', label: '广州市越秀区东风西路办税服务厅' },
                { value: '3', label: '广州市越秀区五羊新城办税服务厅' },
                { value: '4', label: '广州市越秀区交易广场办税服务厅' },
                { value: '5', label: '广州市天河区岗顶办税服务厅' },
                { value: '6', label: '广州市天河区东圃办税服务厅' },
                { value: '7', label: '广州市增城区永宁办税服务厅' },
                { value: '8', label: '广州市黄埔区科学城办税服务厅' },
                { value: '9', label: '广州市白云区黄石办税服务厅' },
                { value: '10', label: '广州市荔湾区办税服务厅' },
                { value: '11', label: '广州市番禺区办税服务厅' },
                { value: '12', label: '广州火车站' },
                { value: '13', label: '广州市人民政府' },
                { value: '14', label: '广州市番禺区帝景花园' },
                { value: '15', label: '广州市南沙区办税服务厅' },
            ],
            selectedValue: '',
            tabKey: 'pane1',
            btnTabsList: [
                { value: 'radioBtn1', label: '逾期未申报' },
                { value: 'radioBtn2', label: '申报信息' },
                { value: 'radioBtn3', label: '核定信息' },
                { value: 'radioBtn4', label: '未缴税款' },
                { value: 'radioBtn5', label: '已缴税款' },
                { value: 'radioBtn6', label: '退抵税（费）' },
                { value: 'radioBtn7', label: '预缴税款' },
                { value: 'radioBtn8', label: '税收减免审批' },
            ],
            leftTabValue: 'radioBtn1',
            leftTabsList: [
                { value: 'leftTab1', label: '税务证件挂失' },
                { value: 'leftTab2', label: '证件增补发' },
                { value: 'leftTab3', label: '非正常解除' },
                { value: 'leftTab4', label: '企业所得税汇总纳税企业总分机构信息备案' },
                { value: 'leftTab5', label: '变更登记' },
                { value: 'leftTab6', label: '财务会计制度及核算软件备案报告' },
                { value: 'leftTab7', label: '增值税一般纳税人资格登记' },
                { value: 'leftTab8', label: '开具《外出经营活动税收管理证明》' },
                { value: 'leftTab9', label: '开具《外出经营活动税收管理证明》' },
                { value: 'leftTab10', label: '开具《外出经营活动税收管理证明》' },
                { value: 'leftTab11', label: '开具《外出经营活动税收管理证明》' },
                { value: 'leftTab12', label: '开具《外出经营活动税收管理证明》' },
                { value: 'leftTab13', label: '开具《外出经营活动税收管理证明》' },
                { value: 'leftTab14', label: '开具《外出经营活动税收管理证明》' },
            ],
            leftTabValue: 'leftTab1',
            tableList: [
                { key: '1', type: '发票', name: '增值税税控系统专用设备初始发行', state: '资料已提交，待受理（可修改' },
                { key: '2', type: '发票', name: '中国清洁发展机制基金取得的收入免征企业所得税', state: '办理成功（已查阅）' },
                { key: '3', type: '发票', name: '国债利息收入免征企业所得税', state: '资料已提交，待受理' },
                { key: '4', type: '发票', name: '国际金融组织利息免征企业所得税', state: '资料已提交，待受理（可修改）' },
                { key: '5', type: '发票', name: '外国政府利息免征企业所得税', state: '资料已提交，待受理（可修改）' },
            ],
            tableList2 : [
                { num: '10015215000000158186', type: '个人所得税', deadline: '2018-03-01', applyDate: '2018-03-01', amount: '141.03' },
                { num: '10015215000000158186', type: '个人所得税', deadline: '2018-03-01', applyDate: '2018-03-01', amount: '141.03' },
                { num: '10015215000000158186', type: '个人所得税', deadline: '2018-03-01', applyDate: '2018-03-01', amount: '141.03' },
                { num: '10015215000000158186', type: '个人所得税', deadline: '2018-03-01', applyDate: '2018-03-01', amount: '141.03' },
                { num: '10015215000000158186', type: '个人所得税', deadline: '2018-03-01', applyDate: '2018-03-01', amount: '141.03' },
                { num: '10015215000000158186', type: '个人所得税', deadline: '2018-03-01', applyDate: '2018-03-01', amount: '141.03' },
                { num: '10015215000000158186', type: '个人所得税', deadline: '2018-03-01', applyDate: '2018-03-01', amount: '141.03' },
                { num: '10015215000000158186', type: '个人所得税', deadline: '2018-03-01', applyDate: '2018-03-01', amount: '141.03' },
                { num: '10015215000000158186', type: '个人所得税', deadline: '2018-03-01', applyDate: '2018-03-01', amount: '141.03' },
                { num: '10015215000000158186', type: '个人所得税', deadline: '2018-03-01', applyDate: '2018-03-01', amount: '141.03' },
                { num: '10015215000000158186', type: '个人所得税', deadline: '2018-03-01', applyDate: '2018-03-01', amount: '141.03' },
                { num: '10015215000000158186', type: '个人所得税', deadline: '2018-03-01', applyDate: '2018-03-01', amount: '141.03' },
                { num: '10015215000000158186', type: '个人所得税', deadline: '2018-03-01', applyDate: '2018-03-01', amount: '141.03' },
                { num: '10015215000000158186', type: '个人所得税', deadline: '2018-03-01', applyDate: '2018-03-01', amount: '141.03' },
                { num: '10015215000000158186', type: '个人所得税', deadline: '2018-03-01', applyDate: '2018-03-01', amount: '141.03' },
                { num: '10015215000000158186', type: '个人所得税', deadline: '2018-03-01', applyDate: '2018-03-01', amount: '141.03' },
                { num: '10015215000000158186', type: '个人所得税', deadline: '2018-03-01', applyDate: '2018-03-01', amount: '141.03' },
                { num: '10015215000000158186', type: '个人所得税', deadline: '2018-03-01', applyDate: '2018-03-01', amount: '141.03' },
            ],
            userInfo: {
                userName: '方欣科技有限公司乌鲁木齐分公司广西壮族自治区南宁市西城区东塔办事处',
                hasLogin: false,
            },
            selectedKeys: [ '11' ],
            logoList: [
                'bj',
                'dl',
                'fj',
                'gd',
                'gs',
                'gz',
                'qd',
                'qh',
                'sc',
                'sd',
                'sh',
                'sx',
                'yn',
            ],
            pngList: Object.keys(Tax72.Png.IconList).map(key => (Tax72.Png.IconList[key])),
            fontList: [
                { name: '刷新', type: 'refresh' },
                { name: '下箭头', type: 'xiajiantou' },
                { name: '切换角色', type: 'qiehuanjiaose' },
                { name: '正确', type: 'finish' },
                { name: '选择', type: 'xuanze' },
                { name: '地图 坐标 定位 放大', type: 'Coordinate' },
                { name: '返回', type: 'fanhui' },
                { name: '禁止', type: 'prohibit' },
                { name: '地图', type: 'map' },
                { name: '定位 位置', type: 'breadcrumb' },
                { name: 'arrow-bar', type: 'arrow-bar' },
                { name: 'arrow-down', type: 'arrow-down' },
                { name: 'arrow-vertical', type: 'arrow-vertical' },
                { name: 'arrow-left', type: 'arrow-left' },
                { name: 'arrow-save', type: 'arrow-save' },
                { name: 'arrow-up', type: 'arrow-up' },
                { name: 'bangzhu', type: 'bangzhu' },
                { name: 'banshuidaohang', type: 'banshuidaohang' },
                { name: 'banshuidengdairenshu', type: 'banshuidengdairenshu' },
                { name: 'banshuiyuyue', type: 'banshuiyuyue' },
                { name: 'banshuirili', type: 'banshuirili' },
                { name: 'banshuiditu', type: 'banshuiditu' },
                { name: 'banshuizhinan', type: 'banshuizhinan' },
                { name: 'banshuizhuanti', type: 'banshuizhuanti' },
                { name: 'bianji', type: 'bianji' },
                { name: 'btn-add', type: 'btn-add' },
                { name: 'bofang', type: 'bofang' },
                { name: 'biaozhengdanshu', type: 'biaozhengdanshu' },
                { name: 'btn-checkbox', type: 'btn-checkbox' },
                { name: 'btn-check', type: 'btn-check' },
                { name: 'btn-copy', type: 'btn-copy' },
                { name: 'btn-del', type: 'btn-del' },
                { name: 'btn-collection', type: 'btn-collection' },
                { name: 'btn-drag', type: 'btn-drag' },
                { name: 'btn-edit', type: 'btn-edit' },
                { name: 'btn-export', type: 'btn-export' },
                { name: 'btn-number', type: 'btn-number' },
                { name: 'btn-invalidation', type: 'btn-invalidation' },
                { name: 'btn-pay', type: 'btn-pay' },
                { name: 'btn-print', type: 'btn-print' },
                { name: 'btn-radio', type: 'btn-radio' },
                { name: 'btn-refresh', type: 'btn-refresh' },
                { name: 'btn-review', type: 'btn-review' },
                { name: 'btn-save', type: 'btn-save' },
                { name: 'btn-set', type: 'btn-set' },
                { name: 'btn-Sync', type: 'btn-Sync' },
                { name: 'btn-tracking', type: 'btn-tracking' },
                { name: 'btn-table', type: 'btn-table' },
                { name: 'changjingfuwu', type: 'changjingfuwu' },
                { name: 'caiyixia', type: 'caiyixia' },
                { name: 'chaxun', type: 'chaxun' },
                { name: 'close', type: 'close' },
                { name: 'cuowu', type: 'cuowu' },
                { name: 'chukoutuishuishenbao', type: 'chukoutuishuishenbao' },
                { name: 'dacha1', type: 'dacha1' },
                { name: 'dagou1', type: 'dagou1' },
                { name: 'dianhua', type: 'dianhua' },
                { name: 'diannao', type: 'diannao' },
                { name: 'dianshi', type: 'dianshi' },
                { name: 'dianzixinxixiazai', type: 'dianzixinxixiazai' },
                { name: 'dianziziliaoguanli', type: 'dianziziliaoguanli' },
                { name: 'dianzan', type: 'dianzan' },
                { name: 'dishui', type: 'dishui' },
                { name: 'dongtaimima', type: 'dongtaimima' },
                { name: 'duihua', type: 'duihua' },
                { name: 'fanhuidingbu', type: 'fanhuidingbu' },
                { name: 'erweima', type: 'erweima' },
                { name: 'fapiaochayan', type: 'fapiaochayan' },
                { name: 'fapiaodaikai', type: 'fapiaodaikai' },
                { name: 'fapiaofuwu', type: 'fapiaofuwu' },
                { name: 'fapiaolingyong', type: 'fapiaolingyong' },
                { name: 'fapiaorenzheng', type: 'fapiaorenzheng' },
                { name: 'fapiaoyanjiu', type: 'fapiaoyanjiu' },
                { name: 'fenxiang', type: 'fenxiang' },
                { name: 'fuwutousu', type: 'fuwutousu' },
                { name: 'gengduo', type: 'gengduo' },
                { name: 'gengduo1', type: 'gengduo1' },
                { name: 'gengduo2', type: 'gengduo2' },
                { name: 'gengduo3', type: 'gengduo3' },
                { name: 'gerensuodeshuidaikou', type: 'gerensuodeshuidaikoudaijiaoshenbao' },
                { name: 'gongzhongchaxun', type: 'gongzhongchaxun' },
                { name: 'guanbi', type: 'guanbi' },
                { name: 'guangdongfabao', type: 'guangdongfabao' },
                { name: 'guanmingfapiaoyinzhi', type: 'guanmingfapiaoyinzhi' },
                { name: 'haiguanjihe', type: 'haiguanjihe' },
                { name: 'guoshui', type: 'guoshui' },
                { name: 'guiyuanji', type: 'guiyuanji' },
                { name: 'header-search', type: 'header-search' },
                { name: 'help', type: 'help' },
                { name: 'header-user', type: 'header-user' },
                { name: 'huanfu', type: 'huanfu' },
                { name: 'icon-test9', type: 'icon-test9' },
                { name: 'home', type: 'home' },
                { name: 'huanyuan', type: 'huanyuan' },
                { name: 'icon-test10', type: 'icon-test10' },
                { name: 'icon-test12', type: 'icon-test12' },
                { name: 'icon-test11', type: 'icon-test11' },
                { name: 'icon-test13', type: 'icon-test13' },
                { name: 'icon-test14', type: 'icon-test14' },
                { name: 'icon-test15', type: 'icon-test15' },
                { name: 'icon-test17', type: 'icon-test17' },
                { name: 'jiahao', type: 'jiahao' },
                { name: 'jianhao', type: 'jianhao' },
                { name: 'icon-test16', type: 'icon-test16' },
                { name: 'jiaokuanchaxunjidayi', type: 'jiaokuanchaxunjidayin' },
                { name: 'liebiao', type: 'liebiao' },
                { name: 'liebiao1', type: 'liebiao1' },
                { name: 'mima', type: 'mima' },
                { name: 'nashuijisuanqi', type: 'nashuijisuanqi' },
                { name: 'notice-info', type: 'notice-info' },
                { name: 'manyidutiaocha', type: 'manyidutiaocha' },
                { name: 'notice-primary', type: 'notice-primary' },
                { name: 'notice-warning', type: 'notice-warning' },
                { name: 'pingban', type: 'pingban' },
                { name: 'qingjiaoshuikuan', type: 'qingjiaoshuikuan' },
                { name: 'QQ', type: 'QQ' },
                { name: 'redianwenti', type: 'redianwenti' },
                { name: 'Set-arrow', type: 'Set-arrow' },
                { name: 'saoyisao', type: 'saoyisao' },
                { name: 'shangchuan', type: 'shangchuan' },
                { name: 'shanchu', type: 'shanchu' },
                { name: 'shebaofeiguanli', type: 'shebaofeiguanli' },
                { name: 'shenbaoqingdan', type: 'shenbaoqingdan' },
                { name: 'shenbaochaxunjidayin', type: 'shenbaochaxunjidayin' },
                { name: 'shenbaoqingkuangchax', type: 'shenbaoqingkuangchaxun' },
                { name: 'shenbaozuofei', type: 'shenbaozuofei' },
                { name: 'sheshuishixiangbanli', type: 'sheshuishixiangbanli' },
                { name: 'shenpi_faqishenpi', type: 'shenpi_faqishenpi' },
                { name: 'sheshuiweifajubao', type: 'sheshuiweifajubao' },
                { name: 'sheshuiwenshuchayan', type: 'sheshuiwenshuchayan' },
                { name: 'shezhi', type: 'shezhi' },
                { name: 'shipin', type: 'shipin' },
                { name: 'shouji', type: 'shouji' },
                { name: 'shixiangjinduguanli', type: 'shixiangjinduguanli' },
                { name: 'shoucang', type: 'shoucang' },
                { name: 'shouqicaidan', type: 'shouqicaidan' },
                { name: 'shouli', type: 'shouli' },
                { name: 'shuaxin', type: 'shuaxin' },
                { name: 'shuaxin3', type: 'shuaxin3' },
                { name: 'shuihui', type: 'shuihui' },
                { name: 'shuiwuxuetang', type: 'shuiwuxuetang' },
                { name: 'shuiwubaidu', type: 'shuiwubaidu' },
                { name: 'shousuo-copy', type: 'shousuo-copy' },
                { name: 'shujuku', type: 'shujuku' },
                { name: 'tanhao', type: 'tanhao' },
                { name: 'title-arrow', type: 'title-arrow' },
                { name: 'tarenfasong', type: 'tarenfasong' },
                { name: 'tixing', type: 'tixing' },
                { name: 'tongzhigonggao', type: 'tongzhigonggao' },
                { name: 'tree-dot', type: 'tree-dot' },
                { name: 'tuichu', type: 'tuichu' },
                { name: 'tupian', type: 'tupian' },
                { name: 'weibo', type: 'weibo' },
                { name: 'weixin', type: 'weixin' },
                { name: 'wenjian', type: 'wenjian' },
                { name: 'wodedaiban', type: 'wodedaiban' },
                { name: 'wodefasong', type: 'wodefasong' },
                { name: 'wodetongzhi', type: 'wodetongzhi' },
                { name: 'xiangshang', type: 'xiangshang' },
                { name: 'wodetixing', type: 'wodetixing' },
                { name: 'xiangxia', type: 'xiangxia' },
                { name: 'xiangyou', type: 'xiangyou' },
                { name: 'xiangzuo', type: 'xiangzuo' },
                { name: 'xiaoxi', type: 'xiaoxi' },
                { name: 'xiazai', type: 'xiazai' },
                { name: 'xiazaizhuanqu', type: 'xiazaizhuanqu' },
                { name: 'xinjian', type: 'xinjian' },
                { name: 'xinyongdengjichaxun', type: 'xinyongdengjichaxun' },
                { name: 'xinyongdengjichayan', type: 'xinyongdengjichayan' },
                { name: 'yanzhengma', type: 'yanzhengma' },
                { name: 'yihushichaxun', type: 'yihushichaxun' },
                { name: 'youjian', type: 'youjian' },
                { name: 'yuandian', type: 'yuandian' },
                { name: 'yinshuihudongpingtai', type: 'yinshuihudongpingtai' },
                { name: 'yuandianxiao', type: 'yuandianxiao' },
                { name: 'yuyue', type: 'yuyue' },
                { name: 'yuyue1', type: 'yuyue1' },
                { name: 'zaixianfangtan', type: 'zaixianfangtan' },
                { name: 'zaixianzixun', type: 'zaixianzixun' },
                { name: 'zanting', type: 'zanting' },
                { name: 'zengzhishuiyujiaoshe', type: 'zengzhishuiyujiaoshenbaojinduchaxun' },
                { name: 'zhanghu', type: 'zhanghu' },
                { name: 'zhankaicaidan', type: 'zhankaicaidan' },
                { name: 'zhengcefagui', type: 'zhengcefagui' },
                { name: 'zhengque', type: 'zhengque' },
                { name: 'zhinan', type: 'zhinan' },
                { name: 'zhishiku', type: 'zhishiku' },
                { name: 'zhuye', type: 'zhuye' },
                { name: 'zuanshi', type: 'zuanshi' },
                { name: 'zuixiaohua', type: 'zuixiaohua' },
                { name: 'zuidahua', type: 'zuidahua' },
                { name: 'caidan', type: 'caidan' },
                { name: 'default', type: 'default' },
                { name: 'arrow-right', type: 'arrow-right' },
                { name: '解绑纳税人', type: 'jiebangnashuiren' },
                { name: '注销', type: 'zhuxiao' },
                { name: '绑定纳税人', type: 'bangdingnashuiren' },
                { name: '修改绑定手机', type: 'xiugaibangdingshouji' },
                { name: '退出', type: 'tuichu1' },
                { name: '引导', type: 'yindao' },
                { name: '下箭头', type: 'dot-up' },
            ],
            searchSelectList: [
                { value: 'default', label: '直接选择或搜索选择' },
                { value: 'layer', label: 'layer' },
                { value: 'form', label: 'form' },
                { value: 'layim', label: 'layim' },
                { value: 'element', label: 'element' },
                { value: 'laytpl', label: 'laytpl' },
                { value: 'upload', label: 'upload' },
                { value: 'laydate', label: 'laydate' },
                { value: 'laypage', label: 'laypage' },
                { value: 'flow', label: 'flow' },
                { value: 'util', label: 'util' },
                { value: 'code', label: 'code' },
                { value: 'tree', label: 'tree' },
                { value: 'layedit', label: 'layedit' },
                { value: 'nav', label: 'nav' },
                { value: 'tab', label: 'tab' },
                { value: 'table', label: 'table' },
                { value: 'select', label: 'select' },
                { value: 'checkbox', label: 'checkbox' },
                { value: 'switch', label: 'switch' },
                { value: 'radio', label: 'radio' },
            ],
            form: {
                name: '',
            },
            other: {
                error: {}
            },
            date: {
                range: {
                    year: [ '2020', '2030' ],
                    month: [ '2021-11', '2033-12'],
                    day: [ '2022-03-14', '2025-06-19' ],
                    daytime: [ '2023-04-25 01:23:45', '2029-05-29 23:59:59' ],
                    time: [ '01:23:45', '23:59:59' ],
                },
                year: '2020',
                month: '2021-11',
                day: '2022-03-14',
                daytime: '2023-04-25 23:59:59',
                time: '23:59:59',
            }
        }
	}
}
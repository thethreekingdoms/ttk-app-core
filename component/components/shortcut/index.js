import React from 'react'
import classNames from 'classnames'
//import '../../assets/style/shortCut.less'

const data = [
    {
        name: 'top',
        classNaem: 'line_top',
        children: [
            {
                key: 'Esc',
                name: '',
                className: 'Esc',
                code: '27'
            }, {
                key: 'F1',
                name: '',
                classNaem: '',
                code: '112 '
            }, {
                key: 'F2',
                name: '',
                classNaem: '',
                code: '113'
            }, {
                key: 'F3',
                name: '',
                classNaem: '',
                code: '114'
            }, {
                key: 'F4',
                name: '',
                classNaem: '',
                code: '115'
            }, {
                key: 'F5',
                name: '',
                classNaem: '',
                code: '116'
            }, {
                key: 'F6',
                name: '',
                classNaem: '',
                code: '117'
            }, {
                key: 'F7',
                name: '',
                classNaem: '',
                code: '118'
            }, {
                key: 'F8',
                name: '',
                classNaem: '',
                code: '119'
            }, {
                key: 'F9',
                name: '',
                classNaem: '',
                code: '120'
            }, {
                key: 'F10',
                name: '',
                classNaem: '',
                code: '121'
            }, {
                key: 'F11',
                name: '',
                classNaem: '',
                code: '122'
            }, {
                key: 'F12',
                name: '',
                classNaem: '',
                code: '123'
            }
        ]
    },
    {
        name: '1',
        className: 'line_1',
        children: [
            {
                key: '`',
                name: '',
                className: '',
                code: '192'
            }, {
                key: '1',
                name: '',
                className: '',
                code: '49'
            }, {
                key: '2',
                name: '',
                className: '',
                code: '50'
            }, {
                key: '3',
                name: '',
                className: '',
                code: '51'
            }, {
                key: '4',
                name: '',
                className: '',
                code: '52'
            }, {
                key: '5',
                name: '',
                className: '',
                code: '53'
            }, {
                key: '6',
                name: '',
                className: '',
                code: '54'
            }, {
                key: '7',
                name: '',
                className: '',
                code: '55'
            }, {
                key: '8',
                name: '',
                className: '',
                code: '56'
            }, {
                key: '9',
                name: '',
                className: '',
                code: '57'
            }, {
                key: '0',
                name: '',
                className: '',
                code: '48'
            }, {
                key: '-',
                name: '',
                className: '',
                code: '189'
            }, {
                key: '=',
                name: '=',
                className: 'show',
                code: '187'
            }, {
                key: 'backspaces',
                name: '',
                className: 'backspaces',
                code: '8'
            },
        ]
    },
    {
        name: '2',
        className: 'line_2',
        children: [
            {
                key: 'Tab',
                name: '',
                className: 'Tab',
                code: '9'
            }, {
                key: 'Q',
                name: '',
                className: '',
                code: '81'
            }, {
                key: 'W',
                name: '',
                className: '',
                code: '87'
            }, {
                key: 'E',
                name: '',
                className: '',
                code: '69'
            }, {
                key: 'R',
                name: '',
                className: '',
                code: '82'
            }, {
                key: 'T',
                name: '',
                className: '',
                code: '84'
            }, {
                key: 'Y',
                name: 'Y',
                className: 'show',
                code: '89'
            }, {
                key: 'U',
                name: '',
                className: '',
                code: '85'
            }, {
                key: 'I',
                name: '',
                className: '',
                code: '73'
            }, {
                key: 'O',
                name: '',
                className: '',
                code: '79'
            }, {
                key: 'P',
                name: '',
                className: '',
                code: '80'
            }, {
                key: '[',
                name: '[',
                className: 'show',
                code: '219'
            }, {
                key: ']',
                name: ']',
                className: 'show',
                code: '221'
            }, {
                key: '\\',
                name: '',
                className: '\\',
                code: '220'
            }
        ]
    },
    {
        name: '3',
        className: 'line_3',
        children: [
            {
                key: 'Caps',
                name: '',
                className: 'Caps',
                code: '20'
            }, {
                key: 'A',
                name: '',
                className: '',
                code: '65'
            }, {
                key: 'S',
                name: 'S',
                className: 'show',
                code: '83'
            }, {
                key: 'D',
                name: '',
                className: '',
                code: '68'
            }, {
                key: 'F',
                name: '',
                className: '',
                code: '70'
            }, {
                key: 'G',
                name: '',
                className: '',
                code: '71'
            }, {
                key: 'H',
                name: '',
                className: '',
                code: '72'
            }, {
                key: 'J',
                name: '',
                className: '',
                code: '74'
            }, {
                key: 'K',
                name: '',
                className: '',
                code: '75'
            }, {
                key: 'L',
                name: '',
                className: '',
                code: '76'
            }, {
                key: ';',
                name: ';',
                className: 'show',
                code: '186'
            }, {
                key: '\'',
                name: '',
                className: '',
                code: '222'
            }, {
                key: 'Enter',
                name: 'Enter',
                className: 'Enter show',
                code: '13'
            }
        ]
    }, {
        name: '4',
        className: 'line_4',
        children: [
            {
                key: 'Shift',
                name: '',
                className: 'Shift',
                code: '16'
            }, {
                key: 'Z',
                name: '',
                className: '',
                code: '90'
            }, {
                key: 'X',
                name: '',
                className: '',
                code: '88'
            }, {
                key: 'C',
                name: '',
                className: '',
                code: '67'
            }, {
                key: 'V',
                name: '',
                className: '',
                code: '86'
            }, {
                key: 'B',
                name: '',
                className: '',
                code: '66'
            }, {
                key: 'N',
                name: 'N',
                className: 'show',
                code: '78'
            }, {
                key: 'M',
                name: '',
                className: '',
                code: '77'
            }, {
                key: ',',
                name: '',
                className: '',
                code: '188'
            }, {
                key: '.',
                name: '',
                className: '',
                code: '190'
            }, {
                key: '/',
                name: '/',
                className: 'show',
                code: '191'
            }, {
                key: 'Shift_right',
                name: 'Shift',
                className: 'Shift',
                code: '16'
            }
        ]
    },
    {
        name: '5',
        className: 'line_5',
        children: [
            {
                key: 'Ctrl',
                name: 'Ctrl',
                className: 'Ctrl show',
                code: '17'
            }, {
                key: 'win',
                name: '',
                className: 'win',
                code: '91'
            }, {
                key: 'Alt',
                name: 'Alt',
                className: 'Alt',
                code: '18'
            }, {
                key: 'Space',
                name: '空格',
                className: 'Space',
                code: '32'
            }, {
                key: 'Alt_right',
                name: 'Alt',
                className: 'Alt',
                code: '18'
            }, {
                key: 'Prt',
                name: '',
                className: 'Prt',
                code: ''
            }, {
                key: 'win_right',
                name: '',
                className: 'win_right',
                code: '91'
            }, {
                key: 'Ctrl_right',
                name: 'Ctrl',
                className: 'Ctrl_right show',
                code: '17'
            }

        ]
    }
]
const centerData = [
    {
        name: 'top1',
        className: 'center_top1',
        children: [
            {
                key: 'PrtSc',
                name: '',
                className: 'PrtSc',
                code: ''
            }, {
                key: 'ScrLk',
                name: '',
                className: 'ScrLk',
                code: '145'
            }, {
                key: 'Pause',
                name: '',
                className: 'Pause',
                code: '19'
            },
        ]
    }, {
        name: 'top2',
        className: 'center_top2',
        children: [
            {
                key: 'Ins',
                name: '',
                className: 'Ins',
                code: '45'
            }, {
                key: 'Home',
                name: '',
                className: 'Home',
                code: '36'
            }, {
                key: 'PageUp',
                name: '',
                className: 'PageUp',
                code: '33'
            },
        ]
    }, {
        name: 'top3',
        className: 'center_top3',
        children: [
            {
                key: 'Del',
                name: 'Del',
                className: 'Del show',
                code: '46'
            }, {
                key: 'End',
                name: '',
                className: 'End',
                code: '35'
            }, {
                key: 'PageDn',
                name: '',
                className: 'PageDn',
                code: '34'
            },
        ]
    }, {
        name: 'top4',
        className: 'center_top4',
        children: [
            {
                key: '↑',
                name: '',
                className: '↑',
                code: '38'
            }
        ]
    }, {
        name: 'top5',
        className: 'center_top5',
        children: [
            {
                key: '←',
                name: '',
                className: '←',
                code: '37'
            }, {
                key: '↓',
                name: '',
                className: '↓',
                code: '40'
            }, {
                key: '→',
                name: '',
                className: '→',
                code: '39'
            },
        ]
    },
]

const rightData = [{
    name: 'right1',
    className: 'right_top1',
    children: [{
        key: 'yuan1',
        name: 'o',
        className: 'o',
        code: ''
    }, {
        key: 'yuan2',
        name: 'o',
        className: 'o',
        code: ''
    }, {
        key: 'yuan3',
        name: 'o',
        className: 'o',
        code: ''
    }]
}, {
    name: 'right2',
    className: 'right_top2',
    children: [{
        key: 'Num',
        name: '',
        className: 'Num',
        code: '144'
    }, {
        key: '/',
        name: '',
        className: '/',
        code: '111'
    }, {
        key: '*',
        name: '',
        className: '*',
        code: '106'
    }, {
        key: '-',
        name: '',
        className: '-',
        code: '109'
    }]
}, {
    name: 'right3',
    className: 'right_top3',
    children: [{
        key: '7',
        name: '',
        className: '7',
        code: '36'
    }, {
        key: '8',
        name: '',
        className: '8',
        code: '38'
    }, {
        key: '9',
        name: '',
        className: '9',
        code: '33'
    }, {
        key: '+',
        name: '',
        className: 'jia',
        code: '107'
    }]
}, {
    name: 'right4',
    className: 'right_top4',
    children: [{
        key: '4',
        name: '',
        className: '4',
        code: '37'
    }, {
        key: '5',
        name: '',
        className: '5',
        code: '12'
    }, {
        key: '6',
        name: '',
        className: '6',
        code: '39'
    }]
}, {
    name: 'right5',
    className: 'right_top5',
    children: [{
        key: '1',
        name: '',
        className: '1',
        code: '35'
    }, {
        key: '2',
        name: '',
        className: '2',
        code: '40'
    }, {
        key: '3',
        name: '',
        className: '3',
        code: ''
    }, {
        key: 'Enter',
        name: 'Ent',
        className: 'Enter show',
        code: '13'
    }]
}, {
    name: 'right6',
    className: 'right_top6',
    children: [{
        key: '0',
        name: '',
        className: 'right_0',
        code: '45'
    }, {
        key: '.',
        name: '',
        className: '',
        code: '110'
    }]
}]

const shortCuts = [
    {
        code: 1,
        name: 'Ctrl + Alt + n',
        keyCode: [17, 18, 78],
        className: 'show_style1',
        detail: '新增'
    }, {
        code: 2,
        name: 'Ctrl + s',
        keyCode: [17, 83],
        className: 'show_style2',
        detail: '保存'
    }, {
        code: 3,
        name: 'Ctrl + /',
        keyCode: [17, 191],
        className: 'show_style3',
        detail: '保存并新增'
    }, {
        code: 4,
        name: 'Ctrl + y',
        keyCode: [17, 89],
        className: 'show_style4',
        detail: '审核/反审核'
    }, {
        code: 10,
        name: 'Ctrl + ;',
        keyCode: [17, 186],
        className: 'show_style4',
        detail: '打印'
    }, 
    
    // {
    //     code: 5,
    //     name: 'Del',
    //     keyCode: [46],
    //     className: 'show_style5',
    //     detail: '删除'
    // },
    
    {
        code: 6,
        name: 'Ctrl + 【',
        keyCode: [17, 219],
        className: 'show_style6',
        detail: '上一张凭证'
    }, {
        code: 7,
        name: 'Ctrl + 】',
        keyCode: [17, 221],
        className: 'show_style7',
        detail: '下一张凭证'
    }, {
        code: 8,
        name: 'Enter',
        keyCode: [13],
        className: 'show_style7',
        detail: '下一个/下一行'
    }, {
        code: 9,
        name: '=',
        keyCode: [187],
        className: 'show_style7',
        detail: '自动平衡借贷方金额'
    }
]

class ShortKeyComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectShort: null,
            active: []
        }
    }

    componentWillReceiveProps(props) {
        const { active } = this.props
        if (active) {
            this.setState({
                active
            })
        }
    }

    keyClick = (value) => {
        const { handleClick } = this.props
        if (handleClick) {
            handleClick(value)
        }
    }

    renderItem = (data) => {
        let { active } = this.state
        if (!active) {
            active = []
        }
        return data.map(item => {
            const flag = active.includes(parseInt(item.code));
            return (
                <li
                    key={item.key}
                    className={`${item.className ? item.className : ''} ${flag ? 'active' : ''}`}>
                    <span>{item.name}</span>
                </li>
            )
        })
    }

    renderLine = (data) => {
        return data.map((item) => {
            return (
                <ul key={item.name} className={item.className}>
                    {this.renderItem(item.children)}
                </ul>
            )
        })
    }

    selectShortCut = (item) => {
        if (!item.code)
            return
        this.setState({
            selectShort: item.code,
            active: item.keyCode
        })
    }

    renderCuts = (arr) => {
        const { selectShort } = this.state
        return arr.map(item => {
            return (
                <li
                    className={`${item.code == selectShort ? 'active' : ''}`}
                    key={item.code}
                    onMouseOver={() => this.selectShortCut(item)}
                >
                    <div className='item_label'><span>{item.name}</span></div>
                    <div className='item_detail'><span>{item.detail}</span></div>
                </li>
            )
        })
    }


    render() {
        const props = this.props
        let className = classNames({
            'mk-shortCut': true,
            [props.className]: !!props.className
        })
        return (
            <div className={className}>
                <div className="container">
                    <div className="key_container">
                        <div className="key_container_left">
                            {this.renderLine(data)}
                        </div>
                        <div className="key_container_center">
                            {this.renderLine(centerData)}
                        </div>
                        <div className="key_container_right">
                            {this.renderLine(rightData)}
                        </div>
                    </div>
                    <div className="short-list">
                        <ul>
                            {this.renderCuts(shortCuts)}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShortKeyComponent

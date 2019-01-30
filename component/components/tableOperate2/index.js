import React from 'react'
import Icon from '../icon/index'
import classNames from 'classnames'
import isequal from 'lodash.isequal'
class TableOperate2 extends React.Component {

    assitShouldComponent = (target) => {
        let obj = {}
        for (const [key, value] of Object.entries(target)) {
            if (typeof (value) != 'function') {
                obj[key] = value
            }
        }
        return obj
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log((isequal(this.props, nextProps) && isequal(this.state, nextState)))
        return !(isequal(this.assitShouldComponent(this.props), this.assitShouldComponent(nextProps)) && isequal(this.state, nextState))
    }

    handleClick = (type) => {
        const { status, disable, auditClick, editClick, deleteClick, unauditClick, className, style } = this.props
        switch (type) {
            case 'edit':
                !(disable && disable.includes('edit')) && editClick && editClick()
                break
            case 'audit':
                !(this.props.disable && disable.includes('audit')) && auditClick && auditClick()
                break
            case 'unaudit':
                !(this.props.disable && disable.includes('unaudit')) && unauditClick && unauditClick()
                break
            case 'delete':
                !(disable && disable.includes('delete')) && deleteClick && deleteClick()
                break
            default: return;
        }
    }

    render() {
        const { status, disable, auditClick, editClick, deleteClick, unauditClick, className, style } = this.props
        const showBtn = []

        if (status == 1) {
            editClick && showBtn.push(
                <a
                    className={`${disable && disable.includes('edit') ? 'disabled' : ''}`}
                    onClick={() => this.handleClick('edit')}
                    href="javascript:;"
                >
                    <Icon fontFamily='edficon' type="bianji" title="编辑" />
                </a>
            )
            auditClick && showBtn.push(
                <a
                    className={`${disable && disable.includes('audit') ? 'disabled' : ''}`}
                    onClick={() => this.handleClick('audit')}
                    href="javascript:;"
                >
                    <Icon fontFamily='edficon' type="pizhu" title="审核" />
                </a>
            )
            deleteClick && showBtn.push(
                <a
                    className={`${disable && disable.includes('delete') ? 'disabled' : ''}`}
                    onClick={() => this.handleClick('delete')}
                    href="javascript:;"
                >
                    <Icon fontFamily='edficon' type="shanchu" title="删除" />
                </a>
            )
        } else if (status == 2) {
            editClick && showBtn.push(
                <a
                    className={`${disable && disable.includes('edit') ? 'disabled' : ''}`}
                    onClick={() => this.handleClick('edit')}
                    href="javascript:;"
                >
                    <Icon fontFamily='edficon' type="bianji" title="编辑" />
                </a>
            )
            unauditClick && showBtn.push(
                <a
                    className={`${disable && disable.includes('unaudit') ? 'disabled' : ''}`}
                    onClick={() => this.handleClick('unaudit')}
                    href="javascript:;"
                >
                    <Icon fontFamily='edficon' type="pizhu" title="反审核" color='red' />
                </a>
            )
            deleteClick && showBtn.push(
                <a
                    className={`${disable && disable.includes('delete') ? 'disabled' : ''}`}
                    onClick={() => this.handleClick('delete')}
                    href="javascript:;"
                >
                    <Icon fontFamily='edficon' type="shanchu" title="删除" />
                </a>
            )
        }

        let classNameContainer = classNames({
            'mk-tableOperate': true,
            [className]: !!className
        })
        return (
            <div className={classNameContainer}>
                {showBtn}
            </div>
        )
    }
}
export default TableOperate2
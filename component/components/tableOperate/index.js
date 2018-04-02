import React from 'react'
import Icon from '../icon/index'
import classNames from 'classnames'

export default function tableOperate({ status, disable, viewClick, editClick, deleteClick, className, style }){

    const handleClick = (type) => {
        switch (type){
            case 1:
                !(disable&&disable.includes('view'))&&viewClick&&viewClick()
                break
            case 2:
                !(disable&&disable.includes('edit'))&&editClick&&editClick()
                break
            case 3:
                !(disable&&disable.includes('delete'))&&deleteClick&&deleteClick()
                break
        }
    }
    const showBtn = []
    if( status == 1 ) {
        showBtn.push(
            <a 
                className={`${disable&&disable.includes('view') ? 'disabled' : '' }`} 
                onClick={()=>handleClick(1)} 
                href="javascript:;"
            >
                <Icon  fontFamily='edficon' type="chakan" title="查看" />
            </a>
        )
    } else if(status == 2) {
        showBtn.push(
            <a
                className={`${disable&&disable.includes('edit') ? 'disabled' : '' }`} 
                onClick={()=>handleClick(2)} 
                href="javascript:;"
            >
                <Icon fontFamily='edficon' type="bianji" title="编辑" />
            </a>
        )
        showBtn.push(
            <a 
                className={`${disable&&disable.includes('delete') ? 'disabled' : '' }`} 
                onClick={()=>handleClick(3)} 
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
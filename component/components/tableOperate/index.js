import React from 'react'
import Icon from '../icon/index'
import classNames from 'classnames'
import { Popover, Input,Message} from 'edf-component'

export default function tableOperate({ status, disable, viewClick, editClick, deleteClick, noteClick, className, style }){

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
            case 4:
                !(disable&&disable.includes('note'))&&noteClick&&noteClick()
                break
        }
    }
    const showBtn = []
    let noteLength = 0
    const checkMaxInput = (e) => {
        noteLength = e.target.value.length
        
        if(noteLength > 100){
            Message.warning('最多输入100个字')
        }else{
            document.getElementById('statisticsNum').innerHTML = noteLength
        }
    }
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
        showBtn.push(
            <Popover content = {
                <div>
                    <Input.TextArea rows={7} placeholder={'请输入批注内容'} onChange={ (e) => checkMaxInput(e)}/>
                    <span className="statistics"><span className="statisticsNum" id="statisticsNum">{noteLength}</span>/100</span>
                </div>
            }
                placement="bottom"
                overlayClassName = "noteContainer"
                trigger="click">
                <a 
                    className={`${disable&&disable.includes('note') ? 'disabled' : '' }`} 
                    onClick={()=>handleClick(4)} 
                    href="javascript:;"
                >
                    <Icon fontFamily='edficon' type="bangzhushouye" title="批注" />
                </a>
                </Popover>
            
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
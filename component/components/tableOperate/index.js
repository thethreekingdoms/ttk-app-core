import React from 'react'
import Icon from '../icon/index'
import classNames from 'classnames'
import { Popover, Input,Message} from 'edf-component'
class TableOperate extends React.Component {
    constructor (props){
        super(props)
        
        this.state = {
            noteLength: 0,
            noteContent: '',
            flag: true,
            initnoteContent:''
        }
    }
    handleClick = (type) => {
        const { status, disable, submitNote,viewClick, editClick, deleteClick, noteClick, className, style } = this.props
        
        switch (type){
            case 1:
                !(this.props.disable&&disable.includes('view'))&&viewClick&&viewClick()
                break
            case 2:
                !(disable&&disable.includes('edit'))&&editClick&&editClick()
                break
            case 3:
                !(disable&&disable.includes('delete'))&&deleteClick&&deleteClick()
                break
            case 4:
                if(!(disable&&disable.includes('note'))&&noteClick){
                    let value = noteClick()
                    this.setState({
                        initnoteContent: value
                    })
                }
                // !(disable&&disable.includes('note'))&&noteClick&&noteClick()
                break
        }
    }
    checkMaxInput = (e) => {
        if(this.state.flag) {
            let noteLength = e.target.value.length
            if(noteLength > 100){
                Message.warning('最多输入100个字')
            }
            this.setState({
                noteContent: e.target.value
            })
        }
    }
    
    onCompositionStart = (e)=> {
        this.setState({
            flag: false
        })
    }
    onCompositionEnd=(e) => {
        this.setState({
            flag: true,
            noteContent: e.target.value
        })
    }
    render(){
        const { status, disable, submitNote,viewClick, editClick, deleteClick, noteClick, className, style } = this.props
        const showBtn = []
        
        if( status == 1 ) {
            showBtn.push(
                <a 
                    className={`${disable&&disable.includes('view') ? 'disabled' : '' }`} 
                    onClick={()=>this.handleClick(1)} 
                    href="javascript:;"
                >
                    <Icon  fontFamily='edficon' type="chakan" title="查看" />
                </a>
            )
        } else if(status == 2) {
            showBtn.push(
                <a
                    className={`${disable&&disable.includes('edit') ? 'disabled' : '' }`} 
                    onClick={()=>this.handleClick(2)} 
                    href="javascript:;"
                >
                    <Icon fontFamily='edficon' type="bianji" title="编辑" />
                </a>
            )
            showBtn.push(
                <a 
                    className={`${disable&&disable.includes('delete') ? 'disabled' : '' }`} 
                    onClick={()=>this.handleClick(3)} 
                    href="javascript:;"
                >
                    <Icon fontFamily='edficon' type="shanchu" title="删除" />
                </a>
            )
            showBtn.push(
                <Popover content = {
                    
                    <div >
                        <Input.TextArea rows={7} 
                        placeholder={'请输入批注内容'} 
                        onCompositionStart = {(e) => this.onCompositionStart(e)} 
                        onCompositionEnd = {(e) =>this.onCompositionEnd(e)} 
                        onInput = { (e) => this.checkMaxInput(e)} 
                        onBlur = {() => submitNote(this.state.noteContent)} 
                        id = "noteInput" 
                        defaultValue = {this.state.initnoteContent}
                       />
                        <span className="statistics"><span id="statisticsNum">{this.state.noteContent?this.state.noteContent.length:this.state.initnoteContent.length}</span>/100</span>
                    </div>
                }
                    placement="bottom"
                    overlayClassName = "noteContainer"
                    trigger="click">
                    <a 
                        className={`${disable&&disable.includes('note') ? 'disabled' : '' }`} 
                        onClick={()=>this.handleClick(4)} 
                        href="javascript:;"
                    >
                        <Icon fontFamily='edficon' type="pizhu" title="批注" />
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
}
export default TableOperate
// export default function tableOperate({ getnoteLength,status, disable,checkMaxInput, submitNote,viewClick, editClick, deleteClick, noteClick, className, style }){
//     // console.log(getnoteLength())
//     let noteLength = getnoteLength().len||0
//     const handleClick = (type) => {
//         switch (type){
//             case 1:
//                 !(disable&&disable.includes('view'))&&viewClick&&viewClick()
//                 break
//             case 2:
//                 !(disable&&disable.includes('edit'))&&editClick&&editClick()
//                 break
//             case 3:
//                 !(disable&&disable.includes('delete'))&&deleteClick&&deleteClick()
//                 break
//             case 4:
//                 !(disable&&disable.includes('note'))&&noteClick&&noteClick()
//                 // noteLength = noteLength()
//                 break
//         }
//     }
//     const showBtn = []
    
//     if( status == 1 ) {
//         showBtn.push(
//             <a 
//                 className={`${disable&&disable.includes('view') ? 'disabled' : '' }`} 
//                 onClick={()=>handleClick(1)} 
//                 href="javascript:;"
//             >
//                 <Icon  fontFamily='edficon' type="chakan" title="查看" />
//             </a>
//         )
//     } else if(status == 2) {
//         showBtn.push(
//             <a
//                 className={`${disable&&disable.includes('edit') ? 'disabled' : '' }`} 
//                 onClick={()=>handleClick(2)} 
//                 href="javascript:;"
//             >
//                 <Icon fontFamily='edficon' type="bianji" title="编辑" />
//             </a>
//         )
//         showBtn.push(
//             <a 
//                 className={`${disable&&disable.includes('delete') ? 'disabled' : '' }`} 
//                 onClick={()=>handleClick(3)} 
//                 href="javascript:;"
//             >
//                 <Icon fontFamily='edficon' type="shanchu" title="删除" />
//             </a>
//         )
//         showBtn.push(
//             <Popover content = {
                
//                 <div >
//                     <Input.TextArea rows={7} placeholder={'请输入批注内容'} onChange={ (e) => checkMaxInput(e)} onBlur={() => submitNote()} id="noteInput"/>
//                     <span className="statistics"><span id="statisticsNum">{noteLength}</span>/100</span>
//                 </div>
//             }
//                 placement="bottom"
//                 overlayClassName = "noteContainer"
//                 trigger="click">
//                 <a 
//                     className={`${disable&&disable.includes('note') ? 'disabled' : '' }`} 
//                     onClick={()=>handleClick(4)} 
//                     href="javascript:;"
//                 >
//                     <Icon fontFamily='edficon' type="pizhu" title="批注" />
//                 </a>
//                 </Popover>
            
//         )
//     }

//     let classNameContainer = classNames({
//         'mk-tableOperate': true,
//         [className]: !!className
//     })
//     return (
//         <div className={classNameContainer}>
//             {showBtn}
//         </div>
//     )
// }
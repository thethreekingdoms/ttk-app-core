import React from 'react'
import classNames from 'classnames'

class TimetreeComponent extends React.Component {
    constructor(props) {
        super(props)

        this.handleAnimationEnd.bind(this)
    }

    handleAnimationEnd() {
        // let main = document.querySelector('.timeTreeMain')
        // main.style['zIndex'] = '11'
    }

    componentDidMount() {
        this.getATag()
    }

    componentDidUpdate() {
        this.getATag()
    }

    getATag() {
        let container = document.querySelector('.timeTreeMain'),
            links = container.getElementsByTagName('a')
        for (let i = 0; i < links.length; i++) {
            let linkObject = links[i]
            let url = linkObject.getAttribute('href'),
                target = linkObject.getAttribute('target'),
                content = linkObject.innerHTML,
                that = this
            linkObject.onclick = function () {
                that.props.link(target, url, content)
                return false
            }
            linkObject = null
        }
    }

    renderMsgContainer(year, list, i) {
        return (
            <div key={i} style={{ zIndex: '1', position: 'relative' }}>
                {list.map((o, i) => {
                    return this.renderMsg(o, i)
                })}
                <div className="year">{year}</div>
            </div>
        )
    }

    renderMsg(msg, i) {
        let msgClass = classNames({
            "msgBox leftSide": i % 2 == 0,
            "msgBox rightSide": i % 2 != 0
        })
        return (
            <div key={i} className={msgClass}>
                <div>
                    <span className="arrow">
                        {i % 2 == 0 ?
                            <img src={require(`../../assets/img/left.png`)} /> :
                            <img src={require(`../../assets/img/right.png`)} />
                        }
                    </span>
                    <div className="detail">
                        <div>
                            <div className="title">{msg.sendTime}</div>
                            <div className="version">{msg.title}</div>
                            <div id={'detailMessage'} dangerouslySetInnerHTML={{ __html: msg.content }} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        let data = this.props.history
        let keys = Object.keys(data)
        keys.sort((a, b) => b - a)
        return (
            <div className='timetree'>
                <div className='bottom'>
                    <img src={require(`../../assets/img/cloud.png`)} />
                </div>
                <div className='content'>
                    <div className='rocket slideInUp'>
                        <img className='' onAnimationEnd={this.handleAnimationEnd} src={require(`../../assets/img/rocket.png`)} />
                    </div>
                    <div className='main timeTreeMain'>
                        <div className='line'></div>
                        {keys.map((o, i) => {
                            return this.renderMsgContainer(o, data[o], i)
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
export default TimetreeComponent
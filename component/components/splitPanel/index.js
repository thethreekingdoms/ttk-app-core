import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Panel from './panel'
import Resizer from './resizer'

export default class SplitPanelComponent extends Component {
    static defaultProps = {
        prefixCls: 'z-splitpanel'
    }

    state = {
        active: false,
        resized: false
    }

    constructor(props) {
        super(props);

        this.onMouseDown = this.onMouseDown.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this)
        this.onMouseUp = this.onMouseUp.bind(this)
    }

    componentDidMount() {
        this.setSize(this.props, this.state);

        var win = window
        if (win.addEventListener) {
            win.addEventListener('mouseup', this.onMouseUp)
            win.addEventListener('mousemove', this.onMouseMove)
        } else if (win.attachEvent) {
            win.attachEvent('onmouseup', this.onMouseUp)
            win.attachEvent('mousemove', this.onMouseMove)
        } else {
            win.onmouseup = this.onMouseUp
            win.mousemove = this.mousemove
        }
    }

    componentWillReceiveProps(props) {
        this.setSize(props, this.state);
    }

    componentWillUnmount() {
        var win = window
        if (win.removeEventListener) {
            win.removeEventListener('mouseup', this.onMouseUp)
            win.removeEventListener('mousemove', this.onMouseMove)
        } else if (win.detachEvent) {
            win.detachEvent('onmouseup', this.onMouseUp)
            win.detachEvent('mousemove', this.onMouseMove)
        } else {
            win.onmouseup = undefined
            win.mousemove = undefined
        }
    }


    onMouseDown(event) {
        if (this.props.allowResize && !this.props.size) {
            this.unFocus();
            const position = this.props.split === 'vertical' ? event.clientX : event.clientY
            if (typeof this.props.onDragStarted === 'function') {
                this.props.onDragStarted();
            }

            this.setState({
                active: true,
                position
            })
        }
    }

    onMouseMove(event) {
        if (this.props.allowResize && !this.props.size) {
            if (this.state.active) {
                this.unFocus();
                const isPrimaryFirst = this.props.primary === 'first';
                const ref = isPrimaryFirst ? this.refs.pane1 : this.refs.pane2;
                if (ref) {
                    const node = ReactDOM.findDOMNode(ref);

                    if (node.getBoundingClientRect) {
                        const width = node.getBoundingClientRect().width;
                        const height = node.getBoundingClientRect().height;
                        const current = this.props.split === 'vertical' ? event.clientX : event.clientY;
                        const size = this.props.split === 'vertical' ? width : height;
                        const position = this.state.position;
                        const newPosition = isPrimaryFirst ? (position - current) : (current - position);

                        let maxSize = this.props.maxSize;
                        if ((this.props.maxSize !== undefined) && (this.props.maxSize <= 0)) {
                            const splPanel = ReactDOM.findDOMNode(this.refs.splitPanel);
                            if (this.props.split === 'vertical') {
                                maxSize = splPanel.getBoundingClientRect().width + this.props.maxSize;
                            }
                            else if (this.props.split === 'horizontal') {
                                maxSize = splPanel.getBoundingClientRect().height + this.props.maxSize;
                            }
                            else {
                                maxSize = splPanel.getBoundingClientRect().height + this.props.maxSize;
                            }
                        }

                        let newSize = size - newPosition;

                        if (newSize < this.props.minSize) {
                            newSize = this.props.minSize;
                        } else if ((this.props.maxSize !== undefined) && (newSize > maxSize)) {
                            newSize = maxSize;
                        } else {
                            this.setState({
                                position: current,
                                resized: true,
                            });
                        }

                        if (this.props.onChange) {
                            this.props.onChange(newSize);
                        }
                        this.setState({
                            draggedSize: newSize,
                        });
                        ref.setState({
                            size: newSize,
                        });
                    }
                }
            }
        }
    }

    onMouseUp() {
        if (this.props.allowResize && !this.props.size) {
            if (this.state.active) {
                if (typeof this.props.onDragFinished === 'function') {
                    this.props.onDragFinished();
                }
                this.setState({
                    active: false,
                });
            }
        }
    }

    setSize(props, state) {
        const ref = this.props.primary === 'first' ? this.refs.pane1 : this.refs.pane2
        let newSize
        if (ref) {
            newSize = props.size || (state && state.draggedSize) || props.defaultSize || props.minSize
            ref.setState({
                size: newSize,
            })
        }
    }

    unFocus() {
        if (document.selection) {
            document.selection.empty()
        } else {
            window.getSelection().removeAllRanges()
        }
    }


    render() {
        const { split, allowResize } = this.props;
        let disabledClass = allowResize ? '' : 'disabled';

        const style = Object.assign({},
            this.props.style || {}, {
                display: 'flex',
                flex: 1,
                position: 'relative',
                outline: 'none',
                overflow: 'hidden',
                MozUserSelect: 'text',
                WebkitUserSelect: 'text',
                msUserSelect: 'text',
                userSelect: 'text',
            });

        if (split === 'vertical') {
            Object.assign(style, {
                flexDirection: 'row',
                //height: '100%',
                //position: 'absolute',
                left: 0,
                right: 0,
            });
        }
        else if (split === 'horizontal') {
            Object.assign(style, {
                flexDirection: 'column',
                //height: '100%',
                //minHeight: '100%',
                //position: 'absolute',
                top: 0,
                bottom: 0,
                //width: '100%',
            });
        }
        else {
            Object.assign(style, {
                flexDirection: 'column',
                //height: '100%',
                //minHeight: '100%',
                //position: 'absolute',
                top: 0,
                bottom: 0,
                //width: '100%',
            });
        }

        const children = this.props.children;
        const classes = ['SplitPanel', this.props.className, split, disabledClass];

        const pane1Style = Object.assign({}, this.props.paneStyle || {}, this.props.pane1Style || {});
        const pane2Style = Object.assign({}, this.props.paneStyle || {}, this.props.pane2Style || {});

        return (
            <div className={classes.join(' ')} style={style} ref="splitPanel">
                <Panel
                    ref="pane1"
                    key="pane1"
                    className="Pane1"
                    style={pane1Style}
                    split={split}>
                    {children[0]}
                </Panel>
                <Resizer
                    ref="resizer"
                    key="resizer"
                    className={disabledClass}
                    onMouseDown={this.onMouseDown}
                    style={this.props.resizerStyle || {}}
                    split={split}
                />
                <Panel
                    ref="pane2"
                    key="pane2"
                    className="Pane2"
                    style={pane2Style}
                    split={split}>
                    {children[1]}
                </Panel>
            </div>
        );
    }
}

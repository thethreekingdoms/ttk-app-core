import React, { Component } from 'react';
import monkeyKing from './monkeyKing';
import { exception, equal } from 'edf-utils';
import { is } from 'immutable';

export default function wrapper(option) {
	return WrappedComponent => {
		return class internal extends React.PureComponent  {

			constructor(props) {
				super(props);
                this.state = { hasError: false }
			}

			componentWillMount() {
				this.props.componentWillMount && this.props.componentWillMount()
			}

			componentDidMount() {
				this.props.initView && this.props.initView(this); // 兼容以前版本
				this.props.componentDidMount && this.props.componentDidMount()
			}

			shouldComponentUpdate(nextProps, nextState) {
                if (this.props.shouldComponentUpdate
					&& this.props.shouldComponentUpdate(nextProps, nextState) === true)
					return true;

				if (nextState.hasError !== this.state.hasError) {
					return true
                }

                let { payload: thisPayload, ...thisPropsRest} = this.props;
                let { payload: nextPayload, ...nextPropsRest} = nextProps;

                // 初始化
                if (!thisPayload && nextPayload) {
                    return true;
                }

                const isPayLoadSame = is(thisPayload, nextPayload);
                if (!isPayLoadSame) {
                    // data不同
                    if (this.props.renderHasExecuteFunc()){
                        // json中props中配置了执行的函数function()时, 不确定data中哪些值影响render，则刷新
                        return true;
                    }
                    const renderDataKeys = this.props.getRenderDataKeys() || [];
                    
                    for (let key of renderDataKeys) {
                        let path = key.split('.');
                        path.shift();
                        if (!is(thisPayload.getIn(path), nextPayload.getIn(path))) {
                            return true;
                        }
                    }
                }
                
				let __shouldComponentUpdate = !equal.deepEqualWithoutFunc(thisPropsRest, nextPropsRest);

				if (__shouldComponentUpdate == true) {
					return true
				}
				else {
					return __shouldComponentUpdate
				}
			}


			componentWillReceiveProps(nextProps) {
                if (this.state.hasError) {
					this.setState({ hasError: false, error: undefined })
				}

				this.props.componentWillReceiveProps
					&& this.props.componentWillReceiveProps(nextProps)
			}

			componentWillUpdate(nextProps, nextState) {
                this.props.componentWillUpdate
					&& this.props.componentWillUpdate(nextProps, nextState)
			}

			componentDidCatch(error, info) {
                exception.error(error);
				this.setState({ hasError: true, error });

				this.props.componentDidCatch
					&& this.props.componentDidCatch(error, info)
			}


			componentWillUnmount() {
                this.props.unmount && this.props.unmount(); // 兼容以前版本
				this.props.componentWillUnmount
					&& this.props.componentWillUnmount()
			}

			componentDidUpdate() {
                this.props.componentDidUpdate
					&& this.props.componentDidUpdate()
			}

			render() {
                if (this.state.hasError) {
					//return <div style={{ color: 'red' }}>{this.state.error}</div>
					return <div style={{ color: 'red' }}>{this.state.error && this.state.error.message}</div>
                }
				// this.props.notRender = true
				if (this.props.notRender === true || this.props._notRender === true)
					return null;

				if (!WrappedComponent)
					return null;

				if (!this.props.payload)
					return null;

				if (this.props.payload.getIn(['_notRender']) === true)
                    return null;
                
				return <WrappedComponent {...this.props} monkeyKing={monkeyKing} />
			}
		}
	}
}


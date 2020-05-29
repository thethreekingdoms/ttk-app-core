import React, { Component } from 'react';
import monkeyKing from './monkeyKing';
import { exception, equal } from 'edf-utils';

export default function wrapper(option) {
	return WrappedComponent => {
		return class internal extends Component  {

			constructor(props) {
				super(props);
                this.state = { hasError: false }
                this.hasRender = false;
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

                if (this.props.notRender !== nextProps.notRender || this.props._notRender !== nextProps._notRender) {
                    return true;
                }

                if (this.hasRender) {
                    return false;
                }
                
				let __shouldComponentUpdate = !equal.shallowEqual(this.props, nextProps);

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

				if (this.props.notRender === true || this.props._notRender === true)
					return null;

				if (!WrappedComponent)
					return null;

				if (!this.props.payload)
					return null;

				if (this.props.payload.getIn(['_notRender']) === true)
                    return null;
                this.hasRender = true;
                return <WrappedComponent {...this.props} monkeyKing={monkeyKing} />
			}
		}
	}
}

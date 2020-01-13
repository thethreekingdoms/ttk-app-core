import React, { memo } from 'react';
import { connect } from 'react-redux';

class AppContainer extends React.Component {
    state={originInit:false}
    componentDidMount() {
        const {
            name: fullName,
            appDataId,
            container: ReduxConnector,
            type,
            ...other
        } = this.props;
    }
    componentWillReceiveProps(nextProps) {
        const { reducer, type } = nextProps
        if (reducer && type === 'origin' && !this.state.originInit) {
            this.initOrigin(reducer)
            this.setState({originInit: !this.state.originInit})
        }
    }
    initOrigin(reducers) {
        const keys = Object.keys(reducers)
        const { name: fullName, appDataId } = this.props
        keys.forEach(key => {
            this.props.dispatch({
                type: '@@originReduce', payload: {
                    fullName, appDataId, type: key, reducers, payload: { type: Math.random() }
                }
            })
        })
    }
    render() {
        const {
            name: fullName,
            appDataId,
            container: ReduxConnector,
            type,
            ...other
        } = this.props;
        if (ReduxConnector && !type) {
            return (
                <ReduxConnector
                    appDataId={appDataId}
                    {...other}
                    key={fullName}
                />
            );
        } else if (ReduxConnector && type == 'origin') {
            return (<HookAppContainer appName={fullName} appDataId={appDataId} {...other} key={fullName} AppComponent={ReduxConnector} />)
        } else {
            return null;
        }
    }
}

export default connect(
    (state, props) => ({
        container: state.getIn([props.name, props.appDataId, 'container']),
        type: state.getIn([props.name, props.appDataId, 'type']),
        reducer: state.getIn([props.name, '@@require', 'reducer'])
    }),
    null,
    null,
    { pure: true }
)(AppContainer);

function Hookontainer(props) {
    const { _notRender } = props
    const { AppComponent, ...other } = props
    return (
        !_notRender && <AppComponent {...other} />
    )
}
const HookAppContainer = memo(Hookontainer)
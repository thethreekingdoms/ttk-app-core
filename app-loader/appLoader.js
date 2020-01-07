import React from 'react';
import PropTypes from 'prop-types';
import * as actions from './action';
import { geneUUID } from '../utils/uuid';
import { deepEqualWithoutFunc } from '../utils/equal';
import AppContainer from './appContainer';
import { connect } from 'react-redux';

class AppLoader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.appDataId = 'AppLoader_' + geneUUID(4);
        this.store = context.store || props.store;
    }

    componentDidMount() {
        this.store.dispatch(actions.loadApp(this.props.name, null, this.appDataId));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.name !== this.props.name) {
            this.store.dispatch(actions.loadApp(nextProps.name, this.props.name, this.appDataId));
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !deepEqualWithoutFunc(this.props, nextProps);
    }

    componentWillUnmount() {
        this.store.dispatch(actions.clearAppState(this.props.name, this.appDataId));
    }

    render() {
        const { name: fullName, ...rest } = this.props;
        return (
            <AppContainer
                {...rest}
                appDataId={this.appDataId}
                name={fullName}
                key={fullName}
                store={this.store}
            />
        );
    }
}

AppLoader.contextTypes = {
    store: PropTypes.object
};

export default AppLoader;

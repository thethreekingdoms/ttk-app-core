import React from 'react';
import { connect } from 'react-redux';

class AppContainer extends React.Component {
    render() {
        const {
            name: fullName,
            appDataId,
            container: ReduxConnector,
            ...other
        } = this.props;
        if (ReduxConnector) {
            return (
                <ReduxConnector
                    appDataId={appDataId}
                    {...other}
                    key={fullName}
                />
            );
        } else {
            return null;
        }
    }
}

export default connect(
    (state, props) => ({ container: state.getIn([props.name, props.appDataId, 'container']) }),
    null,
    null,
    { pure: true }
)(AppContainer);

import parseName from './parseName';

export default function wrapMapStateToProps(fullName) {
	const parsedName = parseName(fullName);

	return (state, ownProps) => {
		return {
			appName: parsedName.name,
			appFullName: parsedName.fullName,
			appQuery: parsedName.query,
			appParams: parsedName.params,
            payload: state.getIn([parsedName.fullName, ownProps.appDataId, 'data']),
            appDataId: ownProps.appDataId
		};
	};
}
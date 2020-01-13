import AppLoader from './appLoader';

const loadApp = (name, props) => {
	return <AppLoader {...props} name={name} />;
};

export default loadApp
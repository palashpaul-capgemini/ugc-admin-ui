import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({
	component: Component,
	isAuthenticated,
	loading,
	...rest
}) => (
	<Route
		{...rest}
		render={(props) =>
			!isAuthenticated && !loading ? (
				<Redirect to='/signin' />
			) : (
				<Component {...props} />
			)
		}
	/>
);

PrivateRoute.propTypes = {
	isAuthenticated: PropTypes.bool,
	loading: PropTypes.bool,
};

const mapStateToPRops = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	loading: state.auth.loading,
});

export default connect(mapStateToPRops)(PrivateRoute);

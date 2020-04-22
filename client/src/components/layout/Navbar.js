import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, AppBar, Typography, Toolbar } from '@material-ui/core';
import { ExitToApp, Person, Input } from '@material-ui/icons';
import logo from '../../img/ikea-logo.jpg';

// Redux
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

const Navbar = ({ isAuthenticated, loading, logout }) => {
	const classes = useStyles(); // material-ui

	const authenticatedUserMenu = (
		<Button
			color='inherit'
			className={classes.menuButton}
			onClick={logout}
			startIcon={<ExitToApp />}
		>
			Logout
		</Button>
	);

	const guestUserMenu = (
		<Fragment>
			<Link to='/signin'>
				<Button
					color='inherit'
					className={classes.menuButton}
					startIcon={<Input />}
				>
					Sign In
				</Button>
			</Link>
			<Link to='/signup'>
				<Button
					color='inherit'
					className={classes.menuButton}
					startIcon={<Person />}
				>
					Sign Up
				</Button>
			</Link>
		</Fragment>
	);

	return (
		<Fragment>
			{/* <nav className='navbar bg-dark'>
				<h1>
					<Link to='/'>
						<i className='fas fa-code' />
						IKEA
					</Link>
				</h1>
				<ul>
					<li>
						<Link to='/signup'>Sign Up</Link>
					</li>
					<li>
						<Link to='/signin'>Sign In</Link>
					</li>
				</ul>
			</nav> */}
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6' className={classes.title}>
						<Link to='/'>
							<img className='ikea-logo' src={logo} alt='IKEA'></img>
						</Link>
					</Typography>
					{!loading && (
						<Fragment>
							{isAuthenticated ? authenticatedUserMenu : guestUserMenu}
						</Fragment>
					)}
				</Toolbar>
			</AppBar>
		</Fragment>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
	loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	loading: state.auth.loading,
});

export default connect(mapStateToProps, { logout })(Navbar);

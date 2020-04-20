import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
	IconButton,
	Button,
	AppBar,
	Typography,
	Toolbar,
} from '@material-ui/core';

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

const Navbar = () => {
	const classes = useStyles();
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
						<Link to='/'>IKEA</Link>
					</Typography>
					<Link to='/signin'>
						<Button color='inherit' className={classes.menuButton}>
							Sign In
						</Button>
					</Link>
					<Link to='/signup'>
						<Button color='inherit' className={classes.menuButton}>
							Sign Up
						</Button>
					</Link>
				</Toolbar>
			</AppBar>
		</Fragment>
	);
};

export default Navbar;

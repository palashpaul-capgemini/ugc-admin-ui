import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
	AppBar,
	IconButton,
	Button,
	Typography,
	Toolbar,
} from '@material-ui/core';
import { AccountCircle, EmailRounded, Menu } from '@material-ui/icons';

export const Navbar = () => {
	return (
		<Fragment>
			{/* <nav className='navbar'>
				<h1>
					<Link to='/'>
						<i>IKEA</i>
					</Link>
				</h1>
				<ul>
					<li>
						<Link to='/register'>
							<i>Register</i>
						</Link>
					</li>
					<li>
						<Link to='/login'>
							<i>Login</i>
						</Link>
					</li>
				</ul>
			</nav> */}

			<AppBar position='static'>
				<Toolbar>
					<IconButton edge='start' color='inherit' aria-label='menu'>
						<Menu />
					</IconButton>
					<Typography variant='h6'>
						<Link to='/'>
							<i>IKEA</i>
						</Link>
					</Typography>
					<Button color='inherit'>
						<Link to='/login'>
							<i>Login</i>
						</Link>
					</Button>
					<Button color='inherit'>
						<Link to='/login'>
							<Link to='/register'>
								<i>Register</i>
							</Link>
						</Link>
					</Button>
				</Toolbar>
			</AppBar>
		</Fragment>
	);
};

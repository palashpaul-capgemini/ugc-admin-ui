import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Paper, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

const Landing = () => {
	const classes = useStyles();
	return (
		<Container component='main' maxWidth='xs'>
			<Paper>
				<Box mt={1} mb={1} p={1}>
					<Link to='/signin'>
						<Button
							variant='contained'
							color='primary'
							className={classes.menuButton}
						>
							Sign In
						</Button>
					</Link>
					<Link to='/signup'>
						<Button
							variant='contained'
							color='primary'
							className={classes.menuButton}
						>
							Sign Up
						</Button>
					</Link>
				</Box>
			</Paper>
		</Container>
	);
};

export default Landing;

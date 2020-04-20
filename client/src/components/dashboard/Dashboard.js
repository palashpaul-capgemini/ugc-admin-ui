import React from 'react';
// import { Link } from 'react-router-dom';
import { Container, Paper, Box } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';

const Dashboard = () => {
	return (
		<Container component='main' maxWidth='xs'>
			<Paper>
				<Box mt={1} mb={1} p={1}>
					COUNTRIES
				</Box>
			</Paper>
		</Container>
	);
};

export default Dashboard;

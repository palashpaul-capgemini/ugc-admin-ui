import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
// import axios from 'axios';
import {
	Container,
	TextField,
	Button,
	InputAdornment,
	Typography,
	Box,
	Paper,
} from '@material-ui/core';
import { EmailRounded, LockRounded } from '@material-ui/icons';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { setAlert, removeAlert } from '../../actions/alert';
import { login } from '../../actions/auth';

export class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		};

		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit = async (e) => {
		e.preventDefault();
		const newUser = {
			email: this.state.email,
			password: this.state.password,
		};
		// try {
		// 	const config = {
		// 		headers: { 'Content-Type': 'application/json' },
		// 	};
		// 	const body = JSON.stringify(newUser);
		// 	const res = await axios.post('/api/auth', body, config);
		// 	// console.log(res.data);
		// } catch (error) {
		// 	console.error(error.response.data);
		// }
		this.props.login(newUser);
	};

	render() {
		// Redirect if logged in
		if (this.props.isAuthenticated) {
			// console.log(this.props.isAuthenticated);
			return <Redirect to='/dashboard' />;
		}
		return (
			<Fragment>
				<Box mt={8}>
					<Container component='main' maxWidth='xs'>
						<div>
							<Typography component='h1' variant='h5'>
								Sign In
							</Typography>
							<form noValidate onSubmit={(e) => this.onSubmit(e)}>
								<TextField
									variant='outlined'
									margin='normal'
									required
									fullWidth
									id='email'
									label='Email Address'
									name='email'
									placeholder='Email'
									type='email'
									autoComplete='email'
									autoFocus
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>
												<EmailRounded />
											</InputAdornment>
										),
									}}
									onChange={(e) =>
										this.setState({ email: e.currentTarget.value })
									}
								/>
								<TextField
									variant='outlined'
									margin='normal'
									required
									fullWidth
									id='password'
									label='Password'
									name='password'
									placeholder='Password'
									type='password'
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>
												<LockRounded />
											</InputAdornment>
										),
									}}
									onChange={(e) =>
										this.setState({ password: e.currentTarget.value })
									}
								/>
								<Button
									type='submit'
									fullWidth
									variant='contained'
									color='primary'
								>
									Sign In
								</Button>
							</form>
							<Typography component='h1' variant='caption'>
								{this.props.alerts !== null &&
									this.props.alerts.length > 0 &&
									this.props.alerts.map((alert) => (
										<Paper key={alert.id}>
											<Box
												mt={1}
												mb={1}
												p={1}
												key={alert.id}
												className={alert.alertType}
											>
												{alert.msg}
											</Box>
										</Paper>
									))}
							</Typography>
						</div>
					</Container>
				</Box>
			</Fragment>
		);
	}
}

SignIn.propTypes = {
	removeAlert: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
	alerts: PropTypes.array.isRequired,
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	alerts: state.alert,
});

export default connect(mapStateToProps, { setAlert, removeAlert, login })(
	SignIn
);

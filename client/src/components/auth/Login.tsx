import React, { Fragment, useState } from 'react';
import {
	styled,
	Container,
	Grid,
	TextField,
	Button,
	InputAdornment,
	Box,
	Paper,
	makeStyles,
	Link,
	CssBaseline,
	Typography,
	Avatar,
	FormControlLabel,
	Checkbox,
} from '@material-ui/core';
import {
	AccountCircle,
	EmailRounded,
	LockRounded,
	LockOutlined,
} from '@material-ui/icons';

interface Props {
	//onSubmit: () => {};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

// const IkeaButton = styled(Button)({
// 	background: 'rgb(0, 81, 186)',
// 	border: 0,
// 	borderRadius: 50,
// 	boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
// 	color: 'white',
// 	height: 48,
// 	padding: '0 30px',
// });

// const IkeaTextField = styled(TextField)({
// 	background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
// 	border: 0,
// 	borderRadius: 50,
// 	boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
// 	color: 'white',
// 	height: 54,
// });

export const Login: React.FC<Props> = () => {
	const classes = useStyles();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const { email, password } = formData;
	return (
		<Fragment>
			<Container component='main' maxWidth='xs'>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlined />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Sign in
					</Typography>
					<form className={classes.form} noValidate>
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
						/>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='password'
							label='Password'
							name='password'
							placeholder='password'
							type='password'
							autoComplete='current-password'
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<LockRounded />
									</InputAdornment>
								),
							}}
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							// className={classes.submit}
						>
							Sign In
						</Button>
					</form>
				</div>
			</Container>
		</Fragment>
	);
};

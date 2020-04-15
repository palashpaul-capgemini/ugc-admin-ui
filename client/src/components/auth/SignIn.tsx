import React, { Component, Fragment } from 'react';
import axios from 'axios';
import {
	Container,
	TextField,
	Button,
	InputAdornment,
	makeStyles,
	Typography,
} from '@material-ui/core';
import { EmailRounded, LockRounded } from '@material-ui/icons';

export interface ISignInProps {}

export interface ISignInState {
	email: string;
	password: string;
}

export class SignIn extends Component<ISignInProps, ISignInState> {
	public constructor(props: ISignInProps) {
		super(props);
		this.state = {
			email: '',
			password: '',
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	private onChange = (e: React.FormEvent<HTMLInputElement>) => {
		// this.setState({
		// 	([e.target.name] as string  ): (e.currentTarget as HTMLInputElement).value,
		// });
		// this.setState((prevState) => ({
		// 	...prevState,
		// 	multiline: newMultiline,
		// 	DesignStatusDetails: newText,
		// }));
	};

	private onSubmit = async (e: React.FormEvent<EventTarget>) => {
		e.preventDefault();
		const newUser = {
			email: this.state.email,
			password: this.state.password,
		};
		try {
			const config = {
				headers: { 'Content-Type': 'application/json' },
			};
			const body = JSON.stringify(newUser);
			const res = await axios.post('/api/auth', body, config);
			console.log(res.data);
		} catch (error) {
			console.error(error.response.data);
		}
	};

	componentDidUpdate(prevProps: any) {
		if (
			this.state.email !== prevProps.email ||
			this.state.password !== prevProps.password
		) {
			console.log('email: ' + this.state.email);
			console.log('password: ' + this.state.password);
		}
	}

	public render(): React.ReactElement<ISignInProps> {
		return (
			<Fragment>
				<Container component='main' maxWidth='xs'>
					<div>
						<Typography component='h1' variant='h5'>
							Sign in
						</Typography>
						<form
							noValidate
							onSubmit={(e: React.FormEvent<EventTarget>) => this.onSubmit(e)}
						>
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
								onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
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
								onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
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
					</div>
				</Container>
			</Fragment>
		);
	}
}

export default SignIn;

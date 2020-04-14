import React, { Fragment } from 'react';
import { Grid, TextField, Button, InputAdornment } from '@material-ui/core';
import { AccountCircle, EmailRounded, LockRounded } from '@material-ui/icons/';

interface Props {
	//onSubmit: () => {};
}

export const Login: React.FC<Props> = () => {
	return (
		<Fragment>
			<Grid
				container
				spacing={3}
				direction='row'
				justify='center'
				alignItems='center'
			>
				<Grid item xs={12} sm={4} md={3} lg={3}>
					{/* <EmailRounded /> */}
					{/* <TextField
						required
						placeholder='Email'
						name='email'
						id='standard-required'
						label='Email'
						type='email'
						fullWidth={true}
					/> */}
					<TextField
						id='input-with-icon-textfield'
						required
						placeholder='Email'
						name='email'
						// id='standard-required'
						label='Email'
						type='email'
						fullWidth={true}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<EmailRounded />
								</InputAdornment>
							),
						}}
					/>
				</Grid>
			</Grid>
			<Grid
				container
				spacing={3}
				direction='row'
				justify='center'
				alignItems='center'
			>
				<Grid item xs={12} sm={4} md={3} lg={3}>
					<TextField
						required
						placeholder='password'
						name='password'
						id='standard-password-input'
						label='Password'
						type='password'
						autoComplete='current-password'
						fullWidth={true}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<LockRounded />
								</InputAdornment>
							),
						}}
					/>
				</Grid>
			</Grid>
			<Grid
				container
				spacing={3}
				direction='column'
				justify='flex-start'
				alignItems='center'
			>
				<Grid container item xs={12} sm={4} md={3} lg={3}>
					<Button
						startIcon=''
						variant='contained'
						color='primary'
						fullWidth={true}
					>
						<AccountCircle />
						Login
					</Button>
				</Grid>
			</Grid>
		</Fragment>
	);
};

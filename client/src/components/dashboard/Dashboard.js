import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	NativeSelect,
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
import { register } from '../../actions/auth';

import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
});

export class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			countries: [],
			country: '',
		};

		this.getCountires = this.getCountires.bind(this);
	}

	componentDidMount() {
		this.getCountires();
	}

	getCountires = async () => {
		try {
			const res = await axios.get('/api/countries');
			console.log(res.data);
			this.setState({ countries: res.data });
		} catch (error) {
			console.error(error);
		}
	};

	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<Box mt={8}>
					<Container component='main' maxWidth='md'>
						<Typography component='h1' variant='h5'>
							Dashboard
						</Typography>

						{this.state.countires !== null &&
						this.state.countries.length > 0 ? (
							<FormControl className={classes.formControl}>
								{/* <InputLabel id='demo-simple-select-label'>Age</InputLabel> */}
								{/* <Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={this.state.countries[0]}
									// onChange={handleChange}
								>
									{this.state.countries.map((country) => {
										return <MenuItem value={10}>{country.toString()}</MenuItem>;
									})}
								</Select> */}
								<InputLabel htmlFor='countryname-native-helper'>
									Country
								</InputLabel>
								<NativeSelect
									value={this.state.countries.countryname}
									// onChange={handleChange}
									inputProps={{
										name: 'countryname',
										id: 'countryname-native-helper',
									}}
								>
									<option aria-label='None' value='' />
									{this.state.countries.map((country) => {
										return (
											<option
												key={country.countrycode}
												value={{ countryname: country.countryname }}
											>
												{country.countryname}
											</option>
										);
									})}
								</NativeSelect>
							</FormControl>
						) : null}
					</Container>
				</Box>
			</Fragment>
		);
	}
}

Dashboard.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);

// export default Dashboard;

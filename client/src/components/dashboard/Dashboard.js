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
import Locale from './Locale';

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
			country: null,
			countrycode: null,
			lang: [],
		};

		this.getCountires = this.getCountires.bind(this);
		this.handleChange = this.handleChange.bind(this);
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

	handleChange = async (e, countryString) => {
		e.preventDefault();
		const country = JSON.parse(countryString);
		// try {
		// 	const config = {
		// 		headers: { 'Content-Type': 'application/json' },
		// 	};
		// 	const body = JSON.stringify({ countrycode: country.countrycode });
		// 	const res = await axios.post('/api/lang', body, config);
		// 	console.log(res.data);
		// 	this.setState({ lang: res.data });

		this.setState((prevState) => ({
			...prevState,
			country: country,
			countrycode: country.countrycode,
			// 		lang: res.data,
		}));
		// } catch (error) {
		// 	console.error(error);
		// }
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
								<InputLabel htmlFor='countryname-native-helper'>
									Country
								</InputLabel>
								<NativeSelect
									value={this.state.countries.countrycode}
									onChange={(e) => this.handleChange(e, e.target.value)}
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
												// value={country.countrycode}
												value={JSON.stringify({
													countryname: country.countryname,
													countrycode: country.countrycode,
												})}
											>
												{country.countryname}
											</option>
										);
									})}
								</NativeSelect>
							</FormControl>
						) : null}
						{this.state.country !== null && this.state.countrycode !== null && (
							<Locale
								country={this.state.country}
								countrycode={this.state.countrycode}
							/>
						)}
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

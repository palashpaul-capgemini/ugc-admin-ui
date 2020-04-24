import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {
	Grid,
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
import Configlist from './Configlist';
import Savedlist from './Savedlist';
import Locale from './Locale';

import { setAuthToken } from '../../utils/setAuthToken';

const styles = (theme) => ({
	formControl: {
		margin: theme.spacing(1),
		width: '100%',
		minWidth: 120,
		maxWidth: 300,
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
			locale: null,
			refresh: false,
		};

		this.getCountires = this.getCountires.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.setLocale = this.setLocale.bind(this);
		this.setUpdated = this.setUpdated.bind(this);
	}

	setLocale = (locale) => {
		console.log(locale);
		this.setState({ locale });
	};

	componentDidMount() {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}
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
	componentDidUpdate(prevProps, prevState) {
		if (prevState.locale !== this.state.locale) {
			console.log(this.state.locale);
		}
		if (prevState.refresh !== this.state.refresh) {
			console.log('refresh from Dashboard didupdate');
			this.getCountires();
		}
		if (prevState.countires === null) {
			this.getCountires();
		}
	}

	handleChange = async (e, countryString) => {
		e.preventDefault();
		if (countryString !== '') {
			const country = JSON.parse(countryString);
			// try {
			// 	// 	const config = {
			// 	// 		headers: { 'Content-Type': 'application/json' },
			// 	// 	};
			// 	// 	const body = JSON.stringify({ countrycode: country.countrycode });
			// 	// 	const res = await axios.post('/api/lang', body, config);
			// 	// 	console.log(res.data);
			// 	// 	this.setState({ lang: res.data });
			// 	const config = {
			// 		headers: { 'Content-Type': 'application/json' },
			// 	};
			// 	const body = JSON.stringify({ countrycode: country.countrycode });
			// 	console.log('body: ' + body);

			// 	const res = await axios.post('/api/list', body, config);
			// 	console.log(res.data);

			this.setState((prevState) => ({
				...prevState,
				country: country,
				countrycode: country.countrycode,
				// 		lang: res.data,
			}));
			// } catch (error) {
			// 	console.error(error);
			// }
		} else {
			this.setState((prevState) => ({
				...prevState,
				country: null,
				countrycode: null,
			}));
		}
	};

	setUpdated = (bool) => {
		this.setState({ refresh: bool });
	};

	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<Box mt={8}>
					<Container component='main' maxWidth='md'>
						{/* <Typography component='h1' variant='h5'>
							Dashboard
						</Typography> */}
						<Grid container spacing={4}>
							{this.state.countires !== null &&
							this.state.countries.length > 0 ? (
								<Grid item xs={6} md={2}>
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
											{/* <option value=''>None</option> */}
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
								</Grid>
							) : null}
							{this.state.country !== null && this.state.countrycode !== null && (
								<Fragment>
									<Grid item xs={6} md={2}>
										<Locale
											country={this.state.country}
											countrycode={this.state.countrycode}
											setLocale={this.setLocale}
										/>
									</Grid>
									<Grid item xs={6} md={4}>
										<Configlist
											countrycode={this.state.countrycode}
											locale={this.state.locale}
											setUpdated={this.setUpdated}
											refresh={this.state.refresh}
										/>
									</Grid>
									<Grid item xs={6} md={4}>
										<Savedlist
											countrycode={this.state.countrycode}
											locale={this.state.locale}
											setUpdated={this.setUpdated}
											refresh={this.state.refresh}
										/>
									</Grid>
								</Fragment>
							)}
						</Grid>
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

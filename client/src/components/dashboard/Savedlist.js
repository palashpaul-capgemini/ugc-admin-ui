import React, { Component, Fragment } from 'react';
import axios from 'axios';
import {
	FormControl,
	Grid,
	Button,
	Input,
	InputLabel,
	MenuItem,
	NativeSelect,
	ListItemText,
	Select,
	Checkbox,
	Chip,
	Container,
	Typography,
	Box,
} from '@material-ui/core';
import { ArrowLeft } from '@material-ui/icons';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

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
	chips: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	chip: {
		margin: 2,
	},
	noLabel: {
		marginTop: theme.spacing(3),
	},
});

export class Savedlist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			configlistAll: [],
			setlocaleSelections: [],
			message: null,
		};

		this.getConfiglist = this.getConfiglist.bind(this);
		this.handleChangeMultiple = this.handleChangeMultiple.bind(this);
		this.removeSelected = this.removeSelected.bind(this);
	}

	componentDidMount() {
		this.getConfiglist();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.countrycode !== this.props.countrycode) {
			this.getConfiglist();
		}
		if (prevProps.locale !== this.props.locale) {
			this.setState({ message: null });
		}
	}

	handleChangeMultiple = (event) => {
		const options = event.target.options;
		console.log(options);
		const value = [];
		for (let i = 0, l = options.length; i < l; i += 1) {
			if (options[i].selected) {
				// value.push(options[i].value);
				value.push(options[i].value);
			}
		}
		this.setState({ setlocaleSelections: value });
	};

	getConfiglist = async () => {
		try {
			const config = {
				headers: { 'Content-Type': 'application/json' },
			};
			const body = JSON.stringify({ countrycode: this.props.countrycode });
			console.log('body: ' + body);
			const res = await axios.post('/api/config', body, config);
			console.log(res.data);

			this.setState((prevState) => ({
				...prevState,
				configlistAll: res.data,
			}));
		} catch (error) {
			console.error(error);
		}
	};

	removeSelected = async (e) => {
		e.preventDefault();

		if (
			this.state.setlocaleSelections.length > 0 &&
			this.props.locale !== null
		) {
			console.log('Remove Selected');
			console.log(this.state.setlocaleSelections);
			this.setState({ message: null });
			// const configlist = [];
			// console.log(this.state.configlistAll);
			// this.state.setlocaleSelections.map((setlocale) => {
			// 	return this.state.configlistAll.filter(
			// 		(config) =>
			// 			setlocale === config.setlocale && configlist.push(config.setlocale)
			// 	);
			// });
			// console.log(configlist);
			try {
				const config = {
					headers: { 'Content-Type': 'application/json' },
				};
				const body = JSON.stringify({
					countrycode: this.props.countrycode,
					locale: this.props.locale,
					configlist: this.state.setlocaleSelections,
				});
				console.log('body: ' + body);

				const res = await axios.post('/api/config/delete', body, config);
				console.log(res.data);
			} catch (error) {
				console.error(error);
			}
		} else {
			console.log('select locale and setlocale');
			this.setState({ message: 'select locale and setlocale' });
		}
	};

	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<FormControl className={classes.formControl}>
					<InputLabel shrink htmlFor='select-multiple-native'>
						Set locale
					</InputLabel>
					<Select
						multiple
						native
						value={this.props.configlistAll}
						onChange={this.handleChangeMultiple}
						inputProps={{
							id: 'select-multiple-native',
						}}
					>
						{this.state.configlistAll !== null &&
							this.state.configlistAll.length > 0 &&
							this.state.configlistAll.map(
								(config, index) =>
									config.locale === this.props.locale && (
										<option key={index} value={config.setlocale}>
											{config.setlocale}
										</option>
									)
							)}
					</Select>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Box mt={2}>
								<Button
									type='submit'
									fullWidth
									variant='contained'
									color='primary'
								>
									All
								</Button>
							</Box>
						</Grid>
						<Grid item xs={6}>
							<Box mt={2}>
								<Button
									type='submit'
									fullWidth
									variant='contained'
									color='primary'
								>
									None
								</Button>
							</Box>
						</Grid>
						<Grid item xs={12}>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='primary'
								startIcon={<ArrowLeft />}
								onClick={(e) => this.removeSelected(e)}
							>
								Remove
							</Button>
							{this.state.message !== null && this.state.message}
						</Grid>
					</Grid>
				</FormControl>
				<Grid item xs={12}>
					<Box className={classes.formControl}>
						{this.state.setlocaleSelections.map((setlocale, index) => (
							<Chip
								key={index}
								label={setlocale}
								className={classes.chip}
								variant='outlined'
							/>
						))}
					</Box>
				</Grid>
			</Fragment>
		);
	}
}

Savedlist.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Savedlist);

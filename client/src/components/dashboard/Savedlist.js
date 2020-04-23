import React, { Component, Fragment } from 'react';
import axios from 'axios';
import {
	FormControl,
	Grid,
	Button,
	InputLabel,
	Select,
	Chip,
	Box,
	List,
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
	list: {
		margin: theme.spacing(1),
		width: '100%',
		minWidth: 120,
		maxWidth: 300,
		height: 400,
		// itemSize: 46,
		// itemCount: 200,
	},
	boxList: {
		margin: theme.spacing(1),
		width: '100%',
		minWidth: 120,
		maxWidth: 300,
		maxHeight: 150,
		overflow: 'auto',
	},
});

export class Savedlist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			configlistAll: [],
			selectionList: [],
			optionList: [], //now

			message: null,
			isUpdate: false,
		};

		this.getConfiglist = this.getConfiglist.bind(this);
		this.handleChangeMultiple = this.handleChangeMultiple.bind(this);
		this.deselectAll = this.deselectAll.bind(this);
		this.selectAll = this.selectAll.bind(this);
		this.removeSelected = this.removeSelected.bind(this);
	}

	componentDidMount() {
		console.log(this.props.locale);
		this.getConfiglist();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.countrycode !== this.props.countrycode) {
			this.getConfiglist();
		}
		if (prevProps.locale !== this.props.locale) {
			this.setState((prevState) => ({
				...prevState,
				message: null,
				selectionList: [],
			}));
			this.getConfiglist();
		}
		if (prevProps.refresh !== this.props.refresh) {
			this.setState((prevState) => ({
				...prevState,
				isUpdate: false,
				selectionList: [],
			}));
			this.props.setUpdated(false);
			this.getConfiglist();
		}
	}

	handleChangeMultiple = (event) => {
		const options = event.target.options;
		console.log(options);
		const value = [];
		for (let i = 0, l = options.length; i < l; i += 1) {
			if (options[i].selected) {
				const string = options[i].value;
				value.push(string);
			}
		}
		console.log(value);
		this.setState({ selectionList: value });
	};

	getConfiglist = async () => {
		try {
			const config = {
				headers: { 'Content-Type': 'application/json' },
			};
			const body = JSON.stringify({ countrycode: this.props.countrycode });
			console.log('body: ' + body);
			const res = await axios.post('/api/config', body, config);
			console.log('saved list');
			console.log(res.data);
			const list = res.data.map((item) => {
				return {
					// countryname: item.countryname,
					countrycode: item.countrycode,
					locale: item.locale,
					setlocale: item.setlocale,
				};
			});

			this.setState((prevState) => ({
				...prevState,
				configlistAll: res.data,
				optionList: list,
			}));
		} catch (error) {
			console.error(error);
		}
	};

	deselectAll = (e) => {
		e.preventDefault();
		this.setState({ selectionList: [] });
		console.log('Deselect all');
	};

	selectAll = (e) => {
		e.preventDefault();
		const allList = this.state.configlistAll.map((item) => {
			return JSON.stringify({
				// countryname: item.countryname,
				countrycode: item.countrycode,
				locale: item.locale,
				setlocale: item.setlocale,
			});
		});

		this.setState({ selectionList: allList });
		console.log('Select all');
	};

	removeSelected = async (e) => {
		e.preventDefault();

		if (this.state.selectionList.length > 0 && this.props.locale !== null) {
			console.log('Remove Selected');
			this.setState({ message: null });
			const configlist = [];

			// console.log(this.state.configlistAll);
			// this.state.selectionList.map((setlocale) => {
			// 	return this.state.configlistAll.filter(
			// 		(config) =>
			// 			setlocale === config.setlocale && configlist.push(config.setlocale)
			// 	);
			// });

			this.state.selectionList.map((item) => {
				configlist.push(JSON.parse(item).setlocale);
			});
			console.log(configlist);
			try {
				const config = {
					headers: { 'Content-Type': 'application/json' },
				};
				const body = JSON.stringify({
					countrycode: this.props.countrycode,
					locale: this.props.locale,
					configlist: configlist,
				});
				console.log('body: ' + body);

				const res = await axios.post('/api/config/delete', body, config);
				console.log(res.data);
				this.setState({ isUpdate: true });
				this.props.setUpdated(true);
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
						value={this.state.selectionList}
						onChange={this.handleChangeMultiple}
						inputProps={{
							id: 'select-multiple-native',
						}}
					>
						{this.state.optionList.length > 0 &&
							this.state.optionList.map(
								(item, index) =>
									item.locale === this.props.locale && (
										<option
											key={index}
											value={JSON.stringify({
												// countryname: item.countryname,
												countrycode: item.countrycode,
												locale: item.locale,
												setlocale: item.setlocale,
											})}
										>
											{[
												// item.countryname,
												// ', ',
												item.countrycode,
												' | ',
												item.setlocale,
											]}
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
									onClick={(e) => this.selectAll(e)}
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
									onClick={(e) => this.deselectAll(e)}
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
							{this.state.message !== null && (
								<Box mt={2} mb={2} spacing={1}>
									<Chip color='secondary' label={this.state.message} />
								</Box>
							)}
						</Grid>
					</Grid>
				</FormControl>
				{/* <Grid item xs={12}>
					<Box className={classes.formControl}>
						{this.state.selectionList.map((setlocale, index) => (
							<Chip
								key={index}
								label={setlocale}
								className={classes.chip}
								variant='outlined'
							/>
						))}
					</Box>
				</Grid> */}

				{/* <Grid item xs={12}>
					<Box className={classes.boxList}>
						<List>
							{this.state.selectionList.length > 0 &&
								this.state.selectionList.map((setlocale, index) => (
									<Chip
										key={index}
										label={setlocale}
										className={classes.chip}
										variant='outlined'
									/>
								))}
						</List>
					</Box>
				</Grid> */}

				<Grid item xs={12}>
					<Box className={classes.boxList}>
						<List>
							{this.props.locale !== null &&
								this.state.selectionList.length > 0 &&
								this.state.selectionList.map((selection, index) => (
									<Chip
										key={index}
										label={[
											// JSON.parse(selection).countryname,
											// ', ',
											JSON.parse(selection).countrycode,
											' | ',
											JSON.parse(selection).setlocale,
										]}
										className={classes.chip}
									/>
								))}
						</List>
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

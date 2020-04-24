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
	TextField,
	InputAdornment,
} from '@material-ui/core';
import { ArrowRight, Search } from '@material-ui/icons';
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
		// maxWidth: 300,
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
	selectionList: {
		height: 400,
	},
	search: {
		// margin: theme.spacing(1),
		width: '100%',
	},
});

export class Configlist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			configlistAll: [],
			configlist: [],
			selectionList: [],
			optionListFilter: [],
			optionList: [],
			message: null,
			isUpdate: false,
		};

		this.getConfiglist = this.getConfiglist.bind(this);
		this.handleChangeMultiple = this.handleChangeMultiple.bind(this);
		this.deselectAll = this.deselectAll.bind(this);
		this.selectAll = this.selectAll.bind(this);
		this.addSelected = this.addSelected.bind(this);
		this.searchByLocales = this.searchByLocales.bind(this);
	}

	componentDidMount() {
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
				optionListFilter: [],
			}));
			this.getConfiglist();
		}
		if (prevProps.refresh !== this.props.refresh) {
			this.setState((prevState) => ({
				...prevState,
				isUpdate: false,
				selectionList: [],
				optionListFilter: [],
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
			const res = await axios.post('/api/list', body, config);
			console.log('config list: ');
			console.log(res.data);
			const list = res.data.map((item) => {
				return {
					countryname: item.countryname,
					countrycode: item.langlookup.countrycode,
					langcode: item.langlookup.langcode,
					locale: item.langlookup.locale,
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
				countryname: item.countryname,
				countrycode: item.langlookup.countrycode,
				langcode: item.langlookup.langcode,
				locale: item.langlookup.locale,
			});
		});

		this.setState({ selectionList: allList });
		console.log('Select all');
	};

	addSelected = async (e) => {
		e.preventDefault();

		if (this.state.selectionList.length > 0 && this.props.locale !== null) {
			console.log('Add Selected');
			this.setState({ message: null });
			const configlist = [];

			// this.state.selectionList.map((item) => {
			// 	return this.state.configlistAll.filter(
			// 		(config) =>
			// 			item === config.countrycode &&
			// 			configlist.push(config.langlookup.locale)
			// 	);
			// });

			this.state.selectionList.map((item) => {
				configlist.push(JSON.parse(item).locale);
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

				const res = await axios.post('/api/config/save', body, config);
				console.log(res.data);
				this.setState({ isUpdate: true });
				this.props.setUpdated(true);
			} catch (error) {
				console.error(error);
			}
		} else {
			console.log('select locale and countrycode');
			this.setState({ message: 'select locale and countrycode' });
		}
	};

	searchByLocales = (e, searchValue) => {
		e.preventDefault();
		console.log(searchValue);
		// console.log(this.state.optionList);
		// const filteredList = [];
		if (
			searchValue !== null &&
			searchValue !== '' &&
			searchValue !== 'undefined' &&
			searchValue.length > 0
		) {
			const filteredList = this.state.optionList.filter((item) => {
				if (item.locale.includes(searchValue)) {
					return item;
				}
			});
			console.log(filteredList);
			this.setState({ optionListFilter: filteredList });
		} else {
			this.setState({ optionListFilter: [] });
		}
	};

	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<FormControl className={classes.formControl}>
					<InputLabel shrink htmlFor='select-multiple-native'>
						Country , Locale
					</InputLabel>
					<Select
						// classes={{ selectionList: classes.selectionList }}
						// className={classes.selectionList}
						multiple
						native
						value={this.state.selectionList}
						onChange={this.handleChangeMultiple}
						inputProps={{
							id: 'select-multiple-native',
							style: { height: 300 },
						}}
					>
						{this.state.optionListFilter.length > 0
							? this.state.optionListFilter.map((item, index) => (
									<option
										key={index}
										value={JSON.stringify({
											countryname: item.countryname,
											countrycode: item.countrycode,
											langcode: item.langcode,
											locale: item.locale,
										})}
									>
										{[
											item.countryname,
											', ',
											// item.countrycode,
											// ' | ',
											item.locale,
										]}
									</option>
							  ))
							: this.state.optionList.length > 0 &&
							  this.state.optionList.map((item, index) => (
									<option
										key={index}
										value={JSON.stringify({
											countryname: item.countryname,
											countrycode: item.countrycode,
											langcode: item.langcode,
											locale: item.locale,
										})}
									>
										{[
											item.countryname,
											', ',
											// item.countrycode,
											// ' | ',
											item.locale,
										]}
									</option>
							  ))}
					</Select>
					<form>
						<Box mt={2}>
							<Grid container spacing={1} alignItems='flex-end'>
								<Grid item xs={12}>
									<TextField
										className={classes.search}
										// id='input-with-icon-grid'
										label='Search by locale'
										InputProps={{
											endAdornment: (
												<InputAdornment position='end'>
													<Search />
												</InputAdornment>
											),
										}}
										onChange={(e) => {
											this.searchByLocales(e, e.target.value);
										}}
									/>
								</Grid>
								{/* <Grid item xs={2}>
									<Search />
								</Grid> */}
							</Grid>
						</Box>
					</form>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Box mt={2}>
								<Button
									type='submit'
									fullWidth
									variant='contained'
									color='primary'
									endIcon={<ArrowRight />}
									onClick={(e) => this.addSelected(e)}
								>
									Add
								</Button>
							</Box>
							{this.state.message !== null && (
								<Box mt={2} mb={2} spacing={1}>
									<Chip color='secondary' label={this.state.message} />
								</Box>
							)}
						</Grid>
						<Grid item xs={6}>
							{/* <Box mt={2}> */}
							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='primary'
								onClick={(e) => this.selectAll(e)}
							>
								All
							</Button>
							{/* </Box> */}
						</Grid>
						<Grid item xs={6}>
							{/* <Box mt={2}> */}
							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='primary'
								onClick={(e) => this.deselectAll(e)}
							>
								None
							</Button>
							{/* </Box> */}
						</Grid>
					</Grid>
				</FormControl>
				{/* <Grid item xs={12}>
					<Box className={classes.boxList}>
						<List>
							{this.state.selectionList.length > 0 &&
								this.state.selectionList.map((selection, index) => (
									<Chip
										key={index}
										label={[
											JSON.parse(selection).countryname,
											', ',
											JSON.parse(selection).countrycode,
											' | ',
											JSON.parse(selection).langcode,
										]}
										className={classes.chip}
									/>
								))}
						</List>
					</Box>
				</Grid> */}
			</Fragment>
		);
	}
}

Configlist.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Configlist);

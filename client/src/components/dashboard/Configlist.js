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
	Paper,
} from '@material-ui/core';
import { ArrowRight } from '@material-ui/icons';
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

export class Configlist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			configlistAll: [],
			configlist: [],
			selectionList: [],
			optionList: [],
			countries: this.props.countries,
			message: null,
			isUpdate: false,
		};

		this.getConfiglist = this.getConfiglist.bind(this);
		this.handleChangeMultiple = this.handleChangeMultiple.bind(this);
		this.deselectAll = this.deselectAll.bind(this);
		this.selectAll = this.selectAll.bind(this);
		this.addSelected = this.addSelected.bind(this);
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
			this.setState({ message: null });
		}
		if (prevState.isUpdate !== this.state.isUpdate) {
			// this.setState({ isUpdate: false });
			this.setState((prevState) => ({
				...prevState,
				isUpdate: false,
				selectionList: [],
			}));
			this.getConfiglist();
		}
	}

	handleChangeMultiple = (event) => {
		const options = event.target.options;
		console.log(options);
		const value = [];
		for (let i = 0, l = options.length; i < l; i += 1) {
			if (options[i].selected) {
				value.push(options[i].value);
			}
		}
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
			console.log(res.data);
			const list = res.data.map((item) => item.countrycode);
			// this.setState({ configlist: res.data });
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
		console.log('Deselect all');
	};

	selectAll = (e) => {
		e.preventDefault();
		const options = e.target.options;
		console.log(options);

		console.log('Select all');
	};

	addSelected = async (e) => {
		e.preventDefault();

		if (this.state.selectionList.length > 0 && this.props.locale !== null) {
			console.log('Add Selected');
			this.setState({ message: null });
			const configlist = [];

			this.state.selectionList.map((item) => {
				return this.state.configlistAll.filter(
					(config) =>
						item === config.countrycode && configlist.push(config.locale)
				);
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
			} catch (error) {
				console.error(error);
			}
		} else {
			console.log('select locale and countrycode');
			this.setState({ message: 'select locale and countrycode' });
		}
	};

	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				{/* {this.state.configlist !== null &&
					this.state.configlist.length > 0 &&
					this.state.configlist.map((list) => {
						return (
							<option key={list.locale}>
								{list.langcode} | {list.countrycode} | {list.locale}
							</option>
						);
					})} */}
				<FormControl className={classes.formControl}>
					<InputLabel shrink htmlFor='select-multiple-native'>
						Country code
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
						{this.state.optionList.map((name, index) => (
							<option key={index} value={name}>
								{name}
							</option>
						))}
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
								endIcon={<ArrowRight />}
								onClick={(e) => this.addSelected(e)}
							>
								Add
							</Button>
							{this.state.message !== null && this.state.message}
						</Grid>
					</Grid>
				</FormControl>
				<Grid item xs={12}>
					<Box className={classes.formControl}>
						{this.state.selectionList.length > 0 &&
							this.state.selectionList.map((selection, index) => (
								<Chip key={index} label={selection} className={classes.chip} />
							))}
					</Box>
				</Grid>
			</Fragment>
		);
	}
}

Configlist.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Configlist);

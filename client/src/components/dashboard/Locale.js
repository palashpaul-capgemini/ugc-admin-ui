import React, { Component, Fragment } from 'react';
import axios from 'axios';
import {
	FormControl,
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
import PropTypes from 'prop-types';
import Configlist from './Configlist';

import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
	formControl: {
		margin: theme.spacing(1),
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

export class Locale extends Component {
	constructor(props) {
		super(props);
		this.state = {
			country: this.props.country,
			countrycode: this.props.countrycode,
			lang: [],
		};

		this.getLocale = this.getLocale.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.getLocale();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.country !== this.props.country) {
			this.getLocale();
		}
	}

	getLocale = async () => {
		try {
			const config = {
				headers: { 'Content-Type': 'application/json' },
			};
			const body = JSON.stringify({ countrycode: this.props.countrycode });
			console.log('body: ' + body);
			const res = await axios.post('/api/lang', body, config);
			console.log(res.data);
			// this.setState({ lang: res.data });

			this.setState((prevState) => ({
				...prevState,
				country: this.props.country,
				countrycode: this.props.countrycode,
				lang: res.data,
			}));
		} catch (error) {
			console.error(error);
		}
	};

	handleChange = async (e) => {
		e.preventDefault();
		// const res = await axios.get('/api/list');
		// console.log(res.data);
	};

	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<Box mt={4}>
					{/* <Container component='main' maxWidth='md'> */}
					<Typography component='h1' variant='h6'>
						Locale
					</Typography>
					{this.state.lang !== null && this.state.lang.length > 0 ? (
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor='locale-native-helper'>Locale</InputLabel>
							<NativeSelect
								value={this.state.lang.locale}
								onChange={(e) => this.handleChange(e, e.target.value)}
								inputProps={{
									name: 'locale',
									id: 'locale-native-helper',
								}}
							>
								<option aria-label='None' value='' />
								{this.state.lang.map((lang) => {
									return (
										<option
											key={lang.langcode}
											// value={country.countrycode}
											value={JSON.stringify({
												langcode: lang.langcode,
												locale: lang.locale,
											})}
										>
											{lang.langcode}
										</option>
									);
								})}
							</NativeSelect>
						</FormControl>
					) : null}
					{/* </Container> */}
				</Box>
				<Configlist />
			</Fragment>
		);
	}
}

Locale.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Locale);

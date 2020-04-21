import React, { Component, Fragment } from 'react';
import axios from 'axios';
import {
	FormControl,
	InputLabel,
	NativeSelect,
	Container,
	Typography,
	Box,
} from '@material-ui/core';
import PropTypes from 'prop-types';

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

export class Locale extends Component {
	constructor(props) {
		super(props);
		this.state = {
			country: null,
			countrycode: null,
			lang: [],
		};

		this.getLocale = this.getLocale.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.getLocale();
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

	handleChange = async (e, langString) => {
		e.preventDefault();
		const lang = JSON.parse(langString);
		try {
			// const config = {
			// 	headers: { 'Content-Type': 'application/json' },
			// };
			// const body = JSON.stringify({
			// 	langcode: lang.langcode,
			// 	countrycode: this.props.countrycode,
			// 	locale: lang.locale,
			// });
			// const res = await axios.post('/api/lang', body, config);
			const res = await axios.get('/api/listconfig');
			console.log(res.data);
			// this.setState({ lang: res.data });

			// this.setState((prevState) => ({
			// 	...prevState,
			// 	country: country,
			// 	countrycode: country.countrycode,
			// 	lang: res.data,
			// }));
		} catch (error) {
			console.error(error);
		}
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
			</Fragment>
		);
	}
}

Locale.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Locale);

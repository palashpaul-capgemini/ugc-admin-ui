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

export class Configlist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			configlist: [],
		};

		this.getConfiglist = this.getConfiglist.bind(this);
		// this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.getConfiglist();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.country !== this.props.country) {
			this.getConfiglist();
		}
	}

	getConfiglist = async () => {
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

			console.log('x');
			const res = await axios.get('/api/list');
			console.log(res.data);
			this.setState({ configlist: res.data });

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
				{this.state.configlist !== null &&
					this.state.configlist.length > 0 &&
					this.state.configlist.map((list) => {
						return <option key={list.locale}>{list.locale}</option>;
					})}
			</Fragment>
		);
	}
}

Configlist.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Configlist);

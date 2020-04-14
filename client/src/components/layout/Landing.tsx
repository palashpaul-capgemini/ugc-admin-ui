import React from 'react';
import { Link } from 'react-router-dom';
// import { TextField } from '@material-ui/core';

interface Props {}

export const Landing: React.FC<Props> = () => {
	return (
		<section>
			<h1>Landing page</h1>
			<ul>
				<li>
					<Link to='/register'>
						<i>Register</i>
					</Link>
				</li>
				<li>
					<Link to='/login'>
						<i>Login</i>
					</Link>
				</li>
			</ul>
		</section>
	);
};

import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';
import { Login } from './components/auth/Login';
import { SignIn } from './components/auth/SignIn';
import { Register } from './components/auth/Register';
import './App.css';

const App = () => {
	return (
		<Router>
			<Fragment>
				<Route exact path='/' component={SignIn} />
				{/* <Navbar />
				<Route exact path='/' component={Landing} />
				<section className='conatiner'>
					<Switch>
						<Route exact path='/register' component={Register} />
						<Route exact path='/login' component={Login} />
					</Switch>
				</section> */}
			</Fragment>
		</Router>
	);
};

export default App;

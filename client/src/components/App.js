import React from 'react';
import { Router, Route } from 'react-router-dom';

import Header from './layouts/Header';
import Landing from './layouts/Landing';
import history from '../history';
import Signup from './auth/Signup';
import Login from './auth/Login';
import Dashboard from './dashboard/Dashboard';
import CreateProfile from './Profiles/CreateProfile';
import EditProfile from './Profiles/EditProfile';
import AddExperience from './Profiles/AddExperience'; // add exp form
import AddEducation from './Profiles/AddEducation'; // add edu form
import Profiles from './Profiles/Profiles';
import ShowProfile from './Profiles/ShowProfile';
class App extends React.Component {
	render() {
		return (
			<div>
				<Router history={history}>
					<Header />

					<Route path="/" exact component={Landing} />
					<section className="container">
						<Route path="/signup" exact component={Signup} />
						<Route path="/login" exact component={Login} />
						<Route path="/dashboard" exact component={Dashboard} />
						<Route path="/profile/create" exact component={CreateProfile} />
						<Route path="/profile/edit" exact component={EditProfile} />
						<Route path="/experience/new" exact component={AddExperience} />
						<Route path="/education/new" exact component={AddEducation} />
						<Route path="/profiles" exact component={Profiles} />
						<Route path="/profiles/:id" exact component={ShowProfile} />
					</section>
				</Router>
			</div>
		);
	}
}

export default App;

// dashBoard => if(loadUser => fetchProfile ) => if(!profile) => renderProfileNo => else => renderProfile =>

// set up react router in this bitch
// developers => get all profiles and render them inside a document
// profiles => getProfile => if(profile){ profileId } (!profileId) render<

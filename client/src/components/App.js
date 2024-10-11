import React from 'react';
import { Router, Route } from 'react-router-dom';

import Header from './layouts/Header';
import Landing from './layouts/Landing';
import history from '../history';
import Signup from './auth/Signup';
import Login from './auth/Login';
import Dashboard from './dashboard/dashboard';
import CreateProfile from './Profiles/CreateProfile';
import EditProfile from './Profiles/EditProfile';
import AddExperience from './Profiles/AddExperience'; // add exp form
import AddEducation from './Profiles/AddEducation'; // add edu form
import Profiles from './Profiles/Profiles';
import ShowProfile from './Profiles/ShowProfile';
import PostDiscussion from './posts/PostDiscussion';
import Posts from './posts/Posts';
import { Switch } from 'react-router-dom';
class App extends React.Component {
	render() {
		return (
			<div>
				<Router history={history}>
					<Header />

					<Route path="/" exact component={Landing} />
					<section className="container">
						<Switch>
							<Route path="/signup" exact component={Signup} />
							<Route path="/login" exact component={Login} />
							<Route path="/dashboard" exact component={Dashboard} />
							<Route path="/profile/create" exact component={CreateProfile} />
							<Route path="/profile/edit" exact component={EditProfile} />
							<Route path="/experience/new" exact component={AddExperience} />
							<Route path="/education/new" exact component={AddEducation} />
							<Route path="/profiles" exact component={Profiles} />
							<Route path="/profiles/:id" exact component={ShowProfile} />
							<Route path="/posts/:postId" exact component={PostDiscussion} />
							<Route path="/posts" exact component={Posts} />

						</Switch>
						
					</section>
				</Router>
			</div>
		);
	}
}

export default App;
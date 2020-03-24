import React from 'react';
import Trip from './components/Trip.jsx';
import { connect } from "react-redux";
import Result from "./components/Result.jsx"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import EmbedMap from "./components/EmbedMap";
import Header from "./components/Header"
import Landing from "./components/Landing"

const App = (props) => {
	
	return (
		<>
			<Header />
			<BrowserRouter>
				<Switch>
          <Route exact path="/result" component={Result} />
          <Route exact path="/trip" component={Trip}  />
					<Route exact path="/" component={Landing} />
        </Switch>
				{props.progression === 0 && (
					<EmbedMap />
				)}
			</BrowserRouter>
		</>
	);
}

const mapStateToProps = state => {
	return {
		progression: state.progression,
		currentRoute: state.currentRoute
	};
};

export default connect(
	mapStateToProps)(App);
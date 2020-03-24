import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";

const Header = props => {

  const logout = () => {
    props.changeAuth(false);
    localStorage.removeItem("J-sunkAuth-Storage");
    props.setLogout(true)
    props.updateProgression(-1);
  }

  let loggedIn;
  switch (true) {
    case props.authenticated:
      loggedIn = (
        <>
          <h5>Logged in as
            <span style={{ color: '#4267b2' }}> {props.currentUser.name}</span>
          </h5>
          <Button
            id="logout-button"
            color="facebook"
            onClick={logout}
          >
            <Icon name="facebook" />Logout
          </Button>
        </>
      );
      break;
    case !props.authenticated && localStorage.getItem("J-sunkAuth-Storage") !== null || props.logout === false:
      loggedIn = (
        <>
          <h5>Logged in with
            <span style={{ color: '#4267b2' }}> Facebook</span>
          </h5>
          <Button
            id="logout-button"
            color="facebook"
            onClick={logout}
          >
            <Icon id="facebook-icon" name="facebook" />Logout
          </Button>
        </>
      );
      break;
  }

  useEffect(() => {
    if (localStorage.getItem("J-sunkAuth-Storage") == null ) {
      props.setLogout(true)
    } 
  }, []);

  return (
    <>
      <header className="ui fixed inverted menu">
        <div className="inner">
          <a href="/"><h3>
            <span style={{ color: 'rgb(82, 80, 80)' }}>
              TripWiz
            </span>
          </h3></a>
        </div>
        <div className="right menu">
          {loggedIn}
        </div>
      </header>
    </>
  )
}

const mapStateToProps = state => {
  return {
    progression: state.progression,
    currentUser: state.currentUser,
    authenticated: state.authenticated,
    currentRoute: state.currentRoute,
    logout: state.logout
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeAuth: auth => {
      dispatch({ type: "CHANGE_AUTHENTICATED", payload: auth });
    },
    updateProgression: value => {
      dispatch({ type: "UPDATE_PROGRESSION", payload: value });
    },
    setCurrentRoute: route => {
      dispatch({ type: "SET_CURRENROUTE", payload: route });
    },
    setLogout: value => {
      dispatch({ type: "SET_LOGOUT", payload: value });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Header);
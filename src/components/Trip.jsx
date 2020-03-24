import React, { useEffect } from "react";
import { connect } from "react-redux";
import Restaurants from "./Restaurants";
import Hotels from "./Hotels";
import Activities from "./Activities";
import Destination from "./Destination";
import FacebookLogin from "./FacebookLogin";

const Trip = props => {

  let currentView;
  switch (true) {
    case props.progression === -1:
      currentView = <FacebookLogin />;
      break;
    case props.progression === 0 || props.progression === 1:
      currentView = <Destination />;
      break;
    case props.progression === 2 || props.progression === 3:
      currentView = <Activities />;
      break;
    case props.progression === 4:
      currentView = <Hotels />;
      break;
    case props.progression === 5:
      currentView = <Restaurants />;
      break;
    default:
      currentView = <Destination />;
  }

  useEffect(() => {
    props.setCurrentRoute("trip");
  }, [])

  return (
    <>
      <div className="trip-section">
        <div id="main" className="centered">
          {props.progression > -1 && (
            <div id="progression-num">
              <h5>{props.progression + 1} / 6</h5>
            </div>
          )}
          {currentView}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    progression: state.progression
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProgression: value => {
      dispatch({ type: "UPDATE_PROGRESSION", payload: value });
    },
    setCurrentRoute: route => {
      dispatch({ type: "SET_CURRENROUTE", payload: route });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Trip);

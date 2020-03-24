import React, { useEffect, useState } from "react";
import FacebookLogin from "./FacebookLogin";
import { connect } from "react-redux";
import data from "../data/popular_trips.json"
import { Parallax } from "react-parallax"

const Landing = (props) => {
  const popularTrips = data
  const image1 = './screenshots/torontobackground.jpeg'

  useEffect(() => {
    props.updateProgression(-1)
  }, []);

  let tripCards;

  tripCards = popularTrips.map(trip => {
    return (
      <div className="landing-cards">
        <div id="land-card" key={trip.id} className="ui card">
          <div className="image-landing">
            <img className="landing-img"
              src={trip.image}
            />
          </div>
          <div className="content">
            <div id="land" className="header">{trip.name}</div>
            <div className="description-landing">
              {trip.type} Get-Away
                <br />
            </div>
          </div>
        </div>
      </div>
    );
  });


  return (
    <>
      <Parallax bgImage={image1} strength={200}>
        <div className="hero">
          <div className="greeting">
            <h1>Welcome to TripWiz.</h1>
            <br />
            <h3>"Wherever the destination, we'll show you around"</h3>
          </div>
          <div className="login"><FacebookLogin /></div>
          </div>
      </Parallax>
      <div className="landing">
        <h3>Popular Destinations</h3>
        <div id="landing-grid" className="ui stackable four column grid">
          {tripCards}
        </div>
        <div className="grid-container">
          <div>
            <div className="left">
              <img className="screenshots" src="../screenshots/fullmap.png" alt="Map" />
            </div>
            <div className="right-top-bottom">
              <h3>Your hotels, activities, restaurants, based on your preferences, all conveniently placed on your map.</h3>
            </div>
          </div>
          <div>
            <div className="left-mid">
              <h3>Here you have options... We make the suggestions, you make the final decision.</h3>
            </div>
            <div className="right-mid">
              <img className="screenshots" src="../screenshots/hotels.png" alt="Map" />
            </div>
          </div>
          <div>
            <div className="left">
              <img className="screenshots" src="../screenshots/activities.png" alt="Map" />
            </div>
            <div className="right-top-bottom">
              <h3>Review each part of your custom itinerary, at any time, on your dashboard.</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="landing-footer">
        <p>Made by a couple of guys.</p>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    currentRoute: state.currentRoute,
    progression: state.progression
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentRoute: route => {
      dispatch({ type: "SET_CURRENROUTE", payload: route });
    },
    updateProgression: value => {
      dispatch({ type: "UPDATE_PROGRESSION", payload: value });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
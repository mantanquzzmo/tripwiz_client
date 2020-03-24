import React, { useState } from "react";
import { getCoords, initializeTrip } from "../modules/destination";
import { connect } from "react-redux";
import { Dropdown, Form, Button, Icon } from "semantic-ui-react";
import { Link } from "react-scroll";

const Destination = props => {
  const [alert, setAlert] = useState(null);

  const number = [
    { key: 1, value: "1", text: "1" },
    { key: 2, value: "2", text: "2" },
    { key: 3, value: "3", text: "3" },
    { key: 4, value: "4", text: "4" },
    { key: 5, value: "5", text: "5" },
    { key: 6, value: "6", text: "6" },
    { key: 7, value: "7", text: "7" },
    { key: 8, value: "8", text: "8" },
    { key: 9, value: "9", text: "9" },
    { key: 10, value: "10", text: "10" },
    { key: 11, value: "11", text: "11" },
    { key: 12, value: "12", text: "12" },
    { key: 13, value: "13", text: "13" },
    { key: 14, value: "14", text: "14" }
  ];

  const submitPlace = async e => {
    e.preventDefault();
    if (e.target.place.value !== "") {
      let response = await getCoords(e.target.place.value);
      if (!response.error) {
        if (response.data.status !== "ZERO_RESULTS") {
          response = response.data.results[0];
          props.setLat(response.geometry.location.lat);
          props.setLng(response.geometry.location.lng);
          props.updateProgression(props.progression + 1);
          props.setMessage("Destination successfully selected");
        } else {
          props.setMessage("Can't go there. Zero Results");
        }
      } else {
        props.setMessage(response.message);
      }
    } else {
      props.setMessage("Must add a destination!");
    }
  };

  const onChangeHandler = async days => {
    if (days) {
      const response = await initializeTrip(props, days);
      if (response.status === 200) {
        props.setDestination(response.data.destination);
        props.setTrip(response.data.id);
        props.setMessage("");
        props.updateProgression(props.progression + 1);
        setAlert("");
      } else {
        props.setMessage("Something went wrong.");
      }
    } else {
      setAlert("You must choose how many days you will travel");
    }
  };

  return (
    <>
      {props.progression === 0 && (
        <>
          <h2>Let's get started...</h2>
          <h5 id="space-below">
            To start planning your trip, pick a spot on the map below!
          </h5>
          <div id="space-below" className="zoom">
            <Link
              className="hidden content"
              id="scroll"
              activeClass="active"
              to="embed-map-dest"
              spy={true}
              smooth={true}
              offset={20}
              duration={500}
            >
              <i aria-hidden="true" className="angle double down big icon"></i>
            </Link>
          </div>
          <div id="dest-form">
            <Form onSubmit={submitPlace} id="place-form">
              <label>Or type your destination here </label>
              <input
                name="place"
                type="text"
                id="place"
                placeholder="City"
              ></input>
              <Button id="submit">Look for Destination</Button>
            </Form>
          </div>
          {props.message}
        </>
      )}
      {props.progression === 1 && (
        <div id="spaced-lines">
          {props.message}
          <h4>How many days are you staying?</h4>
          <Dropdown
            placeholder="Days"
            id="days"
            clearable
            fluid
            selection
            scrolling
            options={number}
            onChange={async (e, data) => {
              props.setDays(data.value);
              onChangeHandler(data.value);
            }}
          />
          {alert}
          <Button
            animated
            id="back-button-1"
            onClick={() => {
              props.updateProgression(props.progression - 1);
              props.setMessage("");
            }}
          >
            <Button.Content visible>Back one step</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow left" />
            </Button.Content>
          </Button>
        </div>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    lat: state.lat,
    lng: state.lng,
    destination: state.destination,
    message: state.message,
    days: state.days,
    progression: state.progression
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLat: lat => {
      dispatch({ type: "CHANGE_LAT", payload: lat });
    },
    setLng: lng => {
      dispatch({ type: "CHANGE_LNG", payload: lng });
    },
    setDestination: dest => {
      dispatch({ type: "SET_DEST", payload: dest });
    },
    setMessage: message => {
      dispatch({ type: "SET_MESSAGE", payload: message });
    },
    setDays: days => {
      dispatch({ type: "SET_DAYS", payload: days });
    },
    setTrip: id => {
      dispatch({ type: "SET_TRIP", payload: id });
    },
    updateProgression: value => {
      dispatch({ type: "UPDATE_PROGRESSION", payload: value });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Destination);

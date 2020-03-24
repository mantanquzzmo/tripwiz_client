import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import { addHotels, objectEraser } from "../modules/destination.js";
import { sliderChoice } from "../helpers/methods.js";

const Hotels = props => {
  const [hotelBudget, setHotelBudget] = useState(null);
  const [hotelsMessage, setHotelsMessage] = useState("");

  const findHotels = async () => {
    if (hotelBudget) {
      let response = await addHotels(hotelBudget, props.trip);
      if (response.status === 200) {
        props.updateProgression(props.progression + 1);
        props.setGotHotels(true);
        props.setMessage("Found Hotels!");
        setHotelsMessage("");
      } else {
        setHotelsMessage("Couldn't find any hotels for that budget");
      }
    } else {
      setHotelsMessage("Your forgot to add a budget");
    }
  };

  return (
    <>
      {props.message} Let's move on to...
      <h2>Accomodation:</h2>
      <h4>Hotel budget:</h4>
      <input
        type="range"
        name="hotel"
        min="1"
        max="5"
        id="slider"
        onChange={event => {
          sliderChoice(event);
          setHotelBudget(event.target.value);
        }}
      ></input>
      <div className="range-values-hotel">
        <div className="scale" id="hotel1">
          <h3>✩</h3>
        </div>
        <div className="scale" id="hotel2">
          <h3>✩✩</h3>
        </div>
        <div className="scale" id="hotel3">
          <h3>✩✩✩</h3>
        </div>
        <div className="scale" id="hotel4">
          <h3>✩✩✩✩</h3>
        </div>
        <div className="scale" id="hotel5">
          <h3>✩✩✩✩✩</h3>
        </div>
      </div>
      {hotelsMessage}
      <br />
      <Button animated id="back-button-4"
        onClick={async () => {
          await objectEraser("activity_types", props.trip, "resturant");
          props.updateProgression(props.progression - 2);
          setHotelsMessage("");
        }}
      >
        <Button.Content visible>Back one step</Button.Content>
        <Button.Content hidden>
          <Icon name='arrow left' />
        </Button.Content>
      </Button>
      <Button id="find-hotels" onClick={findHotels}>
        Check for hotels
      </Button>
    </>
  );
};

const mapStateToProps = state => {
  return {
    destination: state.destination,
    trip: state.trip,
    message: state.message,
    progression: state.progression,
    gotHotels: state.gotHotels
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProgression: value => {
      dispatch({ type: "UPDATE_PROGRESSION", payload: value });
    },
    setMessage: message => {
      dispatch({ type: "SET_MESSAGE", payload: message });
    },
    setGotHotels: data => {
      dispatch({ type: "SET_GOTHOTELS", payload: data });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hotels);

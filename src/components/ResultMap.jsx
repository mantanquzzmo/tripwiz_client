import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { connect } from "react-redux";

const ResultMap = props => {
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlaces, setSelectedPlaces] = useState({});

  let activityTypes;
  let marker;
  let activityMarkers = [];

  const onMarkerClick = (props, marker) => {
    setSelectedPlaces(props);
    setActiveMarker(marker);
    setShowInfoWindow(true);
  };

  useEffect(() => {}, [props.activities]);

  if (props.activities) {
    activityTypes = Object.keys(props.activities);

    activityTypes.map(activityType => {
      marker = props.activities[activityType].map(activity => {
        return (
          <Marker
            key={activity.id}
            name={activity.name}
            activityType={activityType.replace("_", " ")}
            onClick={onMarkerClick}
            position={{ lat: activity.lat, lng: activity.lng }}
            icon={{
              url: `/mapIcons/${activityType}.png`,
              scaledSize: new props.google.maps.Size(40, 40)
            }}
          />
        );
      });
      activityMarkers.push(marker);
    });
  }

  if (props.hotels) {
    marker = props.hotels.map(hotel => {
      return (
        <Marker
          key={hotel.id}
          name={hotel.name}
          onClick={onMarkerClick}
          position={{ lat: hotel.lat, lng: hotel.lng }}
          icon={{
            url: `/mapIcons/hotel.png`,
            scaledSize: new props.google.maps.Size(40, 40)
          }}
        />
      );
    });
    activityMarkers.push(marker);
  }

  return (
    <>
      <h3 id="divider">Your Map</h3>
      <div id="result-map">
        <Map
          google={props.google}
          zoom={13}
          initialCenter={{ lat: props.lat, lng: props.lng }}
          center={{ lat: props.lat, lng: props.lng }}
          style={{ width: "97%", height: "80%", position: "relative" }}
        >
          {activityMarkers}
          <InfoWindow marker={activeMarker} visible={showInfoWindow}>
            <div>
              <h4 style={{ padding: "0" }}>{selectedPlaces.name}</h4>
              <i>{selectedPlaces.activityType}</i>
            </div>
          </InfoWindow>
        </Map>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    trip: state.trip,
    lat: state.lat,
    lng: state.lng,
    activities: state.activities,
    hotels: state.hotels
  };
};

export default connect(mapStateToProps)(
  GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_APIKEY
  })(ResultMap)
);

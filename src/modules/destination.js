import axios from "axios";

const getCoords = async destination => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://maps.googleapis.com/maps/api/geocode/json?",
      params: {
        address: destination,
        key: process.env.REACT_APP_GOOGLE_APIKEY
      }
    });
    return response;
  } catch (error) {
    return error;
  }
};

const initializeTrip = async (props, days) => {
  let headers = JSON.parse(localStorage.getItem("J-sunkAuth-Storage"));
  try {
    const response = await axios({
      method: "POST",
      url: "api/v1/trips",
      params: {
        days: days,
        lat: props.lat,
        lng: props.lng
      },
      headers: headers
    });
    return response;
  } catch (error) {
    return error;
  }
};

const addActivityType = async (activityType, activityVisits, trip) => {
  let headers = JSON.parse(localStorage.getItem("J-sunkAuth-Storage"));
  try {
    const response = await axios({
      method: "POST",
      url: "api/v1/activity_types",
      params: {
        trip: trip,
        activity_type: activityType,
        activity_visits: activityVisits
      },
      headers: headers
    });
    return response;
  } catch (error) {
    return error;
  }
};

const addHotels = async (budget, trip) => {
  let headers = JSON.parse(localStorage.getItem("J-sunkAuth-Storage"));
  try {
    const response = await axios({
      method: "POST",
      url: "api/v1/hotels",
      params: {
        trip: trip,
        budget: budget
      },
      headers: headers
    });
    return response;
  } catch (error) {
    return error;
  }
};

const addRestaurants = async (preference, budget, trip, preference2) => {
  let headers = JSON.parse(localStorage.getItem("J-sunkAuth-Storage"));
  try {
    const response = await axios({
      method: "POST",
      url: "api/v1/activity_types",
      params: {
        trip: trip,
        keyword: preference,
        max_price: budget,
        activity_type: "restaurant"
      },
      headers: headers
    });
    if (preference2) {
      try {
        const response = await axios({
          method: "POST",
          url: "api/v1/activity_types",
          params: {
            trip: trip,
            keyword: preference2,
            max_price: budget,
            activity_type: "restaurant",
            additional_activity: "yes"
          },
          headers: headers
        });
        return response;
      } catch (error) {
        return error;
      }
    }
    return response;
  } catch (error) {
    return error;
  }
};

const getHotels = async trip => {
  let headers = JSON.parse(localStorage.getItem("J-sunkAuth-Storage"));
  try {
    const response = await axios({
      url: "api/v1/hotels",
      method: "GET",
      params: { trip: trip },
      headers: headers
    });
    return response;
  } catch (error) {
    return error;
  }
};

const getRestaurants = async trip => {
  let headers = JSON.parse(localStorage.getItem("J-sunkAuth-Storage"));
  try {
    const response = await axios({
      url: "api/v1/activity_types",
      method: "GET",
      params: { trip: trip, activity_type: "restaurant" },
      headers: headers
    });
    return response;
  } catch (error) {
    return error;
  }
};

const chooseHotel = async (trip, hotelId) => {
  let headers = JSON.parse(localStorage.getItem("J-sunkAuth-Storage"));
  try {
    const response = await axios({
      url: "api/v1/hotels",
      method: "DELETE",
      params: {
        hotel_id: hotelId,
        trip: trip
      },
      headers: headers
    });
    return response;
  } catch (error) {
    return error;
  }
};

const getActivities = async trip => {
  let headers = JSON.parse(localStorage.getItem("J-sunkAuth-Storage"));
  try {
    const response = await axios({
      url: "api/v1/activity_types",
      method: "GET",
      params: { trip: trip },
      headers: headers
    });
    return response;
  } catch (error) {
    return error;
  }
};

const getTrips = async () => {
  let headers = JSON.parse(localStorage.getItem("J-sunkAuth-Storage"));
  try {
    const response = await axios({
      url: "api/v1/trips",
      method: "GET",
      headers: headers
    });
    return response;
  } catch (error) {
    return error;
  }
};

const getTrip = async id => {
  let headers = JSON.parse(localStorage.getItem("J-sunkAuth-Storage"));
  try {
    const response = await axios({
      url: `api/v1/trips/${id}`,
      method: "GET",
      headers: headers
    });
    return response;
  } catch (error) {
    return error;
  }
};

const objectEraser = async (component, trip, restaurant) => {
  let headers = JSON.parse(localStorage.getItem("J-sunkAuth-Storage"));
  try {
    const response = await axios({
      method: "DELETE",
      url: `api/v1/${component}`,
      params: { trip: trip, activity_type: restaurant },
      headers: headers
    });
    return response;
  } catch (error) {
    return error;
  }
};

const rateTrip = async (id, rating) => {
  let headers = JSON.parse(localStorage.getItem("J-sunkAuth-Storage"));
  try {
    const response = await axios({
      url: `api/v1/ratings`,
      method: "POST",
      params: {
        trip: id,
        destination_rating: rating[0],
        activities_rating: rating[1],
        restaurants_rating: rating[2],
        hotel_rating: rating[3]
      },
      headers: headers
    });
    return response;
  } catch (error) {
    if (error.response.status) {
      try {
        const response = await axios({
          url: `api/v1/ratings/${id}`,
          method: "PUT",
          params: {
            trip: id,
            destination_rating: rating[0],
            activities_rating: rating[1],
            restaurants_rating: rating[2],
            hotel_rating: rating[3]
          },
          headers: headers
        });
        return response;
      } catch (error) {
        return error;
      }
    }
    return error;
  }
};

const getRatingsData = async id => {
  try {
    const response = await axios({
      url: `api/v1/ratings/${id}`,
      method: "GET"
    });
    return response;
  } catch (error) {
    return error;
  }
};

export {
  getCoords,
  initializeTrip,
  addActivityType,
  addHotels,
  addRestaurants,
  getHotels,
  chooseHotel,
  getActivities,
  objectEraser,
  getTrips,
  getRestaurants,
  getTrip,
  rateTrip,
  getRatingsData
};

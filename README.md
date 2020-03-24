# TripWiz Client

TripWiz is a trip planner, mainly for city get-aways, that provides the user with a custom itinerary based on selected data. User authentication through Facebook, and the client interface is built with React, while the backend is built in Rails.

## Deployed Site
https://tripwiz.netlify.com/

## Dependencies
- React 16.12.0
- react-redux 7.1.3
- axios 
- j-tockauth
- google-maps-react
- react-facebook
- react-scroll

## To run locally
#### Clone repository
```
$ git clone https://github.com/CraftAcademy/tripwiz_client.git
```
```
$ cd tripwiz_client
```

#### Install dependencies
Install Cypress and dependencies
```
$ yarn install
```
Install Cypress Testing
```
$ yarn add cypress --dev
```

## Run testing frameworks
In console:
Initialize and run cypress 
```
$ yarn cy:open
```

## Actions available to the user

Head to the deployed address listed above, or your local host with frontend running, run through the preferences to create your trip.

## Updates/Improvement plans
- Monetization through subscriptions and Stripe payments
- Your trips saved to your account
- Suggestions for most booked destinations
- Hotel and flight booking through amadeus-api

## License
Created under the <a href="https://en.wikipedia.org/wiki/MIT_License">MIT License</a>.
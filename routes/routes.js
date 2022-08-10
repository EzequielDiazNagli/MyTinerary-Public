const Router = require('express').Router();
const validator = require("../config/validator")
const passport = require("../config/passport")

const citiesControllers = require('../controllers/citiesControllers');
const {getCities, getOneCity, addCity, modifyCity, removeCity, multiplesCities} = citiesControllers

const itinerariesControllers = require('../controllers/itinerariesControllers');
const {getItinerary, getOneItinerary, addItinerary, modifyItinerary, removeItinerary, multiplesItinerary, findItineraryFromCity, likeDislike} = itinerariesControllers

const userControllers = require('../controllers/usersControllers');
const {signUp, logIn, verifyEmail, verifyToken} = userControllers

const activitiesControllers = require('../controllers/activitiesControllers');
const {getActivity, addActivity, modifyActivity, removeActivity, findActivityFromItinerary} = activitiesControllers

const commentsControllers = require("../controllers/commentsControllers");
const {addComment, modifyComment, deleteComment} = commentsControllers

Router.route('/cities')
.get(getCities)
.post(addCity)

Router.route('/cities/:id') 
.delete(removeCity)
.put(modifyCity) 
.get(getOneCity)

Router.route('/multiplesCities')
.post(multiplesCities)

// ITINERARY

Router.route("/itinerary")
.get(getItinerary)
.post(addItinerary)

Router.route('/itinerary/:id') 
.delete(removeItinerary)
.put(modifyItinerary) 
.get(getOneItinerary)

Router.route('/itinerary/cities/:id') 
.get(findItineraryFromCity)

Router.route('/multiplesItinerary')
.post(multiplesItinerary)

// USER

Router.route('/signUp')
.post(validator,signUp)

Router.route('/logIn')
.post(logIn)

Router.route("/verify/:string")
.get(verifyEmail)

// ACTIVITIES

Router.route("/activities")
.get(getActivity)
.post(addActivity)

Router.route('/activities/:id') 
.delete(removeActivity)
.put(modifyActivity) 
// .get(getOneItinerary)

Router.route('/activities/itinerary/:id') 
.get(findActivityFromItinerary)

// TOKEN

Router.route("/loginToken")
.get(passport.authenticate("jwt",{ session: false }), verifyToken)

// LIKES

Router.route('/itineraries/likeDislike/:id')
.put(passport.authenticate('jwt', {session:false}), likeDislike)

// COMMENTS

Router.route('/comments')
.post(passport.authenticate('jwt', {session: false}), addComment)
.put(passport.authenticate('jwt', {session: false}), modifyComment)

Router.route('/comments/:id')
.post(passport.authenticate('jwt', {session: false}), deleteComment)

module.exports = Router
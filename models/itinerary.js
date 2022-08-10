const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
    cityId: {type:mongoose.Types.ObjectId, ref: "cities"},
    name:{type:String, required:true},
    itineraryImage:{type:String, required:true},
    user:{type:String, required:true},
    userImage:{type:String, required:true},
    price:{type:String, required:true},
    duration: {type: String, required: true},
    hashtags: {type: Array, required: true},
    likes: [{type: String, required: true}],
    activities: [{type:mongoose.Types.ObjectId, ref: "activities"}],
    comments: [{
        comment: {type: String},
        userId: {type:mongoose.Types.ObjectId, ref:'users'}
    }]
})
const Itinerary = mongoose.model('itineraries', itinerarySchema)
module.exports = Itinerary
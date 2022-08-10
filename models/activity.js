const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema ({
    name: {type:String, required:true},
    image: {type: String, required: true},
})

const Activity = mongoose.model('activities', activitySchema)
module.exports = Activity
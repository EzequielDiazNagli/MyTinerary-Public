const Activity = require("../models/activity")

const activitiesControllers = {
    getActivity: async (req, res) => {
        let activities
        let error = null
        try {
            activities = await Activity.find()
            // console.log(activities)
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { activities },
            success: error ? false : true,
            error: error
        })
    },
    // getOneActivity: async (req, res) => {
    //     const id = req.params.id
    //     let activity
    //     let error = null
    //     try {
    //         activity = await Activity.findOne({ _id: id })
    //     } catch (err) { error = err }
    //     res.json({
    //         response: error ? 'ERROR' : activity,
    //         success: error ? false : true,
    //         error: error
    //     })
    // },
    addActivity: async (req, res) => {
        const { name, image, itineraryId } = req.body.data
        let activity
        let error = null
        try {
            activity = await new Activity({
                name: name,
                image: image,
                itineraryId: itineraryId
            }).save()
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : activity,
            success: error ? false : true,
            error: error
        })
    },
    // multiplesactivity: async (req, res) => {
    //     let activity = []
    //     const data = req.body.data //almaceno en la constante data la informacion que le pedi al body
    //     let error = null
    //     try {
    //         data.map(async (item) => {
    //             await new Activity({
    //                 name: item.name,
    //                 image: item.image,
    //                 itineraryId: item.itineraryId
    //             }).save()
    //         })
    //     } catch (err) { error = err }
    //     activity = await Activity.find()
    //     res.json({
    //         response: error ? "ERROR" : activity,
    //         success: error ? false : true,
    //         error: error
    //     })
    // },
    modifyActivity: async (req, res) => {
        const id = req.params.id
        const activity = req.body
        let activitydb
        let error = null
        try {
            activitydb = await Activity.findOneAndUpdate({ _id: id }, activity,{ new: true })
            
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : activitydb,
            success: error ? false : true,
            error: {error:error, message:"no es posible modificar la ciudad, verifica los datos enviados"}
        })
    },
    removeActivity: async (req,res) => { 
        const id = req.params.id
        let activity
        let error = null
        try {
            activity = await Activity.findOneAndDelete({_id: id })
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : activity,
            success: error ? false : true,
            error: error
        })
    },
    findActivityFromItinerary: async (req, res) => {
        let itinerary = req.params.id
        let activities;
        let error = null
        try {
            activities = await Activity.find({ itineraryId: itinerary })
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : activities,
            success: error ? false : true,
            error: error
        })
    },
}
module.exports = activitiesControllers
const Itinerary = require('../models/itinerary')

const itinerariesControllers = {
    getItinerary: async (req, res) => {
        let itineraries
        let error = null
        try {
            itineraries = await Itinerary.find().populate("comments.userId", {firstName:1,lastName:1,photo:1})
            // console.log(itineraries)
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { itineraries },
            success: error ? false : true,
            error: error
        })
    },
    getOneItinerary: async (req, res) => {
        const id = req.params.id
        let itinerary
        let error = null
        try {
            itinerary = await Itinerary.findOne({ _id: id }).populate("comments.userId", {firstName:1,lastName:1,photo:1})
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : itinerary,
            success: error ? false : true,
            error: error
        })
    },
    addItinerary: async (req, res) => {
        const { name, itineraryImage, user, userImage, price, duration, hashtags, likes, activities, cityId } = req.body.data
        let itinerary
        let error = null
        try {
            itinerary = await new Itinerary({
                name: name,
                itineraryImage: itineraryImage,
                user: user,
                userImage: userImage,
                price: price,
                duration: duration,
                hashtags: hashtags,
                likes: likes,
                activities: activities, 
                cityId: cityId
            }).save()
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : itinerary,
            success: error ? false : true,
            error: error
        })
    },
    multiplesItinerary: async (req, res) => {
        let itinerary = []
        const data = req.body.data //almaceno en la constante data la informacion que le pedi al body
        let error = null
        try {
            data.map(async (item) => {
                await new Itinerary({
                    name: item.name,
                    itineraryImage: item.itineraryImage,
                    user: item.user,
                    userImage: item.userImage,
                    price: item.price,
                    duration: item.duration,
                    hashtags: item.hashtags,
                    likes: item.likes,
                    activities: item.activities,
                    cityId: item.city
                }).save()
            })
        } catch (err) { error = err }
        itinerary = await Itinerary.find()
        res.json({
            response: error ? "ERROR" : itinerary,
            success: error ? false : true,
            error: error
        })
    },
    modifyItinerary: async (req, res) => {
        const id = req.params.id
        const itinerary = req.body
        let itinerarydb
        let error = null
        try {
            itinerarydb = await Itinerary.findOneAndUpdate({ _id: id }, itinerary,{ new: true })
            
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : itinerarydb,
            success: error ? false : true,
            error: {error:error, message:"no es posible modificar la ciudad, verifica los datos enviados"}
        })
    },
    removeItinerary: async (req,res) => { 
        const id = req.params.id
        let itinerary
        let error = null
        try {
            itinerary = await Itinerary.findOneAndDelete({_id: id })
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : itinerary,
            success: error ? false : true,
            error: error
        })
    },
    findItineraryFromCity: async (req, res) => {
        let city = req.params.id
        // console.log(city)
        let itineraries;
        let error = null
        try {
            itineraries = await Itinerary.find({ cityId: city }).populate("activities").populate("comments.userId", {firstName:1,lastName:1,photo:1}) // dentro de populate es la propiedad del modelo Itinerary
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : itineraries,
            success: error ? false : true,
            error: error
        })
    },
    likeDislike: async (req,res) => {
        let itineraryId = req.params.id // llega por parametro desde axios
        let user = req.user.id //llega por respuesta de passport
        try { 
            let itinerary = await Itinerary.findOne({_id:itineraryId})
            if (itinerary.likes.includes(user)) {
                Itinerary.findOneAndUpdate({_id:itineraryId}, {$pull:{likes:user}}, {new:true})
                    .then(response => 
                        res.json({
                        success: true,
                        response: response.likes,
                        message: `You disliked ${itinerary.name}`
                    }))
                    .catch(error => console.log(error))
            } else {
                Itinerary.findOneAndUpdate({_id:itineraryId}, {$push:{likes:user}}, {new:true})
                    .then(response => 
                        res.json({
                        success: true,
                        response: response.likes, 
                        message: `You liked ${itinerary.name}`
                    }))
                    .catch(error => console.log(error))
            }
        } catch (error) {
            res.json({
                response: error,
                success: false
            })
        } 
    }
}
module.exports = itinerariesControllers
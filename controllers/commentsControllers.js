const Itinerary = require('../models/itinerary')

const commentsControllers = {

    addComment: async (req, res) => {
        const {itinerary,comment} = req.body.comment
        // console.log(req.body.comment)
        const user = req.user._id
        try {
            const newComment = await Itinerary
                .findOneAndUpdate({_id: itinerary}, {$push: {comments: {comment: comment, userId: user}}}, {new: true})
                .populate("comments.userId", {firstName:1,lastName:1,email:1,photo:1})
            res.json({success: true,
                response: {newComment},
                message: "Thanks for comment"})
        }
        catch (error) {
            console.log(error)
            res.json({success: false,
                message: "Please, try again later"})
        }
    },

    modifyComment: async (req, res) => {
        const {commentId,comment} = req.body.comment
        // console.log(req.body)
        // const user = req.user._id
        try {
            const modifyComment = await Itinerary
            .findOneAndUpdate({"comments._id": commentId}, {$set: {"comments.$.comment": comment}}, {new: true})
            res.json({success: true,
                response: {modifyComment},
                message: "The comment has been modified"})
        }
        catch (error) {
            console.log(error)
            res.json({ success: true,
                message: "Please, try again"})
        }
    },

    deleteComment: async (req, res) => {
        //console.log('REQ.PARAMS')
        //console.log(req.params)
        //console.log('REQ.USER')
        //console.log(req.user)
        const commentId = req.params.id
        // const user = req.user._id
        try {
            const deleteComment = await Itinerary
            .findOneAndUpdate({"comments._id": commentId}, {$pull: {comments: {_id: commentId}}}, {new: true})
            res.json({success: true,
                response: {deleteComment},
                message: "The comment has been deleted"})
        }
        catch (error) {
            console.log(error)
            res.json({success: false,
                message: "Please, try again later"})
        }
    }
}

module.exports = commentsControllers
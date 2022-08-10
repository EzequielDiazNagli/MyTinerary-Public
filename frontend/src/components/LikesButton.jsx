import React from 'react'
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import Typography from '@mui/material/Typography';
import itineraryActions from '../redux/actions/itineraryActions'
import '../style/style.css'


function LikeButton({props}) {
    const [likes,setLikes] = useState([])
    const [reload,setReload] = useState(false)
    const userState = useSelector(store => store.userReducer.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(itineraryActions.getOneItinerary(props._id))
        .then(response => setLikes(response.likes))
    }, [!reload])

    async function likesOrDislikes() {
        await dispatch(itineraryActions.likeDislike(props._id))
        setReload(!reload)
    }

    function logInPlease() {
        dispatch({
            type: 'message',
            payload: {view: true, message: 'Please, login first', success: false}
        })
    }

    return (
        <>
            {userState ?
                <IconButton onClick={likesOrDislikes} aria-label="add to favorites">
                {likes.includes(userState.id) ?
                    <FavoriteIcon/>
                    :
                    <FavoriteBorderIcon/>}
                    <Typography>{likes.length} likes</Typography>
                </IconButton>
                :
                <IconButton onClick={logInPlease} aria-label="add to favorites">
                    <FavoriteBorderIcon/>
                    <Typography>{likes.length} likes</Typography>
                </IconButton>
            }
        </>
    )
}

export default LikeButton
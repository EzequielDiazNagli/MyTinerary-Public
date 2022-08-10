import React from "react";
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import "../style/style.css";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import commentsActions from "../redux/actions/commentsActions";
import itineraryActions from "../redux/actions/itineraryActions";
import { Link, useParams } from 'react-router-dom';
import CommentIcon from '@mui/icons-material/Comment';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Link as LinkRouter} from "react-router-dom"
// import Divider from '@mui/material/Divider';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Stack from '@mui/material/Stack';
// import EditIcon from '@mui/icons-material/Edit';

import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import CommentsEdits from "./CommentsEdits";
import { Stack } from "@mui/material";


const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
    color: '#1f766c',
    },
    '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
    '& fieldset': {
    borderColor: 'grey',
    },
    '&:hover fieldset': {
    borderColor: 'dark',
    },
    '&.Mui-focused fieldset': {
    borderColor: '#1f766c',
    },
    },
});

function App({props}) {
    const id = useParams()
    const [itinerary, setItinerary] = useState()
    const [inputText, setInputText] = useState("")
    const [reload, setReload] = useState(false)
    const userState = useSelector(store => store.userReducer.user)
    const dispatch = useDispatch()

    let handleReload = () => {
        setReload(!reload);
    };
    // function changeReload(){
    //     setReload(!reload);
    // };

    useEffect(() => {
        dispatch(itineraryActions.getOneItinerary(props._id))
        .then(response => setItinerary(response))
    }, [reload])

    async function uploadCom(event) {
    const comment = {
        itinerary: itinerary._id,
        comment: inputText,
        }
    await dispatch(commentsActions.addComment(comment))
    .then(response => setItinerary(response.data.response.newComment), setInputText(""))
    document.querySelector("#newComment").textContent = ""
    setReload(!reload)
    }

return (
<div style={{ paddingTop: 14, paddingLeft:14, paddingRight:14 }} className="App">
    <h3>Comments</h3>
    {itinerary?.comments.map(comment =>
        <Box>
        {comment.userId?._id === userState?.id ?
            <CommentsEdits comment={comment} handleReload={handleReload} />
            :
            <Paper key={comment._id} style={{ padding: "20px 20px", marginTop: 10 }}>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar alt="Remy Sharp" src={comment.userId.photo} sx={{marginTop: 0.5}}/>
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                    <Box sx={{display: "flex",justifyContent:"space-between"}}>
                        <Box sx={{display: "flex",alignItems: "center"}}>
                            <h4 style={{ margin: 0, textAlign: "left" }}>{comment.userId.firstName} {comment.userId.lastName}</h4>
                        </Box>
                    </Box>
                    <p style={{ textAlign: "left" }}>
                        {comment.comment}
                    </p>
                </Grid>
            </Grid>
        </Paper>
        }
        </Box>
    )}

    { userState ?
    <Box sx={{
        my: 2,
        display: "flex",
        justifyContent: "center"
    }}>
        {/* <div id="newComment" label="Add Comment" variant="outlined" onKeyUp={(event) => setInputText(event.currentTarget.textContent)} contentEditable </div> */}
        <CssTextField id="newComment" label="Add Comment" variant="outlined" onInput={(event) => setInputText(event.target.value)} suppressContentEditableWarning={true} contentEditable
        sx={{
        marginRight: 1,
        width: "100%"
        }}
        />
        <Button className="formBtn" onClick={uploadCom} variant="contained" endIcon={<SendIcon />} sx={{bgcolor: '#41788f'}}>
        Add
        </Button>
    </Box>
    :
    <Box sx={{display: "flex",
            justifyContent: "center",
            alignItems: "center"}}>
        <Box sx={{maxWidth: 400}}>
            <Paper elevation={6} sx={{marginTop: 2,
            minHeight: 40,
            }}>
                <Box sx={{py: 1, px:2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"}}>
                    <CommentIcon sx={{color: "gray",
                    marginRight: 1}}/>
                    <Typography sx={{fontWeight: "bold"}}>Please, login to leave a comment</Typography>
                </Box>
                <Box sx={{ '& button': { m: 1 },
                display:"flex", justifyContent:"center", alignItems:"center"
                }}>
                    <Button variant="contained" size="small" sx={{bgcolor: '#41788f'}} className="formBtn">
                        <LinkRouter to={"/LogIn"} className='buttonLogInSignIn'>
                            Log In
                        </LinkRouter>
                    </Button>
                        <Typography sx={{px:1}}>
                            Or
                        </Typography>
                    <Button variant="contained" size="small" sx={{bgcolor: '#41788f'}} className="formBtn">
                        <LinkRouter to={"/SignUp"} className='buttonLogInSignIn'>
                            Sign Up
                        </LinkRouter>
                    </Button>
                </Box>
            </Paper>
        </Box>
    </Box>
    }
</div>
);
}

export default App
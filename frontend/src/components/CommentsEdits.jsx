import React from "react";
import {useState} from "react"
import {useDispatch} from "react-redux"
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import "../style/style.css";
import Box from '@mui/material/Box';
import commentsActions from "../redux/actions/commentsActions";
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import Divider from '@mui/material/Divider';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Stack from '@mui/material/Stack';
// import EditIcon from '@mui/icons-material/Edit';

import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

const ITEM_HEIGHT = 48;

export default function CommentsEdits ({comment, handleReload}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };

    const [modify, setModify] = useState()
    const dispatch = useDispatch()

    async function modifyCom(event) {
        const comment = {
            commentId: event.target.id,
            comment: modify,
            }
        await dispatch(commentsActions.modifyComment(comment))
        handleReload()
        }
        
        async function deleteCom(event) {
            await dispatch(commentsActions.deleteComment(event.target.id))
            handleReload()
        }

    return (
            <Paper style={{ padding: "20px 20px", marginTop: 10 }}>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar alt="Remy Sharp" src={comment.userId.photo} sx={{marginTop: 0.8}}/>
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                    <Box sx={{display: "flex",justifyContent:"space-between"}}>
                        <Box sx={{display: "flex",alignItems: "center"}}>
                            <h4 style={{ margin: 0, textAlign: "left" }}>{comment.userId.firstName} {comment.userId.lastName}</h4>
                        </Box>
                        <Box sx={{display: "flex",alignItems: "center"}}>
                            <div>
                                {/* <IconButton
                                aria-label="more"
                                sx={{height: "10px"}}
                                id="long-button"
                                aria-controls={open ? 'long-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}>
                                    <MoreVertIcon />
                                </IconButton> */}
                                    <Fab className="formBtn"
                                    aria-label="more"
                                    sx={{height: 15, width: 35, bgcolor: '#41788f'}}
                                    id="long-button"
                                    aria-controls={open ? 'long-menu' : undefined}
                                    aria-expanded={open ? 'true' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleClick}>
                                        <EditIcon sx={{width: 15, color: "white"}}/>
                                    </Fab>
                                <Menu id="long-menu" MenuListProps={{'aria-labelledby': 'long-button'}}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    PaperProps={{style: {maxHeight: ITEM_HEIGHT * 4.5, width: '10ch'}
                                }}>
                                    <MenuItem onClick={handleClose}>
                                        <Typography id={comment._id} onClick={modifyCom}>
                                            Edit
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <Typography id={comment._id} onClick={deleteCom}>
                                            Delete
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </div>
                        </Box>
                    </Box>
                    <div type="text" style={{ textAlign: "left", width: "95%"}} onInput={(event)=>
                        setModify(event.currentTarget.textContent)} suppressContentEditableWarning={true}
                        contentEditable >
                        {comment.comment}
                    </div>
                </Grid>
            </Grid>
        </Paper>
    )
}
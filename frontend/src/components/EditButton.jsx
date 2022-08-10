// import React from "react";
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Fab from '@mui/material/Fab';
// import EditIcon from '@mui/icons-material/Edit';

// const ITEM_HEIGHT = 48;

// export default function EditButton({props}, {data}, {data1}) {
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const open = Boolean(anchorEl);
//     const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//     };
//     const handleClose = () => {
//     setAnchorEl(null);
//     };
//     <Box sx={{display: "flex",alignItems: "center"}}>
//         <div>
//             {/* <IconButton
//             aria-label="more"
//             sx={{height: "10px"}}
//             id="long-button"
//             aria-controls={open ? 'long-menu' : undefined}
//             aria-expanded={open ? 'true' : undefined}
//             aria-haspopup="true"
//             onClick={handleClick}>
//                 <MoreVertIcon />
//             </IconButton> */}
//                 <Fab className="formBtn"
//                 aria-label="more"
//                 sx={{height: 15, width: 35, bgcolor: '#41788f'}}
//                 id="long-button"
//                 aria-controls={open ? 'long-menu' : undefined}
//                 aria-expanded={open ? 'true' : undefined}
//                 aria-haspopup="true"
//                 onClick={handleClick}>
//                         <EditIcon sx={{width: 15, color: "white"}}/>
//                 </Fab>
//             <Menu id="long-menu" MenuListProps={{'aria-labelledby': 'long-button'}}
//                 anchorEl={anchorEl}
//                 open={open}
//                 onClose={handleClose}
//                 PaperProps={{style: {maxHeight: ITEM_HEIGHT * 4.5, width: '10ch'}
//             }}>
//                 <MenuItem onClick={handleClose}>
//                     <Typography id={props.comment._id} onClick={data.modifyCom}>
//                         Edit
//                     </Typography>
//                 </MenuItem>
//                 <MenuItem onClick={handleClose}>
//                     <Typography id={props.comment._id} onClick={data1.deleteCom}>
//                         Delete
//                     </Typography>
//                     </MenuItem>
//             </Menu>
//         </div>
//     </Box>
// }
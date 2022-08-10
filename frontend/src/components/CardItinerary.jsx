import React from "react"
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import LikesButton from "./LikesButton"
import CommentsBox from "./CommentsBox"

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";


function CardItinerary ({data}) {

    // console.log(data);

    let emoji = "💵"

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
        })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
    }));

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
    setExpanded(!expanded);
    };

    return (
        <Card className="card-itinerary">
            <div className="card-itinerary-top">
                <div className="card-itinerary-A">
                    <CardMedia className="card-itinerary-A-cardMedia"
                    component="img"
                    height="100%"
                    image={data.itineraryImage}
                    alt="green iguana"
                    />
                </div>
                <div className="card-itinerary-B">
                    <CardContent>
                    <h3>{data.name}</h3>
                    </CardContent>
                    <CardHeader 
                    avatar={
                    <Avatar sx={{ bgcolor: red[500], width: 80, height: 80}} aria-label="recipe">
                    <img className="user-img" src={data.userImage} alt="" />
                    </Avatar>
                    }
                    // action={
                    // <IconButton aria-label="settings">
                    // <MoreVertIcon />
                    // </IconButton>
                    // }
                    title={data.user}
                    // subheader="September 14, 2016"
                    />
                    <CardContent className="hashtags">
                        {data.hashtags.map((hash,index) => <p key={index}>#{hash}</p>)}
                    </CardContent>
                    <CardContent className="price">
                    <p>Price: {emoji.repeat(data.price)}</p>
                    <p>Duration: {data.duration}hs</p>
                    </CardContent>
                    <div>
                        <LikesButton props={data}/>
                        <IconButton aria-label="share">
                        <ShareIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
            <div className="itinerary-expand">
                <CardActions disableSpacing>
                    <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse className="container-itinerary-activities" in={expanded} timeout="auto" unmountOnExit>

                <CardContent className="itinerary-activities">
                    {data.activities.length > 0 ?
                    data.activities.map((act) => {
                        // console.log(act)
                        return (
                            <Box className="itinerary-activity" key={act._id}>
                                <Box className="itinerary-activities-img">
                                    <CardMedia className="activities-cardmedia" component="img" height="100%"
                                    image={act.image}
                                    alt="green iguana"
                                    />
                                </Box>
                                <Box className="itinerary-activities-buttom">
                                    <h3>{act.name}</h3>
                                </Box>
                            </Box>
                        )
                    })
                    :
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                        }}>
                        <Typography>
                            <h2> There is no activities yet</h2>
                        </Typography>
                    </Box>}
                </CardContent>
                <CommentsBox props={data}/>
                </Collapse>
            </div>
        </Card>
    )
}

export default CardItinerary
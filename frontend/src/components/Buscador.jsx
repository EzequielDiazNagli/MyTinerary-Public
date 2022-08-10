import React from "react"
import {useState} from "react"
import MapCity from "./MapCity"
import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";

import {useSelector} from 'react-redux'
// import citiesActions from "./redux/actions/citiesActions";

import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

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

function Buscador(){
    const [inputValue, setInputValue] = useState ("")

    // const dispatch = useDispatch()
    // despacho acciones al store
    //dispatch trae acciones y useSelector trae estados del componente

    // useEffect(() => {
    //     dispatch(citiesActions.getCities())
    // },[])
    // despacho la obtencion de ciudades 


    const citiesRedux = useSelector(store => store.citiesReducer.cities)
    // Ciudades del Store

    // let cities = cities.filter(city =>
    //     city.name.toLowerCase().startsWith(inputValue.toLowerCase())
    // )

    return (
        <div className="cities-contenedor">
            <div className="search">
                <Box className="search-box" sx={{maxWidth: "100%" }}>
                    <CssTextField fullWidth label="Search" id="fullWidth" onKeyUp={e => {setInputValue(e.target.value)}} type="text" />
                </Box>
            </div>
            <div className="cities-list">
            <MapCity input={inputValue} cities={citiesRedux}/>
            </div>
        </div>
    )
}

export default Buscador
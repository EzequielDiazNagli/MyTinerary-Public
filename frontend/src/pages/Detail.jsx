import React from "react";
import {useParams} from "react-router-dom";
import { useEffect } from "react";

import {useDispatch, useSelector} from 'react-redux'
import citiesActions from "../redux/actions/citiesActions";
import itineraryActions from "../redux/actions/itineraryActions";

import CardItinerary from "../components/CardItinerary"
import NoItinerary from "../components/NoItinerary"

import {Link as LinkRouter} from "react-router-dom"
import Btn from "../components/Btn"

function Detail () {


    const {id} = useParams()
    // const [cities, setCities] = useState ([])
    // console.log(id);

    const dispatch = useDispatch()

    // useEffect(() => {
    // axios.get(`http://localhost:4000/api/cities/${id}`)
    // .then(respuesta => setCities(respuesta.data.response))},[])

    useEffect(() => {
        dispatch(citiesActions.getOneCity(id))
        // eslint-disable-next-line
    },[])

    const city = useSelector(store => store.citiesReducer.oneCity)

    useEffect(() => {
        dispatch(itineraryActions.findItineraryFromCity(id))
        // eslint-disable-next-line
    },[])

    const itinerary = useSelector(store => store.itineraryReducer.oneItinerary)
    // console.log(itinerary);

    return(
        <>
        <div className='cities-details' key={city?._id} style={{backgroundImage:`url("${city?.image}")`, backgroundSize: "cover", backgroundPosition: "center"}}>
                <div className="city-details-name">
                    <h4>{city?.name}</h4>
                    <h5>{city?.country}</h5>
                </div>
        </div>
        <div className="cities-details-main">
            {itinerary.length > 0 ?
            itinerary.map(iti => {
                return (
                <div className="contenedor" key={iti._id}>
                    <CardItinerary data={iti}/>
                </div>
            )
            }) : <NoItinerary/> }
            <div className="btn-back">
                <LinkRouter to="/Cities" className="link-backToCities">
                    <Btn/>
                </LinkRouter>
        </div>
        </div>
        </>
    )
}

// export default Detail
// const mapStateToProps = (state) => {
//     return {
//     oneCity: state.citiesReducer.cities,
//     auxiliar: state.citiesReducer.auxiliar
//     }
// }
// (mapStateToProps, null)(Detail)

export default Detail
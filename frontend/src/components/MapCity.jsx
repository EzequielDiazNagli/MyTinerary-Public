import * as React from 'react';
import Card from '@mui/material/Card';
import {Link as LinkRouter} from "react-router-dom"
import "../style/style.css"
import { useEffect } from 'react';
import NoResults from './NoResults';

import {useDispatch, useSelector} from 'react-redux'
import citiesActions from "../redux/actions/citiesActions";

export default function ActionAreaCard(props) {

    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(citiesActions.filterCities(props.input))
        // eslint-disable-next-line
    },[props.input])

    const filterRedux = useSelector(store => store.citiesReducer.filterCity)

    let data = props.input ? filterRedux : props.cities

    return (data.length > 0 ?
        data.map(City => {
            return (
                <Card className='cities-cards' key={City._id} >
                    <LinkRouter to={`/City/${City._id}`} className="linkRouter-cities">
                    <img src={City.image} alt="" />
                    <div className='cities-cards-name'>
                        <h3>{City.name}</h3>
                        <h4>{City.country}</h4>
                    </div>
                    <div className='cities-cards-description'>
                        <h3>{City.name}</h3>
                        <p>{City.description}</p>
                        <button href="#">Read more</button>
                    </div>
                    </LinkRouter>
                </Card>
                )
            }
        ) : <NoResults/>
    )
}


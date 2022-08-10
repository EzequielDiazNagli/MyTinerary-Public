import axios from 'axios';

const citiesActions = {

    getCities: () => {
        return async (dispatch, getState) => {
            const res = await axios.get('https://mytinerary-diaz-backend.herokuapp.com/api/cities')
            dispatch({ type: 'GET_CITIES', payload: res.data.response.cities })
        }
    },
    getOneCity: (id) => {
        return async (dispatch, getState) => {
            const res = await axios.get(`https://mytinerary-diaz-backend.herokuapp.com/api/cities/${id}`)
            dispatch({ type: 'GET_ONE_CITY', payload: res.data.response})
        }
    },
    filterCities: (inputValue) => {
        return (dispatch,getState)=>{
            dispatch({type:'FILTER_CITIES', payload:inputValue})
        }
    },
}

export default citiesActions;
import axios from 'axios';

const itineraryActions = {

    getItinerary: () => {
        return async (dispatch, getState) => {
            const res = await axios.get('https://mytinerary-diaz-backend.herokuapp.comapi/itinerary')
            dispatch({ type: 'GET_ITINERARIES', payload: res.data.response.itineraries })
        }
    },
    findItineraryFromCity: (id) => {
        return async (dispatch, getState) => {
            const res = await axios.get(`https://mytinerary-diaz-backend.herokuapp.com/api/itinerary/cities/${id}`)
            // console.log(res);
            dispatch({ 
                type: 'FIND_ITINERARY_FROM_CITY', 
                payload: res.data.response})
                return res
        }
    },
    getOneItinerary: (id) => {
        // console.log(id)
        return async() => {
            try {
                const answer = await axios.get(`https://mytinerary-diaz-backend.herokuapp.com/api/itinerary/${id}`)
                // console.log(answer)
                return answer.data.response
            }catch (err) {
                console.log(err)
            }
        }
    },
    likeDislike: (itineraryId) => {
        const token = localStorage.getItem('token')
        return async(dispatch, getState) => {
            try {
                const answer = await axios.put(`https://mytinerary-diaz-backend.herokuapp.com/api/itineraries/likeDislike/${itineraryId}`,{},
                    {headers: {Authorization: "Bearer "+token}}
                )
                dispatch({ 
                    type: 'message',
                    payload: {
                        view: true,
                        message: answer.data.message,
                        success: answer.data.success
                    }
                })
                return answer.data.response
            }catch (err) {
                console.log(err)
            }
        }
    },
}

export default itineraryActions
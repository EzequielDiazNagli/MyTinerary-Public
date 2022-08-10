const initialState = {
    itinerary: [],
    oneItinerary: [],
}
// Estado inicial del reductor


const itineraryReducer = (state = initialState, action) => {
    // Se define el reductor que depende de un estado inicial y una accion
        
    switch (action.type) { // establece la condición en cada case
        case 'GET_ITINERARIES':
            return {
                ...state,
                itinerary: action.payload,
            }
        case "FIND_ITINERARY_FROM_CITY":
            return {
                ...state,
                oneItinerary: action.payload,
            }
        default:
            return state
    }
}
export default itineraryReducer
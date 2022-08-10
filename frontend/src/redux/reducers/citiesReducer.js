const initialState = {
    cities: [],
    oneCity: [],
    filterCity: []
}
// Estado inicial del reductor


const citiesReducer = (state = initialState, action) => {
    // Se define el reductor que depende de un estado inicial y una accion
        
    switch (action.type) { // establece la condición en cada case
        case 'GET_CITIES':
            return {
                ...state,
                cities: action.payload,
            }
        case "GET_ONE_CITY":
            return {
                ...state,
                oneCity: action.payload,
            }
        case 'FILTER_CITIES':
            let filter = state.cities.filter(city => city.name.toLowerCase().startsWith(action.payload.toLowerCase().trim()))
            return {                        
                ...state,
                filterCity: filter
            }
        default:
            return state
    }
}
export default citiesReducer
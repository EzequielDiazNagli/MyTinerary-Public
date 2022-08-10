import axios from "axios"


const commentsActions = {

    addComment: (comment) => {
        // console.log(comment)
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            if (comment.comment !== "") {
                const res = await axios.post('https://mytinerary-diaz-backend.herokuapp.com/api/comments', { comment }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                // console.log(res)
                dispatch({
                    type: 'message',
                    payload: {
                        view: true,
                        message: res.data.message,
                        success: res.data.success
                    }
                })
                return res
            }
            else {
                dispatch({
                    type: 'message',
                    payload: {
                        view: true,
                        message: "The comment cannot be empty",
                        success: false
                    }
                })
            }
        }
    },
    modifyComment: (comment) => {
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const res = await axios.put('https://mytinerary-diaz-backend.herokuapp.com/api/comments', { comment }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            // console.log(res)
            dispatch({
                type: 'message',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })
            return res
        }
    },
    deleteComment: (id) => {
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const res = await axios.post(`https://mytinerary-diaz-backend.herokuapp.com/api/comments/${id}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: 'message',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })
            return res
        }
    }
}

export default commentsActions
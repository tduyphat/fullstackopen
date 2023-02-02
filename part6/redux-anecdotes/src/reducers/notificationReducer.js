const initialState = ''

const notificationReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'CREATED':
            return action.data
        default:
            return state
    }
}

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const createNotification = (notification, time) => {
    return async dispatch => {
        dispatch({
            type: 'CREATED',
            data: notification
        })
        await timeout(time)
        dispatch({
            type: 'CREATED',
            data: ''
        })
    }
}

export default notificationReducer
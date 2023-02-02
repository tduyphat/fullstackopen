const initialState = ''

const notificationReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'CREATED':
            return action.data.notification
        default:
            return state
    }
}

export const createNotification = (notification) => {
    return {
        type: 'CREATED',
        data: {
            notification
        }
    }
}

export default notificationReducer
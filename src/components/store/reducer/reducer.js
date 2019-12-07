import * as ActionTypes from "../actions/actions";

const initialState = {
    tasks: [{
        summary: "sample task"
    }],
    showCard: false
}


export const reducer = (state = initialState, action) => {
    switch (action.type) {   
        case 'DISPLAY_CARD':
                return {
                    ...state,
                    showCard: !state.showCard
                };
        case 'ADD_TASK':
            const newTasks = [].concat(state.tasks);
            return {
                ...state,
                tasks: newTasks.concat(action.payload)
            };
        case 'DELETE_TASK':
            const tasksList = [].concat(state.tasks);
            return {
                ...state,
                tasks: tasksList.splice(1, action.payload)
            };
        default:
            return state
    }
}
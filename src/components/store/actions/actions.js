const ActionTypes = {
    DISPLAY_CARD : 'DISPLAY_CARD',
    DELETE_TASK : 'DELETE_TASK',
    EDIT_TASK : 'EDIT_TASK',
    ADD_TASK : 'ADD_TASK'
}

export const displayCard = () => ({
    type: ActionTypes.DISPLAY_CARD
});

export const deleteTask = (id) => ({
    type: ActionTypes.DELETE_TASK,
    payload: id
});

export const editTask = () => ({
    type: ActionTypes.EDIT_TASK
});

export const addTask = (task) => ({
    type: ActionTypes.ADD_TASK,
    payload: task
});





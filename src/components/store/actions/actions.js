const ActionTypes = {
    DISPLAY_CARD : 'DISPLAY_CARD',
    DELETE_TASK : 'DELETE_TASK',
    EDIT_TASK : 'EDIT_TASK',
    TOGGLE_EDIT_MODAL: 'TOGGLE_EDIT_MODAL',
    REPLACE_TASK : 'REPLACE_TASK',
    ADD_TASK: 'ADD_TASK',
    MARK_AS_DONE: 'MARK_AS_DONE',
    REOPEN_TASK: 'REOPEN_TASK'
}

export const displayCard = () => ({
    type: ActionTypes.DISPLAY_CARD
});

export const deleteTask = (id) => ({
    type: ActionTypes.DELETE_TASK,
    payload: id
});

export const editTask = (task) => ({
    type: ActionTypes.EDIT_TASK,
    payload: task
});

export const addTask = (task) => ({
    type: ActionTypes.ADD_TASK,
    payload: task
});

export const toggleEditModal = () => ({
    type: ActionTypes.TOGGLE_EDIT_MODAL
})

export const selectedIndex = (index) => ({
    type: ActionTypes.SELECTED_SUMMARY
})

export const replaceTask = (task) => ({
    type: ActionTypes.REPLACE_TASK,
    payload: task
})

export const markAsDone = (task) => ({
    type: ActionTypes.MARK_AS_DONE,
    payload: task
})

export const reOpenTask = (task) => ({
    type: ActionTypes.REOPEN_TASK,
    payload: task
})


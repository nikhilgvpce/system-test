const ActionTypes = {
    DELETE_TASK : 'DELETE_TASK',
    EDIT_TASK : 'EDIT_TASK',
    TOGGLE_MODAL: 'TOGGLE_MODAL',
    REPLACE_TASK : 'REPLACE_TASK',
    ADD_TASK: 'ADD_TASK',
    MARK_AS_DONE: 'MARK_AS_DONE',
    REOPEN_TASK: 'REOPEN_TASK',
    TOGGLE_ALERT: 'TOGGLE_ALERT',
    GROUP_BY: 'GROUP_BY',
    TOGGLE_EDIT_MODAL : 'TOGGLE_EDIT_MODAL'
}

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

export const toggleModal = () => ({
    type: ActionTypes.TOGGLE_MODAL
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

export const toggleAlert = () => ({
    type: ActionTypes.TOGGLE_ALERT
})

export const groupBy = (property) => ({
    type: ActionTypes.GROUP_BY,
    payload: property
})

export const toggleEditModal = () => ({
    type: ActionTypes.TOGGLE_EDIT_MODAL
})
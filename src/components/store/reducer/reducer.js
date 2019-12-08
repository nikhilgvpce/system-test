
const initialState = {
    tasks: [],
    showEditModal: false,
    showCard: false,
    selectedTask: null,
    allTasks: [],
    doneTasks: [],
    showAlert: true
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
            const allTasks = [].concat(state.allTasks);
            const id = state.tasks.length;
            action.payload["id"] = id;
            return {
                ...state,
                allTasks: allTasks.concat(action.payload),
                tasks: newTasks.concat(action.payload)
            };
        case 'DELETE_TASK':
            const tasksList = [].concat(state.tasks);
            tasksList.splice(action.payload.id, 1)
            return {
                ...state,
                tasks: tasksList
            };
        case 'TOGGLE_EDIT_MODAL':
            return {
                ...state,
                showEditModal: !state.showEditModal
            }
        case 'EDIT_TASK':
            return {
                ...state,
                selectedTask: action.payload
            }
        case 'REPLACE_TASK':
            const updatedTasks = getUpdatedTasks(state.tasks, action.payload);
            return {
                ...state,
                tasks: updatedTasks
            }
        case 'MARK_AS_DONE':
            const oldTasks = [].concat(state.tasks);
            const doneTask = oldTasks.splice(action.payload.id, 1);
            let totalDoneTasks = [].concat(state.doneTasks);
            return {
                ...state,
                tasks: oldTasks,
                doneTasks: totalDoneTasks.concat(doneTask)
            };
        case 'REOPEN_TASK':
            const doneTasks = state.doneTasks;
            doneTasks.splice(action.payload.id, 1);
            const existingTasks = [].concat(state.tasks);
            const _id = state.tasks.length;
            action.payload["id"] = _id;
            return {
                ...state,
                tasks: existingTasks.concat(action.payload),
                doneTasks: [].concat(doneTasks)
            }
        case 'TOGGLE_ALERT':
            const show = state.allTasks.length === 0;
            return {
                ...state,
                showAlert: show
            }
        default:
            return state
    }
}

const getUpdatedTasks = (tasks, editedTask) => {
    const id = editedTask.id;
    const updatedTasks = tasks.map(task => {
        if (task.id === id) {
            task = editedTask;
        }
        return task;
    });
    return updatedTasks;
}
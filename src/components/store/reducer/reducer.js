
const initialState = {
    taskId: 0,
    tasks: [], // pending tasks
    showModal: false,
    selectedTask: null,
    allTasks: [],
    doneTasks: [],
    showAlert: true,
    groupByProperty: null,
    grpByNoneAllTasks: [],
    grpByNoneDoneTasks: [],
    grpByNoneTasks: [],
}


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            const newTasks = [].concat(state.tasks);
            const newAllTasks = [].concat(state.allTasks);
            let id = state.taskId;
            action.payload["id"] = id;
            return {
                ...state,
                allTasks: newAllTasks.concat(action.payload),
                tasks: newTasks.concat(action.payload),
                taskId: id + 1
            };
           
        case 'DELETE_TASK':
            const tasksList = [].concat(state.tasks);
            const allTasksList = [].concat(state.allTasks);
            let indx = findIndex(action.payload, state.tasks);
            tasksList.splice(indx, 1);
            indx = findIndex(action.payload, state.allTasks);
            allTasksList.splice(indx, 1);
            return {
                ...state,
                tasks: [].concat(tasksList),
                allTasks: [].concat(allTasksList)
            };
        case 'TOGGLE_MODAL':
            return {
                ...state,
                showModal: !state.showModal
            }
        case 'EDIT_TASK':
            return {
                ...state,
                selectedTask: action.payload
            }
        case 'REPLACE_TASK':
            // const updatedTasks = getUpdatedTasks(state.tasks, action.payload);
            let getIndx = findIndex(action.payload, state.tasks);
            const currentPending = state.tasks;
            currentPending[getIndx] = action.payload;
            const currentAllTasks = state.allTasks;
            getIndx = findIndex(action.payload, currentAllTasks);
            currentAllTasks[getIndx] = action.payload;
            return {
                ...state,
                tasks: [].concat(currentPending),
                allTasks: [].concat(currentAllTasks),
                selectedTask: null
            }
        case 'MARK_AS_DONE':
            const oldTasks = [].concat(state.tasks);
            const index = findIndex(action.payload, oldTasks);
            const markAsDoneTask = oldTasks.splice(index, 1);
            let totalDoneTasks = [].concat(state.doneTasks);
            return {
                ...state,
                tasks: oldTasks,
                doneTasks: totalDoneTasks.concat(markAsDoneTask)
            };
        case 'REOPEN_TASK':
            const doneTasks = state.doneTasks;
            const i = findIndex(action.payload, doneTasks);
            doneTasks.splice(i, 1);
            const existingTasks = [].concat(state.tasks);
            const _id = state.taskId;
            action.payload["id"] = _id;
            return {
                ...state,
                tasks: existingTasks.concat(action.payload),
                doneTasks: [].concat(doneTasks),
                tasksId: _id + 1
            }
        case 'TOGGLE_ALERT':
            const show = state.allTasks.length === 0;
            return {
                ...state,
                showAlert: show
            }
        case 'GROUP_BY':
            const groupByProperty = action.payload;
            const grpByNoneAllTasks = [].concat(state.grpByNoneAllTasks);
            const grpByNoneDoneTasks = [].concat(state.grpByNoneDoneTasks);
            const grpByNoneTasks = [].concat(state.grpByNoneTasks);
            let allTasks = []; let completedTasks = []; let tasks = [];
            if (groupByProperty === "Priority") {
                allTasks = groupByPriority(state.allTasks);
                completedTasks = groupByPriority(state.doneTasks);
                tasks = groupByPriority(state.tasks);
            } else if (groupByProperty === "Created On") {
                allTasks = state.allTasks.sort(groupByDate);
                completedTasks = state.doneTasks.sort(groupByDate);
                tasks = state.tasks.sort(groupByDate);
            } else if (groupByProperty === "Pending On") {
                allTasks = state.allTasks.sort(groupByDatePending);
                completedTasks = state.doneTasks.sort(groupByDatePending);
                tasks = state.tasks.sort(groupByDatePending);
            }
            return {
                ...state,
                grpByNoneAllTasks: grpByNoneAllTasks.concat(state.allTasks),
                grpByNoneDoneTasks: grpByNoneDoneTasks.concat(state.doneTasks),
                grpByNoneTasks: grpByNoneTasks.concat(state.tasks),
                tasks: tasks,
                allTasks: allTasks,
                doneTasks: completedTasks
            }
        default:
            return state
    }
}

const findIndex = (task, taskList) => {
    let indx = -1;
    const index = taskList.find((t, index) => {
        if (t.id === task.id) {
            return indx = index;
        } });
    return indx;
}

const groupByPriority = (tasks) => {
    const highPr = [];
    const lowPr = [];
    const noPr = [];
    tasks.forEach(task => {
        if (task.priority === "High") {
            highPr.push(task)
        } else if (task.priority === "Low") {
            lowPr.push(task);
        } else {
            noPr.push(task);
        }
    });
    const updatedTasks = [].concat(highPr, lowPr, noPr);
    return updatedTasks;
}

const groupByDate = (a, b) => {

    var dateA = new Date(a.createdDate).getTime();
    var dateB = new Date(b.createdDate).getTime();
    if (dateA > dateB) {
        return 1;
    } else if (dateA < dateB) {
        return -1;
    } else {
        return 0;
    }
}

const groupByDatePending = (a, b) => {
    var dateA = new Date(a.DueDate).getTime();
    var dateB = new Date(b.DueDate).getTime();
    if (dateA > dateB) {
        return 1;
    } else if (dateA < dateB) {
        return -1;
    } else {
        return 0;
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
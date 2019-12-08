
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
    showEditModal: false
}


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            const newTasks = [].concat(state.tasks);
            const newAllTasks = [].concat(state.allTasks);
            let id = state.taskId;
            action.payload["id"] = id;
            action.payload["status"] = "pending";
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
            let index = findIndex(action.payload, oldTasks);
            const markAsDoneTask = oldTasks.splice(index, 1);
            markAsDoneTask['status'] = "done";
            let totalDoneTasks = [].concat(state.doneTasks);
            let allTasksArr = [].concat(state.allTasks);
            index = findIndex(action.payload, allTasksArr);
            action.payload["status"] = "done";
            allTasksArr[index] = action.payload;
            return {
                ...state,
                tasks: oldTasks,
                allTasks: [].concat(allTasksArr),
                doneTasks: totalDoneTasks.concat(markAsDoneTask)
            };
        case 'REOPEN_TASK':
            const doneTasks = state.doneTasks;
            let i = findIndex(action.payload, doneTasks);
            doneTasks.splice(i, 1);
            const existingTasks = [].concat(state.tasks);
            const _id = state.taskId;
            action.payload["id"] = _id;
            action.payload["status"] = "pending";
            allTasksArr = [].concat(state.allTasks);
            i = findIndex(action.payload, allTasksArr);
            allTasksArr[i] = action.payload;
            return {
                ...state,
                tasks: existingTasks.concat(action.payload),
                doneTasks: [].concat(doneTasks),
                allTasks: [].concat(allTasksArr),
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
            if (groupByProperty === "High" || groupByProperty === "None" || groupByProperty === "Low") {
                allTasks = groupByPriority(state.allTasks, groupByProperty);
                completedTasks = groupByPriority(state.doneTasks, groupByProperty);
                tasks = groupByPriority(state.tasks, groupByProperty);
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
                tasks: [].concat(tasks),
                allTasks: [].concat(allTasks),
                doneTasks: [].concat(completedTasks)
            }
        case 'TOGGLE_EDIT_MODAL':
            return {
                ...state,
                showEditModal: !state.showEditModal
            }
        default:
            return state
    }
}

const findIndex = (task, taskList) => {
    let indx = -1;
    taskList.find((t, index) => {
        if (t.id === task.id) {
            return indx = index;
        }
    });
    return indx;
}


const groupByPriority = (tasks, property) => {
    const highPr = [];
    const lowPr = [];
    const noPr = [];
    let updatedTasks;
    tasks.forEach(task => {
        if (task.priority === "High") {
            highPr.push(task)
        } else if (task.priority === "Low") {
            lowPr.push(task);
        } else {
            noPr.push(task);
        }
    });
    if (property === "High") {
        updatedTasks = [].concat(highPr, lowPr, noPr);
    } else if (property === "Low") {
        updatedTasks = [].concat(lowPr, noPr, highPr);
    } else {
        updatedTasks = [].concat(noPr, lowPr, highPr);
    }
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
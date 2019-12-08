import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/actions";
import { Button, Table } from "react-bootstrap";
import EditTask from "../EditTask/EditTask";
import Alert from "../Alert/Alert";

class AllTasks extends Component {

    deleteTask = (index) => {
        this.props.deleteTask(index);
    }

    handleEditClick = (task) => {
        // this.props.selectedIndex(index);
        this.props.editTask(task);
        this.props.toggleEditModal();
    }

    handleDoneClick = (task) => {
        this.props.markAsDone(task);
    }

    handleDeleteClick = (task) => {
        this.props.deleteTask(task);
    }

    handleReOpenClick = (task) => {
        this.props.reOpenTask(task);
    }

    render() {

        let pendingTasks = this.props.tasks.map((task, key) => {
            return (
                <tr key={key} style={{backgroundColor: "yellow"}}>
                     { Object.keys(task).map(key => {
                        if (key !== "id" && key !== "description") {
                            return <td>{task[key]}</td>
                        } else if (key === "id") {
                            return <td>
                                <span>
                                    <Button onClick={() => { this.handleEditClick(task) }} variant="secondary" style={{ margin: "5px" }}>View/Edit</Button>
                                    <Button onClick={() => {this.handleDoneClick(task)}} variant="success" style={{ margin: "5px" }}>Done</Button>
                                    <Button onClick={() => {this.handleDeleteClick(task)}} variant="danger" style={{ margin: "5px" }}>Delete</Button>
                                </span>
                            </td>
                        }
                    })}
                </tr>
            )
        });


        let doneTasks = this.props.doneTasks.map((task, key) => {
            return (
                <tr key={key}>
                     { Object.keys(task).map(key => {
                        if (key !== "id" && key !== "description") {
                            return <td style={{backgroundColor: "green"}}>{task[key]}</td>
                        } else if (key === "id") {
                            return <td>
                                <span>
                                <Button onClick={() => { this.handleReOpenClick(task) }} variant="secondary" style={{ margin: "5px" }}>Re-open</Button>
                                </span>
                            </td>
                        }
                    })}
                </tr>
            )
        });

        return (
            <div>
                {/* <Alert showAlert={this.props.showAlert} title="Add Task" alertContent="No tasks Aded, close to add tasks"/> */}
                <Table id="task" striped bordered hover>
                    <thead>
                        <tr>
                            <th>Summary</th>
                            <th>Priority</th>
                            <th>Created On</th>
                            <th>Due Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingTasks}
                        {doneTasks}
                    </tbody>
                </Table>
                <EditTask/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allTasks: state.allTasks,
        tasks: state.tasks,
        doneTasks: state.doneTasks,
        showAlert: state.showAlert
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteTask: (task) => dispatch(actions.deleteTask(task)),
        toggleEditModal: () => dispatch(actions.toggleEditModal()),
        editTask: (task) => dispatch(actions.editTask(task)),
        markAsDone: (task) => dispatch(actions.markAsDone(task)),
        reOpenTask : (task) => dispatch(actions.reOpenTask(task))
        // selectedIndex: (index) => dispatch(actions.selectedIndex(index))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllTasks);
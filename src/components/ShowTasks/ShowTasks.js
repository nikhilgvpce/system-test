import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/actions";
import { Button, Table } from "react-bootstrap";
import EditTask from "../EditTask/EditTask";

class ShowTasks extends Component {

    deleteTask = (index) => {
        this.props.deleteTask(index);
    }

    handleEditClick = (task) => {
        // this.props.selectedIndex(index);
        this.props.editTask(task);
        this.props.toggleModal();
    }

    handleDoneClick = (task) => {
        this.props.markAsDone(task);
    }

    handleDeleteClick = (task) => {
        this.props.deleteTask(task);
    }

    render() {
        let editTask = this.props.selectedTask ? <EditTask data={this.props.selectedTask} show={this.props.showEditModal}/> : null;
        let pendingTasks = this.props.tasks.map((task, key) => {
            return (
                <tr key={key} style={{backgroundColor: "yellow"}}>
                     { Object.keys(task).map(key => {
                        if (key !== "id" && key !== "description" && key !== "status") {
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

        return (
            <div>
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
                    </tbody>
                </Table>
                {/* <EditTask show={this.props.showModal}/> */}
                {editTask}
                {/* <DoneTasks/> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        showEditModal: state.showEditModal,
        selectedTask: state.selectedTask
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteTask: (task) => dispatch(actions.deleteTask(task)),
        toggleModal: () => dispatch(actions.toggleModal()),
        editTask: (task) => dispatch(actions.editTask(task)),
        markAsDone: (task) => dispatch(actions.markAsDone(task))
        // selectedIndex: (index) => dispatch(actions.selectedIndex(index))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowTasks);
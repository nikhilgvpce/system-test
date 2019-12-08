import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Button } from "react-bootstrap";
import * as actions from "../store/actions/actions";

class DoneTasks extends Component {

    handleReOpenClick = (task) => {
        this.props.reOpenTask(task);
    }

    render() {
        let totalTasks;
        if (this.props.doneTasks.length > 0) {
            totalTasks = this.props.doneTasks.map((task, key) => {
                return (
                    <tr key={key} style={{backgroundColor: "green"}}>
                        {Object.keys(task).map(key => {
                            if (key !== "id" && key !== "description") {
                                return <td>{task[key]}</td>
                            } else if (key === "id") {
                                return <td>
                                    <Button onClick={() => { this.handleReOpenClick(task) }} variant="secondary" style={{ margin: "5px" }}>Re-open</Button>
                                </td>
                            }
                        })}
                    </tr>
                )
            });
        }

        return (
            this.props.doneTasks.length > 0 ?
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
                            {totalTasks}
                        </tbody>
                    </Table>
                </div> :
                null
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        reOpenTask: (task) => dispatch(actions.reOpenTask(task))
    }
}

const mapStateToProps = state => {
    return {
        doneTasks: state.doneTasks
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DoneTasks);
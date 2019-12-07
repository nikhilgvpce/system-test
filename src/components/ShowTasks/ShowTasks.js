import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/actions";
import {Button} from "react-bootstrap";
class ShowTasks extends Component {

    deleteTask = (index) => {
        this.props.deleteTask(index)
    }

    render() {

        const tasks = this.props.tasks.map((task, index) => {
            const key = index;
            return (
                <div key={index} style={{ margin: "10px"}}>
                     {task.summary}
                     <Button key={index} style={{ margin: "10px"}} onClick={this.deleteTask(index)}>Delete</Button>
                </div>
            )
        });

        return (
           <div id="task">
               {tasks}
               
           </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteTask : (index) => dispatch(actions.deleteTask(index))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowTasks);
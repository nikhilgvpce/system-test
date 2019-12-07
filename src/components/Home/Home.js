import React, { Component } from "react";
import "./Home.css";
import * as actions from "../store/actions/actions";
import { connect } from 'react-redux';
import CreateTask from "../CreateTask/CreateTask";
import ShowTasks from "../ShowTasks/ShowTasks";
import { Button } from 'react-bootstrap';


class Home extends Component {

    state = {
        tasks: null
    }

    // componentWillMount() {
    //     this.props.addTask("Sample Task");
    // }
    handleNewTask() {
        this.props.displayCard();
    }

    handleDeleteTask() {
        this.props.deleteTask();
    }


    render() {
        return (
            <div>
                <h1 id="header" >Welcome to To App!</h1>
                <div>
                    <div style={{ margin: "10px" }}>
                        <ShowTasks></ShowTasks>
                    </div>
                    <div id="newTask">
                        <Button variant="primary" onClick={this.props.displayCard}>New task</Button>
                    </div>
                    {/* <button onClick="handleDeleteTask()">-</button> */}
                    <CreateTask showCard={this.props.showCard}></CreateTask>
                </div>
            </div>
        );
    }
}

const mapDispatchToState = (state) => {
    return {
        tasks: state.tasks,
        showCard: state.showCard
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTask: (task) => dispatch(actions.addTask(task)),
        displayCard: () => dispatch(actions.displayCard()),
        deleteTask: () => dispatch(actions.deleteTask())
    }
}

export default connect(mapDispatchToState, mapDispatchToProps)(Home);

import React, { Component } from "react";
import "./Home.css";
import * as actions from "../store/actions/actions";
import { connect } from 'react-redux';
import CreateTask from "../CreateTask/CreateTask";
import { Link, Route, Switch } from "react-router-dom";
import ShowTasks from "../ShowTasks/ShowTasks";
import { Alert, Button } from 'react-bootstrap';
import AllTasks from "../AllTasks/AllTasks";
import DoneTasks from "../DoneTasks/DoneTasks";
import EditTask from "../EditTask/EditTask";


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
                <h1 id="header" >Welcome to ToDo App!</h1>
                <header>
                    <nav>
                        <ul>
                            <li><Link to="/">All Tasks</Link></li>
                            <li>
                                <Link to="/pending" >
                                    Pending Tasks
                                </Link>
                            </li>
                            <li>
                                <Link to="/completed">
                                    Completed Tasks
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </header>
                <div>
                    {/* <div style={{ margin: "10px" }}>
                        <AllTasks />
                        <ShowTasks />
                        <DoneTasks/>
                    </div> */}
                    <Switch>
                        <Route path="/pending" exact component={ShowTasks} />
                        <Route path="/edit" exact component={EditTask} />
                        <Route path="/completed" exact component={DoneTasks} />
                        <Route path="/" exact component={AllTasks} />
                    </Switch>
                    <div id="newTask">
                        <button id="addTaskButton" variant="primary" onClick={this.props.displayCard}>+</button>
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
        allTasks: state.allTasks,
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

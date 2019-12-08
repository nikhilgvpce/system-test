import React, { Component } from "react";
import "./Home.css";
import * as actions from "../store/actions/actions";
import { connect } from 'react-redux';
import CreateTask from "../CreateTask/CreateTask";
import { Link, Route, Switch, NavLink } from "react-router-dom";
import ShowTasks from "../ShowTasks/ShowTasks";
import AllTasks from "../AllTasks/AllTasks";
import DoneTasks from "../DoneTasks/DoneTasks";


class Home extends Component {


    handleDeleteTask = () => {
        this.props.deleteTask();
    }

    handleSelectChange = (event) => {
        this.props.groupBy(event.target.value);
    }


    render() {
        return (
            <div>
                <h1 id="header" >Welcome to ToDo App!</h1>
                <header>
                    <select id="dropdown" class="select-css" onChange={this.handleSelectChange}>
                        <option defaultValue>Group By</option>
                        <option>None</option>
                        <option>High</option>
                        <option>Low</option>
                        <option>Created On</option>
                        <option>Pending On</option>
                    </select>
                    <nav className="nav">
                        <ul>
                            <li><NavLink to="/" exact>All Tasks</NavLink></li>
                            <li>
                                <NavLink to="/pending" >
                                    Pending Tasks
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/completed">
                                    Completed Tasks
                                </NavLink>
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
                        {/* <Route path="/edit" exact component={EditTask} /> */}
                        <Route path="/completed" exact component={DoneTasks} />
                        <Route path="/create" exact component={CreateTask} />
                        <Route path="/" exact component={AllTasks} />
                    </Switch>
                    <div id="newTask">
                        <Link to="/create">
                            <button id="addTaskButton" variant="primary" onClick={this.props.toggleModal}>
                                +
                       </button>
                        </Link>
                    </div>
                    {/* <CreateTask showModal={this.props.showModal}></CreateTask> */}
                </div>
            </div>
        );
    }
}

const mapDispatchToState = (state) => {
    return {
        allTasks: state.allTasks,
        tasks: state.tasks,
        showModal: state.showModal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTask: (task) => dispatch(actions.addTask(task)),
        toggleModal: () => dispatch(actions.toggleModal()),
        deleteTask: () => dispatch(actions.deleteTask()),
        groupBy: (property) => dispatch(actions.groupBy(property))
    }
}

export default connect(mapDispatchToState, mapDispatchToProps)(Home);

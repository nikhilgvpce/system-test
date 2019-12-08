import React, { Component } from "react";
import * as actions from "../store/actions/actions";
import { connect } from 'react-redux';
import Modal from "../Modal/Modal";
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import DatePicker from "../DatePicker/DatePicker";
import "./CreateTask.css";
import { withRouter } from "react-router-dom";

class CreateTask extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date().toLocaleDateString(),
            priority: null,
            dueDate: null
        }
    }

    handleSave = () => {
        const priority = this.state.priority;
        const summary = this.textInput.value;
        const createdDate = this.state.date;
        const DueDate = this.state.dueDate;
        const description = this.textArea.value;
        if (this.props.selectedTask !== null) {
            const id = this.props.selectedTask.id;
            const task = { summary, priority, createdDate, DueDate, description, id };
            this.props.replaceTask(task);
        } else {
            this.props.addTask(
                {
                    summary,
                    priority,
                    createdDate,
                    DueDate,
                    description
                }
            );
        }
        this.props.toggleModal();
        // this.setState({priority: 'Set Priority', date: null, dueDate: null});
        // this.textArea.value = null;
        // this.textInput.value = null;
        this.props.history.push({pathname: "/"});
    }

    handleCloseModal = () => {
        this.props.toggleModal();
        this.props.history.push({pathname: "/"});
    }

    handleSelectChange = (event) => {
        this.setState({ priority: event.target.value });
    }

    handleSelectedDueChange = (date) => {
        this.setState({ dueDate: date });
    }

    getCurrentDate = () => {
        const date = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        return year + "-" + month + "-" + date;
    }

    render() {

        const style = {
            content: {
                height: '60%',
                width: '60%',
                padding: '2rem'
            }
        };

        return (
            <Modal style={style} show={this.props.showModal} modalClosed={this.handleCloseModal}>
                <div id="title">
                    <InputGroup className="mb-3" >
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">title</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Enter Title"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            ref={(input) => this.textInput = input}
                            defaultValue={''}
                        />
                    </InputGroup>
                </div>
                <textarea defaultValue={''} ref={(input) => this.textArea = input} id="styled" placeholder="Enter Description"></textarea>
                <div>Created at : {this.getCurrentDate()} </div>
                <div style={{ float: "left", margin: "10px" }}>
                    <div id="dateDiv">Due Date : </div>
                    <div id="datePicker">
                        <DatePicker
                            value={null}
                            setSelectedDate={this.handleSelectedDueChange}
                        />
                    </div>
                </div>
                <div style={{ margin: "10px" }}>
                    <label>Set Priority</label>
                    <select id="priority" onChange={this.handleSelectChange}>
                        <option defaultValue>Set Priority</option>
                        <option value="High">High</option>
                        <option value="Low">Low</option>
                        <option Value="None">None</option>
                    </select>
                </div>
                <div id="taskButtons">
                    <Button id="save" onClick={this.handleSave}>Save</Button>
                    <Button id="cancel" onClick={this.handleCloseModal}>Cancel</Button>
                </div>
            </Modal>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        addTask: (description) => dispatch(actions.addTask(description)),
        toggleModal: () => dispatch(actions.toggleModal()),
        replaceTask: (task) => dispatch(actions.replaceTask(task))
    }
}

const mapStateToProps = state => {
    return {
        showModal: state.showModal,
        selectedTask: state.selectedTask
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateTask));
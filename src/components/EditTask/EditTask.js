import React, { Component } from "react";
import * as actions from "../store/actions/actions";
import { connect } from 'react-redux';
// import Modal from "react-modal";
import Modal from "../Modal/Modal";
import DatePicker from "../DatePicker/DatePicker";
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import "./EditTask.css";

class EditTask extends Component {

    state = {
        priority: null,
        dueDate: null,
        title: null,
        description: null
    }

    handleCloseModal = () => {
        this.props.toggleEditModal();
    }

    handleSelectChange = (event) => {
        this.setState({ priority: event.target.value });
    }

    handleSelectedDueChange = (date) => {
        this.setState({ dueDate: date });
    }

    handleTitleChange = (event) => {
        this.setState({ title: event.target.value });
    }

    handleDescriptionChange = (event) => {
        this.setState({ description: event.target.value });
    }

    handleSave = () => {
        this.props.toggleEditModal();
        const priority = this.state.priority ? this.state.priority : this.props.selectedTask.priority;
        const summary = this.state.title ? this.state.title : this.props.selectedTask.summary;
        const createdDate = this.props.selectedTask.createdDate;
        const DueDate = this.state.dueDate ? this.state.dueDate : this.props.selectedTask.DueDate;
        const id = this.props.selectedTask.id;
        const description = this.state.description ? this.state.description : this.props.selectedTask.description;
        const status = this.props.selectedTask.status;
        this.props.replaceTask(
            {
                summary,
                priority,
                createdDate,
                DueDate,
                description,
                id,
                status
            }
        );
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
            <Modal style={style} show={this.props.show} modalClosed={this.handleCloseModal}>
                {/* {this.props.selectedTask ? */}
                <div>
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
                                defaultValue={this.props.selectedTask.summary}
                                onChange={this.handleTitleChange}
                            />
                        </InputGroup>
                    </div>
                    <textarea
                        onChange={this.handleDescriptionChange}
                        ref={(input) => this.textArea = input}
                        defaultValue={this.props.selectedTask.description}
                        id="styled" placeholder="Enter Description">
                    </textarea>
                    <div>Created at : {this.props.selectedTask.createdDate} </div>
                    <div style={{ float: "left", margin: "10px" }}>
                        <div id="dateDiv">Due Date : </div>
                        <div id="datePicker">
                            <DatePicker
                                value={this.props.selectedTask.DueDate}
                                setSelectedDate={this.handleSelectedDueChange}
                            />
                        </div>
                    </div>
                    <div style={{ margin: "10px" }}>
                        <label>Set Priority</label>
                        <select id="priority" defaultValue={this.props.selectedTask.priority} onChange={this.handleSelectChange}>
                            <option>Set Priority</option>
                            <option value="High">High</option>
                            <option value="Low">Low</option>
                            <option Value="None">None</option>
                        </select>
                    </div>
                    <div id="taskButtons">
                        <Button id="save" onClick={this.handleSave}>Save</Button>
                        <Button id="cancel" onClick={this.handleCloseModal}>Cancel</Button>
                    </div>
                </div>
            </Modal>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleEditModal: () => dispatch(actions.toggleEditModal()),
        replaceTask: (task) => dispatch(actions.replaceTask(task))
    }
}

const mapStateToProps = (state) => {
    return {
        showEditModal: state.showEditModal,
        selectedTask: state.selectedTask
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTask);
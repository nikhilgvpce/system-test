import React, { Component } from "react";
import * as actions from "../store/actions/actions";
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import DatePicker from "../DatePicker/DatePicker";
import "./CreateTask.css";

class CreateTask extends Component {

    // const task = {
    //     summary: String,
    //     description: String,
    //     Priority: String,
    //     DueDate: String,
    // }

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
        this.props.addTask(
            {
                summary,
                priority,
                createdDate,
                DueDate,
                description
            }
        );
        this.props.displayCard();
    }

    handleCloseModal = () => {
        this.props.displayCard();
    }

    handleSelectChange = (event) => {
        this.setState({ priority: event.target.value });
    }

    handleSelectedDueChange = (date) => {
        this.setState({ dueDate: date });
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
            this.props.showCard ?
                <Modal style={style} isOpen={this.props.showCard} onRequestClose={this.handleCloseModal}>
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
                            />
                        </InputGroup>
                    </div>
                    <textarea ref={(input) => this.textArea = input} id="styled" placeholder="Enter Description"></textarea>
                    <div>Created at : {new Date().toLocaleString()} </div>
                    <div style={{ float: "left", margin: "10px" }}>
                        <div id="dateDiv">Due Date : </div>
                        <div id="datePicker">
                            <DatePicker
                                value={null}
                                setSelectedDate={this.handleSelectedDueChange}
                            />
                        </div>
                    </div>
                    <div style={{margin: "10px"}}>
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
                : null
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        addTask: (description) => dispatch(actions.addTask(description)),
        displayCard: () => dispatch(actions.displayCard())
    }
}

//  const mapStateToProps = state => {
//      return (
//          taks
//      )
//  }

export default connect(null, mapDispatchToProps)(CreateTask);
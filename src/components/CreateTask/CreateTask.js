import React, { Component } from "react";
import * as actions from "../store/actions/actions";
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

class CreateTask extends Component {

    state = {
        discription: null,
        summary: null,
        closeModal: false
    }

    handleSummaryChange = () => {
        this.props.addTask({ summary: this.textInput.value });
    }

    handleCloseModal = () => {
        this.props.displayCard();
    }

    render() {
        return (
            this.props.showCard ?
                <Modal isOpen={this.props.showCard} onRequestClose={this.handleCloseModal}>
                    <div id="card">
                        <input placeholder="Enter Summary Here" ref={(input) => this.textInput = input} ></input>
                        {/* <InputGroup size="sm" className="mb-3" ref={(input) => this.textInput = input}>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-sm">Small</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                        </InputGroup> */}
                        <Button style={{ margin: "10px", width: "5%" }} onClick={this.handleSummaryChange}>Create</Button>
                        <Button style={{ margin: "10px", width: "5%" }}>Edit</Button>
                        <Button style={{ margin: "10px" }} onClick={this.handleCloseModal}>Close Modal</Button>
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
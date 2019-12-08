import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../store/actions/actions";

class Alert extends Component {

    componentDidMount() {

    }

    render() {
        // const alert 
        return (
            <Alert show={this.props.showAlert} variant="warning">
                <Alert.Heading>{this.props.alertTitle}</Alert.Heading>
                <p>
                    No Tasks Added.
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button>
                        Close
                    </Button>
                </div>
            </Alert>
        );
    }
}


// const mapStateToProps = state => {
//     return {
//         allTasks: state.allTasks,
//         showAlert: state.showAlert
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         toggleAlert: () => dispatch(actions.toggleAlert())
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Alert);

export default Alert;
import React, { Component } from "react";

class DatePicker extends Component {

    state = {
        selectedDate: null
    }

    handleOnDateChange = (event) => {
        this.setState({ selectedDate: event.target.value });
        this.props.setSelectedDate(event.target.value);
    }

    getDate = () => {
        if(this.props.value == null) {
            return this.state.selectedDate;
        } 
        if(this.props.value != null) {
            return this.props.value;
        }
    }

    render() {
        return (
            <div>
                <input
                    type="date"
                    value={this.getDate()}
                    ref={(input) => this.date = input} onChange={this.handleOnDateChange}
                />
            </div>
        )
    }
}

export default DatePicker;
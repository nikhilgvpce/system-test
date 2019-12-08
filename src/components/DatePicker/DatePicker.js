import React, { Component } from "react";

class DatePicker extends Component {

    state = {
        selectedDate: null
    }

    handleOnDateChange = (event) => {
        this.setState({ selectedDate: event.target.value });
        this.props.setSelectedDate(event.target.value);
    }

    render() {
        return (
            <div>
                <input
                    type="date"
                    value={this.props.value ? this.props.value : this.state.selectedDate}
                    ref={(input) => this.date = input} onChange={this.handleOnDateChange}
                />
            </div>
        )
    }
}

export default DatePicker;
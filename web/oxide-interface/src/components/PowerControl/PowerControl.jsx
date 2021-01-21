import React from 'react';

const POWER_STATE = {
    UNKNOWN: "UNKNOWN",
    ON: "ON"
}

class PowerControl extends React.Component {

    constructor(props) {
        super(props);
        this.state = { status: null };
    }

    async componentDidMount() {
        // Set status to on for now, in the future ,get from API
        this.setState({ status: POWER_STATE.UNKNOWN });

        // Set a timer--interval for polling power state
    }

    render() {
        return (
            <div className="pow-ctl">
                <p className="status">Power: {this.state.status}</p>
                <button onClick={powerOn}>ON</button>
                <button onClick={powerOff}>OFF</button>
            </div>
        );
    }
}

function powerOn() {
    console.log("Powered ON");
}

function powerOff() {
    console.log("Powered OFF");
}

export default PowerControl;

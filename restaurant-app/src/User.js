import React, { Component } from 'react';
//import facade from './apiFacade';

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = { usernum: "Fetching usernum..." };
    }

    componentDidMount() {
        //facade.getNumberOfUsers().then(res => this.setState({ usernum: res }));
    }
    render() {
        return (
            <div>
                {/* {this.state.usernum} */}
            </div>
        )
    }
}

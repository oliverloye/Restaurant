import React, { Component } from 'react';
import facade from './apiFacade';

export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = { allUsers: "Fetching allUsers..." };
    }

    componentDidMount() {
        facade.getAllUsers().then(res => this.setState({ allUsers: res }));
    }
    render() {
        return (
            <div>
                <h4>Admin page</h4>
                {this.state.allUsers}
            </div>
        );
    }
}
import React, { Component } from 'react';
import facade from './apiFacade';

//Printer bare en string ud fra DemoResource i metoden getPaginationData
export default class Luke extends Component {
    constructor(props) {
        super(props);
        this.state = { paginationData: "Fetching data..." };
    }

    componentDidMount() {
        facade.getPaginationData().then(res => this.setState({ paginationData: res }));
    }
    render() {
        return (
            <div>
                {this.state.paginationData}
            </div>
        )
    }
}

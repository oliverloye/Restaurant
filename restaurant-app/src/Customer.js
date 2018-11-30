import React, { Component } from "react"
import facade from './apiFacade';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { BrowserRouter as Router } from "react-router-dom";
import cellEditFactory from 'react-bootstrap-table2-editor';

const expandRow = {
    renderer: (row) => (
        <div>
            <Router>
                <div>
                    <p><b>Kontakt information: </b></p>
                    <p><b>Navn: </b> {row.restName} <br /> </p>
                </div>
            </Router>
        </div>
    )
};

const columns = [{
    dataField: 'restName',
    text: 'Restaurant Navn',
}, {
    dataField: 'foodType',
    text: 'Food type'
},
{
    dataField: 'comment',
    text: 'Kommentarer',
}, {
    dataField: 'rating',
    text: "Rating",
},
];

export default class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = { favRests: [], userName: props.username };
    }

    async componentDidMount() {
        //const favRests = [];
        const favRests = await facade.getFavRestaurants(this.state.userName);
        this.setState({ favRests });
    }

    render() {
        //console.log(this.state.favRests);
        console.log(this.state.username);
        return <div>
            <br />
            <h3>Dine favorit restauranter</h3>
            <br />
            <BootstrapTable
                hover
                bootstrap4
                keyField='restName'
                data={this.state.favRests}
                columns={columns}
                pagination={paginationFactory()}
                expandRow={expandRow}
                cellEdit={ cellEditFactory({
                    mode: 'click',
                    blurToSave: true,
                    //afterSaveCell: this.onAfterSaveCell.bind(this)
                  }) }
            />
        </div>
    }
}
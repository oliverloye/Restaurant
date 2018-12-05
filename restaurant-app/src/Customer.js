import React, { Component } from "react"
import facade from './apiFacade';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { BrowserRouter as Router } from "react-router-dom";
import EditFavRest from './EditFavRest.js'

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
}, {
    dataField: 'comment',
    text: 'Kommentarer',
}, {
    dataField: 'rating',
    text: "Rating",
}, {
    dataField: 'button',
    text: "edit"
}
];

export default class Customer extends Component {
    constructor(props) {
        super(props);
        //this.state = { favRests: [], userName: props.username };
        this.state = { favRests: [], edit: false, editID: '' };
    }

    async componentDidMount() {
        //const favRests = await facade.getFavRestaurants(this.state.userName);
        const favRests = await facade.getFavRestaurants(this.props.username);
        this.setState({ favRests });
    }

    onclicking = (event) => {
        // der skal ske lidt mere i denne metode, men har fat i restID som skal editeres
        const editID = event.target.value;
        this.setState({ editID: editID, edit:true })
    }

    render() {

        const tableData = this.state.favRests.map((rest) =>
            ({
                restName: rest.restName,
                foodType: rest.foodType,
                comment: rest.comment,
                rating: rest.rating,
                button: <button type="button" onClick={this.onclicking} value={rest.restID}>Edit</button>
            })
        );
        return !this.state.edit ? (

            <div>
                <br />
                <h3>Dine favorit restauranter</h3>
                <br />
                <BootstrapTable
                    hover
                    bootstrap4
                    keyField='restName'
                    data={tableData}
                    //data={this.state.favRests}
                    columns={columns}
                    pagination={paginationFactory()}
                    expandRow={expandRow}
                /* cellEdit={ cellEditFactory({
                    mode: 'click',
                    blurToSave: true,
                    //afterSaveCell: this.onAfterSaveCell.bind(this)
                  }) } */
                />
            </div>) : (<EditFavRest {...this.props} restID={this.state.editID} />)
    }
}





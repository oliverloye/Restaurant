import React, { Component } from 'react';
import facade from './apiFacade';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import filterFactory/* , { textFilter } */ from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

const columns = [{
    dataField: 'id',
    text: 'ID',
    //sort: true
}, {
    dataField: 'gender',
    text: 'Gender',
    sort: true,
    //filter: textFilter()
},
{
    dataField: 'firstName',
    text: 'First name',
    //sort: true,
    //filter: textFilter()
},
{
    dataField: 'lastName',
    text: 'Last name',
    //sort: true
}, {
    dataField: 'email',
    text: 'Email'
}];


//Printer bare en string ud fra DemoResource i metoden getPaginationData
export default class Data extends Component {
    constructor(props) {
        super(props);
        this.state = { persons: [], paginationData: "Fetching data..." };
    }

    async componentDidMount() {
        const persons = await facade.getPaginationData();//.then(res => res.json());
        this.setState({ persons });
    }

    render() {
        return <div>
            <BootstrapTable
                striped
                hover
                bootstrap4
                keyField='id'
                data={this.state.persons}
                columns={columns}
                filter={filterFactory()}
                pagination={paginationFactory()}
            />
        </div>
    }
}

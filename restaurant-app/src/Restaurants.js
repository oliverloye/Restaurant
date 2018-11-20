import React, { Component } from 'react';
import facade from './apiFacade';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

//let filterTypes;
const selectOptions = {
    0: 'Indian',
    1: 'Italian'
};

const columns = [{
    dataField: 'id',
    text: 'ID',
    //sort: true
}, {
    dataField: 'restName',
    text: 'Name',
    sort: true,
    //filter: textFilter()
},
{
    dataField: 'foodType',
    text: 'Food type',
    //sort: true,
    filter: selectFilter({
        options: selectOptions
    })
},
{
    dataField: 'street',
    text: 'Street',
    //sort: true
}, {
    dataField: 'website',
    text: 'Website'
},
{
    dataField: 'phone',
    text: 'Phone',
    //sort: true
}];


export default class Restaurants extends Component {
    constructor(props) {
        super(props);
        this.state = { restaurantList: [], paginationData: "Fetching data..." };
    }

    async componentDidMount() {
        const restaurantList = await facade.getAllRestaurants();//.then(res => res.json());
        this.setState({ restaurantList });
    }

    render() {
        return <div>
            <BootstrapTable
                striped
                hover
                bootstrap4
                keyField='id'
                data={this.state.restaurantList}
                columns={columns}
                filter= {filterFactory()}
                pagination={paginationFactory()}
            />
        </div>
    }
}


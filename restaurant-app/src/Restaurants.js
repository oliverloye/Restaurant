import React, { Component } from 'react';
import facade from './apiFacade';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import filterFactory, { /* textFilter, */ selectFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';


let foodTypeOptions = {
    Indian: 'Indian',
    Italian: 'Italian',
    American: 'American',
    Vietnamese: 'Vietnamese',
    Chinese: 'Chinese'
};

let zipOptions = {
    4600: '4600',
    3400: '3400',
    3000: '3000',
    3540: '3540',
    4000: '4000'
}

const expandRow = {
    renderer: (row, menuItems) => (
    <div>
        <p>Hej</p>
        <p>Hejsa</p>
    </div>
    )
  };

const columns = [{
    dataField: 'id',
    text: 'ID',
}, {
    dataField: 'restName',
    text: 'Name',
},
{
    dataField: 'foodType',
    text: 'Food type',
    filter: selectFilter({
        options: foodTypeOptions,
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
    text: 'Phone'
}, {
    dataField: 'cityInfo.zip',
    text: 'Zip',
    filter: selectFilter({
        options: zipOptions
    })
}, {
    dataField: 'cityInfo.city',
    text: "City"
}, {
    dataField: 'menuItems',
    text: "Menu",
    expandRow: expandRow
}

];


export default class Restaurants extends Component {
    constructor(props) {
        super(props);
        this.state = { restaurantList: [], menuItems: [], paginationData: "Fetching data..." };
    }

    async componentDidMount() {
        const restaurantList = await facade.getAllRestaurants();//.then(res => res.json());
        const menuItems = await facade.getMenuItems();

        this.setState({ restaurantList, menuItems });
        console.log(this.state.menuItems);
    }

    render() {
        return <div>
            <BootstrapTable
                striped
                hover
                bootstrap4
                keyField='id'
                data={this.state.restaurantList}
                data1={this.state.menuItems}
                columns={columns}
                filter={filterFactory()}
                pagination={paginationFactory()}
                expandRow={expandRow}
            />
        </div>
    }
}


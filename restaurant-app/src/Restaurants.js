import React, { Component } from 'react';
import facade from './apiFacade';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import filterFactory, { selectFilter, textFilter } from 'react-bootstrap-table2-filter';
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
    renderer: (row) => (
        <div>
            <p><b>Kontakt information: </b></p>
            <p><b>Navn: </b> {row.restName} <br /> </p>
            <p><b>Adresse: </b> {row.street}, {row.cityInfo.zip} {row.cityInfo.city}<br /> </p>
            <p><b>Website: </b> {row.website}</p>
            <p><b>Telefon: </b> {row.phone}</p>

            {console.log(row.id)}

            <a href="/menu">Menukort</a>
        </div>

    ),
    showExpandColumn: true,
    headerAlign: 'left',
    expandHeaderColumnRenderer: ({ isAnyExpands }) => {

        if (isAnyExpands) {
            return <b>-</b>;
        }
        return <b>+</b>;
    },
    expandColumnRenderer: ({ expanded }) => {
        if (expanded) {
            return (
                <b>-</b>
            );
        }
        return (
            <b> ... </b>
        );
    }
};


const columns = [{
    dataField: 'restName',
    text: 'Navn',
},
{
    dataField: 'foodType',
    text: 'Madtype',
    filter: selectFilter({
        options: foodTypeOptions,
    })
},
{
    dataField: 'cityInfo.zip',
    text: 'Postnummer',
    filter: selectFilter({
        options: zipOptions
    })
}, {
    dataField: 'cityInfo.city',
    text: "By",
    filter: textFilter()
},

];

/* function buttonFormatter(cell, row) {
    return '<BootstrapButton type="submit"></BootstrapButton>';
} */

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
        console.log(this.state.menuItems);
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

                expandRow={expandRow} />
            {/* <TableHeaderColumn 
                        dataField="button" 
                        dataFormat={buttonFormatter}>
                        Restaurant information
                    </TableHeaderColumn> */}

        </div>
    }
}


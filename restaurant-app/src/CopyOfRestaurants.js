import React, { Component } from 'react';
import facade from './apiFacade';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import filterFactory, { selectFilter, textFilter, TableHeaderColumn } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom";
import Menu from './Menu.js';

const foodTypeOptions = {
    Indian: 'Indian',
    Italian: 'Italian',
    American: 'American',
    Vietnamese: 'Vietnamese',
    Chinese: 'Chinese'
};

const zipOptions = {
    4600: '4600',
    3400: '3400',
    3000: '3000',
    3540: '3540',
    4000: '4000'
}

const expandRow = {
    renderer: (row) => (
        <div>
            <Router>
                <div>
                    <p><b>Kontakt information: </b></p>
                    <p><b>Navn: </b> {row.restName} <br /> </p>
                    <p><b>Adresse: </b> {row.street}, {row.cityInfo.zip} {row.cityInfo.city}<br /> </p>
                    <p><b>Website: </b> {row.website}</p>
                    <p><b>Telefon: </b> {row.phone}</p>

                    {console.log(row.id)}

                    <NavLink exact activeClassName="active" to="/menu">Menu        </NavLink>
                    <NavLink exact activeClassName="active" to="/restaurants">      Luk Menu</NavLink>
                    <Switch>
                        <Route exact path="/menu" render={(props) => <Menu {...props} id={row.id} />} />
                    </Switch>

                </div>
            </Router>
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
},{
    dataField: 'button',
    
}

];

export default class CopyOfRestaurants extends Component {
    constructor(props) {
        super(props);
        this.state = { restaurantList: [], menuItems: [], paginationData: "Fetching data..." };
        
    }

    

    async componentDidMount() {
        const restaurantList = await facade.getAllRestaurants();
        this.setState({ restaurantList });
    }

    details(row) {
        console.log("activity id :" + row.id);
    }

    buttonFunction(cell, row) {
        return <label>
            <button type="button"
                id="validatebutton"
                onClick={() => { this.details(row) }}
                className="bbtn btn-primary btn-sm">
                Click Me
               </button>
        </label>
    }

    /* render() {
        if(this.state.restaurantList.length===0){
        return (<div>EMpty list</div>)}else{
        return (<div>
            <BootstrapTable
                data={this.state.restaurantList}
                pagination={true}
                hover={true}
                search={true}
                 filter={filterFactory()} 
                 >
                <TableHeaderColumn isKey={true} dataField="id" hidden>
              ID</TableHeaderColumn>
                <TableHeaderColumn dataField="restName" >
                    Navn</TableHeaderColumn>
                <TableHeaderColumn dataField="foodType"
                    filter={selectFilter({
                        options: foodTypeOptions
                    })} 
                    dataSort={true}>
                    Madtype</TableHeaderColumn>
                <TableHeaderColumn dataField="cityInfo.zip"
                     filter={selectFilter({
                        options: zipOptions
                    })} 
                    dataSort={true}>
                    Postnummer</TableHeaderColumn>
                <TableHeaderColumn dataField="cityInfo.city">
                    By</TableHeaderColumn>
                <TableHeaderColumn dataField="button"
                    dataFormat={this.buttonFunction.bind(this)}></TableHeaderColumn>
            </BootstrapTable></div>
        );}
    }  */

     render() {
        return <div>
            <BootstrapTable
                striped
                hover
                bootstrap4
                keyField='id'
                data={this.state.restaurantList}
                columns={columns}
                filter={filterFactory()}
                pagination={paginationFactory()}
                expandRow={expandRow} />
        </div>
    } 
}


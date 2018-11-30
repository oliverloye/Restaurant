import React, { Component } from 'react';
import facade from './apiFacade';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import filterFactory, { selectFilter, textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom";
import Menu from './Menu.js';

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
            <Router>
                <div>
                    <p><b>Kontakt information: </b></p>
                    <p><b>Navn: </b> {row.restName} <br /> </p>
                    <p><b>Adresse: </b> {row.street}, {row.cityInfo.zip} {row.cityInfo.city}<br /> </p>
                    <p><b>Website: </b> {row.website}</p>
                    <p><b>Telefon: </b> {row.phone}</p>

                    <NavLink exact style={{ backgroundColor: 'transparent', marginRight: '30px' }} to="/menu">Menukort</NavLink>
                    <NavLink exact style={{ backgroundColor: 'transparent', marginRight: '30px' }} to="/restaurants">Luk Menukort</NavLink>
                    <Switch>
                        <Route exact path="/menu" render={(props) => <Menu {...props} id={row.id} />} />
                    </Switch>

                </div>
            </Router>
        </div>
    )
};


const expandRowCustomer = {
    renderer: (row) => (
        <div>
            <Router>
                <div>
                    <p><b>Kontakt information: </b></p>
                    <p><b>Navn: </b> {row.restName} <br /> </p>
                    <p><b>Adresse: </b> {row.street}, {row.cityInfo.zip} {row.cityInfo.city}<br /> </p>
                    <p><b>Website: </b> {row.website}</p>
                    <p><b>Telefon: </b> {row.phone}</p>

                    <NavLink exact style={{ backgroundColor: 'transparent', marginRight: '30px' }} to="/menu">Menukort</NavLink>
                    <NavLink exact style={{ backgroundColor: 'transparent', marginRight: '30px' }} to="/restaurants">Luk Menukort</NavLink>
                    <NavLink exact style={{ backgroundColor: 'transparent' }} to="/restaurants" >Marker som favorit</NavLink>
                    <Switch>
                        <Route exact path="/menu" render={(props) => <Menu {...props} id={row.id} />} />
                        <Route exact path="/restaurants" render={(props) => <AddFavoriteRestaurant {...props} restId={row.id} />} />
                    </Switch>

                </div>
            </Router>
        </div>
    )
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

export default class Restaurants extends Component {
    constructor(props) {
        super(props);
        this.state = { restaurantList: [], menuItems: [], paginationData: "Fetching data...", role: "" };
    }

    async componentDidMount() {
        const restaurantList = await facade.getAllRestaurants();
        this.setState({ restaurantList });
    }

    render() {
        console.log(this.props.username);
        let role = "";
        if (localStorage.jwtToken) {
            let jwt = localStorage.jwtToken;
            let jwtData = jwt.split('.')[1]
            let decodedJwtJsonData = window.atob(jwtData)
            let decodedJwtData = JSON.parse(decodedJwtJsonData)
            role = decodedJwtData.roles
        }
        if (role === 'customer') {
            return <div>
                <BootstrapTable
                    hover
                    bootstrap4
                    keyField='id'
                    data={this.state.restaurantList}
                    columns={columns}
                    filter={filterFactory()}
                    pagination={paginationFactory()}
                    expandRow={expandRowCustomer}
                />
            </div>
        } else {
            return <div>
                <BootstrapTable
                    hover
                    bootstrap4
                    keyField='id'
                    data={this.state.restaurantList}
                    columns={columns}
                    filter={filterFactory()}
                    pagination={paginationFactory()}
                    expandRow={expandRow}
                />
            </div>
        }
    }
}

class AddFavoriteRestaurant extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.addFavoriteRestaurant()
    }

    addFavoriteRestaurant = () => {
        console.log(this.props.username);
        console.log(this.props.restId);
        facade.addFavRest({
            restId: this.props.rowId,
            username: this.props.username
        });
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}


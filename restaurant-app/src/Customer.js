import React, { Component } from "react"
//import facade from './apiFacade';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';


const columns = [{
    dataField: 'restaurant.restName',
    text: 'Navn',
},
{
    dataField: 'restaurant.foodType',
    text: 'Madtype',
},
{
    dataField: 'comments',
    text: 'Kommentarer',
}, {
    dataField: 'rating',
    text: "Rating",
},
];

export default class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = { favRests: [] };
    }

    async componentDidMount() {
        const favRests = [];
        //const favRests = await facade.getFavRestaurants();
        this.setState({ favRests });
    }

    render() {
        return <div>
            <br/>
            <h3>Dine favorit restauranter</h3>
            <br/>
            <BootstrapTable
                hover
                bootstrap4
                keyField='id'
                //data={this.state.restaurantList}
                data={this.state.favRests}
                columns={columns}
                pagination={paginationFactory()}
                //expandRow={expandRow}
                //select
            />
        </div>
    }
}
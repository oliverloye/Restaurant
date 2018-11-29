import React, { Component } from "react"
import facade from "./apiFacade";
import EditRestaurant from './EditRestaurant.js';

export default class MyRestaurants extends Component {
    constructor(props) {
        super(props);
        this.state = { restaurantList: [], edit: false, editID: '', msg: '', errorMsg: '' };
    }

    async componentDidMount() {
        try {
            const restaurantList = await facade.getMyRestaurants('rest');
            this.setState({ restaurantList });
        }
        catch (err) {
            if (err.httpError) {
                err.fullError.then(eJson => eJson.errorMessage);
            } else {
                err.fullError.then(eJson => this.setState({ errorMsg: eJson.errorMessage }));
            }
        }
    }

    handleClick = (id) => {
        this.setState({ edit: true, editID: id })
    }

    handleDeleteClick = async (id) => {
        const msg = await facade.deleteRestaurant(id);
        const restaurantList = await facade.getMyRestaurants(this.props.username);
        this.setState({ restaurantList, msg });
    }

    render() {
        if (!this.state.edit) {
            const tableData = this.state.restaurantList.map((restaurant) =>
                <SingleData key={restaurant.id}
                    id={restaurant.id}
                    restName={restaurant.restName}
                    foodType={restaurant.foodType}
                    street={restaurant.street}
                    website={restaurant.website}
                    onclicking={() => this.handleClick(restaurant.id)}
                    ondeleteclicking={() => this.handleDeleteClick(restaurant.id)} />
            );
            
            return this.state.errorMsg !== "" ?
                (<div><h4>{this.state.errorMsg}</h4></div>)
                : (<div>
                    {this.state.msg}
                    {this.state.errorMsg}
                    <table className="table">
                        <thead>
                            <tr><th>Rest name</th><th>Food type</th><th>Street</th><th>Website</th><th>Edit</th><th>Delete</th></tr>
                        </thead>
                        <tbody>
                            {tableData}
                        </tbody>
                    </table>
                </div>)
        } else {
            return <div>
                <EditRestaurant {...this.props} id={this.state.editID} />
            </div>
        }
    }
}

function SingleData(props) {
    const restName = props.restName;
    const foodType = props.foodType;
    const street = props.street;
    const website = props.website;
    return (
        <tr>
            <td>{restName}</td><td>{foodType}</td><td>{street}</td><td>{website}</td>
            <td><button type="button" onClick={props.onclicking}>Edit</button></td>
            <td><button type="button" onClick={props.ondeleteclicking}>Delete</button></td>
        </tr>
    );
}



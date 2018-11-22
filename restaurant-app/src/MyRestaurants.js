import React, { Component } from "react"
import facade from "./apiFacade";

export default class MyRestaurants extends Component {
    constructor(props) {
        super(props);
        this.state = { restaurantList: [] };

    }

    async componentDidMount() { // find ud af hvordan props skal få fat i username
        const restaurantList = await facade.getMyRestaurants(this.props.username);
        this.setState({ restaurantList });
    }

    render() {
        const tableData = this.state.restaurantList.map((restaurant) =>
            <SingleData key={restaurant.id}
                restName={restaurant.restName}
                foodType={restaurant.foodType}
                street={restaurant.street}
                website={restaurant.website} />
        );
        return <div>
            <table className="table">
                <thead>
                    <tr><th>Rest name</th><th>Food type</th><th>Street</th><th>Website</th></tr>
                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </table>
        </div>
        
    }
}

function SingleData(props) {
    //const id = props.id;
    const restName = props.restName;
    const foodType = props.foodType;
    const street = props.street;
    const website = props.website;
    return (
        <tr>
            <td>{restName}</td><td>{foodType}</td><td>{street}</td><td>{website}</td>
        </tr>
    );
}



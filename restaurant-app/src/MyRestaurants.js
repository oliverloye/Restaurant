import React, { Component } from "react"
import facade from "./apiFacade";
import EditRestaurant from './EditRestaurant.js';

export default class MyRestaurants extends Component {
    constructor(props) {
        super(props);
        this.state = { restaurantList: [], edit: false, editID: '' };
    }

    async componentDidMount() {
        const restaurantList = await facade.getMyRestaurants(this.props.username);
        this.setState({ restaurantList });
    }

    handleClick = (id) => {
        this.setState({ edit: true, editID: id })

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
                    onclicking={() => this.handleClick(restaurant.id)} />
            );
            return <div>
                <table className="table">
                    <thead>
                        <tr><th>Rest name</th><th>Food type</th><th>Street</th><th>Website</th><th>Edit</th></tr>
                    </thead>
                    <tbody>
                        {tableData}
                    </tbody>
                </table>
            </div>
        } else {
            return <div>
                <EditRestaurant {...this.props} id={this.state.editID} /> 
            </div>
        }
    }
}


/* class EditRestaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restName: "", street: "", foodType:"",
            isBlocking: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            isBlocking: event.target.value.length > 0
        });
        this.setState({
            [name]: value
        });
    }

    handleSave(event) {
        event.preventDefault();
        console.log(JSON.stringify(this.state))
        this.props.bookStore.addBook({ title: this.state.title, info: this.state.info });
        this.setState({ books: this.props.bookStore.books });
        console.log(this.state.books.length);
        event.target.reset();
        this.setState({
            isBlocking: false
        });
    }

    render() {
        let { isBlocking } = this.state;
        console.log(this.props);
        return (
            <div>
                <form className="form-horizontal" onSubmit={this.handleSave}>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="name">
                            Title:</label>
                        <div className="col-sm-9">
                            <input className="form-control" id="title"
                                name="title"
                                placeholder="Title"
                                value={this.state.title}
                                onChange={this.handleInputChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="age">
                            Info:</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="age"
                                name="info"
                                placeholder="Info"
                                value={this.state.info}
                                onChange={this.handleInputChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-sm-offset-3 col-sm-9">
                            <button type="submit" className="btn btn-default">Save</button>
                        </div>
                    </div>
                    <Prompt
                        when={isBlocking}
                        message={location =>
                            `Are you sure you want to go to ${location.pathname}?`
                        }
                    />
                </form>

            </div>
        )
    }
} */


function SingleData(props) {
    const restName = props.restName;
    const foodType = props.foodType;
    const street = props.street;
    const website = props.website;
    return (
        <tr>
            <td>{restName}</td><td>{foodType}</td><td>{street}</td><td>{website}</td>
            <td><button type="button" onClick={props.onclicking}>Edit</button></td>
        </tr>
    );
}



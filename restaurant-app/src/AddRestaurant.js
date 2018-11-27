import React, { Component } from "react"
import facade from "./apiFacade";
import { Prompt } from "react-router-dom";

export default class AddRestaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restName: "",
            phone: "",
            street: "",
            website: "",
            foodType: "",
            foodTypes: [],
            zip: "",
            zipCodes: [],
            isBlocking: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    async componentDidMount() {
        const foodTypes = await facade.getFoodTypes();
        const zipCodes = await facade.getZipCodes();
        const foodType = foodTypes[0];
        const zip = zipCodes[0];
        this.setState({ foodTypes, zipCodes, foodType, zip });
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
        facade.addRestaurant({
            restName: this.state.restName,
            street: this.state.street,
            phone: this.state.phone,
            foodType: this.state.foodType,
            website: this.state.website,
            zip: this.state.zip,
            owner: this.props.restOwner
        });
        event.target.reset();
        this.setState({
            isBlocking: false
        });
    }

    render() {
        let { isBlocking } = this.state;
        console.log(this.props);

        const foodTypeDropDown = this.state.foodTypes.map((foodType) =>
            <FoodTypeDropDown key={foodType.toString()}
                foodType={foodType} />
        );

        const zipCodeDropDown = this.state.zipCodes.map((zipCode) =>
            <ZipCodeDropDown key={zipCode.toString()}
                zipCode={zipCode} />
        );

        return (
            <div>
                <form className="form-horizontal" onSubmit={this.handleSave}>
                    <div className="form-group">
                        <label className="control-label col-sm-3">
                            Name of new restaurant:</label>
                        <div className="col-sm-9">
                            <input className="form-control"
                                name="restName"
                                placeholder="Restaurant name"
                                value={this.state.restName}
                                onChange={this.handleInputChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="control-label col-sm-3">
                            Street:</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control"
                                name="street"
                                placeholder="Street"
                                value={this.state.street}
                                onChange={this.handleInputChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="control-label col-sm-3">
                            Phone:</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control"
                                name="phone"
                                placeholder="Phone"
                                value={this.state.phone}
                                onChange={this.handleInputChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="control-label col-sm-3">
                            Food type:</label>
                        <div className="col-sm-9">
                            <select className="form-control" name="foodType" value={this.state.foodType} onChange={this.handleInputChange}>
                                {foodTypeDropDown}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="control-label col-sm-3">
                            Website:</label>
                        <div className="col-sm-9">
                            <input className="form-control"
                                name="website"
                                placeholder="Website"
                                value={this.state.website}
                                onChange={this.handleInputChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="control-label col-sm-3">
                            Zip code:</label>
                        <div className="col-sm-9">
                            <select className="form-control" name="zip" value={this.state.zip} onChange={this.handleInputChange}>
                                {zipCodeDropDown}
                            </select>
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
}

function FoodTypeDropDown(props) {
    const foodType = props.foodType;
    return (
        <option value={foodType}>{foodType}</option>
    );
}

function ZipCodeDropDown(props) {
    const zipCode = props.zipCode;
    return (
        <option value={zipCode}>{zipCode}</option>
    );
}
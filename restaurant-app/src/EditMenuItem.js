import React, { Component } from "react"
import facade from "./apiFacade";

export default class EditMenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName: '',
            description: '',
            price: '',
            isBlocking: false,
            msg: ''
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
        facade.editMenuItem({
            itemName: this.state.itemName,
            description: this.state.description,
            price: this.state.price,
            editID: this.props.editID,
            restID: this.props.id
        });
        event.target.reset();
        const msg = 'Edit complete.';
        this.setState({
            isBlocking: false, msg
        });
    }

    async componentDidMount() {
        const menuItem = await facade.getSingleMenuItem(this.props.editID);
        this.setState({
            itemName: menuItem.itemName,
            description: menuItem.description,
            price: menuItem.price,
        });
    }

    render() {

        return (<div>
            {this.state.msg}
            <form className="form-horizontal" onSubmit={this.handleSave}>
                <div className="form-group">
                    <label className="control-label col-sm-3">
                        Name:</label>
                    <div className="col-sm-9">
                        <input className="form-control"
                            name="itemName"
                            placeholder="Menu item name"
                            value={this.state.itemName}
                            onChange={this.handleInputChange} />
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label col-sm-3">
                        Description:</label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control"
                            name="description"
                            placeholder="Description"
                            value={this.state.description}
                            onChange={this.handleInputChange} />
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label col-sm-3">
                        Price:</label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control"
                            name="price"
                            placeholder="Price"
                            value={this.state.price}
                            onChange={this.handleInputChange} />
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-sm-offset-3 col-sm-9">
                        <button type="submit" className="btn btn-default">Save</button>
                    </div>
                </div>
            </form></div>)
    }
}
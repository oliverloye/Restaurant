import React, { Component } from "react";
import facade from "./apiFacade";
import EditMenuItem from './EditMenuItem.js';

export default class EditMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [],
            msg: '',
            errorMsg: '',
            price: '',
            description: '',
            itemName: '',
            edit: false,
            editID: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    async componentDidMount() {
        try {
            const menu = await facade.getMenuItems(this.props.id);
            this.setState({ menu });
        }
        catch (err) {
            if (err.httpError) {
                err.fullError.then(eJson => eJson.errorMessage);
            } else {
                err.fullError.then(eJson => this.setState({ errorMsg: eJson.errorMessage }));
            }
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleClick = (editID) => {
        this.setState({ edit: true, editID: editID })
    }

    handleDeleteClick = async (id) => {
        const msg = await facade.deleteMenuItem(id);
        const menu = await facade.getMenuItems(this.props.id);
        this.setState({ menu, msg });
    }

    async handleSave(event) {
        event.preventDefault();
        const msg = await facade.addMenuItem({
            itemName: this.state.itemName,
            description: this.state.description,
            price: this.state.price,
            restID: this.props.id
        });
        const menu = await facade.getMenuItems(this.props.id);
        this.setState({
            menu,
            msg,
            itemName: '',
            description: '',
            price: ''
        });
    }

    render() {
        if (!this.state.edit) {
            const tableData = this.state.menu.map((menuItem) =>
                <SingleData key={menuItem.id}
                    id={menuItem.id}
                    description={menuItem.description}
                    itemName={menuItem.itemName}
                    price={menuItem.price}
                    onclicking={() => this.handleClick(menuItem.id)}
                    ondeleteclicking={() => this.handleDeleteClick(menuItem.id)} />)
            return (
                <div>
                    <div>
                        {this.state.msg}
                        <form className="form-horizontal" onSubmit={this.handleSave}>
                            <div className="form-group">
                                <label className="control-label col-sm-3">
                                    Name of new menu item:</label>
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
                        </form>
                    </div>

                    <table className="table">
                        <thead>
                            <tr><th>Item name</th><th>Description</th><th>Price</th><th>Edit</th><th>Delete</th></tr>
                        </thead>
                        <tbody>
                            {tableData}
                        </tbody>
                    </table>
                </div>)
        } else {
            return <EditMenuItem {...this.props} />
        }
    }
}

function SingleData(props) {
    const itemName = props.itemName;
    const description = props.description;
    const price = props.price;
    return (
        <tr>
            <td>{itemName}</td><td>{description}</td><td>{price}</td>
            <td><button type="button" onClick={props.onclicking}>Edit</button></td>
            <td><button type="button" onClick={props.ondeleteclicking}>Delete</button></td>
        </tr>
    );
}


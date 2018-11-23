import React, { Component } from 'react';
import facade from './apiFacade';

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = { menuItems: [] };
    }

    async componentDidMount() {
        const id = this.props.id;
        console.log(id);
        const menuItems = await facade.getMenuItems(this.props.id);
        this.setState({ menuItems });
    }

    render() {
        console.log(this.props.id);
        const tableData = this.state.menuItems.map((menu) =>
            <SingleData key={menu.id}
                id={menu.id}
                description={menu.description}
                itemName={menu.itemName}
                price={menu.price} />
        );
        return (
            
            <div>
                <table className="table">
                    <thead>
                        <tr><th>Id</th><th>Navn</th><th>Beskrivelse</th><th>Pris</th></tr>
                    </thead>
                    <tbody>
                        {tableData}
                    </tbody>
                </table>
            </div>
        )
    }
}
function SingleData(props) {
    const id = props.id;
    const description = props.description;
    const itemName = props.itemName;
    const price = props.price;
    return (
        <tr>
            <td>{id}</td><td><b>{itemName}</b></td><td>{description}</td><td>{price} kr.</td>
        </tr>
    );
}

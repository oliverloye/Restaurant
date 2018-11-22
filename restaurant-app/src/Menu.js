import React, { Component } from 'react';
import facade from './apiFacade';

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = { menuItems: [], items: "Fetching items...", msg: "" };
    }

    async componentDidMount() {
        const menuItems = await facade.getMenuItems();
        this.setState({ menuItems });
    }

    render() {
        const tableData = this.state.menuItems.map((menu) =>
            <SingleData key={menu.id}
                id={menu.id}
                description={menu.description}
                itemName={menu.itemName}
                price={menu.price}
            />
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
                {this.state.msg}
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

import React, { Component } from "react"
import facade from "./apiFacade";

export default class EditFavRest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restName: '',
            comment: '',
            rating: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        /* this.setState({
            isBlocking: event.target.value.length > 0
        }); */
        this.setState({
            [name]: value
        });
    }

    handleSave(event) {
        event.preventDefault();
        facade.editFavRest({
            restID: this.props.restID,
            comment: this.state.comment,
            rating: this.state.rating,
            userName: this.props.username
        });
        event.target.reset();
        const msg = 'Edit complete.';
        this.setState({ msg });
        /* this.setState({
            isBlocking: false, msg
        }); */
    }

    async componentDidMount() {
        const favRest = await facade.getSingleFavRest(this.props.username, this.props.restID);
        console.log(favRest);
        this.setState({
            restName: favRest.restName,
            comment: favRest.comment,
            rating: favRest.rating
        });
    }

    render() {

        return (<div>
            {this.state.msg} <br></br>
            {this.state.restName}:  <br></br>
            <form className="form-horizontal" onSubmit={this.handleSave}>
                <div className="form-group">
                    <label className="control-label col-sm-3">
                        Comment:</label>
                    <div className="col-sm-9">
                        <input className="form-control"
                            name="comment"
                            placeholder="Comment"
                            value={this.state.comment}
                            onChange={this.handleInputChange} />
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label col-sm-3">
                        Rating:</label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control"
                            name="rating"
                            placeholder="Rating"
                            value={this.state.rating}
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


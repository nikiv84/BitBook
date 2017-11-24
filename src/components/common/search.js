import React from "react";

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = { searchString: "" };

        this.onInputChanged = this.onInputChanged.bind(this);
        this.onSearchClicked = this.onSearchClicked.bind(this);
    }

    onInputChanged(event) {
        const searchString = event.target.value;
        this.setState({ searchString });

        const instantSearchEnabled = this.props.instant;

        if (instantSearchEnabled) {
            this.props.onSearchRequested(searchString);
        }
        console.log(searchString);

    }

    onSearchClicked() {
        let searchString = this.state.searchString;
        this.props.onSearchRequested(searchString);
    }


    render() {
        return (
            <div>
                <h4><i className="small material-icons">search</i> Search</h4>
                <input type="text" placeholder="Search profile..." value={this.state.searchString} onChange={this.onInputChanged} />
                {this.props.instant ? "" : <input className="btn waves-effect waves-light col s2" type="button" value="Search" onClick={this.onSearchClicked} />}
            </div>
        );
    }
}

export default Search;
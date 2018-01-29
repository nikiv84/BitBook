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
    }

    onSearchClicked() {
        let searchString = this.state.searchString;
        this.props.onSearchRequested(searchString);
    }


    render() {
        return (
            <div className="row">
                <div className="col s12">
                    <input className="search-bar" type="text" placeholder="Search profile..." value={this.state.searchString} onChange={this.onInputChanged} />
                    {this.props.instant ? "" : <input className="btn waves-effect waves-light col s2" type="button" value="Search" onClick={this.onSearchClicked} />}
                </div>
            </div>
        );
    }
}

export default Search;
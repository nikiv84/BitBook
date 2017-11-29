import React from "react";

export default class FeedFilter extends React.Component {
    constructor(props) {
        super(props);
        this.bindEventHandlers();
    }

    // componentDidMount() {
    //     var elem = document.querySelector(".dropdown-trigger");
    //     var instance = new M.Dropdown(elem);
    // }

    bindEventHandlers() {
        this.handleSelection = this.handleSelection.bind(this);
    }

    handleSelection(event) {
        const filter = event.target.value;
    
        this.props.filterPosts(filter);

    }

    render() {
        return (
            <div>
                <select onChange={this.handleSelection} className="post-type-select">
                    <option value="">All Posts</option>
                    <option value="text">Text Posts</option>
                    <option value="image">Image Posts</option>
                    <option value="video">Video Posts</option>
                </select>
            </div>
        );
    };
};
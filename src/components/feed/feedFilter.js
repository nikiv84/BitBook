import React from "react";

export default class FeedFilter extends React.Component {
    constructor(props) {
        super(props);
        this.bindEventHandlers();
    }

    componentDidMount() {
        var elem = document.querySelector("select");
        var instance = new M.Select(elem);
    }

    bindEventHandlers() {
        this.handleSelection = this.handleSelection.bind(this);
    }

    handleSelection(event) {
        const filter = event.target.value;
        this.props.filterPosts(filter);
    }

    render() {
        return (
            <div className="input-field col s12">
                <select onChange={this.handleSelection} className="icons">
                    <option value="" defaultValue data-icon="../../assets/img/all-icon.png" className="circle">All Posts</option>
                    <option value="text" data-icon="../../assets/img/text-icon.png" className="circle">Text Posts</option>
                    <option value="image" data-icon="../../assets/img/photo-icon.gif" className="circle">Image Posts</option>
                    <option value="video" data-icon="../../assets/img/video-icon.png" className="circle">Video Posts</option>
                </select>
                <label>Type of posts:</label>
            </div>
        );
    };
};
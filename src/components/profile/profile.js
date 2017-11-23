import React from "react";
import { AVATAR_PLACEHOLDER } from "../../constants";
import PropTypes from "prop-types";
import Modal from "react-modal";
import DataService from "../../service/dataService";
import CommunicationService from "../../service/communicationService";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "50%"
    }
};


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.initBind();
        this.dataService = new DataService();
        this.commService = new CommunicationService();
        this.state = {
            modalIsOpen: false,
            name: "",
            email: "",
            about: "",
            shortabout: "",
            avatar: ""
        };
    }

    initBind() {
        this.handleEdit = this.handleEdit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleProfileEdit = this.handleProfileEdit.bind(this);
        this.getProfileEditData = this.getProfileEditData.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleEdit() {
        this.setState({ modalIsOpen: true });
    }

    componentDidMount(){
        this.getProfileEditData();
    }

    // handleNameChange(event) {
    //     this.setState({
    //         name: event.target.value
    //     });
    //     console.log(this.state.name);
    // }

    getProfileEditData(){
        this.dataService.getProfile((profileData) => {
            this.setState({
                name: profileData.name,
                email: profileData.email,
                about: profileData.about,
                shortabout: profileData.aboutShort,
                avatar: profileData.avatarUrl
            });
        });
    }

    handleProfileEdit(){
        // this.commService.putRequest("Profiles",)
    }

    handleChange(event, name){
        const value = event.target.value;
        this.setState({
            [name]: value
        });
        console.log(value);
        
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    render() {
        let avatarSrc = this.props.profile.avatarUrl;
        if (!this.props.profile.avatarUrl) {
            avatarSrc = AVATAR_PLACEHOLDER;
        }
        if (!this.props) {
            return <h1>Loading...</h1>;
        }

        return (

            <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    
                    <form>
                        <h5>Edit profile</h5>
                        <input type="text" name={this.state.name} placeholder="Edit name" onChange={(e) => this.handleChange(e, "name")} defaultValue={this.state.name} />
                        <input type="email" name={this.state.email} placeholder="Edit email" onChange={(e) => this.handleChange(e, "email")} defaultValue={this.state.email} />
                        <textarea name={this.state.about} placeholder="Edit about" style={{"height": "120px"}} onChange={(e) => this.handleChange(e, "about")} defaultValue={this.state.about}/>
                        <textarea name={this.state.shortabout} placeholder="Edit short about" style={{"height": "60px"}} onChange={(e) => this.handleChange(e, "shortabout")} defaultValue={this.state.shortabout} />
                        <input name={this.state.avatar} type="text" placeholder="New profile image URL" onChange={(e) => this.handleChange(e, "avatar")} defaultValue={this.state.avatar} />
                        <button onClick={this.handleProfileEdit} className="waves-effect waves-light btn">Save Changes</button>
                        <button onClick={this.closeModal} className="waves-effect waves-light btn closebtn">close</button>
                    </form>
                </Modal>
                <div className="container">
                    <div className="row">
                        <div className="col s12 m6 offset-m3 l4 offset-l4 profile center-content">
                            <div className="card">
                                <div className="card-image waves-effect waves-block waves-light">
                                    <img src={`${avatarSrc}`} />
                                </div>
                                <div className="card-content">
                                    <p onClick={this.handleEdit} className="btn-floating halfway-fab waves-effect waves-light red editprofile" title="Edit profile"><i className="material-icons">create</i></p>
                                    <h4>{this.props.profile.name}</h4>
                                    <p>{this.props.profile.about}</p>
                                    <p>{this.props.profile.postsCount} posts</p>
                                    <p>{this.props.profile.commentsCount} comments</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

Profile.propTypes = {
    profile: PropTypes.object,
    name: PropTypes.string,
    about: PropTypes.string,
    posts: PropTypes.number,
    comments: PropTypes.number
};


export default Profile;
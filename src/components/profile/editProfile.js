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


export default class EditProfile extends React.Component {
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
            aboutShort: "",
            avatar: ""
        };
    }

    initBind() {
        this.handleEdit = this.handleEdit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.getProfileEditData = this.getProfileEditData.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleEdit() {
        this.setState({ modalIsOpen: true });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            modalIsOpen: nextProps.clickedOnEdit
        });
    }

    componentDidMount() {
        this.getProfileEditData();
    }

    getProfileEditData() {
        this.dataService.getProfile((profileData) => {
            this.setState({
                name: profileData.name,
                email: profileData.email,
                about: profileData.about,
                aboutShort: profileData.aboutShort,
                avatar: profileData.avatarUrl
            });
        });
    }

    saveChanges() {
        event.preventDefault();
        let data = {
            name: this.state.name,
            email: this.state.email,
            about: this.state.about,
            aboutShort: this.state.aboutShort,
            avatarUrl: this.state.avatar
        };
        console.log(data);

        this.dataService.updateProfile(data, (error) => {
            this.closeModal();
            alert("Error!");
        });
        this.closeModal();

    }

    handleChange(event, name) {
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

        return (

            <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div>
                        <h5>Edit profile</h5>
                        <input type="text" name={this.state.name} placeholder="Edit name" onChange={(e) => this.handleChange(e, "name")} defaultValue={this.state.name} />
                        <input type="email" name={this.state.email} placeholder="Edit email" onChange={(e) => this.handleChange(e, "email")} defaultValue={this.state.email} />
                        <textarea name={this.state.about} placeholder="Edit about" style={{ "height": "120px" }} onChange={(e) => this.handleChange(e, "about")} defaultValue={this.state.about} />
                        <textarea name={this.state.aboutShort} placeholder="Edit short about" style={{ "height": "60px" }} onChange={(e) => this.handleChange(e, "aboutShort")} defaultValue={this.state.aboutShort} />
                        <input name={this.state.avatar} type="text" placeholder="New profile image URL" onChange={(e) => this.handleChange(e, "avatar")} defaultValue={this.state.avatar} />
                        <button onClick={this.saveChanges} className="waves-effect waves-light btn">Save Changes</button>
                        <button onClick={this.closeModal} className="waves-effect waves-light btn closebtn">Close</button>
                    </div>
                </Modal>
            </div>
        );
    }
};

EditProfile.propTypes = {
    profile: PropTypes.object,
    name: PropTypes.string,
    about: PropTypes.string,
    posts: PropTypes.number,
    comments: PropTypes.number,
    clickedOnEdit: PropTypes.bool
};
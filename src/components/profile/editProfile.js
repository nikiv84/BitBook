import React from "react";
import { AVATAR_PLACEHOLDER, BASE_URL } from "../../constants";
import PropTypes from "prop-types";
import Modal from "react-modal";
import DataService from "../../service/dataService";
import RedirectService from "../../service/redirectService";
import CommunicationService from "../../service/communicationService";
import ValidationService from "../../service/validationService";


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
        this.validService = new ValidationService();
        this.redirectService = new RedirectService();
        this.state = {
            modalIsOpen: false,
            name: "",
            email: "",
            about: "",
            aboutShort: "",
            avatar: "",
            isNotValid: false,
            errorMsg: [],
            isUpdated: false,
            file: null
        };
    }

    initBind() {
        this.handleEdit = this.handleEdit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.getProfileEditData = this.getProfileEditData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
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

        if (!this.state.file) {
            let data = {
                name: this.state.name,
                email: this.state.email,
                about: this.state.about,
                aboutShort: this.state.aboutShort,
                avatarUrl: this.state.avatar
            };

            if (this.validService.isEditFormValid(data, (errorMsgs) => {
                let newarr = errorMsgs;
                this.setState({
                    isNotValid: true,
                    errorMsg: newarr
                });
            })) {
                this.setState({
                    isNotValid: false,
                });

                this.dataService.updateProfile(data, (response) => {
                    this.closeModal();
                    this.setState({
                        isUpdated: true
                    });
                }, (error) => {
                    this.setState({
                        isNotValid: true,
                        errorMsg: error
                    });
                });
            }
            return;
        }

        let uploadedImg = AVATAR_PLACEHOLDER;

        this.dataService.fileUpload(this.state.file, (response) => {
            if (response) {
                uploadedImg = response.data;
            }
            let data = {
                name: this.state.name,
                email: this.state.email,
                about: this.state.about,
                aboutShort: this.state.aboutShort,
                avatarUrl: uploadedImg
            };

            if (this.validService.isEditFormValid(data, (errorMsgs) => {
                let newarr = errorMsgs;
                this.setState({
                    isNotValid: true,
                    errorMsg: newarr
                });
            })) {
                this.setState({
                    isNotValid: false,
                });

                this.dataService.updateProfile(data, (response) => {
                    this.closeModal();
                    this.setState({
                        isUpdated: true
                    });
                }, (error) => {
                    this.setState({
                        isNotValid: true,
                        errorMsg: error
                    });
                });
            }
        }, (error) => {
            console.log("error", error);
        });

    }

    handleChange(event) {
        const value = event.target.value;
        const fieldName = event.target.name;

        this.setState({
            [fieldName]: value
        });
    }

    onChange(e) {
        this.setState({ file: e.target.files[0] });
        console.log(e.target.files[0]);
    }

    closeModal() {
        this.props.clickedOnClose();
    }

    render() {

        return (
            <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Edit profile"
                >
                    <div className="edit-profile">
                        <h5>Edit profile</h5>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={this.state.name}
                            placeholder="Edit name"
                            onChange={this.handleChange} />

                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" name="email" value={this.state.email} placeholder="Edit email" onChange={this.handleChange} />
                        {/* <span>{this.getErrorMesage("email")} </span> */}

                        <label htmlFor="about">About me</label>
                        <textarea id="about" name="about" value={this.state.about} placeholder="Edit about" style={{ "height": "120px" }} onChange={this.handleChange} />
                        {/* <span>{this.getErrorMesage("about")} </span> */}

                        <label htmlFor="aboutShort">Short bio</label>
                        <textarea id="aboutShort" name="aboutShort" value={this.state.aboutShort} placeholder="Edit short about" style={{ "height": "60px" }} onChange={this.handleChange} />
                        {/* <span>{this.getErrorMesage("aboutShort")} </span> */}

                        {/* <input name="avatarUrl" value={this.state.avatar} type="text" placeholder="New profile image URL" onChange={this.handleChange} /> */}
                        {/* <span>{this.getErrorMesage("avatarUrl")} </span> */}

                        <div className="row">
                            <div className="col s12 pad0">
                                <label htmlFor="file-upload" className="waves-effect waves-light btn custom-file-upload blue darken-4">
                                    <i className="material-icons left">wallpaper</i> Update Profile Pic
                                </label>
                                <input id="file-upload" type="file" onChange={this.onChange} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col s6 pad0">
                                <button onClick={this.saveChanges} className="waves-effect waves-light btn">Save Changes</button>
                            </div>
                            <div className="col s6 pad0">
                                <button onClick={this.closeModal} className="waves-effect waves-light btn closebtn red darken-3">Close</button>
                            </div>
                        </div>


                        <p id="error">{this.state.isNotValid ? `${this.state.errorMsg}` : ""}</p>
                    </div>
                </Modal>
            </div >
        );
    }
};

EditProfile.propTypes = {
    profile: PropTypes.object,
    name: PropTypes.string,
    about: PropTypes.string,
    posts: PropTypes.number,
    comments: PropTypes.number,
    clickedOnEdit: PropTypes.bool,
    clickedOnClose: PropTypes.func
};